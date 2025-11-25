import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { userType, companyName, email } = await request.json();

    // Validate input
    if (!userType || !companyName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (userType !== 'ADVERTISER' && userType !== 'API_CLIENT') {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // Here you would typically save to your database
    // For example:
    // await db.user.create({
    //   data: {
    //     email,
    //     userType,
    //     companyName,
    //     onboardingCompleted: true,
    //   },
    // });

    // For now, just return success
    // In production, you would save this data to your database
    console.log('Onboarding data:', { userType, companyName, email });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Onboarding error:', error);
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}

