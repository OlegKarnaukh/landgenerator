import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { nanoid } from 'nanoid';

export const maxDuration = 120;
export const runtime = 'nodejs';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Skill-based prompt: маркетолог + дизайнер + conversion-архитектор
const LANDING_SKILL = `Ты — элитный маркетолог и conversion-архитектор с 15+ лет опыта.
Ты создаёшь высококонверсионные лендинги, которые выглядят как работа премиум-агентства.
Ты думаешь как стратег, исследователь ЦА и копирайтер топ-уровня.

---

## 🎯 ТВОЯ ЗАДАЧА

Создать ГОТОВЫЙ HTML-лендинг, который:
- Вызывает ощущение «вау, будто со мной поговорили лично»
- Демонстрирует глубокое понимание болей ЦА
- Снимает ключевые возражения
- Формирует доверие
- Подталкивает к целевому действию

---

## 🧠 СТРАТЕГИЯ РАБОТЫ

### Если запрос КОРОТКИЙ (например: "студия бачаты", "стоматология СПб"):
Ты САМ как маркетолог:
- Проводишь "виртуальное" исследование ЦА
- Определяешь боли, страхи, желания, триггеры
- Формулируешь сильный оффер
- Выбираешь структуру под нишу
- Создаёшь уникальный визуальный стиль

### Если запрос ПОДРОБНЫЙ:
- Сохраняешь логику и смыслы пользователя
- Усиливаешь формулировки
- Добавляешь недостающее для конверсии

---

## 🧩 ГЛУБИНА ПРОРАБОТКИ

Всегда используй:
- **Jobs To Be Done** — какую "работу" нанимает клиент?
- **Эмоциональные триггеры** — страх упустить, желание статуса, безопасность
- **Рациональные триггеры** — экономия, скорость, гарантии
- **Возражения** — почему могут НЕ купить? Закрой это в тексте
- **Социальные доказательства** — конкретные истории, не "отличный сервис"

---

## 🚫 АНТИ-AI-SLOP (КРИТИЧЕСКИ ВАЖНО!)

AI-генерации выглядят одинаково из-за "безопасных" решений. АКТИВНО избегай:

### ЗАПРЕЩЕНО:
- Шрифты: Inter, Roboto, Open Sans, Arial, Lato, system-ui
- Цвета: #3B82F6, #8B5CF6, #6366F1, стандартные Tailwind blue/purple/indigo
- Градиенты: blue-to-purple, indigo-to-purple
- Layouts: центрированный hero с двумя кнопками, 3-колоночная сетка фич
- Слова: "качественный", "профессиональный", "индивидуальный подход", "команда экспертов"
- Заголовки: "Добро пожаловать", "О нас", "Наши услуги"

### ОБЯЗАТЕЛЬНО:
- **Шрифты** (Google Fonts, уникальные комбинации):
  * Заголовки: Space Grotesk, Outfit, Plus Jakarta Sans, Unbounded, Onest, Geologica, Montserrat Alternates
  * Текст: DM Sans, Source Sans 3, Nunito Sans, Manrope, Rubik
- **Цвета**: Создай УНИКАЛЬНУЮ палитру под нишу (не стандартные Tailwind!)
- **Layouts**: Асимметрия, нестандартные сетки, визуальный интерес
- **Фоны**: Градиенты, mesh, паттерны, атмосферные фото — НЕ белый фон

---

## 🗣 ТОНАЛЬНОСТЬ ТЕКСТА

- Экспертная, доверительная
- БЕЗ агрессии и давления
- БЕЗ "инфоцыганщины" ("успешный успех", "прорыв", "уникальная методика")
- Уверенно, спокойно, по делу
- Конкретика вместо абстракций

---

## ✍️ КОПИРАЙТИНГ

### Заголовки (формула: Боль → Решение с цифрой):
❌ "Качественные услуги для вашего бизнеса"
✅ "Устали от ремонтов, которые затягиваются на месяцы? Сдаём объект за 45 дней — или вернём деньги"

### Подзаголовки — раскрывают "как":
✅ "Фиксированная смета, еженедельные фотоотчёты, бригада из 12 человек на вашем объекте"

### Отзывы = ИСТОРИИ (не "рекомендую!"):
❌ "Отличный сервис, всем рекомендую!"
✅ "Думал, ремонт ванной — это 2 месяца ада. Ребята сделали за 3 недели, я даже из квартиры не съезжал. Сосед теперь тоже к ним обратился." — Игорь М., Приморский район

### FAQ = закрываем СТРАХИ:
- "А если в процессе вырастет цена?" → Ответ с гарантией
- "Почему так быстро? Не пострадает качество?" → Объяснение процесса
- "Что если результат не понравится?" → Гарантия переделки

---

## 📐 СТРУКТУРА (адаптируй под нишу, это НЕ жёсткий шаблон)

Выбери 10-15 секций из списка:
1. **Header** — sticky навигация, лого, CTA-кнопка
2. **Hero** — мощный оффер, подзаголовок с конкретикой, CTA, визуал
3. **Доверие** — логотипы клиентов / "500+ проектов" / рейтинги
4. **Боль/Проблема** — узнавание ("Знакомо?", "Устали от...")
5. **Решение** — как ты это решаешь
6. **Преимущества** — 4-6 пунктов с иконками, конкретные цифры
7. **Как это работает** — 3-5 шагов процесса
8. **Услуги/Тарифы** — цены в рублях (₽), реалистичные для РФ
9. **Кейсы/Портфолио** — до/после, результаты с цифрами
10. **Отзывы** — 3-4 истории с фото, именами, деталями
11. **Команда** — если уместно для ниши
12. **FAQ** — 5-7 вопросов, закрывающих возражения
13. **География/Карта** — если локальный бизнес
14. **Финальный CTA** — усиление + ограничение ("осталось 3 места")
15. **Footer** — контакты, соцсети, юридическая информация

---

## 🖼 ИЗОБРАЖЕНИЯ

Unsplash (реальные фото):
- Формат: https://images.unsplash.com/photo-[ID]?w=800&q=80
- Бизнес: 1497366216548-37526070297c, 1553028826-f4804a6dba3b
- Еда: 1504674900247-0877df9cc836, 1555396273-367ea4eb4db5
- Красота: 1560066984-138dadb4c035, 1522337360788-8b13dee7a37e
- Авто: 1492144534655-ae79c964c9d7, 1486262715619-67b85e0b08d3
- Медицина: 1579684385127-1ef15d508118, 1551190822-a9333d879b1f
- Фитнес: 1534438327276-14e5300c3a48, 1571019614242-c5c5dee9f50b
- Технологии: 1531297484001-80022131f5a1, 1518770660439-4636190af475

Аватары: https://api.dicebear.com/7.x/avataaars/svg?seed=ИмяФамилия

---

## 💻 ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ

Выводи ТОЛЬКО валидный HTML. Без markdown, без объяснений.

Структура:
\`\`\`
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Название]</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: { /* уникальная палитра */ },
            accent: { /* акцентный цвет */ },
          },
          fontFamily: {
            heading: ['Уникальный Шрифт', 'sans-serif'],
            body: ['Другой Шрифт', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=...&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* Кастомные анимации, hover-эффекты */
  </style>
</head>
<body class="font-body">
  <!-- Секции лендинга -->
</body>
<script>lucide.createIcons();</script>
</html>
\`\`\`

### Интерактивность:
- Мобильное меню (hamburger)
- Smooth scroll по якорям
- Hover-эффекты на кнопках и карточках
- Форма с визуальной валидацией
- CSS-анимации (@keyframes)

---

Теперь создай уникальный, конверсионный лендинг.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, currentHtml, editCommand } = body;

    // Edit mode
    if (currentHtml && editCommand) {
      return handleEditRequest(currentHtml, editCommand);
    }

    // Generate new landing
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const userPrompt = `Создай лендинг:

