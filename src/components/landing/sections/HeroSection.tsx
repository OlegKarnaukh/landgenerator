import { ArrowRight } from 'lucide-react';

interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  imageUrl?: string;
}

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {data.headline}
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {data.subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={data.ctaUrl || '#'}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              {data.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>

            {data.secondaryCtaText && (
              <a
                href={data.secondaryCtaUrl || '#'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border border-white/20 rounded-xl hover:bg-white/10 transition-colors"
              >
                {data.secondaryCtaText}
              </a>
            )}
          </div>

          {/* Optional Image */}
          {data.imageUrl && (
            <div className="mt-16 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
              <img
                src={data.imageUrl}
                alt="Product preview"
                className="rounded-2xl shadow-2xl border border-white/10"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
