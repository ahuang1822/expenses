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

  onClick = (event) => {
    event.preventDefault();
    browserHistory.push('/');    
  }

  render() {
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={(event) => this.props.submitCategory(event)}>
            <label>
              <h5>
                Category:
              </h5>        
              <button className="btn btn-success" value="Food" onClick={(event) => this.props.submitCategory(event)}>Food</button>
              <button className="btn btn-success" value="Transportation" onClick={(event) => this.props.submitCategory(event)}>Transportation</button>
              <button className="btn btn-success" value="Rent" onClick={(event) => this.props.submitCategory(event)}>Rent</button>
              <button className="btn btn-success" value="Utilities" onClick={(event) => this.props.submitCategory(event)}>Utilities</button>
              <button className="btn btn-success" value="Clothing" onClick={(event) => this.props.submitCategory(event)}>Clothing</button>                            
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
    submitCategory(event) {
      event.preventDefault();
      const category = event.target.value || event.target.category.value;
      dispatch(updateCategory(category));
    }
  };
};

export default connect(mapState, mapDispatch)(Category);