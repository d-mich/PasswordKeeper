import React, { Component } from 'react';
import './App.css';
import fire, { auth, providerGoogle, providerFacebook } from './config/Fire';

class App extends Component {

  constructor(props) {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null // <-- add this line
    }
    this.login = this.loginGoogle.bind(this);
    this.logout = this.logout.bind(this);
  }

  loginGoogle() {
    auth.signInWithPopup(providerGoogle) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  loginFacebook() {
    auth.signInWithPopup(providerFacebook) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  render() {
    return (
      <div className="wrapper">
        <h1>PROGETTO PAWM</h1>
        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>                
          :
          <button onClick={this.loginGoogle}>Google Log In</button>              
        }

        {this.state.user ?
          <button onClick={this.logout}>Log Out</button>                
          :
          <button onClick={this.loginFacebook}>Facebook Log In</button>              
        }
      </div>
    
    )}
}

export default App;
