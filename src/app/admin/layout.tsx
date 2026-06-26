import Link from 'next/link';
import { LayoutDashboard, Package, Image as ImageIcon, Star, ShoppingBag, Settings, FileText } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', href: '/admin/products', icon: <Package size={20} /> },
    { name: 'Gallery', href: '/admin/gallery', icon: <ImageIcon size={20} /> },
    { name: 'Reviews', href: '/admin/reviews', icon: <Star size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="font-serif text-2xl font-bold text-primary tracking-widest">ADMIN</h1>
          <p className="text-xs text-muted-foreground mt-1 tracking-widest">ANTIGRAVITY STORE</p>
        </div>
        <nav className="flex-1 space-y-2 mt-8">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <LayoutDashboard size={20} className="text-primary" /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <Package size={20} className="text-primary" /> Featured Gems
          </Link>
          <Link href="/admin/collections" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 transition-colors text-white">
            <ShoppingBag size={20} className="text-primary" /> Collections (Shop)
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <ImageIcon size={20} className="text-primary" /> Gallery
          </Link>
          <Link href="/admin/journal" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <FileText size={20} className="text-primary" /> Journal
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <ShoppingBag size={20} className="text-primary" /> Orders
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 transition-colors text-white">
            <Star size={20} className="text-primary" /> Reviews
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/" className="block text-center w-full py-2 rounded-lg bg-white/5 text-sm text-muted-foreground hover:text-white transition-colors">
            Exit to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-black/20">
        {children}
      </main>
    </div>
  );
}
