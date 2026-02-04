'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Landing {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  published: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [landings, setLandings] = useState<Landing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchLandings();
    }
  }, [session]);

  const fetchLandings = async () => {
    try {
      const res = await fetch('/api/landings');
      if (res.ok) {
        const data = await res.json();
        setLandings(data);
      }
    } catch (error) {
      console.error('Error fetching landings:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteLanding = async (id: string) => {
    if (!confirm('Удалить этот лендинг?')) return;

    try {
      const res = await fetch(`/api/landings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setLandings(landings.filter((l) => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting landing:', error);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-bold text-gray-900">
              LandGen.AI
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{session.user.email}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Мои лендинги</h1>
          <Link
            href="/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
          >
            + Создать лендинг
          </Link>
        </div>

        {landings.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              У вас пока нет лендингов
            </h3>
            <p className="text-gray-500 mb-6">
              Создайте свой первый лендинг с помощью AI
            </p>
            <Link
              href="/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
            >
              Создать лендинг
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {landings.map((landing) => (
              <div
                key={landing.id}
                className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {landing.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      landing.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {landing.published ? 'Опубликован' : 'Черновик'}
                  </span>
                </div>

                {landing.description && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {landing.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                  <span>
                    {new Date(landing.updatedAt).toLocaleDateString('ru-RU')}
                  </span>
                  <span>{landing.views} просмотров</span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/edit/${landing.id}`}
                    className="flex-1 text-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Редактировать
                  </Link>
                  <button
                    onClick={() => deleteLanding(landing.id)}
                    className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
