import React, { Component } from 'react';
import Logo from './../../assets/img/stony-logo.svg';
import { Link } from 'react-router-dom';
import './index.css';

class Navbar extends Component {
  render() {
    return(
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand title" to="/">
          <img src={Logo} width="30" height="30" className="d-inline-block align-top" alt="" id="main-logo" />
          Stony Library
        </Link>
      </nav>
    );
  }
}

export default Navbar;