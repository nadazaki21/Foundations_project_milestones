import React from 'react';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <div className="about-section">
      <h2>About This Project</h2>
      <p>
        This project was inspired by our collective need for a robust and intuitive task management system. 
        As a team, we realized the importance of having a tool that could help us keep track of our tasks, 
        manage deadlines, and collaborate effectively. Our journey began driven by a 
        shared vision to create something that would not only serve our needs but also benefit others in 
        similar situations.
      </p>
      <p>
        This project is a part of our Portfolio for Holberton School. You can find more about the Holberton 
        School and its programs <a href="https://www.holbertonschool.com" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
      <div className="team-section">
        <h3>Meet the Team</h3>
        <ul>
          <li>
            <h4>Mahmoud El Sherbine</h4>
            <a href="https://linkedin.com/in/mahmoudelherbine" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            <a href="https://github.com/mahmoudelherbine" target="_blank" rel="noopener noreferrer"> GitHub</a> | 
            <a href="https://twitter.com/mahmoudelherbine" target="_blank" rel="noopener noreferrer"> Twitter</a>
          </li>
          <li>
            <h4>Nada Zaki</h4>
            <a href="https://linkedin.com/in/nadazaki" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
            <a href="https://github.com/nadazaki" target="_blank" rel="noopener noreferrer"> GitHub</a> | 
            <a href="https://twitter.com/nadazaki" target="_blank" rel="noopener noreferrer"> Twitter</a>
          </li>
        </ul>
      </div>
      <p>
        You can find the GitHub repository for this project <a href="https://github.com/nadazaki21/Foundations_project_milestones.git" target="_blank" rel="noopener noreferrer">here</a>.
      </p>
    </div>
  );
};

export default AboutSection;
