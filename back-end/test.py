#!/usr/bin/env python
from flask import Flask, jsonify, Blueprint, request , session
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
sess = Session()
sess.init_app(app)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1510@localhost/pm'
db = SQLAlchemy(app)



# models


project_owners = db.Table('project_owners',
                          db.Column('user_id', db.Integer,
                                    db.ForeignKey('users.id'),
                                    primary_key=True),
                          db.Column('project_id', db.Integer,
                                    db.ForeignKey('projects.id'),
                                    primary_key=True),
                          )

project_members = db.Table('project_members',
                           db.Column('user_id', db.Integer,
                                     db.ForeignKey('users.id'),
                                     primary_key=True),
                           db.Column('project_id', db.Integer,
                                     db.ForeignKey('projects.id'),
                                     primary_key=True),
                           )


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)

    comments = db.relationship('Comment', backref='user', lazy=True)
    tasks = db.relationship('Task', backref='user', lazy=True)

    owned_projects = db.relationship('Project', secondary=project_owners,
                                     back_populates='owners')
    member_projects = db.relationship('Project', secondary=project_members,
                                      back_populates='members')

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'tasks': [task.id for task in self.tasks],
            'comments': [comment.id for comment in self.comments],
            'owned_projects': [project.id for project in self.owned_projects],
            'member_projects': [project.id for project in self.member_projects]
        }


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)

    phases = db.relationship('Phase', backref='project', lazy=True)
    owners = db.relationship('User', secondary=project_owners,
                             back_populates='owned_projects')
    members = db.relationship('User', secondary=project_members,
                              back_populates='member_projects')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'creation_date': self.creation_date.isoformat(),
            'phases': [phase.id for phase in self.phases],
            'owners': [owner.id for owner in self.owners],
            'members': [member.id for member in self.members]
        }


class Phase(db.Model):
    __tablename__ = 'phases'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    tasks = db.relationship('Task', backref='phase', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'project_id': self.project_id,
            'start_date': self.start_date.isoformat(),
            'end_date': self.end_date.isoformat(),
            'tasks': [task.to_dict() for task in self.tasks]
        }


class Task(db.Model):
    __tablename__ = 'tasks'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    phase_id = db.Column(db.Integer, db.ForeignKey('phases.id'),
                         nullable=False)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)
    deadline = db.Column(db.DateTime, nullable=True)
    assigned_member = db.Column(db.Integer, db.ForeignKey('users.id'),
                                nullable=True)
    status = db.Column(db.Integer, default=0)

    subtasks = db.relationship('Subtask', backref='task', lazy=True)
    comments = db.relationship('Comment', backref='task', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'phase_id': self.phase_id,
            'creation_date': self.creation_date.isoformat(),
            'deadline': self.deadline.isoformat() if self.deadline else None,
            'assigned_member': self.assigned_member,
            'status': self.status,
            'subtasks': [subtask.to_dict() for subtask in self.subtasks],
            'comments': [comment.to_dict() for comment in self.comments]
        }


class Subtask(db.Model):
    __tablename__ = 'subtasks'
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'),
                        nullable=False)
    description = db.Column(db.String(80), nullable=False)
    status = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'description': self.description,
            'status': self.status
        }


class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'),
                        nullable=False)
    description = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'task_id': self.task_id,
            'description': self.description,
            'user_id': self.user_id
        }




# blueprint 
auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'], strict_slashes = False)
def signup():
    data = request.json
    print("Request data:", data)
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists!'}), 400

    try:
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        session['username'] = new_user.username
        session['user_email'] = new_user.email
        return jsonify({'message': 'User created successfully!'}), 201
    except Exception as e:
        db.session.rollback()
        print(e)
        return jsonify({'message': 'Internal server error'}), 500

@auth_bp.route('/login', methods=['POST'], strict_slashes = False)
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Missing required fields'}), 400

    try:
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            session['username'] = user.username
            session['user_email'] = user.email
            return jsonify({'message': 'User Loged successfully!'}), 201
        else:
            return jsonify({'message': 'Invalid email or password'}), 401
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500


@auth_bp.route('/user-data', methods=['GET'], strict_slashes = False)
def user_data():
    # return(sess.__dict__)
    if not session.__dict__.get('user_id'):
        return jsonify({'message': 'Not loged in'}), 401 # to check if a user is logged in or not
    
    user_id = session['user_id']
    username = session['username']
    user_email = session['user_email']
   
    return jsonify({'user_id': user_id, 'username': username, 'user_email': user_email}) , 200
   
app.register_blueprint(auth_bp)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
