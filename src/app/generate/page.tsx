'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Loader2, Download, Eye, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingPreview } from '@/components/landing/LandingPreview';

interface Theme {
  preset?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    textMuted?: string;
  };
  fonts?: {
    heading?: string;
    body?: string;
  };
  style?: {
    borderRadius?: string;
    heroStyle?: string;
  };
}

interface GeneratedLanding {
  id: string;
  title: string;
  sections: any[];
  createdAt: string;
  tokensUsed: number;
  template?: 'saas' | 'lifestyle' | 'local' | 'corporate' | 'creative';
  description?: string;
  theme?: Theme;
}

export default function GeneratePage() {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [landing, setLanding] = useState<GeneratedLanding | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please describe your product or service');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate');
      }

      // Validate response has sections
      if (!data.sections || !Array.isArray(data.sections)) {
        throw new Error('Invalid response: no sections generated');
      }
      setLanding(data);
      setShowPreview(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setLanding(null);
    setShowPreview(false);
    setDescription('');
    setError(null);
  };

  // Full page preview mode
  if (showPreview && landing) {
    return (
      <div className="min-h-screen">
        {/* Preview Toolbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
          <div className="container mx-auto px-4 h-14 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
              <span className="text-white/60 text-sm">
                Preview: {landing.title}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-white hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                New
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
              >
                <Download className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Landing Preview */}
        <div className="pt-14">
          <LandingPreview
            sections={landing.sections}
            theme={landing.theme}
            description={landing.description}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LandGen.AI</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Describe your product
            </h1>
            <p className="text-gray-400">
              Tell us about your product or service and we&apos;ll create a landing page for you
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 md:p-8">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Example: An AI-powered fitness app that creates personalized workout plans for busy professionals. It analyzes your schedule, fitness level, and goals to deliver 15-minute effective workouts."
              className="w-full h-40 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              disabled={isGenerating}
            />

            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !description.trim()}
                className="flex-1 h-12 text-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Landing Page
                  </>
                )}
              </Button>
            </div>

            {isGenerating && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  AI is crafting your landing page...
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <TipCard
              title="Be specific"
              description="Include your target audience, main benefits, and unique features"
            />
            <TipCard
              title="Mention the problem"
              description="What problem does your product solve? This helps create compelling copy"
            />
            <TipCard
              title="Add context"
              description="Industry, pricing model, or competitor comparisons help generate better content"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function TipCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <h3 className="font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
