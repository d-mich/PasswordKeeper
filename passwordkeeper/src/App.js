import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { RingLoader } from 'react-spinners';
import './App.css';
import  { fire } from './config/Fire';
import Header from './components/Header';
import Login from './components/Login';
import Logout from './components/Logout';
import Footer from './components/Footer';
import Welcome from './components/Welcome';
import Profile from './components/Profile';

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
        loading: true,
        userID: null,
        name: null,
        picture: null
    }
    this.setAuthenticated = this.setAuthenticated.bind(this)
    this.setUserId = this.setUserId.bind(this)
    this.setName = this.setName.bind(this)
    this.setPicture = this.setPicture.bind(this)
  }

  setAuthenticated(param) {
    this.setState({
      authenticated : param
    });
  }
  
  setUserId(param) {
    this.setState({
      userID : param
    });
  }

  setName(param) {
    this.setState({
      name : param
    });
  }

  setPicture(param) {
    this.setState({
      picture : param
    });
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
          <RingLoader />
        </div>
      )
    }

    console.log('AUTHENTICATED: '+this.state.authenticated)
    console.log('USER ID: '+this.state.userID)
    console.log('USER NAME: '+this.state.name)
    console.log('USER NAME: '+this.state.picture)

    return (
      <div className="mainStyle">
      <style>{'body { background-color: #515A5A; }'}</style>
        <BrowserRouter>
          <div>
            {/* HEADER passando la variabile authenticated */}
            <Header authenticated={this.state.authenticated} 
                    picture={this.state.picture}/>  
          <Switch>
            {/* CREO TUTTI I PATH */}

            <Route exact path="/" component={Welcome}/>
      
            <Route exact path="/login" render={(props) => 
                  <Login setAuthenticated={this.setAuthenticated}
                  setUserId={this.setUserId}
                  setName={this.setName} 
                  setPicture={this.setPicture}
                  {...props}/> //per history.push
                } />

            <Route exact path="/logout" component={Logout} />

            <AuthenticatedRoute
            exact path="/profile"
            authenticated={this.state.authenticated}
            userID={this.state.userID}
            name={this.state.name}
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
