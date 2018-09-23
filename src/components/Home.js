import React from 'react';
import { Link } from 'react-router';
import money from '../money-bag.png';

const Home = () => (
  <div className="App">
    <div className="App-header">
      <img src={money} className="App-logo" alt="logo" />
      <h2>Home</h2>
    </div>
    <p className="App-intro">        
      Welcome to the Expense Tracker
    </p>
    <p>
      <Link to="/category">Add Expense!</Link>
    </p>
  </div>
);

export default Home;