import React, { Component } from 'react';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = { year: new Date().getFullYear() };
  }

  render() {
    return (
      <footer>
        <ul className="site-link">
            &copy; {this.state.year} Password Keeper
        </ul>
      </footer>
    );
  }
}

export default Footer;
