import React from 'react';
import './Layout.css';
import Navbar from '../navigation/Navbar/Navbar';

const layout = props => (
    <div className="page-layout">
        <Navbar />
        { props.children }
    </div>
);

export default layout;