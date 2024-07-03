from flask import Blueprint, jsonify, request
from ..wrappers import get_user_if_logged
from ..models.models import Phase, Project, Task , Subtask, User
from ..database import db
from datetime import datetime

creationForm_bp = Blueprint('creationForm', __name__, url_prefix='/creation_form')


# routes for viewing an existing project




@creationForm_bp.route('/phases', methods=['GET'], strict_slashes = False)
@get_user_if_logged
def get_phases(user_id):
    """ returns phases of a specific project """
    project_id = request.args.get('project_id')
    all_phases = Phase.query.filter_by(project_id=project_id).all()
    return jsonify([phase.to_dict() for phase in all_phases])

@creationForm_bp.route('/tasks', methods=['GET'], strict_slashes = False)
@get_user_if_logged
def get_tasks_for_phase(user_id, phase_id):
    """ returns tasks of a specific phase """
    all_tasks = Task.query.filter_by(phase_id=phase_id).all()
    return jsonify([task.to_dict() for task in all_tasks])

@creationForm_bp.route('/subtasks', methods=['GET'], strict_slashes = False)
@get_user_if_logged
def get_subtasks_for_task(user_id, task_id):
    """ returns subtasks of a specific task """
    all_subtasks = Subtask.query.filter_by(task_id=task_id).all()
    return jsonify([subtask.to_dict() for subtask in all_subtasks])



# routes for creating a new project


@creationForm_bp.route('/add_project', methods=['POST'], strict_slashes = False)
@get_user_if_logged
def create_new_project(user_id):
    """ creates a new phase """
    data = request.get_json()
    name = data.get('name')
    owners = data.get('owners')
    members = data.get('members')
    
    owners["owners"].append(User.query.filter_by(id=user_id).first()) # adding the logged in user as an owner by default
    
    project = Project(name=name["name"], owners=owners["owners"], members=members["members"], creation_date=datetime.utcnow())
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()) , 201

@creationForm_bp.route('/add_phases', methods=['POST'], strict_slashes = False)
@get_user_if_logged
def create_new_phase(user_id):
    """ creates a new phase """
    data = request.get_json()
    name = data.get('name')
    # print(name)
    project_id = data.get('project_id')
    tasks = data.get('tasks')
    # print(tasks)
    phase = Phase(project_id=project_id['project_id'], name=name['name'], tasks=tasks)
    db.session.add(phase)
    db.session.commit()
    
    # checking if phase is actually added in the project
    # project = Project.query.filter_by(id=project_id['project_id']).first()
    # print(f"printing phases {project.phases}")
    
    return jsonify(phase.to_dict())

@creationForm_bp.route('/add-task', methods=['POST'], strict_slashes = False)
@get_user_if_logged
def create_new_task(user_id, phase_id, name, memebr, dealine):
    """ creates a new task """
    task = Task(phase_id=phase_id, name=name, creation_date=datetime.utcnow(), deadline=dealine, assigned_member=memebr.id, status=0)
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict())

@creationForm_bp.route('/add-subtask', methods=['POST'], strict_slashes = False)
@get_user_if_logged
def create_new_subtask(user_id, task_id, description):
    """ creates a new subtask """
    subtask = Subtask(task_id=task_id, description=description, status=0)
    db.session.add(subtask)
    db.session.commit()
    return jsonify(subtask.to_dict())

