import React, {useState, useEffect} from "react";
import './TaskPanel.css';
import axios from "axios";


const TaskPanel = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ongoing-tasks', {
                    withCredentials: true 
                });
                setTasks(response.data);
            } catch (error) { 
                console.error('Error while fetching tasks: ' + error);
            }
        };

        fetchTasks();
    }, []);

    // wrong implementation

    // const GetUserTasks = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:5000/ongoing-tasks')
    //     }
    //     catch (error) { 
    //         console.error('Error while fetching tasks'+ error);
    //     }

    //     return response
    // }


    // const tasks = GetUserTasks();



    return (
        <div className="tasks_panel">
    <h1> On going tasks</h1>
    {/* table headers */}
    <table> 
        <thead>
            <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Manager</th>
                <th>Start Date</th>
                <th>Deadline</th>
                {/* <th>Status</th> */}
                <th>Percentage Completed</th>
            </tr>
        </thead>

        <tbody>
            { Object.keys(tasks).map((key, index) => (
                <tr key={index}>
                    <td>{tasks[key].task_name}</td>
                    <td>{tasks[key].project}</td>
                    <td>Manager Placeholder</td>
                    <td>{new Date(tasks[key].start_date).toLocaleDateString()}</td>
                    <td>{new Date(tasks[key].deadline).toLocaleDateString()}</td>
                    <td>Percentage Placeholder</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};
export default TaskPanel;