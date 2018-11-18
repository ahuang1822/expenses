import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../ExpenseEntry.css';
import { updateCategory } from '../store/expense'

class Category extends Component {
  
  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/');    
  }

  onSubmit = (event) => {
    event.preventDefault();
    const category = event.target.value || event.target.category.value;
    this.props.submitCategory(category);    
  }

  render() {
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.onSubmit}>
            <label>
              <h5>
                Category:
              </h5>        
              <button className="btn btn-warning" value="Food" onClick={this.onSubmit}>Food</button>
              <button className="btn btn-warning" value="Transportation" onClick={this.onSubmit}>Transportation</button>
              <input className="form-control" type="text" name="category" defaultValue={this.props.category} />
            </label>
            <input className="btn btn-success" type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button className="btn btn-dark" onClick={this.goHome}>Home</button>
        </div>        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    category: state.expense.category,
    spreadsheetId: state.expense.spreadsheetId
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitCategory(category) {
      dispatch(updateCategory(category));
    }
  };
};

export default connect(mapState, mapDispatch)(Category);