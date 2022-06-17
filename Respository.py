
import sqlite3


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


def get_username_and_password_role(conn, body):
    query = f"""select email, password ,role from users where email='{body.get('email')}'"""
    cursor = conn.cursor()
    user = list(cursor.execute(query))
    if user:
        return user[0]
    else:
        return user

def get_newsitem_using_newsitemnumber(conn, body):
    query = f"""SELECT * FROM Newsitems where newsitemsnumber ={int(body.get('newsitemsnumber'))}"""
    cursor = conn.cursor()
    newsitem = list(cursor.execute(query))
    if newsitem:
        return newsitem[0]
    else:
        return newsitem

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

def create_user(conn, user):
    query = """INSERT INTO users(name, email, password, role)
    VALUES(?,?,?,?)"""
    cur = conn.cursor()
    cur.execute(query, user)
    conn.commit()
    return cur.lastrowid


def get_users(conn):
    query = """SELECT * FROM users"""
    cur = conn.cursor()
    results = cur.execute(query)
    return list(results) 


def get_username_and_email(conn):
    query = "SELECT name, email FROM users"
    cur = conn.cursor()
    results = cur.execute(query)
    return list(results)



def username(users):
    for user in users:
        print(f"Username: {user[1]}")

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

 