'use client';

import { useState } from "react";
import { trackOrderAction } from "../actions/checkout";
import { Search, Package, Clock, CheckCircle, Truck, PhoneCall, HelpCircle } from "lucide-react";

type TrackResult = {
  id: string;
  status: string;
  date: Date;
  totalAmount: string;
  estimatedDelivery: string;
};

export default function TrackClient() {
  const [isPending, setIsPending] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setResult(null);
    
    const formData = new FormData(e.currentTarget);
    const orderId = formData.get('orderId') as string;
    const email = formData.get('email') as string;

    try {
      const response = await trackOrderAction(orderId, email);
      if (response.success && response.order) {
        setResult(response.order);
      } else {
        setError(response.error || 'Failed to track order');
      }
    } catch (err) {
      setError('An error occurred while tracking the order.');
    } finally {
      setIsPending(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={48} className="text-amber-500 mb-4" />;
      case 'Shipped': return <Truck size={48} className="text-blue-500 mb-4" />;
      case 'Delivered': return <CheckCircle size={48} className="text-emerald-500 mb-4" />;
      default: return <Package size={48} className="text-white/50 mb-4" />;
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-8 text-left">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-mono text-white/50 mb-2">REFERENCE CODE</label>
            <input required name="orderId" className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. 5F8D3A2C" />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/50 mb-2">PRIVATE EMAIL</label>
            <input required type="email" name="email" className="w-full bg-black/50 border border-white/10 rounded-xl py-4 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. contact@wealth.net" />
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full relative overflow-hidden rounded-xl bg-white text-black px-6 py-4 font-bold shadow-xl transition-all hover:bg-primary hover:text-black disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Search size={20} /> {isPending ? 'SEARCHING...' : 'TRACK ORDER'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-white/5 border border-primary/30 rounded-3xl p-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center">
            {getStatusIcon(result.status)}
          </div>
          <h2 className="text-2xl font-serif text-white mb-2">Status: {result.status}</h2>
          <p className="text-primary font-mono tracking-widest text-sm mb-8">{result.estimatedDelivery}</p>

          <div className="grid grid-cols-2 gap-4 text-left border-t border-white/10 pt-8">
            <div>
              <p className="text-xs font-mono text-white/40 mb-1">REFERENCE</p>
              <p className="text-white font-mono text-sm">{result.id.slice(-8).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs font-mono text-white/40 mb-1">DATE</p>
              <p className="text-white text-sm">
                {new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
            <div className="col-span-2 mt-2">
              <p className="text-xs font-mono text-white/40 mb-1">TOTAL AMOUNT</p>
              <p className="text-white font-mono text-lg text-primary">{result.totalAmount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Help Center Section */}
      <div className="mt-16 border-t border-white/10 pt-12 text-center">
        <HelpCircle size={32} className="mx-auto text-white/30 mb-4" />
        <h3 className="text-xl font-serif text-white mb-2">Need Assistance?</h3>
        <p className="text-muted-foreground text-sm mb-6">Our concierge team is available 24/7 for delivery updates and support.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://wa.me/1234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-6 py-3 rounded-full hover:bg-emerald-500/20 transition-colors text-sm font-medium"
          >
            <PhoneCall size={16} /> WhatsApp Support
          </a>
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-2 bg-white/5 text-white border border-white/10 px-6 py-3 rounded-full hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <PhoneCall size={16} /> Direct Call
          </a>
        </div>
      </div>
    </div>
  );
}
