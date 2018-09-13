import React, { Component } from 'react';
import './AddExpense.css';

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.setState = { expenses: [] };
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cateogy =  event.target.category.value;
    const description =  event.target.description.value;
    const amount = event.target.amount.value; 
  }

  render() {
    return (
      <div className="input">
        <form onSubmit= {this.handleSubmit}>
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
    );
  }
}

export default AddExpense;