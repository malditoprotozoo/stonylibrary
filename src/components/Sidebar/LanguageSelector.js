import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ao3Fics from './../../data/ao3';

class LanguageSelector extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    let langs = [];
    ao3Fics.map(fic => {
      if (langs.indexOf(fic.language) === -1) {
        langs.push(fic.language);
      }
      return langs;
    })
    this.setState({
      data: langs
    })
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#LanguageSelector">Language</a>
          </h4>
        </div>
        <div className="panel-collapse collapse" id="LanguageSelector">
          {
            this.state.data !== null ?
              this.state.data.map(item => {
                return (
                  <div className="panel-body" key={item}>
                    <Link to={'/language/'+ item.toLowerCase()}>{item}</Link>
                  </div>
                );
              })
            : <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          }
        </div>
      </div>
    );
  }
}

export default LanguageSelector;