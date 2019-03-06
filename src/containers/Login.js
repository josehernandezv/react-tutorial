import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button, Errors } from '../components/ui/FormControls';
import { Redirect } from 'react-router-dom';
import { login } from '../store/actions';

class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    } 

    submitHandler = event => {
        event.preventDefault();
        console.log(this.state)
        this.props.onLogin(
            this.state.email,
            this.state.password,
        );
    }

    render () {
        if (this.props.isAuth) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <Form onSubmit={ this.submitHandler }>
                    <h1>Bienvenido</h1>
                    <Input 
                        placeholder="email"  
                        type="email" 
                        id="email"
                        value={ this.state.email } 
                        onChange={ this.inputChangeHandler } 
                    />
                    <Input 
                        placeholder="contraseña" 
                        type="password" 
                        id="password"
                        value={ this.state.password } 
                        onChange={ this.inputChangeHandler } 
                    />
                    <Button>{ this.props.isLoading ? 'Cargando...' : 'Iniciar sesión'}</Button>
                    { this.props.error && (
                        <Errors data={ this.props.error.errors } />
                    )}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.idToken !== null,
        error: state.auth.error,
        isLoading: state.auth.isLoading
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(login(email, password))
    }
}


export default connect(mapStateToProps, mapDisptachToProps)(Login);