import * as Icons from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesData {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

export function FeaturesSection({ data }: { data: FeaturesData }) {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(data.features || []).map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;

  return (
    <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
        <IconComponent className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}
