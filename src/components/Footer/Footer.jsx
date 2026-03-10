import React from 'react'
import { Link } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import './footer.css'

const Footer = () => {
    return (
        <div className='footer_outer_container'>
            <div className='footer_inner_container'>
                <div className='footer_icons'>
                    <a href="https://www.facebook.com/share/r/1Duh6Qnu1b/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <FacebookOutlinedIcon />
                    </a>
                    <a href="https://www.instagram.com/wabidagim?igsh=bjk4YWVvZzg1eXZ5" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <InstagramIcon />
                    </a>
                    <a href="https://t.me/Focusrehobot" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                        <TelegramIcon />
                    </a>
                </div>
                <div className='footer_data'>
                    <div>
                        <ul>
                            <li><Link to="/browse/coming-soon">Audio Description</Link></li>
                            <li><Link to="/browse/coming-soon">Investor Relations</Link></li>
                            <li><Link to="/browse/coming-soon">Legal Notices</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><Link to="/browse/coming-soon">Help Center</Link></li>
                            <li><Link to="/browse/coming-soon">Jobs</Link></li>
                            <li><Link to="/browse/coming-soon">Cookie Preferences</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><Link to="/browse/coming-soon">Gift Cards</Link></li>
                            <li><Link to="/browse/coming-soon">Terms of Use</Link></li>
                            <li><Link to="/browse/about">Corporate Information</Link></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><Link to="/browse/coming-soon">Media Center</Link></li>
                            <li><Link to="/browse/coming-soon">Privacy</Link></li>
                            <li><Link to="/browse/coming-soon">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='copy-write'>
                    &copy; 1997-2025 Netflix Clone by Wabi Dagim.
                </div>
            </div>
        </div>
    )
}

export default Footer