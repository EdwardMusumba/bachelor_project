@app.route('/login/<int:id>',  methods=["GET", "POST"])
def login(id):
    """The view for the login page"""
    user_record = data.get(id)
    try:
        error = ''
        if request.method == "POST":
            attempted_username = request.form['username']
            attempted_password = request.form['password']
            if attempted_username == 'admin' and attempted_password == os.environ['USER_PASSWORD']:
                session['logged_in'] = True
                session['username'] = request.form['username']
                return redirect(url_for('edit_database', id=id))
            else:
                print('invalid credentials')
                error = 'Invalid credentials. Please, try again.'
        return render_template('login.html', error=error, name=user_record.name, id=id)
    except Exception as e:
        return render_template('login.html', error=str(e), name=user_record.name, id=id)


def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        """login session"""
        if 'logged_in' in session:
            return f(*args, **kwargs)
        else:
            pass
        return redirect(url_for('login'))
    return wrap


app.secret_key = os.environ['FLASK_WEB_APP_KEY']