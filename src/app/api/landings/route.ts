import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';

// GET /api/landings - получить все лендинги пользователя
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const landings = await db.landing.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        published: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(landings);
  } catch (error: any) {
    console.error('Get landings error:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки лендингов' },
      { status: 500 }
    );
  }
}

// POST /api/landings - создать/сохранить лендинг
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const { title, description, html, tokensUsed } = await request.json();

    if (!html) {
      return NextResponse.json(
        { error: 'HTML обязателен' },
        { status: 400 }
      );
    }

    const slug = nanoid(10);

    const landing = await db.landing.create({
      data: {
        userId: session.user.id,
        title: title || 'Без названия',
        slug,
        description: description || null,
        html,
        generationPrompt: description,
        tokensUsed: tokensUsed || 0,
      },
    });

    return NextResponse.json({
      id: landing.id,
      slug: landing.slug,
      title: landing.title,
    });
  } catch (error: any) {
    console.error('Save landing error:', error);
    return NextResponse.json(
      { error: 'Ошибка сохранения лендинга' },
      { status: 500 }
    );
  }
}
