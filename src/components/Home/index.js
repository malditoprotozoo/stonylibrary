import React, { Component } from 'react';
import Sidebar from './../Sidebar/';

class Home extends Component {
  render() {
    return(
      <div className="container-fluid" id="Home">
        <div className="row">
          <Sidebar/>
        </div>
      </div>
    );
  }
}

export default Home;