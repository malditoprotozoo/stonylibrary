import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Err404 from './components/404';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route component={Err404} />
        </Switch>
      </div>
    );
  }
}

export default App;
