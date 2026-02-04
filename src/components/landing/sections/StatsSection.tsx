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

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface StatsData {
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  variant?: 'simple' | 'cards' | 'gradient' | 'minimal' | 'bordered' | 'dark-cards' | 'banner';
  theme?: Theme;
}

export function StatsSection({ data }: { data: StatsData }) {
  const variant = data.variant || 'simple';
  const stats = data.stats || [];
  const theme = data.theme;
  const primaryColor = theme?.colors?.primary || '#3b82f6';
  const secondaryColor = theme?.colors?.secondary || '#8b5cf6';
  const bgColor = theme?.colors?.background || '#ffffff';
  const surfaceColor = theme?.colors?.surface || '#f9fafb';
  const textColor = theme?.colors?.text || '#111827';
  const textMutedColor = theme?.colors?.textMuted || '#6b7280';

  if (stats.length === 0) return null;

  if (variant === 'gradient') {
    return (
      <section
        className="py-16"
        style={{ background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})` }}
      >
        <div className="container mx-auto px-4">
          {data.title && (
            <h2 className="text-2xl font-bold text-white text-center mb-12 theme-heading animate-fade-up">
              {data.title}
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'cards') {
    return (
      <section className="py-20" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-4">
          {(data.title || data.subtitle) && (
            <div className="text-center mb-12 animate-fade-up">
              {data.title && (
                <h2 className="text-3xl font-bold mb-4 theme-heading" style={{ color: textColor }}>{data.title}</h2>
              )}
              {data.subtitle && (
                <p className="text-xl max-w-2xl mx-auto" style={{ color: textMutedColor }}>{data.subtitle}</p>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl p-6 text-center hover:shadow-lg transition-shadow animate-fade-up"
                style={{ backgroundColor: surfaceColor, animationDelay: `${index * 0.1}s` }}
              >
                <p className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                  {stat.value}
                </p>
                <p style={{ color: textMutedColor }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'minimal') {
    return (
      <section className="py-20" style={{ backgroundColor: bgColor }}>
        <div className="container mx-auto px-4">
          {data.title && (
            <h2 className="text-3xl font-bold text-center mb-16 theme-heading animate-fade-up" style={{ color: textColor }}>{data.title}</h2>
          )}
          <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-center px-8 py-4">
                  <p className="text-5xl md:text-6xl font-light mb-2" style={{ color: textColor }}>
                    {stat.value}
                  </p>
                  <p className="uppercase tracking-wider text-sm" style={{ color: textMutedColor }}>{stat.label}</p>
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block w-px h-16" style={{ backgroundColor: `${textMutedColor}30` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'bordered') {
    return (
      <section className="py-20" style={{ backgroundColor: surfaceColor }}>
        <div className="container mx-auto px-4">
          {data.title && (
            <h2 className="text-3xl font-bold text-center mb-12 theme-heading animate-fade-up" style={{ color: textColor }}>{data.title}</h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-xl p-8 text-center transition-colors animate-fade-up"
                style={{
                  backgroundColor: bgColor,
                  border: `2px solid ${textMutedColor}30`,
                  animationDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = primaryColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${textMutedColor}30`; }}
              >
                <p className="text-4xl md:text-5xl font-bold mb-2" style={{ color: textColor }}>
                  {stat.value}
                </p>
                <p style={{ color: textMutedColor }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'dark-cards') {
    return (
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          {data.title && (
            <h2 className="text-3xl font-bold text-white text-center mb-12 theme-heading animate-fade-up">{data.title}</h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700 transition-colors animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = primaryColor; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#374151'; }}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'banner') {
    return (
      <section className="py-8" style={{ backgroundColor: primaryColor }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center px-4 animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="text-3xl md:text-4xl font-bold text-white mr-2">
                  {stat.value}
                </span>
                <span className="text-white/80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Simple style (default) - dark background
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-12 theme-heading animate-fade-up">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
