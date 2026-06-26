import { prisma } from '@/lib/prisma';
import CollectionsClient from './CollectionsClient';

export default async function CollectionsAdmin() {
  const items = await prisma.collectionItem.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <CollectionsClient items={items} />;
}
