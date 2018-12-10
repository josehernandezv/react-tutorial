import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Errors } from '../components/ui/FormControls';
import { Paper } from '../components/ui';
import { createMatch, createMatchInit } from '../store/actions';
import { Redirect } from 'react-router';

class NewPlay extends Component {

    state = {
        title: '',
        date: '',
        formCompleted: false
    }

    componentDidMount() {
        this.props.onInit();
    }
    
    inputChangedHandler = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    submitHandler = event => {
        event.preventDefault();
        this.props.onCreateMatch(this.state.title, new Date(this.state.date))
        this.setState({ formCompleted: true })
    }
    
    render() {
        if (this.props.matchCreated && this.state.formCompleted) {
            return <Redirect to="/" />
        }
        return (
            <Paper>
                <Form onSubmit={ this.submitHandler }>
                    <h1>Nueva mejenga</h1>
                    <Input 
                        placeholder="Título" 
                        value={ this.state.title }
                        onChange={ this.inputChangedHandler }
                        id="title"
                    />
                    <Input 
                        placeholder="Fecha" 
                        value={ this.state.date }
                        onChange={ this.inputChangedHandler }
                        id="date"
                        type="date"
                    />
                    <Button disabled={ 
                        this.state.title === '' ||
                        this.state.date === ''
                     }>
                        { this.props.isLoading ? '...cargando' : 'Crear' }
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
        error: state.matches.error,
        matchCreated: state.matches.matchCreated,
        isLoading: state.matches.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateMatch: (title, date) => dispatch(createMatch(title, date)),
        onInit: () => dispatch(createMatchInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlay);