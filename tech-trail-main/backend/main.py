from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel, Field, EmailStr
from pymongo import MongoClient
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import os
import smtplib
import secrets
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from passlib.context import CryptContext

# -----------------------------
# Config & Environment
# -----------------------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = os.getenv("DB_NAME", "tech_in_my_style")

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS", "techinmystyle@gmail.com")
EMAIL_PASSWORD = os.getenv("EMAIL_PASS")  # set this in env
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://techinmystyle.com")  # used in reset link

ALLOWED_ORIGINS = [
    "https://techinmystyle.com",
    "http://techinmystyle.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# -----------------------------
# MongoDB
# -----------------------------
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
users_collection = db["users"]

# Helpful indexes (no-op if they already exist)
users_collection.create_index("username", unique=True)
users_collection.create_index("email", unique=True)
users_collection.create_index("reset_token", sparse=True)
users_collection.create_index("reset_token_expires_at", sparse=True)

# -----------------------------
# FastAPI
# -----------------------------
app = FastAPI(title="Tech In My Style API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Models
# -----------------------------
class RegisterData(BaseModel):
    username: str = Field(min_length=3, max_length=32)
    password: str = Field(min_length=6, max_length=128)
    email: EmailStr

class LoginData(BaseModel):
    username: str
    password: str

class TaskUpdate(BaseModel):
    username: str
    course: str
    task_id: str

class ForgotPasswordData(BaseModel):
    email: EmailStr

class ResetPasswordData(BaseModel):
    email: EmailStr
    token: str
    new_password: str = Field(min_length=6, max_length=128)

class UserProgressRequest(BaseModel):
    username: str
    password: str

# -----------------------------
# Utils
# -----------------------------
def hash_password(plain: str) -> str:
    return pwd_context.hash(plain)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def normalize_course(name: str) -> str:
    return name.strip().lower()

def compute_total_completed(progress: Dict[str, List[str]]) -> int:
    return sum(len(v) for v in progress.values())

def send_email(to_email: str, subject: str, body: str) -> bool:
    if not EMAIL_PASSWORD:
        # Email not configured
        return False
    try:
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = to_email
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return True
    except Exception as e:
        print("Email error:", e)
        return False

# -----------------------------
# Routes
# -----------------------------

@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}

    users_collection.insert_one({
        "username": user.username,
        "password": hash_password(user.password),
        "email": str(user.email),
        "progress": {},
        "total_completed": 0,
        "created_at": datetime.utcnow(),
    })
    return {"message": "success"}

@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    if not user:
        return {"message": "Invalid username or password."}

    if not verify_password(data.password, user.get("password", "")):
        return {"message": "Invalid username or password."}

    # Return fresh server-side progress to keep devices in sync
    progress = user.get("progress", {})
    total_completed = user.get("total_completed", compute_total_completed(progress))

    # Safety: if total_completed missing/out-of-sync, repair it
    if total_completed != compute_total_completed(progress):
        total_completed = compute_total_completed(progress)
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"total_completed": total_completed}}
        )

    return {
        "message": "success",
        "username": user["username"],
        "progress": progress,
        "total_completed": total_completed,
        "email": user["email"]
    }

@app.post("/task/complete")
def complete_task(task: TaskUpdate):
    user = users_collection.find_one({"username": task.username})
    if not user:
        return {"error": "User not found"}

    progress = user.get("progress", {})
    course = normalize_course(task.course)
    task_list = progress.get(course, [])

    updated = False
    if task.task_id not in task_list:
        task_list.append(task.task_id)
        progress[course] = task_list
        updated = True

    total_completed = compute_total_completed(progress)

    if updated:
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"progress": progress, "total_completed": total_completed}}
        )
    else:
        # ensure stored total is consistent even if not updated
        if user.get("total_completed") != total_completed:
            users_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"total_completed": total_completed}}
            )

    # ✅ Always return the latest data so frontends can sync immediately
    return {
        "message": "Task marked as complete.",
        "progress": progress,
        "total_completed": total_completed
    }

