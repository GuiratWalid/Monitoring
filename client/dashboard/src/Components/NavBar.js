import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './../NavBar.css'
import { modeContext } from '../Context/ModeContext';

const NavBar = () => {
    const { darkMode, setDarkMode } = useContext(modeContext);
    return (
        <nav className="wrapper">
            <div className="sidebar">
                <NavLink className="title" to="/">
                    <h2> Dashboard</h2>
                </NavLink>
                <ul>
                    <li>
                        <NavLink className="navLink" to="/">
                            <i className="fas fa-home icon"></i>
                            <span className="Menu">Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/visitor">
                            <i className="fas fa-eye icon"></i>
                            <span className="Menu">Visitor</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/error">
                            <i className="fas fa-exclamation-triangle icon"></i>
                            <span className="Menu">Error</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/account">
                            <i className="fas fa-user-alt icon"></i>
                            <span className="Menu">Account</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="navLink" to="/useCase">
                            <i className="fas fa-users-cog icon"></i>
                            <span className="Menu">Use Case</span>
                        </NavLink>
                    </li>
                </ul>
                <div className="form-check form-switch mode">
                    <input
                        className="form-check-input input"
                        style={{
                            backgroundColor: !darkMode ? "#fff" : "rgb(100, 101, 105)"
                        }}
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={() => setDarkMode(!darkMode)}
                    />
                    <label className="form-check-label text-white Menu" htmlFor="flexSwitchCheckDefault">
                        {!darkMode ? "Dark Mode" : "Light Mode"}
                    </label>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;