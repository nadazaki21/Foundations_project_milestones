import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from React Router
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReactBigCalendar.css';

const localizer = momentLocalizer(moment);

const PhaseCalendar = () => {
  const [events, setEvents] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSubtaskModal, setShowSubtaskModal] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedSubtasks, setSelectedSubtasks] = useState([]);
  const [phaseName, setPhaseName] = useState('');
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    axios.get('/api/phases')
      .then(response => {
        const phases = response.data;
        const events = phases.map(phase => ({
          id: phase.id,
          title: `${phase.name} (Project: ${phase.project.name})`,
          start: new Date(phase.start_date),
          end: new Date(phase.end_date),
          projectId: phase.project.id,
        }));
        setEvents(events);
      })
      .catch(error => {
        console.error('There was an error fetching the phases!', error);
      });
  }, []);

  const handleSelectEvent = (event) => {
    axios.get(`/api/phases/${event.id}/tasks`)
      .then(response => {
        console.log(response.data); // Debug line
        setSelectedTasks(response.data);
        setPhaseName(event.title);
        setShowTaskModal(true);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  const handleTaskClick = (task) => {
    console.log(task.subtasks); // Debug line
    setSelectedSubtasks(task.subtasks);
    setTaskName(task.name);
    setShowSubtaskModal(true);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = getColorByProject(event.projectId);
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return {
      style,
    };
  };

  const getColorByProject = (projectId) => {
    const colors = {
      1: '#FF5733', // Color for project with ID 1
      2: '#33FF57', // Color for project with ID 2
      3: '#3357FF', // Color for project with ID 3
      4: '#FF33FF', // Color for project with ID 4
      5: '#FFFF33', // Color for project with ID 5
      6: '#33FFFF', // Color for project with ID 6
      7: '#FF33FF', // Color for project with ID 7
      8: '#33FF33', // Color for project with ID 8
      9: '#FF3333', // Color for project with ID 9
      10: '#3333FF', // Color for project with ID 10
      // Add more project-specific colors here
    };
    return colors[projectId] || '#000000'; // Default color if project ID not found
  };

  return (
    <div>
      <h1 style={{ color: '#333', textAlign: 'center' }}>Phase Calendar</h1>
      <Link to="/">
        <Button variant="primary" style={{ margin: '10px' }}>Back to Dashboard</Button>
      </Link>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 1200 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
      />
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Tasks for {phaseName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {selectedTasks.map(task => (
              <ListGroup.Item key={task.id} action onClick={() => handleTaskClick(task)}>
                {task.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSubtaskModal} onHide={() => setShowSubtaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Subtasks for {taskName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {selectedSubtasks.map(subtask => (
              <li key={subtask.id}>{subtask.description}</li> // Use description property
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSubtaskModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhaseCalendar;
