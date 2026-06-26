import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Package, Clock, Truck, CheckCircle, PhoneCall, LogOut } from 'lucide-react';
import { logoutAction } from '../actions/authActions';

export default async function ProfilePage() {
  const user = await getSessionUser();
  if (!user) {
    redirect('/login');
  }

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { date: 'desc' }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={20} className="text-amber-500" />;
      case 'Shipped': return <Truck size={20} className="text-blue-500" />;
      case 'Delivered': return <CheckCircle size={20} className="text-emerald-500" />;
      default: return <Package size={20} className="text-white/50" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Pending': return 'Processing (Est. 5-7 business days)';
      case 'Shipped': return 'In Transit (Est. 2-3 business days)';
      case 'Delivered': return 'Delivered Successfully';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-32">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">Welcome, {user.name}</h1>
            <p className="text-muted-foreground text-sm font-mono tracking-widest uppercase">Client Portfolio</p>
          </div>
          <form action={logoutAction}>
            <button className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm font-mono tracking-widest">
              <LogOut size={16} /> SIGN OUT
            </button>
          </form>
        </div>

        {/* Orders Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif text-white mb-6">Your Acquisitions</h2>
          
          {orders.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center text-white/50">
              <Package size={48} className="mx-auto mb-4 opacity-50" />
              <p>You have not made any acquisitions yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/[0.07] transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-12">
                    
                    {/* Order Details */}
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-black/50 px-3 py-1 rounded border border-white/10">
                          <span className="text-xs font-mono text-white/50 mr-2">REF:</span>
                          <span className="text-primary font-mono tracking-widest">{order.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <span className="text-sm text-white/40">
                          {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-mono text-white/40 mb-1">TOTAL</p>
                          <p className="text-white font-mono text-lg">{order.totalAmount}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status Tracking */}
                    <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <span className="text-xl font-serif text-white">{order.status}</span>
                      </div>
                      <p className="text-sm text-primary font-mono">{getStatusText(order.status)}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dedicated Concierge */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-serif text-primary mb-4">Your Dedicated Concierge</h3>
            <p className="text-white/70 leading-relaxed mb-8">
              As an Antigravity client, you have direct access to our concierge team 24/7 for delivery updates, secure transportation routing, and exclusive private viewings.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a 
                href="https://wa.me/1234567890" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-primary text-black px-6 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(255,215,0,0.2)] hover:bg-white transition-colors"
              >
                <PhoneCall size={18} /> Contact via WhatsApp
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
