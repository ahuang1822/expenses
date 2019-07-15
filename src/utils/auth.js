import config from '../config';

export const getSpreadsheetId = async () => {
  try {
    let userEmail = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getBasicProfile()
      .getEmail();
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Sheet1',
    });
    const listOfEmails = response.result.values;
    let spreadsheetId = findSpreadsheetId(listOfEmails, userEmail);

    if (!spreadsheetId) {
      spreadsheetId = await createSpreadsheet(userEmail);
    }

    return spreadsheetId;
  } catch (error) {
    console.error(error);
  }
};

const createSpreadsheet = async userEmail => {
  try {
    const response = await window.gapi.client.sheets.spreadsheets.create({
      properties: {
        title: 'Where did my money go?',
      },
    });
    const spreadsheetId = response.result.spreadsheetId;
    const values = [[userEmail, spreadsheetId]];
    const body = {
      values: values,
    };
    await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: config.spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      resource: body,
    });
    return spreadsheetId;
  } catch (error) {
    console.error(error);
  }
};

const findSpreadsheetId = (listOfEmails, userEmail) => {
  for (let email of listOfEmails) {
    if (email[0] === userEmail) {
      return email[1];
    }
  }
  return false;
};

export const init = async () => {
  return new Promise(resolve => {
    init.resolve = () => {
      resolve(true);
    };
    window.gapi.load('client:auth2', initClient);
  });
};

const initClient = async () => {
  const CLIENT_ID = config.CLIENT_ID;
  const API_KEY = config.API_KEY;
  const DISCOVERY_DOCS = [
    'https://sheets.googleapis.com/$discovery/rest?version=v4',
  ];
  const SCOPES = 'https://www.googleapis.com/auth/spreadsheets';

  await window.gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  });

  const authorizeButton = document.getElementById('authorize_button');
  const signoutButton = document.getElementById('signout_button');
  window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
  await updateSigninStatus(
    window.gapi.auth2.getAuthInstance().isSignedIn.get(),
  );
  authorizeButton.onclick = handleAuthClick;
  signoutButton.onclick = handleSignoutClick;
  init.resolve();

  async function updateSigninStatus(isSignedIn) {
    const SPREADSHEET_LINK_PREFIX = 'https://docs.google.com/spreadsheets/d/';
    const addExpenseButton = document.getElementById('add_expense_button');
    const loadingText = document.getElementById('loading');
    const spreadsheetLink = document.getElementById('spreadsheet-link');
    const welcomeMessage = document.getElementById('welcome-message');
    const authorizeButton = document.getElementById('authorize_button');
    const signoutButton = document.getElementById('signout_button');

    if (isSignedIn) {
      const spreadsheetId = await getSpreadsheetId();
      const userName = window.gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getBasicProfile()
        .getGivenName();
      spreadsheetLink.href = SPREADSHEET_LINK_PREFIX + spreadsheetId;
      welcomeMessage.innerText = `Welcome ${userName}`;
      spreadsheetLink.style.display = 'block';
      authorizeButton.style.display = 'none';
      signoutButton.style.display = 'block';
      addExpenseButton.style.display = 'block';
    } else {
      authorizeButton.style.display = 'block';
      signoutButton.style.display = 'none';
      addExpenseButton.style.display = 'none';
      spreadsheetLink.style.display = 'none';
      welcomeMessage.innerText = 'Welcome';
    }
    loadingText.style.display = 'none';
  }
};

const handleAuthClick = () => {
  window.gapi.auth2.getAuthInstance().signIn();
};

const handleSignoutClick = () => {
  window.gapi.auth2.getAuthInstance().signOut();
};
