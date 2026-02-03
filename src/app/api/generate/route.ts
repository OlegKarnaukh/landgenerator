import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';

// Increase function timeout for long prompts (Railway/Vercel)
export const maxDuration = 60; // 60 seconds
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 55000, // 55 seconds timeout for OpenAI requests
});

const SYSTEM_PROMPT = `You are an expert landing page designer. Create a complete, professional landing page.

TWO MODES OF OPERATION:

MODE 1 - SHORT INPUT (just a business name/description):
When user provides a brief description like "автосервис в Твери" or "fitness app":
- Generate FULL creative content for ALL sections
- Create compelling headlines, features, testimonials, pricing, FAQ
- Make content specific to that business type and location
- ALWAYS include: hero, features (3-4 items), testimonials (2-3), pricing (2-3 plans), faq (3-4 questions), stats, cta
- Generate realistic but fictional data

MODE 2 - DETAILED INPUT (structured copywriting):
When user provides detailed content with specific text:
- USE their exact text VERBATIM - do not rewrite or paraphrase
- Recognize structured input: # headlines, bullet points, CTA:, Price:, FAQ:
- Only fill gaps where user didn't provide content

ALWAYS GENERATE 5-7 SECTIONS minimum. A proper landing page needs:
1. hero - compelling headline and CTA
2. features - 3-4 key benefits with icons
3. testimonials - 2-3 customer reviews
4. pricing - 2-3 plans (or skip if not applicable)
5. stats - key numbers (years, clients, etc)
6. faq - 3-4 common questions
7. cta - final call to action

Return ONLY valid JSON:
{
  "title": "Page title",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Compelling headline (5-10 words)",
        "subheadline": "Supporting text (15-25 words)",
        "ctaText": "Action button (2-4 words)",
        "ctaUrl": "#contact"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Why Choose Us",
        "subtitle": "Brief description",
        "features": [
          {"icon": "Zap", "title": "Feature", "description": "Benefit description"},
          {"icon": "Shield", "title": "Feature", "description": "Benefit description"},
          {"icon": "Clock", "title": "Feature", "description": "Benefit description"}
        ]
      }
    },
    {
      "type": "stats",
      "data": {
        "stats": [
          {"value": "10+", "label": "Years Experience"},
          {"value": "5000+", "label": "Happy Clients"},
          {"value": "24/7", "label": "Support"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "Customer Reviews",
        "testimonials": [
          {"quote": "Review text", "author": "Name", "role": "Role"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Our Services",
        "plans": [
          {"name": "Basic", "price": 99, "features": ["Feature 1", "Feature 2"], "ctaText": "Choose"}
        ]
      }
    },
    {
      "type": "faq",
      "data": {
        "title": "FAQ",
        "questions": [
          {"question": "Question?", "answer": "Answer"}
        ]
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "Ready to get started?",
        "subheadline": "Contact us today",
        "ctaText": "Get Started",
        "ctaUrl": "#contact"
      }
    }
  ]
}

Icons: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight, Target, Sparkles, TrendingUp, BarChart, Lightbulb, Code, Database, Cloud, Smartphone, Car, Wrench, Tool

NO markdown, NO comments, ONLY valid JSON`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, style } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (description.length > 20000) {
      return NextResponse.json(
        { error: 'Description too long (max 20000 characters)' },
        { status: 400 }
      );
    }

    // Detect if input is short (creative mode) or detailed (preserve mode)
    const isShortInput = description.length < 500 && !description.includes('\n');

    const userPrompt = isShortInput
      ? `Create a COMPLETE professional landing page for: ${description}

${style ? `Style: ${style}` : ''}

Generate ALL sections: hero, features (3-4), stats, testimonials (2-3), pricing OR services, faq (3-4), cta.
Create compelling, specific content for this business. Make it feel real and professional.`
      : `Structure this detailed content into a landing page:

${description}

${style ? `Style: ${style}` : ''}

IMPORTANT: Use my EXACT text verbatim. Do not rewrite or paraphrase. Only organize into sections and fill gaps.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    let landing;
    try {
      landing = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Add IDs to sections
    if (landing.sections && Array.isArray(landing.sections)) {
      landing.sections = landing.sections.map((section: any, index: number) => ({
        id: nanoid(10),
        order: index,
        ...section,
      }));
    }

    // Add metadata
    landing.id = nanoid(10);
    landing.createdAt = new Date().toISOString();
    landing.tokensUsed = response.usage?.total_tokens || 0;

    return NextResponse.json(landing);
  } catch (error: any) {
    console.error('Generation error:', error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 500 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate landing page' },
      { status: 500 }
    );
  }
}
