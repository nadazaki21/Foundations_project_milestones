import React from "react";
import './TaskPanel.css';

const TaskPanel = () => {
    return (
        <div className="tasks_panel">
    <h1> On going tasks</h1>
    <table> 
        <thead>
            <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Manager</th>
                <th>Start Date</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Percentage Completed</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Task 1</td>
                <td>Project Alpha</td>
                <td>John Doe</td>
                <td>2022-01-01</td>
                <td>2022-01-31</td>
                <td>Completed</td>
                <td>100%</td>
            </tr>
            <tr>
                <td>Task 2</td>
                <td>Project Beta</td>
                <td>Jane Doe</td>
                <td>2022-02-01</td>
                <td>2022-02-28</td>
                <td>In Progress</td>
                <td>50%</td>
            </tr>
        </tbody>
    </table>
</div>

    );
};
export default TaskPanel;