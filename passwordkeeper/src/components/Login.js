import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';
import { Button, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Styles from './Style.css';

class Login extends Component{

    constructor(props) {
        super(props);
        this.authWithGoogle = this.authWithGoogle.bind(this)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.state = {
          redirect: false
          /* di default non si reindirizza (false) 
          ma se viene messo a true verremo reindirizzati in un altra parte */
        }
      }

      authWithGoogle() {
        fire.auth().signInWithPopup(providerGoogle)
          .then((user, error) => {
            if (error) {    //autenticazione fallita
              /* this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" }) */
            } else {    //autenticazione corretta
                console.log("autenticazione google");
              this.setState({ 
                redirect: true,
                user
            }) //redirect
            }
          })
      }

      authWithFacebook() {
        fire.auth().signInWithPopup(providerFacebook)
          .then((user, error) => {
            if (error) {
              /* this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" }) */
            } else {
                console.log("autenticazione facebook");
              this.props.setCurrentUser(user)
              this.setState({ redirect: true })
            }
          })
      }
    
      authWithEmailPassword(event) {
        event.preventDefault()  //quando si clicca non cambia pagina e la ricarica
    
        const email = this.emailInput.value
        const password = this.passwordInput.value
    
        fire.auth().fetchProvidersForEmail(email)
          .then((providers) => {
            if (providers.length === 0) {
              // create user
              return fire.auth().createUserWithEmailAndPassword(email, password)
            } else if (providers.indexOf("password") === -1) {
              // they used facebook
              this.loginForm.reset()
              /* this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." }) */
            } else {
              // sign user in
              return fire.auth().signInWithEmailAndPassword(email, password)
            }
          })
          .then((user) => {
            if (user && user.email) {
                console.log("autenticazione email");
              this.loginForm.reset()
              this.props.setCurrentUser(user)
              this.setState({redirect: true})
            }
          })
          .catch((error) => {
            /* this.toaster.show({ intent: Intent.DANGER, message: error.message }) */
          })
      }



    render() {
        //redirect: root
        if(this.state.redirect === true) {
            return <Redirect to='/'/>
        }

        //redirect: default (false)
        return (
          <div className="loginStyle">
            <Form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
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
            <div className="signUPButton">
            <Button variant="outline-light" type="submit" href='/profile'>
              Sign Up
            </Button>
            </div>            
          </Form>
          <br></br>
          <FacebookLoginButton onClick={() => { this.authWithFacebook() }} />
          <GoogleLoginButton onClick={() => { this.authWithGoogle() }} />
      </div>
          
        )
    }
}

export default Login;