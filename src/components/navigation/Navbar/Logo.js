import React from 'react';
import './Navbar.scss';
import ballSrc from '../../../assets/ball.png';

const logo = () => (
    <div className="logo">
        <img src={ ballSrc } alt="logo" />
        <h2>Mejenga</h2>
    </div>
);

export default logo;