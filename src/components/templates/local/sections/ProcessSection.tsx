'use client';

import * as Icons from 'lucide-react';

interface Step {
  icon?: string;
  title: string;
  description: string;
}

interface ProcessData {
  title?: string;
  subtitle?: string;
  steps: Step[];
}

export function LocalProcessSection({ data }: { data: ProcessData }) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.Circle;
    const Icon = (Icons as Record<string, any>)[iconName];
    return Icon || Icons.Circle;
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-lg text-slate-600">{data.subtitle}</p>
          )}
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden md:block" />

            <div className="space-y-8">
              {data.steps.map((step, index) => {
                const IconComponent = getIcon(step.icon);
                return (
                  <div key={index} className="flex items-start gap-6 relative">
                    {/* Number circle */}
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold z-10">
                      {index + 1}
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 shadow-sm flex-grow">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-slate-600">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
