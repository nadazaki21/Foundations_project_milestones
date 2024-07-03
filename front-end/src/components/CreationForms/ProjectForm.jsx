import React, { useState } from 'react';
import './FormStyles.css';
import axios from 'axios';

const ProjectForm = ({ projectData, setProjectData, nextStep }) => {
  const [name, setName] = useState(projectData.name || '');
  const [owners, setOwners] = useState(projectData.owners || []);
  const [members, setMembers] = useState(projectData.members || []);
  const [users, setUsers] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    // When an event (such as a click, form submission, or input change) occurs in the browser, the browser generates an event object and passes it to the event handler function.

    let project_id = ''
    axios.post('http://localhost:5000/creation_form/add_project',
      {
        name : {name},
        owners: {owners},
        members: {members}
      },
      {
        withCredentials: true 
      },
    )
    .then(response => {
      console.log(response.data);
      const data = response.data
      project_id = data.id
      console.log("project_id is ", project_id)
      // setProjectData has to be here not outside as the axios request ia async
      setProjectData({ ...projectData, name, owners, members, project_id : project_id }); // modifies the object by adding or overrding values
    })
    .catch(error => {
      console.error(error);
    });

    
    nextStep();
  };

  //The target property of the event object (e.target) refers to the element that triggered the event.

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
            <option key={user.id} value={user}>{user.name}</option>
          ))}
        </select>
      </label>
      <label>
        Members:
        <select multiple value={members} onChange={(e) => setMembers([...e.target.selectedOptions].map(option => option.value))}>
          {users.map(user => (
            <option key={user.id} value={user}>{user.name}</option>
          ))}
        </select>
      </label>
      <button type="submit" className="form-button">Next</button>
    </form>
  );
};

export default ProjectForm;
