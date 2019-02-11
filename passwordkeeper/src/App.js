import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import './App.css';
import  { fire } from './config/Fire';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Error from './components/Error';

function AuthenticatedRoute ({component: Compomponent, authenticated, ...rest}) {
  return (
    <Route
    {...rest}
    render={(props) => authenticated === true 
      ? <Compomponent {...props} {...rest} />
      : <Redirect to='/login'/> } />
  )
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
    };
  }

  componentWillMount() {
    this.removeAuthListener = fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading : false         
        })
      }else {
        this.setState({
          authenticated: false,
          loading : false             
        })
      }
    })
  }

  componentWillUnmount() {
    this.removeAuthListener();
  }


  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div className="mainStyle">
      <style>{'body { background-color: #515A5A; }'}</style>
        <BrowserRouter>
          <div>
            {/* HEADER passando la variabile authenticated */}
            <Header authenticated={this.state.authenticated} />  
          <Switch>
            {/* CREO TUTTI I PATH */}

            <Route exact path="/" component={Welcome}/>

            <Route exact path="/login" render={(props) => {
                  return <Login setCurrentUser={this.setCurrentUser} {...props} />
                }} />

            <Route exact path="/logout" component={Logout} />

            <AuthenticatedRoute
            exact path="/profile"
            authenticated={this.state.authenticated}
            component={Profile}/>

            {/* ROUTE NON PRESENTE: ERRORE */}
            <Route component={Error} />
            </Switch>
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
