import React, { Component } from 'react';
import LanguageSelector from './LanguageSelector';
import UniverseSelector from './UniverseSelector';
import RatingSelector from './RatingSelector';
import './index.css';
// import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return(
      <div className="col-12 col-lg-2" id="Sidebar">
        <div className="panel-group">
          <LanguageSelector/>
          <RatingSelector/>
          <UniverseSelector/>
        </div>
      </div>
    );
  }
}

export default Sidebar;