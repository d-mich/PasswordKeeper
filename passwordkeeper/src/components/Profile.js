import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button, Collapse } from 'react-bootstrap';
import { FiEye, FiEyeOff, FiEdit } from 'react-icons/fi';
 
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      account: [],
      username: [],
      password: [],
      displayAccount: '',
      openNuovo: false,
      openSalvato: false,
      cripted: true,
      showPassword: false,
      inputType: 'text',
      facebookForm: true,
      twitterForm: false
    }
    this.setPassword = this.setPassword.bind(this)
    this.setShowPasswordTrue = this.setShowPasswordTrue.bind(this)
    this.setShowPasswordFalse = this.setShowPasswordFalse.bind(this)
  }

  setCripted = (param) => {
    this.setState({
      cripted: param      
    })
  }

  setShowPasswordTrue () {
    this.setState({
      showPassword: true      
    })
  }

  setShowPasswordFalse () {
    this.setState({
      showPassword: false      
    })
  }

  setPassword (param) {
    this.setState({
      password: param      
    })
  }

  writeUserData(userid, acc, us, pwd) {
    fire.database().ref('users/' + userid + '/' + acc).set({
        username: us,
        password: pwd
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    })
  }

  showPassword () {
    console.log("SHOW PASSWORD")
  }

  //password input type
  changeInput() {
    document.getElementById("inputPassword").value="text";
  }

  readUserData(userID) {
    
    if (this.state.displayAccount ===  '') {
        console.log("ACCOUNT NULLO")
    } else {
      console.log("ACCOUNT PIENO")
    }

    const rootRef = fire.database().ref();
    const user = rootRef.child('users/'+userID)

    
      user.once('value', snap => {
        snap.forEach(child => {
          this.setState({
            account: this.state.account.concat([child.key]),
            username: this.state.username.concat([child.val().username]),
            password: this.state.password.concat([child.val().password])
          });
        });
            
        const accountList = this.state.account.map((account, index) => 
                   <>
                   {account === 'facebook'
                    ? 
                      <Form onSubmit={(event) => { this.modificaDatiFacebook(event) }} ref={(form) => { this.formFacebook = form }}>
                        <Form.Group controlId="formBasicInput">
                          <Form.Label>Account</Form.Label>
                          <Form.Control type="text" placeholder="Enter account" value={account} ref={(input) => { this.accountFacebook = input }}/>              </Form.Group>
                        <Form.Group controlId="formBasicInput">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={this.state.username[index]} ref={(input) => { this.usernameFacebook = input }}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="text" placeholder="Password" value={this.state.password[index]} ref={(input) => { this.passwordFacebook = input }}/>
                        </Form.Group>
                        <Button className="formPassword" variant="dark" type="submit" 
                          >
                          <FiEye className="iconeForm"/>
                        </Button>
                        <Button className="formEdit" variant="dark" type="submit">
                          <FiEdit className="iconeForm"/>
                        </Button>
                      </Form>    
                    : null
                    }                                  
                  </>   
         );
         this.setState ({
          displayAccount : accountList
         })        
      }); 
  }

  modificaDatiFacebook (event) {
      event.preventDefault()  //quando si clicca non cambia pagina e la ricarica
      const account = this.accountFacebook.value
      const username = this.usernameFacebook.value
      const password = this.passwordFacebook.value
  
      //import libreria
      var CryptoJS = require("crypto-js"); 
      //chiave
      var chiave = this.chiaveCifratura(this.state.userID)  
      // Decrypt
      var bytes = CryptoJS.AES.decrypt(password.toString(), chiave);
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      console.log("PASSWORD DECRIPTATA: "+plaintext)
     
      const acc = this.state.account.map((account, index) => 
                   <>
                   {account === 'facebook'
                    ? 
                      <Form onSubmit={(event) => { this.modificaDatiFacebook(event) }} ref={(form) => { this.formFacebook = form }}>
                        <Form.Group controlId="formBasicInput">
                          <Form.Label>Account</Form.Label>
                          <Form.Control type="text" placeholder="Enter account" value={account} ref={(input) => { this.accountFacebook = input }}/>              </Form.Group>
                        <Form.Group controlId="formBasicInput">
                          <Form.Label>Username</Form.Label>
                          <Form.Control type="text" placeholder="Enter username" value={this.state.username[index]} ref={(input) => { this.usernameFacebook = input }}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="text" placeholder="Password" value={this.state.password[index]} ref={(input) => { this.passwordFacebook = input }}/>
                        </Form.Group>
                        <Button className="formPassword" variant="dark" type="submit" 
                          >
                          <FiEye className="iconeForm"/>
                        </Button>
                        <Button className="formEdit" variant="dark" type="submit">
                          <FiEdit className="iconeForm"/>
                        </Button>
                      </Form>    
                    : null
                    }                                  
                  </>   
         );
         this.setState ({
          displayAccount : acc
         })
  }

  updateSingleData(email){
    fire.database().ref('users/').update({
        email,
    });
  }

  chiaveCifratura(str) {
    return str.split("").reverse().join("");
  }

  decriptaPassword (pass) {
    
    /* if(this.state.cripted) { */
       //import libreria
      var CryptoJS = require("crypto-js"); 
      //chiave
      var chiave = this.chiaveCifratura(this.state.userID)
      var bytes = CryptoJS.AES.decrypt(pass.toString(), chiave);
      var plaintext = bytes.toString(CryptoJS.enc.Utf8);
      return plaintext
      //this.setPassword(plaintext)
      this.setCripted(false)
    /* } */   
    this.setShowPasswordTrue()
  }

  aggiungiDati(event) {
    event.preventDefault()  //quando si clicca non cambia pagina e la ricarica
    const accountNuovo = this.accountInput.value
    const usernameNuovo = this.usernameInput.value
    const passwordNuovo = this.passwordInput.value

    //import libreria
    var CryptoJS = require("crypto-js"); 
    //chiave
    var chiave = this.chiaveCifratura(this.state.userID)
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(passwordNuovo, chiave);    
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), chiave);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    this.setCripted(true)

    this.accountForm.reset();

    this.writeUserData(this.state.userID, accountNuovo, usernameNuovo, ciphertext.toString())
    //this.readUserData(this.props.userID)
  }

  componentDidMount() {
    console.log("USER ID PROFILE: "+this.state.userID)
    console.log("USER NAME PROFILE: "+this.props.name)
    console.log("USER ID P: "+this.state.userID)
    console.log("USER NAME P: "+this.state.name)
  }

  componentWillMount() {
    this.readUserData(this.state.userID)
  }

  componentWillUnmount() {
    /* cancellare dati utente */
  }

  render() {
    const { openNuovo, openSalvato } = this.state;
    return (
     <div className="welcomeText">
        <h3>Pagina personale di {this.props.name}</h3>

        <Button variant='outline-light' className="accountSalvati"
        onClick={() => this.setState({ openNuovo: false , openSalvato: !openSalvato})}
        aria-controls="collapse-account-salvati"
        aria-expanded={openSalvato}>
        Account Salvati
        </Button>
        <Button variant='outline-light' className="accountAggiungi"
          onClick={() => this.setState({ openSalvato: false, openNuovo: !openNuovo})}
          aria-controls="collapse-account-nuovo"
          aria-expanded={openNuovo}>
          Aggiungi Account
        </Button>
        <Collapse in={this.state.openSalvato}>
          <div className="nuovoAccountStyle" id="collapse-account-salvati">
          
            {this.state.displayAccount}

          </div>
        </Collapse>
        
        <Collapse in={this.state.openNuovo}>
        <div className="nuovoAccountStyle" id="collapse-account-nuovo">
          <Form onSubmit={(event) => { this.aggiungiDati(event) }} ref={(form) => { this.accountForm = form }}>
          <Form.Group controlId="formBasicInput">
              <Form.Label>Account</Form.Label>
              <Form.Control type="text" placeholder="Enter account" ref={(input) => { this.accountInput = input }}/>
              <Form.Text className="textAccount">
                Es: Facebook, Twitter..
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicInput">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value="" ref={(input) => { this.usernameInput = input }}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value="" ref={(input) => { this.passwordInput = input }}/>
            </Form.Group>
            <Button variant="dark" type="submit" 
            onClick={() => this.setState({ openNuovo: false })}>
              Salva
            </Button>
          </Form>
        </div>
        </Collapse>
        </div>
    );
  }
}

export default Profile;
