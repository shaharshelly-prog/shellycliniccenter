function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.formType === 'MG Monitor') {
    handleMgMonitor(ss, data);
  } else {
    handlePreVisit(ss, data);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}


// ── MG Monitor registrations ──────────────────────
function handleMgMonitor(ss, data) {
  var sheetName = 'MG Monitor';
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow([
      'תאריך ושעת הרשמה',
      'שם מלא',
      'טלפון',
      'שנת אבחון MG',
      'טיפול נוכחי',
      'סטטוס'
    ]);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#0b4a5a').setFontColor('#ffffff');
  }

  sheet.appendRow([
    new Date().toLocaleString(),
    data.fullName,
    data.phone,
    data.diagYear  || '',
    data.treatment || '',
    'ממתין לחזרה'
  ]);

  sendMgMonitorEmail(data);
}


// ── Pre-visit form ────────────────────────────────
function handlePreVisit(ss, data) {
  var sheetName = 'טופס לפני הביקור';
  var sheet = ss.getSheetByName(sheetName) || ss.getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'תאריך ושעת שליחה',
      'שם מלא',
      'טלפון',
      'תאריך לידה',
      'תאריך הפגישה',
      'תלונה עיקרית',
      'משך הסימפטומים',
      'תרופות קבועות',
      'שאלות לרופא',
      'הערות נוספות'
    ]);
  }

  sheet.appendRow([
    new Date().toLocaleString(),
    data.fullName,
    data.phone,
    data.dob,
    data.appointmentDate,
    data.mainComplaint,
    data.symptomsDuration,
    data.medications,
    data.questions,
    data.additionalNotes
  ]);
}


// ── Email notification for MG Monitor ────────────
function sendMgMonitorEmail(data) {
  var recipient = 'shaharshelly@gmail.com';
  var subject   = '🔔 MG Monitor — הרשמה חדשה';
  var body =
    'נרשם/ה מטופל/ת חדש/ה לתוכנית MG Monitor:\n\n' +
    'שם:          ' + data.fullName  + '\n' +
    'טלפון:       ' + data.phone     + '\n' +
    'שנת אבחון:   ' + (data.diagYear  || 'לא צוין') + '\n' +
    'טיפול נוכחי: ' + (data.treatment || 'לא צוין') + '\n\n' +
    'יש לחזור אליו/ה תוך 48 שעות.\n\n' +
    'צפייה בגיליון: https://docs.google.com/spreadsheets/d/' +
    SpreadsheetApp.getActiveSpreadsheet().getId();

  MailApp.sendEmail(recipient, subject, body);
}
