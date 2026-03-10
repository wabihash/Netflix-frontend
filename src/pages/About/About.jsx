import React from 'react';
import './about.css';
import Ntflix from '../../assets/Ntflix-logo.svg';

const About = () => {
    return (
        <div className="about_container">
            <div className="about_hero">
                <img src={Ntflix} alt="Netflix logo" className="about_logo" />
                <h1>Cloning the Experience. Redefining the Craft.</h1>
                <p>A full-stack cinematic experience built with passion and precision.</p>
            </div>

            <div className="about_section">
                <div className="about_content">
                    <h2>What is this project?</h2>
                    <p>
                        This Netflix Clone is a high-fidelity web application designed to showcase modern web development capabilities. 
                        It goes beyond just a UI replica, offering a complete end-to-end experience from user authentication to real-time data integration.
                    </p>
                </div>
            </div>

            <div className="about_grid">
                <div className="about_card">
                    <h3>🎬 Real Data</h3>
                    <p>Powered by The Movie Database (TMDB) API, fetching the latest releases, trending shows, and detailed movie information in real-time.</p>
                </div>
                <div className="about_card">
                    <h3>🔐 Secure Auth</h3>
                    <p>A robust backend built with Node.js, Express, and MongoDB, handling secure user registration and login with JWT encryption.</p>
                </div>
                <div className="about_card">
                    <h3>⭐ Personalized</h3>
                    <p>Interactive "My List" functionality allows users to curate their own collection of movies and TV shows across sessions.</p>
                </div>
                <div className="about_card">
                    <h3>📱 Responsive</h3>
                    <p>Designed with a "Mobile-First" approach, ensuring a premium experience on everything from smartphones to 4K desktop monitors.</p>
                </div>
            </div>

            <div className="about_tech_section">
                <h2>The Tech Stack</h2>
                <div className="tech_badges">
                    <span className="tech_badge">React 19</span>
                    <span className="tech_badge">Node.js</span>
                    <span className="tech_badge">Express</span>
                    <span className="tech_badge">MongoDB</span>
                    <span className="tech_badge">MUI Icons</span>
                    <span className="tech_badge">Axios</span>
                    <span className="tech_badge">JWT Auth</span>
                </div>
            </div>

            <div className="about_footer">
                <p>Created by <span className="highlight">Wabi Dagim</span></p>
                <div className="about_cta">
                    <button onClick={() => window.history.back()}>Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default About;
