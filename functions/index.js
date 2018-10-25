const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const sheets = google.sheets('v4');

app.use(bodyParser);
app.use(cors({ origin: true }));

app.post('/:spreadsheetId', (req, res) => {
  authorize(function(authClient) {
    var request = {
      // The ID of the spreadsheet to update.
      spreadsheetId: req.params.spreadsheetId,  // TODO: Update placeholder value.
  
      // The A1 notation of the values to update.
      range: 'Sheet1!A2:C2',  // TODO: Update placeholder value.
  
      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
  
      resource: {
        "values": [
          [category, description, amount],
        ]
        // TODO: Add desired properties to the request body. All existing properties
        // will be replaced.
      },
  
      auth: authClient,
    };
  
    sheets.spreadsheets.values.update(request, function(err, response) {
      if (err) {
        console.error(err);
        return;
      }
  
      // TODO: Change code below to process the `response` object:
      console.log(JSON.stringify(response, null, 2));
    });
  });
  
  function authorize(callback) {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/spreadsheets'
    var authClient = null;
  
    if (authClient == null) {
      console.log('authentication failed');
      return;
    }
    callback(authClient);
  }
})
//   const GOOGLE_SHEETS_API_PREFIX = 
//     'https://sheets.googleapis.com/v4/spreadsheets/';
//   const spreadsheetId = req.params.spreadsheetId;
//   const range = 'Sheet1!A2:C2';
//   const valueInputOption = 'USER_ENTERED'
//   const category = req.body.category
//   const description = req.body.description
//   const amount = req.body.amount  
//   const key = req.body.key

//   axios.post(
//     GOOGLE_SHEETS_API_PREFIX + 
//     spreadsheetId +
//     '/values/' + 
//     range + '?' +
//     'valueInputOption=' +
//     valueInputOption + '?' +
//     'key=' + 
//     key, {
//       "range": "Sheet1!A2:C2",
//       "values": [
//         [category, description, amount],
//       ]
//     }
//   )
//   .then((response) => {
//     return response;
//   })
//   .catch((error) => {
//     console.log(error);
//   })





app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

exports.api = functions.https.onRequest(app);
