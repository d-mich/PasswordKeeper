import React, { Component } from 'react';
import Styles from './Style.css';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { year: new Date().getFullYear() };
  }

  render() {
    return (
      <footer className="footer-copyright">
        <ul>
            &copy; {this.state.year} Password Keeper
        </ul>
      </footer>
    );
  }
}

export default Footer;
