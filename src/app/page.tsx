import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Palette, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LandGen.AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/examples" className="text-muted-foreground hover:text-foreground transition">
              Examples
            </Link>
            <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            AI-Powered Landing Pages
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Create landing pages with
            <span className="text-primary"> AI-generated images</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Describe your product, get a complete landing page with relevant images in under 2 minutes.
            Edit visually without burning AI tokens.
          </p>

          {/* Main CTA - Input */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Describe your product or service..."
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="px-6">
                Generate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Free to try. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why LandGen.AI?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Unlike other generators that create generic pages with placeholders,
            we generate complete landing pages with relevant AI images.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="AI-Generated Images"
            description="Every landing page comes with unique, relevant images generated specifically for your product."
          />
          <FeatureCard
            icon={<Palette className="h-6 w-6" />}
            title="Visual Editor"
            description="Edit text, swap images, and rearrange sections without using AI. Save tokens, work faster."
          />
          <FeatureCard
            icon={<Zap className="h-6 w-6" />}
            title="Ready in Minutes"
            description="From idea to published landing page in under 5 minutes. No design skills required."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StepCard
            number="1"
            title="Describe"
            description="Tell us about your product, service, or idea in a few sentences."
          />
          <StepCard
            number="2"
            title="Generate"
            description="AI creates your landing page with relevant content and images."
          />
          <StepCard
            number="3"
            title="Publish"
            description="Edit if needed, then publish to your custom subdomain."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to create your landing page?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of entrepreneurs who build landing pages with AI.
          </p>
          <Link href="/register">
            <Button size="lg">
              Start for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">LandGen.AI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border bg-card hover:shadow-lg transition">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
