# Foundations Project Milestones

Welcome to the Foundations Project Milestones repository! This project is a comprehensive task management system designed to facilitate project planning, task assignment, and progress tracking. It is built using React for the frontend, Flask for the backend, and integrates with a PostgreSQL database. This README provides an overview of the project structure, setup instructions, and other relevant details.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Credits](#credits)
- [License](#license)

## Introduction

Foundations Project Milestones is a web-based application aimed at enhancing project management efficiency. It allows users to create projects, define phases, assign tasks with subtasks, and track progress seamlessly. This README provides essential information to set up the project locally and contribute to its development.

## Features

- **User Authentication:** Secure login and signup functionalities.
- **Project Management:** Create and manage multiple projects.
- **Phase and Task Tracking:** Define project phases and assign tasks to them.
- **Task Details and Subtasks:** View detailed task information and track subtask completion.
- **Calendar Integration:** Visualize project phases and their timelines using a calendar view.

## Technologies Used

- **Frontend:** React.js, React Router, React Big Calendar
- **Backend:** Flask, Flask migration, Flask sessions, BluePrint, SQLAlchemy
- **Database:** MYSQL
- **API Integration:** Axios for HTTP requests
- **Styling:** CSS

## Project Structure

The project directory is organized as follows:

  <pre>
Foundations_project_milestones/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── LoginSignup/
│   │   │   ├── MyProjects/
│   │   │   ├── MyTasks/
│   │   │   ├── PhasesCalendar/
│   │   │   ├── TaskManagement/
│   │   │   ├── CreationForms/
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── package.json
│   ├── README.md
│   └── ...
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── migrations/
│   ├── app.py
│   └── ...
├── README.md
└── ...
  </pre>

  <h2 id="setup-instructions">Setup Instructions</h2>

  <ol>
    <li><strong>Clone the repository:</strong>
      <pre><code>git clone https://github.com/nadazaki21/Foundations_project_milestones.git
cd Foundations_project_milestones</code></pre>
    </li>
    <li><strong>Setup Backend:</strong>
      <ul>
        <li>Navigate to the <code>backend/</code> directory.</li>
        <li>Create a virtual environment (optional but recommended).</li>
        <li>Install dependencies:
          <pre><code>pip install -r requirements.txt</code></pre>
        </li>
        <li>Setup the database:
          <pre><code>flask db upgrade</code></pre>
        </li>
        <li>Start the Flask server:
          <pre><code>flask run</code></pre>
        </li>
      </ul>
    </li>
    <li><strong>Setup Frontend:</strong>
      <ul>
        <li>Navigate to the <code>frontend/</code> directory.</li>
        <li>Install dependencies:
          <pre><code>npm install</code></pre>
        </li>
        <li>Start the React development server:
          <pre><code>npm start</code></pre>
        </li>
      </ul>
    </li>
    <li><strong>Access the Application:</strong> Open your web browser and go to <code>http://localhost:3000</code> to view the application.</li>
  </ol>

  <h2 id="credits">Credits</h2>

  <p>This project is developed and maintained by:</p>

  <ul>
    <li><a href="https://github.com/nadazaki21">Nada Zaki</a></li>
    <li><a href="https://github.com/mahmoudelsherbine">Mahmoud El Sherbine</a></li>
  </ul>

  <h2 id="license">License</h2>

  <p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>

</body>
</html>
