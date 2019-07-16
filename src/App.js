import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Description from './components/Description';
import Amount from './components/Amount';
import Confirmation from './components/Confirmation';
import Maintenance from './components/Maintenance';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="*" component={Maintenance} />
      </Router>
    );
  }
}

export default App;
