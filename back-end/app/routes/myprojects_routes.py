from flask import Blueprint, jsonify
from ..wrappers import get_user_if_logged
from ..models.models import Project, Task, Phase
from ..database import db

myProjects_bp = Blueprint("myProjects", __name__)


@myProjects_bp.route("/get-my-projects", methods=["GET"], strict_slashes=False)
@get_user_if_logged
def my_projects(user_id):
    """returns all the projects created by the logged in user"""
    all_projects = Project.query.filter(Project.owners.any(id=user_id)).all()
    return jsonify([project.to_dict() for project in all_projects])


@myProjects_bp.route("/all-tasks-assigned/", methods=["GET"], strict_slashes=False)
@get_user_if_logged
def tasks_assigned(user_id):
    """returns all tasks assigned *by* the logged in user"""
    #wrong query
    # tasks_assigned = Task.query.filter(Task.phase.project.owners.any(id=user_id)).all()
    # correct query 
    tasks_assigned = db.session.query(Task).join(Phase).join(Project).filter(Project.owners.any(id=user_id)).all()
    return jsonify([task.to_dict() for task in tasks_assigned])
