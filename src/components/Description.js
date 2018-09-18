import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../ExpenseEntry.css';
import { updateDescription } from '../store/expense'

class Description extends Component {
  
  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/category')
  }

  render() {
    console.log('DESC: ', this.props.category);
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={(event) => this.props.submitDescription(event)}>
            <label>
              Description:
              <input type="text" name="description" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button onClick={this.goBack}>Back</button>
        </div>        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    category: state.expense.category
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitDescription(event) {
      event.preventDefault();
      dispatch(updateDescription(event.target.description.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Description);