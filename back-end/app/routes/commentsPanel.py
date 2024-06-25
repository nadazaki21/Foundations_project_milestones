from flask import Blueprint, jsonify
from models.models import User, Task, Project, Phase, Comment
from database import db
from requests import request as req
from .auth import user_data, session
from wrappers import get_user_if_logged, check_state
commentsPanel_bp = Blueprint('commentsPanel', __name__)


   
@commentsPanel_bp.route('/recent-comments', methods=['GET'], strict_slashes = False)
@get_user_if_logged 
def recent_comments(user_id):

    all_user_tasks_dict = {}
    i = 1
    user_tasks = Comment.query.filter_by(user_id=user_id).all()   
    for item in user_tasks:
        values_dict = {}
        values_dict['comment'] = item.description
        
        print ("the description is " + item.description)
        
        values_dict['project'] = item.task.phase.project.name
             
        # values_dict['manager'] = item.task.phase.project.owners
        # print(item.task.phase.project.owners.first().username)
        
        all_user_tasks_dict[f"item{i}"] = values_dict
        i = i + 1

    return jsonify(all_user_tasks_dict)
