'use client';

import * as Icons from 'lucide-react';

interface Service {
  icon?: string;
  title: string;
  description: string;
  price?: string;
  duration?: string;
}

interface ServicesData {
  title?: string;
  subtitle?: string;
  services: Service[];
}

export function LocalServicesSection({ data }: { data: ServicesData }) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.Wrench;
    const Icon = (Icons as Record<string, any>)[iconName];
    return Icon || Icons.Wrench;
  };

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

        {/* Services list */}
        <div className="max-w-4xl mx-auto space-y-4">
          {data.services.map((service, index) => {
            const IconComponent = getIcon(service.icon);
            return (
              <div
                key={index}
                className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <IconComponent className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-800">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.description}</p>
                  {service.duration && (
                    <span className="text-xs text-slate-500">⏱ {service.duration}</span>
                  )}
                </div>

                {/* Price */}
                {service.price && (
                  <div className="text-right flex-shrink-0">
                    <div className="text-xl font-bold text-blue-600">{service.price}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
