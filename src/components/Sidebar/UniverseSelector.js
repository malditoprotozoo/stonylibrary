import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ao3Fics from './../../data/ao3';

class UniverseSelector extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    let unis = [];
    ao3Fics.map(fic => {
      if (unis.indexOf(fic.universe) === -1) {
        unis.push(fic.universe);
      }
      return unis;
    })
    this.setState({
      data: unis
    })
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#UniverseSelector">Universe</a>
          </h4>
        </div>
        <div className="panel-collapse collapse" id="UniverseSelector">
          {
            this.state.data !== null ?
              this.state.data.map(item => {
                return (
                  <div className="panel-body" key={item}>
                    <Link to={'/universe/'+ item.toLowerCase().replace(/ /g, '-')}>{item}</Link>
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

export default UniverseSelector;