"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "../Cart/CartDrawer";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart, setIsCartOpen } = useCart();

  useEffect(() => {
    // Don't run GSAP animations on admin pages
    if (pathname?.startsWith('/admin')) return;

    gsap.registerPlugin(ScrollTrigger);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Header hide/show on scroll
    gsap.to(".global-header", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          // Scroll direction: self.direction (1 = down, -1 = up)
          if (self.direction === 1 && window.scrollY > 100) {
            // Scrolling down -> Hide header
            gsap.to(".global-header", { y: -100, duration: 0.3, ease: "power2.out" });
          } else if (self.direction === -1) {
            // Scrolling up -> Show header
            gsap.to(".global-header", { y: 0, duration: 0.3, ease: "power2.out" });
          }
        },
      },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header
        className={`global-header fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="text-2xl font-serif font-bold text-primary">
            Posh Kaleido Gemstones
          </Link>

          <nav className="hidden md:flex space-x-8">
            {[
              { name: "Collections", href: "/collections" },
              { name: "Our Story", href: "/about" },
              { name: "Journal", href: "/journal" },
              { name: "Profile", href: "/profile" },
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className={`group relative text-sm font-medium transition-colors ${isActive ? "text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" : "text-white/80 hover:text-white"}`}
                >
                  {link.name}
                  <span 
                    className={`absolute -bottom-2 left-0 h-[2px] bg-primary shadow-[0_0_8px_rgba(255,215,0,0.8)] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} 
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-6">
            <Link href="/profile" className="hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden hover:text-primary transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[45] bg-black/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-background border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-24 space-y-6 flex flex-col">
          {[
            { name: "Collections", href: "/collections" },
            { name: "Our Story", href: "/about" },
            { name: "Journal", href: "/journal" },
            { name: "Profile", href: "/profile" },
          ].map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`text-lg font-serif transition-colors ${
                pathname === link.href ? "text-primary" : "text-white/80 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Cart Drawer Component */}
      <CartDrawer />
    </>
  );
}
