import config from '../config'

export const getSpreadsheetId = async () => {
  try {
    let userEmail =
      window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail();
    let userName = 
    window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getGivenName();
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Sheet1'
    })
    const listOfEmails = response.result.values;
    let spreadsheetId = findSpreadsheetId(listOfEmails, userEmail);
    
    if (!spreadsheetId) {
      spreadsheetId = await createSpreadsheet(userEmail);    
    };        
    
    return { 
      spreadsheetId, 
      userName 
    };      
  } catch (error) {
    console.error(error);
  }
}

const createSpreadsheet = async (userEmail) => {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

const findSpreadsheetId = (listOfEmails, userEmail) => {
  for (let email of listOfEmails) {
    if (email[0] === userEmail) {     
      return email[1];
    };      
  };
  return false;
};