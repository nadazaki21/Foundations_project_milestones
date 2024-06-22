import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import userIcon from '../assets/user.png';
import axios from 'axios'; 

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username,
                email,
                password
            });

            if (response.status === 201) {
                alert('Signup successful!');
                navigate('/');
            } else {
                alert(`Signup failed: ${response.data.message}`);
            }
        } catch (error) {
            // console.error('Error signing up:', error);
            alert(error);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <div className="header">
                    <div className="title">Signup
                        <div className="underline"></div>
                    </div>
                </div>
                <form className="inputs" onSubmit={handleSignup}>
                    <div className="input">
                        <img src={userIcon} alt="username" className="img"/>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={emailIcon} alt="email" className="img"/>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input">
                        <img src={passwordIcon} alt="password" className="img"/>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="signup">Signup</button>
                    </div>
                </form>
                <div className="switch">
                    <p>Already have an account? <Link to="/login" className="switch-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
