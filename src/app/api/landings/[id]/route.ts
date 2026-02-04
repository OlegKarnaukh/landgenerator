import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

// GET /api/landings/[id] - получить лендинг по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    const landing = await db.landing.findUnique({
      where: { id },
    });

    if (!landing) {
      return NextResponse.json(
        { error: 'Лендинг не найден' },
        { status: 404 }
      );
    }

    // Проверяем доступ: владелец или опубликованный
    if (landing.userId !== session?.user?.id && !landing.published) {
      return NextResponse.json(
        { error: 'Нет доступа' },
        { status: 403 }
      );
    }

    return NextResponse.json(landing);
  } catch (error: any) {
    console.error('Get landing error:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки лендинга' },
      { status: 500 }
    );
  }
}

// PUT /api/landings/[id] - обновить лендинг
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const landing = await db.landing.findUnique({
      where: { id },
    });

    if (!landing || landing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Лендинг не найден или нет доступа' },
        { status: 404 }
      );
    }

    const { title, html, published } = await request.json();

    const updated = await db.landing.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(html && { html }),
        ...(typeof published === 'boolean' && {
          published,
          publishedAt: published ? new Date() : null,
        }),
      },
    });

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      published: updated.published,
    });
  } catch (error: any) {
    console.error('Update landing error:', error);
    return NextResponse.json(
      { error: 'Ошибка обновления лендинга' },
      { status: 500 }
    );
  }
}

// DELETE /api/landings/[id] - удалить лендинг
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Необходима авторизация' },
        { status: 401 }
      );
    }

    const landing = await db.landing.findUnique({
      where: { id },
    });

    if (!landing || landing.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Лендинг не найден или нет доступа' },
        { status: 404 }
      );
    }

    await db.landing.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete landing error:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления лендинга' },
      { status: 500 }
    );
  }
}
