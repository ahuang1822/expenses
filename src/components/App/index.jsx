import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Home from '../Home';
import Description from '../Description';
import Amount from '../Amount';
import Confirmation from '../Confirmation';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home} />
        <Route path="/description" component={Description} />
        <Route path="/amount" component={Amount} />
        <Route path="/confirmation" component={Confirmation} />
      </Router>
    );
  }
}

export default App;
