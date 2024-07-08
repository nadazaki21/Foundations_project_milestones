
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    ul {
      list-style-type: disc;
      padding-left: 20px;
    }
    code {
      background-color: #f4f4f4;
      padding: 5px;
      border-radius: 3px;
    }
  </style>
</head>
<body>

  <h1>Foundations Project Milestones</h1>

  <p>Welcome to the Foundations Project Milestones repository! This project is a comprehensive task management system designed to facilitate project planning, task assignment, and progress tracking. It is built using React for the frontend, Flask for the backend, and integrates with a PostgreSQL database. This README provides an overview of the project structure, setup instructions, and other relevant details.</p>

  <h2>Table of Contents</h2>

  <ul>
    <li><a href="#introduction">Introduction</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#technologies-used">Technologies Used</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#setup-instructions">Setup Instructions</a></li>
    <li><a href="#credits">Credits</a></li>
    <li><a href="#license">License</a></li>
  </ul>

  <h2 id="introduction">Introduction</h2>

  <p>Foundations Project Milestones is a web-based application aimed at enhancing project management efficiency. It allows users to create projects, define phases, assign tasks with subtasks, and track progress seamlessly. This README provides essential information to set up the project locally and contribute to its development.</p>

  <h2 id="features">Features</h2>

  <ul>
    <li><strong>User Authentication:</strong> Secure login and signup functionalities.</li>
    <li><strong>Project Management:</strong> Create and manage multiple projects.</li>
    <li><strong>Phase and Task Tracking:</strong> Define project phases and assign tasks to them.</li>
    <li><strong>Task Details and Subtasks:</strong> View detailed task information and track subtask completion.</li>
    <li><strong>Calendar Integration:</strong> Visualize project phases and their timelines using a calendar view.</li>
  </ul>

  <h2 id="technologies-used">Technologies Used</h2>

  <ul>
    <li><strong>Frontend:</strong> React.js, React Router, React Big Calendar</li>
    <li><strong>Backend:</strong> Flask, Flask migration, Flask sessions, BluePrint, SQLAlchemy</li>
    <li><strong>Database:</strong> MYSQL</li>
    <li><strong>API Integration:</strong> Axios for HTTP requests</li>
    <li><strong>Styling:</strong> CSS</li>
  </ul>

  <h2 id="project-structure">Project Structure</h2>

  <p>The project directory is organized as follows:</p>

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
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── ...
│   ├── migrations/
│   ├── config.py
│   ├── run.py
│   └── ...
├── README.md
├── .gitignore
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
