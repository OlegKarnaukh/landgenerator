'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingOverlayProps {
  isVisible: boolean;
  type: 'generate' | 'edit';
}

const generateMessages = [
  'Анализируем ваш запрос...',
  'Изучаем нишу и конкурентов...',
  'Продумываем структуру страницы...',
  'Создаём продающие заголовки...',
  'Генерируем уникальный контент...',
  'Подбираем цветовую схему...',
  'Разрабатываем адаптивный дизайн...',
  'Добавляем call-to-action элементы...',
  'Оптимизируем для конверсии...',
  'Финальные штрихи...',
];

const editMessages = [
  'Анализируем запрос...',
  'Находим нужные элементы...',
  'Вносим изменения...',
  'Проверяем результат...',
];

export function LoadingOverlay({ isVisible, type }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  const messages = type === 'generate' ? generateMessages : editMessages;

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0);
      return;
    }

    // Меняем сообщения
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, type === 'generate' ? 4000 : 2000);

    // Анимация точек
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 400);

    return () => {
      clearInterval(messageInterval);
      clearInterval(dotsInterval);
    };
  }, [isVisible, type, messages.length]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 animate-gradient" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-float"
            style={{
              width: Math.random() * 10 + 5 + 'px',
              height: Math.random() * 10 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's',
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Logo animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <Sparkles className="h-16 w-16 text-primary/30" />
          </div>
          <div className="animate-pulse">
            <Sparkles className="h-16 w-16 text-primary" />
          </div>
        </div>

        {/* Progress ring */}
        <div className="relative mb-8">
          <svg className="w-24 h-24 animate-spin-slow" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="70 200"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Message */}
        <div className="min-h-[60px]">
          <p className="text-2xl font-medium text-white mb-2 transition-opacity duration-500">
            {messages[messageIndex]}
          </p>
          <p className="text-white/50 text-lg">
            {type === 'generate' ? 'Это займёт около минуты' : 'Несколько секунд'}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        </div>

        {/* Progress bar */}
        {type === 'generate' && (
          <div className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-progress" />
          </div>
        )}
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        .animate-float {
          animation: float 15s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        @keyframes dash {
          0% { stroke-dasharray: 1 200; stroke-dashoffset: 0; }
          50% { stroke-dasharray: 90 200; stroke-dashoffset: -35; }
          100% { stroke-dasharray: 90 200; stroke-dashoffset: -125; }
        }
        .animate-dash {
          animation: dash 1.5s ease-in-out infinite;
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
