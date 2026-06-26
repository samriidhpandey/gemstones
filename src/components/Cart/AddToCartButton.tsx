"use client";

import { useCart, CartItem } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ item }: { item: CartItem }) {
  const { addToCart } = useCart();

  return (
    <button 
      onClick={() => addToCart(item)}
      className="w-full relative overflow-hidden rounded-xl bg-white/5 border border-white/20 px-6 py-4 font-bold text-white shadow-xl transition-all hover:border-primary hover:bg-primary/10 group/btn"
    >
      <div className="absolute inset-0 w-0 bg-primary transition-all duration-500 ease-out group-hover/btn:w-full z-0"></div>
      <span className="relative z-10 flex items-center justify-center gap-3 group-hover/btn:text-black transition-colors">
        <ShoppingCart size={20} /> Add to Cart
      </span>
    </button>
  );
}
