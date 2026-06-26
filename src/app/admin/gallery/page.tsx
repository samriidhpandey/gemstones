import { prisma } from '@/lib/prisma';
import GalleryClient from './GalleryClient';

export default async function GalleryAdmin() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <GalleryClient images={images} />;
}
