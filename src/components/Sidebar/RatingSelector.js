import React, { Component } from 'react';

class RatingSelector extends Component {
  constructor() {
    super();
    this.state = {
      data: null
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
      let rating = [];
      response.map(fic => {
        if (rating.indexOf(fic.rating) === -1) {
          rating.push(fic.rating);
        }
        return rating;
      })
      this.setState({
        data: rating
      })
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
                    {item}
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