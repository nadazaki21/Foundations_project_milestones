from flask import request, jsonify, Blueprint, url_for
from models.models import User, Task
from database import db
from requests import request as req
from .auth import user_data, session
from wrappers import get_user_if_logged, check_state
userTasks_bp = Blueprint('taksPanel', __name__)


@userTasks_bp.route('/test', methods=['GET'], strict_slashes = False)
@get_user_if_logged # closest to function is excuted first
def test(user_id):
    return f"user id is {user_id}"
   
# @userTasks_bp.route('/ongoing', methods=['GET'], strict_slashes = False)
# def ongoing_taks():

