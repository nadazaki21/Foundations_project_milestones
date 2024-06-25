import React from 'react';
import './SubmissionPage.css'; // Import CSS file for styling

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // Only format date, without time
};

const SubmissionPage = ({ projectData, phases }) => {
  return (
    <div className="submission-page">
      <header className="page-header">
        <h1 className="project-name">{projectData.name}</h1>
        <p className="success-message">Project created successfully!</p>
      </header>

      <div className="navigation-buttons">
        <button className="nav-button" onClick={() => window.location.href='/my-projects'}>My Projects</button>
        <button className="nav-button" onClick={() => window.location.href='/'}>Dashboard</button>
      </div>

      <section className="phases-container">
        {phases.map((phase, phaseIndex) => (
          <div key={phaseIndex} className="phase">
            <h2 className="phase-title">{phase.name}</h2>
            <div className="phase-details">
              <p><strong>Start Date:</strong> {formatDate(phase.start_date)}</p>
              <p><strong>End Date:</strong> {formatDate(phase.end_date)}</p>
            </div>

            <div className="tasks-list">
              <h3 className="section-title">Tasks:</h3>
              {phase.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="task">
                  <p className="task-name">{task.name}</p>
                  <div className="task-details">
                    <p><strong>Start Date:</strong> {formatDate(task.creation_date)}</p>
                    <p><strong>Deadline:</strong> {formatDate(task.deadline)}</p>
                    <p><strong>Status:</strong> {task.status === 0 ? 'Pending' : 'Completed'}</p>
                    
                    <div className="subtasks">
                      <h4 className="section-title">Subtasks:</h4>
                      <ul className="subtask-list">
                        {task.subtasks.map((subtask, subtaskIndex) => (
                          <li key={subtaskIndex}>{subtask}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default SubmissionPage;
