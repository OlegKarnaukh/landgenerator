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
  testimonials: Testimonial[];
}

export function TestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        {data.title && (
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {data.title}
            </h2>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(data.testimonials || []).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
      <Quote className="h-8 w-8 text-blue-200 mb-4" />

      {testimonial.rating && (
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating!
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <p className="text-gray-700 mb-6 leading-relaxed">
        "{testimonial.quote}"
      </p>

      <div className="flex items-center gap-4">
        {testimonial.avatarUrl ? (
          <img
            src={testimonial.avatarUrl}
            alt={testimonial.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {testimonial.author.charAt(0)}
          </div>
        )}

        <div>
          <p className="font-semibold text-gray-900">{testimonial.author}</p>
          {(testimonial.role || testimonial.company) && (
            <p className="text-sm text-gray-500">
              {testimonial.role}
              {testimonial.role && testimonial.company && ' at '}
              {testimonial.company}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
