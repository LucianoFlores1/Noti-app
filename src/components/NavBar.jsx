import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "./NavBar.css"

const NavBar = () => {

    const logout = useAuth('actions').logout;


    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/login" className="navbar-item">Login</Link>
                <Link to="/articles" className="navbar-item">Articles</Link>
                <button onClick={logout} className='navbar-item'>Fuera</button>

            </div>

        </nav>
    );
}

export default NavBar;
