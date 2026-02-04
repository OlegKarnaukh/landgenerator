'use client';

import { Star, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function LifestyleTestimonialsSection({ data }: { data: TestimonialsData }) {
  // Show one large featured testimonial
  const featured = data.testimonials[0];
  const others = data.testimonials.slice(1, 4);

  return (
    <section className="py-20 bg-stone-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg text-stone-400">{data.subtitle}</p>
          )}
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Featured testimonial */}
          {featured && (
            <div className="relative bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 mb-8">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-white/20" />
              <div className="relative z-10">
                {featured.rating && (
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < featured.rating! ? 'text-white fill-white' : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                  "{featured.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white text-lg">{featured.author}</div>
                  {featured.role && (
                    <div className="text-white/70">{featured.role}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other testimonials */}
          {others.length > 0 && (
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-stone-800 rounded-2xl p-6 border border-stone-700"
                >
                  {testimonial.rating && (
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < testimonial.rating! ? 'text-amber-500 fill-amber-500' : 'text-stone-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <p className="text-stone-300 mb-4 leading-relaxed">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    {testimonial.role && (
                      <div className="text-stone-500 text-sm">{testimonial.role}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
