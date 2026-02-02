# LandGen.AI - AI Landing Page Generator

> Generate professional landing pages with AI-generated images in minutes

---

## 1. Executive Summary

**One-line description:** LandGen.AI helps entrepreneurs and marketers create conversion-optimized landing pages with AI-generated relevant images in under 5 minutes.

**Unique Value Proposition:**
- AI generates RELEVANT images (not stock photos or placeholders)
- Visual editor for quick edits without AI/token costs
- Focus ONLY on landing pages (not websites, not apps)

**Competitors Analysis:**
| Feature | landingsite.ai | base44.com | LandGen.AI |
|---------|---------------|------------|------------|
| AI Images | Yes | No | Yes |
| Visual Editor | Yes | Limited | Yes |
| Focus | Landing pages | Multi-purpose | Landing pages |
| Simplicity | Medium | High | High |

**Our Moat:** Simple UX + AI Images + Landing-only focus

---

## 2. Tech Stack (Cost-Optimized)

```yaml
Frontend:
  Framework: Next.js 14 (App Router)
  Language: TypeScript (strict)
  Styling: Tailwind CSS
  UI Components: shadcn/ui (copy-paste, no bloat)
  State: Zustand (2KB, simple)
  Visual Editor: Custom (React DnD)

Backend:
  API: Next.js API Routes
  Database: PostgreSQL (Supabase/Neon free tier)
  ORM: Prisma (type-safe, migrations)
  Auth: NextAuth.js (simple, free)
  Storage: Cloudflare R2 (S3-compatible, cheap)

AI Services:
  Text Generation: OpenAI gpt-4o-mini (default) / gpt-4o (complex)
  Image Generation: DALL-E 3 / Stable Diffusion XL (Replicate)

Hosting:
  Platform: Vercel (frontend) + Railway (if needed)
  CDN: Cloudflare (free tier)

Monitoring:
  Errors: Sentry (free tier)
  Analytics: Plausible/Umami (self-hosted or free)
```

**Monthly Cost Estimate:**
- Vercel: $0 (hobby) / $20 (pro)
- Database: $0 (Supabase free tier)
- AI APIs: ~$20-50 (usage-based)
- Storage: ~$5 (R2)
- **Total MVP: $25-75/month**

---

## 3. Core Features (MVP - Max 5)

### Feature 1: AI Landing Generator (Core Value)
- User describes their product/service
- AI generates complete landing page structure
- AI generates relevant images for each section

### Feature 2: Visual Editor (Differentiator)
- Click-to-edit text (no AI cost)
- Drag-and-drop sections
- Upload custom images
- Color/font customization

### Feature 3: Template Library
- 10-15 pre-built landing templates
- Industry-specific variants
- One-click apply

### Feature 4: Publish & Share
- One-click publish to subdomain (username.landgen.ai)
- Custom domain support (paid)
- Export HTML/CSS (paid)

### Feature 5: Simple Auth & Billing
- Email/password + Google OAuth
- Free tier: 3 landings, subdomain only
- Pro tier: $19/mo - unlimited landings, custom domains, export

---

## 4. User Journey (Happy Path)

```
1. User lands on homepage
   └── Sees "Describe your product" input

2. User enters description
   └── "AI fitness coaching app for busy professionals"

3. AI generates landing (30-60 seconds)
   ├── Hero section with AI image
   ├── Features section (3-4 features)
   ├── Testimonials (placeholder or AI)
   ├── Pricing section
   └── CTA section

4. User enters Visual Editor
   ├── Edits headline text (instant, no AI)
   ├── Swaps section order (drag-drop)
   ├── Regenerates specific image (AI)
   └── Changes colors/fonts

5. User publishes
   └── Gets link: username.landgen.ai/my-fitness-app

6. User shares/embeds landing page
```

---

