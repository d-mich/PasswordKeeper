import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';
import { Button, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Styles from './Style.css';

class Login extends Component{

  constructor() {
      super();        
      this.state = {
        user: null
      }        
      this.authentication = this.authentication.bind(this)
      this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
      this.setUser = this.setUser.bind(this)
    }

    setRedirect(param) {
      this.setState({
        redirect: param
      })
    }

    setUser(currentUser) {
      this.setState({
        user: currentUser
      })
    }

    setUserInfo() {
      this.props.setLocalUser(
        JSON.parse(JSON.stringify(this.state.user.uid)),
        JSON.parse(JSON.stringify(this.state.user.email)),
        JSON.parse(JSON.stringify(this.state.user.displayName)),
        JSON.parse(JSON.stringify(this.state.user.photoURL))
      )
      this.props.setStateUser()
    }

    authentication(provider) {
      fire.auth().signInWithPopup(provider)
      .then((result) => {    
        this.setUser(result.user) 
        this.setUserInfo()        
        this.props.setAuthenticated(true)
      })
      .catch((error) => {
        if(error.code === 'auth/account-exists-with-different-credential') {
          alert("Email collegata ad un altro account");
        } else alert("Errore login:"+error)
      });
    }
  
    authWithEmailPassword (event) {    
      const email = this.emailInput.value
      const password = this.passwordInput.value 
      fire.auth().signInWithEmailAndPassword(email, password)
        .then((result) => {       
        this.setUser(result.user)  
        this.setUserInfo()        
        this.props.setAuthenticated(true)
        }).catch((error) => {
          if(error.code === 'auth/account-exists-with-different-credential') {
            alert("Email collegata ad un altro account");
          } else if (error.code === 'auth/wrong-password') {
            alert("Password errata");
          } else if (error.code === 'auth/user-not-found') {
            fire.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {    
              this.setUser(result.user) 
              this.setUserInfo()        
              this.props.setAuthenticated(true)
            }).catch((error) => {
              if(error.code === 'auth/weak-password') {
                alert("La password deve contenere almeno 6 caratteri");
              } else if (error.code === 'auth/invalid-email') {
                alert("Email non valida");
              } else alert("Errore creazione account:"+error)
            })
          } else alert("Errore login:"+error)
        })
      event.preventDefault()
    }

    render() {
      if (this.props.authenticated === true) {
        return <Redirect to='/profile'/>
      }
      return (
        <div className="loginStyle">
          <Form onSubmit={(event) => this.authWithEmailPassword(event)} >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={(input) => { this.emailInput = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(input) => { this.passwordInput = input }}/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
          </Form.Group>            
          <Button variant="outline-light" type="submit">
            Accedi
          </Button>                       
        </Form>

        <br/>
        <FacebookLoginButton onClick={() => { this.authentication(providerFacebook) }}>Accedi con Facebook</FacebookLoginButton>
        <GoogleLoginButton onClick={() => { this.authentication(providerGoogle) }}>Accedi con Google</GoogleLoginButton>
        <br/>
      </div>   
      );
    }
  }

export default Login;