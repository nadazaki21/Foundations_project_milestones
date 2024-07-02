import React, { useState, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard/dashboard';
import Login from './components/LoginSignup/login';
import Signup from './components/LoginSignup/signup';
import PhaseCalendar from './components/PhasesCalendar/ReactBigCalendar';
import NewProjectForm from './components/CreationForms/NewProjectForm'
import MyProjects from './components/MyProjects/MyProjects';
import MyTasksPage from './components/MyTasks/MyTasksPage';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: <DashBoard/>,

  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/cal",
    element: <PhaseCalendar/>
  },
  {
    path: "/projectinfo",
    element: <NewProjectForm/>
  },
  {
    path: "/myprojects",
    element: <MyProjects/>
  },
  {
    path: "/mytasks",
    element: <MyTasksPage/>
  }

]);

function App() {
  
  return (
    
    <RouterProvider router={router} />
  );
}

export default App;
