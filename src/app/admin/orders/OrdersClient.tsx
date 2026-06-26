'use client';

import { useState } from 'react';
import { updateOrderStatusAction, deleteOrderAction, seedOrdersAction } from '../actions';
import { ShoppingBag, Zap, Trash2, CheckCircle, Package, Clock } from 'lucide-react';

type Order = {
  id: string;
  customer: string;
  email: string;
  totalAmount: string;
  status: string;
  date: Date;
};

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatusAction(id, newStatus);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order record?')) return;
    try {
      await deleteOrderAction(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeed = async () => {
    if (!confirm('This will instantly generate 5 demo orders. Continue?')) return;
    setIsSeeding(true);
    try {
      await seedOrdersAction();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock size={16} className="text-amber-500" />;
      case 'Shipped': return <Package size={16} className="text-blue-500" />;
      case 'Delivered': return <CheckCircle size={16} className="text-emerald-500" />;
      default: return <Clock size={16} className="text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'Shipped': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'Delivered': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-white/5 text-white/60 border-white/10';
    }
  };

  return (
    <div className="p-8 pb-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white mb-2">Order Management</h1>
          <p className="text-muted-foreground text-sm">Track luxury purchases and fulfillment status.</p>
        </div>
        <button 
          onClick={handleSeed}
          disabled={isSeeding}
          className="flex items-center gap-2 bg-primary/20 hover:bg-primary/30 text-primary px-4 py-2 rounded-lg font-mono text-sm transition-colors border border-primary/50"
        >
          <Zap size={16} /> {isSeeding ? 'Generating...' : 'Auto-Generate Demo Orders'}
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/50 border-b border-white/10 text-xs font-mono text-white/50 tracking-widest">
                <th className="p-6 font-normal">ORDER ID</th>
                <th className="p-6 font-normal">CUSTOMER</th>
                <th className="p-6 font-normal">DATE</th>
                <th className="p-6 font-normal">TOTAL</th>
                <th className="p-6 font-normal">STATUS</th>
                <th className="p-6 font-normal text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-muted-foreground">
                    <ShoppingBag size={48} className="mx-auto text-white/20 mb-4" />
                    <p>No orders found.</p>
                    <p className="text-sm mt-1">Use the Auto-Generate button to create test orders.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="p-6 font-mono text-xs text-white/50">{order.id.slice(-6).toUpperCase()}</td>
                    <td className="p-6">
                      <p className="text-white font-medium">{order.customer}</p>
                      <p className="text-xs text-muted-foreground">{order.email}</p>
                    </td>
                    <td className="p-6 text-sm text-white/70">
                      {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="p-6 font-mono text-primary">{order.totalAmount}</td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select 
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="bg-black/50 border border-white/10 rounded-lg text-sm text-white px-3 py-1.5 outline-none focus:border-primary transition-colors"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                        <button 
                          onClick={() => handleDelete(order.id)}
                          className="text-red-500/50 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
