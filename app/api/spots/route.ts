import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { city, spotsCount } = await request.json();

    if (!city || !spotsCount) {
      return NextResponse.json(
        { error: 'City and spotsCount are required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Using the OpenAI responses API with simplified structure
    const response: any = await openai.responses.create({
      prompt: {
        id: 'pmpt_68eee5c0420081939104c3f93c29e73e0c3235833f1864ba',
        version: '8',
        variables: {
          city: city,
          spotscount: spotsCount.toString(),
        },
      },
    } as any);

    // Extract the spots data from the response
    if (!response.output_text) {
      console.error('Invalid response structure:', JSON.stringify(response, null, 2));
      throw new Error('Invalid response structure from OpenAI');
    }

    const data = JSON.parse(response.output_text);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch favorite spots' },
      { status: 500 }
    );
  }
}
