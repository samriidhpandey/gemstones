import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default async function JournalIndexPage() {
  const articles = await prisma.journalArticle.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-background flex flex-col pt-20">
      
      {/* Page Header */}
      <div className="pt-24 pb-16 px-6 text-center max-w-3xl mx-auto">
        <p className="text-primary font-mono tracking-[0.3em] text-sm font-bold mb-4">THE EDITORIAL</p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-xl mb-6">
          The Journal
        </h1>
        <p className="text-muted-foreground text-lg">
          Insights, scientific breakthroughs, and style guides from the world's most exclusive gemological institute.
        </p>
      </div>

      <main className="flex-1 container mx-auto px-6 pb-32">
        {articles.length === 0 ? (
          <div className="text-center py-32 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
            <BookOpen size={48} className="mx-auto text-white/20 mb-6" />
            <h2 className="text-2xl font-serif text-white mb-4">No Publications Yet</h2>
            <p className="text-muted-foreground">The editorial team is currently drafting the first issue.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Link 
                href={`/journal/${article.id}`} 
                key={article.id} 
                className={`group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,215,0,0.15)] flex flex-col ${
                  index === 0 ? 'md:col-span-2 lg:col-span-2 md:flex-row' : ''
                }`}
              >
                {/* Image Container */}
                <div className={`relative bg-black/50 overflow-hidden ${index === 0 ? 'w-full md:w-1/2 aspect-square md:aspect-auto' : 'w-full aspect-[4/3]'}`}>
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                    <span className="text-[10px] text-white font-mono tracking-widest uppercase">{article.category}</span>
                  </div>
                </div>

                {/* Content Container */}
                <div className={`p-8 md:p-10 flex flex-col justify-center flex-1 ${index === 0 ? 'w-full md:w-1/2' : 'w-full'}`}>
                  <p className="text-xs text-primary font-mono tracking-widest mb-3">{article.date} — BY {article.author.toUpperCase()}</p>
                  <h2 className={`font-serif font-bold text-white mb-4 ${index === 0 ? 'text-4xl leading-tight' : 'text-2xl'}`}>
                    {article.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-primary font-bold text-sm tracking-wide group-hover:translate-x-2 transition-transform">
                    READ ARTICLE <ArrowRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
