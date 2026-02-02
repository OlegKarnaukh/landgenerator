# LandGen.AI - Setup Guide

Get the project running in 5 minutes.

## Prerequisites

- Node.js 18+ (recommended: 20 LTS)
- PostgreSQL 15+ OR a Supabase/Neon account
- OpenAI API key

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database (choose one)
# Option A: Local PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/landgen"

# Option B: Supabase (free tier)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OpenAI (required for AI generation)
OPENAI_API_KEY="sk-..."
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Base UI components (shadcn/ui style)
│   ├── editor/      # Visual editor components
│   └── landing/     # Landing page section components
├── lib/
│   ├── ai/          # AI generation logic
│   └── db.ts        # Database client
├── stores/          # Zustand state stores
├── types/           # TypeScript types
└── config/          # App configuration

prisma/
└── schema.prisma    # Database schema
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push schema changes to DB |
| `npm run db:studio` | Open Prisma Studio |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Yes | Secret for NextAuth sessions |
| `NEXTAUTH_URL` | Yes | Base URL of your app |
| `OPENAI_API_KEY` | Yes | OpenAI API key for AI generation |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth secret |
| `R2_*` | No | Cloudflare R2 for image storage |

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Railway

```bash
railway up
```

## Troubleshooting

### "Can't reach database server"

- Check `DATABASE_URL` format
- Ensure PostgreSQL is running
- Check network/firewall settings

### "OPENAI_API_KEY not set"

- Add key to `.env` file
- Restart dev server after changes

### Prisma errors

```bash
# Reset database
npx prisma db push --force-reset

# Regenerate client
npx prisma generate
```
