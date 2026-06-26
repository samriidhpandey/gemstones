'use client';

import { useState } from 'react';
import { addJournalAction, deleteJournalAction, seedJournalAction } from '../actions';
import { Trash2, Plus, Type, FileText, LayoutTemplate, Zap } from 'lucide-react';

type Article = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
};

export default function JournalClient({ articles }: { articles: Article[] }) {
  const [isPending, setIsPending] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    try {
      await addJournalAction(formData);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      alert('Failed to add article');
    } finally {
      setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteJournalAction(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will instantly generate 3 premium demo articles. Continue?')) return;
    setIsSeeding(true);
    try {
      await seedJournalAction();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Journal / Editorial</h1>
          <p className="text-muted-foreground text-sm">Publish news, science, and style guides.</p>
        </div>
        <button 
          onClick={handleSeed}
          disabled={isSeeding}
          className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg font-mono text-sm transition-colors border border-primary/50"
        >
          <Zap size={16} /> {isSeeding ? 'Generating...' : 'Auto-Generate Demo Articles'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Editor Form */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-8">
            <h2 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
              <FileText className="text-primary" size={20} />
              New Article
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">TITLE</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                  <input required name="title" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. The Physics of Perfection" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">CATEGORY</label>
                <div className="relative">
                  <LayoutTemplate className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                  <input required name="category" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. Science, Style Guide" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">EXCERPT (SHORT SUMMARY)</label>
                <textarea required name="excerpt" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors h-20 resize-none" placeholder="Brief summary of the article..." />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">FULL CONTENT</label>
                <textarea required name="content" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors h-40 resize-none" placeholder="Write your full article here..." />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/50 mb-1">COVER IMAGE</label>
                <input type="file" name="image" accept="image/*" className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors" />
              </div>

              <button disabled={isPending} className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-colors disabled:opacity-50 mt-6">
                <Plus size={20} />
                {isPending ? 'Publishing...' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>

        {/* Article List */}
        <div className="lg:col-span-2">
          {articles.length === 0 ? (
            <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl h-64 flex flex-col items-center justify-center text-white/30">
              <FileText size={48} className="mb-4 opacity-50" />
              <p>No articles published yet.</p>
              <p className="text-sm mt-2">Write one or use the Auto-Generate button above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                  <div className="relative aspect-video bg-black/50 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                      <span className="text-[10px] text-white font-mono tracking-widest uppercase">{article.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-white/40 font-mono mb-2">{article.date}</p>
                    <h3 className="font-serif text-xl text-white mb-2 line-clamp-1">{article.title}</h3>
                    <p className="text-sm text-white/60 mb-6 line-clamp-2">{article.excerpt}</p>
                    
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={16} /> Delete Article
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
