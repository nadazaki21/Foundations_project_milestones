#!/usr/bin/env python
from flask import Flask, Blueprint
from flask_session import Session
from flask_cors import CORS
from database import db
from routes.auth import auth_bp




app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1510@localhost/pm'


db.init_app(app)
sess = Session()
sess.init_app(app)
CORS(app)

app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)