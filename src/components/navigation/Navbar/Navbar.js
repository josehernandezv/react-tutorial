import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import Logo from './Logo';

const navbar = () => (
    <div className="nav-bar">
        <Link to="/">
            <Logo />
        </Link>
        <div className="links">
            <ul>
                <li>
                    <NavLink to="/new">Nueva mejenga</NavLink>
                </li>
                <li>
                    <NavLink to="/logout">Cerrar sesión</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Iniciar sesión</NavLink>
                </li>
                <li>
                    <NavLink to="/signup">Registrarse</NavLink>
                </li>
            </ul>
        </div>
    </div>
);

export default navbar;