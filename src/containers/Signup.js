import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Errors } from '../components/ui/FormControls';
import { Paper } from '../components/ui';
import { signup } from '../store/actions';
import { Redirect } from 'react-router';

class Signup extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    }

    inputChangedHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }
    
    submitHandler = event => {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            this.props.onSignup(this.state.email, this.state.password, this.state.username)
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        return (
            <Paper>
                <Form onSubmit={ this.submitHandler }>
                    <h1>Regístrate</h1>
                    <Input 
                        placeholder="Correo electrónico" 
                        value={ this.state.email }
                        onChange={ this.inputChangedHandler }
                        id="email"
                        type="email"
                    />
                    <Input 
                        placeholder="Nombre" 
                        value={ this.state.username }
                        onChange={ this.inputChangedHandler }
                        id="username"
                    />
                    <Input 
                        placeholder="Contraseña" 
                        value={ this.state.password }
                        onChange={ this.inputChangedHandler }
                        id="password"
                        type="password"
                    />
                    <Input 
                        placeholder="Confirmar Contraseña" 
                        value={ this.state.confirmPassword }
                        onChange={ this.inputChangedHandler }
                        id="confirmPassword"
                        type="password"
                    />
                    <Button disabled={ this.props.isLoading }>
                        { this.props.isLoading ? '...cargando' : 'Registrarse' }
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
        onSignup: (email, password, username) => dispatch(signup(email, password, username))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);