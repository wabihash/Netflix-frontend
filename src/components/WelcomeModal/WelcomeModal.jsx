import React, { useEffect, useState } from 'react';
import './welcomemodal.css';
import Ntflix from '../../assets/Ntflix-logo.svg';

const WelcomeModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [userName, setUserName] = useState("User");

    useEffect(() => {
        // Only show if user is logged in and hasn't seen it this session
        const name = localStorage.getItem('userName');
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        const token = localStorage.getItem('userToken');

        if (token && !hasSeenWelcome) {
            setUserName(name || "User");
            setIsVisible(true);
            // Mark as seen
            localStorage.setItem('hasSeenWelcome', 'true');
        }
    }, []);

    const closeModal = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="welcome_modal_overlay">
            <div className="welcome_modal_content">
                <div className="welcome_header">
                    <img src={Ntflix} alt="Netflix" className="welcome_logo" />
                </div>
                <div className="welcome_body">
                    <h1>Welcome back to Netflix, {userName}!</h1>
                    <p>We've updated our collection with the latest movies and TV shows just for you. Explore the newest releases in the "Latest" section.</p>
                    <div className="welcome_features">
                        <div className="feature_item">
                            <span className="feature_dot"></span>
                            <span>Personalized Watchlist</span>
                        </div>
                        <div className="feature_item">
                            <span className="feature_dot"></span>
                            <span>Unlimited Movies & TV Shows</span>
                        </div>
                        <div className="feature_item">
                            <span className="feature_dot"></span>
                            <span>Streaming on all devices</span>
                        </div>
                    </div>
                </div>
                <div className="welcome_footer">
                    <button className="welcome_btn" onClick={closeModal}>Start Watching</button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeModal;
