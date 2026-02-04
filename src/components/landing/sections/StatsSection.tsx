import { TrendingUp, Users, Award, Target } from 'lucide-react';

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
}

export function StatsSection({ data }: { data: StatsData }) {
  const variant = data.variant || 'simple';
  const stats = data.stats || [];

  if (variant === 'gradient') {
    return <GradientStats data={data} stats={stats} />;
  }

  if (variant === 'cards') {
    return <CardsStats data={data} stats={stats} />;
  }

  if (variant === 'minimal') {
    return <MinimalStats data={data} stats={stats} />;
  }

  if (variant === 'bordered') {
    return <BorderedStats data={data} stats={stats} />;
  }

  if (variant === 'dark-cards') {
    return <DarkCardsStats data={data} stats={stats} />;
  }

  if (variant === 'banner') {
    return <BannerStats stats={stats} />;
  }

  // Simple style (default) - dark background
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
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

// Gradient background
function GradientStats({ data, stats }: { data: StatsData; stats: Stat[] }) {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
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

// Cards on white background
function CardsStats({ data, stats }: { data: StatsData; stats: Stat[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {(data.title || data.subtitle) && (
          <div className="text-center mb-12">
            {data.title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h2>
            )}
            {data.subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{data.subtitle}</p>
            )}
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
            >
              <p className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Minimal - clean white background with subtle dividers
function MinimalStats({ data, stats }: { data: StatsData; stats: Stat[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">{data.title}</h2>
        )}
        <div className="flex flex-wrap justify-center items-center max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center">
              <div className="text-center px-8 py-4">
                <p className="text-5xl md:text-6xl font-light text-gray-900 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-500 uppercase tracking-wider text-sm">{stat.label}</p>
              </div>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-16 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Bordered - stats in bordered boxes
function BorderedStats({ data, stats }: { data: StatsData; stats: Stat[] }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{data.title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors"
            >
              <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Dark cards with gradient accents
function DarkCardsStats({ data, stats }: { data: StatsData; stats: Stat[] }) {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-3xl font-bold text-white text-center mb-12">{data.title}</h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-6 text-center border border-gray-700 hover:border-blue-500 transition-colors"
            >
              <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
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

// Banner - horizontal strip
function BannerStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="py-8 bg-blue-600">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4">
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
