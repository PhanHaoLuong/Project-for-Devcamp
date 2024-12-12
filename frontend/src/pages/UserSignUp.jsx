
/*import modules */
import React, { useState } from 'react';
import sanitizeInput from '../utils/sanitizeInput';

/* import Components */
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

/* import assets */
import HiddenPw from '../assets/eye-off.png';
import RevealedPw from '../assets/eye.png';

/* import style */
import '../styles/UserSignUp.css';


/* Placeholder POST logic, to be implemented */
const url = "http://localhost:3000/login";

const UserSignUp = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [isRmb, setIsRmb] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    

    return (
        <>
            <div className="page-content">
                <Navbar />
                <div className="signup-window">
                    <form onSubmit={()=>{}} className="signup-form">
                        <div className="signup-body">
                            <div className="signup-title">
                                <h1 id="signup-title">signup</h1>
                            </div>
                            <div className="required-container">
                                <div id="required-details">
                                    <sup className="required-asterisk">*</sup>
                                    <h2>required details</h2>
                                </div>
                            </div>
                            <div className="input-container">
                                <span class="field-title">
                                    <h2 id="email-title">email<sup className="required-asterisk">*</sup></h2>
                                </span>
                                <div className="input-box">
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="input-container">
                                <span class="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="input-container">
                                <span class="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="input-container">
                                <span class="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            
                            <div className="signup-options-container">
                                <div className="signup-options">
                                    <div className="rmb-container">
                                        <input type="checkbox" id="rmb-checkbox" value=""></input>
                                        <span className="checkmark"></span>
                                        <label id="rmb-label">Remember me</label>
                                    </div>
                                    <div>
                                        <a href="" id="forgot-pw">Forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="signup-button-container">
                                <Button children="Login" onClick={() => { }} type="submit" id="login-button" />
                            </div>
                        </div>
                    </form>
                    <div className="signup-extra">
                        <div className="signup-container">
                            <p id="new-user-text">new user?</p>
                            <a href="/signup" id="signup-link">sign up!</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default UserSignUp;