import React, { Component } from 'react';
import { fire } from '../config/Fire';
import { Form, Button, Collapse, Modal } from 'react-bootstrap';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import StyleProfile from './StyleProfile.css';
 
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: this.props.userID,
      account: [],
      username: [],
      password: [],
      button: [],
      openNuovo: false,
      openSalvato: false,
      show: false,
      indexModal: null
    }
    this.eliminaDatiAccount = this.eliminaDatiAccount.bind(this)
    this.decriptaPassword = this.decriptaPassword.bind(this)
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
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

  readUserData(userID) {
    const rootRef = fire.database().ref();
    const user = rootRef.child('users/'+userID)
    
    user.once('value', snap => {
      snap.forEach(child => {
        this.setState({
          account: this.state.account.concat([child.key]),
          username: this.state.username.concat([child.val().username]),
          password: this.state.password.concat([child.val().password]),
          button: this.state.button.concat(false),
        });
      });    
    }); 
  }

  chiaveCifratura(str) {
    return str.split("").reverse().join("");
  }

  aggiungiDati() {
    const accountNuovo = this.accountInput.value
    const usernameNuovo = this.usernameInput.value
    const passwordNuovo = this.passwordInput.value

    if (accountNuovo != '' && usernameNuovo != '' && passwordNuovo != '') {
      var CryptoJS = require("crypto-js"); 
      var chiave = this.chiaveCifratura(this.state.userID)
      var ciphertext = CryptoJS.AES.encrypt(passwordNuovo, chiave);
      this.writeUserData(this.state.userID, accountNuovo, usernameNuovo, ciphertext.toString())
      alert("Account "+accountNuovo+" aggiunto")
    } else {
      alert("Tutti i campi devono essere compilati")
    }
    this.accountForm.reset();
  }

  decriptaPassword(event, index) {
    var CryptoJS = require("crypto-js"); 
    var chiave = this.chiaveCifratura(this.state.userID)  
    var bytes = CryptoJS.AES.decrypt(this.state.password[index].toString(), chiave);
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    this.state.password[index] = plaintext
    event.preventDefault()
  }
  
  handleShowPassword(event,index) {
    this.decriptaPassword(event, index)
    this.setState({
      isButtonDisabled: true
    });
    this.state.button[index] = true;
  }

  handleHidePassword(event,index) {
    this.setState({
      isButtonDisabled: false
    });
    this.state.button[index] = false;
  }

  eliminaDatiAccount (event, index) {
    this.handleShow()
    this.setState ({
      indexModal: index
    })
    event.preventDefault()
  }

  eliminaPiattaforma (index) {
    fire.database().ref('users/' + this.state.userID + '/' + this.state.account[index]).remove();    
    this.handleClose()
    window.location.reload(); //aggiorna la pagina
  }

  componentDidMount() {
    this.readUserData(this.props.userID)
  }

  getModal() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose} >
          <Modal.Header closeButton>
          <Modal.Title>Cancellazione Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <h5>Dati account</h5>
              <ul>
                <li>Pattaforma: {this.state.account[this.state.indexModal]}</li>
                <li>Username: {this.state.username[this.state.indexModal]}</li>
              </ul>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success" onClick={this.handleClose}>
              Annulla
          </Button>
          <Button variant="danger" onClick={() => this.eliminaPiattaforma(this.state.indexModal)}>
              Elimina
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }

  getSalvatiForm () {
    return (
      <div>
        {this.state.account.map((account, index) => (
            <div key={account}>
              <br/>
              <Form>
                <Form.Group controlId="formBasicInput">
                  <Form.Label>Account</Form.Label>
                  <Form.Control type="text" placeholder="Enter account" value={account} ref={(input) => { this.accountForm = input }}/>              </Form.Group>
                  <Form.Group controlId="formBasicInput">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username" value={this.state.username[index]} ref={(input) => { this.usernameForm = input }}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    {this.state.button[index]
                      ?  <Form.Control type="text" placeholder="PasswordVisibile" value={this.state.password[index]} ref={(input) => { this.passwordForm = input }}/>
                      : <Form.Control type="password" placeholder="PasswordNascosta" value={this.state.password[index]} ref={(input) => { this.passwordForm = input }}/>
                    }
                  </Form.Group>
                  <Button className="formPassword" variant="dark" type="submit" disabled={this.state.button[index]}
                  onClick={(event) => {this.handleShowPassword(event,index)}}>
                    <FiEye className="iconeForm"/>
                  </Button>
                  <Button className="formDelete" variant="dark" type="submit"
                    onClick={(event) => {this.eliminaDatiAccount(event, index)}}>
                    <FiTrash2 className="iconeForm"/>
                  </Button> 
                </Form>
            </div>
          ))}
      </div>      
    )
  }

  getAggiungiForm() {
    return (
      <div>
        <Form onSubmit={() => { this.aggiungiDati() }} ref={(form) => { this.accountForm = form }}>
        <Form.Group controlId="formBasicInput">
          <Form.Label> Salva il tuo account completando i seguenti campi: </Form.Label><br /><br /> 
          <Form.Group controlId="formBasicInput">
            <Form.Label>Piattaforma</Form.Label>
            <Form.Control type="text" placeholder="Enter a platform" ref={(input) => { this.accountInput = input }}/>
          </Form.Group>
          <small >ex. Facebook, Twitter...</small> 
          </Form.Group>
          <Form.Group controlId="formBasicInput">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" ref={(input) => { this.usernameInput = input }}/>
          </Form.Group>
          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(input) => { this.passwordInput = input }}/>
          </Form.Group>
          <Button variant="outline-light" type="submit" 
          onClick={() => this.setState({ openNuovo: false })}>
            Salva
          </Button>
        </Form>
      </div>
    )
  }

  render() {
    const { openNuovo, openSalvato } = this.state;
    return (
      <div className="welcomeText"> 
        {this.props.name === 'null'
          ? <h3>Pagina personale di <br/>{this.props.email}</h3>
          : <h3>Pagina personale di <br/>{this.props.name}</h3>
        }     
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

        {this.getModal()}
        
        <Collapse in={this.state.openSalvato}>
          <div className="nuovoAccountStyle" id="collapse-account-salvati">
            {this.getSalvatiForm()}
          </div>
        </Collapse>
        
        <Collapse in={this.state.openNuovo}>
        <div className="nuovoAccountStyle" id="collapse-account-nuovo">
          {this.getAggiungiForm()}
        </div>
        </Collapse>
      </div>
    );
  }
}

export default Profile;
