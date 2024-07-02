import React from 'react';
import axios from 'axios';
import './styles.css';

const TaskDetailsModal = ({ task, onClose, onTaskUpdate }) => {
  const calculateProgress = (subtasks) => {
    if (!subtasks || subtasks.length === 0) {
      return 0;
    }

    const completedSubtasks = subtasks.filter(subtask => subtask.status === 1); // Assuming status 1 means completed
    return (completedSubtasks.length / subtasks.length) * 100;
  };

  const handleSubtaskChange = async (subtaskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/subtasks/${subtaskId}`,
        { status: newStatus },
        { headers: { 'Content-Type': 'application/json' } }
      );

      await axios.put(
        `http://localhost:5000/mytasks/${task.id}`,
        { status: newStatus },
        { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
      );

      // Fetch the updated task details and notify parent component
      const response = await axios.get(`http://localhost:5000/mytasks/${task.id}`, 
        { withCredentials: true }
      );
      onTaskUpdate(response.data);
    } catch (error) {
      console.error('Error updating subtask:', error);
    }
  };

  const progress = calculateProgress(task.subtasks);

  return (
    <div className="my-tasks-modal">
      <div className="my-tasks-modal-content">
        <span className="my-tasks-close" onClick={onClose}>&times;</span>
        <h2>Task Details</h2>
        <p><strong>Title:</strong> {task.name}</p>
        <p><strong>Description:</strong> {task.description}</p>
        <p><strong>Start Date:</strong> {task.startDate}</p>
        <p><strong>Due Date:</strong> {task.deadline}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p>
          <strong>Progress:</strong> {progress.toFixed(2)}%
        </p>
        <div className={`my-tasks-progress-bar ${progress === 100 ? 'animated' : ''}`}>
          <div
            className="my-tasks-progress"
            style={{ width: `${progress}%` }}
            data-progress={progress.toFixed(2)}
          ></div>
          <span>{`${progress.toFixed(2)}%`}</span>
        </div>
        <ul>
          {task.subtasks.map((subtask) => (
            <li key={subtask.id}>
              <input
                type="checkbox"
                checked={subtask.status === 1}  // Assuming status 1 means completed
                onChange={() => handleSubtaskChange(subtask.id, subtask.status === 1 ? 0 : 1)}
              />
              {subtask.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
