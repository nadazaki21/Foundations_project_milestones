from flask import request, jsonify, Blueprint, url_for
from models.models import User, Task
from database import db
from requests import request as req
from .auth import user_data, session
userTasks_bp = Blueprint('taksPanel', __name__)


@userTasks_bp.route('/test', methods=['GET'], strict_slashes = False)
def test():
    # session['user_id'] = 555
    # session['username'] = "watetst2"
    # session['user_email'] = "user.test"
    # session.modified = True
    response = user_data()
    return response
   
# @userTasks_bp.route('/ongoing', methods=['GET'], strict_slashes = False)
# def ongoing_taks():

