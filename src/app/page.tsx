import Hero from "@/components/Hero/Hero";
import Gallery from "@/components/Gallery/Gallery";
import FeaturedCollection from "@/components/Featured/FeaturedCollection";
import Certificate from "@/components/Certificate/Certificate";
import Reviews from "@/components/Reviews/Reviews";

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let products = [];
  let gallery = [];
  
  try {
    products = await prisma.product.findMany();
    gallery = await prisma.galleryImage.findMany();
  } catch (error) {
    console.error("Database connection failed:", error);
  }

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
