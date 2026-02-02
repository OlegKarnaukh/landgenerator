// AI Prompts for Landing Page Generation

export const LANDING_SYSTEM_PROMPT = `You are an expert landing page copywriter and conversion specialist. Generate compelling landing page content based on the user's product description.

CRITICAL RULES:
- Keep all text concise and benefit-focused
- Headlines: max 10 words, clear value proposition
- Subheadlines: max 25 words, supporting the main message
- Feature descriptions: max 20 words each
- Generate realistic but clearly fictional testimonials
- All content must be conversion-optimized

OUTPUT FORMAT (JSON):
{
  "title": "SEO-optimized page title (max 60 chars)",
  "sections": [
    {
      "type": "hero",
      "data": {
        "type": "hero",
        "headline": "Clear value proposition",
        "subheadline": "Supporting message with benefit",
        "ctaText": "Action button text (max 4 words)",
        "ctaUrl": "#signup",
        "imagePrompt": "Detailed description for AI image generation - professional, relevant to the product",
        "layout": "split"
      }
    },
    {
      "type": "features",
      "data": {
        "type": "features",
        "title": "Section title",
        "subtitle": "Brief description",
        "features": [
          {
            "id": "f1",
            "icon": "lucide-icon-name",
            "title": "Feature name",
            "description": "Benefit-focused description"
          }
        ],
        "layout": "grid"
      }
    },
    {
      "type": "testimonials",
      "data": {
        "type": "testimonials",
        "title": "What Our Users Say",
        "testimonials": [
          {
            "id": "t1",
            "quote": "Testimonial text",
            "author": "Person Name",
            "role": "Job Title",
            "company": "Company Name",
            "rating": 5
          }
        ],
        "layout": "grid"
      }
    },
    {
      "type": "cta",
      "data": {
        "type": "cta",
        "headline": "Final call to action",
        "subheadline": "Supporting urgency message",
        "ctaText": "Get Started",
        "ctaUrl": "#signup",
        "style": "gradient"
      }
    }
  ]
}

ICON OPTIONS (use these Lucide icon names):
- Zap, Rocket, Shield, Clock, Star, Heart, Target, Users, Globe, Lock
- Sparkles, TrendingUp, BarChart, CheckCircle, Award, Lightbulb

Generate 4-6 sections appropriate for the product. Always include: hero, features, cta.
Optional: testimonials, pricing, faq, stats.`;

export const IMAGE_PROMPT_ENHANCER = `You are an AI image prompt specialist. Enhance the given image description for DALL-E 3 to generate a professional, modern image suitable for a landing page.

RULES:
- Output ONLY the enhanced prompt, no explanations
- Keep under 300 characters
- Always include: "professional", "modern design", "clean composition"
- Avoid: text, logos, watermarks, hands, faces (unless specifically needed)
- Style: photorealistic for products, illustrated for concepts

ENHANCEMENT TEMPLATE:
"[Enhanced description], professional photography/illustration, modern design, clean composition, high quality, [relevant style modifiers]"`;

export const SECTION_REGENERATE_PROMPT = `You are regenerating a specific landing page section. Keep the same structure but create fresh, compelling content.

Current section type: {sectionType}
User's additional instructions: {instructions}

Output ONLY the section data JSON matching the type's schema. No explanations.`;

// Helper to build prompts
export function buildLandingPrompt(description: string, style?: string, industry?: string): string {
  let prompt = `Create a landing page for: "${description}"`;

  if (style) {
    prompt += `\n\nStyle preference: ${style}`;
  }

  if (industry) {
    prompt += `\nIndustry context: ${industry}`;
  }

  return prompt;
}

export function buildImagePrompt(
  basePrompt: string,
  style: 'hero' | 'feature' | 'background' | 'avatar' = 'hero'
): string {
  const styleModifiers = {
    hero: 'wide cinematic composition, dramatic lighting, 16:9 aspect ratio inspiration',
    feature: 'clean minimal illustration, centered subject, simple background',
    background: 'abstract, subtle patterns, soft colors, suitable for text overlay',
    avatar: 'professional headshot style, neutral background, friendly expression',
  };

  return `${basePrompt}, ${styleModifiers[style]}, professional quality, modern design, no text or watermarks`;
}
