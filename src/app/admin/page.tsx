import { prisma } from '@/lib/prisma';
import { DollarSign, Package, ShoppingBag, Users } from 'lucide-react';

export default async function AdminDashboard() {
  // Fetch high-level stats from the DB
  const totalProducts = await prisma.product.count();
  const totalReviews = await prisma.review.count();
  const totalOrders = await prisma.order.count();
  
  // Dummy data for revenue since we don't have real payments yet
  const revenue = "₹12,45,000";

  const statCards = [
    { title: "Total Revenue", value: revenue, icon: <DollarSign className="text-primary" size={24} /> },
    { title: "Active Orders", value: totalOrders.toString(), icon: <ShoppingBag className="text-primary" size={24} /> },
    { title: "Listed Gemstones", value: totalProducts.toString(), icon: <Package className="text-primary" size={24} /> },
    { title: "Customer Reviews", value: totalReviews.toString(), icon: <Users className="text-primary" size={24} /> },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-serif text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-lg">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
        <h2 className="text-xl font-serif text-white mb-6">Recent Orders</h2>
        {totalOrders === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No orders have been placed yet. Start selling to see them here!
          </div>
        ) : (
          <div className="text-muted-foreground">
            {/* Orders table will go here later */}
            View the Orders tab to manage your shipments.
          </div>
        )}
      </div>
    </div>
  );
}
