'use client';

import { LifestyleHeroSection } from './sections/HeroSection';
import { LifestyleGallerySection } from './sections/GallerySection';
import { LifestyleServicesSection } from './sections/ServicesSection';
import { LifestyleTestimonialsSection } from './sections/TestimonialsSection';
import { LifestyleContactSection } from './sections/ContactSection';
import { LifestyleFeaturesSection } from './sections/FeaturesSection';

// Map section types to components
const SECTION_MAP: Record<string, React.ComponentType<{ data: any }>> = {
  hero: LifestyleHeroSection,
  gallery: LifestyleGallerySection,
  services: LifestyleServicesSection,
  testimonials: LifestyleTestimonialsSection,
  contact: LifestyleContactSection,
  features: LifestyleFeaturesSection,
};

interface Section {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface LifestyleTemplateProps {
  sections: Section[];
}

export function LifestyleTemplate({ sections }: LifestyleTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {sections.map((section) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) {
          console.warn(`Unknown section type in Lifestyle template: ${section.type}`);
          return null;
        }
        return <Component key={section.id} data={section.data} />;
      })}

      {/* Footer */}
      <footer className="py-8 bg-stone-900 text-white">
        <div className="container mx-auto px-4 text-center text-stone-400">
          <p>© 2026 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export {
  LifestyleHeroSection,
  LifestyleGallerySection,
  LifestyleServicesSection,
  LifestyleTestimonialsSection,
  LifestyleContactSection,
  LifestyleFeaturesSection,
};
