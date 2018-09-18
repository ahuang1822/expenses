import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../Submit.css';

class Submit extends Component {
  
  goHome(event) {
    event.preventDefault();
    browserHistory.push('/')
  }
  render() {
    return (
      <div className='everything'>
        <h3>
          You need to lower your expenses
        </h3>
        <div className="home-button">
          <button onClick={this.goHome}>Home</button>
        </div>        
      </div>
    )
  }
}

export default Submit;