import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Пароль должен быть минимум 6 символов' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const user = await db.user.create({
      data: {
        email,
        passwordHash,
        name: name || null,
      },
    });

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error: any) {
    console.error('Registration error:', error);

    // Более информативные сообщения об ошибках
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Пользователь с таким email уже существует' },
        { status: 400 }
      );
    }

    if (error.message?.includes('prisma') || error.message?.includes('database')) {
      return NextResponse.json(
        { error: 'Ошибка базы данных. Проверьте настройки DATABASE_URL.' },
        { status: 500 }
      );
    }

    // Check if it's a connection error
    if (error.code === 'P1001' || error.code === 'P1002') {
      return NextResponse.json(
        { error: 'Не удалось подключиться к базе данных' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Ошибка регистрации' },
      { status: 500 }
    );
  }
}
