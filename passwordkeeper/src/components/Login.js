import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';
import { Button, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Styles from './Style.css';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import App from '../App';
import { timingSafeEqual } from 'crypto';

class Login extends Component{

    constructor(props) {
        super(props);        
        this.state = {
          user: null,
          isLoggedIn : false,
          redirect: false
          /* di default non si reindirizza (false) 
          ma se viene messo a true verremo reindirizzati in un altra parte */
        }        
        this.authWithGoogle = this.authWithGoogle.bind(this)
        this.authWithFacebook = this.authWithFacebook.bind(this)
        this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
        this.setUser = this.setUser.bind(this)
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
            console.log("autenticazione "+"");                
            //set user state
            this.setUser(result.user)                
            //set authenticated true
            this.props.setAuthenticated(true)
            //set user info
            this.setUserInfo()

            //redirect
            this.props.history.push('/profile')   
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            /* if(error.code === 'auth/account-exists-with-different-credential') {
              console.log("utente già autenticato con questa mail");
            } */
          });
      }

      authWithGoogle() {
        fire.auth().signInWithPopup(providerGoogle)
          .then((result) => {
            console.log("autenticazione google");                
            //set user state
            this.setUser(result.user)                
            //set authenticated true
            this.props.setAuthenticated(true)
            //set user info
            this.setUserInfo()
            //redirect
            this.props.history.push('/profile')   
          })
          .catch(function(error) {
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

      authWithFacebook() {
        fire.auth().signInWithPopup(providerFacebook)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            console.log("autenticazione google");                
            //set user state
            this.setUser(result.user)                
            //set authenticated true
            this.props.setAuthenticated(true)
            //set user info
            this.setUserInfo()
            //redirect
            this.props.history.push('/profile')           
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
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
                console.log("EMAIL USER ID: " + user)
              this.loginForm.reset()
              this.props.set(user)
              this.setState({redirect: true})
            }
          })
          .catch((error) => {
            /* this.toaster.show({ intent: Intent.DANGER, message: error.message }) */
          })
      }

    writeUserData(userID, email,fname,lname){
      fire.database().ref('users/' + userID).set({
          email,
          fname,
          lname
      }).then((data)=>{
          //success callback
          console.log('data ' , data)
      }).catch((error)=>{
          //error callback
          console.log('error ' , error)
      })
    }

    readUserData(userID) {
      fire.database().ref('/users/' + userID).once('value')
      .then(function (snapshot) {
          console.log(snapshot.val())
      });
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
              Accedi
            </Button>
            </div>            
          </Form>
          <br></br>
          <FacebookLoginButton onClick={() => { this.authentication(providerFacebook) }}>Accedi con Facebook</FacebookLoginButton>
          <GoogleLoginButton onClick={() => { this.authentication(providerGoogle) }}>Accedi con Google</GoogleLoginButton>
        </div>   
        );
    }
}

export default Login;