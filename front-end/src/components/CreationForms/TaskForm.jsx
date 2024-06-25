import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const TaskForm = ({ phases, setPhases, prevStep, nextStep }) => {
  const [taskName, setTaskName] = useState('');
  const [selectedPhase, setSelectedPhase] = useState(phases.length > 0 ? phases[0].name : '');
  const [startDate, setStartDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedMember, setAssignedMember] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend or set them manually for testing
    // For example:
    setUsers([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ]);
  }, []);

  const handleAddTask = () => {
    if (taskName.trim() === '' || startDate.trim() === '' || deadline.trim() === '' || !selectedPhase) {
      setError('Task name, start date, deadline, and phase selection are required');
      return;
    }

    const phase = phases.find(phase => phase.name === selectedPhase);
    if (!phase) {
      setError('Selected phase not found');
      return;
    }

    const assignedUser = users.find(user => user.id === parseInt(assignedMember));
    const newTask = {
      name: taskName,
      phase_id: phase.id,
      start_date: new Date(startDate).toISOString(),
      deadline: new Date(deadline).toISOString(),
      assigned_member: parseInt(assignedMember),
      assigned_member_name: assignedUser ? assignedUser.name : 'Unassigned',
      subtasks: []
    };

    const updatedPhases = phases.map(phaseItem => {
      if (phaseItem.name === selectedPhase) {
        return {
          ...phaseItem,
          tasks: [...phaseItem.tasks, newTask]
        };
      }
      return phaseItem;
    });

    setPhases(updatedPhases);

    setTaskName('');
    setStartDate('');
    setDeadline('');
    setAssignedMember('');
    setError('');
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <h2>Create Task</h2>
      <label>
        Task Name:
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
      </label>
      <label>
        Select Phase:
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          required
        >
          <option value="" disabled>Select Phase</option>
          {phases.map((phase, index) => (
            <option key={index} value={phase.name}>
              {phase.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        Deadline:
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </label>
      <label>
        Assigned Member:
        <select
          value={assignedMember}
          onChange={(e) => setAssignedMember(e.target.value)}
          required
        >
          <option value="" disabled>Select Member</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="button" className="form-button" onClick={handleAddTask}>
        Add Task
      </button>
      <button type="button" className="form-button" onClick={nextStep}>
        Next
      </button>
      <button type="button" className="form-button" onClick={prevStep}>
        Back
      </button>
      <div className="tasks-list">
        <h3>Phases:</h3>
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex}>
            <h4>{phase.name}</h4>
            <ul>
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  {task.name} (For: {task.assigned_member_name})
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </form>
  );
};

export default TaskForm;
