import React, { Component } from 'react';
import './index.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer bg-light" id="Footer">
        <div className="container">
          <span>Developed by Tori Rodríguez with  <i class="far fa-heart"></i></span>
        </div>
      </footer>
    );
  }
}

export default Footer;