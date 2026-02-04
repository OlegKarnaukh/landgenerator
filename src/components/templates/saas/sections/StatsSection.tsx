'use client';

interface Stat {
  value: string;
  label: string;
}

interface StatsData {
  title?: string;
  stats: Stat[];
}

export function SaasStatsSection({ data }: { data: StatsData }) {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-12">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
