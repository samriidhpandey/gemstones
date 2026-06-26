import { prisma } from '@/lib/prisma';
import JournalClient from './JournalClient';

export default async function JournalAdmin() {
  const articles = await prisma.journalArticle.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <JournalClient articles={articles} />;
}
