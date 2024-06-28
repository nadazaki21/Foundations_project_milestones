import React, { useState, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard/dashboard';
import Login from './components/LoginSignup/login';
import Signup from './components/LoginSignup/signup';
import PhaseCalendar from './components/PhasesCalendar/ReactBigCalendar';
import NewProjectForm from './components/CreationForms/NewProjectForm'
import MyProjects from './components/MyProjects/MyProjects';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import axios from 'axios';



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
  }
]);

// // Function to check if the user is logged in
// const checkLoginStatus = async () => {
//   try {
//     const response = await axios.get('/user-data');
//     return response.status === 200;
//   } catch (error) {
//     return false;
//   }
// };

// // ProtectedRoute component
// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(null);

//   useEffect(() => {
//     const verifyLogin = async () => {
//       const loggedIn = await checkLoginStatus();
//       setIsLoggedIn(loggedIn);
//     };
//     verifyLogin();
//   }, []);

//   if (isLoggedIn === null) {
//     return <p>Loading...</p>; // or a loading spinner
//   }

//   return isLoggedIn ? <Element {...rest} /> : <Navigate to="/login" />;
// };

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login/>} />
    //     <Route path="/signup" element={<Signup/>} />
    //     {/* <Route path="/" element={<ProtectedRoute element={DashBoard} />} /> */}
    //     <Route path="/" element={<DashBoard/>} />
    //   </Routes>
    // </Router>



    // <Router>
    //   <Switch>
    //     <Route  path = "/">
    //        <DashBoard/>
    //     </Route>
    //     <Route  path = "/login">
    //        <Login/>
    //     </Route>
    //     <Route  path = "/signup">
    //        <Signup/>
    //     </Route>
    //   </Switch>
    // </Router>


    <RouterProvider router={router} />
  );
}

export default App;
