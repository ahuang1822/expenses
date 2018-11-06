import React, { Component } from 'react';
import { connect } from 'react-redux';
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

  getSpreadsheetId(listOfEmails, userEmail) {
    for (let i = 0; i < listOfEmails.length; i++) {
      if (listOfEmails[i][0] === userEmail) {
        return listOfEmails[i][1];
      }
    }
    return false;
  }

  onClick = (event) => {
    event.preventDefault();
    let userEmail = 
      window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Sheet1'
    }).then((response) => {
      const listOfEmails = response.result.values;
      console.log('listofemails: ', listOfEmails);
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
  };

  componentDidMount() {
    var CLIENT_ID = config.CLIENT_ID;
    var API_KEY = config.API_KEY;

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    var authorizeButton = document.getElementById('authorize_button');
    var signoutButton = document.getElementById('signout_button');

    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
      window.gapi.load('client:auth2', initClient);
    }

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(function () {
        // Listen for sign-in state changes.
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
      });
    }

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
      if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
      } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
      }
    }

    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
      window.gapi.auth2.getAuthInstance().signIn();
    }

    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
      window.gapi.auth2.getAuthInstance().signOut();
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
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
        <button className="btn btn-success" onClick={this.onClick}>Add An Expense!</button>
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

export default connect(null, mapDispatch)(Home);