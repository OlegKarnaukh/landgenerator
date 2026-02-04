import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import {
  classifyEditCommand,
  applyLocalTextEdit,
  applyLocalStyleEdit,
  extractSection,
  replaceSection,
  EditResult,
} from '@/lib/smart-edit';

export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { html, command } = await request.json();

    if (!html || !command) {
      return NextResponse.json(
        { error: 'HTML и команда обязательны' },
        { status: 400 }
      );
    }

    // Классифицируем команду
    const classification = classifyEditCommand(command);
    console.log('Edit classification:', classification);

    let result: EditResult;

    switch (classification.type) {
      case 'local_text':
        // Локальная замена текста (0 токенов)
        if (classification.details.pattern && classification.details.replacement) {
          result = applyLocalTextEdit(
            html,
            classification.details.pattern,
            classification.details.replacement
          );

          if (result.success) {
            return NextResponse.json({
              html: result.html,
              tokensUsed: 0,
              editType: 'local_text',
              message: result.message,
            });
          }
        }
        // Если локально не получилось - пробуем AI
        break;

      case 'local_style':
        // Локальное изменение стилей (0 токенов)
        result = applyLocalStyleEdit(html, classification.details);

        if (result.success) {
          return NextResponse.json({
            html: result.html,
            tokensUsed: 0,
            editType: 'local_style',
            message: result.message,
          });
        }
        // Если локально не получилось - пробуем AI
        break;

      case 'ai_section':
        // AI редактирование только секции (меньше токенов)
        if (classification.details.sectionKeyword) {
          const sectionData = extractSection(html, classification.details.sectionKeyword);

          if (sectionData) {
            const editedSection = await editSectionWithAI(
              sectionData.section,
              command
            );

            if (editedSection.success) {
              const newHtml = replaceSection(
                html,
                sectionData.startIndex,
                sectionData.endIndex,
                editedSection.html
              );

              return NextResponse.json({
                html: newHtml,
                tokensUsed: editedSection.tokensUsed,
                editType: 'ai_section',
                message: 'Секция отредактирована',
              });
            }
          }
        }
        // Если секцию не нашли - полное редактирование
        break;
    }

    // Fallback: полное AI редактирование
    const fullEditResult = await editFullHtmlWithAI(html, command);

    return NextResponse.json({
      html: fullEditResult.html,
      tokensUsed: fullEditResult.tokensUsed,
      editType: 'ai_full',
      message: 'Изменения применены',
    });
  } catch (error: any) {
    console.error('Smart edit error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка редактирования' },
      { status: 500 }
    );
  }
}

/**
 * Редактирование только одной секции через AI
 */
async function editSectionWithAI(
  sectionHtml: string,
  command: string
): Promise<{ success: boolean; html: string; tokensUsed: number }> {
  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [
        {
          role: 'user',
          content: `Отредактируй эту HTML-секцию согласно запросу.

СЕКЦИЯ:
${sectionHtml}

ЗАПРОС: ${command}

Правила:
- Выведи ТОЛЬКО отредактированную секцию
- Сохрани структуру и стили
- Не добавляй markdown или объяснения
- Начни сразу с <section`,
        },
      ],
    });

    let html = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        html += block.text;
      }
    }

    // Очистка
    html = html.trim();
    if (html.startsWith('```')) {
      html = html.replace(/^```html?\n?/, '').replace(/\n?```$/, '');
    }

    const tokensUsed =
      (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);

    return {
      success: html.includes('<section'),
      html,
      tokensUsed,
    };
  } catch (error) {
    console.error('AI section edit error:', error);
    return { success: false, html: sectionHtml, tokensUsed: 0 };
  }
}

/**
 * Полное редактирование HTML через AI (дорого)
 */
async function editFullHtmlWithAI(
  html: string,
  command: string
): Promise<{ html: string; tokensUsed: number }> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 16000,
    messages: [
      {
        role: 'user',
        content: `Отредактируй этот HTML-лендинг согласно запросу.

HTML:
${html}

ЗАПРОС: ${command}

Правила:
- Выведи ПОЛНЫЙ отредактированный HTML
- Сохрани всё что не нужно менять
- Не добавляй markdown или объяснения
- Начни сразу с <!DOCTYPE html>`,
      },
    ],
  });

  let newHtml = '';
  for (const block of response.content) {
    if (block.type === 'text') {
      newHtml += block.text;
    }
  }

  // Очистка
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

  return { html: newHtml, tokensUsed };
}
