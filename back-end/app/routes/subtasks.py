from flask import request, jsonify
from ..database import db
from flask import Blueprint
from ..models.models import Subtask

subtask_bp = Blueprint('subtask', __name__)

@subtask_bp.route('/subtasks/<int:subtask_id>', methods=['PUT'])
def edit_subtask(subtask_id):
    data = request.json
    description = data.get('description')
    status = data.get('status')

    if description is None and status is None:
        return jsonify({'message': 'No fields to update'}), 400

    try:
        subtask = Subtask.query.get(subtask_id)
        if not subtask:
            return jsonify({'message': 'Subtask not found'}), 404

        if description is not None:
            subtask.description = description
        if status is not None:
            subtask.status = status

        db.session.commit()
        return jsonify({'message': 'Subtask updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Internal server error'}), 500