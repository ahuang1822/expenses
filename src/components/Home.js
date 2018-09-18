import React from 'react';
import { Link } from 'react-router';
import logo from '../logo.svg'

const Home = () => (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
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