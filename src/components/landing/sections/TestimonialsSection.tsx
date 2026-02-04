import { Star, Quote } from 'lucide-react';

interface Theme {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textMuted?: string;
  };
}

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: 'cards' | 'large' | 'minimal' | 'dark' | 'marquee';
  theme?: Theme;
}

export function TestimonialsSection({ data }: { data: TestimonialsData }) {
  const variant = data.variant || 'cards';
  const testimonials = data.testimonials || [];
  const theme = data.theme;
  const primaryColor = theme?.colors?.primary || '#3b82f6';
  const secondaryColor = theme?.colors?.secondary || '#8b5cf6';
  const bgColor = theme?.colors?.background || '#ffffff';
  const surfaceColor = theme?.colors?.surface || '#f9fafb';
  const textColor = theme?.colors?.text || '#111827';
  const textMutedColor = theme?.colors?.textMuted || '#6b7280';

  if (testimonials.length === 0) return null;

  if (variant === 'large' && testimonials.length > 0) {
    return <LargeTestimonial data={data} testimonial={testimonials[0]} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }

  if (variant === 'minimal') {
    return <MinimalTestimonials data={data} testimonials={testimonials} bgColor={bgColor} textColor={textColor} textMutedColor={textMutedColor} />;
  }

  if (variant === 'dark') {
    return <DarkTestimonials data={data} testimonials={testimonials} primaryColor={primaryColor} secondaryColor={secondaryColor} />;
  }

  if (variant === 'marquee') {
    return <MarqueeTestimonials data={data} testimonials={testimonials} primaryColor={primaryColor} secondaryColor={secondaryColor} surfaceColor={surfaceColor} textColor={textColor} textMutedColor={textMutedColor} />;
  }

  // Default: cards
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: surfaceColor }}>
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 animate-fade-up">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-heading" style={{ color: textColor }}>{data.title}</h2>
            )}
            {data.subtitle && (
              <p className="text-xl max-w-2xl mx-auto" style={{ color: textMutedColor }}>{data.subtitle}</p>
            )}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              bgColor={bgColor}
              textColor={textColor}
              textMutedColor={textMutedColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Card variant (default)
function TestimonialCard({
  testimonial,
  index,
  primaryColor,
  secondaryColor,
  bgColor,
  textColor,
  textMutedColor
}: {
  testimonial: Testimonial;
  index: number;
  primaryColor: string;
  secondaryColor: string;
  bgColor: string;
  textColor: string;
  textMutedColor: string;
}) {
  const avatarUrl = testimonial.avatarUrl || testimonial.avatar;
  return (
    <div
      className="p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow animate-fade-up"
      style={{ backgroundColor: bgColor, animationDelay: `${index * 0.1}s` }}
    >
      <Quote className="h-8 w-8 mb-4" style={{ color: `${primaryColor}40` }} />
      {testimonial.rating && <StarRating rating={testimonial.rating} primaryColor={primaryColor} />}
      <p className="mb-6 leading-relaxed" style={{ color: textMutedColor }}>&ldquo;{testimonial.quote}&rdquo;</p>
      <AuthorInfo testimonial={testimonial} avatarUrl={avatarUrl} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} textMutedColor={textMutedColor} />
    </div>
  );
}

