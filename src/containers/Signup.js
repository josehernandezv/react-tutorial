import React, { Component } from 'react';
import { Input, Form, Button } from '../components/ui/FormControls'

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
    }

    render () {
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

export default Signup;