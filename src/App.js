import React, { Component } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import logo from './logo.svg';
import './App.css';
import './AddExpense'
import AddExpense from './AddExpense';

const Page = ({ title }) => (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>{title}</h2>
      </div>
      <p className="App-intro">        
        Welcome to the Expense Tracker
      </p>
      <p>
        <Link to="/add">Add Expense!</Link>
      </p>
    </div>
);

const Home = (props) => (
  <Page title="Home"/>
);

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/add" component={AddExpense}/>
      </Router>
    );
  }
}

export default App;
