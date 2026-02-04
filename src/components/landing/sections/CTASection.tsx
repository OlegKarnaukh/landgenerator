import { ArrowRight, Check, Sparkles, Zap } from 'lucide-react';

interface CTAData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  features?: string[];
  variant?: 'gradient' | 'simple' | 'dark' | 'split' | 'minimal' | 'boxed' | 'animated';
}

export function CTASection({ data }: { data: CTAData }) {
  const variant = data.variant || 'gradient';

  if (variant === 'split') {
    return <SplitCTA data={data} />;
  }

  if (variant === 'minimal') {
    return <MinimalCTA data={data} />;
  }

  if (variant === 'boxed') {
    return <BoxedCTA data={data} />;
  }

  if (variant === 'animated') {
    return <AnimatedCTA data={data} />;
  }

  if (variant === 'dark') {
    return <DarkCTA data={data} />;
  }

  if (variant === 'simple') {
    return <SimpleCTA data={data} />;
  }

  // Gradient (default)
  return (
    <section className="py-20 md:py-28 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.headline}
          </h2>

          {data.subheadline && (
            <p className="text-xl text-white/80 mb-8">
              {data.subheadline}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={data.ctaUrl || '#'}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            >
              {data.ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            {data.secondaryCtaText && (
              <a
                href={data.secondaryCtaUrl || '#'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transition-colors"
              >
                {data.secondaryCtaText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Simple - solid color
function SimpleCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 md:py-28 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-blue-100 mb-8">{data.subheadline}</p>
          )}
          <a
            href={data.ctaUrl || '#'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Dark background
function DarkCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-gray-400 mb-8">{data.subheadline}</p>
          )}
          <a
            href={data.ctaUrl || '#'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Split - left text, right features
function SplitCTA({ data }: { data: CTAData }) {
  const features = data.features || [];
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {data.headline}
            </h2>
            {data.subheadline && (
              <p className="text-xl text-gray-400 mb-8">{data.subheadline}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.ctaUrl || '#'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              {data.secondaryCtaText && (
                <a
                  href={data.secondaryCtaUrl || '#'}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border border-gray-600 rounded-xl hover:bg-gray-700 transition-colors"
                >
                  {data.secondaryCtaText}
                </a>
              )}
            </div>
          </div>
          {features.length > 0 && (
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <p className="text-white/60 uppercase tracking-wider text-sm mb-6">Что вы получите</p>
              <ul className="space-y-4">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Minimal - no background, clean
function MinimalCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-gray-600 mb-8">{data.subheadline}</p>
          )}
          <a
            href={data.ctaUrl || '#'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Boxed - card style
function BoxedCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
          <Sparkles className="h-12 w-12 text-yellow-300 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">{data.subheadline}</p>
          )}
          <a
            href={data.ctaUrl || '#'}
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Animated - with visual effects
function AnimatedCTA({ data }: { data: CTAData }) {
  return (
    <section className="py-20 md:py-28 bg-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-400 text-sm mb-6">
            <Zap className="h-4 w-4" />
            Начните прямо сейчас
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {data.headline}
          </h2>
          {data.subheadline && (
            <p className="text-xl text-gray-400 mb-8">{data.subheadline}</p>
          )}
          <a
            href={data.ctaUrl || '#'}
            className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
