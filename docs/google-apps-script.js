const SHEET_NAME = 'Responses'

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents)
    if (data.action !== 'submit' || !data.name || !data.email) {
      return json({ ok: false, message: 'Invalid request' })
    }

    const sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_NAME)
    if (!sheet) return json({ ok: false, message: 'Responses sheet not found' })

    const row = [
      String(data.name),
      String(data.email),
      data.welcome ? 'Yes' : 'No',
      data.wedding ? 'Yes' : 'No',
      data.brunch ? 'Yes' : 'No',
      String(data.notes || '').slice(0, 500),
      String(data.submittedAt || new Date().toISOString()),
    ]

    const values = sheet.getDataRange().getValues()
    const emailLower = String(data.email).trim().toLowerCase()
    const existingIndex = values.findIndex(
      (candidate, index) => index > 0 && String(candidate[1]).trim().toLowerCase() === emailLower,
    )

    if (existingIndex >= 0) {
      sheet.getRange(existingIndex + 1, 1, 1, row.length).setValues([row])
    } else {
      sheet.appendRow(row)
    }

    return json({ ok: true })
  } catch (error) {
    return json({ ok: false, message: String(error) })
  }
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
