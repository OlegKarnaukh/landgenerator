'use client';

import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Service {
  title: string;
  description: string;
  price?: string;
  duration?: string;
  image?: string;
}

interface ServicesData {
  title?: string;
  subtitle?: string;
  services: Service[];
}

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
  'https://images.unsplash.com/photo-1487412947147-5cebf1001294?w=400&q=80',
];

export function LifestyleServicesSection({ data }: { data: ServicesData }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg text-stone-600">{data.subtitle}</p>
          )}
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={service.image || DEFAULT_IMAGES[index % DEFAULT_IMAGES.length]}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-stone-800">{service.title}</CardTitle>
                  {service.price && (
                    <span className="text-xl font-bold text-amber-600">{service.price}</span>
                  )}
                </div>
                {service.duration && (
                  <span className="text-sm text-stone-500">{service.duration}</span>
                )}
              </CardHeader>

              <CardContent>
                <CardDescription className="text-base text-stone-600 mb-4">
                  {service.description}
                </CardDescription>
                <Button variant="link" className="p-0 h-auto text-amber-600 hover:text-amber-700">
                  Записаться <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
