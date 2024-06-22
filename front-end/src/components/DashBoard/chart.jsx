import React from "react";
import './chart.css';

const NotificationsButton = () => {
    return (
        <div className="piechart_container">
            <div className="piechart"></div>
            
            <div className="colourguide_container">
                <div className="item">
                <div id="item1"className="color"></div>
                <div className="project_name">Project Alpha</div>
                </div>
                <div className="item">
                <div id="item2" className="color"></div>
                <div className="project_name">Project Beta</div>
                </div>
                
            </div>
        </div>
        
        
    );
};
export default NotificationsButton;