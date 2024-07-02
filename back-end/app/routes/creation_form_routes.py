from flask import Blueprint
from ..wrappers import get_user_if_logged

creationForm_bp = Blueprint('creationForm', __name__)

@creationForm_bp.route('/creation-form', methods=['GET'], strict_slashes = False)
@get_user_if_logged
def creation_form(user_id):
    return "hello"