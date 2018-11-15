import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import '../ExpenseEntry.css';
import { updateAmount } from '../store/expense'

class Amount extends Component {
  
  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/');
  }

  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/description')
  }

  render() {
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={(event) => this.props.submitAmount(event)}>
            <label>
                <h5>
                Amount:
                </h5>              
              <input className="form-control" type="text" name="amount" defaultValue={this.props.amount} />
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
    description: state.expense.description,
    amount: state.expense.amount
  }
}

const mapDispatch = (dispatch) => {
  return {
    submitAmount(event) {
      event.preventDefault();
      dispatch(updateAmount(event.target.amount.value))
    }
  }
}

export default connect(mapState, mapDispatch)(Amount);


