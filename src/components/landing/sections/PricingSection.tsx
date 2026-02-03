import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  currency?: string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
  ctaText: string;
  ctaUrl?: string;
}

interface PricingData {
  title?: string;
  subtitle?: string;
  plans: Plan[];
}

export function PricingSection({ data }: { data: PricingData }) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {data.plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan }: { plan: Plan }) {
  const isHighlighted = plan.highlighted;

  return (
    <div
      className={`relative p-8 rounded-2xl border-2 transition-all ${
        isHighlighted
          ? 'border-blue-600 bg-blue-50/50 scale-105 shadow-xl'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg'
      }`}
    >
      {isHighlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 rounded-full bg-blue-600 text-white text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        {plan.description && (
          <p className="text-gray-600 text-sm">{plan.description}</p>
        )}
      </div>

      <div className="text-center mb-8">
        <span className="text-5xl font-bold text-gray-900">
          ${plan.price}
        </span>
        <span className="text-gray-500 ml-1">
          /{plan.period || 'mo'}
        </span>
      </div>

      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1">
              <Check className={`h-5 w-5 ${isHighlighted ? 'text-blue-600' : 'text-green-500'}`} />
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.ctaUrl || '#'}
        className={`block w-full py-4 rounded-xl font-semibold text-center transition-colors ${
          isHighlighted
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        {plan.ctaText}
      </a>
    </div>
  );
}
