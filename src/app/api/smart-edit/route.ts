import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const maxDuration = 60;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Haiku для генерации диффов - дёшево и быстро
const EDIT_MODEL = 'claude-3-haiku-20240307';

interface DiffOperation {
  find: string;
  replace: string;
}

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

    // Просим модель вернуть только изменения в формате JSON
    const response = await anthropic.messages.create({
      model: EDIT_MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: `Проанализируй HTML и запрос пользователя. Верни ТОЛЬКО JSON массив с заменами.

HTML:
${html}

ЗАПРОС: ${command}

Верни JSON массив объектов с полями "find" и "replace":
- find: точная строка которую нужно найти в HTML (включая кавычки, пробелы)
- replace: на что заменить

Пример ответа для "сделай кнопку синей":
[{"find": "background-color: #FF6B35", "replace": "background-color: #3b82f6"}, {"find": "bg-orange-500", "replace": "bg-blue-500"}]

ВАЖНО:
1. Верни ТОЛЬКО валидный JSON массив, без markdown и пояснений
2. Строки в find должны ТОЧНО совпадать с тем что есть в HTML
3. Если нужно изменить несколько мест - добавь несколько объектов
4. Для цветов меняй ВСЕ вхождения (inline стили, классы, CSS переменные)
5. Начни ответ с [ и закончи ]`,
        },
      ],
    });

    let diffJson = '';
    for (const block of response.content) {
      if (block.type === 'text') {
        diffJson += block.text;
      }
    }

    // Очистка от возможного markdown
    diffJson = diffJson.trim();
    if (diffJson.startsWith('```')) {
      diffJson = diffJson.replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    }

    // Парсим JSON
    let diffs: DiffOperation[];
    try {
      diffs = JSON.parse(diffJson);
    } catch (parseError) {
      console.error('Failed to parse diff JSON:', diffJson);
      return NextResponse.json(
        { error: 'Не удалось распарсить ответ модели' },
        { status: 500 }
      );
    }

    if (!Array.isArray(diffs) || diffs.length === 0) {
      return NextResponse.json(
        { error: 'Модель не вернула изменений' },
        { status: 400 }
      );
    }

    // Применяем замены
    let newHtml = html;
    let appliedCount = 0;

    for (const diff of diffs) {
      if (diff.find && diff.replace !== undefined) {
        if (newHtml.includes(diff.find)) {
          newHtml = newHtml.split(diff.find).join(diff.replace);
          appliedCount++;
          console.log(`Applied: "${diff.find.substring(0, 50)}..." -> "${diff.replace.substring(0, 50)}..."`);
        } else {
          console.log(`Not found: "${diff.find.substring(0, 50)}..."`);
        }
      }
    }

    const tokensUsed =
      (response.usage?.input_tokens || 0) + (response.usage?.output_tokens || 0);

    console.log(`Edit completed: ${tokensUsed} tokens, ${appliedCount}/${diffs.length} changes applied`);

    if (appliedCount === 0) {
      return NextResponse.json({
        html: html,
        tokensUsed,
        editType: 'diff',
        message: 'Не удалось применить изменения - строки не найдены',
      });
    }

    return NextResponse.json({
      html: newHtml,
      tokensUsed,
      editType: 'diff',
      appliedCount,
      totalChanges: diffs.length,
      message: `Применено ${appliedCount} из ${diffs.length} изменений`,
    });
  } catch (error: any) {
    console.error('Edit error:', error);
    return NextResponse.json(
      { error: error.message || 'Ошибка редактирования' },
      { status: 500 }
    );
  }
}
