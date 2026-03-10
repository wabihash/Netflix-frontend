import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'

const Ntflix = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/api/auth/login`, {
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('userToken', response.data.token);
                localStorage.setItem('userName', response.data.username);
                navigate('/browse');
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Check your credentials.");
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
                    <h1>Sign In</h1>
                    {error && <div className="login_error_box">{error}</div>}
                    <input 
                        type="email" 
                        placeholder="Email or phone number" 
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
                    <button type="submit">Sign In</button>
                    
                    <div className="login_help">
                        <div className="remember_me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#">Need help?</a>
                    </div>

                    <div className="login_footer">
                        <p>New to Netflix? <Link to="/register">Sign up now.</Link></p>
                        <p className="recaptcha_notice">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#">Learn more.</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
