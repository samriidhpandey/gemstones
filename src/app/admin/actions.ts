'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { writeFile } from 'fs/promises';
import path from 'path';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function addProductAction(formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const file = formData.get('image') as File;

  if (!file || file.size === 0) {
    throw new Error('No image file uploaded');
  }

  // Upload to Cloudinary
  const imageUrl = await uploadToCloudinary(file);

  // Save to MongoDB
  await prisma.product.create({
    data: { name, price, image: imageUrl }
  });

  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function deleteProductAction(id: string) {
  await prisma.product.delete({ where: { id } });
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function addGalleryAction(formData: FormData) {
  const alt = formData.get('alt') as string;
  const className = formData.get('className') as string;
  const file = formData.get('image') as File;

  if (!file || file.size === 0) {
    throw new Error('No image file uploaded');
  }

  const imageUrl = await uploadToCloudinary(file);

  await prisma.galleryImage.create({
    data: { alt, src: imageUrl, className }
  });

  revalidatePath('/admin/gallery');
  revalidatePath('/'); 
}

export async function deleteGalleryAction(id: string) {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath('/admin/gallery');
  revalidatePath('/');
}

export async function addCollectionAction(formData: FormData) {
  const name = formData.get('name') as string;
  const price = formData.get('price') as string;
  const description = formData.get('description') as string;
  
  const imageFile = formData.get('image') as File | null;
  const videoFile = formData.get('video') as File | null;

  if (!imageFile || imageFile.size === 0) {
    throw new Error('No image file uploaded');
  }

  // Save Image to Cloudinary
  const imageUrl = await uploadToCloudinary(imageFile);

  // Save Video to Cloudinary (Optional)
  let videoUrl = null;
  if (videoFile && videoFile.size > 0) {
    videoUrl = await uploadToCloudinary(videoFile);
  }

  await prisma.collectionItem.create({
    data: { name, price, description, image: imageUrl, video: videoUrl }
  });

  revalidatePath('/admin/collections');
  revalidatePath('/collections');
}

export async function deleteCollectionAction(id: string) {
  await prisma.collectionItem.delete({ where: { id } });
  revalidatePath('/admin/collections');
  revalidatePath('/collections');
}

export async function addJournalAction(formData: FormData) {
  const title = formData.get('title') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const category = formData.get('category') as string;
  const author = formData.get('author') as string;
  const file = formData.get('image') as File;

  let imageUrl = '';

  if (file && file.size > 0) {
    imageUrl = await uploadToCloudinary(file);
  } else {
    // Fallback if no image provided
    imageUrl = 'https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=800';
  }

  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  await prisma.journalArticle.create({
    data: {
      title,
      excerpt,
      content,
      image: imageUrl,
      category: category || 'Editorial',
      author: author || 'Antigravity Editorial',
      date: dateStr
    }
  });

  revalidatePath('/admin/journal');
  revalidatePath('/journal');
}

export async function deleteJournalAction(id: string) {
  await prisma.journalArticle.delete({ where: { id } });
  revalidatePath('/admin/journal');
  revalidatePath('/journal');
}

export async function seedJournalAction() {
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  const sampleArticles = [
    {
      title: "The Physics of Perfection",
      excerpt: "How our proprietary 400% refraction technique defies traditional light physics.",
      content: "For over a century, the gemological community believed that light refraction had a theoretical limit. The Antigravity Institute in Geneva has shattered that ceiling. By cutting along the hyper-molecular lattice lines using focused electromagnetic lasers, our master artisans ensure that every stone reflects 400% more light than a standard brilliant cut. This isn't just craftsmanship; it's quantum physics applied to luxury.",
      image: "https://images.pexels.com/photos/2873669/pexels-photo-2873669.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Science",
      author: "Dr. Elena Vance",
      date: dateStr
    },
    {
      title: "Styling the Void: The 2026 Collection",
      excerpt: "Discover the art of wearing gemstones that appear to float on your skin.",
      content: "The modern aesthetic of luxury is not about bulk; it's about the illusion of nothingness. The 2026 Zero-G Collection utilizes ultra-fine platinum threads and magnetic tension settings to make diamonds and rubies appear as if they are simply hovering above your collarbone. Styling these pieces requires minimalist, monochromatic outfits—let the stones command the gravitational pull of the room.",
      image: "https://images.pexels.com/photos/305833/pexels-photo-305833.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Style Guide",
      author: "Antigravity Editorial",
      date: dateStr
    },
    {
      title: "Expedition Report: The Deep Amazon Core",
      excerpt: "Inside the most dangerous gem retrieval mission in modern history.",
      content: "In late 1999, our team ventured into the uncharted Deep Amazon basin after seismic anomalies suggested a new high-pressure core beneath the crust. The expedition took 4 months and cost millions. What we extracted were the Bioluminescent Emeralds—stones so saturated with rare earth elements that they emit a faint, ethereal glow in absolute darkness. These remain our most exclusive offerings to date.",
      image: "https://images.pexels.com/photos/414144/pexels-photo-414144.jpeg?auto=compress&cs=tinysrgb&w=800",
      category: "Expeditions",
      author: "Lord Alaric's Archives",
      date: dateStr
    }
  ];

  for (const article of sampleArticles) {
    await prisma.journalArticle.create({ data: article });
  }

  revalidatePath('/admin/journal');
  revalidatePath('/journal');
}

// ================= ORDERS ACTIONS =================

export async function updateOrderStatusAction(id: string, newStatus: string) {
  await prisma.order.update({
    where: { id },
    data: { status: newStatus }
  });
  revalidatePath('/admin/orders');
}

export async function deleteOrderAction(id: string) {
  await prisma.order.delete({ where: { id } });
  revalidatePath('/admin/orders');
}

export async function seedOrdersAction() {
  const dummyOrders = [
    { customer: "Elena Romanov", email: "elena.r@example.com", totalAmount: "$45,000", status: "Pending" },
    { customer: "James H. Sterling", email: "j.sterling@wealth.net", totalAmount: "$120,500", status: "Shipped" },
    { customer: "Isabella Rossi", email: "rossi.i@luxury.it", totalAmount: "$8,900", status: "Delivered" },
    { customer: "Arthur Pendelton", email: "arthur.p@example.com", totalAmount: "$250,000", status: "Pending" },
    { customer: "Chen Wei", email: "wei.c@example.com", totalAmount: "$12,400", status: "Delivered" }
  ];

  for (const order of dummyOrders) {
    await prisma.order.create({ data: order });
  }

  revalidatePath('/admin/orders');
}
