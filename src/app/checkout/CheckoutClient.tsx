'use client';

import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, CreditCard, CheckCircle } from "lucide-react";
import { placeOrderAction } from "../actions/checkout";

export default function CheckoutClient({ user }: { user: any }) {
  const { cart, cartTotal, clearCart } = useCart();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const router = useRouter();

  // Redirect if cart is empty and not on success screen
  useEffect(() => {
    if (cart.length === 0 && !isSuccess) {
      router.push('/collections');
    }
  }, [cart.length, isSuccess, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData();
    formData.append('totalAmount', `$${cartTotal.toLocaleString()}`);

    try {
      const response = await placeOrderAction(formData);
      if (response.success) {
        setOrderId(response.orderId);
        setIsSuccess(true);
        clearCart(); // Empty the cart globally
      }
    } catch (error) {
      console.error(error);
      alert('Payment processing failed. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
        <CheckCircle size={64} className="text-emerald-500 mb-6" />
        <h2 className="text-3xl font-serif text-white mb-4">Acquisition Confirmed</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Your order has been securely received by the Antigravity Institute. 
          A concierge will contact you shortly regarding the insured delivery of your pieces.
        </p>
        <div className="bg-black/50 border border-white/10 px-8 py-4 rounded-2xl mb-8">
          <p className="text-sm font-mono text-white/50 mb-1">REFERENCE CODE</p>
          <p className="font-mono text-primary text-xl tracking-widest">{orderId?.slice(-8).toUpperCase()}</p>
        </div>
        <button 
          onClick={() => router.push('/profile')}
          className="text-white hover:text-primary transition-colors font-mono tracking-widest text-sm underline"
        >
          GO TO YOUR PROFILE
        </button>
      </div>
    );
  }

  if (cart.length === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      
      {/* Checkout Form */}
      <div>
        <div className="flex items-center gap-2 text-primary font-mono text-sm tracking-widest mb-8">
          <Lock size={16} /> SECURE ENCRYPTED CHECKOUT
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-serif text-white border-b border-white/10 pb-4">Authorized Buyer Details</h3>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div>
                <span className="text-xs font-mono text-white/50 mr-2">NAME:</span> 
                <span className="text-white font-serif">{user.name}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/50 mr-2">EMAIL:</span> 
                <span className="text-white">{user.email}</span>
              </div>
              <div>
                <span className="text-xs font-mono text-white/50 mr-2">PHONE:</span> 
                <span className="text-white">{user.phone}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h3 className="text-xl font-serif text-white border-b border-white/10 pb-4">Payment Information</h3>
            <p className="text-sm text-white/40 italic">Note: For security reasons, payment details are handled via our offline concierge service after order placement.</p>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full relative overflow-hidden rounded-xl bg-white text-black px-6 py-5 font-bold shadow-xl transition-all hover:bg-primary/90 hover:text-black mt-8 disabled:opacity-50"
          >
            {isPending ? 'PROCESSING...' : `AUTHORIZE PAYMENT OF $${cartTotal.toLocaleString()}`}
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
          <h3 className="text-xl font-serif text-white mb-6">Order Summary</h3>
          
          <div className="space-y-6 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale opacity-80" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-white line-clamp-1">{item.name}</h4>
                  <p className="text-white/40 text-sm mt-1">Qty: {item.quantity}</p>
                </div>
                <div className="text-primary font-mono">{item.price}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-4">
            <div className="flex justify-between text-sm text-white/60">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-white/60">
              <span>Insured Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="flex justify-between items-end border-t border-white/10 pt-4 mt-4">
              <span className="text-white font-serif">Total</span>
              <span className="text-3xl font-serif text-primary">${cartTotal.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-8 flex items-start gap-4 p-4 bg-black/30 rounded-xl border border-white/5">
            <Shield className="text-primary shrink-0" size={24} />
            <p className="text-xs text-white/50 leading-relaxed">
              Every Antigravity piece is insured globally during transit. Authenticity certificates will be provided upon delivery by our armored courier.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
