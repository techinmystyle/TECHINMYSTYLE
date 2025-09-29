from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
# Add this import at the top of main.py
import bcrypt

# --- MongoDB Connection ---
client = MongoClient(
    "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- FastAPI Setup ---
app = FastAPI()

# Enable CORS (adapt allow_origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://techinmystyle.com/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
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

# --- Register ---
# --- Replacement for your existing '/register' route ---
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}

    # Hash the user's password before storing it
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "username": user.username,
        # Store the hashed password (decoded to a string)
        "password": hashed_password.decode('utf-8'),
        "email": user.email,
        "progress": {},
        "total_completed": 0,
        "unlocked_solutions": [],
        "failed_attempts": {},
        "theme": "light",
        "editor_content": {}
    })
    return {"message": "success"}

# --- Login ---
# --- Replacement for your existing '/login' route ---
@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})

    # Check if user exists and if the provided password matches the stored hash
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"].encode('utf-8')):
        return {
            "message": "success",
            "username": user["username"],
            "progress": user.get("progress", {}),
            "total_completed": user.get("total_completed", 0),
            "email": user["email"]
        }
    
    # Return a generic error message for security
    return {"message": "Invalid username or password."}

# --- Task Complete ---
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
            {"$set": {
                "progress": progress,
                "total_completed": total_completed
            }}
        )
    return {"message": "Task marked as complete."}

# --- NEW: Save Progress Endpoint ---
@app.post("/task/save-progress")
def save_progress(data: dict):
    username = data.get("username")
    course = data.get("course")
    completed_tasks = data.get("completedTasks", [])
    unlocked_solutions = data.get("unlockedSolutions", [])
    failed_attempts = data.get("failedAttempts", {})
    theme = data.get("theme", "light")
    editor_content = data.get("editorContent", {})

    if not username or not course:
        return {"error": "Missing required fields"}

    user = users_collection.find_one({"username": username})
    if not user:
        return {"error": "User not found"}

    # Update user progress with all data
    progress = user.get("progress", {})
    progress[course] = completed_tasks

    # Calculate total completed tasks across all courses
    total_completed = sum(len(tasks) for tasks in progress.values())

    # Update user document with comprehensive data
    update_data = {
        "progress": progress,
        "total_completed": total_completed,
        "unlocked_solutions": unlocked_solutions,
        "failed_attempts": failed_attempts,
        "theme": theme,
        "editor_content": editor_content
    }

    users_collection.update_one(
        {"username": username},
        {"$set": update_data}
    )

    return {
        "message": "Progress saved successfully",
        "progress": progress,
        "total_completed": total_completed
    }

# --- Enhanced Progress Endpoint ---
@app.get("/progress/{username}")
def get_progress(username: str):
    user = users_collection.find_one({"username": username})
    if not user:
        return {}
    
    return {
        "progress": user.get("progress", {}),
        "total_completed": user.get("total_completed", 0),
        "unlocked_solutions": user.get("unlocked_solutions", []),
        "failed_attempts": user.get("failed_attempts", {}),
        "theme": user.get("theme", "light"),
        "editor_content": user.get("editor_content", {}),
        # Return specific course data for easier access
        "html": user.get("progress", {}).get("html", []),
        "css": user.get("progress", {}).get("css", []),
        "js": user.get("progress", {}).get("js", [])
    }

# --- Leaderboard ---
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

# --- Progress by username (Legacy endpoint) ---
@app.post("/user/progress")
def get_user_progress(user: dict):
    username = user.get("username")
    password = user.get("password")
    user_data = users_collection.find_one({"username": username, "password": password})
    if user_data:
        return {"progress": user_data.get("progress", {})}
    return {"message": "unauthorized"}

# --- Courses Meta ---
@app.get("/courses/meta")
def courses_meta():
    return {
        "ai": 30,
        "ml": 30,
        "dl": 30,
        "java": 30,
        "c": 30,
        "html": 30,
        "css": 30,
        "js": 30,
        "js-intermediate": 30,
        "python": 30,
        "dsc": 30
    }

# --- Forgot Password with Email ---
EMAIL_ADDRESS = "techinmystyle@gmail.com"
EMAIL_PASSWORD = os.getenv("EMAIL_PASS")

# --- Replacement for your existing '/forgot-password' route ---
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    
    # Always return a generic success message to prevent email enumeration
    generic_success = {"message": "success"}

    if user:
        # If the user exists, send them a recovery email
        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = data.email
        msg["Subject"] = "Password Recovery Request - Tech In My Style"
        # DO NOT SEND THE PASSWORD. It is hashed.
        body = f"""Hello {user['username']},

We received a request to recover the password for your account on Tech In My Style.

If you made this request, you can log in with your existing password. If you have forgotten it, please contact support directly through our website as we cannot send passwords via email for security reasons.

Best regards,
Tech In My Style Team
"""
        msg.attach(MIMEText(body, "plain"))

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print("Error sending email:", e)
            # Don't expose the error to the client
    
    return generic_success

# --- Frontend protection route ---
@app.get("/", response_class=HTMLResponse)
async def home():
    html_content = """
    <html>
    <head>
        <title>Tech In My Style</title>
    </head>
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

# --- Uvicorn entry point for local/dev ---
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)

