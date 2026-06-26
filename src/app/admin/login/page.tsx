'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminLoginAction } from '../../actions/adminAuth';
import { ShieldAlert } from 'lucide-react';

export default function AdminLoginPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const result = await adminLoginAction(formData);
    if (result.success) {
      router.push('/admin');
      router.refresh();
    } else {
      setError(result.error || 'Access Denied');
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black opacity-50 z-0 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <ShieldAlert size={48} className="mx-auto text-primary mb-6" />
          <h1 className="font-serif text-3xl text-white tracking-widest uppercase mb-2">Restricted Area</h1>
          <p className="text-primary/70 font-mono text-xs tracking-widest">AUTHORIZED PERSONNEL ONLY</p>
        </div>

        <div className="bg-white/5 border border-primary/20 rounded-xl p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-primary/70 mb-2">ADMIN ID</label>
              <input 
                required 
                name="username" 
                className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none transition-colors font-mono" 
                placeholder="Enter ID" 
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-primary/70 mb-2">MASTER PASSWORD</label>
              <input 
                required 
                type="password" 
                name="password" 
                className="w-full bg-black border border-white/10 rounded-lg py-3 px-4 text-white focus:border-primary outline-none transition-colors font-mono tracking-widest" 
                placeholder="••••••••" 
              />
            </div>

            {error && (
              <p className="text-red-500 font-mono text-xs text-center border border-red-500/30 bg-red-500/10 py-2 rounded">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full relative overflow-hidden rounded-lg bg-primary text-black px-6 py-4 font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors disabled:opacity-50 mt-4"
            >
              {isPending ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
