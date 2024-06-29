from flask import Blueprint, jsonify
from ..models.models import User, Task, Project, Phase, Comment
from ..database import db
from requests import request as req
from .auth import user_data, session
from ..wrappers import get_user_if_logged, check_state
calPhases_bp = Blueprint('PhasesCalendar', __name__)


   
@calPhases_bp.route('/calendar_phases', methods=['GET'], strict_slashes = False)
@get_user_if_logged 
def phases_in_calenadar(user_id):
    all_user_phases_dict = {}
    i = 1
    all_phases = Phase.query.all()
    user_phases = []
    
    for phase in all_phases:
        # print(f"memebers are {phase.project.members}")
        for member in phase.project.members:
            if member.id == user_id:
                user_phases.append(phase)
    
    for item in user_phases:
        values_dict = {}
        values_dict['phase'] = item.name
        
        
        values_dict['project'] = item.project.name
        
        all_user_phases_dict[f"item{i}"] = values_dict
        i = i + 1

    return jsonify(all_user_phases_dict)
