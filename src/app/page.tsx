import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, MessageSquare, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-white">LandGen.AI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/create">
              <Button>Создать лендинг</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Полная генерация HTML
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Уникальные лендинги за
            <span className="text-primary"> 60 секунд</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            AI генерирует полный HTML-код профессионального сайта.
            Редактируйте через чат — без визуального редактора, без ограничений шаблонов.
          </p>

          {/* Main CTA */}
          <div className="max-w-xl mx-auto mb-8">
            <Link href="/create">
              <Button size="lg" className="px-8 py-6 text-lg">
                Создать лендинг бесплатно
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Скачайте HTML и используйте где угодно
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">Как это работает</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Никаких шаблонов. AI генерирует уникальный HTML под ваш бизнес.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <FeatureCard
            icon={<Sparkles className="h-6 w-6" />}
            title="Полный HTML"
            description="Не компоненты, а готовый HTML+Tailwind код. Каждый лендинг уникален."
          />
          <FeatureCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="Чат-редактор"
            description="Просите AI изменить что угодно: 'Сделай кнопки зелёными', 'Добавь отзыв'."
          />
          <FeatureCard
            icon={<Code className="h-6 w-6" />}
            title="Экспорт HTML"
            description="Скачайте код и используйте на любом хостинге. Никаких ограничений."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-white">3 шага к готовому сайту</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StepCard
            number="1"
            title="Опишите бизнес"
            description="Расскажите о продукте, услуге или идее в нескольких предложениях."
          />
          <StepCard
            number="2"
            title="Получите сайт"
            description="AI создаст полный лендинг с текстами, изображениями и дизайном."
          />
          <StepCard
            number="3"
            title="Редактируйте через чат"
            description="Попросите AI изменить что угодно. Скачайте HTML когда готово."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Готовы создать лендинг?
          </h2>
          <p className="text-gray-400 mb-8">
            Бесплатно. Без регистрации. Без ограничений.
          </p>
          <Link href="/create">
            <Button size="lg">
              Начать бесплатно
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold text-white">LandGen.AI</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 LandGen.AI. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl flex items-center justify-center mx-auto mb-4">
        {number}
      </div>
      <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
