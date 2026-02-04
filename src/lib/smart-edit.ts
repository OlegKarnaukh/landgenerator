/**
 * Умное редактирование лендинга с минимальным расходом токенов
 */

export type EditType = 'local_text' | 'local_style' | 'ai_section' | 'ai_full';

export interface EditClassification {
  type: EditType;
  confidence: number;
  details: {
    pattern?: string;
    replacement?: string;
    sectionKeyword?: string;
    colorChange?: { from?: string; to: string };
  };
}

export interface EditResult {
  success: boolean;
  html: string;
  tokensUsed: number;
  editType: EditType;
  message?: string;
}

// Цвета Tailwind (разные формы слов)
const TAILWIND_COLORS: Record<string, string> = {
  // Красный
  'красн': 'red', 'красный': 'red', 'красные': 'red', 'красным': 'red', 'красного': 'red',
  // Синий
  'синий': 'blue', 'синие': 'blue', 'синего': 'blue', 'синим': 'blue', 'синими': 'blue', 'синюю': 'blue',
  // Зеленый
  'зелен': 'green', 'зеленый': 'green', 'зеленые': 'green', 'зеленым': 'green',
  // Желтый
  'желт': 'yellow', 'желтый': 'yellow', 'желтые': 'yellow',
  // Оранжевый
  'оранж': 'orange', 'оранжевый': 'orange', 'оранжевые': 'orange', 'оранжевым': 'orange',
  // Фиолетовый
  'фиолет': 'purple', 'фиолетовый': 'purple', 'фиолетовые': 'purple',
  // Розовый
  'розов': 'pink', 'розовый': 'pink', 'розовые': 'pink',
  // Серый
  'сер': 'gray', 'серый': 'gray', 'серые': 'gray',
  // Черный
  'черн': 'black', 'черный': 'black', 'черные': 'black',
  // Белый
  'бел': 'white', 'белый': 'white', 'белые': 'white',
  // Голубой
  'голуб': 'sky', 'голубой': 'sky', 'голубые': 'sky',
  // Бирюзовый
  'бирюз': 'teal', 'бирюзовый': 'teal',
  // Изумрудный
  'изумруд': 'emerald', 'изумрудный': 'emerald',
  // Индиго
  'индиго': 'indigo',
};

