import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import Home from './components/Home';
import Description from './components/Description';
import Amount from './components/Amount';
import Confirmation from './components/Confirmation';
import Submit from './components/Submit';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/description" component={Description}/>
        <Route path="/amount" component={Amount}/>
        <Route path="/confirmation" component={Confirmation}/>
        <Route path="/submit" component={Submit}/>
      </Router>
    );
  }
}

export default App;
