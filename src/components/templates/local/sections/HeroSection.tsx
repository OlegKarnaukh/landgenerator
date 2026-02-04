'use client';

import { ArrowRight, Phone, Clock, MapPin, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HERO_IMAGES: Record<string, string> = {
  auto: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1920&q=80',
  medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80',
  repair: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
  construction: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80',
  default: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920&q=80',
};

interface HeroData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  phone?: string;
  address?: string;
  workingHours?: string;
  imageKeyword?: string;
  badges?: string[];
}

export function LocalHeroSection({ data }: { data: HeroData }) {
  const bgImage = HERO_IMAGES[data.imageKeyword || 'default'] || HERO_IMAGES.default;

  return (
    <section className="relative bg-slate-900">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />

      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Trust badges */}
            {data.badges && data.badges.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {data.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-2 text-sm text-blue-300"
                  >
                    <Shield className="w-4 h-4" />
                    {badge}
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {data.headline}
            </h1>

            {data.subheadline && (
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                {data.subheadline}
              </p>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {data.phone && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-slate-600 text-white hover:bg-slate-800"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  {data.phone}
                </Button>
              )}
            </div>

            {/* Quick info */}
            <div className="flex flex-wrap gap-6 text-slate-400">
              {data.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-500" />
                  {data.address}
                </div>
              )}
              {data.workingHours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  {data.workingHours}
                </div>
              )}
            </div>
          </div>

          {/* Right: Trust card */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Почему нам доверяют</h3>
              <div className="space-y-4">
                {[
                  'Фиксированные цены без сюрпризов',
                  'Гарантия на все виды работ',
                  'Опытные специалисты',
                  'Современное оборудование',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">4.9</div>
                    <div className="text-sm text-slate-500">Рейтинг на Яндекс</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-800">2000+</div>
                    <div className="text-sm text-slate-500">Довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
