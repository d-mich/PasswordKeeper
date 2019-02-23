import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { fire } from '../config/Fire';

class Delete extends Component {
    constructor() {
      super();  
      this.state = {
        show: false
      }
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    deleteUserData = (props) => {
      //cancellazione dati firebase
      fire.database().ref('users/'+this.props.userID).remove();
      //logout
      fire.auth().signOut()
      //chiusura modal
      this.handleClose()
      //cancellazione local storage
      this.deleteStorage()
      //redirect
      this.props.history.push('/home')
    }

    deleteStorage() {
      let keysToRemove = ["userID", "userName", "userEmail", "userPicture"];
      keysToRemove.forEach(k => localStorage.removeItem(k))
    }
    
    render() {
      return (
          <div className="deleteComponents">
          <br />
          <p className="txtdelete"><h3>Sei davvero sicuro di voler cancellare il tuo account?</h3>
          <br />Le modifiche effettuate e gli account aggiunti andranno persi <br /><br /></p>
            <Button variant="danger" onClick={this.handleShow}>
              <h5>Cancella Account Definitivamente</h5>
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Cancellazione Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Dati account</h5>
                    <ul>
                        <li>UserID: {this.props.userID}</li>
                        <li>Email: {this.props.email}</li>
                        <li>Nome: {this.props.name}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={this.handleClose}>
                    Annulla
                </Button>
                <Button variant="danger" onClick={this.deleteUserData}>
                    Elimina
                </Button>
                </Modal.Footer>
            </Modal>
          </div>          
      );
    }
  }

export default Delete;