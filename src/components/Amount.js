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
    browserHistory.push('/description');
  }

  onSubmit = (event) => {
    event.preventDefault();
    const amount = event.target.amount.value;
    if (!amount) {
      alert('Please enter an amount');
    } else {
      this.props.submitAmount(event.target.amount.value);    
      browserHistory.push('/confirmation'); 
    };    
  }

  render() {
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.onSubmit}>
            <label>
                <h5>
                Amount:
                </h5>              
              <input 
                className="form-control" t
                ype="number" 
                min="0.00" 
                max="10000.00" 
                step="0.01"  
                name="amount"
                defaultValue={this.props.amount} />
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
    submitAmount(amount) {
      dispatch(updateAmount(amount))
    }
  };
};

export default connect(mapState, mapDispatch)(Amount);


