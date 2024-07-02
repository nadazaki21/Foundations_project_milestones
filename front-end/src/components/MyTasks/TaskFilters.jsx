import React, { useState } from 'react';
import './styles.css';

const TaskFilters = ({ onFilter }) => {
  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('');

  const handleFilter = () => {
    onFilter({ searchText, status });
  };

  return (
    <div className="my-tasks-filters">
      <input
        type="text"
        placeholder="Search by task name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
    </div>
  );
};

export default TaskFilters;
