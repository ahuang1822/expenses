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
    const category = this.props.category;
    const description = this.props.description;
    const amount = this.props.amount;
    const spreadsheetId = this.props.spreadsheetId;
    const body = {
      values: [[category, description, amount]]
    };
    window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: body
   }).then(() => {
       browserHistory.push('/');                        
   }).catch((error) => {
     console.log(error);
   })
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
    amount: state.expense.amount,
    spreadsheetId: state.expense.spreadsheetId,
  }
}

export default connect(mapState, null)(Confirmation);

