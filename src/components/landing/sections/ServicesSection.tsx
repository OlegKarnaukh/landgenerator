import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

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
  theme?: Theme;
}

export function ServicesSection({ data }: { data: ServicesData }) {
  const variant = data.variant || 'cards';
  const services = data.services || [];
  const theme = data.theme;
  const primaryColor = theme?.colors?.primary || '#3b82f6';
  const secondaryColor = theme?.colors?.secondary || '#8b5cf6';
  const bgColor = theme?.colors?.background || '#ffffff';
  const surfaceColor = theme?.colors?.surface || '#f9fafb';
  const textColor = theme?.colors?.text || '#111827';
  const textMutedColor = theme?.colors?.textMuted || '#6b7280';

  // Guard against empty services
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: bgColor }}>
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 animate-fade-up">
            {data.title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 theme-heading" style={{ color: textColor }}>
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className="text-xl max-w-2xl mx-auto" style={{ color: textMutedColor }}>
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'list' ? (
          <div className="max-w-3xl mx-auto divide-y" style={{ borderColor: `${textMutedColor}20` }}>
            {services.map((service, index) => {
              const IconComponent = service.icon ? (Icons as any)[service.icon] : Icons.Zap;
              return (
                <div
                  key={index}
                  className="py-6 flex items-start gap-4 -mx-4 px-4 rounded-lg transition-colors animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold" style={{ color: textColor }}>{service.title}</h3>
                      {service.price && (
                        <span className="text-lg font-bold whitespace-nowrap" style={{ color: primaryColor }}>{service.price}</span>
                      )}
                    </div>
                    <p style={{ color: textMutedColor }} className="mt-1">{service.description}</p>
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
                <div
                  key={index}
                  className="rounded-2xl p-8 hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ backgroundColor: surfaceColor, animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold" style={{ color: textColor }}>{service.title}</h3>
                      {service.price && (
                        <span className="text-2xl font-bold" style={{ color: primaryColor }}>{service.price}</span>
                      )}
                    </div>
                  </div>
                  <p style={{ color: textMutedColor }} className="mb-4">{service.description}</p>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ color: textMutedColor }}>
                          <Icons.Check className="h-5 w-5 flex-shrink-0" style={{ color: primaryColor }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  {service.ctaText && (
                    <a
                      href={service.ctaUrl || '#'}
                      className="inline-flex items-center font-semibold"
                      style={{ color: primaryColor }}
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
                <div
                  key={index}
                  className="group rounded-2xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-up"
                  style={{
                    backgroundColor: surfaceColor,
                    animationDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = surfaceColor;
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors group-hover:bg-white/20"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    <IconComponent className="h-7 w-7 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 transition-colors group-hover:text-white" style={{ color: textColor }}>
                    {service.title}
                  </h3>
                  {service.price && (
                    <p className="text-2xl font-bold mb-2 transition-colors group-hover:text-white" style={{ color: primaryColor }}>
                      {service.price}
                    </p>
                  )}
                  <p className="transition-colors group-hover:text-white/80" style={{ color: textMutedColor }}>
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
