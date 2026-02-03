interface Stat {
  value: string;
  label: string;
}

interface StatsData {
  title?: string;
  stats: Stat[];
  style?: 'simple' | 'cards' | 'gradient';
}

export function StatsSection({ data }: { data: StatsData }) {
  const style = data.style || 'simple';

  if (style === 'gradient') {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {data.stats.map((stat, index) => (
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

  if (style === 'cards') {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {data.title && (
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              {data.title}
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {data.stats.map((stat, index) => (
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

  // Simple style (default)
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {data.stats.map((stat, index) => (
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
