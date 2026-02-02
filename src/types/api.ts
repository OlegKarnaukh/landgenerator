// API Request/Response Types

import type { Landing, LandingContent, LandingTheme } from './landing';

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Landing API
export interface CreateLandingRequest {
  title: string;
  description?: string;
}

export interface UpdateLandingRequest {
  title?: string;
  slug?: string;
  content?: LandingContent;
  theme?: LandingTheme;
  published?: boolean;
}

export interface LandingResponse {
  landing: Landing;
}

export interface LandingsListResponse {
  landings: Landing[];
  total: number;
  page: number;
  pageSize: number;
}

// Generation API
export interface GenerateLandingRequest {
  description: string;
  style?: 'modern' | 'minimal' | 'bold' | 'playful';
  industry?: string;
  generateImages?: boolean;
}

export interface GenerateLandingResponse {
  landing: Landing;
  generationId: string;
  tokensUsed: number;
  imagesGenerated: number;
}

export interface GenerateImageRequest {
  prompt: string;
  style?: 'hero' | 'feature' | 'background' | 'avatar';
  size?: '1024x1024' | '1792x1024' | '1024x1792';
}

export interface GenerateImageResponse {
  imageUrl: string;
  prompt: string;
  revisedPrompt?: string;
}

export interface RegenerateContentRequest {
  landingId: string;
  sectionId: string;
  prompt?: string;
}

// Auth API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name?: string;
    plan: 'FREE' | 'PRO';
  };
  token?: string;
}

// Publish API
export interface PublishLandingRequest {
  landingId: string;
  customDomain?: string;
}

export interface PublishLandingResponse {
  url: string;
  subdomain: string;
  customDomain?: string;
}

// Usage/Stats API
export interface UsageStats {
  landingsCreated: number;
  landingsLimit: number;
  aiGenerationsUsed: number;
  aiGenerationsLimit: number;
  imagesGenerated: number;
  totalViews: number;
}

// Generation Progress (for streaming)
export interface GenerationProgress {
  stage: 'analyzing' | 'generating_content' | 'generating_images' | 'finalizing';
  progress: number; // 0-100
  message: string;
  currentSection?: string;
}
