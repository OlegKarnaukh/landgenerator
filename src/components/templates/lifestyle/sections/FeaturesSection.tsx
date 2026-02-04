'use client';

import * as Icons from 'lucide-react';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesData {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

export function LifestyleFeaturesSection({ data }: { data: FeaturesData }) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.Heart;
    const Icon = (Icons as Record<string, any>)[iconName];
    return Icon || Icons.Heart;
  };

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

        {/* Features - alternating layout */}
        <div className="max-w-4xl mx-auto space-y-12">
          {data.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-amber-600" />
                  </div>
                </div>

                {/* Content */}
                <div className={`text-center md:text-left ${isEven ? '' : 'md:text-right'}`}>
                  <h3 className="text-2xl font-bold text-stone-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
