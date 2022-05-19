import sqlite3
import flask_cors
from flask import Flask, request
from flask_cors import CORS
import json

app = Flask("NewsitemApi")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})



DB_FILE = "C:/Users/user/Desktop/BACHELOR_PROJECT/news_items.db"

def connect_to_database(path_to_db_file):
    conn = sqlite3.connect(path_to_db_file)
    return conn

def update_newsitem(conn, body):
    query = f"""Update Newsitems set dateofentry = "{body['dateofentry']}" , newstime = "{str(body['newstime'])}", newstype = "{body['newstype']}", comments ="{body['comments']}" WHERE newsitemsnumber = {body['newsitemsnumber']}"""

    cursor = conn.cursor()
    cursor.execute(query)
    conn.commit()

def get_newsitem(conn):
    query = """SELECT * FROM Newsitems"""
    cur = conn.cursor()
    results = cur.execute(query)
    return list(results) 





@app.route("/api/v1/edit_newsitem", methods=["PUT"])
def edit():
    body = request.json
    print(body)
    try:
        conn = connect_to_database(DB_FILE)
        update_newsitem(conn, body)
        conn.close()
        return '', 204
    except Exception as e:
        error = {
            "error": f"--Failed to edit news item. Message {e}"
        }
        print(error)
        return error, 500
        

if __name__ == "__main__":
    app.run(debug=True, port=3007)

