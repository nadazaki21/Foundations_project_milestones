from flask import Blueprint, jsonify
from ..models.models import User, Task, Project, Phase
from ..database import db
from ..wrappers import get_user_if_logged, check_state
userTasks_bp = Blueprint('taksPanel', __name__)


@userTasks_bp.route('/test', methods=['GET'], strict_slashes = False)
@get_user_if_logged # closest to function is excuted first
def test(user_id):
    return f"user id is {user_id}"
   
@userTasks_bp.route('/ongoing-tasks', methods=['GET'], strict_slashes = False)
@get_user_if_logged 
def ongoing_taks(user_id):

    all_user_tasks_dict = {}
    i = 1
    user_tasks = Task.query.filter_by(assigned_member=user_id).all()   
    for item in user_tasks:
        values_dict = {}
        values_dict['task_name'] = item.name
        
        # phase = Phase.query.filter_by(id=item.phase_id).first()
        # values_dict['project'] = Project.query.filter_by(id=phase.project_id).first().name  
        
        # or 
        values_dict['project'] = item.phase.project.name
             
        values_dict['start_date'] = item.creation_date
        values_dict['deadline'] = item.deadline
        all_user_tasks_dict[f"item{i}"] = values_dict
        i = i + 1

    return jsonify(all_user_tasks_dict)