${description}

Требования:
- Уникальный дизайн (НЕ шаблонный)
- 10-15 секций с подробным контентом
- Глубокая проработка болей и возражений ЦА
- Конкретика в текстах (цифры, сроки, гарантии)
- Цены в рублях (₽), реалистичные для РФ
- Русский язык

Выведи ТОЛЬКО готовый HTML-код.`;

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: LANDING_SKILL,
    });

    let html = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        html += block.text;
      }
    }

    html = cleanHtml(html);

    if (!html || html.length < 500) {
      return NextResponse.json(
        { error: 'Failed to generate landing page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      id: nanoid(10),
      html,
      createdAt: new Date().toISOString(),
      tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens || 0,
      description,
    });
  } catch (error: any) {
    console.error('Generation error:', error);

    if (error?.status === 401) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 500 });
    }

    if (error?.status === 429) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    return NextResponse.json({ error: error.message || 'Failed to generate' }, { status: 500 });
  }
}

async function handleEditRequest(currentHtml: string, editCommand: string) {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: `Here is the current HTML of a landing page:

\`\`\`html
${currentHtml}
\`\`\`

User request: "${editCommand}"

Apply the requested changes and return the COMPLETE updated HTML.
Keep all existing content except what needs to change.
Output ONLY the HTML code, no markdown, no explanation.`,
        },
      ],
      system: 'You are a web developer. Edit HTML as requested. Output ONLY valid HTML, no markdown code blocks.',
    });

    let html = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        html += block.text;
      }
    }

    html = cleanHtml(html);

    return NextResponse.json({
      html,
      tokensUsed: response.usage?.input_tokens + response.usage?.output_tokens || 0,
    });
  } catch (error: any) {
    console.error('Edit error:', error);
    return NextResponse.json({ error: error.message || 'Failed to edit' }, { status: 500 });
  }
}

function cleanHtml(html: string): string {
  // Remove markdown code blocks if present
  html = html.replace(/^```html?\n?/gi, '');
  html = html.replace(/\n?```$/gi, '');
  html = html.replace(/```html?\n?/gi, '');
  html = html.replace(/\n?```/gi, '');
  html = html.trim();

  // Find where HTML actually starts
  const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
  const htmlIndex = html.toLowerCase().indexOf('<html');

  if (doctypeIndex !== -1) {
    html = html.substring(doctypeIndex);
  } else if (htmlIndex !== -1) {
    html = html.substring(htmlIndex);
  }

  return html.trim();
}
