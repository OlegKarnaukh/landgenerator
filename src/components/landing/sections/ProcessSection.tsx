import * as Icons from 'lucide-react';

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

interface ProcessStep {
  icon?: string;
  title: string;
  description: string;
}

interface ProcessData {
  title?: string;
  subtitle?: string;
  steps: ProcessStep[];
  variant?: 'timeline' | 'numbered' | 'cards';
  theme?: Theme;
}

export function ProcessSection({ data }: { data: ProcessData }) {
  const variant = data.variant || 'numbered';
  const steps = data.steps || [];
  const theme = data.theme;
  const primaryColor = theme?.colors?.primary || '#3b82f6';
  const bgColor = theme?.colors?.background || '#ffffff';
  const surfaceColor = theme?.colors?.surface || '#f9fafb';
  const textColor = theme?.colors?.text || '#111827';
  const textMutedColor = theme?.colors?.textMuted || '#6b7280';

  if (steps.length === 0) return null;

  return (
    <section className="py-20 md:py-28" style={{ backgroundColor: surfaceColor }}>
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

        {variant === 'timeline' ? (
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? (Icons as any)[step.icon] : null;
              return (
                <div
                  key={index}
                  className="relative pl-8 pb-12 last:pb-0 animate-fade-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div
                      className="absolute left-[15px] top-8 w-0.5 h-full"
                      style={{ backgroundColor: `${primaryColor}40` }}
                    />
                  )}
                  {/* Timeline dot */}
                  <div
                    className="absolute left-0 top-1 w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: textColor }}>
                      {IconComponent && <IconComponent className="h-5 w-5" style={{ color: primaryColor }} />}
                      {step.title}
                    </h3>
                    <p style={{ color: textMutedColor }}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : variant === 'cards' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? (Icons as any)[step.icon] : null;
              return (
                <div
                  key={index}
                  className="rounded-2xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden animate-fade-up"
                  style={{ backgroundColor: bgColor, animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute top-4 right-4 text-6xl font-bold" style={{ color: `${textMutedColor}20` }}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="relative">
                    {IconComponent && (
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>{step.title}</h3>
                    <p style={{ color: textMutedColor }}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon ? (Icons as any)[step.icon] : null;
                return (
                  <div
                    key={index}
                    className="flex gap-6 items-start animate-fade-up"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    <div
                      className="flex-shrink-0 w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl font-bold"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold mb-2 flex items-center gap-2" style={{ color: textColor }}>
                        {IconComponent && <IconComponent className="h-5 w-5" style={{ color: primaryColor }} />}
                        {step.title}
                      </h3>
                      <p style={{ color: textMutedColor }}>{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
