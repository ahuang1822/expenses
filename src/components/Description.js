import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../ExpenseEntry.css';
import { updateDescription } from '../store/expense'

class Description extends Component {
  
  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/category');
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.submitDescription(event.target.description.value);    
  }

  render() {
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.onSubmit}>
            <label>
              <h5>
                Description:
              </h5>
              <input className="form-control" type="text" name="description" defaultValue={this.props.description} />
            </label>
            <input className="btn btn-success" type="submit" value="Submit" />
          </form>
        </div>
        <div className="home-button">
          <button className="btn btn-dark" onClick={this.goBack}>Back</button>
        </div>        
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    category: state.expense.category,
    description: state.expense.description
  };
};

const mapDispatch = (dispatch) => {
  return {
    submitDescription(description) {
      dispatch(updateDescription(description));
    }
  };
}

export default connect(mapState, mapDispatch)(Description);