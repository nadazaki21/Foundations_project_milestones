import React, { useState, useEffect } from 'react';
import './FormStyles.css';

const SubtaskForm = ({ phases, setPhases, prevStep, handleSubmit }) => {
  const [subtaskName, setSubtaskName] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (phases.length > 0) {
      setSelectedPhase(phases[0].name);
    }
  }, [phases]);

  useEffect(() => {
    const phase = phases.find(p => p.name === selectedPhase);
    if (phase && phase.tasks.length > 0) {
      setSelectedTask(phase.tasks[0].name);
    } else {
      setSelectedTask('');
    }
  }, [selectedPhase, phases]);

  const handleAddSubtask = () => {
    if (subtaskName.trim() === '') {
      setError('Subtask name cannot be empty');
      return;
    }

    const updatedPhases = phases.map(phase => {
      if (phase.name === selectedPhase) {
        return {
          ...phase,
          tasks: phase.tasks.map(task => {
            if (task.name === selectedTask) {
              return { ...task, subtasks: [...task.subtasks, subtaskName] };
            }
            return task;
          })
        };
      }
      return phase;
    });

    setPhases(updatedPhases);
    setSubtaskName('');
    setError('');
  };

  return (
    <form className="form" onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <h2>Create Subtask</h2>
      <label>
        Subtask Name:
        <input
          type="text"
          value={subtaskName}
          onChange={(e) => setSubtaskName(e.target.value)}
          required
        />
      </label>
      <label>
        Select Phase:
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
        >
          {phases.map((phase, index) => (
            <option key={index} value={phase.name}>
              {phase.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Task:
        <select
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
          disabled={!selectedPhase}
        >
          {phases
            .find(phase => phase.name === selectedPhase)
            ?.tasks.map((task, index) => (
              <option key={index} value={task.name}>
                {task.name}
              </option>
            ))}
        </select>
      </label>
      {error && <p className="error-message">{error}</p>}
      <button
        type="button"
        className="form-button"
        onClick={handleAddSubtask}
      >
        Add Subtask
      </button>
      <button type="submit" className="form-button" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" className="form-button" onClick={prevStep}>
        Back
      </button>
      <ul>
      <h3>Phases, Tasks, and Subtasks:</h3>
        {phases.map((phase, phaseIndex) => (
          <li key={phaseIndex}>
            {phase.name}
            <ul>
              {phase.tasks.map((task, taskIndex) => (
                <li key={taskIndex}>
                  {task.name}
                  <ul>
                    {task.subtasks.map((subtask, subtaskIndex) => (
                      <li key={subtaskIndex}>{subtask}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default SubtaskForm;
