from database import db
from datetime import datetime



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
    # creation_date = db.Column(db.DateTime, nullable=False)
    # end_date = db.Column(db.DateTime, nullable=False)
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
