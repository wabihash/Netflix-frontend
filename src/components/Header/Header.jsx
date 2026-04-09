import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
const Ntflix = "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FiberNewIcon from '@mui/icons-material/FiberNew';

const Header = () => {
    const [show, setShow] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(() => localStorage.getItem('userName'));
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Close dropdowns when clicking anywhere outside
        const handleOutsideClick = () => {
            setNotificationsOpen(false);
            setProfileOpen(false);
        };
        document.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/browse/search?q=${searchQuery}`);
            setSearchQuery("");
        }
    };



    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('userName');
        setUser(null);
        navigate('/login');
    };

    return (
        <div className={`header_outer_container ${show ? 'nav_black' : ''}`}>
            <div className='header_container'>
                    <div className='header_left'>
                        <ul>
                            <li className="logo">
                                <Link to="/browse"><img src={Ntflix} alt="Netflix logo" /></Link>
                            </li>
                            <li className="nav_item"><Link to="/browse">Home</Link></li>
                            <li className="nav_item"><Link to="/browse/tv-shows">TV Shows</Link></li>
                            <li className="nav_item"><Link to="/browse/movies">Movies</Link></li>
                            <li className="nav_item"><Link to="/browse/latest">Latest</Link></li>
                            <li className="nav_item"><Link to="/browse/my-list">My List</Link></li>
                            <li className="nav_item"><Link to="/browse/about">About Project</Link></li>
                        </ul>
                    </div>

                <div className='header_right'>
                    <ul>
                        <li className="search_container">
                            <form onSubmit={handleSearch}>
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="nav_search_input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search_submit_btn">
                                    <SearchIcon />
                                </button>
                            </form>
                        </li>

                        {/* Notifications Dropdown */}
                        <li className="nav_dropdown_container" onClick={(e) => { e.stopPropagation(); setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}>
                            <NotificationsNoneIcon className="nav_icon" />
                            {notificationsOpen && (
                                <div className="dropdown_menu notifications_dropdown">
                                    <Link to="/browse/coming-soon" className="dropdown_item" onClick={() => setNotificationsOpen(false)}>
                                        <div className="notif_item_content">
                                            <FiberNewIcon className="notif_icon_new" />
                                            <span>New arrival: "Wednesday" Season 2</span>
                                        </div>
                                    </Link>
                                    <Link to="/browse/coming-soon" className="dropdown_item" onClick={() => setNotificationsOpen(false)}>
                                        <div className="notif_item_content">
                                            <NotificationsNoneIcon className="notif_icon_small" />
                                            <span>Don't miss the latest trending movie</span>
                                        </div>
                                    </Link>
                                    <Link to="/browse/coming-soon" className="dropdown_item" onClick={() => setNotificationsOpen(false)}>
                                        <div className="notif_item_content">
                                            <AccountBoxIcon className="notif_icon_small" />
                                            <span>Welcome back to Netflix, {user || 'User'}!</span>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </li>

                        {/* Profile Dropdown */}
                        {user ? (
                            <li className="nav_dropdown_container profile_container desktop_only" onClick={(e) => { e.stopPropagation(); setProfileOpen(!profileOpen); setNotificationsOpen(false); }}>
                                <div className="user_profile_box">
                                    <AccountBoxIcon className="account_icon" />
                                    <span className="user_name">{user}</span>
                                    <ArrowDropDownIcon className={`arrow_icon ${profileOpen ? 'rotate' : ''}`} />
                                </div>
                                {profileOpen && (
                                    <div className="dropdown_menu profile_dropdown">
                                        <Link to="/browse/coming-soon" className="dropdown_item_with_icon" onClick={() => setProfileOpen(false)}>
                                            <ManageAccountsIcon className="menu_icon" />
                                            <span>Manage Profiles</span>
                                        </Link>
                                        <Link to="/browse/coming-soon" className="dropdown_item_with_icon" onClick={() => setProfileOpen(false)}>
                                            <SettingsIcon className="menu_icon" />
                                            <span>Account Settings</span>
                                        </Link>
                                        <Link to="/browse/coming-soon" className="dropdown_item_with_icon" onClick={() => setProfileOpen(false)}>
                                            <HelpOutlineIcon className="menu_icon" />
                                            <span>Help Center</span>
                                        </Link>
                                        <div className="dropdown_divider"></div>
                                        <div className="dropdown_item_with_icon logout_option" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                                            <ExitToAppIcon className="menu_icon" />
                                            <span>Sign Out of Netflix</span>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li className="nav_icon_link">
                                <Link to="/login"><AccountBoxIcon /></Link>
                            </li>
                        )}

                        <li className="hamburger_icon" onClick={toggleMobileMenu}>
                            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </li>
                    </ul>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`mobile_sidebar ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar_close" onClick={toggleMobileMenu}>
                    <CloseIcon />
                </div>
                {user && (
                    <div className="sidebar_user">
                        <AccountBoxIcon className="account_icon" />
                        <span>Welcome, {user}</span>
                    </div>
                )}
                <ul className="sidebar_links">
                    <li onClick={toggleMobileMenu}><Link to="/browse">Home</Link></li>
                    <li onClick={toggleMobileMenu}><Link to="/browse/tv-shows">TV Shows</Link></li>
                    <li onClick={toggleMobileMenu}><Link to="/browse/movies">Movies</Link></li>
                    <li onClick={toggleMobileMenu}><Link to="/browse/latest">Latest</Link></li>
                    <li onClick={toggleMobileMenu}><Link to="/browse/my-list">My List</Link></li>
                    <li onClick={toggleMobileMenu}><Link to="/browse/about">About Project</Link></li>
                    {user ? (
                        <li onClick={() => { handleLogout(); toggleMobileMenu(); }}>Sign Out</li>
                    ) : (
                        <li onClick={toggleMobileMenu}><Link to="/login">Sign In</Link></li>
                    )}
                </ul>
            </div>
            {/* Overlay */}
            {mobileMenuOpen && <div className="sidebar_overlay" onClick={toggleMobileMenu}></div>}
        </div>
    )
}

export default Header;
