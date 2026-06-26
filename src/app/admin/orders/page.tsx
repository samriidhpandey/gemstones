import { prisma } from '@/lib/prisma';
import OrdersClient from './OrdersClient';

export default async function OrdersAdmin() {
  const orders = await prisma.order.findMany({
    orderBy: { date: 'desc' }
  });

  return <OrdersClient orders={orders} />;
}
