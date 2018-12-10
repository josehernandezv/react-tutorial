import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Errors } from '../components/ui/FormControls';
import { Paper } from '../components/ui';
import { login } from '../store/actions';
import { Redirect } from 'react-router';

class Login extends Component {

    state = {
        email: '',
        password: '',
    }

    inputChangedHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onLogin(this.state.email, this.state.password)
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <Paper>
                <Form onSubmit={ this.submitHandler }>
                    <h1>Bienvenido</h1>
                    <Input 
                        placeholder="Usuario o correo" 
                        value={ this.state.email }
                        onChange={ this.inputChangedHandler }
                        id="email"
                        type="email"
                    />
                    <Input 
                        placeholder="Contraseña" 
                        value={ this.state.password }
                        onChange={ this.inputChangedHandler }
                        id="password"
                        type="password"
                    />
                    <Button disabled={ this.props.isLoading }>
                        { this.props.isLoading ? '...cargando' : 'Iniciar sesión' }
                    </Button>
                    { this.props.error && (
                        <Errors data={ this.props.error.errors } />
                    )}
                </Form>
            </Paper>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.tokenId !== null,
        isLoading: state.auth.isLoading,
        error: state.auth.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);