import sqlite3
import flask_cors
from flask import Flask, request
from flask_cors import CORS
import json
from register_newsitem import DB_FILE, connect_to_database,get_newsitem

app = Flask("NewsitemApi")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})



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
            "error": f"--Failed to get news item. Message {e}"
        }
        print(error)
        return error, 500
        

if __name__ == "__main__":
    app.run(debug=True, port=3007)