## 5. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Landing   │  │  Dashboard  │  │   Visual Editor     │ │
│  │    Page     │  │   (list)    │  │  (React DnD + Zustand)│ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ Next.js API Routes
┌────────────────────────────▼────────────────────────────────┐
│                        BACKEND                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Auth      │  │   Landing   │  │   AI Generation     │ │
│  │   Service   │  │   CRUD      │  │   Service           │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
│                                              │               │
│                                    ┌─────────▼─────────┐    │
│                                    │   AI Providers    │    │
│                                    │  ┌─────┐ ┌─────┐  │    │
│                                    │  │OpenAI│ │DALL-E│ │    │
│                                    │  └─────┘ └─────┘  │    │
│                                    └───────────────────┘    │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌─────────────────────┐  ┌───────────────────────────────┐│
│  │     PostgreSQL      │  │     Cloudflare R2             ││
│  │  (Users, Landings)  │  │  (Generated Images, Assets)   ││
│  └─────────────────────┘  └───────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Public pages
│   │   ├── page.tsx              # Homepage
│   │   ├── pricing/page.tsx
│   │   └── examples/page.tsx
│   ├── (auth)/                   # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/              # Protected pages
│   │   ├── dashboard/page.tsx    # Landing list
│   │   └── editor/[id]/page.tsx  # Visual editor
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/
│   │   ├── landings/
│   │   │   ├── route.ts          # GET, POST
│   │   │   └── [id]/route.ts     # GET, PUT, DELETE
│   │   ├── generate/
│   │   │   ├── landing/route.ts  # Generate full landing
│   │   │   └── image/route.ts    # Generate single image
│   │   └── publish/route.ts
│   ├── [username]/               # Public landing pages
│   │   └── [slug]/page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── editor/                   # Visual editor components
│   │   ├── Canvas.tsx
│   │   ├── Toolbar.tsx
│   │   ├── SectionEditor.tsx
│   │   └── ImageUploader.tsx
│   ├── landing/                  # Landing section components
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   └── CTASection.tsx
│   └── shared/                   # Shared components
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LoadingSpinner.tsx
│
├── lib/
│   ├── ai/
│   │   ├── openai.ts             # OpenAI client
│   │   ├── image-gen.ts          # Image generation
│   │   ├── prompts.ts            # System prompts
│   │   └── landing-generator.ts  # Main generator logic
│   ├── db/
│   │   └── prisma.ts             # Prisma client
│   ├── storage/
│   │   └── r2.ts                 # Cloudflare R2 client
│   └── utils/
│       ├── cn.ts                 # classNames helper
│       └── validators.ts
│
├── stores/
│   └── editor.ts                 # Zustand store for editor
│
├── types/
│   ├── landing.ts                # Landing page types
│   ├── section.ts                # Section types
│   └── api.ts                    # API response types
│
└── config/
    ├── constants.ts
    └── templates.ts              # Landing templates

prisma/
└── schema.prisma                 # Database schema

public/
├── templates/                    # Template previews
└── icons/
```

---

## 7. Data Models

### PostgreSQL Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  image         String?

  plan          Plan      @default(FREE)

  landings      Landing[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

enum Plan {
  FREE
  PRO
}

model Landing {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  title         String
  slug          String
  description   String?   // Original user input

  // Landing content stored as JSON
  content       Json      // { sections: Section[] }

  // Styling
  theme         Json?     // { primaryColor, font, etc }

  // Publishing
  published     Boolean   @default(false)
  customDomain  String?   @unique

  // Metadata
  views         Int       @default(0)

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  @@unique([userId, slug])
  @@index([userId])
  @@index([customDomain])
}

model GeneratedImage {
  id            String    @id @default(cuid())
  landingId     String

  prompt        String
  url           String    // R2 URL

  createdAt     DateTime  @default(now())

  @@index([landingId])
}
```

### TypeScript Types

```typescript
// types/landing.ts

interface Landing {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: LandingContent;
  theme?: LandingTheme;
  published: boolean;
  customDomain?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LandingContent {
  sections: Section[];
}

interface LandingTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
}

// types/section.ts

type SectionType =
  | 'hero'
  | 'features'
  | 'testimonials'
  | 'pricing'
  | 'cta'
  | 'faq'
  | 'gallery'
  | 'contact';

interface Section {
  id: string;
  type: SectionType;
  order: number;
  data: SectionData;
}

interface HeroSectionData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaUrl: string;
  imageUrl?: string;
}

interface FeaturesSectionData {
  title: string;
  features: {
    icon: string;
    title: string;
    description: string;
    imageUrl?: string;
  }[];
}

// ... other section types
```

