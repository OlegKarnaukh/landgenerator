import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  variant?: 'cards' | 'large' | 'minimal' | 'dark' | 'marquee';
}

export function TestimonialsSection({ data }: { data: TestimonialsData }) {
  const variant = data.variant || 'cards';
  const testimonials = data.testimonials || [];

  if (variant === 'large' && testimonials.length > 0) {
    return <LargeTestimonial data={data} testimonial={testimonials[0]} />;
  }

  if (variant === 'minimal') {
    return <MinimalTestimonials data={data} testimonials={testimonials} />;
  }

  if (variant === 'dark') {
    return <DarkTestimonials data={data} testimonials={testimonials} />;
  }

  if (variant === 'marquee') {
    return <MarqueeTestimonials data={data} testimonials={testimonials} />;
  }

  // Default: cards
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{data.title}</h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
            )}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Card variant (default)
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
      <Quote className="h-8 w-8 text-blue-200 mb-4" />
      {testimonial.rating && <StarRating rating={testimonial.rating} />}
      <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      <AuthorInfo testimonial={testimonial} />
    </div>
  );
}

// Large single testimonial
function LargeTestimonial({ data, testimonial }: { data: TestimonialsData; testimonial: Testimonial }) {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-16 w-16 text-white/30 mx-auto mb-8" />
          <p className="text-2xl md:text-4xl text-white font-medium leading-relaxed mb-12">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-4">
            {testimonial.avatarUrl ? (
              <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-16 h-16 rounded-full object-cover border-4 border-white/20" />
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
function MinimalTestimonials({ data, testimonials }: { data: TestimonialsData; testimonials: Testimonial[] }) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">{data.title}</h2>
        )}
        <div className="max-w-4xl mx-auto space-y-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="font-semibold text-gray-900">{testimonial.author}</span>
                {testimonial.role && (
                  <>
                    <div className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="text-gray-500">{testimonial.role}</span>
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
function DarkTestimonials({ data, testimonials }: { data: TestimonialsData; testimonials: Testimonial[] }) {
  return (
    <section className="py-20 md:py-28 bg-gray-900">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16">
            {data.title && <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{data.title}</h2>}
            {data.subtitle && <p className="text-xl text-gray-400 max-w-2xl mx-auto">{data.subtitle}</p>}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-8 rounded-2xl border border-gray-700">
              {testimonial.rating && <StarRating rating={testimonial.rating} />}
              <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  {testimonial.role && <p className="text-sm text-gray-500">{testimonial.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Marquee style - horizontal scroll effect
function MarqueeTestimonials({ data, testimonials }: { data: TestimonialsData; testimonials: Testimonial[] }) {
  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        {data.title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">{data.title}</h2>}
      </div>
      <div className="flex gap-6 animate-marquee">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div key={index} className="flex-shrink-0 w-96 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-700 mb-4 line-clamp-4">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {testimonial.author.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                {testimonial.role && <p className="text-xs text-gray-500">{testimonial.role}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Shared components
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

function AuthorInfo({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex items-center gap-4">
      {testimonial.avatarUrl ? (
        <img src={testimonial.avatarUrl} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover" />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
          {testimonial.author.charAt(0)}
        </div>
      )}
      <div>
        <p className="font-semibold text-gray-900">{testimonial.author}</p>
        {(testimonial.role || testimonial.company) && (
          <p className="text-sm text-gray-500">
            {testimonial.role}{testimonial.role && testimonial.company && ' · '}{testimonial.company}
          </p>
        )}
      </div>
    </div>
  );
}
