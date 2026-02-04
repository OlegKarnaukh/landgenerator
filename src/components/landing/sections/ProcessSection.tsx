import * as Icons from 'lucide-react';

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
}

export function ProcessSection({ data }: { data: ProcessData }) {
  const variant = data.variant || 'numbered';
  const steps = data.steps || [];

  return (
    <section className="py-20 md:py-28 bg-gray-50">
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

        {variant === 'timeline' ? (
          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => {
              const IconComponent = step.icon ? (Icons as any)[step.icon] : null;
              return (
                <div key={index} className="relative pl-8 pb-12 last:pb-0">
                  {/* Timeline line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-0.5 h-full bg-blue-200" />
                  )}
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
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
                <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-100">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <div className="relative">
                    {IconComponent && (
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                        <IconComponent className="h-6 w-6" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
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
                  <div key={index} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
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
