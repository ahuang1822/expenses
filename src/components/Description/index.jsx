import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import styles from './styles.module.scss';
import { updateDescription } from 'store/expense';

class Description extends Component {
  goBack = event => {
    event.preventDefault();
    browserHistory.push('/');
  };

  onSubmit = event => {
    event.preventDefault();
    const description = event.target.description.value;
    if (!description) {
      alert('Please enter a description');
    } else {
      this.props.submitDescription(description);
      browserHistory.push('/amount');
    }
  };

  render() {
    return (
      <div className={styles.descriptionContainer}>
        <div className={styles.input}>
          <form onSubmit={this.onSubmit}>
            <label>
              <h5>Description:</h5>
              <input
                className={`${styles.input} form-control`}
                type="text"
                name="description"
                defaultValue={this.props.description}
              />
            </label>
            <input
              className={`${styles.intput} ${styles.btn} btn-success`}
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
  };
};

const mapDispatch = dispatch => {
  return {
    submitDescription(description) {
      dispatch(updateDescription(description));
    },
  };
};

export default connect(
  mapState,
  mapDispatch,
)(Description);
