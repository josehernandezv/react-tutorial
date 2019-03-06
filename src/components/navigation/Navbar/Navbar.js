import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import Logo from './Logo';
import { logout } from '../../../store/actions';

const navbar = props => (
    <div className="nav-bar">
        <Link to="/">
            <Logo />
        </Link>
        <div className="links">
            <ul>
                { props.isAuth ? (
                    <>
                        <li>
                            <NavLink to="/new">Nueva mejenga</NavLink>
                        </li>
                        <li onClick={ props.onLogout }>
                            <NavLink to="/">Cerrar sesión</NavLink>
                        </li>
                    </>
                ) : (
                    <React.Fragment>
                        <li>
                            <NavLink to="/login">Iniciar sesión</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup">Registrarse</NavLink>
                        </li>
                    </React.Fragment>
                )}
                
               
            </ul>
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.idToken !== null,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(navbar);