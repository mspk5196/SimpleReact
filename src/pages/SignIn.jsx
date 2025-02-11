import React, { useState } from 'react';
import '../styles/signin.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const verify = (e) => {
        e.preventDefault();
        if (username === 'admin@gmail.com' && password === 'admin') {
            setIsAuthenticated(true);
            navigate('/SimpleReact/home')
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="signin-container">
            <h2>Sign In</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={verify}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}
