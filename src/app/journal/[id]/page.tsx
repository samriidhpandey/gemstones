import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.journalArticle.findUnique({
    where: { id: params.id }
  });

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full flex items-end pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20">
          <Link href="/journal" className="inline-flex items-center text-white/50 hover:text-white mb-8 transition-colors text-sm font-mono tracking-widest">
            <ArrowLeft size={16} className="mr-2" /> BACK TO JOURNAL
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono tracking-widest text-xs border border-primary/30 px-3 py-1 rounded-full uppercase">
              {article.category}
            </span>
            <span className="text-white/60 font-mono text-xs">{article.date}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight max-w-4xl drop-shadow-2xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 py-16 flex flex-col md:flex-row gap-16 max-w-6xl">
        
        {/* Sidebar Info */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-32">
            <div className="border-t border-white/10 pt-6 mb-8">
              <p className="text-xs text-white/40 font-mono mb-1">WRITTEN BY</p>
              <p className="text-white font-serif text-lg">{article.author}</p>
            </div>
            
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-white/40 font-mono mb-1">SHARE</p>
              <div className="flex gap-4 mt-3">
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">X</button>
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">in</button>
                <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors">f</button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="w-full md:w-3/4 max-w-3xl">
          <p className="text-xl md:text-2xl text-white/80 font-serif leading-relaxed mb-12 italic border-l-2 border-primary pl-6">
            "{article.excerpt}"
          </p>
          
          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground font-sans leading-loose whitespace-pre-wrap">
            {article.content}
          </div>
        </div>
      </div>

    </div>
  );
}
