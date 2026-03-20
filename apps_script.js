function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (sheet.getLastRow() === 0) {
    var headers = [
      "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D5\u05E9\u05E2\u05EA \u05E9\u05DC\u05D9\u05D7\u05D4",
      "\u05E9\u05DD \u05DE\u05DC\u05D0",
      "\u05D8\u05DC\u05E4\u05D5\u05DF",
      "\u05EA\u05D0\u05E8\u05D9\u05DA \u05DC\u05D9\u05D3\u05D4",
      "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E4\u05D2\u05D9\u05E9\u05D4",
      "\u05EA\u05DC\u05D5\u05E0\u05D4 \u05E2\u05D9\u05E7\u05E8\u05D9\u05EA",
      "\u05DE\u05E9\u05DA \u05D4\u05E1\u05D9\u05DE\u05E4\u05D8\u05D5\u05DE\u05D9\u05DD",
      "\u05EA\u05E8\u05D5\u05E4\u05D5\u05EA \u05E7\u05D1\u05D5\u05E2\u05D5\u05EA",
      "\u05E9\u05D0\u05DC\u05D5\u05EA \u05DC\u05E8\u05D5\u05E4\u05D0",
      "\u05D4\u05E2\u05E8\u05D5\u05EA \u05E0\u05D5\u05E1\u05E4\u05D5\u05EA"
    ];
    sheet.appendRow(headers);
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

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
