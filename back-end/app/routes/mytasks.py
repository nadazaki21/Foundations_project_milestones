from ..models.models import Task, Subtask
from flask import request, jsonify
from flask import Blueprint
from ..database import db
from ..wrappers import get_user_if_logged
task_bp = Blueprint('task', __name__)



@task_bp.route('/mytasks', methods=['GET'], strict_slashes=False)
@get_user_if_logged
def get_user_tasks(user_id):
    """returns all tasks assigned to the logged in user"""
    try:
        tasks = Task.query.filter_by(assigned_member=user_id).all()
        tasks_list = [task.to_dict() for task in tasks]
        return jsonify(tasks_list), 200
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500


@task_bp.route('/mytasks/<int:id>', methods=['PUT'])
@get_user_if_logged
def update_task(user_id, id):
    """updates a task"""
    try:
        # Fetch the task from the database
        task = Task.query.get(id)
        if not task:
            return jsonify({'message': 'Task not found'}), 404

        # Parse request JSON data
        data = request.json

        # Update task fields
        if 'status' in data:
            new_status = int(data['status'])  # Ensure status is an integer
            if new_status in [0, 1, 2]:  # Valid status values
                task.status = new_status
            else:
                return jsonify({'message': 'Invalid status value'}), 400  # Bad request

        # Update subtasks if present in request data
        if 'subtasks' in data:
            for subtask_data in data['subtasks']:
                subtask_id = subtask_data['id']
                subtask = Subtask.query.get(subtask_id)
                if subtask:
                    subtask.status = subtask_data.get('status', subtask.status)  # Update status if provided
                    db.session.add(subtask)

        # Calculate task progress based on subtasks
        if task.subtasks:
            completed_subtasks = [subtask for subtask in task.subtasks if subtask.status == 1]  # Count subtasks with status 1 (completed)
            progress = (len(completed_subtasks) / len(task.subtasks)) * 100
            task.progress = round(progress, 2)

            # Update task status based on progress
            if progress == 100:
                task.status = 2  # Completed
            elif progress > 0:
                task.status = 1  # In Progress
            else:
                task.status = 0  # Not Started

        # Update task in the database
        db.session.add(task)
        db.session.commit()

        return jsonify(task.to_dict()), 200

    except Exception as e:
        print(str(e))  # Log the error for debugging
        db.session.rollback()  # Rollback changes on error
        return jsonify({'message': 'Internal server error'}), 500


@task_bp.route('/mytasks/<int:id>', methods=['GET'])
@get_user_if_logged
def get_task(user_id, id):
    try:
        task = Task.query.get(id)
        if not task:
            return jsonify({'message': 'Task not found'}), 404
        return jsonify(task.to_dict()), 200
    except Exception as e:
        return jsonify({'message': 'Internal server error'}), 500
