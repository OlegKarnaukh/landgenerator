import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Используем Sonnet для правок - достаточно токенов для больших страниц
const EDIT_MODEL = 'claude-sonnet-4-20250514';

export async function POST(request: NextRequest) {
  try {
    const { html, command } = await request.json();

    if (!html || !command) {
      return NextResponse.json(
        { error: 'HTML и команда обязательны' },
        { status: 400 }
      );
    }

    console.log('Edit command:', command);

    // Просто отправляем в Haiku - он дешёвый и быстрый
    const response = await anthropic.messages.create({
      model: EDIT_MODEL,
      max_tokens: 16000,
      messages: [
        {
          role: 'user',
          content: `Отредактируй HTML-лендинг согласно запросу пользователя.

ТЕКУЩИЙ HTML:
${html}

ЗАПРОС ПОЛЬЗОВАТЕЛЯ: ${command}

ВАЖНЫЕ ПРАВИЛА:
1. Выведи ПОЛНЫЙ HTML документ с изменениями
2. Сохрани ВСЁ что не нужно менять - структуру, стили, скрипты
3. Измени ТОЛЬКО то, что просит пользователь
4. НЕ добавляй markdown, комментарии или объяснения
5. Начни СРАЗУ с <!DOCTYPE html>
6. Закончи тегом </html>`,
        },
      ],
    });

    let newHtml = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        newHtml += block.text;
      }
    }

    // Очистка от возможного markdown
    newHtml = newHtml.trim();
    if (newHtml.startsWith('```')) {
      newHtml = newHtml.replace(/^```html?\n?/, '').replace(/\n?```$/, '');
    }

    // Находим начало HTML
    const doctypeIndex = newHtml.toLowerCase().indexOf('<!doctype');
    const htmlIndex = newHtml.toLowerCase().indexOf('<html');
    if (doctypeIndex !== -1) {
      newHtml = newHtml.substring(doctypeIndex);
    } else if (htmlIndex !== -1) {
      newHtml = newHtml.substring(htmlIndex);
    }

    const tokensUsed =
      (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);

    console.log(`Edit completed: ${tokensUsed} tokens (Haiku)`);

    return NextResponse.json({
      html: newHtml,
      tokensUsed,
      editType: 'haiku',
      message: 'Изменения применены',
    });
  } catch (error: any) {
    console.error('Edit error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка редактирования' },
      { status: 500 }
    );
  }
}
