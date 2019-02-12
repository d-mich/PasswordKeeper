import React, { Component } from 'react';
import {Navbar, Nav, Form, FormControl, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
import UserLogin from '../user-login.png';
import UserLogout from '../user-logout.png';

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
      console.log('LOGGED: '+this.props.authenticated);
        return (
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Password Keeper</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline> 
            <Button variant="outline" href="/login" size="sm">
              <img src={UserLogin} alt="Login" width="30" height="30"/>
            </Button>
            {this.props.authenticated
            /* SE AUTENTICATO RITORNA: */
            ? <Button variant="outline" href="/logout" size="sm">
            <img src={UserLogout} alt="Logout" width="25" height="25"/>
            </Button>        
            /* ALTRIMENTI RITORNA: */
            : null
            }
            </Form>
          </Navbar>
        );
      }
}

export default Header;