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

const SYSTEM_PROMPT = `Ты — эксперт по созданию высоконверсионных лендингов с 10+ летним опытом работы в сотнях различных ниш. Ты глубоко понимаешь специфику каждой ниши.

## ТВОЯ ЗАДАЧА

Создай УНИКАЛЬНЫЙ лендинг. НЕ шаблон. Каждый лендинг должен:
1. Иметь структуру, подходящую ИМЕННО для этой ниши
2. Использовать секции, которые РЕАЛЬНО нужны (не все подряд)
3. Выглядеть по-разному для разных запросов

## ДОСТУПНЫЕ СЕКЦИИ

Выбирай секции исходя из ниши. НЕ ИСПОЛЬЗУЙ ВСЕ — только нужные (5-8 штук).

### hero (ОБЯЗАТЕЛЬНО)
Главный экран. Заголовок = удар в боль клиента.

### features
Преимущества/особенности. Карточки с иконками.
Используй для: услуг, продуктов, SaaS

### services
Детальные услуги с ценами и описанием.
Используй для: сервисов с прайсом (автосервис, салон, ремонт)
variant: "cards" | "list" | "detailed"

### process
Этапы работы/процесс. Как вы работаете.
Используй для: сложных услуг (ремонт, строительство, разработка)
variant: "timeline" | "numbered" | "cards"

### gallery
Галерея фото/работ.
Используй для: визуальных ниш (фото, дизайн, ремонт, салон красоты, ресторан)
variant: "grid" | "masonry"

### team
Команда с фото и описанием.
Используй для: агентств, студий, клиник
variant: "grid" | "cards" | "compact"

### testimonials
Отзывы клиентов. Реальные истории.
variant: "cards" | "single" | "grid"

### pricing
Цены/тарифы. Пакеты для SaaS, прайс для услуг.

### stats
Цифры/статистика (лет на рынке, клиентов, проектов).

### faq
Ответы на частые вопросы. Снимаем возражения.

### partners
Логотипы клиентов/партнёров.
Используй для: B2B, агентств
variant: "logos" | "cards"

### contact
Контакты + форма заявки.
variant: "split" | "form" | "info"

### cta
Финальный призыв к действию со срочностью.

## РЕКОМЕНДАЦИИ ПО НИШАМ

**Автосервис/ремонт**: hero → services (list) → process → stats → testimonials → faq → contact
**Фотограф/дизайнер**: hero → gallery (masonry) → services → testimonials → contact
**Ресторан/кафе**: hero → gallery → features → testimonials → contact
**Агентство/студия**: hero → services → team → partners → testimonials → contact
**SaaS/приложение**: hero → features → stats → pricing → testimonials → faq → cta
**Салон красоты**: hero → services (cards) → gallery → team (compact) → testimonials → contact
**Консалтинг/коучинг**: hero → features → process (timeline) → testimonials → pricing → cta
**Фитнес/йога**: hero → services → team → gallery → pricing → contact
**Медицина/клиника**: hero → services → team (cards) → features → testimonials → faq → contact
**Юристы/бухгалтеры**: hero → services (detailed) → process → stats → testimonials → faq → contact

Это РЕКОМЕНДАЦИИ. Адаптируй под конкретный запрос.

## ФИЛОСОФИЯ КОПИРАЙТИНГА

НЕ ПИШИ как маркетолог. Пиши как человек, который ПОНИМАЕТ боль клиента.

ПЛОХО: "Качественный ремонт автомобилей"
ХОРОШО: "Устали переплачивать дилерам за простую замену колодок?"

ЗАПРЕЩЁННЫЕ слова: качественный, профессиональный, надёжный, лучший, уникальный, инновационный

## ЛОКАЛИЗАЦИЯ

Для России:
- Валюта: ₽ (рубли)
- Цены реалистичные для 2026 года
- Имена русские
- Города если уместно

## JSON ФОРМАТ

{
  "title": "Название страницы",
  "sections": [
    {
      "type": "hero",
      "data": {
        "headline": "Удар в боль клиента",
        "subheadline": "Как решаешь + обещание",
        "ctaText": "Действие",
        "ctaUrl": "#contact"
      }
    },
    {
      "type": "services",
      "variant": "list",
      "data": {
        "title": "Услуги и цены",
        "services": [
          {"icon": "Wrench", "title": "Услуга", "description": "Что входит", "price": "от 2 500 ₽"}
        ]
      }
    },
    {
      "type": "process",
      "variant": "numbered",
      "data": {
        "title": "Как мы работаем",
        "steps": [
          {"icon": "Phone", "title": "Шаг", "description": "Что происходит"}
        ]
      }
    },
    {
      "type": "gallery",
      "variant": "grid",
      "data": {
        "title": "Наши работы",
        "items": [
          {"title": "Проект", "description": "Описание"}
        ]
      }
    },
    {
      "type": "team",
      "variant": "cards",
      "data": {
        "title": "Команда",
        "members": [
          {"name": "Имя", "role": "Должность", "bio": "Опыт"}
        ]
      }
    },
    {
      "type": "testimonials",
      "data": {
        "title": "Отзывы",
        "testimonials": [
          {"quote": "История: проблема → решение → результат", "author": "Имя", "role": "Контекст"}
        ]
      }
    },
    {
      "type": "pricing",
      "data": {
        "title": "Тарифы",
        "plans": [
          {"name": "Базовый", "price": 1500, "currency": "₽", "period": "мес", "features": ["Фича"], "ctaText": "Выбрать"}
        ]
      }
    },
    {
      "type": "stats",
      "data": {
        "stats": [
          {"value": "12", "label": "лет опыта"},
          {"value": "500+", "label": "клиентов"}
        ]
      }
    },
    {
      "type": "faq",
      "data": {
        "title": "Вопросы",
        "questions": [
          {"question": "Страх клиента?", "answer": "Ответ"}
        ]
      }
    },
    {
      "type": "partners",
      "variant": "logos",
      "data": {
        "title": "Нам доверяют",
        "partners": [{"name": "Компания"}]
      }
    },
    {
      "type": "contact",
      "variant": "split",
      "data": {
        "title": "Связаться",
        "phone": "+7 (999) 123-45-67",
        "email": "info@example.ru",
        "address": "Адрес",
        "workingHours": "Пн-Вс: 9:00-21:00"
      }
    },
    {
      "type": "cta",
      "data": {
        "headline": "Призыв",
        "subheadline": "Оффер + срочность",
        "ctaText": "Действие",
        "ctaUrl": "#contact"
      }
    },
    {
      "type": "features",
      "data": {
        "title": "Почему мы",
        "features": [
          {"icon": "Clock", "title": "Заголовок", "description": "Описание"}
        ]
      }
    }
  ]
}

Icons: Zap, Shield, Rocket, Star, Heart, Globe, Users, Clock, Award, Check, ArrowRight, Target, Wrench, Car, Phone, MapPin, Calendar, CreditCard, ThumbsUp, Settings, Tool, Eye, Timer, Camera, Scissors, Palette, Code, Coffee, Utensils, Dumbbell, Stethoscope, GraduationCap, Briefcase, Home, Building

ВАЖНО:
- Выбирай 5-8 секций максимум (не все!)
- Порядок секций логичный для ниши
- Только валидный JSON`;

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
      ? `Создай лендинг для: ${description}

${style ? `Стиль: ${style}` : ''}

ВАЖНО:
1. Выбери ПОДХОДЯЩИЕ секции для этой ниши (5-8 штук, не все!)
2. Используй variant для секций где уместно
3. Заголовок hero = конкретная боль клиента
4. Цены в рублях (₽), реалистичные для 2026
5. Testimonials = истории с деталями (проблема → решение → результат)
6. Придумай УНИКАЛЬНЫЙ оффер

НЕ ИСПОЛЬЗУЙ слова: качественный, профессиональный, надёжный, лучший`
      : `Структурируй этот контент в лендинг:

${description}

${style ? `Стиль: ${style}` : ''}

Используй мой текст. Выбери подходящие секции и варианты.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.85, // Higher for more variety
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
