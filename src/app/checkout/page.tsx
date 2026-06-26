import CheckoutClient from './CheckoutClient';
import { getSessionUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
  const user = await getSessionUser();
  
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Secure Checkout</h1>
        <p className="text-muted-foreground text-lg mb-12">Complete your luxury acquisition.</p>
        
        <CheckoutClient user={user} />
      </div>
    </div>
  );
}
