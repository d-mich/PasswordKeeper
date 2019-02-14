import React, { Component } from 'react';
import {Navbar, Nav, Form, Dropdown, Button, ButtonGroup, DropdownButton } from 'react-bootstrap';
import UserLogin from '../user-login.png';
import UserLogout from '../user-logout.png';
import bootstrap from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import 'font-awesome/css/font-awesome.min.css';

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
            <Nav className="mr-auto"></Nav>
            <Form inline>             
              {this.props.authenticated
              ? <Button variant="outline" href="/profile" size="sm">
                  <img src={this.props.picture} alt="UserPicture" width="30" height="30" />
                </Button>
              : <Button variant="outline" href="/login" size="sm">
                  <img src={UserLogin} alt="Login" width="30" height="30" />
                </Button>
              }  
              {this.props.authenticated
              /* SE AUTENTICATO RITORNA: */
              ? <Dropdown
                  variant="dark" >
                  <Dropdown.Toggle split variant="dark" className="dropdown-split-basic">
                  {/* <i className="fa fa-cog"></i> */}
                  </Dropdown.Toggle>
                    <DropdownMenu className="dropdownMenu">
                      <Dropdown.Item className="dropdownHeader" href="/impostazioni">
                        <i className="fa fa-cog"></i>
                        Impostazioni</Dropdown.Item>
                      <Dropdown.Item className="dropdownHeader" href="/logout">
                        <i className="fa fa-user"></i>
                        Logout</Dropdown.Item>
                    </DropdownMenu>                  
                </Dropdown>
              /* ALTRIMENTI RITORNA: */
              : null
              }
              </Form>
            </Navbar>
        );
      }
}

export default Header;