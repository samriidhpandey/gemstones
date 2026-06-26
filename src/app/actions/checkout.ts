'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

import { getSessionUser } from '@/lib/auth';

export async function placeOrderAction(formData: FormData) {
  const user = await getSessionUser();
  if (!user) {
    throw new Error('Unauthorized');
  }

  const totalAmount = formData.get('totalAmount') as string;

  if (!totalAmount) {
    throw new Error('Missing total amount');
  }

  const order = await prisma.order.create({
    data: {
      customer: user.name,
      email: user.email,
      userId: user.id,
      totalAmount: totalAmount,
      status: 'Pending'
    }
  });

  revalidatePath('/admin/orders');
  
  return { success: true, orderId: order.id };
}

export async function trackOrderAction(orderId: string, email: string) {
  const order = await prisma.order.findFirst({
    where: { 
      // The user may only have the last 8 digits of the ID, or the full ID.
      // MongoDB ObjectIDs are 24 chars. The user saw `orderId.slice(-8)`.
      // We'll try to find by exact ID, or we can just fetch all and filter if it's a partial match.
      email: email 
    }
  });

  // If we only have the last 8 digits of the ID provided by the user:
  const orders = await prisma.order.findMany({
    where: { email }
  });

  const matchedOrder = orders.find(o => o.id.endsWith(orderId.toLowerCase()) || o.id === orderId);

  if (!matchedOrder) {
    return { success: false, error: 'No order found with this Reference Code and Email combination.' };
  }

  // Calculate estimated delivery based on status
  let estimatedDelivery = '';
  if (matchedOrder.status === 'Pending') {
    estimatedDelivery = 'Processing (Est. 5-7 business days)';
  } else if (matchedOrder.status === 'Shipped') {
    estimatedDelivery = 'In Transit (Est. 2-3 business days)';
  } else if (matchedOrder.status === 'Delivered') {
    estimatedDelivery = 'Delivered Successfully';
  }

  return { 
    success: true, 
    order: {
      id: matchedOrder.id,
      status: matchedOrder.status,
      date: matchedOrder.date,
      totalAmount: matchedOrder.totalAmount,
      estimatedDelivery
    }
  };
}
