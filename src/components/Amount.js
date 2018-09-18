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
    console.log('PROPS: ', this.props);
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={(event) => this.props.submitAmount(event)}>
            <label>
              Amount:
              <input type="text" name="amount" />
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
    category: state.expense.category,
    description: state.expense.description
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