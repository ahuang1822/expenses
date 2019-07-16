import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import money from '../../assets/money-bag.png';
import { updateSpreadsheetId } from 'store/expense';
import { init, getSpreadsheetId } from 'utils/auth';
import styles from './styles.module.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  onClick = event => {
    event.preventDefault();
    browserHistory.push('/description');
  };

  componentDidMount = async () => {
    await init();
    const id = await getSpreadsheetId();
    this.props.setSpreadsheetId(id);
  };

  render() {
    return (
      <div className={styles.app}>
        <div className={styles.header}>
          <img src={money} className={styles.moneyBag} alt="logo" />
          <h2 id="welcome-message">Welcome</h2>
        </div>
        <p className="App-intro">Keep Track of Your Money!</p>
        <pre id="content" />
        <p id="loading">Loading...</p>
        <button
          id="authorize_button"
          className={`${styles.btn} btn-success`}
          style={{ display: 'none' }}
        >
          Log In With Google
        </button>
        <button
          id="signout_button"
          className={`${styles.btn} btn-failure`}
          style={{ display: 'none' }}
        >
          Sign Out
        </button>
        <button
          id="add_expense_button"
          className={`${styles.btn} btn-success`}
          style={{ display: 'none' }}
          onClick={this.onClick}
        >
          Add An Expense!
        </button>
        <a id="spreadsheet-link">Check out your spreadsheet here!</a>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    setSpreadsheetId(spreadsheetId) {
      dispatch(updateSpreadsheetId(spreadsheetId));
    },
  };
};
const mapState = state => {
  return {
    spreadsheetId: state.expense.spreadsheetId,
  };
};

export default connect(
  mapState,
  mapDispatch,
)(Home);
