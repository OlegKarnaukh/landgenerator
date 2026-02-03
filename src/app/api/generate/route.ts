import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert landing page designer. Generate a complete landing page based on the user's description.

Return ONLY valid JSON in this exact format:
{
  "title": "Page title for browser tab",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Main headline (5-10 words, compelling)",
        "subheadline": "Supporting text (15-25 words)",
        "ctaText": "Button text (2-4 words)",
        "ctaUrl": "#signup"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Section title",
        "subtitle": "Brief description",
        "features": [
          {"icon": "Zap", "title": "Feature name", "description": "Brief benefit (10-15 words)"},
          {"icon": "Shield", "title": "Feature name", "description": "Brief benefit"},
          {"icon": "Rocket", "title": "Feature name", "description": "Brief benefit"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "What Our Customers Say",
        "testimonials": [
          {"quote": "Testimonial text (20-30 words)", "author": "Name", "role": "Title", "company": "Company"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Simple Pricing",
        "subtitle": "Choose your plan",
        "plans": [
          {"name": "Starter", "price": 9, "features": ["Feature 1", "Feature 2"], "ctaText": "Get Started"},
          {"name": "Pro", "price": 29, "features": ["Everything in Starter", "Feature 3"], "highlighted": true, "ctaText": "Get Started"}
        ]
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "Ready to get started?",
        "subheadline": "Join thousands of happy customers",
        "ctaText": "Start Free Trial",
        "ctaUrl": "#signup"
      }
    }
  ]
}

Rules:
- Generate 4-6 sections appropriate for the product/service
- Always include: hero, features, cta
- Optionally include: testimonials, pricing, faq, stats
- Use realistic but fictional testimonials
- Icons can be: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight
- All text should be conversion-focused and professional
- NO markdown, NO comments, ONLY valid JSON`;

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

    if (description.length > 2000) {
      return NextResponse.json(
        { error: 'Description too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    const userPrompt = `Create a landing page for: ${description}
${style ? `Style preference: ${style}` : ''}

Generate compelling, conversion-focused content. Make it specific to this product/service, not generic.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
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
