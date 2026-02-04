'use client';

import { Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function SaasTestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.title.split(' ').map((word, i, arr) =>
                i === Math.floor(arr.length / 2) ? (
                  <span key={i} className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-muted-foreground">{data.subtitle}</p>
          )}
        </div>

        {/* Testimonials grid - masonry-like */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="break-inside-avoid border-0 shadow-lg bg-background hover:shadow-xl transition-shadow"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${testimonial.author}`} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-blue-100 text-purple-600">
                    {testimonial.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">{testimonial.author}</CardTitle>
                  {testimonial.role && (
                    <CardDescription>{testimonial.role}</CardDescription>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {testimonial.rating && (
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating!
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
