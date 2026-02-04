'use client';

import React, { useEffect } from 'react';
import { HeroSection } from './sections/HeroSection';
import { FeaturesSection } from './sections/FeaturesSection';
import { TestimonialsSection } from './sections/TestimonialsSection';
import { PricingSection } from './sections/PricingSection';
import { CTASection } from './sections/CTASection';
import { FAQSection } from './sections/FAQSection';
import { StatsSection } from './sections/StatsSection';
import { GallerySection } from './sections/GallerySection';
import { TeamSection } from './sections/TeamSection';
import { ProcessSection } from './sections/ProcessSection';
import { ServicesSection } from './sections/ServicesSection';
import { ContactSection } from './sections/ContactSection';
import { PartnersSection } from './sections/PartnersSection';

// Error Boundary for individual sections
class SectionErrorBoundary extends React.Component<
  { children: React.ReactNode; sectionType: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; sectionType: string }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="py-12 bg-red-50 text-center">
          <p className="text-red-600">Error rendering section: {this.props.sectionType}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Theme interface
interface Theme {
  preset?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textMuted?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  style?: {
    borderRadius?: string;
    heroStyle?: string;
  };
}

interface Section {
  id: string;
  type: string;
  order: number;
  data: any;
  variant?: string;
}

interface LandingPreviewProps {
  sections: Section[];
  theme?: Theme;
  description?: string;
}

// Generate Google Fonts URL
function getFontsUrl(theme?: Theme): string | null {
  if (!theme?.fonts) return null;

  const fonts = [theme.fonts.heading, theme.fonts.body]
    .filter((f): f is string => !!f && f !== 'Inter' && f !== 'Roboto')
    .filter((f, i, arr) => arr.indexOf(f) === i)
    .map(f => f.replace(/ /g, '+'));

  if (fonts.length === 0) return null;

  return `https://fonts.googleapis.com/css2?family=${fonts.join('&family=')}:wght@400;500;600;700;800&display=swap`;
}

// Generate CSS variables from theme
function getThemeStyles(theme?: Theme): React.CSSProperties {
  if (!theme?.colors) return {};

  return {
    '--color-primary': theme.colors.primary || '#3b82f6',
    '--color-secondary': theme.colors.secondary || '#6366f1',
    '--color-accent': theme.colors.accent || '#f472b6',
    '--color-background': theme.colors.background || '#ffffff',
    '--color-surface': theme.colors.surface || '#f9fafb',
    '--color-text': theme.colors.text || '#111827',
    '--color-text-muted': theme.colors.textMuted || '#6b7280',
    '--font-heading': theme.fonts?.heading ? `'${theme.fonts.heading}', sans-serif` : 'inherit',
    '--font-body': theme.fonts?.body ? `'${theme.fonts.body}', sans-serif` : 'inherit',
  } as React.CSSProperties;
}

export function LandingPreview({
  sections,
  theme,
  description,
}: LandingPreviewProps) {
  // Load custom fonts
  useEffect(() => {
    const fontsUrl = getFontsUrl(theme);
    if (fontsUrl) {
      const link = document.createElement('link');
      link.href = fontsUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [theme]);

  // Guard against undefined or non-array sections
  if (!sections || !Array.isArray(sections) || sections.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center p-8">
          <p className="text-gray-500 text-lg">No sections to display</p>
          <p className="text-gray-400 text-sm mt-2">Try generating the landing page again</p>
        </div>
      </div>
    );
  }

  const sortedSections = [...sections].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const themeStyles = getThemeStyles(theme);
  const bgColor = theme?.colors?.background || '#ffffff';
  const textColor = theme?.colors?.text || '#111827';

  return (
    <div
      className="min-h-screen"
      style={{
        ...themeStyles,
        backgroundColor: bgColor,
        color: textColor,
        fontFamily: theme?.fonts?.body ? `'${theme.fonts.body}', sans-serif` : 'inherit',
      }}
    >
      {/* Global theme styles */}
      <style jsx global>{`
        .theme-heading {
          font-family: ${theme?.fonts?.heading ? `'${theme.fonts.heading}', sans-serif` : 'inherit'};
        }
        .theme-body {
          font-family: ${theme?.fonts?.body ? `'${theme.fonts.body}', sans-serif` : 'inherit'};
        }
        .theme-primary {
          color: ${theme?.colors?.primary || '#3b82f6'};
        }
        .theme-primary-bg {
          background-color: ${theme?.colors?.primary || '#3b82f6'};
        }
        .theme-accent {
          color: ${theme?.colors?.accent || '#f472b6'};
        }
        .theme-accent-bg {
          background-color: ${theme?.colors?.accent || '#f472b6'};
        }
        .theme-surface {
          background-color: ${theme?.colors?.surface || '#f9fafb'};
        }
        .theme-text-muted {
          color: ${theme?.colors?.textMuted || '#6b7280'};
        }

        /* Animation classes */
        .animate-fade-up {
          animation: fadeUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-up-delay-1 { animation-delay: 0.1s; }
        .animate-fade-up-delay-2 { animation-delay: 0.2s; }
        .animate-fade-up-delay-3 { animation-delay: 0.3s; }
        .animate-fade-up-delay-4 { animation-delay: 0.4s; }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {sortedSections.map((section, index) => (
        <SectionRenderer
          key={section.id}
          section={section}
          theme={theme}
          index={index}
        />
      ))}

      {/* Footer */}
      <footer
        className="py-12"
        style={{
          backgroundColor: theme?.colors?.text || '#111827',
          color: theme?.colors?.background || '#ffffff'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p style={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="text-sm mt-2" style={{ opacity: 0.4 }}>
            Made with LandGen.AI
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionRenderer({
  section,
  theme,
  index
}: {
  section: Section;
  theme?: Theme;
  index: number;
}) {
  const { type, data, variant } = section;

  // Guard against missing data
  if (!type || !data) {
    return (
      <div className="py-12 bg-yellow-50 text-center text-yellow-600">
        Invalid section: missing type or data
      </div>
    );
  }

  // Pass variant and theme into data for sections that support it
  const enhancedData = {
    ...data,
    variant,
    theme,
    animationDelay: index * 0.1
  };

  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection data={enhancedData} />;
      case 'features':
        return <FeaturesSection data={enhancedData} />;
      case 'testimonials':
        return <TestimonialsSection data={enhancedData} />;
      case 'pricing':
        return <PricingSection data={enhancedData} />;
      case 'cta':
        return <CTASection data={enhancedData} />;
      case 'faq':
        return <FAQSection data={enhancedData} />;
      case 'stats':
        return <StatsSection data={enhancedData} />;
      case 'gallery':
        return <GallerySection data={enhancedData} />;
      case 'team':
        return <TeamSection data={enhancedData} />;
      case 'process':
        return <ProcessSection data={enhancedData} />;
      case 'services':
        return <ServicesSection data={enhancedData} />;
      case 'contact':
        return <ContactSection data={enhancedData} />;
      case 'partners':
        return <PartnersSection data={enhancedData} />;
      default:
        return (
          <div className="py-12 bg-gray-100 text-center text-gray-500">
            Unknown section type: {type}
          </div>
        );
    }
  };

  return (
    <SectionErrorBoundary sectionType={type}>
      {renderSection()}
    </SectionErrorBoundary>
  );
}
