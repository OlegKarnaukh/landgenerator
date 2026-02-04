'use client';

import { ArrowRight, Check, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface HeroData {
  headline: string;
  subheadline?: string;
  ctaText: string;
  ctaUrl?: string;
  secondaryCtaText?: string;
  badge?: string;
  stats?: { value: string; label: string }[];
  testimonialPreview?: {
    quote: string;
    author: string;
    avatar?: string;
  };
}

export function SaasHeroSection({ data }: { data: HeroData }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="text-center lg:text-left space-y-6">
            {data.badge && (
              <Badge variant="secondary" className="text-sm px-4 py-1">
                <Zap className="w-3 h-3 mr-1" />
                {data.badge}
              </Badge>
            )}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data.headline.split(' ').slice(0, 2).join(' ')}
              </span>{' '}
              {data.headline.split(' ').slice(2).join(' ')}
            </h1>

            {data.subheadline && (
              <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                {data.subheadline}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-lg px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                {data.ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {data.secondaryCtaText && (
                <Button size="lg" variant="outline" className="text-lg px-8">
                  {data.secondaryCtaText}
                </Button>
              )}
            </div>

            {/* Mini stats */}
            {data.stats && data.stats.length > 0 && (
              <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-4">
                {data.stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Floating cards */}
          <div className="hidden lg:flex relative h-[500px]">
            {/* Testimonial card */}
            {data.testimonialPreview && (
              <Card className="absolute top-0 left-0 w-[320px] shadow-xl border-0 bg-background/80 backdrop-blur">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar>
                    <AvatarImage src={data.testimonialPreview.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.testimonialPreview.author}`} />
                    <AvatarFallback>{data.testimonialPreview.author.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{data.testimonialPreview.author}</CardTitle>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  "{data.testimonialPreview.quote.slice(0, 100)}..."
                </CardContent>
              </Card>
            )}

            {/* Stats card */}
            <Card className="absolute top-[180px] right-0 w-[280px] shadow-xl border-0 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Растущее сообщество
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">10,000+</div>
                <div className="text-white/80 text-sm">активных пользователей</div>
              </CardContent>
            </Card>

            {/* Feature card */}
            <Card className="absolute bottom-0 left-[50px] w-[300px] shadow-xl border-0 bg-background/80 backdrop-blur">
              <CardHeader className="space-y-1 flex flex-row items-start gap-4">
                <div className="mt-1 bg-green-100 dark:bg-green-900/30 p-2 rounded-xl">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-base">Быстрый старт</CardTitle>
                  <CardDescription className="text-sm">
                    Настройка за 5 минут. Без сложных интеграций.
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
