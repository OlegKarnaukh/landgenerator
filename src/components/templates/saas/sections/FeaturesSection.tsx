'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface Feature {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesData {
  title?: string;
  subtitle?: string;
  features: Feature[];
  badges?: string[];
}

export function SaasFeaturesSection({ data }: { data: FeaturesData }) {
  const getIcon = (iconName?: string) => {
    if (!iconName) return Icons.Zap;
    const Icon = (Icons as Record<string, any>)[iconName];
    return Icon || Icons.Zap;
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.title.split(' ').map((word, i) =>
                i === 0 ? (
                  <span key={i} className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-muted-foreground">{data.subtitle}</p>
          )}
        </div>

        {/* Badges */}
        {data.badges && data.badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {data.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-sm px-4 py-1">
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.features.map((feature, index) => {
            const IconComponent = getIcon(feature.icon);
            return (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-background hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
