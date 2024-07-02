from flask import Blueprint
from ..wrappers import get_user_if_logged

myProjects_bp = Blueprint('myProjects', __name__)

@myProjects_bp.route('/my-projects', methods=['GET'], strict_slashes = False)
@get_user_if_logged
def my_projects(user_id):
    return "hello"