import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../Login/login.css'

const Ntflix = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

const Register = () => {
    const location = useLocation();
    const initialEmail = location.state?.initialEmail || "";
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/register`, {
                username,
                email,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userName', response.data.username);
                navigate('/browse');
            }
        } catch (err) {
            let errorMsg = err.response?.data?.message || "Registration failed. Make sure the backend is running.";
            
            // Clean up raw MongoDB duplicate key errors just in case the backend passes them through
            if (errorMsg.includes('E11000')) {
                if (errorMsg.includes('username')) {
                    errorMsg = "This username is already taken. Please choose another one.";
                } else if (errorMsg.includes('email')) {
                    errorMsg = "This email is already registered. Please sign in instead.";
                } else {
                    errorMsg = "This account already exists.";
                }
            }
            
            setError(errorMsg);
        }
    }

    return (
        <div className="login_screen">
            <Link to="/">
                <img src={Ntflix} alt="Netflix Logo" className="login_logo" />
            </Link>
            <div className="login_gradient" />
            <div className="login_container">
                <form onSubmit={handleSubmit}>
                    <h1>Sign Up</h1>
                    {error && <div className="login_error_box">{error}</div>}
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                    
                    <div className="login_footer">
                        <p>Already have an account? <Link to="/login">Sign In now.</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
