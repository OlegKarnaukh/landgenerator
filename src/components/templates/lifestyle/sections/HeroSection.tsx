'use client';

import { ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Curated images by category
const HERO_IMAGES: Record<string, string[]> = {
  restaurant: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1920&q=80',
  ],
  beauty: [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80',
  ],
  spa: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1920&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
  ],
};

interface HeroData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  imageKeyword?: string;
  address?: string;
  workingHours?: string;
  phone?: string;
}

export function LifestyleHeroSection({ data }: { data: HeroData }) {
  const category = data.imageKeyword || 'default';
  const images = HERO_IMAGES[category] || HERO_IMAGES.default;
  const bgImage = images[0];

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          {/* Quick info badges */}
          <div className="flex flex-wrap gap-4 mb-8">
            {data.address && (
              <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                {data.address}
              </div>
            )}
            {data.workingHours && (
              <div className="flex items-center gap-2 text-white/80 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                {data.workingHours}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {data.headline}
          </h1>

          {data.subheadline && (
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              {data.subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-amber-500 hover:bg-amber-600 text-white border-0"
            >
              {data.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            {data.phone && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="mr-2 h-5 w-5" />
                {data.phone}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
