import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button, Collapse } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
 
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      account: [],
      username: [],
      password: [],
      /* account: null,
      username: null,
      password: null, */
      users: '',
      openNuovo: false,
      openSalvato: false,
      cripted: true,
      showPassword: false,
      inputType: 'password'
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

  showPassword (index) {
    this.state.password[index] = "ciao"
  }

  //password input type
  changeInput(ind) {
    document.getElementById(ind).type="text";
  }

  readUserData(userID) {
    this.setState({
      users: null
    })
    const rootRef = fire.database().ref();
    const user = rootRef.child('users/'+userID)

    user.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          account: this.state.account.concat([child.key]),
          username: this.state.username.concat([child.val().username]),
          password: this.state.password.concat([child.val().password])
          /* account: child.key,
          username: child.val().username,
          password: child.val().password */
        });
        //console.log(child.key + '' + child.val().username + '' + child.val().passowrd)
        
        const userList = this.state.account.map((dataList, index) =>
                <p>
                    {dataList}
                    <br />
                    <br />                    
                          <input type="password" id={index} name="password" className="tableAccount" value={this.decriptaPassword(this.state.password[index])}/>
                          <Button variant="outline-light" className="passwordButton" 
                              onClick={document.getElementById(index).type="text"}>
                              <FiEyeOff/>
                          </Button>
                          <p>INDEX: {index}</p>                       
                    <hr />
                </p>
            );
            this.setState({
                users: userList
            });
      })
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
          <div className="collapse-account-salvati" id="collapse-account-salvati">
          
            <ul>{this.state.users}</ul>
            <table className="tableAccountSalvati">
              {/* <tr><td><b>Impostazioni</b></td></tr> */}
              <tr>
                <td><p>Account</p></td>
                <td><input type="text" name="nome" className="tableAccount" value={this.state.account}/></td>
              </tr>
              <tr>
                <td><p>Username</p></td>
                <td><input type="text" name="cognome" className="tableAccount" value={this.state.username}/></td>
              </tr>
              <tr>
                <td><p>Password</p></td>
                {this.state.showPassword
                ? <>
                    {/* PASSWORD MOSTRA */}
                    <td><input type="text" name="password" className="tableAccount" value={this.state.password}/></td>
                    <Button variant="outline-light" className="passwordButton" 
                        onClick={this.setShowPasswordFalse}>
                        <FiEyeOff/>
                    </Button>
                  </> 
                : <>
                    {/* PASSWORD NASCONDI */}
                    <td><input type="password" name="password" className="tableAccount" value={this.state.password}/></td>
                    <Button variant="outline-light" className="passwordButton" onClick={this.decriptaPassword}><FiEye/>
                    </Button>
                  </> 
                }

              </tr>
            </table>
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
              <Form.Control type="text" placeholder="Enter username" ref={(input) => { this.usernameInput = input }}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" ref={(input) => { this.passwordInput = input }}/>
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
