import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import './styles.css';
import SideButtons from '../DashBoard/SideButtons';
import { useNavigate } from "react-router-dom";



const MyTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/mytasks', { withCredentials: true })
      .then(response => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  };

  const filterTasks = (filters) => {
    const { searchText, status } = filters;
    let filtered = tasks;

    if (searchText) {
      filtered = filtered.filter((task) =>
        task.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (status !== '') {
      filtered = filtered.filter((task) => {
        if (status === 'Not Started') {
          return task.status === 0;
        } else if (status === 'In Progress') {
          return task.status === 1;
        } else if (status === 'Completed') {
          return task.status === 2;
        }
        return true; // Handle other cases
      });
    }

    setFilteredTasks(filtered);
  };

  return (
    <>
    <img  className="logo" onClick={() => navigate('/')}
    src="https://cdn.dribbble.com/userupload/12196251/file/original-84d2e13b8e5602c0e15a891bb8fdb101.png?resize=400x300&vertical=center"
    alt="TeamWave logo"
    />
    
    <SideButtons/>
    <div className="my-tasks-container">
      <header className="my-tasks-header">
        <h1>My Tasks</h1>
      </header>
      <TaskFilters onFilter={filterTasks} />
      <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
    </div>
    </>
  );
};

export default MyTasksPage;
