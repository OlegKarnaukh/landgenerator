// App Configuration Constants

export const APP_NAME = 'LandGen.AI';
export const APP_DESCRIPTION = 'AI Landing Page Generator';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

// Plan Limits
export const PLAN_LIMITS = {
  FREE: {
    maxLandings: 3,
    aiGenerationsPerMonth: 10,
    customDomain: false,
    exportHtml: false,
    removeBranding: false,
  },
  PRO: {
    maxLandings: -1, // unlimited
    aiGenerationsPerMonth: 100,
    customDomain: true,
    exportHtml: true,
    removeBranding: true,
  },
} as const;

// Pricing
export const PRICING = {
  PRO_MONTHLY: 19,
  PRO_YEARLY: 190, // ~$15.83/mo
  CURRENCY: 'USD',
} as const;

// AI Generation Settings
export const AI_CONFIG = {
  defaultModel: 'gpt-4o-mini',
  maxTokensPerGeneration: 2000,
  defaultImageSize: '1792x1024' as const,
  imageQuality: 'standard' as const,
} as const;

// Section Types Available
export const SECTION_TYPES = [
  { type: 'hero', label: 'Hero', description: 'Main banner with headline and CTA' },
  { type: 'features', label: 'Features', description: 'List of product features' },
  { type: 'testimonials', label: 'Testimonials', description: 'Customer reviews' },
  { type: 'pricing', label: 'Pricing', description: 'Pricing plans' },
  { type: 'cta', label: 'Call to Action', description: 'Final conversion section' },
  { type: 'faq', label: 'FAQ', description: 'Frequently asked questions' },
  { type: 'stats', label: 'Stats', description: 'Key metrics and numbers' },
  { type: 'gallery', label: 'Gallery', description: 'Image gallery' },
  { type: 'team', label: 'Team', description: 'Team members' },
  { type: 'contact', label: 'Contact', description: 'Contact form' },
] as const;

// Theme Presets
export const THEME_PRESETS = [
  {
    name: 'Default Blue',
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'inter' as const,
      borderRadius: 'md' as const,
    },
  },
  {
    name: 'Dark Mode',
    theme: {
      primaryColor: '#60a5fa',
      secondaryColor: '#a78bfa',
      backgroundColor: '#0f172a',
      textColor: '#f8fafc',
      fontFamily: 'inter' as const,
      borderRadius: 'md' as const,
    },
  },
  {
    name: 'Minimal Green',
    theme: {
      primaryColor: '#10b981',
      secondaryColor: '#34d399',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      fontFamily: 'inter' as const,
      borderRadius: 'sm' as const,
    },
  },
  {
    name: 'Bold Purple',
    theme: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#ec4899',
      backgroundColor: '#ffffff',
      textColor: '#1e1b4b',
      fontFamily: 'poppins' as const,
      borderRadius: 'lg' as const,
    },
  },
  {
    name: 'Warm Orange',
    theme: {
      primaryColor: '#f97316',
      secondaryColor: '#fbbf24',
      backgroundColor: '#fffbeb',
      textColor: '#1c1917',
      fontFamily: 'inter' as const,
      borderRadius: 'md' as const,
    },
  },
] as const;

// Font Options
export const FONT_OPTIONS = [
  { value: 'inter', label: 'Inter', className: 'font-sans' },
  { value: 'poppins', label: 'Poppins', className: 'font-poppins' },
  { value: 'roboto', label: 'Roboto', className: 'font-roboto' },
  { value: 'playfair', label: 'Playfair Display', className: 'font-playfair' },
  { value: 'montserrat', label: 'Montserrat', className: 'font-montserrat' },
] as const;

// Available Lucide Icons for Features
export const FEATURE_ICONS = [
  'Zap',
  'Rocket',
  'Shield',
  'Clock',
  'Star',
  'Heart',
  'Target',
  'Users',
  'Globe',
  'Lock',
  'Sparkles',
  'TrendingUp',
  'BarChart',
  'CheckCircle',
  'Award',
  'Lightbulb',
  'Code',
  'Database',
  'Cloud',
  'Smartphone',
] as const;
