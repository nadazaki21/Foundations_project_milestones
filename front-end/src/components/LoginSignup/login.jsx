import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/log-in', {
                email,
                password,
            },
            {
                withCredentials : true,
            }
            );
            
            if (response.status === 201) {
                alert('Login successful!');
                navigate('/');
            } else {
                alert(`Login failed: ${response.data.message}`);
            }
        } catch (error) {
            alert(`Login failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="body">
            <div className="container">
                <div className="header">
                    <div className="title">Login
                        <div className="underline"></div>
                    </div>
                </div>
                <form className="inputs" onSubmit={handleLogin}>
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
                        <button type="submit" className="login">Login</button>
                    </div>
                </form>
                <div className="switch">
                    <p>Don't have an account? <Link to="/signup" className="switch-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
