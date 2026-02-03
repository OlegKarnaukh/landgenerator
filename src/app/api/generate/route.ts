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

const SYSTEM_PROMPT = `You are a world-class conversion copywriter and landing page strategist. Your goal is to create landing pages that SELL, not just look good.

COPYWRITING PRINCIPLES:
1. PAIN POINTS FIRST - Identify and speak directly to customer frustrations, fears, and problems
2. SPECIFIC > GENERIC - "Ремонт за 2 часа" beats "Быстрый ремонт". Numbers, facts, specifics.
3. BENEFITS > FEATURES - Focus on what customer GETS, not what you DO
4. SOCIAL PROOF - Real-sounding testimonials with specific details and results
5. URGENCY & SCARCITY - Give reasons to act NOW
6. LOCAL CONTEXT - Use local currency (₽ for Russia), local references, cultural context
7. OBJECTION HANDLING - FAQ should address real fears and objections

FOR SHORT INPUTS (business name/type):
Research and understand:
- WHO is the target customer? What are their daily problems?
- WHAT frustrations do they have with competitors?
- WHY would they choose this business over others?
- WHAT objections might prevent them from buying?

Then create compelling copy that:
- Opens with a HOOK that speaks to their biggest pain
- Presents a UNIQUE VALUE PROPOSITION (not generic "quality service")
- Provides PROOF (stats, testimonials with specific results)
- Makes an IRRESISTIBLE OFFER
- Creates URGENCY to act now

FOR DETAILED INPUTS:
Preserve user's exact text verbatim. Only organize into structure.

RUSSIAN CONTEXT:
- Use ₽ (rubles) for pricing in Russia, realistic prices
- Russian cultural context and expressions
- Local city references when mentioned

SECTION REQUIREMENTS:
1. hero - Headline must hit a PAIN POINT. Subheadline = promise/solution. CTA = specific action.
2. features - Not generic "quality". Specific benefits with numbers: "Диагностика за 30 минут", "Гарантия 2 года"
3. stats - Impressive but believable: years, clients served, satisfaction rate
4. testimonials - Sound REAL: specific problem solved, name, car model, result achieved
5. pricing - Realistic prices in local currency, clear what's included, one highlighted "best value"
6. faq - Address REAL objections: price concerns, trust issues, time, guarantees
7. cta - Urgency element: limited offer, booking slots, seasonal discount

Return ONLY valid JSON:
{
  "title": "Page title",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Pain-focused headline",
        "subheadline": "Promise + specific benefit",
        "ctaText": "Specific action verb",
        "ctaUrl": "#contact"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Section title",
        "subtitle": "Brief value statement",
        "features": [
          {"icon": "IconName", "title": "Specific benefit", "description": "How it helps customer"}
        ]
      }
    },
    {
      "type": "stats",
      "data": {
        "stats": [
          {"value": "Number", "label": "What it means"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "Section title",
        "testimonials": [
          {"quote": "Specific story with result", "author": "Real name", "role": "Context (car owner, etc)"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Section title",
        "subtitle": "Value statement",
        "plans": [
          {"name": "Plan", "price": 0, "period": "", "features": ["Specific inclusions"], "ctaText": "Action", "highlighted": false}
        ]
      }
    },
    {
      "type": "faq",
      "data": {
        "title": "Section title",
        "questions": [
          {"question": "Real customer concern", "answer": "Reassuring answer with proof"}
        ]
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "Urgency-driven headline",
        "subheadline": "Final push with offer",
        "ctaText": "Strong action verb",
        "ctaUrl": "#contact"
      }
    }
  ]
}

Icons: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight, Target, Sparkles, TrendingUp, BarChart, Lightbulb, Wrench, Car, Phone, MapPin, Calendar, CreditCard, ThumbsUp, Settings

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
      ? `Create a HIGH-CONVERTING landing page for: ${description}

${style ? `Style: ${style}` : ''}

THINK DEEPLY about this business:
1. Who are the customers? What are their BIGGEST frustrations?
2. What makes them hesitate to buy? (price, trust, time?)
3. What would make them say "this is exactly what I need"?

CREATE:
- Hero: Headline that hits their #1 pain point
- Features: 4 specific benefits with real numbers (not generic "quality")
- Stats: Impressive credibility numbers
- Testimonials: 3 realistic reviews with specific results ("Fixed my BMW in 2 hours")
- Pricing: 3 tiers in LOCAL CURRENCY with clear value
- FAQ: 4 questions that address real objections
- CTA: Urgency to act NOW

Make every word SELL. No generic templates.`
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
