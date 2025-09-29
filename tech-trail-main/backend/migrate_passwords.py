import pymongo
import bcrypt

# --- IMPORTANT: Paste your MongoDB connection string here ---
MONGO_URI = "mongodb+srv://shaikbasharam20:basharam@cluster0.lwcietu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# --- Your database and collection names ---
DB_NAME = "tech_in_my_style"
COLLECTION_NAME = "users"

def migrate_existing_passwords():
    """
    Finds plaintext passwords and converts them to bcrypt hashes.
    """
    try:
        client = pymongo.MongoClient(MONGO_URI)
        db = client[DB_NAME]
        users_collection = db[COLLECTION_NAME]

        # Find users whose password is NOT a hash (hashes start with $2a$, $2b$, etc.)
        users_to_migrate = users_collection.find({"password": {"$not": {"$regex": "^\$2[abxy]\$.*"}}})
        
        count = 0
        for user in users_to_migrate:
            count += 1
            username = user.get("username")
            plaintext_password = user.get("password")

            if not isinstance(plaintext_password, str) or len(plaintext_password) < 3:
                print(f"Skipping user '{username}' due to invalid password field.")
                continue

            print(f"Migrating password for user: {username}...")

            # Hash the plaintext password
            hashed_password = bcrypt.hashpw(
                plaintext_password.encode('utf-8'), 
                bcrypt.gensalt()
            )

            # Update the user's document with the new hashed password
            users_collection.update_one(
                {"_id": user["_id"]},
                {"$set": {"password": hashed_password.decode('utf-8')}}
            )

        if count == 0:
            print("No users with plaintext passwords found. All passwords seem to be hashed already!")
        else:
            print(f"\nMigration complete! Successfully updated {count} user(s).")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    migrate_existing_passwords()
