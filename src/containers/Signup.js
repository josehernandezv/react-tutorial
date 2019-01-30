import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Form, Button } from '../components/ui/FormControls';
import { Redirect } from 'react-router-dom';
import { signup } from '../store/actions';

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
        console.log(this.state)
        this.props.onSignup({
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        });
    }

    render () {
        console.log(this.props.isAuth)
        if (this.props.isAuth) {
            return <Redirect to="/" />;
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
                    />
                    <Input 
                        placeholder="nombre" 
                        id="name"
                        value={ this.state.name } 
                        onChange={ this.inputChangeHandler } 
                    />
                    <Input 
                        placeholder="contraseña" 
                        type="password" 
                        id="password"
                        value={ this.state.password } 
                        onChange={ this.inputChangeHandler } 
                    />
                    <Input 
                        placeholder="Confirmar contraseña" 
                        type="password" 
                        id="confirmPassword"
                        value={ this.state.confirmPassword } 
                        onChange={ this.inputChangeHandler } 
                    />
                    <Button>Registrarse</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

const mapDisptachToProps = dispatch => {
    return {
        onSignup: (data) => dispatch(signup(data))
    }
}


export default connect(mapStateToProps, mapDisptachToProps)(Signup);