import React from "react";
import './SingleProjectComponent.css';
import { useNavigate } from "react-router-dom";

const SingleProjectComponent = () => {
    return (
        <div className="container">
            <div className="div_header">
                <h2> My Projects </h2>
                {/* <button className="add_project"> + Create New Project</button> */}
            </div>
            <div className="projects_container">
                <div className="project_name">
                Project Name 
                </div>
                <div className="project_name">
                Project Name 
                </div>
                <div className="project_name">
                Project Name 
                </div>
                <div className="project_name">
                Project Name 
                </div>
                <div className="project_name">
                Project Name 
                </div>
            
            </div>
        </div>
    );
};

export default SingleProjectComponent;
