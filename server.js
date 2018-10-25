const express = require('express');
const cors = require('cors');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const sheets = google.sheets('v4');
const app = express();
const port = process.env.PORT || 5000;
const config = require('./src/config');

app.listen(port, () => console.log(`Listening on port ${port}`));

const corsOptions = {
  origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.post('/googlesheets', (req, res) => {
  console.log('spreadsheetID: ', config.spreadsheetId);
  const GOOGLE_SHEET_ID = config.spreadsheetId;
  const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
  const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    console.log('file read')
    // Authorize a client with credentials, then call the Google Sheets API.
    authorize(JSON.parse(content), addExpense);
  });

  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * @param {Object} credentials The authorization client credentials.
   * @param {function} callback The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }

  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getNewToken(oAuth2Client, callback) {
    console.log("GETTING NEW TOKEN");
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }

  function addExpense(oAuth2Client) {
    const request = {
      spreadsheetId: '1_ia6uzIWp_3sE8lfxfK9cc0n9VeokISWDiCLWQJTBjE',
      range: 'Sheet1!A1:C1', 
      valueInputOption: 'USER_ENTERED',   
      resource: {
        "values": [
          ["Food", "Pizza", "$16"],
        ]
      },
      auth: oAuth2Client,
    };
  
    sheets.spreadsheets.values.update(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }      
    });
  }
})