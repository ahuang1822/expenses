import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import './AddExpense.css';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.setState = { expenses: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const category = event.target.category.value;
    const description = event.target.description.value;
    const amount = event.target.amount.value;
  }

  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/')
  }

  render() {
    return (
      <div>
        <div className="input">
          <form onSubmit={this.handleSubmit}>
            <label>
              Category:
              <input type="text" name="category" />
            </label>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
            <label>
              Amount:
              <input type="text" name="amount" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button onClick={this.goHome}>Home</button>
        </div>        
      </div>
    );
  }
}

export default AddExpense;