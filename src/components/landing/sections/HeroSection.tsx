import { ArrowRight } from 'lucide-react';

interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  secondaryCtaUrl?: string;
  imageUrl?: string;
  imageKeyword?: string;
  variant?: 'centered' | 'image-bg' | 'split' | 'gradient';
}

// Generate Unsplash URL from keyword
function getImageUrl(keyword?: string, width = 1920, height = 1080): string {
  const searchTerm = keyword || 'business';
  return `https://images.unsplash.com/photo-1557804506-669a67965ba0?w=${width}&h=${height}&fit=crop`;
}

// Curated background images by category
const HERO_BACKGROUNDS: Record<string, string> = {
  auto: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&h=1080&fit=crop',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop',
  beauty: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop',
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&h=1080&fit=crop',
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop',
  medical: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&h=1080&fit=crop',
  education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop',
  realestate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop',
  consulting: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1920&h=1080&fit=crop',
  photography: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1920&h=1080&fit=crop',
  default: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop',
};

function getBackgroundImage(keyword?: string): string {
  if (!keyword) return HERO_BACKGROUNDS.default;
  const key = keyword.toLowerCase();
  for (const [category, url] of Object.entries(HERO_BACKGROUNDS)) {
    if (key.includes(category)) return url;
  }
  return HERO_BACKGROUNDS.default;
}

export function HeroSection({ data }: { data: HeroData }) {
  const variant = data.variant || 'centered';
  const bgImage = data.imageUrl || getBackgroundImage(data.imageKeyword);

  // Variant: Image Background (full-screen photo with overlay)
  if (variant === 'image-bg') {
    return (
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {data.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              {data.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={data.ctaUrl || '#contact'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-900 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              {data.secondaryCtaText && (
                <a
                  href={data.secondaryCtaUrl || '#'}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-xl hover:bg-white/10 transition-colors"
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

  // Variant: Split (text left, image right)
  if (variant === 'split') {
    return (
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {data.headline}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {data.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={data.ctaUrl || '#contact'}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
                >
                  {data.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                {data.secondaryCtaText && (
                  <a
                    href={data.secondaryCtaUrl || '#'}
                    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {data.secondaryCtaText}
                  </a>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20" />
              <img
                src={bgImage}
                alt=""
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Variant: Gradient (colorful gradient background)
  if (variant === 'gradient') {
    return (
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }} />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {data.headline}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              {data.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={data.ctaUrl || '#contact'}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              {data.secondaryCtaText && (
                <a
                  href={data.secondaryCtaUrl || '#'}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/50 rounded-xl hover:bg-white/10 transition-colors"
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

  // Default: Centered (dark gradient with orbs)
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
              href={data.ctaUrl || '#contact'}
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
