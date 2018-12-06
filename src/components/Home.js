import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import money from '../money-bag.png';
import config from '../config'
import { updateSpreadsheetId } from '../store/expense';
import { showSpreadsheetId } from '../Utils/functions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  };

  

  componentDidMount() {
    const CLIENT_ID = config.CLIENT_ID;
    const API_KEY = config.API_KEY;
    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    const authorizeButton = document.getElementById('authorize_button');
    const signoutButton = document.getElementById('signout_button');
    const addExpenseButton = document.getElementById('add_expense_button');
    const loadingText = document.getElementById('loading');
    const spreadsheetLink = document.getElementById('spreadsheet-link');

    const handleClientLoad = () => {
      window.gapi.load('client:auth2', initClient);      
    }

    const initClient = () => {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      });
    }

    const updateSigninStatus = (isSignedIn) => {
      if (isSignedIn) {
        showSpreadsheetId(spreadsheetLink);
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        addExpenseButton.style.display = 'block';               
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        addExpenseButton.style.display = 'none';
        spreadsheetLink.style.display = 'none';
      };
      loadingText.style.display = 'none';
    };

    const handleAuthClick = () => {
      window.gapi.auth2.getAuthInstance().signIn();      
    }

    const handleSignoutClick = () => {
      window.gapi.auth2.getAuthInstance().signOut();
    }

    handleClientLoad();    
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={money} className="App-logo" alt="logo" />
          <h2>Welcome</h2>
        </div>
        <p className="App-intro">
          Keep Track of Your Money!
        </p>
        <pre id="content"></pre>
        <p id="loading">Loading...</p>
        <button id="authorize_button" className="btn btn-success" style={{display: 'none'}}>Log In With Google</button>
        <button id="signout_button" className="btn btn-failure" style={{display: 'none'}}>Sign Out</button>
        <button id="add_expense_button" className="btn btn-success" style={{display: 'none'}} onClick={this.onClick}>Add An Expense!</button>        
        <a id='spreadsheet-link'>Check out your spreadsheet here!</a>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    setSpreadsheetId(spreadsheetId) {
      dispatch(updateSpreadsheetId(spreadsheetId));
    }
  };
};
const mapState = (state) => {
  return {
    spreadsheetId: state.expense.spreadsheetId
  }
}

export default connect(mapState, mapDispatch)(Home);

