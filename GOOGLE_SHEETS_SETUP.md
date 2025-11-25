# Google Sheets Contact Us Integration Setup

This guide will help you set up the Google Sheets integration for the Contact Us form.

## Step 1: Open Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/12Ky6p4NTfZRra0HcLH3pCLjBkusXPHnLIEmM2kbUW8M/edit
2. Make sure you have columns: `Name`, `User_Email`, `User_type`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Get the current date/time
    const timestamp = new Date();
    
    // Append a new row with the data
    sheet.appendRow([
      data.name,
      data.email,
      data.userType,
      timestamp
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon)
4. Name your project (e.g., "Contact Us Integration")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: Contact Us Form Submission
   - **Execute as**: Me
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize** the script when prompted
7. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Add URL to Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following line with your Web App URL:

```bash
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your development server

## Step 5: Test the Integration

1. Click "Join Waitlist" button on your site (navigates to /contactus)
2. Fill out the Contact Us form
3. Check your Google Sheet - a new row should appear!

## Optional: Add a Timestamp Column

If you want to track when submissions come in:

1. Add a column header "Timestamp" in your Google Sheet (column D)
2. The script above already includes timestamp tracking!

## Troubleshooting

### "Authorization required" error
- Make sure you authorized the script during deployment
- Try re-deploying with "Execute as: Me"

### Data not appearing in sheet
- Check the browser console for errors
- Verify the GOOGLE_SHEETS_SCRIPT_URL is correct
- Make sure the sheet has the correct column headers

### CORS errors
- The Apps Script web app URL should work without CORS issues
- Make sure "Who has access" is set to "Anyone"

