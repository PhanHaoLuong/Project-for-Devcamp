import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/UserAuth.css';
import HidePassword from '../assets/eye-off.png'

const url = "http://localhost:3000/login";

const UserAuth = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [isRmb, setIsRmb] = useState(false);

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
                        <h1>login</h1>
                        <div className="input-container">
                            <span class="field-title">
                                <h2 id="user-title">username</h2>
                            </span>
                            <Input type="text" id="user-input" className="input-field" value={name} onChange={(n) => { setName(n.target.value) }} />
                        </div>
                        <div className="input-container">
                            <span class="field-title">
                                <h2 id="pw-title">password</h2>
                            </span>
                            <Input type="password" id="pw-input" className="input-field" value={pw} onChange={(p) => { setPw(p.target.value) }} />
                            <span class="showhide-pw">
                                <img src={HidePassword} id="showhide-icon"></img>
                            </span>
                        </div>
                        <div className="login-options">
                            <div className="rmb-container">
                                <input type="checkbox" className="" value=""></input>
                                <label>Remember me</label>
                            </div>
                            <div>
                                <a href="">Forgot password?</a>
                            </div>
                        </div>
                        <Button children="Login" onClick={() => { }} type="submit" className="login-button" />
                    </div>
                    </form>
                    <div className="login-extra">bbbb</div>
                </div>
                
            </div>
        </>
    );
}

export default UserAuth;