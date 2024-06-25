import React, { useState } from 'react';
import './FormStyles.css';

const ProjectForm = ({ projectData, setProjectData, nextStep }) => {
  const [name, setName] = useState(projectData.name || '');
  const [owners, setOwners] = useState(projectData.owners || []);
  const [members, setMembers] = useState(projectData.members || []);
  const [users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setProjectData({ ...projectData, name, owners, members });
    nextStep();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Project</h2>
      <label>
        Project Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Owners:
        <select multiple value={owners} onChange={(e) => setOwners([...e.target.selectedOptions].map(option => option.value))}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </label>
      <label>
        Members:
        <select multiple value={members} onChange={(e) => setMembers([...e.target.selectedOptions].map(option => option.value))}>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="form-button">Next</button>
    </form>
  );
};

export default ProjectForm;
