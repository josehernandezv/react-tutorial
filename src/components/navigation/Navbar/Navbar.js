import React from 'react';
import { connect } from 'react-redux';
import './Navbar.scss';
import Logo from './Logo';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../../../store/actions';

const navbar = props => {
    const { isAuthenticated } = props;
    return (
        <div className="nav-bar">
            <Link to="/">
                <Logo />
            </Link>
            <div className="links">
                <ul>
                    { isAuthenticated ? (
                        <>
                            <li>
                                <NavLink to="/new">Nueva mejenga</NavLink> 
                            </li>
                            <li>
                                <NavLink to="/" onClick={ props.onLogout }>Cerrar sesión</NavLink> 
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/login">Iniciar sesión</NavLink> 
                            </li>
                            <li>
                                <NavLink to="/signup">Registrarse</NavLink> 
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.tokenId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(navbar);