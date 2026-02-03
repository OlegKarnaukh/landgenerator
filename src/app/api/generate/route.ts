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

const SYSTEM_PROMPT = `You are an expert landing page designer. Your task is to structure the user's content into a landing page JSON format.

CRITICAL RULES FOR USER'S TEXT:
1. If user provides specific text (headlines, descriptions, features, CTAs) - USE IT EXACTLY AS WRITTEN
2. DO NOT rewrite, shorten, paraphrase, or "improve" user's copywriting
3. DO NOT replace user's specific language with generic marketing phrases
4. Only fill in gaps where user didn't provide content
5. Preserve user's tone, style, and specific word choices

RECOGNIZE STRUCTURED INPUT:
- Lines starting with # or ## = headlines
- Lines with "CTA:" or "Button:" = call-to-action text
- Bullet points (-, *, •) = features or list items
- "Price:" or "$" = pricing information
- Quoted text = testimonials
- "FAQ:" or "Q:" = frequently asked questions

Return ONLY valid JSON in this format:
{
  "title": "Page title for browser tab",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "User's headline or generate if not provided",
        "subheadline": "User's subheadline or generate if not provided",
        "ctaText": "User's CTA text or generate",
        "ctaUrl": "#signup"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Section title",
        "subtitle": "Brief description",
        "features": [
          {"icon": "Zap", "title": "Feature name from user", "description": "User's description VERBATIM"},
          {"icon": "Shield", "title": "Feature name", "description": "User's text exactly"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "What Our Customers Say",
        "testimonials": [
          {"quote": "User's testimonial text EXACTLY", "author": "Name", "role": "Title", "company": "Company"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Pricing title",
        "subtitle": "Pricing subtitle",
        "plans": [
          {"name": "Plan name", "price": 9, "features": ["User's feature 1", "User's feature 2"], "ctaText": "Button text"}
        ]
      }
    },
    {
      "type": "faq",
      "data": {
        "title": "FAQ title",
        "questions": [
          {"question": "User's question exactly", "answer": "User's answer exactly"}
        ]
      }
    },
    {
      "type": "stats",
      "data": {
        "title": "Stats title",
        "stats": [
          {"value": "100+", "label": "User's label"}
        ]
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "User's CTA headline",
        "subheadline": "User's supporting text",
        "ctaText": "User's button text",
        "ctaUrl": "#signup"
      }
    }
  ]
}

Section selection rules:
- Always include: hero, cta
- Include features if user mentions product benefits/features
- Include testimonials if user provides quotes or reviews
- Include pricing if user provides price information
- Include faq if user provides Q&A content
- Include stats if user provides numbers/metrics
- Generate 3-7 sections based on user's content

Icons available: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight, Target, Sparkles, TrendingUp, BarChart, Lightbulb, Code, Database, Cloud, Smartphone

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

    const userPrompt = `Structure this content into a landing page:

${description}

${style ? `Style preference: ${style}` : ''}

IMPORTANT: Use the EXACT text I provided. Do not rewrite, shorten, or paraphrase my copywriting. Only organize it into the JSON structure and fill gaps where I didn't provide specific text.`;

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
