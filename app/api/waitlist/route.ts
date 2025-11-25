import { NextResponse } from 'next/server';


// Test endpoint to verify the route is working
export async function GET() {
  return NextResponse.json({ 
    message: 'Contact Us API is working!',
    endpoint: '/api/waitlist',
    method: 'POST',
    requiresAuth: false
  });
}

export async function POST(request: Request) {
  // NO AUTHENTICATION CHECK - This is a public endpoint
  // Anyone can submit to the Contact Us form
  
  try {
    const { name, email, projectType, aboutProject } = await request.json();

    // Validate input only - no login validation
    if (!name || !email || !projectType || !aboutProject) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Map projectType to readable format
    const projectTypeMap: Record<string, string> = {
      'website-for-business': 'Website for your business',
      'web-app': 'Web app',
      'ai-automation': 'AI Automation projects',
      'other': 'Other',
    };

    const mappedProjectType = projectTypeMap[projectType] || projectType;

    // Google Sheets Web App URL (you'll need to deploy a Google Apps Script)
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SHEETS_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      console.error('Google Sheets script URL not configured');
      console.log('Environment variable GOOGLE_SHEETS_SCRIPT_URL is missing');
      // Still return success to the user to avoid breaking the flow
      // But log the data for debugging
      console.log('Contact form submission:', { name, email, projectType: mappedProjectType, aboutProject });
      return NextResponse.json({ 
        success: true,
        message: 'Submitted (Google Sheets not configured)'
      });
    }

    // Validate that the URL is a web app URL, not a library URL
    if (GOOGLE_SCRIPT_URL.includes('/library/')) {
      console.error('Invalid Google Sheets URL - this appears to be a library URL, not a web app deployment URL');
      console.log('Please deploy your script as a web app and use the deployment URL');
      return NextResponse.json({ 
        success: false,
        error: 'Google Sheets URL is invalid. Please deploy as a web app.'
      }, { status: 500 });
    }

    // Send data to Google Sheets via the deployed script
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        projectType: mappedProjectType,
        aboutProject,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Google Sheets API error:', errorText);
      throw new Error(`Failed to save to Google Sheets: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successfully saved to Google Sheets:', result);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving to waitlist:', error);
    return NextResponse.json(
      { error: 'Failed to save contact form' },
      { status: 500 }
    );
  }
}

