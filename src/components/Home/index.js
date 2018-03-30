import React, { Component } from 'react';
import Sidebar from './../Sidebar/';
import AllFics from './AllFics';
import './index.css';

class Home extends Component {
  render() {
    return(
      <div className="container-fluid" id="Home">
        <div className="row">
          <Sidebar/>
          <AllFics/>
        </div>
      </div>
    );
  }
}

export default Home;