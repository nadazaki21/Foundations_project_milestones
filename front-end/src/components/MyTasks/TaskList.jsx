import React from 'react';
import './styles.css';
import TaskDetailsModal from './TaskDetailsModal';

const TaskList = ({ tasks, fetchTasks }) => {
  const [selectedTask, setSelectedTask] = React.useState(null);

  const openTaskDetails = (task) => {
    setSelectedTask(task);
  };

  const handleTaskUpdate = (updatedTask) => {
    setSelectedTask(updatedTask);
    fetchTasks(); // Refresh tasks after updating a subtask
  };

  const calculateProgress = (task) => {
    if (!task.subtasks || task.subtasks.length === 0) {
      return 0;
    }

    const completedSubtasks = task.subtasks.filter(subtask => subtask.status === 1);
    return (completedSubtasks.length / task.subtasks.length) * 100;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Not Started';
      case 1:
        return 'In Progress';
      case 2:
        return 'Completed';
      default:
        return '';
    }
  };

  return (
    <div>
      <table className="my-tasks-task-table">
        <thead>
          <tr>
            <th>Number</th>
            <th>Name</th>
            <th>Start Date</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <tr className="my-tasks-expandable-row" onClick={() => openTaskDetails(task)}>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td>{formatDate(task.creation_date)}</td>
                <td>{formatDate(task.deadline)}</td>
                <td>{getStatusText(task.status)}</td>
                <td>
                  <div className={`my-tasks-progress-bar ${task.progress === 100 ? 'animated' : ''}`}>
                    <div
                      className="my-tasks-progress"
                      style={{ width: `${calculateProgress(task)}%` }}
                      data-progress={calculateProgress(task).toFixed(2)}
                    ></div>
                    <span>{`${calculateProgress(task).toFixed(2)}%`}</span>
                  </div>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => {
            setSelectedTask(null);
            fetchTasks(); // Refresh tasks after closing the modal
          }}
          onTaskUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
};

export default TaskList;
