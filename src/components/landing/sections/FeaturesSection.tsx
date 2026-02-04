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
  variant?: 'grid' | 'list' | 'minimal' | 'alternating' | 'centered';
}

export function FeaturesSection({ data }: { data: FeaturesData }) {
  const variant = data.variant || 'grid';
  const features = data.features || [];

  return (
    <section className={`py-20 md:py-28 ${variant === 'alternating' ? 'bg-white' : variant === 'minimal' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className={`text-center mb-16 ${variant === 'minimal' ? 'text-white' : ''}`}>
            {data.title && (
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${variant === 'minimal' ? 'text-white' : 'text-gray-900'}`}>
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p className={`text-xl max-w-2xl mx-auto ${variant === 'minimal' ? 'text-gray-400' : 'text-gray-600'}`}>
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'list' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {features.map((feature, index) => (
              <ListFeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        )}

        {variant === 'minimal' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <MinimalFeatureCard key={index} feature={feature} />
            ))}
          </div>
        )}

        {variant === 'alternating' && (
          <div className="max-w-5xl mx-auto space-y-24">
            {features.map((feature, index) => (
              <AlternatingFeature key={index} feature={feature} index={index} />
            ))}
          </div>
        )}

        {variant === 'centered' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <CenteredFeatureCard key={index} feature={feature} />
            ))}
          </div>
        )}

        {variant === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <GridFeatureCard key={index} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Grid variant (default)
function GridFeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
      <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
        <IconComponent className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}

// List variant - horizontal cards
function ListFeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className={`flex items-start gap-6 p-6 rounded-2xl ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white border border-gray-100'}`}>
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
        <IconComponent className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

// Minimal variant - dark background, simple icons
function MinimalFeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className="text-center group">
      <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center text-white mb-6 group-hover:bg-white/20 transition-colors">
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

// Alternating variant - left/right with large icons
function AlternatingFeature({ feature, index }: { feature: Feature; index: number }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${!isEven ? 'md:flex-row-reverse' : ''}`}>
      <div className="flex-1">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6">
          <IconComponent className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{feature.description}</p>
      </div>
      <div className="flex-1">
        <div className={`aspect-video rounded-2xl bg-gradient-to-br ${isEven ? 'from-blue-100 to-purple-100' : 'from-purple-100 to-pink-100'}`} />
      </div>
    </div>
  );
}

// Centered variant - icons on top, centered text
function CenteredFeatureCard({ feature }: { feature: Feature }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className="text-center group">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
        <IconComponent className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
    </div>
  );
}
