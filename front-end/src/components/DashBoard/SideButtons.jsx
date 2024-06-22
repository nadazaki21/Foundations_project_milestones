import React from "react";
import './SideButtons.css';

const SideButtons = () => {
    return (
        <div className="button_container">
        <div className="horizontal_btn">
          <div className="btn"><button>My Projects</button></div>
          <div className="btn"><button>My Tasks</button></div>
          <div className="btn"><button>My Calender</button></div>
        </div>
      </div>
      
    );
};
export default SideButtons;