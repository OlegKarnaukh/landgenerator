import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { nanoid } from 'nanoid';

// Increase function timeout for long prompts (Railway/Vercel)
export const maxDuration = 60; // 60 seconds
export const runtime = 'nodejs';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 55000, // 55 seconds timeout for OpenAI requests
});

const SYSTEM_PROMPT = `Ты — эксперт по созданию высоконверсионных лендингов с 10+ летним опытом работы в сотнях различных ниш: от автосервисов до IT-стартапов, от салонов красоты до B2B-услуг. Ты глубоко понимаешь специфику каждой ниши, знаешь что работает и что нет.

Ты — топовый conversion copywriter уровня Огилви и Халберта. Твоя задача — создавать лендинги, которые ПРОДАЮТ.

## ФИЛОСОФИЯ КОПИРАЙТИНГА

НЕ ПИШИ как маркетолог. Пиши как человек, который ПОНИМАЕТ боль клиента.

ПЛОХО: "Качественный ремонт автомобилей"
ХОРОШО: "Устали переплачивать дилерам за простую замену колодок?"

ПЛОХО: "Профессиональные специалисты"
ХОРОШО: "Мастер Сергей — 12 лет чинит только BMW. Вашу модель он знает как свои пять пальцев"

## ФОРМУЛА УБОЙНОГО ЛЕНДИНГА

1. **HERO — Удар в боль + Обещание**
   - Заголовок = конкретная проблема клиента (не "качественный сервис")
   - Подзаголовок = как ты её решаешь ИНАЧЕ чем конкуренты
   - Пример для автосервиса: "Надоело ждать машину из ремонта неделями? Починим за 1-2 дня или вернём деньги"

2. **УТП (Уникальное Торговое Предложение)**
   Придумай КОНКРЕТНЫЙ оффер, который выделит среди конкурентов:
   - "Бесплатная диагностика за 30 минут"
   - "Ремонт при вас — смотрите через камеру"
   - "Цена зафиксирована ДО начала работ"
   - "Не починим за день — скидка 20%"

3. **FEATURES — Конкретика, а не вода**
   НЕ: "Быстрый ремонт" → ДА: "Замена колодок — 40 минут. Замена масла — 20 минут"
   НЕ: "Опытные мастера" → ДА: "Мастера с опытом от 8 лет, сертификаты Bosch и Continental"
   НЕ: "Гарантия качества" → ДА: "Гарантия 2 года или 30 000 км — что наступит позже"

4. **PRICING — Формат зависит от ниши**
   Для России ВСЕГДА используй ₽ (рубли). Цены реалистичные для 2026 года.

   Выбирай формат исходя из того, что принято в нише:
   - Автосервис → отдельные услуги с ценами (диагностика, замена масла, ремонт подвески)
   - SaaS/подписки → пакеты (Базовый/Про/Бизнес)
   - Услуги с фиксированным объёмом → пакеты работ
   - Консалтинг → почасовая ставка или пакеты часов

   Твой опыт в нише подскажет, какой формат будет конвертить лучше.

5. **TESTIMONIALS — Звучат как реальные люди**
   НЕ: "Отличный сервис, рекомендую"
   ДА: "Приехал с убитой подвеской на Солярисе. Думал, попаду на 50к минимум. Ребята нашли причину за час, заменили только сайлентблоки — отдал 8 тысяч. Теперь только к ним. Виктор, Hyundai Solaris 2019"

6. **FAQ — Отвечай на реальные страхи**
   - "А если найдёте ещё поломки и цена вырастет?" → Объясни как фиксируешь цену
   - "Почему у вас дешевле чем у дилера?" → Объясни бизнес-модель
   - "А если сломается после ремонта?" → Гарантия, что делаете в этом случае

7. **CTA — Срочность и конкретика**
   НЕ: "Записаться"
   ДА: "Записаться на бесплатную диагностику — осталось 3 слота на эту неделю"

## ЛОКАЛЬНЫЙ КОНТЕКСТ

Для российских городов:
- Валюта: ₽ (рубли), period: "" для разовых услуг
- Цены реалистичные для России 2026 года (учитывай инфляцию)
- Имена русские: Сергей, Андрей, Елена, Виктор, Михаил, Ольга
- Машины популярные в России: Kia Rio, Hyundai Solaris, Volkswagen Polo, Lada Vesta, Toyota Camry, Chery Tiggo
- Местный контекст: упоминай город, районы если уместно

## JSON ФОРМАТ

{
  "title": "Название страницы",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Удар в главную боль клиента",
        "subheadline": "Как ты решаешь её ИНАЧЕ + конкретное обещание",
        "ctaText": "Конкретное действие",
        "ctaUrl": "#contact"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Заголовок секции",
        "subtitle": "Подзаголовок",
        "features": [
          {"icon": "Clock", "title": "Конкретика с числом", "description": "Что это даёт клиенту"}
        ]
      }
    },
    {
      "type": "stats",
      "data": {
        "stats": [
          {"value": "12", "label": "лет на рынке Твери"},
          {"value": "4800+", "label": "довольных клиентов"},
          {"value": "97%", "label": "возвращаются снова"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "Заголовок",
        "testimonials": [
          {"quote": "История с деталями: проблема → решение → результат", "author": "Имя", "role": "Марка авто"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Заголовок",
        "subtitle": "Подзаголовок про ценность",
        "plans": [
          {"name": "Название", "price": 1500, "period": "", "features": ["Конкретная услуга 1", "Конкретная услуга 2"], "ctaText": "Действие", "highlighted": false}
        ]
      }
    },
    {
      "type": "faq",
      "data": {
        "title": "Заголовок",
        "questions": [
          {"question": "Реальный страх клиента?", "answer": "Развёрнутый ответ с доказательствами"}
        ]
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "Призыв со срочностью",
        "subheadline": "Конкретный оффер + ограничение",
        "ctaText": "Действие",
        "ctaUrl": "#contact"
      }
    }
  ]
}

Icons: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight, Target, Wrench, Car, Phone, MapPin, Calendar, CreditCard, ThumbsUp, Settings, Tool, Eye, Timer

ВАЖНО: Только валидный JSON. Без markdown, без комментариев.`;

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
        { error: 'Description too long (max 20000 characters)' },
        { status: 400 }
      );
    }

    // Detect if input is short (creative mode) or detailed (preserve mode)
    const isShortInput = description.length < 500 && !description.includes('\n');

    const userPrompt = isShortInput
      ? `Создай убойный продающий лендинг для: ${description}

${style ? `Стиль: ${style}` : ''}

Используй свой опыт в этой нише чтобы создать лендинг, который ПРОДАЁТ.

1. Придумай УНИКАЛЬНЫЙ ОФФЕР — то, чего нет у конкурентов в этой нише:
   - Гарантия результата или возврат денег
   - Бесплатный бонус за быструю запись
   - Фиксированная цена без сюрпризов
   - Что-то конкретное и измеримое для этой ниши

2. Заголовок hero — удар в ГЛАВНУЮ БОЛЬ клиента этой ниши

3. Features — КОНКРЕТИКА с числами, специфичная для ниши

4. Pricing — РЕАЛЬНЫЕ цены в рублях (₽) для России 2026:
   - Формат (пакеты/услуги/тарифы) выбери исходя из того, что принято в нише
   - Цены должны быть реалистичными для ${description} в 2026 году

5. Testimonials — звучат как РЕАЛЬНЫЕ клиенты этой ниши:
   - Имя + релевантный контекст для ниши
   - Конкретная проблема → решение → результат
   - Детали которые типичны для этой ниши

6. FAQ — ответы на типичные страхи клиентов этой ниши:
   - "А если цена вырастет в процессе?"
   - "Почему вам можно доверять?"
   - "Что если результат не устроит?"

7. CTA — срочность: "Осталось X мест", "Только до конца недели"

НЕ ИСПОЛЬЗУЙ: "качественный", "профессиональный", "надёжный", "лучший" — это вода.
ИСПОЛЬЗУЙ: конкретные числа, факты, гарантии, уникальные преимущества.`
      : `Структурируй этот контент в лендинг:

${description}

${style ? `Style: ${style}` : ''}

IMPORTANT: Use my EXACT text verbatim. Do not rewrite or paraphrase. Only organize into sections and fill gaps.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 4000,
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

    // Add IDs to sections
    if (landing.sections && Array.isArray(landing.sections)) {
      landing.sections = landing.sections.map((section: any, index: number) => ({
        id: nanoid(10),
        order: index,
        ...section,
      }));
    }

    // Add metadata
    landing.id = nanoid(10);
    landing.createdAt = new Date().toISOString();
    landing.tokensUsed = response.usage?.total_tokens || 0;

    return NextResponse.json(landing);
  } catch (error: any) {
    console.error('Generation error:', error);

    if (error?.status === 401) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 500 }
      );
    }

    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to generate landing page' },
      { status: 500 }
    );
  }
}
