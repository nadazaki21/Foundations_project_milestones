import React , {useState} from "react";
import SingleProjectComponent from "./SingleProjectComponent";
import Given_Tasks from "./Given_Tasks";
import "./MyProjects.css";
import SideButtons from "../DashBoard/SideButtons";
// import NewProjectButton from "../MyProjects/NewProjectButton";
import NewProjectForm from "../CreationForms/NewProjectForm";
import { useNavigate } from "react-router-dom";
const MyProjects = () => {

    const navigate = useNavigate();

    const [clicked, setClicked] = useState(false);

    return (
        clicked ? <div className="creation_form">
            <div className="header">
                <img  onClick={() => navigate('/')} className="logo" src="https://cdn.dribbble.com/userupload/12196251/file/original-84d2e13b8e5602c0e15a891bb8fdb101.png?resize=400x300&vertical=center" />
            </div>
            <div className="button_with_form">
            <button className="back_button" onClick={() => setClicked(false)} >Back To Projects</button>
                <NewProjectForm /> 
            </div>
        
            
        </div>  :
        <div className="all">
           <div className="header">
                <img  onClick={() => navigate('/')} className="logo" src="https://cdn.dribbble.com/userupload/12196251/file/original-84d2e13b8e5602c0e15a891bb8fdb101.png?resize=400x300&vertical=center" />
            </div>
            
            <div className="side_buttons">
                <SideButtons />
            </div>
            <button className="add_project button" onClick={() => setClicked(true)}> + Create New Project</button>
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