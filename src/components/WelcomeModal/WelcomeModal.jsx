import React, { useEffect, useState } from 'react';
import './welcomemodal.css';
import Ntflix from '../../assets/Ntflix-logo.svg';

const WelcomeModal = () => {
    const [userName] = useState(() => localStorage.getItem('userName') || "User");
    const [isVisible, setIsVisible] = useState(() => {
        const token = localStorage.getItem('userToken');
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        return Boolean(token && !hasSeenWelcome);
    });

    useEffect(() => {
        if (isVisible) {
            localStorage.setItem('hasSeenWelcome', 'true');
        }
    }, [isVisible]);

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
