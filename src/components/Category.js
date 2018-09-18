import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../Category.css';
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
              Category:
              <input type="text" name="category" />
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