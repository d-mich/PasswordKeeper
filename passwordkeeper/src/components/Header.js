import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fire } from '../config/Fire';
import {Navbar, Nav, Form, FormControl, Button, Dropdown, ButtonGroup } from 'react-bootstrap';
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
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Password Keeper</Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <Form inline>              
              {this.props.authenticated
              /* SE AUTENTICATO RITORNA: */
              ? <Button variant="outline-light" href="/logout" size="sm">Logout</Button>
              /* ALTRIMENTI RITORNA: */
              : <Button variant="outline-light" href="/login" size="sm">Login
              </Button>
              }
              &nbsp;
              <Dropdown as={ButtonGroup}>
              <Button variant="outline-light" size="sm">Split Button</Button>
              <Dropdown.Toggle split variant="outline-light" size="sm"/>
              <Dropdown.Menu>
                <Dropdown.Item hred="#/action-1">Logout</Dropdown.Item>
                <Dropdown.Item hred="#/action-2">Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>;
            </Form>
          </Navbar>
        );
      }
}

export default Header;