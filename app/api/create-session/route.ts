import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Fetch environment variables
    const MID = process.env.MERCHANT_ID;
    const Pass = process.env.MERCHANT_PASS;
    const baseUrl = process.env.URL;

    if (!MID || !Pass || !baseUrl) {
      throw new Error('Missing required environment variables');
    }

    // Construct API URL
    const apiUrl = `${baseUrl}.gateway.mastercard.com/api/rest/version/74/merchant/${MID}/session`;

    // Create Authorization header
    const authHeader = 'Basic ' + Buffer.from(`merchant.${MID}:${Pass}`).toString('base64');

    // Make API request
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // Empty body as per API requirements
    });

    // Parse response
    const data = await response.json();

    // Handle non-2xx responses
    if (!response.ok) {
      console.error('Failed API response:', {
        status: response.status,
        data,
      });
      return NextResponse.json(data, { status: response.status });
    }

    // Return successful response
    return NextResponse.json(data);
  } catch (error: unknown) {
    // Log error details
    if (error instanceof Error) {
      console.error('Error creating session:', {
        message: error.message,
        stack: error.stack,
      });

      // Return error response
      return NextResponse.json(
        { error: 'Session creation failed', details: error.message },
        { status: 500 }
      );
    } else {
      console.error('Unknown error creating session');
      return NextResponse.json(
        { error: 'Session creation failed', details: 'Unknown error' },
        { status: 500 }
      );
    }
  }
}