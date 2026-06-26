"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CartDrawer() {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" 
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sliding Drawer */}
      <div className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-background border-l border-white/10 shadow-2xl z-[101] flex flex-col transform transition-transform duration-500 ease-in-out translate-x-0">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl text-white">Your Cart</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/50 space-y-4">
              <p className="font-serif text-xl">Your cart is empty.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-primary hover:underline font-mono text-sm tracking-widest"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 bg-white/5 rounded-2xl p-3 border border-white/5">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-black/50 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-serif text-white line-clamp-1">{item.name}</h3>
                    <p className="text-primary font-mono text-sm mt-1">{item.price}</p>
                    <p className="text-white/40 text-xs mt-1">Qty: {item.quantity}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center text-xs text-red-400 hover:text-red-300 transition-colors w-fit"
                  >
                    <Trash2 size={12} className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout Button */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/50">
            <div className="flex justify-between items-end mb-6">
              <span className="text-white/60 font-mono text-sm tracking-widest">SUBTOTAL</span>
              <span className="font-serif text-2xl text-white">${cartTotal.toLocaleString()}</span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full relative overflow-hidden rounded-xl bg-white border border-white px-6 py-4 font-bold text-black shadow-xl transition-all group/btn flex items-center justify-center gap-3 hover:bg-black hover:text-white"
            >
              PROCEED TO SECURE CHECKOUT <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