---

## 8. AI Generation Flow

### Landing Generation Prompt

```typescript
// lib/ai/prompts.ts

export const LANDING_SYSTEM_PROMPT = `You are a landing page expert. Generate landing page content based on user's product description.

Output JSON format:
{
  "title": "Page title for SEO",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Main headline (max 10 words)",
        "subheadline": "Supporting text (max 30 words)",
        "ctaText": "Button text (max 4 words)",
        "imagePrompt": "Detailed prompt for AI image generation"
      }
    },
    // ... more sections
  ]
}

Rules:
- Generate 4-6 sections: hero, features, testimonials/social-proof, pricing (if applicable), cta
- Headlines: Clear, benefit-focused, no jargon
- Image prompts: Detailed, professional, relevant to the product
- Testimonials: Generate realistic but clearly fictional testimonials
- Keep all text concise and conversion-focused`;
```

### Image Generation Flow

```typescript
// lib/ai/image-gen.ts

export async function generateLandingImage(
  prompt: string,
  style: 'hero' | 'feature' | 'background' = 'hero'
): Promise<string> {

  // Enhance prompt based on style
  const enhancedPrompt = enhancePrompt(prompt, style);

  // Generate with DALL-E 3
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: enhancedPrompt,
    n: 1,
    size: style === 'hero' ? '1792x1024' : '1024x1024',
    quality: 'standard', // hd for paid users
  });

  // Upload to R2
  const imageUrl = await uploadToR2(response.data[0].url);

  return imageUrl;
}

function enhancePrompt(prompt: string, style: string): string {
  const stylePrefix = {
    hero: 'Professional, high-quality hero image for a landing page. ',
    feature: 'Clean, minimal illustration or icon for a feature. ',
    background: 'Abstract, subtle background pattern. ',
  };

  return stylePrefix[style] + prompt +
    ' Modern design, clean composition, professional lighting.';
}
```

---

## 9. Pricing Strategy

| Feature | Free | Pro ($19/mo) |
|---------|------|--------------|
| Landing pages | 3 | Unlimited |
| AI generations/month | 10 | 100 |
| Custom domain | No | Yes |
| Export HTML | No | Yes |
| Remove branding | No | Yes |
| Priority support | No | Yes |

**Revenue Target:**
- $1K MRR = 53 Pro users
- $5K MRR = 263 Pro users
- $10K MRR = 526 Pro users

---

## 10. Development Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Project setup (Next.js, Tailwind, Prisma)
- [ ] Auth system (NextAuth)
- [ ] Database schema
- [ ] Basic UI components

### Phase 2: Core Generator (Week 3-4)
- [ ] AI landing generation
- [ ] Image generation integration
- [ ] Basic preview

### Phase 3: Visual Editor (Week 5-6)
- [ ] Canvas component
- [ ] Section editing
- [ ] Drag-and-drop
- [ ] Image upload/regenerate

### Phase 4: Publishing (Week 7)
- [ ] Subdomain publishing
- [ ] Public landing pages
- [ ] Basic analytics

### Phase 5: Monetization (Week 8)
- [ ] Stripe integration
- [ ] Plan limits
- [ ] Custom domains

---

## 11. Security Considerations

- [ ] Rate limiting on AI endpoints
- [ ] Input sanitization (XSS prevention)
- [ ] Image upload validation (type, size)
- [ ] CSRF protection (Next.js built-in)
- [ ] Environment variable protection
- [ ] SQL injection prevention (Prisma handles)

---

## 12. Success Metrics

**Week 1-2:** Project runs locally, auth works
**Week 4:** Can generate landing with AI
**Week 6:** Visual editor functional
**Week 8:** First paying customer

**KPIs to track:**
- Signups per week
- Landings created
- Free-to-paid conversion rate
- AI cost per landing (target: <$0.50)
