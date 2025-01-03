
/*import modules */
import React, { useState, useEffect } from 'react';
import sanitizeInput from '../utils/sanitizeInput';
import { useNavigate } from 'react-router-dom';
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

const url = `${pageAddress.login}`;

const UserAuth = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [RmbMe, setRmbMe] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    // handle empty field
    const [hasEmptyRequired, setHasEmptyRequired] = useState(true);

    // gray-out signup button state
    const [isHover, setHover] = useState(true); 

    // authenticate state
    const [isAuth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (name && pw){ 
            setHasEmptyRequired(false);
        } else {
            setHasEmptyRequired(true);
        }

    }, [name, pw]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, pw, RmbMe })
              });
            if (response) {
                if (response.ok) {
                    const data = await response.json();
            
                    if (data.success) {
                        console.log('Login successful');
                        setAuth(true);
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
        if (isAuth) {
           navigate("/");
        }
    };


    return (
        <>
            <div className="page-content">
                {/* <Navbar /> */}
                <div className="login-window">
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="login-body">
                            <div className="login-title">
                                <h1 id="login-title">login</h1>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="pw-title">password</h2>
                                </span>
                                <div className="input-box">
                                    <Input type={isHidden ? "password" : "text"} id="pw-input" className="input-field" value={pw} onChange={(p) => { setPw(sanitizeInput(p.target.value)) }} />
                                    <span className="showhide-pw">
                                        <img src={isHidden ? HiddenPw : RevealedPw} id="showhide-icon" onClick={()=>{setIsHidden(!isHidden)}}></img>
                                    </span>
                                </div>

                            </div>
                            <div className="login-options-container">
                                <div className="login-options">
                                    <div className="rmb-container">
                                        <input type="checkbox" id="rmb-checkbox" value="" onClick={() => {setRmbMe(true)}}></input>
                                        <span className="checkmark"></span>
                                        <label id="rmb-label">remember me</label>
                                    </div>
                                    <div>
                                        <a href="" id="forgot-pw">forgot password?</a>
                                    </div>
                                </div>
                            </div>
                            <div className="login-button-container">
                                <Button children="log in" type="submit" id={`login-button`}
                                onClick={
                                    !(hasEmptyRequired) ? handleSubmit : (event) => {
                                        event.preventDefault();
                                    }
                                }
                                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
                                style={(hasEmptyRequired) ? {
                                    "backgroundColor":"grey",
                                    "color": "#282828",
                                    "cursor": "not-allowed",
                                    "outline": "0",
                                    "boxShadow": "none",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}} />
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