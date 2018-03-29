import React, { Component } from 'react';
import Logo from './../../assets/img/stony-logo.svg';
import './index.css';

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand title" href="home">
          <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" id="main-logo" />
          Stony Library
        </a>
      </nav>
    );
  }
}

export default Navbar;