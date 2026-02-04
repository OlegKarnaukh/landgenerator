'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
}

export function SaasCTASection({ data }: { data: CTAData }) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            Начните прямо сейчас
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {data.headline}
          </h2>

          {data.subheadline && (
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              {data.subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 bg-white text-purple-600 hover:bg-gray-100 shadow-xl"
            >
              {data.ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {data.secondaryCtaText && (
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white/30 text-white hover:bg-white/10"
              >
                {data.secondaryCtaText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
