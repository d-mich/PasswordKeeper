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

    deleteUserData = () => {
      //cancellazione dati firebase
      fire.database().ref('users/'+this.props.userID).remove();
      //logout
      fire.auth().signOut()
      //chiusura modal
      this.handleClose()
      //cancellazione local storage
      this.deleteStorage()
    }

    deleteStorage() {
      let keysToRemove = ["userID", "userName", "userEmail", "userPicture"];
      keysToRemove.forEach(k => localStorage.removeItem(k))
    }
    
    render() {
      
      /* if (this.props.authenticated === false) {
        return <Redirect to="/"/>
      } */

      return (
          <div className="deleteComponents">
          <br />
          <p className="txtdelete"><h3>Sei davvero sicuro di voler cancellare i dati relativi al tuo account?</h3>
          <br />Le modifiche effettuate e gli account aggiunti andranno persi,<br/>
             per la disattivazione dell'account contattare gli sviluppatori nella pagina info<br /><br /></p>
            <Button variant="danger" className="deleteButton" onClick={this.handleShow}>
            Cancellazione Dati Account
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose} >
                <Modal.Header closeButton>
                <Modal.Title>Cancellazione Dati Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Dati account</h5>
                    <ul>
                        <li>UserID: {this.props.userID}</li>
                        <li>Email: {this.props.email}</li>
                        {this.props.name === 'null'
                          ? null
                          : <li>Nome: {this.props.name}</li>
                        }
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
            <br/>
          </div>          
      );
    }
  }

export default Delete;