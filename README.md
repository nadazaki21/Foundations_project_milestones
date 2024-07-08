
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

- **Frontend:** React.js, React Router, React Big Calendar, Bootstrap
- **Backend:** Flask, Flask RESTful, SQLAlchemy
- **Database:** PostgreSQL
- **API Integration:** Axios for HTTP requests
- **Styling:** CSS, Bootstrap CSS

## Project Structure

The project directory is organized as follows:


Foundations_project_milestones/
│
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
│
├── backend/
│   ├── app/
│   │   ├── models.py
│   │   ├── routes.py
│   │   └── ...
│   ├── migrations/
│   ├── config.py
│   ├── run.py
│   └── ...
│
├── README.md
├── .gitignore
└── ...


- **frontend/**: Contains the React.js frontend application.
- **backend/**: Includes the Flask backend server and database configurations.
- **README.md**: This file providing an overview of the project.

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nadazaki21/Foundations_project_milestones.git
   cd Foundations_project_milestones
   ```

2. **Setup Backend**:
   - Navigate to the `backend/` directory.
   - Create a virtual environment (optional but recommended).
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Setup the database:
     ```bash
     flask db upgrade
     ```
   - Start the Flask server:
     ```bash
     flask run
     ```

3. **Setup Frontend**:
   - Navigate to the `frontend/` directory.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   - Open your web browser and go to `http://localhost:3000` to view the application.

## Credits

This project is developed and maintained by:

- [Nada Zaki](https://github.com/nadazaki21)
- [Mahmoud El Sherbine](https://github.com/mahmoudelsherbine)

Special thanks to [Your Name] for contributions and support.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
