import React, { Component } from 'react';

class SelectedFics extends Component {
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
        let path = window.location.pathname;
        let toSearch = path.split('/').pop().trim();
        var fics = [];
        response.map(fic => {
          if (fic.language.toLowerCase() === toSearch || fic.rating.toLowerCase().replace(/ /g, '-') === toSearch || fic.universe.toLowerCase().replace(/ /g, '-') === toSearch) {
            fics.push(fic);
          }
          return fics;
        })
        this.setState({
          data: fics
        })
      })
  }
  componentWillReceiveProps() {
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
        let path = window.location.pathname;
        let toSearch = path.split('/').pop().trim();
        var fics = [];
        response.map(fic => {
          if (fic.language.toLowerCase() === toSearch || fic.rating.toLowerCase().replace(/ /g, '-') === toSearch || fic.universe.toLowerCase().replace(/ /g, '-') === toSearch) {
            fics.push(fic);
          }
          return fics;
        })
        this.setState({
          data: fics
        })
      })
  }
  render() {
    return (
      <div className="col-12 col-lg-10" id="AllFics">
      {
        this.state.data !== null ?
          <div className="card-group">
            {
              this.state.data.map(fic => {
                return (
                  <div className="card" key={fic.title}>
                    <div className="card-body">
                      <h5 className="card-title">{fic.title}</h5>
                      <p className="card-text"><span className="description">Summary: </span>{fic.summary}</p>
                      <p className="card-text"><span className="description">Rating: </span>{fic.rating}</p>
                      <center> Author: {' '}
                      {
                        fic.authors.map((author, i) => {
                          return (
                            <a target="_blank" key={author} href={fic.authorsLinks[i]} className="author-link">{author}</a>
                          );
                        })
                      }
                      </center>
                    </div>
                    <div class="card-footer">
                      <a target="_blank" href={'https://archiveofourown.org/works/' + fic.id} className="btn btn-primary">Link</a>
                    </div>
                  </div>
                );
              })
            }
          </div>
        : <div className="large-loader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
      }
      </div>  
    );
  }
}

export default SelectedFics;