// Core Landing Page Types

export interface Landing {
  id: string;
  userId: string;
  title: string;
  slug: string;
  description?: string;
  content: LandingContent;
  theme: LandingTheme;
  published: boolean;
  customDomain?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LandingContent {
  sections: Section[];
}

export interface LandingTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: FontFamily;
  borderRadius: BorderRadius;
}

export type FontFamily = 'inter' | 'poppins' | 'roboto' | 'playfair' | 'montserrat';
export type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

// Default theme
export const DEFAULT_THEME: LandingTheme = {
  primaryColor: '#3b82f6',
  secondaryColor: '#8b5cf6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  fontFamily: 'inter',
  borderRadius: 'md',
};

// Section Types
export type SectionType =
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'pricing'
  | 'cta'
  | 'faq'
  | 'gallery'
  | 'stats'
  | 'team'
  | 'contact';

export interface Section {
  id: string;
  type: SectionType;
  order: number;
  visible: boolean;
  data: SectionData;
}

export type SectionData =
  | HeroSectionData
  | FeaturesSectionData
  | TestimonialsSectionData
  | PricingSectionData
  | CTASectionData
  | FAQSectionData
  | GallerySectionData
  | StatsSectionData
  | TeamSectionData
  | ContactSectionData;

// Hero Section
export interface HeroSectionData {
  type: 'hero';
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  imageUrl?: string;
  imagePrompt?: string;
  layout: 'centered' | 'split' | 'background';
}

// Features Section
export interface FeaturesSectionData {
  type: 'features';
  title: string;
  subtitle?: string;
  features: Feature[];
  layout: 'grid' | 'list' | 'cards';
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  imageUrl?: string;
}

// Testimonials Section
export interface TestimonialsSectionData {
  type: 'testimonials';
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  layout: 'grid' | 'carousel' | 'single';
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
}

// Pricing Section
export interface PricingSectionData {
  type: 'pricing';
  title: string;
  subtitle?: string;
  plans: PricingPlan[];
  billingPeriod: 'monthly' | 'yearly' | 'both';
}

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  price: number;
  yearlyPrice?: number;
  currency: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaUrl: string;
}

// CTA Section
export interface CTASectionData {
  type: 'cta';
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImageUrl?: string;
  style: 'simple' | 'gradient' | 'image';
}

// FAQ Section
export interface FAQSectionData {
  type: 'faq';
  title: string;
  subtitle?: string;
  faqs: FAQItem[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Gallery Section
export interface GallerySectionData {
  type: 'gallery';
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  layout: 'grid' | 'masonry' | 'carousel';
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

// Stats Section
export interface StatsSectionData {
  type: 'stats';
  title?: string;
  stats: Stat[];
  style: 'simple' | 'cards' | 'gradient';
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  icon?: string;
}

// Team Section
export interface TeamSectionData {
  type: 'team';
  title: string;
  subtitle?: string;
  members: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Contact Section
export interface ContactSectionData {
  type: 'contact';
  title: string;
  subtitle?: string;
  email?: string;
  phone?: string;
  address?: string;
  showForm: boolean;
  formFields: ContactFormField[];
}

export interface ContactFormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
}

// Helper type guards
export function isHeroSection(section: Section): section is Section & { data: HeroSectionData } {
  return section.type === 'hero';
}

export function isFeaturesSection(section: Section): section is Section & { data: FeaturesSectionData } {
  return section.type === 'features';
}

export function isTestimonialsSection(section: Section): section is Section & { data: TestimonialsSectionData } {
  return section.type === 'testimonials';
}

export function isPricingSection(section: Section): section is Section & { data: PricingSectionData } {
  return section.type === 'pricing';
}
