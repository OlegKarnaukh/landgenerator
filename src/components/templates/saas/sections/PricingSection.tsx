'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Plan {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  ctaText?: string;
  popular?: boolean;
}

interface PricingData {
  title?: string;
  subtitle?: string;
  plans: Plan[];
}

export function SaasPricingSection({ data }: { data: PricingData }) {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {data.title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {data.title}
            </h2>
          )}
          {data.subtitle && (
            <p className="text-xl text-muted-foreground">{data.subtitle}</p>
          )}
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular
                  ? 'border-purple-500 shadow-lg shadow-purple-500/10 scale-105'
                  : 'border-border hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4">
                    Популярный
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground ml-1">/{plan.period}</span>
                  )}
                </div>
                {plan.description && (
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                )}
              </CardHeader>

              <CardContent className="pt-4">
                <Button
                  className={`w-full mb-6 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.ctaText || 'Начать'}
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
