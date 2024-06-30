#!/usr/bin/env python
from flask import Flask
from flask_migrate import Migrate
from flask_session import Session
from flask_cors import CORS
from .database import db
# from flask_sqlalchemy import SQLAlchemy
from .routes.auth import auth_bp
from .routes.taskPanel import userTasks_bp
from .routes.commentsPanel import commentsPanel_bp
from .routes.calendar_routes import calPhases_bp
from .routes.mytasks import task_bp
from .routes.subtasks import subtask_bp


app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1230@localhost/try'
# db = SQLAlchemy(app)
migrate = Migrate(app, db)

app.config['PERMANENT_SESSION_LIFETIME'] # default is 31 days 
app.config['SECRET_KEY'] = 'hi'
app.config['SESSION_USE_SIGNER'] = True #enables session cookie signing , as seesion id is saved encrypted in cookies 
# app.config['SESSION_FILE_DIR'] = '/home/try_here/dump'
app.config['SESSION_FILE_THRESHOLD'] = 100 #app.config['SESSION_FILE_THRESHOLD'] = 100
app.config['SESSION_COOKIE_HTTPONLY'] = True  #This flag makes the cookie inaccessible to JavaScript running on the client-side
#This improves security by preventing client-side scripts from accessing the session ID cookie, which helps protect against cross-site scripting (XSS) attacks.
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Cookies are not sent with cross-site requests (e.g., requests initiated by third-party websites), but are sent when the user navigates to the URL from an external site (e.g., clicking a link).
# This setting helps protect against cross-site request forgery (CSRF) attacks by controlling the contexts in which cookies are sent.


#Each session has a unique identifier (session ID)
# that is stored on the client's side,
# typically in a cookie. This session ID
# is sent with every request to the server,
# which allows the server to identify the session.
db.init_app(app)
Session(app)
CORS(app, supports_credentials=True) # allows requets from all domains since no domain is specified 
#  If your frontend application is served from a different origin (e.g., http://localhost:3000 for React and http://localhost:5000 for Flask), the browser would normally block the sending of cookies. Setting supports_credentials to True allows the browser to send cookies (including the session ID) with the request, enabling the server to recognize the session.
# in other means the front will not be able to acess the back - only the local back host would be able 
# the front send the seesion id from the cookies to the back , this is what the parameter 'with_credentials' does



app.register_blueprint(auth_bp)
app.register_blueprint(userTasks_bp)
app.register_blueprint(commentsPanel_bp)
app.register_blueprint(calPhases_bp)
app.register_blueprint(task_bp)
app.register_blueprint(subtask_bp)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
