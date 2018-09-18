import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import './App.css';
import Category from './components/Category';
import Home from './components/Home';
import Description from './components/Description';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/category" component={Category}/>
        <Route path="/description" component={Description}/>
      </Router>
    );
  }
}

export default App;
