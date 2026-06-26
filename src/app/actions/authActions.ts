'use server';

import { prisma } from '@/lib/prisma';
import { hashPassword, setAuthSession, clearAuthSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function signupAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !phone || !password) {
    return { success: false, error: 'All fields are required.' };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const hashedPassword = hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword
      }
    });

    await setAuthSession(user.id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to create account.' };
  }
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return { success: false, error: 'Invalid email or password.' };
    }

    await setAuthSession(user.id);
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Login failed.' };
  }
}

export async function logoutAction() {
  await clearAuthSession();
  revalidatePath('/');
}
