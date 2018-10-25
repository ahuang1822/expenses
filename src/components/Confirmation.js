import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';
import '../Confirmation.css';

class Confirmation extends Component {
  
  goHome = (event) => {
    event.preventDefault();
    browserHistory.push('/');
  }

  goBack = (event) => {
    event.preventDefault();
    browserHistory.push('/description')
  }

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/googlesheets')
    .then((response) => {
      console.log(response);
    })

    // browserHistory.push('/submit');

    // const GOOGLE_SHEETS_API_PREFIX = 
    // 'https://sheets.googleapis.com/v4/spreadsheets/';
    // const spreadsheetId = config.spreadsheetId;
    // const range = 'Sheet1!A2:C2';
    // const valueInputOption = 'USER_ENTERED'
    // const category = this.props.category
    // const description = this.props.description
    // const amount = this.props.amount
    
    // axios.post(
    //   GOOGLE_SHEETS_API_PREFIX + 
    //   spreadsheetId +
    //   '/values/' + 
    //   range + '?' +
    //   'valueInputOption=' +
    //   valueInputOption + '?' +
    //   'key=' + 
    //   config.API_KEY, {
    //     "range": range,
    //     "values": [
    //       [category, description, amount],
    //     ]
    //   }
    // )
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.log(error);
    // })
  }

  render() {
    console.log('PROPS: ', this.props);
    return (
      <div className="everything">
        <div className="input">
          <form onSubmit={this.onSubmit}>
            <label>
              <h5>
              Did you really just spend {this.props.amount} on {this.props.description} ({this.props.category})?
              </h5>
            </label>
            <input className="btn btn-success" type="submit" value="Yes" />
          </form>
        </div>
        <div className="home-button">
          <button className="btn btn-danger" onClick={this.goBack}>Back</button>
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

export default connect(mapState, null)(Confirmation);

