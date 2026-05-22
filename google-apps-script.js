// ═══════════════════════════════════════════════════════════════
// CIHE RES 901 — Google Apps Script (paste this into Apps Script)
// ═══════════════════════════════════════════════════════════════
//
// HOW TO SET UP (5 minutes):
// 1. Open your Google Sheet
// 2. Click  Extensions → Apps Script
// 3. Delete the default code and paste this entire file
// 4. Click  Deploy → New deployment
//      Type: Web App
//      Execute as: Me
//      Who has access: Anyone
// 5. Click Deploy → copy the Web App URL
// 6. Paste that URL into index.html where it says:
//       const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
// ═══════════════════════════════════════════════════════════════

const SHEET_NAME = "Survey Responses";

const HEADERS = [
  "Participant ID", "Timestamp",
  "Q1 Gender", "Q2 Age Group", "Q3 Year of Study", "Q4 Faculty",
  "Q5 Study Hours/Week", "Q6 Study Location", "Q7 Main Barrier",
  "Q8 Overall Satisfaction (1-5)", "Q9 Performance Satisfaction (1-5)",
  "Q10 Felt Supported (1-5)", "Q11 Workload Manageable (1-5)",
  "Q12 Academic Stress (1-5)", "Q13 Stress Impact on Life (1-5)",
  "Q14 Sense of Belonging (1-5)", "Q15 Academic Confidence (1-5)",
  "Q16 Study-Life Balance (1-5)",
  "Q17 Sleep Hours", "Q18 Comments"
];

const FIELD_MAP = {
  "Participant ID":                   "participant_id",
  "Timestamp":                        "timestamp",
  "Q1 Gender":                        "q1_gender",
  "Q2 Age Group":                     "q2_age",
  "Q3 Year of Study":                 "q3_year",
  "Q4 Faculty":                       "q4_faculty",
  "Q5 Study Hours/Week":              "q5_hours",
  "Q6 Study Location":                "q6_location",
  "Q7 Main Barrier":                  "q7_barrier",
  "Q8 Overall Satisfaction (1-5)":    "q8_overall_sat",
  "Q9 Performance Satisfaction (1-5)":"q9_perf_sat",
  "Q10 Felt Supported (1-5)":         "q10_support",
  "Q11 Workload Manageable (1-5)":    "q11_workload",
  "Q12 Academic Stress (1-5)":        "q12_stress",
  "Q13 Stress Impact on Life (1-5)":  "q13_stress_impact",
  "Q14 Sense of Belonging (1-5)":     "q14_belonging",
  "Q15 Academic Confidence (1-5)":    "q15_confidence",
  "Q16 Study-Life Balance (1-5)":     "q16_balance",
  "Q17 Sleep Hours":                  "q17_sleep",
  "Q18 Comments":                     "q18_comments"
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss   = SpreadsheetApp.getActiveSpreadsheet();

    // Get or create the sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Write headers row with formatting
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setValues([HEADERS]);
      headerRange.setBackground("#1a2744");
      headerRange.setFontColor("#ffffff");
      headerRange.setFontWeight("bold");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
      // Set column widths
      sheet.setColumnWidth(1, 120);   // Participant ID
      sheet.setColumnWidth(2, 180);   // Timestamp
      sheet.setColumnWidths(3, 4, 140);
      sheet.setColumnWidths(7, 3, 160);
      sheet.setColumnWidths(10, 10, 100);
    }

    // Build the row
    const row = HEADERS.map(h => {
      const key = FIELD_MAP[h];
      return key ? (data[key] || "") : "";
    });

    // Append row
    sheet.appendRow(row);

    // Auto-resize and alternate row colouring
    const lastRow = sheet.getLastRow();
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, HEADERS.length).setBackground("#f2f4f7");
    }

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok", row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually to verify the sheet sets up correctly
function testSetup() {
  const testData = {
    participant_id: "PTEST001",
    timestamp: new Date().toISOString(),
    q1_gender: "Female",
    q2_age: "23-27 years",
    q3_year: "Year 2",
    q4_faculty: "Business",
    q5_hours: "10-14",
    q6_location: "On campus",
    q7_barrier: "Work commitments",
    q8_overall_sat: "4",
    q9_perf_sat: "3",
    q10_support: "4",
    q11_workload: "3",
    q12_stress: "3",
    q13_stress_impact: "2",
    q14_belonging: "4",
    q15_confidence: "4",
    q16_balance: "3",
    q17_sleep: "7-8hrs",
    q18_comments: "Test entry — delete this row."
  };

  const ss   = SpreadsheetApp.getActiveSpreadsheet();
  let sheet  = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setValues([HEADERS]);
    headerRange.setBackground("#1a2744");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  const row = HEADERS.map(h => {
    const key = FIELD_MAP[h];
    return key ? (testData[key] || "") : "";
  });
  sheet.appendRow(row);
  Logger.log("✅ Test row added to sheet: " + SHEET_NAME);
}
