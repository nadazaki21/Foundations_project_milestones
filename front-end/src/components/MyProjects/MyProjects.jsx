import React from "react";
import SingleProjectComponent from "./SingleProjectComponent";
import Given_Tasks from "./Given_Tasks";
import "./MyProjects.css";
import SideButtons from "../DashBoard/SideButtons";
import { useNavigate } from "react-router-dom";
const MyProjects = () => {

    const navigate = useNavigate();

    return (
        <div className="all">
           <div className="header">
                <img  onClick={() => navigate('/')} className="logo" src="https://cdn.dribbble.com/userupload/12196251/file/original-84d2e13b8e5602c0e15a891bb8fdb101.png?resize=400x300&vertical=center" />
            </div>
            <div className="side_buttons">
                <SideButtons />
            </div>
            <div className="projects_container">
            <SingleProjectComponent />
            </div>
            <div className="given_tasks">
                <Given_Tasks />
            </div>
        </div>
        
    );
};
export default MyProjects;