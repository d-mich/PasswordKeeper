import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';
import { Button, Form } from 'react-bootstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import Styles from './Style.css';

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
        this.authentication = this.authentication.bind(this)
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
            if(error.code === 'auth/account-exists-with-different-credential') {
              console.log("utente già autenticato con questa mail");
            } 
          });
      }
    
      authWithEmailPassword (event) {    
        const email = this.emailInput.value
        const password = this.passwordInput.value

        event.preventDefault()  //quando si clicca non cambia pagina e la ricarica       

        fire.auth().signInWithEmailAndPassword(email, password)
          .then((result) => {              
          //set user state
          this.setUser(result.user)
          //set user info
          this.setUserInfo()    
          //redirect
          this.props.history.push('/profile')   
          }).catch((error) => {
            //alert("Errore account: \n"+error)
            fire.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {              
              //set user state
              this.setUser(result.user)
              //set user info
              this.setUserInfo()    
              //redirect
              this.props.history.push('/profile')   
            }).catch((error) => {
              alert("Errore account: \n"+error)
            })
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
           <Form onSubmit={this.authWithEmailPassword} >
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

          <br></br>
          <FacebookLoginButton onClick={() => { this.authentication(providerFacebook) }}>Accedi con Facebook</FacebookLoginButton>
          <GoogleLoginButton onClick={() => { this.authentication(providerGoogle) }}>Accedi con Google</GoogleLoginButton>
        </div>   
        );
    }
}

export default Login;