// Large single testimonial
function LargeTestimonial({
  data,
  testimonial,
  primaryColor,
  secondaryColor
}: {
  data: TestimonialsData;
  testimonial: Testimonial;
  primaryColor: string;
  secondaryColor: string;
}) {
  const avatarUrl = testimonial.avatarUrl || testimonial.avatar;
  return (
    <section
      className="py-24 md:py-32"
      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <Quote className="h-16 w-16 text-white/30 mx-auto mb-8" />
          <p className="text-2xl md:text-4xl text-white font-medium leading-relaxed mb-12">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            {avatarUrl ? (
              <img src={avatarUrl} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover border-4 border-white/20" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold">
                {testimonial.author.charAt(0)}
              </div>
            )}
            <div className="text-left">
              <p className="text-xl font-semibold text-white">{testimonial.author}</p>
              {(testimonial.role || testimonial.company) && (
                <p className="text-white/70">
                  {testimonial.role}{testimonial.role && testimonial.company && ', '}{testimonial.company}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Minimal - simple, no cards
function MinimalTestimonials({
  data,
  testimonials,
  bgColor,
  textColor,
  textMutedColor
}: {
  data: TestimonialsData;
  testimonials: Testimonial[];
  bgColor: string;
  textColor: string;
  textMutedColor: string;
}) {
  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 theme-heading animate-fade-up" style={{ color: textColor }}>{data.title}</h2>
        )}
        <div className="max-w-4xl mx-auto space-y-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <p className="text-xl md:text-2xl leading-relaxed mb-8" style={{ color: textMutedColor }}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-1 h-1 rounded-full" style={{ backgroundColor: textMutedColor }} />
                <span className="font-semibold" style={{ color: textColor }}>{testimonial.author}</span>
                {testimonial.role && (
                  <>
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: textMutedColor }} />
                    <span style={{ color: textMutedColor }}>{testimonial.role}</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dark background
function DarkTestimonials({
  data,
  testimonials,
  primaryColor,
  secondaryColor
}: {
  data: TestimonialsData;
  testimonials: Testimonial[];
  primaryColor: string;
  secondaryColor: string;
}) {
  return (
    <section className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 animate-fade-up">
            {data.title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 theme-heading">{data.title}</h2>}
            {data.subtitle && <p className="text-xl text-gray-400 max-w-2xl mx-auto">{data.subtitle}</p>}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => {
            const avatarUrl = testimonial.avatarUrl || testimonial.avatar;
            return (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {testimonial.rating && <StarRating rating={testimonial.rating} primaryColor={primaryColor} />}
                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-4">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                    >
                      {testimonial.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{testimonial.author}</p>
                    {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Marquee style - horizontal scroll effect
function MarqueeTestimonials({
  data,
  testimonials,
  primaryColor,
  secondaryColor,
  surfaceColor,
  textColor,
  textMutedColor
}: {
  data: TestimonialsData;
  testimonials: Testimonial[];
  primaryColor: string;
  secondaryColor: string;
  surfaceColor: string;
  textColor: string;
  textMutedColor: string;
}) {
  return (
    <section className="py-20 md:py-28 overflow-hidden" style={{ backgroundColor: surfaceColor }}>
      <div className="container mx-auto px-4 mb-12">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center theme-heading animate-fade-up" style={{ color: textColor }}>{data.title}</h2>
        )}
      </div>
      <div className="flex gap-6 animate-marquee">
        {[...testimonials, ...testimonials].map((testimonial, index) => {
          const avatarUrl = testimonial.avatarUrl || testimonial.avatar;
          return (
            <div key={index} className="flex-shrink-0 w-96 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <p className="mb-4 line-clamp-4" style={{ color: textMutedColor }}>&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
                  >
                    {testimonial.author.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm" style={{ color: textColor }}>{testimonial.author}</p>
                  {testimonial.role && <p className="text-xs" style={{ color: textMutedColor }}>{testimonial.role}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Shared components
function StarRating({ rating, primaryColor }: { rating: number; primaryColor: string }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-5 w-5"
          style={{
            color: i < rating ? '#facc15' : '#e5e7eb',
            fill: i < rating ? '#facc15' : 'transparent'
          }}
        />
      ))}
    </div>
  );
}

function AuthorInfo({
  testimonial,
  avatarUrl,
  primaryColor,
  secondaryColor,
  textColor,
  textMutedColor
}: {
  testimonial: Testimonial;
  avatarUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  textMutedColor: string;
}) {
  return (
    <div className="flex items-center gap-4">
      {avatarUrl ? (
        <img src={avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          {testimonial.author.charAt(0)}
        </div>
      )}
      <div>
        <p className="font-semibold" style={{ color: textColor }}>{testimonial.author}</p>
        {(testimonial.role || testimonial.company) && (
          <p className="text-sm" style={{ color: textMutedColor }}>
            {testimonial.role}{testimonial.role && testimonial.company && ' · '}{testimonial.company}
          </p>
        )}
      </div>
    </div>
  );
}
