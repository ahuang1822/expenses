const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const {google} = require('googleapis');
const sheets = google.sheets('v4');

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/add-to-sheets/:sheetID', (req, res) => {
  authorize(function(authClient) {
    const request = {
      // The ID of the spreadsheet to update.
      spreadsheetId: req.params.sheetID,  // TODO: Update placeholder value.
  
      // The A1 notation of the values to update.
      range: "A2: C2",  // TODO: Update placeholder value.
  
      // How the input data should be interpreted.
      valueInputOption: 'USER_ENTERED',  // TODO: Update placeholder value.
  
      resource: {
        "values" : [
          ["Travel", "Uber", "$20"]
        ]
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
