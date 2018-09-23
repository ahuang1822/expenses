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

  render() {
    console.log('CATEGORY: ', this.props.category)
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={(event) => this.props.submitCategory(event)}>
            <label>
              <h5>
                Category:
              </h5>             
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
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitCategory(event) {
      event.preventDefault();
      dispatch(updateCategory(event.target.category.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Category);