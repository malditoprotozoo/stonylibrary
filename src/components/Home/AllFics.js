import React, { Component } from 'react';
import ao3Fics from './../../data/ao3';

class AllFics extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    }
  }
  componentWillMount() {
    this.setState({
      data: ao3Fics
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
                      <p className="card-text"><span className="description">Author: </span>
                      {
                        fic.authors.map((author, i) => {
                          return (
                            <a target="_blank" key={author} href={fic.authorsLinks[i]} className="author-link">{author}</a>
                          );
                        })
                      }
                      </p>
                    </div>
                    <div className="card-footer">
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

export default AllFics;