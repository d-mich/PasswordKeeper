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

    /* deleteUserData(idUser){
      fire.database().ref('users/'+idUser).remove();
    } */

    componentWillMount() {
    }
  
    render() {
      const id = localStorage.getItem('userID')
      return (
          <div>
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
                <Button variant="danger" onClick={this.handleClose}>
                    Elimina
                </Button>
                </Modal.Footer>
            </Modal>
          </div>          
      );
    }
  }

export default Delete;