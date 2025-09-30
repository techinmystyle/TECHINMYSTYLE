from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from pymongo import MongoClient
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import bcrypt
import secrets
import datetime
from datetime import timezone

# --- MongoDB Connection ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client = MongoClient(MONGO_URI)
db = client["tech_in_my_style"]
users_collection = db["users"]

# --- FastAPI Setup ---
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allowing all for simplicity, can be restricted later
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

class ForgotPasswordData(BaseModel):
    email: str

class ResetPasswordData(BaseModel):
    token: str
    new_password: str

# --- Register ---
@app.post("/register")
def register(user: RegisterData):
    if users_collection.find_one({"username": user.username}):
        return {"message": "Username already exists."}
    if users_collection.find_one({"email": user.email}):
        return {"message": "Email already registered."}

    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

    users_collection.insert_one({
        "username": user.username,
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
@app.post("/login")
def login(data: LoginData):
    user = users_collection.find_one({"username": data.username})
    if user and bcrypt.checkpw(data.password.encode('utf-8'), user["password"].encode('utf-8')):
        return {
            "message": "success",
            "username": user["username"],
            "progress": user.get("progress", {}),
            "total_completed": user.get("total_completed", 0),
            "email": user["email"]
        }
    return {"message": "Invalid username or password."}

# --- SECURE: Request Password Reset ---
@app.post("/forgot-password")
def forgot_password(data: ForgotPasswordData):
    user = users_collection.find_one({"email": data.email})
    
    if user:
        # Generate a secure, URL-safe token
        token = secrets.token_urlsafe(32)
        # Set an expiration time (e.g., 1 hour from now)
        expiry_time = datetime.datetime.now(timezone.utc) + datetime.timedelta(hours=1)

        # Store the token and its expiry in the user's document
        users_collection.update_one(
            {"_id": user["_id"]},
            {"$set": {"reset_token": token, "reset_token_expires": expiry_time}}
        )

        # Send the reset email
        EMAIL_ADDRESS = "techinmystyle@gmail.com"
        EMAIL_PASSWORD = os.getenv("EMAIL_PASS")
        
        # Construct the reset link for your new frontend page
        reset_link = f"https://techinmystyle.com/auth/reset_password.html?token={token}"

        msg = MIMEMultipart()
        msg["From"] = EMAIL_ADDRESS
        msg["To"] = data.email
        msg["Subject"] = "Password Reset Request - Tech In My Style"
        body = f"""Hello {user['username']},

You requested to reset your password. Please click the link below to set a new one. This link is valid for 1 hour.

{reset_link}

If you did not request a password reset, please ignore this email.

Best regards,
Tech In My Style Team
"""
        msg.attach(MIMEText(body, "plain"))

        try:
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
                smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
                smtp.send_message(msg)
        except Exception as e:
            print(f"Error sending email: {e}")
            # Still return success to not reveal if an email exists
    
    # Always return a generic success message to prevent email enumeration
    return {"message": "success"}

# --- NEW: Set New Password ---
@app.post("/reset-password")
def reset_password(data: ResetPasswordData):
    # Find user by the reset token and check if it's not expired
    user = users_collection.find_one({
        "reset_token": data.token,
        "reset_token_expires": {"$gt": datetime.datetime.now(timezone.utc)}
    })

    if not user:
        return {"message": "Invalid or expired token. Please try again."}

    # Hash the new password
    new_hashed_password = bcrypt.hashpw(data.new_password.encode('utf-8'), bcrypt.gensalt())

    # Update the user's password and remove the reset token so it can't be reused
    users_collection.update_one(
        {"_id": user["_id"]},
        {
            "$set": {"password": new_hashed_password.decode('utf-8')},
            "$unset": {"reset_token": "", "reset_token_expires": ""}
        }
    )

    return {"message": "success"}
    
# --- Other Endpoints (Unchanged) ---
@app.get("/", response_class=HTMLResponse)
async def home():
    return HTMLResponse(content="<h1>Welcome to Tech In My Style API 🚀</h1>")

# (Keep all your other endpoints like /task/complete, /leaderboard, etc. here)
# ...
