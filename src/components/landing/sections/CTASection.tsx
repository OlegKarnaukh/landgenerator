import { ArrowRight } from 'lucide-react';

interface CTAData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  style?: 'gradient' | 'simple' | 'dark';
}

export function CTASection({ data }: { data: CTAData }) {
  const style = data.style || 'gradient';

  const bgClasses = {
    gradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    simple: 'bg-blue-600',
    dark: 'bg-gray-900',
  };

  return (
    <section className={`py-20 md:py-28 ${bgClasses[style]}`}>
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

          <a
            href={data.ctaUrl || '#'}
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
