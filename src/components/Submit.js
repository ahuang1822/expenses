import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import '../Submit.css';

class Submit extends Component {
  
  goHome(event) {
    event.preventDefault();
    fetch('/express_backend')
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
      })
      .catch((error) => {
        console.log(error);
      })
    browserHistory.push('/')
  }
  render() {
    return (
      <div className='everything'>
        <h5>
          You need to lower your expenses
        </h5>
        <div className="home-button">
          <button className="btn btn-dark" onClick={this.goHome}>Home</button>
        </div>        
      </div>
    )
  }
}

export default Submit;