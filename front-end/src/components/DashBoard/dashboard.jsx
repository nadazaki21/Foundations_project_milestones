import React , { useState } from "react";
import './DashBoard.css';
import SideButtons from "./SideButtons";
import TaskPanel from "./TaskPanel";
import NotificationsButton from "./notifications_button";
import CommentsPanel from "./CommentsPanel";
import Piechart from "./chart";



const DashBoard = () => {
    return (
        
        <div className="whole_dashboard">
            <div className="header">
                <img  className="logo" src="https://cdn.dribbble.com/userupload/12196251/file/original-84d2e13b8e5602c0e15a891bb8fdb101.png?resize=400x300&vertical=center" />
                <div className="bell">
                    <NotificationsButton/>
                </div>
                
            </div>

            <div className="items">
            <div className="sb">
                <SideButtons/>
            </div>
            <div className="tasks_and_comments">
                <div className="task_panel">
                    <TaskPanel/>
                    <Piechart/>
                </div>
                <div className="comments_panel">
                    <CommentsPanel/>
                </div>
            </div>
            </div>
        </div>
    );
};  
export default DashBoard;