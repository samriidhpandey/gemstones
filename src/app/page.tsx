import Hero from "@/components/Hero/Hero";
import Gallery from "@/components/Gallery/Gallery";
import FeaturedCollection from "@/components/Featured/FeaturedCollection";
import Certificate from "@/components/Certificate/Certificate";
import Reviews from "@/components/Reviews/Reviews";

import { prisma } from '@/lib/prisma';

export default async function Home() {
  const products = await prisma.product.findMany();
  const gallery = await prisma.galleryImage.findMany();

  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Gallery images={gallery} />
      <FeaturedCollection items={products} />
      <Certificate />
      <Reviews />
      <div className="h-[10vh] bg-background"></div>
    </main>
  );
}