// Паттерны для классификации команд
const PATTERNS = {
  // Простая замена текста: "замени X на Y", "поменяй X на Y"
  textReplace: /(?:замен|помен|измен)\w*\s+[«"']?(.+?)[»"']?\s+на\s+[«"']?(.+?)[»"']?$/i,

  // Установка контактов
  phone: /(?:телефон|номер|тел)[\s:]+([+\d\s\-()]+)/i,
  email: /(?:email|почт[ау]|e-mail)[\s:]+([^\s]+@[^\s]+)/i,
  address: /(?:адрес)[\s:]+(.+)$/i,

  // Изменение цвета кнопок - разные формы:
  // "поменяй цвет кнопки на синий", "сделай кнопки синими", "кнопки синие"
  buttonColorToNew: /кноп\w*\s+(?:на\s+)?(\w+)/i,
  buttonColorChange: /(?:цвет|покрас)\w*\s+(?:\w+\s+)?кноп\w*\s+(?:на\s+)?(\w+)/i,
  makeButtonsColor: /(?:сделай|измени|поменяй)\w*\s+(?:\w+\s+)?кноп\w*\s+(?:\w+\s+)?(?:на\s+)?(\w+)/i,
  colorButtons: /(\w+)\s+кноп/i,  // "синие кнопки"

  // Изменение размера текста
  textBigger: /(?:текст|шрифт|заголов)\w*\s+(?:крупн|больш|увелич)/i,
  textSmaller: /(?:текст|шрифт|заголов)\w*\s+(?:мельч|меньш|уменьш)/i,

  // Работа с секциями
  removeSection: /(?:убер|удал|убра)\w*\s+(?:секци|блок|раздел)\w*\s+(.+)/i,
  addSection: /(?:добав|встав)\w*\s+(?:секци|блок|раздел)/i,

  // Изменение конкретной секции
  editSection: /(?:измен|отредактир|перепиш)\w*\s+(?:секци|блок|раздел)\w*\s+(.+)/i,
};

/**
 * Классифицирует команду редактирования
 */
export function classifyEditCommand(command: string): EditClassification {
  const cmd = command.toLowerCase().trim();

  // 1. Проверяем простую замену текста
  const textMatch = command.match(PATTERNS.textReplace);
  if (textMatch) {
    return {
      type: 'local_text',
      confidence: 0.9,
      details: {
        pattern: textMatch[1],
        replacement: textMatch[2],
      },
    };
  }

  // 2. Проверяем установку контактов
  const phoneMatch = command.match(PATTERNS.phone);
  if (phoneMatch) {
    return {
      type: 'local_text',
      confidence: 0.85,
      details: {
        pattern: 'phone',
        replacement: phoneMatch[1].trim(),
      },
    };
  }

  const emailMatch = command.match(PATTERNS.email);
  if (emailMatch) {
    return {
      type: 'local_text',
      confidence: 0.85,
      details: {
        pattern: 'email',
        replacement: emailMatch[1].trim(),
      },
    };
  }

  // 3. Проверяем изменение цвета кнопок (несколько паттернов)
  // Если в команде есть слово "кноп" - это про кнопки
  if (cmd.includes('кноп')) {
    // Пробуем разные паттерны
    const patterns = [
      PATTERNS.buttonColorChange,
      PATTERNS.makeButtonsColor,
      PATTERNS.buttonColorToNew,
    ];

    for (const pattern of patterns) {
      const match = cmd.match(pattern);
      if (match) {
        const colorWord = match[1];
        const tailwindColor = findTailwindColor(colorWord);
        if (tailwindColor) {
          return {
            type: 'local_style',
            confidence: 0.95,
            details: {
              colorChange: { to: tailwindColor },
            },
          };
        }
      }
    }

    // Проверяем паттерн "синие кнопки" (цвет перед словом кнопки)
    const colorBeforeMatch = cmd.match(PATTERNS.colorButtons);
    if (colorBeforeMatch) {
      const colorWord = colorBeforeMatch[1];
      const tailwindColor = findTailwindColor(colorWord);
      if (tailwindColor) {
        return {
          type: 'local_style',
          confidence: 0.9,
          details: {
            colorChange: { to: tailwindColor },
          },
        };
      }
    }
  }

  // 4. Проверяем общее изменение цвета (если нет слова кнопки, но есть цвет)
  // Ищем цвет в конце команды после "на"
  const colorAfterNa = cmd.match(/на\s+(\w+)\s*$/);
  if (colorAfterNa) {
    const colorWord = colorAfterNa[1];
    const tailwindColor = findTailwindColor(colorWord);
    if (tailwindColor) {
      return {
        type: 'local_style',
        confidence: 0.7,
        details: {
          colorChange: { to: tailwindColor },
        },
      };
    }
  }

  // 5. Проверяем увеличение/уменьшение текста
  if (PATTERNS.textBigger.test(cmd)) {
    return {
      type: 'local_style',
      confidence: 0.8,
      details: {
        pattern: 'text_bigger',
      },
    };
  }

  if (PATTERNS.textSmaller.test(cmd)) {
    return {
      type: 'local_style',
      confidence: 0.8,
      details: {
        pattern: 'text_smaller',
      },
    };
  }

  // 6. Удаление секции
  const removeSectionMatch = cmd.match(PATTERNS.removeSection);
  if (removeSectionMatch) {
    return {
      type: 'local_style',
      confidence: 0.85,
      details: {
        sectionKeyword: removeSectionMatch[1],
      },
    };
  }

  // 7. Редактирование конкретной секции → AI но только секция
  const editSectionMatch = cmd.match(PATTERNS.editSection);
  if (editSectionMatch) {
    return {
      type: 'ai_section',
      confidence: 0.8,
      details: {
        sectionKeyword: editSectionMatch[1],
      },
    };
  }

  // 8. Добавление секции → AI полный
  if (PATTERNS.addSection.test(cmd)) {
    return {
      type: 'ai_full',
      confidence: 0.9,
      details: {},
    };
  }

  // По умолчанию - AI с секцией если можем определить, иначе полный
  const sectionKeyword = detectSectionFromCommand(cmd);
  if (sectionKeyword) {
    return {
      type: 'ai_section',
      confidence: 0.5,
      details: {
        sectionKeyword,
      },
    };
  }

  return {
    type: 'ai_full',
    confidence: 0.3,
    details: {},
  };
}

/**
 * Находит Tailwind цвет по русскому слову
 */
function findTailwindColor(word: string): string | null {
  const lower = word.toLowerCase();
  for (const [ru, en] of Object.entries(TAILWIND_COLORS)) {
    if (lower.includes(ru)) {
      return en;
    }
  }
  return null;
}

/**
 * Определяет секцию по ключевым словам в команде
 */
function detectSectionFromCommand(cmd: string): string | null {
  const sectionKeywords: Record<string, string[]> = {
    'hero': ['hero', 'главн', 'первы', 'заголов', 'шапк'],
    'features': ['преимущ', 'фич', 'особенност', 'плюс'],
    'services': ['услуг', 'сервис', 'тариф', 'цен', 'прайс'],
    'testimonials': ['отзыв', 'клиент говор', 'мнени'],
    'faq': ['faq', 'вопрос', 'ответ', 'чаво'],
    'contact': ['контакт', 'связ', 'форм', 'адрес'],
    'footer': ['футер', 'подвал', 'низ'],
    'team': ['команд', 'сотрудник', 'специалист'],
    'portfolio': ['портфолио', 'работ', 'кейс', 'проект'],
    'process': ['процесс', 'этап', 'шаг', 'как работ'],
  };

  for (const [section, keywords] of Object.entries(sectionKeywords)) {
    for (const keyword of keywords) {
      if (cmd.includes(keyword)) {
        return section;
      }
    }
  }

  return null;
}

/**
 * Выполняет локальную замену текста
 */
export function applyLocalTextEdit(html: string, pattern: string, replacement: string): EditResult {
  const originalHtml = html;
  let newHtml = html;

  if (pattern === 'phone') {
    // Заменяем телефоны
    newHtml = html.replace(
      /(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g,
      replacement
    );
  } else if (pattern === 'email') {
    // Заменяем email
    newHtml = html.replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      replacement
    );
  } else {
    // Обычная замена текста
    newHtml = html.split(pattern).join(replacement);
  }

  const success = newHtml !== originalHtml;

  return {
    success,
    html: newHtml,
    tokensUsed: 0,
    editType: 'local_text',
    message: success ? 'Текст заменён' : 'Текст не найден',
  };
}

/**
 * Применяет локальное изменение стилей
 */
export function applyLocalStyleEdit(
  html: string,
  details: EditClassification['details']
): EditResult {
  let newHtml = html;
  let success = false;
  let message = '';

  // Изменение цвета кнопок
  if (details.colorChange) {
    const color = details.colorChange.to;
    const originalHtml = newHtml;

    // 1. Заменяем Tailwind классы bg-*-NNN (фон)
    newHtml = newHtml.replace(
      /bg-(blue|green|red|purple|indigo|pink|yellow|orange|teal|cyan|emerald|sky|violet|fuchsia|rose|amber|lime|gray|slate|zinc|neutral|stone)-(\d{2,3})/g,
      `bg-${color}-$2`
    );

    // 2. Заменяем hover:bg-*-NNN
    newHtml = newHtml.replace(
      /hover:bg-(blue|green|red|purple|indigo|pink|yellow|orange|teal|cyan|emerald|sky|violet|fuchsia|rose|amber|lime|gray|slate|zinc|neutral|stone)-(\d{2,3})/g,
      `hover:bg-${color}-$2`
    );

    // 3. Заменяем text-*-NNN (цвет текста, кроме white/black/gray)
    newHtml = newHtml.replace(
      /text-(blue|green|red|purple|indigo|pink|yellow|orange|teal|cyan|emerald|sky|violet|fuchsia|rose|amber|lime)-(\d{2,3})/g,
      `text-${color}-$2`
    );

    // 4. Заменяем border-*-NNN
    newHtml = newHtml.replace(
      /border-(blue|green|red|purple|indigo|pink|yellow|orange|teal|cyan|emerald|sky|violet|fuchsia|rose|amber|lime|gray|slate|zinc|neutral|stone)-(\d{2,3})/g,
      `border-${color}-$2`
    );

    // 5. Заменяем ring-*-NNN
    newHtml = newHtml.replace(
      /ring-(blue|green|red|purple|indigo|pink|yellow|orange|teal|cyan|emerald|sky|violet|fuchsia|rose|amber|lime)-(\d{2,3})/g,
      `ring-${color}-$2`
    );

    // Проверяем изменился ли HTML
    if (newHtml !== originalHtml) {
      success = true;
      message = `Цвет изменён на ${color}`;
    }
  }

  // Увеличение размера текста
  if (details.pattern === 'text_bigger') {
    const sizeMap: Record<string, string> = {
      'text-sm': 'text-base',
      'text-base': 'text-lg',
      'text-lg': 'text-xl',
      'text-xl': 'text-2xl',
      'text-2xl': 'text-3xl',
      'text-3xl': 'text-4xl',
      'text-4xl': 'text-5xl',
    };

    for (const [from, to] of Object.entries(sizeMap)) {
      if (html.includes(from)) {
        newHtml = newHtml.split(from).join(to);
        success = true;
      }
    }
    message = success ? 'Текст увеличен' : 'Не удалось увеличить текст';
  }

  // Уменьшение размера текста
  if (details.pattern === 'text_smaller') {
    const sizeMap: Record<string, string> = {
      'text-5xl': 'text-4xl',
      'text-4xl': 'text-3xl',
      'text-3xl': 'text-2xl',
      'text-2xl': 'text-xl',
      'text-xl': 'text-lg',
      'text-lg': 'text-base',
      'text-base': 'text-sm',
    };

    for (const [from, to] of Object.entries(sizeMap)) {
      if (html.includes(from)) {
        newHtml = newHtml.split(from).join(to);
        success = true;
      }
    }
    message = success ? 'Текст уменьшен' : 'Не удалось уменьшить текст';
  }

  // Удаление секции
  if (details.sectionKeyword) {
    const keyword = details.sectionKeyword.toLowerCase();
    // Ищем секцию по id или классу содержащему ключевое слово
    const sectionRegex = new RegExp(
      `<section[^>]*(?:id|class)="[^"]*${keyword}[^"]*"[^>]*>[\\s\\S]*?<\\/section>`,
      'gi'
    );

    if (sectionRegex.test(html)) {
      newHtml = html.replace(sectionRegex, '');
      success = true;
      message = 'Секция удалена';
    }
  }

  return {
    success,
    html: newHtml,
    tokensUsed: 0,
    editType: 'local_style',
    message,
  };
}

/**
 * Извлекает секцию из HTML по ключевому слову
 */
export function extractSection(html: string, sectionKeyword: string): {
  section: string;
  startIndex: number;
  endIndex: number;
} | null {
  const keyword = sectionKeyword.toLowerCase();

  // Пробуем найти по id
  const idRegex = new RegExp(
    `(<section[^>]*id="[^"]*${keyword}[^"]*"[^>]*>[\\s\\S]*?<\\/section>)`,
    'i'
  );
  let match = html.match(idRegex);

  if (match) {
    const startIndex = html.indexOf(match[1]);
    return {
      section: match[1],
      startIndex,
      endIndex: startIndex + match[1].length,
    };
  }

  // Пробуем найти по содержимому (заголовки)
  const headingKeywords: Record<string, string[]> = {
    'hero': ['Устали', 'Забудьте', 'Хватит'],
    'features': ['Преимущества', 'Почему мы', 'Почему выбирают'],
    'services': ['Услуги', 'Цены', 'Тарифы', 'Стоимость'],
    'testimonials': ['Отзывы', 'Что говорят', 'Клиенты'],
    'faq': ['Вопросы', 'FAQ', 'Частые вопросы'],
    'contact': ['Контакты', 'Связаться', 'Написать нам'],
    'team': ['Команда', 'Наши специалисты', 'Эксперты'],
    'process': ['Как это работает', 'Этапы', 'Процесс'],
  };

  const keywords = headingKeywords[keyword] || [keyword];

  for (const kw of keywords) {
    const contentRegex = new RegExp(
      `(<section[^>]*>[\\s\\S]*?${kw}[\\s\\S]*?<\\/section>)`,
      'i'
    );
    match = html.match(contentRegex);
    if (match) {
      const startIndex = html.indexOf(match[1]);
      return {
        section: match[1],
        startIndex,
        endIndex: startIndex + match[1].length,
      };
    }
  }

  return null;
}

/**
 * Заменяет секцию в HTML
 */
export function replaceSection(
  html: string,
  startIndex: number,
  endIndex: number,
  newSection: string
): string {
  return html.slice(0, startIndex) + newSection + html.slice(endIndex);
}
