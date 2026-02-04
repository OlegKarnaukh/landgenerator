// Dynamic Theme System for unique landing pages

export interface LandingTheme {
  // Color palette
  colors: {
    primary: string;      // Main brand color
    secondary: string;    // Supporting color
    accent: string;       // Highlight/CTA color
    background: string;   // Page background
    surface: string;      // Card/section backgrounds
    text: string;         // Primary text
    textMuted: string;    // Secondary text
  };

  // Typography
  fonts: {
    heading: string;      // Google Font name for headings
    body: string;         // Google Font name for body
  };

  // Style characteristics
  style: {
    borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    shadowIntensity: 'none' | 'sm' | 'md' | 'lg';
    spacing: 'compact' | 'normal' | 'spacious';
  };

  // Visual effects
  effects: {
    heroStyle: 'gradient' | 'image' | 'pattern' | 'solid' | 'mesh';
    animation: 'none' | 'subtle' | 'dynamic';
    backgroundPattern?: string;  // CSS pattern or gradient
  };
}

// Pre-defined theme presets by mood/industry
export const THEME_PRESETS: Record<string, Partial<LandingTheme>> = {
  // Tech/SaaS - dark, modern, gradient
  tech: {
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f472b6',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#ffffff',
      textMuted: '#a1a1aa',
    },
    fonts: { heading: 'Space Grotesk', body: 'Inter' },
    style: { borderRadius: 'xl', shadowIntensity: 'lg', spacing: 'spacious' },
    effects: { heroStyle: 'mesh', animation: 'dynamic' },
  },

  // Creative/Agency - bold, contrast
  creative: {
    colors: {
      primary: '#000000',
      secondary: '#fbbf24',
      accent: '#ef4444',
      background: '#ffffff',
      surface: '#f5f5f5',
      text: '#0a0a0a',
      textMuted: '#525252',
    },
    fonts: { heading: 'Clash Display', body: 'Satoshi' },
    style: { borderRadius: 'none', shadowIntensity: 'none', spacing: 'spacious' },
    effects: { heroStyle: 'solid', animation: 'dynamic' },
  },

  // Restaurant/Lifestyle - warm, inviting
  lifestyle: {
    colors: {
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#dc2626',
      background: '#fffbeb',
      surface: '#ffffff',
      text: '#1c1917',
      textMuted: '#78716c',
    },
    fonts: { heading: 'Playfair Display', body: 'Lato' },
    style: { borderRadius: 'lg', shadowIntensity: 'md', spacing: 'normal' },
    effects: { heroStyle: 'image', animation: 'subtle' },
  },

  // Medical/Professional - clean, trustworthy
  medical: {
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      accent: '#10b981',
      background: '#ffffff',
      surface: '#f0fdfa',
      text: '#134e4a',
      textMuted: '#5eead4',
    },
    fonts: { heading: 'Plus Jakarta Sans', body: 'DM Sans' },
    style: { borderRadius: 'lg', shadowIntensity: 'sm', spacing: 'normal' },
    effects: { heroStyle: 'gradient', animation: 'subtle' },
  },

  // Auto/Industrial - bold, reliable
  industrial: {
    colors: {
      primary: '#1d4ed8',
      secondary: '#3b82f6',
      accent: '#f97316',
      background: '#ffffff',
      surface: '#f1f5f9',
      text: '#0f172a',
      textMuted: '#64748b',
    },
    fonts: { heading: 'Outfit', body: 'Source Sans 3' },
    style: { borderRadius: 'md', shadowIntensity: 'md', spacing: 'normal' },
    effects: { heroStyle: 'image', animation: 'subtle' },
  },

  // Luxury/Premium - elegant, refined
  luxury: {
    colors: {
      primary: '#1a1a1a',
      secondary: '#b8860b',
      accent: '#daa520',
      background: '#fafaf9',
      surface: '#ffffff',
      text: '#1a1a1a',
      textMuted: '#737373',
    },
    fonts: { heading: 'Cormorant Garamond', body: 'Raleway' },
    style: { borderRadius: 'sm', shadowIntensity: 'sm', spacing: 'spacious' },
    effects: { heroStyle: 'solid', animation: 'subtle' },
  },

  // Startup/Modern - vibrant, energetic
  startup: {
    colors: {
      primary: '#7c3aed',
      secondary: '#2563eb',
      accent: '#06b6d4',
      background: '#ffffff',
      surface: '#faf5ff',
      text: '#18181b',
      textMuted: '#71717a',
    },
    fonts: { heading: 'Cabinet Grotesk', body: 'General Sans' },
    style: { borderRadius: '2xl', shadowIntensity: 'lg', spacing: 'spacious' },
    effects: { heroStyle: 'mesh', animation: 'dynamic' },
  },

  // Education - friendly, approachable
  education: {
    colors: {
      primary: '#4f46e5',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#ffffff',
      surface: '#eef2ff',
      text: '#1e1b4b',
      textMuted: '#6366f1',
    },
    fonts: { heading: 'Nunito', body: 'Open Sans' },
    style: { borderRadius: 'xl', shadowIntensity: 'md', spacing: 'normal' },
    effects: { heroStyle: 'pattern', animation: 'subtle' },
  },
};

// Generate CSS variables from theme
export function generateThemeCSS(theme: LandingTheme): string {
  const borderRadiusMap = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  };

  const shadowMap = {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  };

  return `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-accent: ${theme.colors.accent};
      --color-background: ${theme.colors.background};
      --color-surface: ${theme.colors.surface};
      --color-text: ${theme.colors.text};
      --color-text-muted: ${theme.colors.textMuted};
      --font-heading: '${theme.fonts.heading}', sans-serif;
      --font-body: '${theme.fonts.body}', sans-serif;
      --border-radius: ${borderRadiusMap[theme.style.borderRadius]};
      --shadow: ${shadowMap[theme.style.shadowIntensity]};
    }
  `;
}

// Generate Google Fonts import URL
export function generateFontsUrl(theme: LandingTheme): string {
  const fonts = [theme.fonts.heading, theme.fonts.body]
    .filter((f, i, arr) => arr.indexOf(f) === i) // unique
    .map(f => f.replace(/ /g, '+'))
    .join('&family=');

  return `https://fonts.googleapis.com/css2?family=${fonts}:wght@400;500;600;700;800&display=swap`;
}

// Background generators
export const BACKGROUND_PATTERNS = {
  mesh: (primary: string, secondary: string) => `
    radial-gradient(at 40% 20%, ${primary}33 0px, transparent 50%),
    radial-gradient(at 80% 0%, ${secondary}33 0px, transparent 50%),
    radial-gradient(at 0% 50%, ${primary}22 0px, transparent 50%),
    radial-gradient(at 80% 50%, ${secondary}22 0px, transparent 50%),
    radial-gradient(at 0% 100%, ${primary}33 0px, transparent 50%)
  `,
  gradient: (primary: string, secondary: string) => `
    linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)
  `,
  dots: (color: string) => `
    radial-gradient(${color}22 1px, transparent 1px)
  `,
  grid: (color: string) => `
    linear-gradient(${color}11 1px, transparent 1px),
    linear-gradient(90deg, ${color}11 1px, transparent 1px)
  `,
};
