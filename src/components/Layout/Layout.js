import React from 'react';
import './Layout.scss';
import Navbar from '../navigation/Navbar';
import Container from '../ui/Container';

const layout = props => (
    <div className="page-layout">
        <Navbar />
        <Container>
            { props.children }
        </Container>
    </div>
);

export default layout;