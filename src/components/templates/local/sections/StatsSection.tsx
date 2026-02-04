'use client';

import { TrendingUp, Users, Award, Clock } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface StatsData {
  title?: string;
  stats: Stat[];
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp,
  Users,
  Award,
  Clock,
};

export function LocalStatsSection({ data }: { data: StatsData }) {
  return (
    <section className="py-16 bg-blue-600">
      <div className="container mx-auto px-4">
        {data.title && (
          <h2 className="text-2xl font-bold text-white text-center mb-10">
            {data.title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {data.stats.map((stat, index) => {
            const IconComponent = stat.icon ? ICONS[stat.icon] || TrendingUp : TrendingUp;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
