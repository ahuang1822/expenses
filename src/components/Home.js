import React, { Component } from 'react';
import money from '../money-bag.png';
import { browserHistory } from 'react-router';

class Home extends Component {

  onClick = (event) => {
    event.preventDefault();
    browserHistory.push('/category');
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={money} className="App-logo" alt="logo" />
          <h2>Home</h2>
        </div>
        <p className="App-intro">        
          Welcome to the Expense Tracker
        </p>
        <p>
          <button className="btn btn-success" onClick={this.onClick}>Add Expense!</button>
        </p>
      </div>
    )  
  }
}

export default Home;