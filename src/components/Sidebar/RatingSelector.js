import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ao3Fics from './../../data/ao3';

class RatingSelector extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    let ratings = [];
    ao3Fics.map(fic => {
      if (ratings.indexOf(fic.rating) === -1) {
        ratings.push(fic.rating);
      }
      return ratings;
    })
    this.setState({
      data: ratings
    })
  }
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title">
            <a data-toggle="collapse" href="#RatingSelector">Rating</a>
          </h4>
        </div>
        <div className="panel-collapse collapse" id="RatingSelector">
          {
            this.state.data !== null ?
              this.state.data.map(item => {
                return (
                  <div className="panel-body" key={item}>
                    <Link to={'/rating/'+ item.toLowerCase().replace(/ /g, '-')}>{item}</Link>
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

export default RatingSelector;