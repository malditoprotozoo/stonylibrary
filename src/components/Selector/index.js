import React, { Component } from 'react';
import Sidebar from './../Sidebar/';
import SelectedFics from './SelectedFics';

class Selector extends Component {
  render() {
    return(
      <div className="container-fluid" id="Home">
        <div className="row">
          <Sidebar/>
          <SelectedFics/>
        </div>
      </div>
    );
  }
}

export default Selector;