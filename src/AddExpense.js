import React, { Component } from 'react';
import './AddExpense.css';

class AddExpense extends Component {
  render() {
    return (
      <div className="input">
        <form>
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