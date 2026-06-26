import { cookies } from 'next/headers';
import { prisma } from './prisma';
import crypto from 'crypto';

// Simple hash function for passwords using built-in crypto
export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Set a simple auth cookie
export async function setAuthSession(userId: string) {
  cookies().set('antigravity_session', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export async function clearAuthSession() {
  cookies().delete('antigravity_session');
}

// Get the currently logged-in user
export async function getSessionUser() {
  const sessionCookie = cookies().get('antigravity_session');
  if (!sessionCookie?.value) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: sessionCookie.value }
    });
    if (!user) return null;

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    return null;
  }
}
