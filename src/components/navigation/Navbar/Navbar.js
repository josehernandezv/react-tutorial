import React from 'react';
import './Navbar.scss';
import Logo from './Logo';

const navbar = () => (
    <div className="nav-bar">
        <a href="">
            <Logo />
        </a>
        <div className="links">
            <ul>
                <li>
                    <a href="#">Nueva mejenga</a>
                </li>
                <li>
                    <a href="#">Cerrar sesión</a>
                </li>
                <li>
                    <a href="#">Iniciar sesión</a>
                </li>
                <li>
                    <a href="#">Registrarse</a>
                </li>
            </ul>
        </div>
    </div>
);

export default navbar;