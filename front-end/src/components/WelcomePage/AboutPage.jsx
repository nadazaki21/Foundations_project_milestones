import React from 'react';
import './AboutPage.css';


const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About TeamWave</h1>
        <section className="section">
          <h2>Company Overview</h2>
          <p>TeamWave is dedicated to providing the best task management solutions for teams of all sizes. Our mission is to help teams collaborate more effectively and achieve their goals seamlessly.</p>
        </section>
        <section className="section">
          <h2>Our History</h2>
          <p>Founded in [Year], TeamWave has grown from a small startup to a leading provider of task management solutions. Our journey has been marked by innovation and a commitment to excellence.</p>
        </section>
        <section className="section">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              {/* <img src={MahmoudImage} alt="Mahmoud El Sherbine" /> */}
              <h3>Mahmoud El Sherbine</h3>
              <p>Co-Founder</p>
            </div>
            <div className="team-member">
              {/* <img src={NadaImage} alt="Nada Zaki" /> */}
              <h3>Nada Zaki</h3>
              <p>Co-Founder</p>
            </div>
          </div>
        </section>
        <section className="section">
          <h2>Our Values</h2>
          <ul>
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Focus</li>
            <li>Collaboration</li>
          </ul>
        </section>
        <section className="section">
          <h2>What We Do</h2>
          <p>We provide an intuitive platform for task management, helping teams streamline their workflows and improve productivity. Our features include project tracking, collaboration tools, and robust security measures.</p>
        </section>
        <section className="section">
          <h2>Community Involvement</h2>
          <p>TeamWave is committed to giving back to the community. We support various charitable initiatives and encourage our employees to volunteer their time and skills.</p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
