# Google Sheets Contact Us Integration Setup

This guide will help you set up the Google Sheets integration for the Contact Us form.

## Step 1: Create Your Google Sheet

1. Create a new Google Sheet or open an existing one
2. Set up the following column headers in Row 1:
   - **Column A**: `Name`
   - **Column B**: `Email`
   - **Column C**: `mobile_number`
   - **Column D**: `Project_Type`
   - **Column E**: `About_Project`
   - **Column F**: `Timestamp` (optional)

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
    
    // Log the received data for debugging
    console.log('Received data:', JSON.stringify(data));
    
    // Extract mobile number - handle both camelCase and snake_case
    const mobileNumber = data.mobileNumber || data.mobile_number || '';
    
    // Log extracted values for debugging
    console.log('Extracted values:', {
      name: data.name,
      email: data.email,
      mobileNumber: mobileNumber,
      projectType: data.projectType,
      aboutProject: data.aboutProject
    });
    
    // Append a new row with the data
    // Order: Name, Email, mobile_number, Project_Type, About_Project, Timestamp
    // Make sure your Google Sheet columns match this order!
    sheet.appendRow([
      data.name || '',
      data.email || '',
      mobileNumber,  // This goes to the mobile_number column
      data.projectType || '',
      data.aboutProject || '',
      timestamp
    ]);
    
    console.log('Row appended successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    console.error('Error in doPost:', error.toString());
    console.error('Error stack:', error.stack);
    
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

### ⚠️ Important: If you already have a deployment

If you already deployed the script before adding the mobile number field:

1. **Update the script code** (make sure it includes `data.mobileNumber`)
2. Click **Deploy** → **Manage deployments**
3. Click the **pencil icon** (✏️) next to your existing deployment
4. Click **Deploy** again (this updates the existing deployment)
5. The URL stays the same - no need to update your `.env.local` file

## Step 4: Add URL to Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following line with your Web App URL:

```bash
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your development server

## Step 5: Test the Integration

1. Go to the Contact Us page on your site (`/contactus`)
2. Fill out the Contact Us form:
   - Enter your name
   - Enter your email
   - Select project type (Website for your business, Web app, AI Automation projects, or Other)
   - Describe your project
3. Submit the form
4. Check your Google Sheet - a new row should appear with all the data!

## Column Structure

Your Google Sheet should have these columns:
- **Name**: User's full name
- **Email**: User's email address
- **mobile_number**: User's mobile number with country code
- **Project_Type**: Selected project type (Website for your business, Web app, AI Automation projects, or Other)
- **About_Project**: Description of the project
- **Timestamp**: Automatically added when the form is submitted

## Troubleshooting

### Mobile number not saving
- **Most common issue**: The Google Apps Script hasn't been updated with the new code
- **Solution**: 
  1. Go to your Google Sheet → **Extensions** → **Apps Script**
  2. Make sure the script includes `data.mobileNumber` in the `appendRow` function
  3. Click **Deploy** → **Manage deployments**
  4. Click the **pencil icon** (✏️) to edit your deployment
  5. Click **Deploy** to update it
- Check the Apps Script execution log (View → Execution log) to see if there are errors
- Verify your Google Sheet has a column header `mobile_number` in Column C

### "Authorization required" error
- Make sure you authorized the script during deployment
- Try re-deploying with "Execute as: Me"

### Data not appearing in sheet
- Check the browser console for errors (F12 → Console tab)
- Check the server logs (your Next.js terminal) for the "Sending to Google Sheets" log
- Verify the GOOGLE_SHEETS_SCRIPT_URL is correct in your `.env.local` file
- Make sure the sheet has the correct column headers: `Name`, `Email`, `mobile_number`, `Project_Type`, `About_Project`
- Check Apps Script execution log for errors

### CORS errors
- The Apps Script web app URL should work without CORS issues
- Make sure "Who has access" is set to "Anyone"

### Testing the script manually
You can test your Google Apps Script by going to:
- **Extensions** → **Apps Script** → Click the function dropdown → Select `doPost` → Click Run
- Or use the Apps Script editor's test feature

