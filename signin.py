from flask import Flask,request
import sqlite3
from flask_restful import Api, request
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
api = Api(app)

def create_user(conn, body):
    query = """insert into users (name, email, password, role)
    values (?, ?, ?, ?)"""
    user_data = [
        body.get("name"),
        body.get("email"),
        body.get("password"),
        body.get("role")
    
    ]
    cursor = conn.cursor()
    cursor.execute(query, user_data)
    conn.commit()

def get_username_and_password(conn, body):
    query = f"""select email, password from users where email='{body.get('email')}'"""
    cursor = conn.cursor()
    user = list(cursor.execute(query))
    if user:
        return user[0]
    else:
        return user

DB_FILE = "C:/Users/user/Desktop/BACHELOR_PROJECT/LOGIN/users.db"



def connect_to_database(path_to_db_file):
    conn = sqlite3.connect(path_to_db_file)
    return conn



app = Flask(__name__)

@app.route("/api/v1/signin", methods=["POST"])
def sign_in():
    try:
        body = request.json
        conn = connect_to_database(DB_FILE)
        user = get_username_and_password(conn, body)
        conn.close()
        if not user:
            error = {
                "error": "--Failed to sign in. Username or password are wrong."
            }
            return error, 401
        if body.get("password") != user[1]:
            error = {
                "error": "--Failed to sign in. Username or password is wrong."
            }
            return error, 401
        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to sign in. Message: {e}"
        }
        return error,500

if __name__ == "__main__":
    app.run(debug=True, port=3007)



   