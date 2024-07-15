from flask import Blueprint, jsonify
from ..models.models import Phase, Project, User, Task
from ..wrappers import get_user_if_logged
calPhases_bp = Blueprint('PhasesCalendar', __name__)


# Route to get phases with tasks for the logged-in user
@calPhases_bp.route('/phases', methods=['GET'], strict_slashes = False)
@get_user_if_logged 
def get_phases(user_id):
    """returns all phases of all projects"""
    phases = Phase.query.join(Project).filter(Project.members.any(id=user_id)).all()
    phases_data = []
    for phase in phases:
        phase_dict = phase.to_dict()
        phase_dict['projectId'] = phase.project.id
        phase_dict['projectName'] = phase.project.name
        phases_data.append(phase_dict)
    return jsonify(phases_data)

# Route to get tasks for a specific phase
@calPhases_bp.route('/phases/<int:phase_id>/tasks', methods=['GET'])
@get_user_if_logged
def get_tasks_for_phase(user_id, phase_id):
    """ returns tasks of a specific phase """
    phase = Phase.query.get_or_404(phase_id)
    tasks = Task.query.filter_by(phase_id=phase_id, assigned_member=user_id).all()
    tasks_data = [task.to_dict() for task in tasks]
    return jsonify(tasks_data)
