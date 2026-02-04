// Template system types

export type TemplateId = 'saas' | 'lifestyle' | 'corporate' | 'creative' | 'local';

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  description: string;
  niches: string[]; // Keywords that match this template
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  style: 'modern' | 'classic' | 'minimal' | 'bold' | 'warm';
}

export interface LandingData {
  template: TemplateId;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  type: string;
  order: number;
  data: Record<string, any>;
}

// Template configurations
export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  saas: {
    id: 'saas',
    name: 'SaaS / Tech',
    description: 'Modern tech style with gradients, floating cards, dark accents',
    niches: ['saas', 'it', 'tech', 'startup', 'software', 'app', 'ai', 'платформа', 'сервис', 'приложение'],
    colors: {
      primary: 'hsl(262, 83%, 58%)', // Purple
      secondary: 'hsl(210, 100%, 50%)', // Blue
      accent: 'hsl(330, 80%, 60%)', // Pink
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(222, 47%, 11%)',
      muted: 'hsl(210, 40%, 96%)',
    },
    fonts: {
      heading: 'font-bold',
      body: 'font-normal',
    },
    borderRadius: 'xl',
    style: 'modern',
  },
  lifestyle: {
    id: 'lifestyle',
    name: 'Lifestyle / Local',
    description: 'Warm, image-heavy design for restaurants, salons, fitness',
    niches: ['ресторан', 'кафе', 'салон', 'красота', 'фитнес', 'спорт', 'спа', 'отель', 'студия', 'йога'],
    colors: {
      primary: 'hsl(25, 95%, 53%)', // Warm orange
      secondary: 'hsl(43, 96%, 56%)', // Gold
      accent: 'hsl(0, 84%, 60%)', // Coral
      background: 'hsl(30, 50%, 98%)',
      foreground: 'hsl(20, 14%, 20%)',
      muted: 'hsl(30, 30%, 94%)',
    },
    fonts: {
      heading: 'font-bold',
      body: 'font-normal',
    },
    borderRadius: 'lg',
    style: 'warm',
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate / B2B',
    description: 'Clean, professional design for consulting, agencies, B2B',
    niches: ['консалтинг', 'агентство', 'юрист', 'бухгалтер', 'b2b', 'аудит', 'финансы', 'страхование'],
    colors: {
      primary: 'hsl(215, 50%, 40%)', // Navy blue
      secondary: 'hsl(210, 20%, 50%)', // Steel
      accent: 'hsl(170, 60%, 45%)', // Teal
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(220, 15%, 20%)',
      muted: 'hsl(220, 15%, 96%)',
    },
    fonts: {
      heading: 'font-semibold',
      body: 'font-normal',
    },
    borderRadius: 'md',
    style: 'classic',
  },
  creative: {
    id: 'creative',
    name: 'Creative / Agency',
    description: 'Bold, dynamic design for design studios, marketing, creative',
    niches: ['дизайн', 'маркетинг', 'реклама', 'брендинг', 'фото', 'видео', 'креатив', 'smm'],
    colors: {
      primary: 'hsl(0, 0%, 9%)', // Near black
      secondary: 'hsl(45, 100%, 51%)', // Yellow
      accent: 'hsl(340, 82%, 52%)', // Magenta
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(0, 0%, 9%)',
      muted: 'hsl(0, 0%, 96%)',
    },
    fonts: {
      heading: 'font-black',
      body: 'font-normal',
    },
    borderRadius: 'none',
    style: 'bold',
  },
  local: {
    id: 'local',
    name: 'Local Services',
    description: 'Trustworthy, straightforward design for auto, medical, repairs',
    niches: ['автосервис', 'ремонт', 'медицина', 'клиника', 'стоматология', 'сантехник', 'электрик', 'строительство'],
    colors: {
      primary: 'hsl(210, 100%, 45%)', // Trust blue
      secondary: 'hsl(145, 63%, 42%)', // Success green
      accent: 'hsl(35, 100%, 50%)', // Warning orange
      background: 'hsl(0, 0%, 100%)',
      foreground: 'hsl(220, 15%, 20%)',
      muted: 'hsl(210, 20%, 96%)',
    },
    fonts: {
      heading: 'font-bold',
      body: 'font-normal',
    },
    borderRadius: 'lg',
    style: 'classic',
  },
};

// Function to detect template from description
export function detectTemplate(description: string): TemplateId {
  const lowerDesc = description.toLowerCase();

  for (const [id, config] of Object.entries(TEMPLATES)) {
    for (const niche of config.niches) {
      if (lowerDesc.includes(niche)) {
        return id as TemplateId;
      }
    }
  }

  // Default to local for generic business descriptions
  return 'local';
}
