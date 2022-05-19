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

def create_newsitem(conn, body):
    query = """INSERT INTO Newsitems(newsitemsnumber, reportersnumber, readersnumber, dateofentry, newstime, newstype, comments)
    VALUES(?,?,?,?,?,?,?)"""
    newsitem_data = [
        body.get("newsitemsnumber"),
        body.get("reportersnumber"),
        body.get("readersnumber"),
        body.get("dateofentry"),
        body.get("newstime"),
        body.get("newstype"),
        body.get("comments")
    
    ]
    cursor = conn.cursor()
    cursor.execute(query, newsitem_data)
    conn.commit()

def get_newsitem(conn):
    query = """SELECT * FROM Newsitems"""
    cur = conn.cursor()
    results = cur.execute(query)
    return list(results) 





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
        

if __name__ == "__main__":
    app.run(debug=True, port=3007)

