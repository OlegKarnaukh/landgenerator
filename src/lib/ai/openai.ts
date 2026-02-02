import OpenAI from 'openai';

// Singleton OpenAI client
let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error('OPENAI_API_KEY is not set in environment variables');
    }

    openaiClient = new OpenAI({ apiKey });
  }

  return openaiClient;
}

// Model selection based on task complexity
export type ModelTier = 'fast' | 'balanced' | 'powerful';

export function selectModel(tier: ModelTier = 'fast'): string {
  const models = {
    fast: 'gpt-4o-mini',      // Cheapest, good for simple tasks
    balanced: 'gpt-4o',        // Best price/performance
    powerful: 'gpt-4-turbo',   // Most capable, expensive
  };

  return models[tier];
}

// Token cost estimation (approximate)
export function estimateCost(inputTokens: number, outputTokens: number, model: string): number {
  const costs: Record<string, { input: number; output: number }> = {
    'gpt-4o-mini': { input: 0.15 / 1_000_000, output: 0.60 / 1_000_000 },
    'gpt-4o': { input: 2.50 / 1_000_000, output: 10.00 / 1_000_000 },
    'gpt-4-turbo': { input: 10.00 / 1_000_000, output: 30.00 / 1_000_000 },
  };

  const modelCost = costs[model] || costs['gpt-4o-mini'];

  return (inputTokens * modelCost.input) + (outputTokens * modelCost.output);
}

// Simple retry wrapper with exponential backoff
export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Don't retry on client errors (except rate limits)
      if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
        throw error;
      }

      // Wait with exponential backoff
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError;
}
