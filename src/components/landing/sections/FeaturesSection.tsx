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
  theme?: Theme;
}

export function FeaturesSection({ data }: { data: FeaturesData }) {
  const variant = data.variant || 'grid';
  const features = data.features || [];
  const theme = data.theme;
  const primaryColor = theme?.colors?.primary || '#3b82f6';
  const secondaryColor = theme?.colors?.secondary || '#8b5cf6';
  const bgColor = theme?.colors?.background || '#ffffff';
  const surfaceColor = theme?.colors?.surface || '#f9fafb';
  const textColor = theme?.colors?.text || '#111827';
  const textMutedColor = theme?.colors?.textMuted || '#6b7280';

  const getBgClass = () => {
    if (variant === 'minimal') return 'bg-gray-900';
    return '';
  };

  return (
    <section
      className={`py-20 md:py-28 ${getBgClass()}`}
      style={variant !== 'minimal' ? { backgroundColor: bgColor } : {}}
    >
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-16 animate-fade-up">
            {data.title && (
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 theme-heading"
                style={{ color: variant === 'minimal' ? '#ffffff' : textColor }}
              >
                {data.title}
              </h2>
            )}
            {data.subtitle && (
              <p
                className="text-xl max-w-2xl mx-auto"
                style={{ color: variant === 'minimal' ? '#9ca3af' : textMutedColor }}
              >
                {data.subtitle}
              </p>
            )}
          </div>
        )}

        {variant === 'list' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {features.map((feature, index) => (
              <ListFeatureCard key={index} feature={feature} index={index} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} textMutedColor={textMutedColor} surfaceColor={surfaceColor} />
            ))}
          </div>
        )}

        {variant === 'minimal' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <MinimalFeatureCard key={index} feature={feature} primaryColor={primaryColor} />
            ))}
          </div>
        )}

        {variant === 'alternating' && (
          <div className="max-w-5xl mx-auto space-y-24">
            {features.map((feature, index) => (
              <AlternatingFeature key={index} feature={feature} index={index} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} textMutedColor={textMutedColor} />
            ))}
          </div>
        )}

        {variant === 'centered' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <CenteredFeatureCard key={index} feature={feature} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} textMutedColor={textMutedColor} />
            ))}
          </div>
        )}

        {variant === 'grid' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <GridFeatureCard key={index} feature={feature} primaryColor={primaryColor} textColor={textColor} textMutedColor={textMutedColor} surfaceColor={surfaceColor} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Grid variant (default)
function GridFeatureCard({ feature, primaryColor, textColor, textMutedColor, surfaceColor }: { feature: Feature; primaryColor: string; textColor: string; textMutedColor: string; surfaceColor: string }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div
      className="group p-8 rounded-2xl hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 animate-fade-up"
      style={{ backgroundColor: surfaceColor }}
    >
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
      >
        <IconComponent className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold mb-3" style={{ color: textColor }}>{feature.title}</h3>
      <p className="leading-relaxed" style={{ color: textMutedColor }}>{feature.description}</p>
    </div>
  );
}

// List variant - horizontal cards
function ListFeatureCard({ feature, index, primaryColor, secondaryColor, textColor, textMutedColor, surfaceColor }: { feature: Feature; index: number; primaryColor: string; secondaryColor: string; textColor: string; textMutedColor: string; surfaceColor: string }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div
      className="flex items-start gap-6 p-6 rounded-2xl animate-fade-up"
      style={{
        backgroundColor: index % 2 === 0 ? surfaceColor : 'transparent',
        border: index % 2 !== 0 ? '1px solid #e5e7eb' : 'none',
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        <IconComponent className="h-8 w-8" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2" style={{ color: textColor }}>{feature.title}</h3>
        <p className="leading-relaxed" style={{ color: textMutedColor }}>{feature.description}</p>
      </div>
    </div>
  );
}

// Minimal variant - dark background, simple icons
function MinimalFeatureCard({ feature, primaryColor }: { feature: Feature; primaryColor: string }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className="text-center group animate-fade-up">
      <div
        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
        style={{ backgroundColor: `${primaryColor}30`, color: primaryColor }}
      >
        <IconComponent className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </div>
  );
}

// Alternating variant - left/right with large icons
function AlternatingFeature({ feature, index, primaryColor, secondaryColor, textColor, textMutedColor }: { feature: Feature; index: number; primaryColor: string; secondaryColor: string; textColor: string; textMutedColor: string }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-12 animate-fade-up ${!isEven ? 'md:flex-row-reverse' : ''}`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="flex-1">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6"
          style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
        >
          <IconComponent className="h-10 w-10" />
        </div>
        <h3 className="text-2xl font-bold mb-4" style={{ color: textColor }}>{feature.title}</h3>
        <p className="text-lg leading-relaxed" style={{ color: textMutedColor }}>{feature.description}</p>
      </div>
      <div className="flex-1">
        <div
          className="aspect-video rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}20, ${secondaryColor}20)`
          }}
        />
      </div>
    </div>
  );
}

// Centered variant - icons on top, centered text
function CenteredFeatureCard({ feature, primaryColor, secondaryColor, textColor, textMutedColor }: { feature: Feature; primaryColor: string; secondaryColor: string; textColor: string; textMutedColor: string }) {
  const IconComponent = (Icons as any)[feature.icon] || Icons.Zap;
  return (
    <div className="text-center group animate-fade-up">
      <div
        className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        <IconComponent className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>{feature.title}</h3>
      <p className="leading-relaxed" style={{ color: textMutedColor }}>{feature.description}</p>
    </div>
  );
}
