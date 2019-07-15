import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { resetInputFields } from 'store/expense';

const Confirmation = () => {
  const goHome = event => {
    event.preventDefault();
    browserHistory.push('/');
  };

  const goBack = event => {
    event.preventDefault();
    browserHistory.push('/description');
  };

  const onSubmit = event => {
    event.preventDefault();
    const description = this.props.description;
    const amount = '$' + this.props.amount;
    const spreadsheetId = this.props.spreadsheetId;
    const body = {
      values: [[description, amount]],
    };
    window.gapi.client.sheets.spreadsheets.values
      .append({
        spreadsheetId: spreadsheetId,
        range: 'Sheet1',
        valueInputOption: 'USER_ENTERED',
        resource: body,
      })
      .then(() => {
        this.props.clearInputFields();
        browserHistory.push('/');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={styles.confirmationContainer}>
      <div className={styles.input}>
        <form onSubmit={onSubmit}>
          <label className={styles.formMessage}>
            <h5>
              Please confirm your expense of ${this.props.amount} on{' '}
              {this.props.description}?
            </h5>
          </label>
          <input
            className={`${styles.btn} btn-success`}
            type="submit"
            value="Yes"
          />
        </form>
      </div>
      <div className="home-button">
        <button className={`${styles.btn} btn-danger`} onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    description: state.expense.description,
    amount: state.expense.amount,
    spreadsheetId: state.expense.spreadsheetId,
  };
};

const mapDispatch = dispatch => {
  return {
    clearInputFields() {
      dispatch(resetInputFields());
    },
  };
};

export default connect(
  mapState,
  mapDispatch,
)(Confirmation);
