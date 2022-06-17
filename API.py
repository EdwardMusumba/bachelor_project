import sqlite3
import flask_cors
from flask import Flask, request
from flask_cors import CORS
import json

from Respository import DB_FILE, connect_to_database, create_connection, create_newsitem, get_newsitem, get_newsitem_using_newsitemnumber, get_username_and_email, get_username_and_password_role


app = Flask("NewsitemApi")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route("/api/v1/register_newsitem", methods=["POST"])
def register():
    body = request.json
    print(body)
    try:
        conn = connect_to_database(DB_FILE)
        create_newsitem(conn, body)
        conn.close()
        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to create news item. Message {e}"
        }
        print(error)
        return error, 500
        

@app.route("/api/v1/search_newsitems", methods=["POST"])
def edit():
    body = request.json
    print(body)
    try:
        conn = connect_to_database(DB_FILE)
        r = get_newsitem_using_newsitemnumber(conn, body)
        conn.close()
        print(r)
        return json.dumps(r), 200
    except Exception as e:
        error = {
            "error": f"--Failed to get news item. Message {e}"
        }
        print(error)
        return error, 500
        
@app.route("/api/v1/view_newsitems", methods=["POST"])
def edit():
    body = request.json
    print(body)
    try:
        conn = connect_to_database(DB_FILE)
        r = get_newsitem(conn, body)
        conn.close()
        print(r)
        return json.dumps(r), 200
    except Exception as e:
        error = {
            "error": f"--Failed to edit news item. Message {e}"
        }
        print(error)
        return error, 500

@app.route("/api/v1/signin", methods=["POST"])
def sign_in():
    try:
        body = request.json
        conn = connect_to_database(DB_FILE)
        user = get_username_and_password_role(conn, body)
        print(user)
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

@app.route("/users",methods=["POST"])
def create_user():
    try:
       conn = create_connection(DB_FILE)
       user = get_username_and_email(conn)
       print(user)
       conn.close()
       return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to create new user. Message {e}"
        }
        print(error)
        return error, 500
    

if __name__ == "__main__":
    app.run(debug=True, port=3007)