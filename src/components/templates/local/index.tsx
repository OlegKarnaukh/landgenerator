'use client';

import { LocalHeroSection } from './sections/HeroSection';
import { LocalServicesSection } from './sections/ServicesSection';
import { LocalProcessSection } from './sections/ProcessSection';
import { LocalTestimonialsSection } from './sections/TestimonialsSection';
import { LocalFAQSection } from './sections/FAQSection';
import { LocalContactSection } from './sections/ContactSection';
import { LocalStatsSection } from './sections/StatsSection';

// Map section types to components
const SECTION_MAP: Record<string, React.ComponentType<{ data: any }>> = {
  hero: LocalHeroSection,
  services: LocalServicesSection,
  process: LocalProcessSection,
  testimonials: LocalTestimonialsSection,
  faq: LocalFAQSection,
  contact: LocalContactSection,
  stats: LocalStatsSection,
};

interface Section {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface LocalTemplateProps {
  sections: Section[];
}

export function LocalTemplate({ sections }: LocalTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {sections.map((section) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) {
          console.warn(`Unknown section type in Local template: ${section.type}`);
          return null;
        }
        return <Component key={section.id} data={section.data} />;
      })}

      {/* Footer */}
      <footer className="py-6 bg-slate-800 text-white">
        <div className="container mx-auto px-4 text-center text-slate-400">
          <p>© 2026 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export {
  LocalHeroSection,
  LocalServicesSection,
  LocalProcessSection,
  LocalTestimonialsSection,
  LocalFAQSection,
  LocalContactSection,
  LocalStatsSection,
};
