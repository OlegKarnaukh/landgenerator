import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';

export const maxDuration = 120;
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 115000,
});

const SYSTEM_PROMPT = `Ты — топовый веб-дизайнер. Генерируешь ПОЛНЫЙ HTML-код уникальных лендингов.

ФОРМАТ ОТВЕТА:
Отвечай ТОЛЬКО HTML-кодом. Никакого текста до или после. Никаких \`\`\`html маркеров.

ТЕХНИЧЕСКИЕ ТРЕБОВАНИЯ:
1. Полный HTML документ с <!DOCTYPE html>
2. Tailwind CSS через CDN: <script src="https://cdn.tailwindcss.com"></script>
3. Google Fonts через <link> в <head>
4. Lucide Icons: <script src="https://unpkg.com/lucide@latest"></script>
5. Используй <script>lucide.createIcons()</script> в конце body

СТРУКТУРА ЛЕНДИНГА (10-15 секций):
1. Header с навигацией (sticky)
2. Hero — большой, впечатляющий, с CTA
3. Логотипы партнёров/клиентов (если применимо)
4. Проблема/Боль клиента
5. Решение (ваш продукт/услуга)
6. Преимущества (6-8 штук с иконками)
7. Как это работает (4-5 шагов)
8. Услуги/Продукты с ценами
9. Отзывы клиентов (4-6 реальных историй)
10. Портфолио/Галерея работ
11. Команда (если применимо)
12. FAQ (5-8 вопросов)
13. Форма обратной связи
14. CTA секция
15. Footer с контактами и соцсетями

ДИЗАЙН — ИЗБЕГАЙ "AI SLOP":
❌ ЗАПРЕЩЕНО:
- Стандартные цвета: blue-500, purple-500, indigo-600
- Шрифты: Inter, Roboto, Arial
- Скучные градиенты синий→фиолетовый
- Простые карточки без характера
- Мало контента

✅ ТРЕБУЕТСЯ:
- Уникальная цветовая палитра под нишу
- Интересные Google Fonts (Space Grotesk, Outfit, DM Sans, Playfair Display, и т.д.)
- Креативные формы: blob shapes, диагональные секции, волны
- Hover эффекты, transitions
- Тени, градиенты, паттерны
- МНОГО контента: длинные тексты, конкретные цифры, истории

ИЗОБРАЖЕНИЯ:
Используй реальные Unsplash URL:
- https://images.unsplash.com/photo-[ID]?w=800&q=80

Примеры ID:
- Бизнес: 1497366216548-37526070297c
- Еда: 1504674900247-0877df9cc836
- Красота: 1560066984-138dadb4c035
- Авто: 1492144534655-ae79c964c9d7
- Медицина: 1579684385127-1ef15d508118
- Фитнес: 1534438327276-14e5300c3a48

Для аватаров: https://api.dicebear.com/7.x/avataaars/svg?seed=Name

КОПИРАЙТИНГ:
- Заголовки по формуле: "[Боль]? [Решение с цифрой за срок]"
- Отзывы = истории (не "Отличный сервис!")
- FAQ = ответы на страхи клиентов
- Цены в рублях (₽), реалистичные для России

ПРИМЕР ОТЗЫВА:
"Обратился с проблемой X, думал будет дорого. Ребята разобрались за 2 часа, цена оказалась на 40% ниже конкурентов. Уже 3 раза возвращался." — Имя Фамилия, должность

ОБЯЗАТЕЛЬНЫЕ ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ:
- Мобильное меню (hamburger)
- Hover эффекты на кнопках и карточках
- Плавный скролл к якорям
- Анимации появления (можно через CSS)

Создай УНИКАЛЬНЫЙ, ПРОФЕССИОНАЛЬНЫЙ лендинг, который выглядит как работа топового агентства, а не дешёвый AI-шаблон.`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { description, currentHtml, editCommand } = body;

    // If we have currentHtml and editCommand - this is an edit request
    if (currentHtml && editCommand) {
      return handleEditRequest(currentHtml, editCommand);
    }

    // Otherwise - generate new landing
    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    const userPrompt = `Создай лендинг для: ${description}

ВАЖНО:
- Уникальный дизайн, НЕ шаблонный
- 10-15 полноценных секций
- Много контента (длинные тексты, конкретика)
- Реальные изображения с Unsplash
- Цены в рублях

Ответь ТОЛЬКО HTML-кодом.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 16000,
    });

    let html = response.choices[0]?.message?.content || '';

    // Clean up the response
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
      tokensUsed: response.usage?.total_tokens || 0,
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

    return NextResponse.json({ error: 'Failed to generate' }, { status: 500 });
  }
}

async function handleEditRequest(currentHtml: string, editCommand: string) {
  const editPrompt = `У тебя есть текущий HTML лендинга:

\`\`\`html
${currentHtml}
\`\`\`

Пользователь просит внести изменения: "${editCommand}"

Внеси запрошенные изменения и верни ПОЛНЫЙ обновлённый HTML.
Сохрани весь существующий контент, кроме того что нужно изменить.
Ответь ТОЛЬКО HTML-кодом, без markdown маркеров.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'Ты веб-разработчик. Редактируешь HTML по запросу пользователя. Отвечай ТОЛЬКО HTML-кодом.'
      },
      { role: 'user', content: editPrompt },
    ],
    temperature: 0.3,
    max_tokens: 16000,
  });

  let html = response.choices[0]?.message?.content || '';
  html = cleanHtml(html);

  return NextResponse.json({
    html,
    tokensUsed: response.usage?.total_tokens || 0,
  });
}

function cleanHtml(html: string): string {
  // Remove markdown code blocks if present
  html = html.replace(/^```html?\n?/i, '');
  html = html.replace(/\n?```$/i, '');
  html = html.trim();

  // Ensure it starts with DOCTYPE or html tag
  if (!html.toLowerCase().startsWith('<!doctype') && !html.toLowerCase().startsWith('<html')) {
    // Try to find where HTML actually starts
    const doctypeIndex = html.toLowerCase().indexOf('<!doctype');
    const htmlIndex = html.toLowerCase().indexOf('<html');
    const startIndex = doctypeIndex !== -1 ? doctypeIndex : htmlIndex;
    if (startIndex > 0) {
      html = html.substring(startIndex);
    }
  }

  return html;
}
