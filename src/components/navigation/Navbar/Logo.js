import React from 'react';
import styles from './Navbar.module.css';
import ballSrc from '../../../assets/ball.png';

const logo = () => (
    <div className={ styles.logo }>
        <img src={ ballSrc } alt="logo" />
        <h2>Mejenga</h2>
    </div>
);

export default logo;