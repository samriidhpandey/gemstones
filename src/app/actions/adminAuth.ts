'use server';

import { cookies } from 'next/headers';

export async function adminLoginAction(formData: FormData) {
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const validUser = process.env.ADMIN_USER || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validUser && password === validPass) {
    cookies().set('antigravity_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/admin',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid admin credentials' };
}

export async function adminLogoutAction() {
  cookies().delete('antigravity_admin_session');
}
