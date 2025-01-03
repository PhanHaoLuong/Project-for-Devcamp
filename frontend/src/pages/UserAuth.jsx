
/*import modules */
import React, { useState, useEffect } from 'react';
import sanitizeInput from '../utils/sanitizeInput';
import { useNavigate } from 'react-router-dom';
import * as pageAddress from './page-address.json';
import { valName, valPw } from '../utils/validateInput';

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

    const [userExists, setUserExists] = useState(true);
    const [isWrongPw, setWrongPw] = useState(false);
    const [isInvalName, setInvalName] = useState(false);
    const [isInvalPw, setInvalPw] = useState(false);

    // authenticate state
    const [authMsg, setAuthMsg] = useState("");

    const [isAuth, setAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (name && pw){ 
            setHasEmptyRequired(false);
        } else {
            setHasEmptyRequired(true);
        }
        setInvalPw(false);
        setWrongPw(false);
        setInvalName(false);
        setUserExists(true);
        const timeoutId = setTimeout(() => {
            if (name && !valName(name)){
                setInvalName(true);
            } else {
                setInvalName(false);
            }
            if (pw && !valPw(pw)){
                setInvalPw(true);
            } else {
                setInvalPw(false);
            }
        }, 800);
        return () => {clearTimeout(timeoutId)};
    }, [name, pw]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isAuth) {
                navigate("/");
            }
        }, 2000)
        return (() => {clearTimeout(timeoutId)});
    }, [isAuth])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, pw })
              });
            if (response) {
                const { message } =  await response.json();
                setAuthMsg(message.toLowerCase());
                if (!response.ok) {
                    setAuth(false);
                    if (response.status === 404) {
                        setUserExists(false);
                    }
                    if (pw && response.status === 400) {
                        setWrongPw(true);
                    }
                }
                if (response.status === 200) {
                    setWrongPw(false);
                    setAuth(true);
                }

            } else {
                setAuthMsg('No response received.');
            }
        } catch (error) {
            console.error('Error signing up: ', error);
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
                                <span className="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box" style={
                                 (isInvalName || !userExists) ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                                <div className="error-container" id="invalid-name-container">
                                    {isInvalName ? 
                                        (<p className="error-message" id="invalid-name">usernames must be 4-16 characters long and must not contain special characters.</p>) : ('')
                                    }
                                    {(name && !userExists) ? 
                                        (<p className="error-message" id="invalid-name">user does not exist.</p>) : ('')
                                    }
                                </div>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="pw-title">password</h2>
                                </span>
                                <div className="input-box" style={
                                 (isInvalPw || isWrongPw) ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type={isHidden ? "password" : "text"} id="pw-input" className="input-field" value={pw} onChange={(p) => { setPw(sanitizeInput(p.target.value)) }} />
                                    <span className="showhide-pw">
                                        <img src={isHidden ? HiddenPw : RevealedPw} id="showhide-icon" onClick={()=>{setIsHidden(!isHidden)}}></img>
                                    </span>
                                </div>
                                <div className="error-container" id="invalid-email-container">
                                    {isInvalPw ? 
                                        (<p className="error-message" id="invalid-pw">passwords must be 8-64 characters long and must not contain special characters.</p>) : ('')
                                    }
                                    {isWrongPw ? 
                                        (<p className="error-message" id="invalid-pw">incorrect password</p>) : ('')
                                    }
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
                            {isAuth ? (
                                <div className="global-msg-container" id="success-containe">
                                    <p className="global-msg" id="global-success-message">
                                        login successful. redirecting...
                                    </p>
                                </div>
                            ) : ("")}
                            <div className="login-button-container">
                                <Button children="log in" type="submit" id={`login-button`}
                                onClick={
                                    !(hasEmptyRequired) ? handleSubmit : (event) => {
                                        event.preventDefault();
                                    }
                                }
                                style={(hasEmptyRequired || isInvalName || isInvalPw) ? {
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