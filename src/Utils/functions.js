import config from '../config'

export const showSpreadsheetId = async (spreadsheetLink) => {
  let userEmail =
    window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();

  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range: 'Sheet1'
  })
  const listOfEmails = response.result.values;
  let spreadsheetId = getSpreadsheetId(listOfEmails, userEmail);
  if (!spreadsheetId) {
    spreadsheetId = await createSpreadsheet(userEmail);    
  };
  spreadsheetLink.href = 'https://docs.google.com/spreadsheets/d/' + spreadsheetId;
  spreadsheetLink.style.display = 'block';
}

const createSpreadsheet = async (userEmail) => {
  const response = await window.gapi.client.sheets.spreadsheets.create({
    properties: {
      title: 'Where did my money go?'
    }
  });  
  const spreadsheetId = response.result.spreadsheetId;
  const values = [
    [userEmail, spreadsheetId]
  ];
  const body = {
    values: values
  };    
  await window.gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: config.spreadsheetId,
    range: 'Sheet1',
    valueInputOption: 'USER_ENTERED',
    resource: body
  })  
  return spreadsheetId;
}

const getSpreadsheetId = (listOfEmails, userEmail) => {
  for (let email of listOfEmails) {
    if (email[0] === userEmail) {     
      return email[1];
    };      
  };
  return false;
};