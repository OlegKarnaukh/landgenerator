import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';

export const maxDuration = 60;
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 55000,
});

// Default themes by niche keywords
const NICHE_THEMES: Record<string, any> = {
  restaurant: {
    preset: 'lifestyle',
    colors: {
      primary: '#b45309',
      secondary: '#78350f',
      accent: '#dc2626',
      background: '#fffbeb',
      surface: '#fef3c7',
      text: '#1c1917',
      textMuted: '#78716c'
    },
    fonts: { heading: 'Playfair Display', body: 'Source Sans 3' },
    style: { borderRadius: 'lg', heroStyle: 'image' }
  },
  tech: {
    preset: 'tech',
    colors: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#f472b6',
      background: '#0f0f23',
      surface: '#1a1a2e',
      text: '#f8fafc',
      textMuted: '#94a3b8'
    },
    fonts: { heading: 'Space Grotesk', body: 'DM Sans' },
    style: { borderRadius: 'xl', heroStyle: 'gradient' }
  },
  auto: {
    preset: 'industrial',
    colors: {
      primary: '#1e40af',
      secondary: '#1d4ed8',
      accent: '#f97316',
      background: '#ffffff',
      surface: '#f1f5f9',
      text: '#0f172a',
      textMuted: '#64748b'
    },
    fonts: { heading: 'Outfit', body: 'Source Sans 3' },
    style: { borderRadius: 'lg', heroStyle: 'image' }
  },
  beauty: {
    preset: 'luxury',
    colors: {
      primary: '#be185d',
      secondary: '#9d174d',
      accent: '#f9a8d4',
      background: '#fdf2f8',
      surface: '#fce7f3',
      text: '#1f2937',
      textMuted: '#6b7280'
    },
    fonts: { heading: 'Cormorant Garamond', body: 'Raleway' },
    style: { borderRadius: 'xl', heroStyle: 'image' }
  },
  fitness: {
    preset: 'lifestyle',
    colors: {
      primary: '#15803d',
      secondary: '#166534',
      accent: '#facc15',
      background: '#f0fdf4',
      surface: '#dcfce7',
      text: '#14532d',
      textMuted: '#4b5563'
    },
    fonts: { heading: 'Archivo Black', body: 'General Sans' },
    style: { borderRadius: 'lg', heroStyle: 'image' }
  },
  consulting: {
    preset: 'corporate',
    colors: {
      primary: '#1e3a5f',
      secondary: '#0c4a6e',
      accent: '#0ea5e9',
      background: '#f8fafc',
      surface: '#f1f5f9',
      text: '#0f172a',
      textMuted: '#64748b'
    },
    fonts: { heading: 'Plus Jakarta Sans', body: 'Source Sans 3' },
    style: { borderRadius: 'md', heroStyle: 'solid' }
  },
  medical: {
    preset: 'medical',
    colors: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#22d3ee',
      background: '#f0fdfa',
      surface: '#ccfbf1',
      text: '#134e4a',
      textMuted: '#5eead4'
    },
    fonts: { heading: 'Plus Jakarta Sans', body: 'DM Sans' },
    style: { borderRadius: 'xl', heroStyle: 'solid' }
  },
  default: {
    preset: 'creative',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#f472b6',
      background: '#faf5ff',
      surface: '#f3e8ff',
      text: '#1f2937',
      textMuted: '#6b7280'
    },
    fonts: { heading: 'Space Grotesk', body: 'DM Sans' },
    style: { borderRadius: 'xl', heroStyle: 'gradient' }
  }
};

// Detect niche from description
function detectNiche(description: string): string {
  const lower = description.toLowerCase();
  if (lower.includes('ресторан') || lower.includes('кафе') || lower.includes('еда') || lower.includes('кухня')) return 'restaurant';
  if (lower.includes('tech') || lower.includes('saas') || lower.includes('it') || lower.includes('приложени') || lower.includes('софт')) return 'tech';
  if (lower.includes('авто') || lower.includes('машин') || lower.includes('сто') || lower.includes('сервис')) return 'auto';
  if (lower.includes('салон') || lower.includes('красот') || lower.includes('маникюр') || lower.includes('spa')) return 'beauty';
  if (lower.includes('фитнес') || lower.includes('спорт') || lower.includes('трениров') || lower.includes('зал')) return 'fitness';
  if (lower.includes('консалт') || lower.includes('b2b') || lower.includes('бизнес') || lower.includes('юрид')) return 'consulting';
  if (lower.includes('медиц') || lower.includes('клиник') || lower.includes('врач') || lower.includes('здоров')) return 'medical';
  return 'default';
}

