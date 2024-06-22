import React from "react";
import './CommentsPanel.css';

const CommentPanel = () => {
    return (
        <div className="Comments_panel">
    <h1> Recent Comments</h1>
    <table> 
        <thead>
            <tr>
                <th>Comment</th>
                <th>Project</th>
                <th>Manager</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Comment 1</td>
                <td>Project Alpha</td>
                <td>John Doe</td>
                <td>Read</td>
            </tr>
            <tr>
                <td>Comment 2</td>
                <td>Project Beta</td>
                <td>Jane Doe</td>
                <td>Unread</td>
            </tr>
        </tbody>
    </table>
</div>

    );
};
export default CommentPanel;