import React from "react";
import './SideButtons.css';
import { useNavigate } from "react-router-dom";

const SideButtons = () => {

  const navigate = useNavigate();
  
    return (
        <div className="button_container">
        <div className="horizontal_btn">
          <div className="btn"><button onClick={() => navigate('/myprojects')}>My Projects</button></div>
          <div className="btn"><button onClick={() => navigate('/mytasks') }>My Tasks</button></div>
          <div className="btn"><button onClick={() => navigate('/cal') }>My Calender</button></div>
        </div>
      </div>
      
    );
};
export default SideButtons;