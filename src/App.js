import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from './components/Layout';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import NewPlay from './containers/NewPlay';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            { this.props.isAuthenticated && (
              <Route path="/new" exact component={ NewPlay } />
            )}
            <Route path="/login" exact component={ Login } />
            <Route path="/signup" exact component={ Signup } />
            <Route path="/" exact component={ Home } />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.auth.tokenId !== null
  }
}

export default connect(mapStateToProps)(App);
