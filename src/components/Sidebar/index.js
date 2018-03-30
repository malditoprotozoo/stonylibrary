import React, { Component } from 'react';
import LanguageSelector from './LanguageSelector';
import UniverseSelector from './UniverseSelector';
import './index.css';
// import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      fics: null,
      languages: null,
      universes: null
    }
  }
  componentWillMount() {
    fetch('/data/ao3.json', {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(response => {
        let fics = []
        response.map(fic => {
          fics.push(fic);
          return fic;
        })
        this.setState({
          fics: fics
        })
      })
  }
  render() {
    return(
      <div className="col-12 col-lg-2" id="Sidebar">
        {
          this.state.fics !== null ?
            <div className="panel-group">
              <LanguageSelector/>
              <UniverseSelector/>
            </div>
          : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
      }
      </div>
    );
  }
}

export default Sidebar;