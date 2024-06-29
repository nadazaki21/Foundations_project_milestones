#!/usr/bin/env python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from app.database import db
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1510@localhost/pm'
app.config['SESSION_TYPE'] = 'filesystem'
db = SQLAlchemy(app)

migrate = Migrate(app, db)
