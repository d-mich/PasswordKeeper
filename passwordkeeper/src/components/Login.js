import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent} from '@blueprintjs/core';
import { fire, providerGoogle, providerFacebook } from '../config/Fire';



const loginStyles = {
    width: "90%",
    maxWidth: "315px",
    margin: "20px auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px"
  }

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
              this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Google" })
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
              this.toaster.show({ intent: Intent.DANGER, message: "Unable to sign in with Facebook" })
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
              this.toaster.show({ intent: Intent.WARNING, message: "Try alternative login." })
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
            <div style={loginStyles}>
            <Toaster ref={(element) => { this.toaster = element }} />
            <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithGoogle() }}>Log In with Google</button>
            <button style={{width: "100%"}} className="pt-button pt-intent-primary" onClick={() => { this.authWithFacebook() }}>Log In with Facebook</button>
            
            
            
            <hr style={{marginTop: "10px", marginBottom: "10px"}}/>
            {/* FORM, OGNI VOLTA CHE INTERAGIAMO CON I METODI DI AUTENTICAZIONE VIENE RICHIAMATO IL FORM */}
            <form onSubmit={(event) => { this.authWithEmailPassword(event) }} ref={(form) => { this.loginForm = form }}>
                <div style={{marginBottom: "10px"}} className="pt-callout pt-icon-info-sign">
                <h5>Note</h5>
                If you don't have an account already, this form will create your account.
                </div>
                <label className="pt-label">
                Email
                <input style={{width: "100%"}} className="pt-input" name="email" type="email" ref={(input) => { this.emailInput = input }} placeholder="Email"></input>
                </label>
                <label className="pt-label">
                Password
                <input style={{width: "100%"}} className="pt-input" name="password" type="password" ref={(input) => { this.passwordInput = input }} placeholder="Password"></input>
                </label>
                <input style={{width: "100%"}} type="submit" className="pt-button pt-intent-primary" value="Log In"></input>
    
            </form>
            </div>
        )
    }
}

export default Login;