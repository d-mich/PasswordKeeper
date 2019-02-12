import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';
import { Button, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Styles from './Style.css';
import FacebookLogin from 'react-facebook-login';

class Login extends Component{

    constructor(props) {
        super(props);
        this.authWithGoogle = this.authWithGoogle.bind(this)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.state = {
          isLoggedIn : false,
          userID: '',
          name: '',
          email: '',
          picture: '',
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
          .then((result, error) => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log("AUTENTICATO CON FACEBOOK");
            console.log(result.user);
            this.setState ({
              userID: result.user.displayName,
              email: result.user.email,
              picture: result.user.photoURL,
            })
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if(error.code === 'auth/account-exists-with-different-credential') {
              console.log("utente già autenticato con questa mail");
            }
          });
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

    responseFacebook = response => {
      this.setState ({
        isLoggedIn: true,
        userID: response.userID,
        name: response.name,
        email: response.email,
        picture: response.picture.data.url
      });
    }

    componentClicked = () => console.log('clicked');

    render() {
      let fbContent;
        //redirect: root
        if(this.state.redirect === true) {
            return <Redirect to='/'/>
        }

        if (this.state.isLoggedIn) {
          fbContent = (
            <div style={{
              width: '400px',
              margin: 'auto',
              padding: '20px'
            }}>
            <img src={this.state.picture} alt={this.state.name} />
            <h2>Benvenuto {this.state.name}</h2>
            email: {this.state.email}
            </div>
          )
        } else {
          fbContent =(
            <FacebookLogin
              appId="2655444627828934"
              autoLoad={true}
              fields="name,email,picture"
              onClick={this.componentClicked}
              callback={this.responseFacebook} />
          );
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
        
          {fbContent}
        </div>   
        );
    }
}

export default Login;