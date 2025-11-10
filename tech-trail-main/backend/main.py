from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from passlib.context import CryptContext  # ✅ Secure password hashing

# ==============================
# --- MongoDB Connection ---
# ==============================
MONGO_URL = os.getenv("MONGO_URL")
if not MONGO_URL:
    raise ValueError("❌ MONGO_URL not found in environment variables.")

client = MongoClient(MONGO_URL)
db = client["tech_in_my_style"]
users_collection = db["users"]

# ==============================
# --- Password Hashing Setup ---
# ==============================
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ==============================
# --- FastAPI Setup ---
# ==============================
app = FastAPI()

# --- ✅ Secure & Production-Safe CORS Setup ---
origins = [
    "https://techinmystyle.com",
    "https://www.techinmystyle.com",
    "http://localhost:5500",       # optional: local testing
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],   # Allow all custom headers
)

# ==============================
# --- Pydantic Models ---
# ==============================
class RegisterData(BaseModel):
    username: str
    password: str
    email: str

class LoginData(BaseModel):
    username: str
    password: str

class TaskUpdate(BaseModel):
    username: str
    course: str
    task_id: str

class ForgotPasswordData(BaseModel):
    email: str

# ==============================
# --- Register ---
# ==============================
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}
    
    # ✅ Hash password securely using passlib (bcrypt)
    hashed_pw = pwd_context.hash(user.password)

    users_collection.insert_one({
        "username": user.username,
        "password": hashed_pw,  # Stored as hashed value
        "email": user.email,
        "progress": {},
        "total_completed": 0
    })
    return {"message": "success"}

# ==============================
# --- Login ---
# ==============================
@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    if not user:
        return {"message": "Invalid username or password."}

    # ✅ Verify password using passlib
    if pwd_context.verify(data.password, user["password"]):
        return {
            "message": "success",
            "username": user["username"],
            "progress": user.get("progress", {}),
            "total_completed": user.get("total_completed", 0),
            "email": user["email"]
        }

    return {"message": "Invalid username or password."}

# ==============================
# --- Task Complete ---
# ==============================
@app.post("/task/complete")
def complete_task(task: TaskUpdate):
    user = users_collection.find_one({"username": task.username})
    if not user:
        return {"error": "User not found"}

    progress = user.get("progress", {})
    course = task.course.lower()
    task_list = progress.get(course, [])

    if task.task_id not in task_list:
        task_list.append(task.task_id)
        progress[course] = task_list
        total_completed = sum(len(tasks) for tasks in progress.values())

        users_collection.update_one(
            {"username": task.username},
            {"$set": {"progress": progress, "total_completed": total_completed}}
        )
    return {"message": "Task marked as complete."}

# ==============================
# --- Leaderboard ---
# ==============================
@app.get("/leaderboard")
def leaderboard():
    users = users_collection.find()
    board = []
    for user in users:
        progress = user.get("progress", {})
        course_progress = {course: len(tasks) for course, tasks in progress.items()}
        board.append({
            "user": user["username"],
            "score": user.get("total_completed", 0),
            "courses": course_progress
        })
    return sorted(board, key=lambda x: x["score"], reverse=True)

# ==============================
# --- Progress by username ---
# ==============================
@app.get("/progress/{username}")
def progress(username: str):
    user = users_collection.find_one({"username": username})
    if not user:
        return {}
    return user.get("progress", {})

@app.post("/user/progress")
def get_progress(user: dict):
    username = user.get("username")
    password = user.get("password")
    user_data = users_collection.find_one({"username": username})
    if user_data and pwd_context.verify(password, user_data["password"]):
        return {"progress": user_data.get("progress", {})}
    return {"message": "unauthorized"}

# ==============================
# --- Courses Meta ---
# ==============================
@app.get("/courses/meta")
def courses_meta():
    return {
        "ai": 30, "ml": 30, "dl": 30, "java": 30, "c": 30,
        "html": 30, "css": 30, "js": 30, "js-intermediate": 30,
        "python": 30, "dsc": 30
    }

# ==============================
# --- Forgot Password ---
# ==============================
EMAIL_ADDRESS = "techinmystyle@gmail.com"
EMAIL_PASSWORD = os.getenv("EMAIL_PASS")

@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    generic_success = {"message": "success"}
    generic_error = {"message": "Failed to send recovery email. Please try again later."}

    # For security, never send stored passwords
    if not user:
        return generic_success

    msg = MIMEMultipart()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = data.email
    msg["Subject"] = "Password Reset Request - Tech In My Style"
    body = f"""Hello {user['username']},

We received a password reset request for your account on Tech In My Style.
For security reasons, your password cannot be sent directly (it is stored encrypted).

Please contact support or visit the reset page to set a new password.

- Tech In My Style Team
"""
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
            smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return generic_success
    except Exception as e:
        print("Error sending email:", e)
        return generic_error

# ==============================
# --- Frontend Protection Route ---
# ==============================
@app.get("/", response_class=HTMLResponse)
async def home():
    html_content = """
    <html>
    <head><title>Tech In My Style</title></head>
    <body>
        <h1>Welcome to Tech In My Style 🚀</h1>
        <p>Your learning platform backend is running successfully!</p>
        <script>
        document.addEventListener('contextmenu', event => event.preventDefault());
        document.onkeydown = function(e) {
            if (e.keyCode == 123) { return false; }
            if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) ||
                                            e.keyCode == 'C'.charCodeAt(0) ||
                                            e.keyCode == 'J'.charCodeAt(0))) { return false; }
            if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) ||
                              e.keyCode == 'S'.charCodeAt(0))) { return false; }
        };
        </script>
    </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# ==============================
# --- Run app (for local dev) ---
# ==============================
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
