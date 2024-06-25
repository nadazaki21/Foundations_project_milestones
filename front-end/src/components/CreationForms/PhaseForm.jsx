import React, { useState } from 'react';
import './FormStyles.css';

const PhaseForm = ({ phases, setPhases, nextStep, prevStep }) => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleAddPhase = () => {
    if (name.trim() === '' || startDate.trim() === '' || endDate.trim() === '') {
      setError('All fields are required');
      return;
    }

    const newPhase = {
      name: name,
      start_date: new Date(startDate).toISOString(), // Ensure date format is compatible with backend
      end_date: new Date(endDate).toISOString(), // Ensure date format is compatible with backend
      tasks: []
    };

    // Normally, you would send the new phase data to the backend here
    // For this example, we'll just update the local state
    setPhases([...phases, newPhase]);

    // Reset form fields
    setName('');
    setStartDate('');
    setEndDate('');
    setError('');
  };

  const handleNextStep = () => {
    if (phases.length === 0) {
      setError('You must add at least one phase');
      return;
    }
    nextStep();
  };

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <h2>Create Phase</h2>
      <label>
        Phase Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </label>
      <label>
        End Date:
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button type="button" className="form-button" onClick={handleAddPhase}>Add Phase</button>
      <button type="button" className="form-button" onClick={handleNextStep}>Next</button>
      <button type="button" className="form-button" onClick={prevStep}>Back</button>
      {phases.length > 0 && (
        <div className="phases-list">
          <h3>Phases:</h3>
          <ul>
            {phases.map((phase, index) => (
              <li key={index}>
                <strong>{phase.name}</strong>
                <br />
                Start Date: {new Date(phase.start_date).toLocaleDateString()}
                <br />
                End Date: {new Date(phase.end_date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default PhaseForm;
