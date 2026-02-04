'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  Download,
  Send,
  Monitor,
  Smartphone,
  Tablet,
  Code,
  RotateCcw,
  Copy,
  Check,
  MessageSquare,
  X,
  Save,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HtmlPreview } from '@/components/landing/HtmlPreview';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';

const PENDING_PROMPT_KEY = 'landgen_pending_prompt';

export default function CreatePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedId, setSavedId] = useState<string | null>(null);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // При загрузке страницы проверяем есть ли сохранённый промпт
  useEffect(() => {
    if (status === 'authenticated') {
      const pendingPrompt = localStorage.getItem(PENDING_PROMPT_KEY);
      if (pendingPrompt) {
        localStorage.removeItem(PENDING_PROMPT_KEY);
        setDescription(pendingPrompt);
        // Автоматически начинаем генерацию
        setTimeout(() => {
          startGeneration(pendingPrompt);
        }, 100);
      }
    }
  }, [status]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const startGeneration = async (prompt: string) => {
    setIsGenerating(true);
    setError(null);
    setChatMessages([]);

    try {
      const response = await fetch('/api/generate-html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка генерации');
      }

      setHtml(data.html);
      setChatMessages([
        {
          role: 'assistant',
          content: 'Лендинг создан! Вы можете попросить меня внести изменения. Например:\n• "Сделай заголовок крупнее"\n• "Измени цвет кнопок на зелёный"\n• "Добавь ещё один отзыв"\n• "Убери секцию FAQ"',
        },
      ]);
    } catch (err: any) {
      setError(err.message || 'Что-то пошло не так');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Опишите ваш продукт или услугу');
      return;
    }

    // Если пользователь не авторизован — сохраняем промпт и редиректим на регистрацию
    if (!session) {
      localStorage.setItem(PENDING_PROMPT_KEY, description);
      router.push('/register');
      return;
    }

    await startGeneration(description);
  };

  const handleEdit = async () => {
    if (!chatInput.trim() || !html) return;

    const userMessage = chatInput;
    setChatInput('');
    setChatMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsEditing(true);

    try {
      const response = await fetch('/api/smart-edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html,
          command: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка редактирования');
      }

      setHtml(data.html);

      // Формируем информативное сообщение в зависимости от типа редактирования
      let responseMsg = data.message || 'Готово! Изменения применены.';
      if (data.tokensUsed === 0) {
        responseMsg += ' (без AI, мгновенно)';
      } else if (data.editType === 'ai_section') {
        responseMsg += ` (отредактирована секция, ${data.tokensUsed} токенов)`;
      } else if (data.editType === 'ai_full') {
        responseMsg += ` (полное редактирование, ${data.tokensUsed} токенов)`;
      }

      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: responseMsg },
      ]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Ошибка: ${err.message}` },
      ]);
    } finally {
      setIsEditing(false);
    }
  };

  const handleCopyCode = async () => {
    if (html) {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (html) {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'landing.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const handleReset = () => {
    setHtml(null);
    setDescription('');
    setChatMessages([]);
    setShowCode(false);
    setChatOpen(false);
    setSavedId(null);
  };

  const handleSave = async () => {
    if (!html || !session) return;

    setIsSaving(true);
    try {
      const res = await fetch('/api/landings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: description.slice(0, 100),
          description,
          html,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSavedId(data.id);
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Лендинг сохранён! Вы найдёте его в дашборде.' },
        ]);
      } else {
        const data = await res.json();
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `Ошибка сохранения: ${data.error}` },
        ]);
      }
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Ошибка сохранения' },
      ]);
    } finally {
      setIsSaving(false);
    }
  };

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-[375px]';
      case 'tablet':
        return 'max-w-[768px]';
      default:
        return 'w-full';
    }
  };

  // Preview mode with generated landing
  if (html) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between px-4 h-14">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
              <div className="h-6 w-px bg-gray-200" />
              <span className="text-sm text-gray-600 hidden md:inline">
                {description.slice(0, 50)}...
              </span>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Tablet className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setChatOpen(!chatOpen)}
                className={chatOpen ? 'bg-primary/10 text-primary' : ''}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Редактировать
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowCode(!showCode)}>
                <Code className="h-4 w-4 mr-2" />
                Код
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopyCode}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? 'Скопировано' : 'Копировать'}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Скачать
              </Button>
              {session ? (
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving || !!savedId}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSaving ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : savedId ? (
                    <Check className="h-4 w-4 mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {savedId ? 'Сохранено' : 'Сохранить'}
                </Button>
              ) : (
                <Link href="/login">
                  <Button size="sm" variant="outline">
                    <User className="h-4 w-4 mr-2" />
                    Войти для сохранения
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Preview */}
          <div className="flex-1 flex justify-center p-4 overflow-auto">
            <div className={`${getPreviewWidth()} bg-white shadow-2xl rounded-lg overflow-hidden h-fit`}>
              <HtmlPreview html={html} className="min-h-[800px]" />
            </div>
          </div>

          {/* Code panel */}
          {showCode && (
            <div className="w-[500px] flex-shrink-0 border-l bg-gray-900 overflow-auto">
              <pre className="p-4 text-sm text-gray-300 font-mono whitespace-pre-wrap break-all">
                {html}
              </pre>
            </div>
          )}

          {/* Chat panel */}
          {chatOpen && (
            <div className="w-96 flex-shrink-0 border-l bg-white flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="font-semibold">Редактирование</h3>
                <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${
                      msg.role === 'user'
                        ? 'ml-8 bg-primary text-white'
                        : 'mr-8 bg-gray-100 text-gray-800'
                    } rounded-lg p-3 text-sm whitespace-pre-wrap`}
                  >
                    {msg.content}
                  </div>
                ))}
                {isEditing && (
                  <div className="mr-8 bg-gray-100 rounded-lg p-3 text-sm flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Применяю изменения...
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleEdit()}
                    placeholder="Что изменить?"
                    className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={isEditing}
                  />
                  <Button size="sm" onClick={handleEdit} disabled={isEditing || !chatInput.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Initial generation form
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">LandGen.AI</span>
          </Link>
          <div className="flex items-center gap-4">
            {session ? (
              <Link href="/dashboard" className="text-white/70 hover:text-white text-sm">
                Мои лендинги
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-white/70 hover:text-white text-sm">
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Создайте уникальный лендинг
            </h1>
            <p className="text-xl text-gray-400">
              AI сгенерирует полный HTML-код профессионального сайта за минуту
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <label className="block text-white font-medium mb-4">
              Опишите ваш продукт или услугу
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Например: Автосервис премиум-класса в Москве. Специализируемся на немецких автомобилях. Диагностика, ремонт, ТО. Работаем 10 лет, 5000+ довольных клиентов."
              className="w-full h-40 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />

            {error && (
              <p className="mt-4 text-red-400 text-sm">{error}</p>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full mt-6 py-6 text-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Генерация... (30-60 сек)
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Создать лендинг
                </>
              )}
            </Button>

            <p className="text-center text-gray-500 text-sm mt-4">
              После генерации вы сможете редактировать сайт через чат
            </p>
          </div>

          {/* Examples */}
          <div className="mt-12">
            <p className="text-gray-400 text-center mb-6">Примеры запросов:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Онлайн-школа английского языка. Индивидуальные занятия по Zoom, носители языка, гибкое расписание.',
                'Доставка здорового питания в Москве. Готовые рационы на неделю, подсчёт КБЖУ, свежие продукты.',
                'Студия веб-дизайна. Создаём сайты для бизнеса под ключ. Дизайн, разработка, SEO.',
                'Клиника лазерной эпиляции. Немецкое оборудование, безболезненные процедуры, результат навсегда.',
              ].map((example, i) => (
                <button
                  key={i}
                  onClick={() => setDescription(example)}
                  className="text-left p-4 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:bg-white/10 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
