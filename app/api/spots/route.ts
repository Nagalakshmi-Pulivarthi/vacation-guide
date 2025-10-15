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

    // Using the OpenAI responses API as provided in the sample
    const response = await openai.responses.create({
      prompt: {
        id: 'pmpt_68eee5c0420081939104c3f93c29e73e0c3235833f1864ba',
        version: '7',
        variables: {
          city: city,
          spotscount: spotsCount.toString(),
        },
      },
      input: [
        {
          type: 'reasoning',
          id: 'rs_0a317b07660e239c0068eef4c9b65481948aa11212e506c8e5',
          summary: [
            {
              type: 'summary_text',
              text: `**Providing ${city} recommendations**\n\nI need to suggest personalized recommendations for the best places to visit in ${city}, focusing on ${spotsCount} top spots for kids aged 5 to 12.`,
            },
          ],
          encrypted_content: '',
        },
      ],
      text: {
        format: {
          type: 'json_schema',
          name: 'favorite_spots_list',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              spots: {
                type: 'array',
                description: 'A list of favorite spots with their details.',
                items: {
                  type: 'object',
                  properties: {
                    name: {
                      type: 'string',
                      description: 'Name of the favorite spot.',
                    },
                    description: {
                      type: 'string',
                      description: 'A brief description of the spot.',
                    },
                    reason: {
                      type: 'string',
                      description: 'Reason why this spot is a favorite.',
                    },
                  },
                  required: ['name', 'description', 'reason'],
                  additionalProperties: false,
                },
              },
            },
            required: ['spots'],
            additionalProperties: false,
          },
        },
        verbosity: 'medium',
      },
      reasoning: {
        summary: 'auto',
      },
      store: true,
      include: ['reasoning.encrypted_content', 'web_search_call.action.sources'],
    } as any);

    // Extract the spots data from the response
    const data = JSON.parse(response.input[response.input.length - 1].content[0].text);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch favorite spots' },
      { status: 500 }
    );
  }
}

