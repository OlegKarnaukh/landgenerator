'use client';

import React from 'react';
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

interface Section {
  id: string;
  type: string;
  order: number;
  data: any;
  variant?: string;
}

interface LandingData {
  sections: Section[];
  theme?: {
    primary?: string;
    style?: 'modern' | 'classic' | 'bold' | 'minimal';
  };
}

interface LandingPreviewProps {
  sections: Section[];
  theme?: LandingData['theme'];
}

export function LandingPreview({ sections, theme }: LandingPreviewProps) {
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

  return (
    <div className="min-h-screen bg-white">
      {sortedSections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Made with LandGen.AI
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionRenderer({ section }: { section: Section }) {
  const { type, data, variant } = section;

  // Guard against missing data
  if (!type || !data) {
    return (
      <div className="py-12 bg-yellow-50 text-center text-yellow-600">
        Invalid section: missing type or data
      </div>
    );
  }

  // Pass variant into data for sections that support it
  const dataWithVariant = variant ? { ...data, variant } : data;

  const renderSection = () => {
    switch (type) {
      case 'hero':
        return <HeroSection data={dataWithVariant} />;
      case 'features':
        return <FeaturesSection data={dataWithVariant} />;
      case 'testimonials':
        return <TestimonialsSection data={dataWithVariant} />;
      case 'pricing':
        return <PricingSection data={dataWithVariant} />;
      case 'cta':
        return <CTASection data={dataWithVariant} />;
      case 'faq':
        return <FAQSection data={dataWithVariant} />;
      case 'stats':
        return <StatsSection data={dataWithVariant} />;
      case 'gallery':
        return <GallerySection data={dataWithVariant} />;
      case 'team':
        return <TeamSection data={dataWithVariant} />;
      case 'process':
        return <ProcessSection data={dataWithVariant} />;
      case 'services':
        return <ServicesSection data={dataWithVariant} />;
      case 'contact':
        return <ContactSection data={dataWithVariant} />;
      case 'partners':
        return <PartnersSection data={dataWithVariant} />;
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
