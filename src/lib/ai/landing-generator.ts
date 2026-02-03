import { getOpenAIClient, selectModel, withRetry } from './openai';
import { LANDING_SYSTEM_PROMPT, buildLandingPrompt, buildImagePrompt } from './prompts';
import { generateId } from '@/lib/utils';
import type { LandingContent, Section, DEFAULT_THEME } from '@/types/landing';

export interface GenerationOptions {
  description: string;
  style?: 'modern' | 'minimal' | 'bold' | 'playful';
  industry?: string;
  generateImages?: boolean;
}

export interface GenerationResult {
  content: LandingContent;
  title: string;
  tokensUsed: number;
  imagePrompts: string[];
}

/**
 * Generate complete landing page content using AI
 */
export async function generateLandingContent(
  options: GenerationOptions
): Promise<GenerationResult> {
  const openai = getOpenAIClient();
  const model = selectModel('fast'); // Use gpt-4o-mini for cost efficiency

  const userPrompt = buildLandingPrompt(
    options.description,
    options.style,
    options.industry
  );

  const response = await withRetry(async () => {
    return openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: LANDING_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 2000,
      temperature: 0.7,
    });
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No content generated');
  }

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    throw new Error('Failed to parse AI response as JSON');
  }

  // Add IDs to sections and validate structure
  const sections: Section[] = (parsed.sections || []).map((section: any, index: number) => ({
    id: generateId(),
    type: section.type,
    order: index,
    visible: true,
    data: {
      ...section.data,
      type: section.type,
    },
  }));

  // Extract image prompts for later generation
  const imagePrompts: string[] = [];

  for (const section of sections) {
    if (section.data && 'imagePrompt' in section.data && section.data.imagePrompt) {
      imagePrompts.push(section.data.imagePrompt);
    }
  }

  const tokensUsed =
    (response.usage?.prompt_tokens || 0) + (response.usage?.completion_tokens || 0);

  return {
    content: { sections },
    title: parsed.title || 'Untitled Landing Page',
    tokensUsed,
    imagePrompts,
  };
}

/**
 * Generate a single image using DALL-E
 */
export async function generateImage(
  prompt: string,
  style: 'hero' | 'feature' | 'background' | 'avatar' = 'hero'
): Promise<{ url: string; revisedPrompt?: string }> {
  const openai = getOpenAIClient();

  const enhancedPrompt = buildImagePrompt(prompt, style);

  // Select size based on style
  const size = style === 'hero' ? '1792x1024' : '1024x1024';

  const response = await withRetry(async () => {
    return openai.images.generate({
      model: 'dall-e-3',
      prompt: enhancedPrompt,
      n: 1,
      size: size as '1024x1024' | '1792x1024',
      quality: 'standard', // Use 'hd' for paid users
    });
  });

  if (!response.data || response.data.length === 0) {
    throw new Error('No image data in response');
  }

  const imageData = response.data[0];

  if (!imageData?.url) {
    throw new Error('No image URL in response');
  }

  return {
    url: imageData.url,
    revisedPrompt: imageData.revised_prompt,
  };
}

/**
 * Regenerate content for a specific section
 */
export async function regenerateSection(
  sectionType: string,
  currentData: any,
  instructions?: string
): Promise<any> {
  const openai = getOpenAIClient();
  const model = selectModel('fast');

  const prompt = `Regenerate this ${sectionType} section with fresh content.
Current content: ${JSON.stringify(currentData)}
${instructions ? `Additional instructions: ${instructions}` : ''}

Output ONLY valid JSON matching the section schema.`;

  const response = await withRetry(async () => {
    return openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'You regenerate landing page sections. Output only valid JSON.',
        },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000,
      temperature: 0.8,
    });
  });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error('No content generated');
  }

  return JSON.parse(content);
}
