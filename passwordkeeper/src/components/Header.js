import React, { Component } from 'react';
import {Navbar, Nav, Form, Dropdown, Button } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { FiUser, FiUserCheck, FiMenu, FiInfo, FiTrash2, FiLogOut } from 'react-icons/fi';
import Delete from './Delete';
import StyleHeader from './StyleHeader.css';


class Header extends Component {

    constructor() {
        super()
    }

    openModal() {
      return <Delete/>
    }

    render() {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Password Keeper</Navbar.Brand>
          <Nav className="mr-auto"></Nav>
          <Form inline>
            {this.props.authenticated
            ? <>
              {this.props.picture === 'null'
                ? <Button variant="outline" href="/profile" size="sm">
                    <FiUserCheck className="fiUser"/>
                  </Button>
                : <Button variant="outline" href="/profile" size="sm">
                    <img className="immagineUtente" src={this.props.picture} alt="UserPicture"/>
                  </Button> 
              }                
              <Dropdown
                variant="dark" >
                <Dropdown.Toggle variant="dark" className="dropdown-split-basic">
                  <FiMenu/>                 
                </Dropdown.Toggle>
                  <DropdownMenu className="dropdownMenu">
                    <Dropdown.Item className="dropdownHeader" href="/profile">
                      <FiUser className="iconaAccesso"/>
                      {this.props.name}
                    </Dropdown.Item>
                    <Dropdown.Divider className="dropdownDivider"/>
                    <Dropdown.Item className="dropdownHeader" href="/info">
                      <FiInfo className="iconeDropdown"/>
                      Info
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdownHeader" href="/cancellazione">
                      <FiTrash2 className="iconeDropdown"/>
                      Cancella Account
                    </Dropdown.Item>
                    <Dropdown.Item className="dropdownHeader" href="/logout">
                      <FiLogOut className="iconaUscita"/>
                      Esci
                    </Dropdown.Item>                      
                  </DropdownMenu>                  
              </Dropdown>
              </>
            : <Button variant="outline" href="/login" size="sm" onClick={this.openModal}>
                <FiUser className="fiUser"/>
              </Button>
            }
            </Form>
          </Navbar>
      );
    }
}

export default Header;