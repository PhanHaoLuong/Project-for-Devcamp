
/*import modules */
import React, { useState, useEffect } from 'react';
import sanitizeInput from '../utils/sanitizeInput';
import * as pageAddress from './page-address.json';
import { valEmail, valName, valPw } from '../utils/validateInput';

/* import Components */
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';

/* import assets */
import HiddenPw from '../assets/eye-off.png';
import RevealedPw from '../assets/eye.png';

/* import style */
import '../styles/UserSignUp.css';
import { useNavigate } from 'react-router-dom';

const url = `${pageAddress.signup}`;

const UserSignUp = () => {
    // declare input states
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [cfpw, setCfpw] = useState("");

    // declare error message states
    const [isInvalEmail, setInvalEmail] = useState(false);
    const [isInvalName, setInvalName] = useState(false);
    const [isInvalPw, setInvalPw] = useState(false);
    const [isUnmatchedPw, setUnmatchedPw] = useState(false);
    const [hasEmptyRequired, setHasEmptyRequired] = useState(true);
    const [hasInvalInput, setHasInvalInput] = useState(true);
    const [userExists, setUserExists] = useState(false);
    const [hasSignupErr, setHasSignupErr] = useState(false);

    // gray-out signup button state
    const [isHover, setHover] = useState(true); 

    // auth state
    const [authMsg, setAuthMsg] = useState("");
    const [isAuth, setAuth] = useState(false);

    const navigate = useNavigate();

    // validation handling
    useEffect(() => {
        setHasSignupErr(false);
        if (email && name && pw && cfpw){ 
            setHasEmptyRequired(false);
        } else {
            setHasEmptyRequired(true);
        }
        const timeoutId = setTimeout(() => {
            if (email && !valEmail(email)) {
                setInvalEmail(true);
             } else {
                setInvalEmail(false);
            }

            if (name && !valName(name)) {
                setInvalName(true);
            } else {
                setInvalName(false);
            }

            if (pw && !valPw(pw)) {
                setInvalPw(true);
            } else {
                setInvalPw(false);
            }

            if (cfpw && cfpw !== pw) {
                setUnmatchedPw(true);
            } else {
                setUnmatchedPw(false);
            }   
        }, 800);
          
            return () => clearTimeout(timeoutId); 
    }, [email, name, pw, cfpw]); 

    useEffect(() => {
        setHasInvalInput([isInvalEmail, isInvalName, isInvalPw, isUnmatchedPw].some((isErr) => isErr === true));
    }, [isInvalEmail, isInvalName, isInvalPw, isUnmatchedPw])

    useEffect(() => {
        setUserExists(false);
    }, [name])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (isAuth){
                navigate("/");
            }
        }, 2000);
        return () => {clearTimeout(timeoutId)};
    }, [isAuth]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, name, pw })
              });
            if (response) {
                const { message } =  await response.json();
                setAuthMsg(message.toLowerCase());
                if (!response.ok) {
                    setHasSignupErr(true);
                    setAuth(false);
                    if (response.status === 409) {
                        setUserExists(true);
                    }
                }
                if (response.status === 201) {
                    setHasSignupErr(false);
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
                <div className="signup-window">
                    <form onSubmit={()=>{}} className="signup-form" autoComplete="off">
                        <div className="signup-body">
                            <div className="signup-title">
                                <h1 id="signup-title">create new account</h1>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="email-title">email</h2>
                                </span>
                                <div className="input-box" style={
                                isInvalEmail ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type="email" id="email-input" className="input-field" value={email} onChange={(n) => { setEmail(sanitizeInput(n.target.value))}}/>
                                </div>
                                <div className="error-container" id="invalid-email-container">
                                    {isInvalEmail ? 
                                        (<p className="error-message" id="invalid-email">emails must be a valid email address.</p>) : ('')
                                    }
                                </div>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="user-title">username</h2>
                                </span>
                                <div className="input-box" style={
                                (isInvalName || userExists) ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(sanitizeInput(n.target.value)) }} />
                                </div>
                                <div className="error-container" id="invalid-email-container">
                                    {isInvalName ? 
                                        (<p className="error-message" id="invalid-email">usernames must be 4-16 characters long and must not contain special characters.</p>) : ('')
                                    }
                                </div>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="user-title">password</h2>
                                </span>
                                <div className="input-box" style={
                                isInvalPw ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type="password" id="pw-input" className="input-field" value={pw} onChange={(n) => { setPw(sanitizeInput(n.target.value)) }} />
                                </div>
                                <div className="error-container" id="invalid-email-container">
                                    {isInvalPw ? 
                                        (<p className="error-message" id="invalid-email">passwords must be 8-64 characters long and must not contain special characters.</p>) : ('')
                                    }
                                </div>
                            </div>
                            <div className="input-container">
                                <span className="field-title">
                                    <h2 id="user-title">confirm password</h2>
                                </span>
                                <div className="input-box" style={
                                isUnmatchedPw ? {
                                    "outline": "1px solid #e03f42",
                                    "boxShadow": "0 0 4px #e03f42",
                                    "transition": "all 0.2s ease-in-out"
                                } : {}}>
                                    <Input type="password" id="cfpw-input" className="input-field" value={cfpw} onChange={(n) => { setCfpw(sanitizeInput(n.target.value)) }} />
                                </div>
                                <div className="error-container" id="invalid-email-container">
                                    {isUnmatchedPw ? 
                                        (<p className="error-message" id="invalid-email">passwords must match.</p>) : ('')
                                    }
                                </div>
                            </div>
                            {isAuth || hasSignupErr ? (
                                <div className="global-msg-container" id={`${isAuth ? "success" : "error"}-container`}>
                                    <p className="global-msg" id={`global-${isAuth ? "success" : "error"}-message`}>
                                        {`${isAuth ? "sign up successful. redirecting..." : authMsg}`}
                                    </p>
                                </div>
                            ) : ("")}
                            <div className={`signup-button-container ${(isHover ? "hover" : "")}`}>
                                <a href={pageAddress.login} id="to-login-button">&lt; back to login </a>
                                <Button children="sign up" type="submit" id="signup-button" onClick={
                                    !(hasInvalInput || hasEmptyRequired) ? handleSubmit : (event) => {
                                        event.preventDefault();
                                    }
                                }
                                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} 
                                style={(hasEmptyRequired || hasInvalInput) ? {
                                    "backgroundColor":"grey",
                                    "color": "#262626",
                                    "cursor": "not-allowed",
                                    "outline": "0",
                                    "boxShadow": "none"
                                } : {}} />
                            </div>
                        </div>
                    </form>

                </div>
                
            </div>
        </>
    );
}

export default UserSignUp;