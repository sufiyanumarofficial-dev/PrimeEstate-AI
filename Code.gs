function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Bookings');

    if (!sheet) {
      throw new Error('The "Bookings" sheet was not found.');
    }

    const payload = e && e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};

    const row = [
      payload.fullName || '',
      payload.companyName || '',
      payload.email || '',
      payload.projectName || '',
      payload.projectDescription || '',
      payload.preferredDate || '',
      payload.preferredTime || '',
      payload.meetingPlatform || '',
      new Date().toISOString()
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Booking saved successfully.' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: error.message })).setMimeType(ContentService.MimeType.JSON);
  }
}
