import React, { useState } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/UserAuth.css';

const url = "http://localhost:3000/login";

const UserAuth = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, pw })
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
        <form onSubmit={handleSubmit} className="login-form">
            <Input type="text" placeholder="Email or Username" value={name} onChange={(n)=>{setName(n.target.value)}}/>
            <Input type="password" placeholder="Password" value={pw} onChange={(p)=>{setPw(p.target.value)}}/>
            <Button children="Login" onClick={()=>{}} type="submit" className="login-button"/>
        </form>
    );
}

export default UserAuth;