import React from 'react';
import './Navbar.scss';
import imgSrc from '../../../assets/ball.png';

const logo = () => (
    <div className="logo">
        <img src={ imgSrc } alt="logo" />
        <h2>Mejenga</h2>
    </div>
);

export default logo;