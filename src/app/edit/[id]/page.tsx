'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Loader2,
  Download,
  Send,
  Monitor,
  Smartphone,
  Tablet,
  Code,
  Copy,
  Check,
  MessageSquare,
  X,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HtmlPreview } from '@/components/landing/HtmlPreview';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';

// Edit page for saved landings
export default function EditLandingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const landingId = params.id as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [html, setHtml] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Load landing data
  useEffect(() => {
    if (status === 'authenticated' && landingId) {
      loadLanding();
    }
  }, [status, landingId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const loadLanding = async () => {
    try {
      const res = await fetch(`/api/landings/${landingId}`);
      if (!res.ok) {
        if (res.status === 404) {
          setError('Лендинг не найден');
        } else {
          setError('Ошибка загрузки');
        }
        return;
      }
      const data = await res.json();
      setTitle(data.title);
      setDescription(data.description || '');
      setHtml(data.html);
      setChatMessages([
        {
          role: 'assistant',
          content: 'Лендинг загружен! Вы можете редактировать его через чат.',
        },
      ]);
    } catch (err) {
      setError('Ошибка загрузки');
    } finally {
      setIsLoading(false);
    }
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
      setHasChanges(true);

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

  const handleSave = async () => {
    if (!html) return;

    setIsSaving(true);
    try {
      const res = await fetch(`/api/landings/${landingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html }),
      });

      if (res.ok) {
        setHasChanges(false);
        setChatMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'Изменения сохранены!' },
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

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/dashboard">
          <Button>
            <ArrowLeft className="h-4 w-4 mr-2" />
            К списку лендингов
          </Button>
        </Link>
      </div>
    );
  }

  if (!html) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-200" />
            <span className="text-sm text-gray-600 hidden md:inline">
              {title.slice(0, 50)}...
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
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving || !hasChanges}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              {hasChanges ? 'Сохранить' : 'Сохранено'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Preview */}
        <div
          className={`flex justify-center p-4 overflow-auto ${
            showCode && !chatOpen ? 'w-1/2' : chatOpen && !showCode ? 'flex-1' : showCode && chatOpen ? 'flex-1' : 'flex-1'
          }`}
        >
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
