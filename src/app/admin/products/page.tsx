import { prisma } from '@/lib/prisma';
import ProductsClient from './ProductsClient';

export default async function ProductsAdmin() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <ProductsClient products={products} />;
}
