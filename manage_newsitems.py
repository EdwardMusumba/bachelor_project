import sqlite3
from sqlite3 import Error
import json 
import json

from flask import Flask, Response
from flask_restful import Api, Resource, request
from flask_cors import CORS


def create_connection(db_filename):
    conn = None
    try:
        conn = sqlite3.connect(db_filename)
        print(sqlite3.version)
    except Error as e:
        print(e)

    return conn
def create_table(conn, create_table_sql):
    try:
        cur = conn.cursor()
        cur.execute(create_table_sql)
    except Error as e:
        print(e)
"""

CREATE TABLE IF NOT EXISTS Newsitems (
    newsitemsnumber integer PRIMARY KEY UNIQUE,
    reportersnumber integer NOT NULL,
    readersnumber integer NOT NULL, 
    dateofentry text NOT NULL,
    newstime  text NOT NULL,
    newstype text NOT NULL,
    comments text NOT NULL,
    
);
"""





def create_newsitem(conn, newsitem):
    query = """INSERT INTO Newsitems(newsitemsnumber, reportersnumber, readersnumber, dateofentry, newstime, newstype, comments)
    VALUES(?,?,?,?,?,?,?)"""
    cur = conn.cursor()
    cur.execute(query, newsitem)
    conn.commit()
    return cur.lastrowid


def get_newsitem(conn):
    query = """SELECT * FROM Newsitems"""
    cur = conn.cursor()
    results = cur.execute(query)
    return list(results) 




app = Flask(__name__)
CORS(app)
api = Api(app)


class Newsitem(Resource):
   
    NEWSITEM_DATABASE = "C:/Users/user/Desktop/BACHELOR_PROJECT/news_items.db"


    def get(self, newsitem_id=None):
        conn = create_connection(self.NEWSITEM_DATABASE)
        if newsitem_id is None:
            try:
                newsitems = get_newsitem(conn)
            
                newsitems_json = json.dumps(newsitems)
                response = Response(response=newsitems_json, status=200, content_type="application/json")
            except:
                conn.close()
                response = Response('{"error": "Failed to get all news items"}', status=500, content_type="application/json")    
                error = {
                    "error": "Failed to get all news items"
                }
                response = Response(json.dumps(error), status=500, content_type="application/json")
        else:
            response = Response(status=400, content_type='application/json')
        conn.close()
        return response 

    def post(self):
        
        conn = create_connection(self.NEWSITEM_DATABASE)
        data = request.json
        newsitem = (data['newsitemsnumber'], data['reportersnumber'], data['readersnumber'],data['dateofentry'],data['newstime'],data['newstype'],data['comments'])
        try:
            create_newsitem(conn, newsitem)
            response = Response(status=200, content_type="application/json")
            new_newsitem = {
                "newsitemsnumber": data["newsitemsnumber"],
                "reportersnumber": data["reportersnumber"],
                "readersnumber": data["readersnumber"],
                "dateofentry":data["dateofentry"],
                "newstime":data["newstime"],
                "newstype":data["newstype"],
                "comments":data["comments"]

            }
            response = Response(json.dumps(new_newsitem), status=200, content_type="application/json")
        except Exception as e:
            print(e)
            response = Response('{"error": "Failed to get create news item"}', status=500, content_type="application/json")
            error = {
                "error": "Failed to get create news item"
            }
            response = Response(json.dumps(error), status=500, content_type="application/json")
        conn.close()
        return response 

api.add_resource(Newsitem, '/newsitems', '/newsitems/<string:newsitemsnumber>')


if __name__ == "__main__":

 app.run(debug=True)

