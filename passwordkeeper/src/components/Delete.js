import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { fire } from '../config/Fire';

class Delete extends Component {
    constructor(props) {
      super(props);  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    deleteUserData(){
      fire.database().ref('users/'+localStorage.getItem('userID')).remove();
      
      //logout
      fire.auth().signOut()
    }

    componentWillMount() {
    }
  
    render() {
      const id = localStorage.getItem('userID')
      return (
          <div className="deleteComponents">
            <Button variant="danger" onClick={this.handleShow}>
              Cancella Account Definitivamente
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Cancellazione Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Dati account</h5>
                    <ul>
                        <li>UserID: {id}</li>
                        <li>Email: {this.props.email}</li>
                        <li>Nome: {this.props.name}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="success" onClick={this.handleClose}>
                    Annulla
                </Button>
                <Button variant="danger" onClick={this.deleteUserData && this.handleClose}>
                    Elimina
                </Button>
                </Modal.Footer>
            </Modal>
          </div>          
      );
    }
  }

export default Delete;