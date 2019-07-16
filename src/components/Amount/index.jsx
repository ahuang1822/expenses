import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { updateAmount } from 'store/expense';

class Amount extends Component {
  goHome = event => {
    event.preventDefault();
    browserHistory.push('/');
  };

  goBack = event => {
    event.preventDefault();
    browserHistory.push('/description');
  };

  onSubmit = event => {
    event.preventDefault();
    const amount = event.target.amount.value;
    if (!amount) {
      alert('Please enter an amount');
    } else {
      this.props.submitAmount(event.target.amount.value);
      browserHistory.push('/confirmation');
    }
  };

  render() {
    return (
      <div className={styles.amountContainer}>
        <div className={styles.input}>
          <form onSubmit={this.onSubmit}>
            <label>
              <h5 className={styles.heading}>Amount:</h5>
              <input
                className={`${styles.input} form-control`}
                type="number"
                min="0.00"
                max="10000.00"
                step="0.01"
                name="amount"
                defaultValue={this.props.amount}
              />
            </label>
            <input
              className={`${styles.btn} btn-success`}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        <div className="home-button">
          <button className={`${styles.btn} btn-dark`} onClick={this.goBack}>
            Back
          </button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    description: state.expense.description,
    amount: state.expense.amount,
  };
};

const mapDispatch = dispatch => {
  return {
    submitAmount(amount) {
      dispatch(updateAmount(amount));
    },
  };
};

export default connect(
  mapState,
  mapDispatch,
)(Amount);
