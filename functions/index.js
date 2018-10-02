const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({ origin: true }));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

exports.api = functions.https.onRequest(app);
