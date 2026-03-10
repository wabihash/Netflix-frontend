import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './landing.css';
const Ntflix = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Landing = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleGetStarted = (e) => {
        e.preventDefault();
        // Redirect to register with the email as a state if desired
        navigate('/register', { state: { initialEmail: email } });
    };

    return (
        <div className="landing_container">
            <div className="landing_nav">
                <img src={Ntflix} alt="Netflix Logo" className="landing_logo" />
                <Link to="/login" className="landing_signin_btn">Sign In</Link>
            </div>

            <div className="landing_hero">
                <div className="landing_content">
                    <h1>Unlimited movies, TV shows, and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                    <form className="landing_cta" onSubmit={handleGetStarted}>
                        <div className="input_group">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                            <button type="submit">
                                Get Started <ArrowForwardIosIcon className="arrow_icon" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="landing_vignette"></div>

            <div className="landing_features">
                <div className="feature_card">
                    <div className="feature_text">
                        <h1>Enjoy on your TV.</h1>
                        <h2>Watch on Smart TVs, Playstation, Xbox, Apple TV, Blu-ray players, and more.</h2>
                    </div>
                </div>
                <div className="feature_divider"></div>
                <div className="feature_card">
                    <div className="feature_text">
                        <h1>Watch everywhere.</h1>
                        <h2>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;
