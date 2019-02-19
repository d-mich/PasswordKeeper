import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button, Collapse } from 'react-bootstrap';
 
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      account: [],
      username: [],
      password: [],
      users: '',
      openNuovo: false,
      openSalvato: false
    }
  }

  writeUserData(userid, acc, us, pwd){
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
        });
        //console.log(child.key + '' + child.val().username + '' + child.val().passowrd)
        const userList = this.state.account.map((dataList, index) =>
                <p>
                    {dataList}
                    <br />
                    {this.state.username[index]}
                    <br />
                    {this.state.password[index]}
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

  aggiungiDati(event) {
    event.preventDefault()  //quando si clicca non cambia pagina e la ricarica
    const accountNuovo = this.accountInput.value
    const usernameNuovo = this.usernameInput.value
    const passwordNuovo = this.passwordInput.value

    //import libreria
    var CryptoJS = require("crypto-js"); 
    //chiave
    var chiave = this.chiaveCifratura(this.props.userID)
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(passwordNuovo, chiave);    
    // Decrypt
    var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), chiave);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

    this.accountForm.reset();

    this.writeUserData(this.props.userID, accountNuovo, usernameNuovo, ciphertext.toString())
    //this.readUserData(this.props.userID)
  }

  componentDidMount() {
    console.log("USER ID PROFILE: "+this.props.userID)
    console.log("USER NAME PROFILE: "+this.props.name)
    console.log("USER ID P: "+this.state.userID)
    console.log("USER NAME P: "+this.state.name)
  }

  componentWillMount() {
    this.readUserData(this.props.userID)
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
          <div id="collapse-account-salvati">

          {this.state.users}
          
            <ul>{this.state.users}</ul>
            <table className="tableAccountSalvati">
              {/* <tr><td><b>Impostazioni</b></td></tr> */}
              <tr>
                <td><p>Account</p></td>
                <td><input type="text" name="nome"/></td>
              </tr>
              <tr>
                <td><p>Username</p></td>
                <td><input type="text" name="cognome"/></td>
              </tr>
              <tr>
                <td><p>Password</p></td>
                <td><input type="password" name="password"/></td>
              </tr>
              <tr>
                <td><input type="button" value="Invia" onClick="Modulo()"/></td>
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
