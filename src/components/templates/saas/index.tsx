'use client';

import { SaasHeroSection } from './sections/HeroSection';
import { SaasFeaturesSection } from './sections/FeaturesSection';
import { SaasPricingSection } from './sections/PricingSection';
import { SaasTestimonialsSection } from './sections/TestimonialsSection';
import { SaasFAQSection } from './sections/FAQSection';
import { SaasCTASection } from './sections/CTASection';
import { SaasStatsSection } from './sections/StatsSection';

// Map section types to components
const SECTION_MAP: Record<string, React.ComponentType<{ data: any }>> = {
  hero: SaasHeroSection,
  features: SaasFeaturesSection,
  pricing: SaasPricingSection,
  testimonials: SaasTestimonialsSection,
  faq: SaasFAQSection,
  cta: SaasCTASection,
  stats: SaasStatsSection,
};

interface Section {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface SaasTemplateProps {
  sections: Section[];
}

export function SaasTemplate({ sections }: SaasTemplateProps) {
  return (
    <div className="min-h-screen bg-background">
      {sections.map((section) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) {
          console.warn(`Unknown section type: ${section.type}`);
          return null;
        }
        return <Component key={section.id} data={section.data} />;
      })}

      {/* Footer */}
      <footer className="py-8 border-t bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2026 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export { SaasHeroSection, SaasFeaturesSection, SaasPricingSection, SaasTestimonialsSection, SaasFAQSection, SaasCTASection, SaasStatsSection };
