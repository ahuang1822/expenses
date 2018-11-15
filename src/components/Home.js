import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import money from '../money-bag.png';
import config from '../config'
import { updateSpreadsheetId } from '../store/expense';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  };

  getSpreadsheetId = (listOfEmails, userEmail) => {
    for (let email of listOfEmails) {
      if (email[0] === userEmail) {     
        return email[1];
      };      
    };
    return false;
  };

  onClick = (event) => {
    event.preventDefault();
    let userEmail = 
      window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Sheet1'
    }).then((response) => {
      const listOfEmails = response.result.values;
      let spreadsheetId = this.getSpreadsheetId(listOfEmails, userEmail);
      if (spreadsheetId) {
        this.props.setSpreadsheetId(spreadsheetId);
      } else {
        window.gapi.client.sheets.spreadsheets.create({
          properties: {
            title: 'Where did my money go?'
          }
        }).then((response) => {
          spreadsheetId = response.result.spreadsheetId;
          const values = [
            [userEmail, spreadsheetId]
          ];
          const body = {
            values: values
          };
          window.gapi.client.sheets.spreadsheets.values.append({
             spreadsheetId: config.spreadsheetId,
             range: 'Sheet1',
             valueInputOption: 'USER_ENTERED',
             resource: body
          }).then(() => {
              this.props.setSpreadsheetId(spreadsheetId);                        
          });
        });
      };   
    });         
    browserHistory.push('/category');
  };

  componentDidMount() {
    const CLIENT_ID = config.CLIENT_ID;
    const API_KEY = config.API_KEY;
    const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    const authorizeButton = document.getElementById('authorize_button');
    const signoutButton = document.getElementById('signout_button');
    const addExpenseButton = document.getElementById('add_expense_button');

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
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        addExpenseButton.style.display = 'block';
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        addExpenseButton.style.display = 'none';
      };
    };

    const handleAuthClick = (event) => {
      window.gapi.auth2.getAuthInstance().signIn();
    }

    const handleSignoutClick = (event) => {
      window.gapi.auth2.getAuthInstance().signOut();
    }

    handleClientLoad();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={money} className="App-logo" alt="logo" />
          <h2>Home</h2>
        </div>
        <p className="App-intro">
          Keep Track of Your Money!
        </p>
        <pre id="content"></pre>
        <button id="authorize_button" className="btn btn-success" style={{display: 'none'}}>Log In With Google</button>
        <button id="signout_button" className="btn btn-failure" style={{display: 'none'}}>Sign Out</button>
        <button id="add_expense_button" className="btn btn-success" onClick={this.onClick}>Add An Expense!</button>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    setSpreadsheetId(spreadsheetId) {
      dispatch(updateSpreadsheetId(spreadsheetId));
    }
  }
}
const mapState = (state) => {
  return {
    spreadsheetId: state.expense.spreadsheetId
  }
}

export default connect(null, mapDispatch)(Home);