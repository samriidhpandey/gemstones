'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupAction } from '../actions/authActions';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function SignupPage() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    
    const result = await signupAction(formData);
    if (result.success) {
      router.push('/profile');
      router.refresh();
    } else {
      setError(result.error || 'Signup failed');
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-32 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-white mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join the Antigravity Institute.</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/50 mb-2">FULL NAME</label>
              <input required name="name" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. Lord Alaric" />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/50 mb-2">PRIVATE EMAIL</label>
              <input required type="email" name="email" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="e.g. contact@wealth.net" />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/50 mb-2">PHONE NUMBER</label>
              <input required type="tel" name="phone" className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="+1 (555) 000-0000" />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/50 mb-2">PASSWORD</label>
              <input required type="password" name="password" minLength={6} className="w-full bg-black/50 border border-white/10 rounded-xl py-3 px-4 text-white focus:border-primary outline-none transition-colors" placeholder="••••••••" />
            </div>

            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isPending}
              className="w-full relative overflow-hidden rounded-xl bg-white text-black px-6 py-4 font-bold shadow-xl transition-all hover:bg-primary hover:text-black mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <UserPlus size={18} /> {isPending ? 'CREATING...' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-white/50 text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline font-mono tracking-widest text-xs uppercase ml-2">
                <ArrowLeft size={12} className="inline-block" /> Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
