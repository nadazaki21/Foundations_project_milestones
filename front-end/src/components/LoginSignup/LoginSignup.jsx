import React, { useState } from "react";
import './LoginSignup.css';
import email from '../assests/email.png';
import password from '../assests/password.png';
import user from '../assests/user.png';


const LoginSignup = () => {

    const [action, seAction] = useState("Login");

    return (
        <div className="body">
        <div className="container" >
            <div className="header">
                <div className="title">{action }</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {
                action === "Login" ? 
                    null
                    : <div className="input">
                    <img src={user} alt="user" className="img"/>
                    <input type="text" placeholder="Username"/>
                    </div>
                }
                
                <div className="input" >
                    <img src={email} alt="email" className="img"/>
                    <input type="email" placeholder="Email"/>
                </div>
                <div className="input">
                    <img src={password} alt="password" className="img"/>
                    <input type="password" placeholder="Password"/>
                </div>
            </div>
            <div className="submit-container">
                <div  className={action==="Login" ? "signup" : "switch"} onClick={() => seAction("SignUp")}>Signup</div>
                <div  className={action==="SignUp" ? "login" : "switch"} onClick={() => seAction("Login")}>Login</div>
            </div>
        </div>
        </div>
    );
};

export default LoginSignup;