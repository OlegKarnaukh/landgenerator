import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

interface Service {
  icon?: string;
  title: string;
  description: string;
  price?: string;
  features?: string[];
  ctaText?: string;
  ctaUrl?: string;
}

interface ServicesData {
  title?: string;
  subtitle?: string;
  services: Service[];
  variant?: 'cards' | 'list' | 'detailed';
}

export function ServicesSection({ data }: { data: ServicesData }) {
  const variant = data.variant || 'cards';
  const services = data.services || [];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'list' ? (
          <div className="max-w-3xl mx-auto divide-y divide-gray-100">
            {services.map((service, index) => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.Zap;
              return (
                <div key={index} className="py-6 flex items-start gap-4 hover:bg-gray-50 -mx-4 px-4 rounded-lg transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-gray-900">{service.title}</h3>
                      {service.price && (
                        <span className="text-lg font-bold text-blue-600 whitespace-nowrap">{service.price}</span>
                      )}
                    </div>
                    <p className="text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'detailed' ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.Zap;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white flex-shrink-0">
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                      {service.price && (
                        <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Icons.Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {service.ctaText && (
                    <a
                      href={service.ctaUrl || '#'}
                      className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                    >
                      {service.ctaText}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.Zap;
              return (
                <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:bg-blue-600 hover:shadow-xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-blue-100 group-hover:bg-white/20 flex items-center justify-center text-blue-600 group-hover:text-white mb-4 transition-colors">
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-white mb-2 transition-colors">
                    {service.title}
                  </h3>
                  {service.price && (
                    <p className="text-2xl font-bold text-blue-600 group-hover:text-white mb-2 transition-colors">
                      {service.price}
                    </p>
                  )}
                  <p className="text-gray-600 group-hover:text-blue-100 transition-colors">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
