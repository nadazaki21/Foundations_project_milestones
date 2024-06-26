import React , {useEffect, useState} from "react";
import './CommentsPanel.css';
import axios from "axios";

const CommentPanel = () => {


    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/recent-comments', {
                    withCredentials: true 
                });
                setComments(response.data);
            } catch (error) { 
                console.error('Error while fetching tasks: ' + error);
            }
        };

        fetchTasks();
    }, []);


    return (
        <div className="Comments_panel">
    <h1> Recent Comments</h1>
    <table> 
        <thead>
            <tr>
                <th>Comment</th>
                <th>Project</th>
                {/* <th>By</th> */}
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {Object.keys(comments).map((key, index) => (
                <tr key={index}>
                    <td>{comments[key].description}</td>
                    <td>{comments[key].project}</td>
                    {/* <td>{comments[key].by}</td> */}
                    <td>Status Placeholder</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};
export default CommentPanel;