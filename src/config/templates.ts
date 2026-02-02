// Pre-built Landing Page Templates

import type { LandingContent, LandingTheme } from '@/types/landing';
import { generateId } from '@/lib/utils';

export interface LandingTemplate {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'agency' | 'product' | 'service' | 'event';
  previewImage?: string;
  content: LandingContent;
  theme: LandingTheme;
}

export const TEMPLATES: LandingTemplate[] = [
  {
    id: 'saas-startup',
    name: 'SaaS Startup',
    description: 'Perfect for software products and tech startups',
    category: 'saas',
    content: {
      sections: [
        {
          id: generateId(),
          type: 'hero',
          order: 0,
          visible: true,
          data: {
            type: 'hero',
            headline: 'Build Better Products, Faster',
            subheadline: 'The all-in-one platform for modern teams. Ship features in days, not months.',
            ctaText: 'Start Free Trial',
            ctaUrl: '#signup',
            secondaryCtaText: 'Watch Demo',
            secondaryCtaUrl: '#demo',
            layout: 'split',
          },
        },
        {
          id: generateId(),
          type: 'features',
          order: 1,
          visible: true,
          data: {
            type: 'features',
            title: 'Everything You Need',
            subtitle: 'Powerful features to supercharge your workflow',
            features: [
              {
                id: generateId(),
                icon: 'Zap',
                title: 'Lightning Fast',
                description: 'Deploy in seconds with our optimized infrastructure',
              },
              {
                id: generateId(),
                icon: 'Shield',
                title: 'Enterprise Security',
                description: 'Bank-level encryption and SOC 2 compliance',
              },
              {
                id: generateId(),
                icon: 'Users',
                title: 'Team Collaboration',
                description: 'Work together seamlessly with real-time updates',
              },
              {
                id: generateId(),
                icon: 'BarChart',
                title: 'Analytics Dashboard',
                description: 'Track performance with detailed insights',
              },
            ],
            layout: 'grid',
          },
        },
        {
          id: generateId(),
          type: 'stats',
          order: 2,
          visible: true,
          data: {
            type: 'stats',
            stats: [
              { id: generateId(), value: '10K+', label: 'Active Users' },
              { id: generateId(), value: '99.9%', label: 'Uptime' },
              { id: generateId(), value: '150+', label: 'Countries' },
              { id: generateId(), value: '24/7', label: 'Support' },
            ],
            style: 'simple',
          },
        },
        {
          id: generateId(),
          type: 'testimonials',
          order: 3,
          visible: true,
          data: {
            type: 'testimonials',
            title: 'Loved by Teams Everywhere',
            testimonials: [
              {
                id: generateId(),
                quote: 'This tool has completely transformed how we work. We shipped 3x more features last quarter.',
                author: 'Sarah Chen',
                role: 'Head of Product',
                company: 'TechCorp',
                rating: 5,
              },
              {
                id: generateId(),
                quote: 'The best investment we made this year. Simple to use, powerful results.',
                author: 'Mike Johnson',
                role: 'CTO',
                company: 'StartupXYZ',
                rating: 5,
              },
            ],
            layout: 'grid',
          },
        },
        {
          id: generateId(),
          type: 'pricing',
          order: 4,
          visible: true,
          data: {
            type: 'pricing',
            title: 'Simple, Transparent Pricing',
            subtitle: 'No hidden fees. Cancel anytime.',
            plans: [
              {
                id: generateId(),
                name: 'Starter',
                price: 29,
                currency: 'USD',
                features: ['5 team members', '10 projects', 'Basic analytics', 'Email support'],
                ctaText: 'Start Free',
                ctaUrl: '#signup',
              },
              {
                id: generateId(),
                name: 'Pro',
                price: 79,
                currency: 'USD',
                features: ['Unlimited members', 'Unlimited projects', 'Advanced analytics', 'Priority support', 'Custom integrations'],
                highlighted: true,
                ctaText: 'Start Free',
                ctaUrl: '#signup',
              },
              {
                id: generateId(),
                name: 'Enterprise',
                price: 199,
                currency: 'USD',
                features: ['Everything in Pro', 'Dedicated account manager', 'Custom SLA', 'On-premise option', 'Training sessions'],
                ctaText: 'Contact Sales',
                ctaUrl: '#contact',
              },
            ],
            billingPeriod: 'monthly',
          },
        },
        {
          id: generateId(),
          type: 'cta',
          order: 5,
          visible: true,
          data: {
            type: 'cta',
            headline: 'Ready to Get Started?',
            subheadline: 'Join 10,000+ teams already using our platform',
            ctaText: 'Start Your Free Trial',
            ctaUrl: '#signup',
            style: 'gradient',
          },
        },
      ],
    },
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'inter',
      borderRadius: 'md',
    },
  },
  {
    id: 'minimal-agency',
    name: 'Minimal Agency',
    description: 'Clean design for creative agencies and freelancers',
    category: 'agency',
    content: {
      sections: [
        {
          id: generateId(),
          type: 'hero',
          order: 0,
          visible: true,
          data: {
            type: 'hero',
            headline: 'We Design Digital Experiences',
            subheadline: 'Award-winning design studio crafting memorable brands and products.',
            ctaText: 'View Our Work',
            ctaUrl: '#portfolio',
            layout: 'centered',
          },
        },
        {
          id: generateId(),
          type: 'features',
          order: 1,
          visible: true,
          data: {
            type: 'features',
            title: 'Our Services',
            features: [
              {
                id: generateId(),
                icon: 'Sparkles',
                title: 'Brand Identity',
                description: 'Logos, guidelines, and visual systems',
              },
              {
                id: generateId(),
                icon: 'Globe',
                title: 'Web Design',
                description: 'Beautiful, responsive websites',
              },
              {
                id: generateId(),
                icon: 'Smartphone',
                title: 'App Design',
                description: 'Intuitive mobile experiences',
              },
            ],
            layout: 'cards',
          },
        },
        {
          id: generateId(),
          type: 'cta',
          order: 2,
          visible: true,
          data: {
            type: 'cta',
            headline: "Let's Create Something Amazing",
            subheadline: 'Start a conversation about your project',
            ctaText: 'Get in Touch',
            ctaUrl: '#contact',
            style: 'simple',
          },
        },
      ],
    },
    theme: {
      primaryColor: '#111827',
      secondaryColor: '#6b7280',
      backgroundColor: '#ffffff',
      textColor: '#111827',
      fontFamily: 'inter',
      borderRadius: 'none',
    },
  },
  {
    id: 'product-launch',
    name: 'Product Launch',
    description: 'Bold design for new product announcements',
    category: 'product',
    content: {
      sections: [
        {
          id: generateId(),
          type: 'hero',
          order: 0,
          visible: true,
          data: {
            type: 'hero',
            headline: 'Introducing the Future',
            subheadline: 'The most advanced product ever created. Available now.',
            ctaText: 'Pre-order Now',
            ctaUrl: '#preorder',
            secondaryCtaText: 'Learn More',
            secondaryCtaUrl: '#features',
            layout: 'background',
          },
        },
        {
          id: generateId(),
          type: 'features',
          order: 1,
          visible: true,
          data: {
            type: 'features',
            title: 'Revolutionary Features',
            features: [
              {
                id: generateId(),
                icon: 'Rocket',
                title: '10x Performance',
                description: 'Faster than anything before',
              },
              {
                id: generateId(),
                icon: 'Award',
                title: 'Award-Winning Design',
                description: 'Beautiful inside and out',
              },
              {
                id: generateId(),
                icon: 'Clock',
                title: 'All-Day Battery',
                description: '24+ hours of continuous use',
              },
            ],
            layout: 'list',
          },
        },
        {
          id: generateId(),
          type: 'cta',
          order: 2,
          visible: true,
          data: {
            type: 'cta',
            headline: 'Be First in Line',
            subheadline: 'Limited quantities available',
            ctaText: 'Pre-order for $99',
            ctaUrl: '#preorder',
            style: 'gradient',
          },
        },
      ],
    },
    theme: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#ec4899',
      backgroundColor: '#0f0f0f',
      textColor: '#ffffff',
      fontFamily: 'poppins',
      borderRadius: 'lg',
    },
  },
];

export function getTemplateById(id: string): LandingTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getTemplatesByCategory(category: LandingTemplate['category']): LandingTemplate[] {
  return TEMPLATES.filter((t) => t.category === category);
}