const SYSTEM_PROMPT = `Ты — топовый маркетолог и UX-дизайнер. Создаёшь УНИКАЛЬНЫЕ продающие лендинги с богатым контентом.

═══════════════════════════════════════════════════════════════
⚠️ КРИТИЧЕСКИ ВАЖНО: ИЗБЕГАЙ "AI SLOP" ДИЗАЙНА
═══════════════════════════════════════════════════════════════

❌ ЗАПРЕЩЕНО (выглядит как дешёвый AI):
- Шрифты: Inter, Roboto, Arial, Open Sans, Lato
- Цвета: #3B82F6 (синий), #8B5CF6 (фиолетовый), стандартные Tailwind
- Слова: качественный, профессиональный, надёжный, индивидуальный подход
- Мало контента: 4-5 секций, короткие тексты

✅ ТРЕБУЕТСЯ (выглядит как премиум агентство):
- Уникальные шрифты под нишу
- Уникальная цветовая палитра
- Много контента: 8-12 секций
- Конкретика: цифры, истории, детали

═══════════════════════════════════════════════════════════════
📋 СТРУКТУРА ОТВЕТА
═══════════════════════════════════════════════════════════════

{
  "title": "SEO заголовок",
  "theme": { ... },     // УНИКАЛЬНАЯ тема
  "sections": [ ... ]   // 8-12 секций
}

═══════════════════════════════════════════════════════════════
🎨 ТЕМА (theme) — ГЕНЕРИРУЙ УНИКАЛЬНУЮ!
═══════════════════════════════════════════════════════════════

theme: {
  "preset": "tech" | "creative" | "lifestyle" | "medical" | "industrial" | "luxury" | "startup" | "education",
  "colors": {
    "primary": "#HEX",      // Главный цвет (НЕ #3B82F6!)
    "secondary": "#HEX",    // Вторичный
    "accent": "#HEX",       // Акцент для CTA
    "background": "#HEX",   // Фон страницы
    "surface": "#HEX",      // Фон карточек
    "text": "#HEX",         // Текст
    "textMuted": "#HEX"     // Вторичный текст
  },
  "fonts": {
    "heading": "Google Font",  // Space Grotesk, Clash Display, Playfair Display, Outfit, и т.д.
    "body": "Google Font"
  },
  "style": {
    "borderRadius": "none" | "sm" | "md" | "lg" | "xl" | "2xl",
    "heroStyle": "gradient" | "image" | "mesh" | "solid"
  }
}

ПРИМЕРЫ ТЕМ ПО НИШАМ:

🍕 Ресторан/Еда:
- colors: primary "#b45309", accent "#dc2626", background "#fffbeb"
- fonts: heading "Playfair Display", body "Source Sans 3"
- heroStyle: "image"

💻 IT/SaaS/Tech:
- colors: primary "#6366f1", accent "#f472b6", background "#0f0f23"
- fonts: heading "Space Grotesk", body "DM Sans"
- heroStyle: "mesh"

🚗 Автосервис:
- colors: primary "#1e40af", accent "#f97316", background "#ffffff"
- fonts: heading "Outfit", body "Source Sans 3"
- heroStyle: "image"

💇 Салон красоты:
- colors: primary "#be185d", accent "#f9a8d4", background "#fdf2f8"
- fonts: heading "Cormorant Garamond", body "Raleway"
- heroStyle: "image"

🏋️ Фитнес:
- colors: primary "#15803d", accent "#facc15", background "#f0fdf4"
- fonts: heading "Cabinet Grotesk", body "General Sans"
- heroStyle: "image"

🏢 Консалтинг/B2B:
- colors: primary "#1e3a5f", accent "#0ea5e9", background "#f8fafc"
- fonts: heading "Plus Jakarta Sans", body "Inter"
- heroStyle: "solid"

═══════════════════════════════════════════════════════════════
📄 СЕКЦИИ (sections) — МИНИМУМ 8!
═══════════════════════════════════════════════════════════════

### 1. hero (ОБЯЗАТЕЛЬНО)
{
  "type": "hero",
  "data": {
    "badge": "🔥 Акция до конца месяца",
    "headline": "Боль клиента? Решение с цифрой за срок",
    "subheadline": "Подробное описание что получит клиент (2-3 предложения)",
    "ctaText": "Действие с выгодой",
    "ctaUrl": "#contact",
    "secondaryCtaText": "Узнать подробности",
    "image": "https://images.unsplash.com/photo-XXXXX?w=1200&q=80"
  }
}

### 2. stats — 4 цифры доверия
{
  "type": "stats",
  "data": {
    "stats": [
      {"value": "12 847", "label": "клиентов"},
      {"value": "98.7%", "label": "довольны результатом"},
      {"value": "< 2 ч", "label": "среднее время ответа"},
      {"value": "7 лет", "label": "на рынке"}
    ]
  }
}

### 3. features — 6 преимуществ
{
  "type": "features",
  "data": {
    "title": "Заголовок секции",
    "subtitle": "Подзаголовок с конкретикой",
    "features": [
      {
        "icon": "Shield",
        "title": "Преимущество",
        "description": "Подробное описание в 2-3 предложения с конкретикой и цифрами."
      }
      // ... ещё 5 штук
    ]
  }
}

### 4. services — 4-6 услуг с ценами
{
  "type": "services",
  "data": {
    "title": "Услуги и цены",
    "subtitle": "Прозрачное ценообразование",
    "services": [
      {
        "icon": "Wrench",
        "title": "Название услуги",
        "description": "Подробное описание что входит (2-3 предложения)",
        "price": "от 5 000 ₽",
        "duration": "30-60 минут",
        "image": "https://images.unsplash.com/photo-XXXXX?w=600&q=80"
      }
      // ... ещё 3-5 штук
    ]
  }
}

### 5. process — 4-5 этапов работы
{
  "type": "process",
  "data": {
    "title": "Как мы работаем",
    "subtitle": "Простой и понятный процесс",
    "steps": [
      {
        "icon": "Phone",
        "title": "Шаг 1: Заявка",
        "description": "Подробное описание что происходит на этом этапе"
      }
      // ... ещё 3-4 шага
    ]
  }
}

### 6. testimonials — 4-6 отзывов-ИСТОРИЙ
{
  "type": "testimonials",
  "data": {
    "title": "Истории наших клиентов",
    "testimonials": [
      {
        "quote": "Длинная история: была проблема X, обратился к вам, получил Y. Конкретные детали и цифры. Теперь рекомендую всем знакомым.",
        "author": "Имя Фамилия",
        "role": "Должность / Компания",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Имя",
        "rating": 5
      }
      // ... ещё 3-5 отзывов
    ]
  }
}

### 7. gallery — 6-8 фото работ (если применимо)
{
  "type": "gallery",
  "data": {
    "title": "Наши работы",
    "subtitle": "Реальные проекты",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-XXXXX?w=600&q=80",
        "alt": "Описание",
        "caption": "Подпись к фото"
      }
      // ... ещё 5-7 фото
    ]
  }
}

### 8. team — 3-4 члена команды (если применимо)
{
  "type": "team",
  "data": {
    "title": "Наша команда",
    "members": [
      {
        "name": "Имя Фамилия",
        "role": "Должность",
        "bio": "Краткая биография в 2-3 предложения с опытом и достижениями.",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Имя"
      }
    ]
  }
}

### 9. pricing — тарифы (если применимо)
{
  "type": "pricing",
  "data": {
    "title": "Тарифы",
    "subtitle": "Выберите подходящий",
    "plans": [
      {
        "name": "Базовый",
        "price": "от 10 000 ₽",
        "period": "/мес",
        "description": "Для небольших проектов",
        "features": ["Фича 1", "Фича 2", "Фича 3"],
        "ctaText": "Выбрать",
        "highlighted": false
      },
      {
        "name": "Популярный",
        "price": "от 25 000 ₽",
        "period": "/мес",
        "description": "Оптимальный выбор",
        "features": ["Всё из Базового", "Фича 4", "Фича 5", "Фича 6"],
        "ctaText": "Выбрать",
        "highlighted": true
      }
    ]
  }
}

### 10. faq — 5-6 ответов на СТРАХИ
{
  "type": "faq",
  "data": {
    "title": "Частые вопросы",
    "questions": [
      {
        "question": "А если результат мне не понравится?",
        "answer": "Подробный ответ, снимающий страх клиента (2-3 предложения)"
      }
      // Вопросы = СТРАХИ: цена, время, качество, гарантии
    ]
  }
}

### 11. contact — контакты с формой
{
  "type": "contact",
  "data": {
    "title": "Свяжитесь с нами",
    "subtitle": "Ответим в течение 15 минут",
    "phone": "+7 (999) 123-45-67",
    "email": "info@company.ru",
    "address": "г. Москва, ул. Примерная, д. 1",
    "workingHours": "Пн-Пт: 9:00-20:00, Сб: 10:00-18:00"
  }
}

### 12. cta — финальный призыв
{
  "type": "cta",
  "data": {
    "headline": "Готовы начать?",
    "subheadline": "Оставьте заявку сегодня и получите скидку 10%",
    "ctaText": "Получить предложение",
    "features": ["Бесплатная консультация", "Гарантия результата", "Поддержка 24/7"]
  }
}

═══════════════════════════════════════════════════════════════
🖼️ ИЗОБРАЖЕНИЯ — ИСПОЛЬЗУЙ РЕАЛЬНЫЕ UNSPLASH!
═══════════════════════════════════════════════════════════════

Формат: https://images.unsplash.com/photo-[ID]?w=800&q=80

Примеры ID по категориям:
- Авто: 1486262715619-67b85e0b08d3, 1492144534655-ae79c964c9d7
- Еда: 1504674900247-0877df9cc836, 1555396273-367ea4eb4db5
- Красота: 1560066984-138dadb4c035, 1522337360788-8b13dee7a37e
- Фитнес: 1534438327276-14e5300c3a48, 1571019614242-c5c5dee9f50b
- Офис/Tech: 1497366216548-37526070297c, 1531297484001-80022131f5a1
- Медицина: 1579684385127-1ef15d508118, 1551190822-a9333d879b1f

═══════════════════════════════════════════════════════════════
✍️ КОПИРАЙТИНГ
═══════════════════════════════════════════════════════════════

ЗАГОЛОВКИ по формулам:
1. "[Боль]? [Решение с цифрой]"
2. "[Результат] за [срок] без [страх]"
3. "Как [получить X], даже если [возражение]"

ОТЗЫВЫ = ИСТОРИИ:
❌ "Отличный сервис, всем рекомендую!"
✅ "Обратился с проблемой X, думал будет дорого. Ребята разобрались за 2 часа, цена оказалась на 40% ниже, чем у конкурентов. Уже 3 раза возвращался."

FAQ = СТРАХИ клиента:
- "А если не понравится результат?"
- "Почему так дорого/дёшево?"
- "Сколько времени это займёт?"
- "Какие гарантии?"

ЦЕНЫ: в рублях (₽), реалистичные для России 2026.

═══════════════════════════════════════════════════════════════
✅ ЧЕКЛИСТ
═══════════════════════════════════════════════════════════════

□ theme с УНИКАЛЬНЫМИ цветами и шрифтами (НЕ стандартные)?
□ 8-12 секций?
□ Все тексты ДЛИННЫЕ и КОНКРЕТНЫЕ?
□ 4-6 отзывов-ИСТОРИЙ (не "Отличный сервис")?
□ 5-6 FAQ про СТРАХИ клиента?
□ Реальные Unsplash URL для картинок?
□ Цены в ₽?
□ JSON валидный?`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, style } = body;

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    if (description.length > 20000) {
      return NextResponse.json(
        { error: 'Description too long' },
        { status: 400 }
      );
    }

    const userPrompt = `Создай УНИКАЛЬНЫЙ продающий лендинг для:

${description}

${style ? `Желаемый стиль: ${style}` : ''}

КРИТИЧЕСКИ ВАЖНО:
1. Сгенерируй УНИКАЛЬНУЮ тему (цвета НЕ стандартные, шрифты НЕ Inter/Roboto)
2. Создай 8-12 полноценных секций с ДЛИННЫМИ текстами
3. Отзывы должны быть ИСТОРИЯМИ (не "отличный сервис")
4. FAQ — это ответы на СТРАХИ клиента
5. Используй реальные Unsplash URL для изображений
6. Цены в рублях, реалистичные для России

Ответь ТОЛЬКО валидным JSON.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.9,
      max_tokens: 8000,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    let landing;
    try {
      landing = JSON.parse(content);
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    // Detect niche for fallback theme
    const niche = detectNiche(description);
    const fallbackTheme = NICHE_THEMES[niche] || NICHE_THEMES.default;

    // Ensure theme exists and has all required fields
    if (!landing.theme || !landing.theme.colors) {
      console.log('No theme generated, using fallback for niche:', niche);
      landing.theme = fallbackTheme;
    } else {
      // Merge with fallback to ensure all fields exist
      landing.theme = {
        ...fallbackTheme,
        ...landing.theme,
        colors: {
          ...fallbackTheme.colors,
          ...(landing.theme.colors || {})
        },
        fonts: {
          ...fallbackTheme.fonts,
          ...(landing.theme.fonts || {})
        },
        style: {
          ...fallbackTheme.style,
          ...(landing.theme.style || {})
        }
      };
    }

    // Validate sections
    if (!landing.sections || !Array.isArray(landing.sections)) {
      console.error('No sections in response');
      return NextResponse.json(
        { error: 'AI did not generate sections properly' },
        { status: 500 }
      );
    }

    // Add IDs to sections and ensure data exists
    landing.sections = landing.sections
      .filter((section: any) => section && section.type && section.data)
      .map((section: any, index: number) => ({
        id: nanoid(10),
        order: index,
        ...section,
      }));

    // Add metadata
    landing.id = nanoid(10);
    landing.createdAt = new Date().toISOString();
    landing.tokensUsed = response.usage?.total_tokens || 0;
    landing.description = description;

    console.log('Generated landing with theme:', landing.theme.preset || 'custom', 'and', landing.sections.length, 'sections');

    return NextResponse.json(landing);
  } catch (error: any) {
    console.error('Generation error:', error);

    if (error?.status === 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 500 });
    }

    if (error?.status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}
