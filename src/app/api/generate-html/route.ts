import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { nanoid } from 'nanoid';

export const maxDuration = 120;
export const runtime = 'nodejs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Skill-based prompt для уникальных лендингов
// Основано на best practices: https://www.justinwetch.com/blog/improvingclaudefrontend
const LANDING_SKILL = `You are an expert web designer creating unique, high-converting landing pages.

## CRITICAL: AVOID "AI SLOP" DESIGN

AI-generated pages often look generic because models default to "safe" high-probability choices. You MUST actively avoid these patterns:

### BANNED (makes it look like cheap AI):
- Fonts: Inter, Roboto, Open Sans, Arial, Lato, system-ui
- Colors: #3B82F6 (blue-500), #8B5CF6 (purple-500), #6366F1 (indigo-500)
- Gradients: blue-to-purple, indigo-to-purple
- Layouts: centered hero with two buttons, 3-column features grid
- Words: "качественный", "профессиональный", "индивидуальный подход"
- Generic stock photo vibes

### REQUIRED (looks like premium agency work):
- Typography: Use distinctive fonts from Google Fonts
  * Headlines: Space Grotesk, Outfit, Plus Jakarta Sans, Bricolage Grotesque, Syne, DM Serif Display, Playfair Display
  * Body: DM Sans, Source Sans 3, Nunito Sans, Manrope
- Colors: Create a unique palette for the niche. NO standard Tailwind colors.
- Layouts: Creative, asymmetric, with visual interest
- Backgrounds: Gradients, mesh, patterns, atmospheric images - NOT solid white
- Effects: Subtle shadows, hover transitions, scroll animations
- Content: LONG, specific, story-driven copy with real numbers

## TECHNICAL REQUIREMENTS

Output ONLY valid HTML. No markdown, no code blocks, no explanation.

\`\`\`
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title]</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            // Custom color palette here
          },
          fontFamily: {
            heading: ['Font Name', 'sans-serif'],
            body: ['Font Name', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* Custom CSS for animations, effects */
  </style>
</head>
<body class="font-body">
  <!-- 12-15 sections with rich content -->
</body>
<script>lucide.createIcons();</script>
</html>
\`\`\`

## REQUIRED SECTIONS (12-15 total):

1. **Header** - Sticky navigation with logo, menu items, CTA button
2. **Hero** - Large, impactful, with compelling headline, subheadline, CTA, visual element
3. **Social Proof Bar** - Logos of clients/partners or trust badges
4. **Problem** - Describe the pain point your audience faces
5. **Solution** - How your product/service solves it
6. **Features/Benefits** - 6-8 items with icons, detailed descriptions
7. **How It Works** - 4-5 step process
8. **Services/Products** - With prices in ₽ (rubles)
9. **Testimonials** - 4-6 REAL STORIES (not "Great service!")
10. **Portfolio/Gallery** - Visual proof of work
11. **Team** - If applicable
12. **FAQ** - 5-8 questions addressing FEARS (price, time, quality, guarantees)
13. **Contact/Form** - With phone, email, address, working hours
14. **Final CTA** - Strong call to action with urgency
15. **Footer** - Links, social media, copyright

## IMAGES

Use real Unsplash URLs:
- Format: https://images.unsplash.com/photo-[ID]?w=800&q=80
- Business: 1497366216548-37526070297c, 1553028826-f4804a6dba3b
- Food: 1504674900247-0877df9cc836, 1555396273-367ea4eb4db5
- Beauty: 1560066984-138dadb4c035, 1522337360788-8b13dee7a37e
- Auto: 1492144534655-ae79c964c9d7, 1486262715619-67b85e0b08d3
- Medical: 1579684385127-1ef15d508118, 1551190822-a9333d879b1f
- Fitness: 1534438327276-14e5300c3a48, 1571019614242-c5c5dee9f50b
- Tech: 1531297484001-80022131f5a1, 1518770660439-4636190af475

Avatars: https://api.dicebear.com/7.x/avataaars/svg?seed=Name

## COPYWRITING

Headlines formula: "[Pain]? [Solution with number in timeframe]"
- ❌ "Качественные услуги для вашего бизнеса"
- ✅ "Сайт не приносит клиентов? Увеличим конверсию на 40% за 2 недели"

Testimonials = STORIES:
- ❌ "Отличный сервис, всем рекомендую!"
- ✅ "Обратился с проблемой X, думал будет дорого. Разобрались за 2 часа, цена на 40% ниже конкурентов. Уже 3 раза возвращался." — Имя Фамилия, должность

FAQ = Address FEARS:
- "А если результат не понравится?"
- "Почему так дорого / дёшево?"
- "Сколько времени займёт?"
- "Какие гарантии?"

Prices: In rubles (₽), realistic for Russia 2026.

## INTERACTIVE ELEMENTS

- Mobile hamburger menu
- Smooth scroll to anchors
- Hover effects on buttons and cards
- Form with validation styling
- CSS animations on scroll (use @keyframes)

Now create a unique, professional landing page that looks like it was designed by a premium agency.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, currentHtml, editCommand } = body;

    // Edit mode
    if (currentHtml && editCommand) {
      return handleEditRequest(currentHtml, editCommand);
    }

    // Generate new landing
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const userPrompt = `Create a landing page for:

${description}

Requirements:
- Unique design (NOT template-looking)
- 12-15 full sections with LONG, detailed content
- Distinctive color palette and fonts for this niche
- Real Unsplash images
- Prices in rubles (₽)
- Russian language

Output ONLY the complete HTML code. No markdown, no explanation.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: LANDING_SKILL,
    });

    let html = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        html += block.text;
      }
    }

    html = cleanHtml(html);

    if (!html || html.length < 500) {
      return NextResponse.json(
        { error: 'Failed to generate landing page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: nanoid(10),
      html,
      createdAt: new Date().toISOString(),
      tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens || 0,
      description,
    });
  } catch (error: any) {
    console.error('Generation error:', error);

    if (error?.status === 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 500 });
    }

    if (error?.status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    return NextResponse.json({ error: error.message || 'Failed to generate' }, { status: 500 });
  }
}

async function handleEditRequest(currentHtml: string, editCommand: string) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: `Here is the current HTML of a landing page:

\`\`\`html
${currentHtml}
\`\`\`

User request: "${editCommand}"

Apply the requested changes and return the COMPLETE updated HTML.
Keep all existing content except what needs to change.
Output ONLY the HTML code, no markdown, no explanation.`,
        },
      ],
      system: 'You are a web developer. Edit HTML as requested. Output ONLY valid HTML, no markdown code blocks.',
    });

    let html = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        html += block.text;
      }
    }

    html = cleanHtml(html);

    return NextResponse.json({
      html,
      tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens || 0,
    });
  } catch (error: any) {
    console.error('Edit error:', error);
    return NextResponse.json({ error: error.message || 'Failed to edit' }, { status: 500 });
  }
}

function cleanHtml(html: string): string {
  // Remove markdown code blocks if present
  html = html.replace(/^```html?\n?/gi, '');
  html = html.replace(/\n?```$/gi, '');
  html = html.replace(/```html?\n?/gi, '');
  html = html.replace(/\n?```/gi, '');
  html = html.trim();

  // Find where HTML actually starts
  const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
  const htmlIndex = html.toLowerCase().indexOf('<html');

  if (doctypeIndex !== -1) {
    html = html.substring(doctypeIndex);
  } else if (htmlIndex !== -1) {
    html = html.substring(htmlIndex);
  }

  return html.trim();
}