@app.get("/leaderboard")
def leaderboard():
    users = users_collection.find({}, {"username": 1, "progress": 1, "total_completed": 1})
    board = []
    for u in users:
        progress = u.get("progress", {})
        course_progress = {c: len(t) for c, t in progress.items()}
        score = u.get("total_completed", compute_total_completed(progress))
        board.append({
            "user": u["username"],
            "score": score,
            "courses": course_progress
        })
    return sorted(board, key=lambda x: x["score"], reverse=True)

@app.get("/progress/{username}")
def progress(username: str):
    user = users_collection.find_one({"username": username})
    if not user:
        return {}
    return user.get("progress", {})

# Backward-compatible endpoint used by some frontends
@app.post("/user/progress")
def get_progress(body: UserProgressRequest):
    user = users_collection.find_one({"username": body.username})
    if not user or not verify_password(body.password, user.get("password", "")):
        return {"message": "unauthorized"}
    return {"progress": user.get("progress", {})}

@app.get("/courses/meta")
def courses_meta():
    return {
        "ai": 30, "ml": 30, "dl": 30, "java": 30, "c": 30,
        "html": 30, "css": 30, "js": 30, "js-intermediate": 30,
        "python": 30, "dsc": 30
    }

# -------- Password Reset (Token-based, safer) --------
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    # Always return generic success for privacy
    generic_success = {"message": "success"}

    user = users_collection.find_one({"email": str(data.email)})
    if not user:
        return generic_success

    # Generate a token and expiry
    token = secrets.token_urlsafe(32)
    expires_at = datetime.utcnow() + timedelta(minutes=20)

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {"reset_token": token, "reset_token_expires_at": expires_at}}
    )

    reset_link = f"{FRONTEND_URL}/reset-password?email={data.email}&token={token}"
    body = f"""Hello {user['username']},

We received a request to reset your password on Tech In My Style.

Use this link to reset your password (valid for 20 minutes):
{reset_link}

If you did not request this, you can safely ignore this email.

Best regards,
Tech In My Style Team
"""
    # Try to send email; still return generic success either way
    send_email(str(data.email), "Tech In My Style – Password Reset", body)
    return generic_success

@app.post("/reset-password")
def reset_password(data: ResetPasswordData):
    user = users_collection.find_one({"email": str(data.email)})
    if not user:
        # Privacy: don't reveal
        return {"message": "success"}

    token = user.get("reset_token")
    exp: Optional[datetime] = user.get("reset_token_expires_at")

    if not token or not exp or data.token != token or datetime.utcnow() > exp:
        # Invalid or expired token
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    users_collection.update_one(
        {"_id": user["_id"]},
        {"$set": {
            "password": hash_password(data.new_password),
        },
         "$unset": {
            "reset_token": "",
            "reset_token_expires_at": ""
        }}
    )
    return {"message": "success"}

# -----------------------------
# Frontend protection route
# -----------------------------
@app.get("/", response_class=HTMLResponse)
async def home():
    html_content = """
    <html>
    <head><title>Tech In My Style</title></head>
    <body>
        <h1>Welcome to Tech In My Style 🚀</h1>
        <p>Your learning platform is running successfully!</p>
        <script>
        // Disable right-click
        document.addEventListener('contextmenu', event => event.preventDefault());
        // Disable common inspect shortcuts
        document.onkeydown = function(e) {
            if (e.keyCode == 123) { return false; } // F12
            if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) ||
                                            e.keyCode == 'C'.charCodeAt(0) ||
                                            e.keyCode == 'J'.charCodeAt(0))) {
                return false;
            }
            if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) ||
                              e.keyCode == 'S'.charCodeAt(0))) {
                return false;
            }
        };
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# -----------------------------
# Uvicorn entry point
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
