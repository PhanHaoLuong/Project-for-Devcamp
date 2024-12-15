
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
import '../styles/UserSignUp.css';


/* Placeholder POST logic, to be implemented */
const url = "http://localhost:3000/login";

const UserSignUp = () => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [cfpw, setCfpw] = useState("");


    

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
                                <span class="field-title">
                                    <h2 id="email-title">email</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="email" id="user-input" className="input-field" value={email} onChange={(n) => { setEmail(sanitizeInput(n.target.value))}}/>
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
                                    <h2 id="user-title">password</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="password" id="user-input" className="input-field" value={pw} onChange={(n) => { setPw(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="input-container">
                                <span class="field-title">
                                    <h2 id="user-title">confirm password</h2>
                                </span>
                                <div className="input-box">
                                    <Input type="password" id="user-input" className="input-field" value={cfpw} onChange={(n) => { setCfpw(sanitizeInput(n.target.value)) }} />
                                </div>
                            </div>
                            <div className="signup-button-container">
                                <a href={pageAddress.login} id="to-login-button">&lt; back to login </a>
                                <Button children="sign up" onClick={() => { }} type="submit" id="login-button" />
                            </div>
                        </div>
                    </form>

                </div>
                
            </div>
        </>
    );
}

export default UserSignUp;