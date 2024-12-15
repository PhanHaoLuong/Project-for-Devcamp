
/*import modules */
import React, { useState } from 'react';
import sanitizeInput from '../utils/sanitizeInput';
import * as pageAddress from './page-address.json';

/* import Components */
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

/* import assets */
import HiddenPw from '../assets/eye-off.png';
import RevealedPw from '../assets/eye.png';

/* import style */
import '../styles/UserAuth.css';


/* Placeholder POST logic, to be implemented */
const url = "http://localhost:3000/login";

const UserAuth = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [isRmb, setIsRmb] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, pw, isRmb })
              });
            if (response) {
                if (response.ok) {
                    const data = await response.json();
            
                    if (data.success) {
                        console.log('Login successful');
                    } else {
                        console.error('Login failed:', data.error);
                    }
                } else {
                    console.error('HTTP error:', response.status, response.statusText);
                }
            } else {
                console.error('No response received');
            }
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    };


    return (
        <>
            <div className="page-content">
                <Navbar />
                <div className="login-window">
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-body">
                            <div className="login-title">
                                <h1 id="login-title">login</h1>
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
                                    <h2 id="pw-title">password</h2>
                                </span>
                                <div className="input-box">
                                    <Input type={isHidden ? "password" : "text"} id="pw-input" className="input-field" value={pw} onChange={(p) => { setPw(sanitizeInput(p.target.value)) }} />
                                    <span class="showhide-pw">
                                        <img src={isHidden ? HiddenPw : RevealedPw} id="showhide-icon" onClick={()=>{setIsHidden(!isHidden)}}></img>
                                    </span>
                                </div>

                            </div>
                            <div className="login-options-container">
                                <div className="login-options">
                                    <div className="rmb-container">
                                        <input type="checkbox" id="rmb-checkbox" value=""></input>
                                        <span className="checkmark"></span>
                                        <label id="rmb-label">remember me</label>
                                    </div>
                                    <div>
                                        <a href="" id="forgot-pw">forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="login-button-container">
                                <Button children="log in" onClick={() => { }} type="submit" id="login-button" />
                            </div>
                        </div>
                    </form>
                    <div className="login-extra">
                        <div className="signup-container">
                            <p id="new-user-text">new user?</p>
                            <a href={pageAddress.signup} id="signup-link">create new account!</a>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default UserAuth;