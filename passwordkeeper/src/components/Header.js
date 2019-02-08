import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../config/Fire';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';

class Header extends Component {

    constructor(props) {
        super(props)
        this.closePopover = this.closePopover.bind(this)
        this.state = {
          popoverOpen: false
        }
      }
    
    closePopover() {
      this.setState({ popoverOpen: false })
    }

    render() {
        return (
          <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/home">Password Keeper</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/info">Info</Nav.Link>
            </Nav>
            <Form inline>              
              {this.props.authenticated
              /* SE AUTENTICATO RITORNA: */
              ? (<FormControl type="text" placeholder="Search" className="mr-sm-2" />,
                <Button variant="outline-light" href="/logout">Logout</Button>)
              /* ALTRIMENTI RITORNA: */
              : <Button variant="outline-light" href="/login">Login</Button>
              }
              &nbsp;
              <Button variant="outline-light">Impostazioni</Button>
            </Form>
          </Navbar>
          </div>
        );
      }
}

export default Header;