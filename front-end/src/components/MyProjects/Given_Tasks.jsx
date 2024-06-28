import React from "react";
import "./Given_Tasks.css";


const Given_Tasks = () => {
    return (
        <div className="container">
            <h2>Given Tasks</h2>
            <div className="given_tasks_list">
                <table>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Percentage</th>
                    </tr>
                    <tr>
                        <td class ="task_name">Task 1</td>
                        <td>Description of Task 1</td>
                        <td>100%</td>
                    </tr>
                    <tr>
                        <td>Task 2</td>
                        <td>Description of Task 2</td>
                        <td>50%</td>
                    </tr>
                    <tr>
                        <td>Task 3</td>
                        <td>Description of Task 3</td>
                        <td>0%</td>
                    </tr>
                </table>
                {/* <div className="task">
            
                    <div className="task_name">Task 1</div>
                    <div className="task_description">Description of Task 1</div>
                    <div className="percentage">100%</div>
                </div> */}
            </div>
        </div>
    );
};  
export default Given_Tasks;