'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  rating?: number;
  avatar?: string;
}

interface TestimonialsData {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
}

export function LocalTestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg text-slate-600">{data.subtitle}</p>
          )}
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.testimonials.map((testimonial, index) => (
            <Card key={index} className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-blue-100">
                    <AvatarImage src={testimonial.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.author}`} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {testimonial.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.author}</div>
                    {testimonial.role && (
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {testimonial.rating && (
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-blue-100" />
                  <p className="text-slate-600 leading-relaxed pl-4">
                    {testimonial.quote}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
