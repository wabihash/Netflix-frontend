import React from 'react';
import { useNavigate } from 'react-router-dom';
import './comingsoon.css';

const ComingSoon = ({ title }) => {
    const navigate = useNavigate();

    return (
        <div className="coming_soon_container">
            <div className="coming_soon_content">
                <h1>{title || "Coming Soon"}</h1>
                <p>We're working hard to bring this feature to you! Stay tuned for updates.</p>
                <div className="netflix_spinner"></div>
                <button className="back_button" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </div>
    );
};

export default ComingSoon;
