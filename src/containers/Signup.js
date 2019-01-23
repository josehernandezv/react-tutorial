import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button } from '../components/ui/FormControls';
import { Redirect } from 'react-router-dom';

class Signup extends Component {

    state = {
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onSignup(this.state);
    }

    render () {
        console.log(this.props.isAuth)
        if (this.props.isAuth) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <Form onSubmit={ this.submitHandler }>
                    <h1>Regístrate</h1>
                    <Input 
                        placeholder="email"  
                        type="email" 
                        id="email"
                        value={ this.state.email } 
                        onChange={ this.inputChangeHandler } 
                        autoComplete="email"
                    />
                    <Input 
                        placeholder="nombre" 
                        id="name"
                        value={ this.state.name } 
                        onChange={ this.inputChangeHandler } 
                        autoComplete="username"
                    />
                    <Input 
                        placeholder="contraseña" 
                        type="password" 
                        id="password"
                        value={ this.state.password } 
                        onChange={ this.inputChangeHandler } 
                        autoComplete="new-password"
                    />
                    <Input 
                        placeholder="Confirmar contraseña" 
                        type="password" 
                        id="confirmPassword"
                        value={ this.state.confirmPassword } 
                        onChange={ this.inputChangeHandler } 
                        autoComplete="new-password"
                    />
                    <Button>Registrarse</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignup: (data) => dispatch({ type: 'SIGNUP', data: data })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);