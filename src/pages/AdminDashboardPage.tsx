import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Coupon } from '../types';
import {
  TrendingUp,
  DollarSign,
  PackageCheck,
  Users,
  Plus,
  Edit,
  Trash2,
  Tag,
  ShieldCheck,
  X,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    orders,
    coupons,
    updateOrderStatus,
    saveProduct,
    deleteProduct,
    addCoupon,
    toggleCouponActive,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'products' | 'coupons'>('analytics');

  // Product Edit Modal State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // New Coupon Form State
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState(15);
  const [newCouponMin, setNewCouponMin] = useState(30);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 14850;
  const totalOrdersCount = orders.length + 384;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);

  const handleSaveProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct?.price) return;

    const formattedProduct: Product = {
      id: editingProduct.id || `prod-${Math.random().toString(36).substr(2, 6)}`,
      name: editingProduct.name,
      subtitle: editingProduct.subtitle || 'Specialty Roast',
      price: Number(editingProduct.price),
      originalPrice: editingProduct.originalPrice ? Number(editingProduct.originalPrice) : undefined,
      rating: editingProduct.rating || 5.0,
      reviewsCount: editingProduct.reviewsCount || 1,
      category: editingProduct.category || 'Single Origin',
      origin: editingProduct.origin || 'Guatemala',
      roastLevel: editingProduct.roastLevel || 'Medium',
      flavorNotes: editingProduct.flavorNotes || ['Chocolate', 'Caramel'],
      description: editingProduct.description || 'Specialty micro-batch coffee roast.',
      story: editingProduct.story || 'Sourced directly from partner farms.',
      images: editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80'],
      weightOptions: [250, 500, 1000],
      stock: Number(editingProduct.stock || 50),
      brewingRecommendation: editingProduct.brewingRecommendation || 'V60 Pour-Over',
      reviewsList: editingProduct.reviewsList || []
    };

    saveProduct(formattedProduct);
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const newC: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      minSpend: Number(newCouponMin),
      description: `${newCouponDiscount}% OFF orders over $${newCouponMin}`,
      active: true
    };
    addCoupon(newC);
    setNewCouponCode('');
  };

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Executive Admin Portal</span>
            </div>
            <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-cream">
              Roastery Management Dashboard
            </h1>
          </div>

          <button
            onClick={() => {
              setEditingProduct({
                name: '',
                subtitle: '',
                price: 26,
                category: 'Single Origin',
                roastLevel: 'Medium',
                stock: 50,
                flavorNotes: ['Dark Cocoa', 'Toasted Almond']
              });
              setIsProductModalOpen(true);
            }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-caramel to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-xs shadow-glow flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Coffee Product
          </button>
        </div>

        {/* Executive KPI Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, change: '+18.4% vs last month', icon: DollarSign, color: 'text-gold' },
            { title: 'Total Orders', value: totalOrdersCount.toLocaleString(), change: '+12 shadow orders', icon: PackageCheck, color: 'text-caramel' },
            { title: 'Avg Order Value', value: `$${avgOrderValue}`, change: 'Peak $48 threshold', icon: TrendingUp, color: 'text-emerald-400' },
            { title: 'Active Customers', value: '1,280', change: '84% repeat buyers', icon: Users, color: 'text-blue-400' }
          ].map((kpi, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-dark-card border border-white/10 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase text-cream/50 font-semibold">{kpi.title}</span>
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
              </div>
              <h3 className="font-serif font-extrabold text-3xl text-cream font-mono">{kpi.value}</h3>
              <p className="text-[11px] text-emerald-400 font-mono">{kpi.change}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-3 mb-10 pb-2 border-b border-white/10">
          {[
            { id: 'analytics', label: 'Analytics & Revenue' },
            { id: 'orders', label: 'Order Processing', count: orders.length },
            { id: 'products', label: 'Product Inventory', count: products.length },
            { id: 'coupons', label: 'Coupons & Discounts', count: coupons.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold font-serif transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-caramel text-cream shadow-glow'
                  : 'bg-dark-card border border-white/10 text-cream/70 hover:text-cream'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className="bg-espresso px-2 py-0.5 rounded-full text-[10px] text-gold font-mono">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-cream">Monthly Revenue Trends</h3>
              <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-4 px-4 bg-dark/60 rounded-2xl border border-white/5">
                {[45, 62, 58, 74, 88, 92, 110, 125, 140, 165].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                    <div
                      className="w-full bg-gradient-to-t from-caramel to-gold rounded-t-lg transition-all duration-500 hover:opacity-90"
                      style={{ height: `${(val / 170) * 100}%` }}
                    />
                    <span className="text-[10px] text-cream/40 font-mono">M{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-cream">Roast Level Breakdown</h3>
              <div className="space-y-4 text-xs">
                {[
                  { name: 'Single Origin Light Roast', pct: '42%', color: 'bg-gold' },
                  { name: 'Ember Signature Medium Roast', pct: '38%', color: 'bg-caramel' },
                  { name: 'Velvet Espresso Dark Roast', pct: '20%', color: 'bg-espresso' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between font-semibold">
                      <span>{item.name}</span>
                      <span className="font-mono text-gold">{item.pct}</span>
                    </div>
                    <div className="w-full bg-dark h-2 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGER */}
        {activeTab === 'orders' && (
          <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl overflow-x-auto">
            <h3 className="font-serif font-bold text-2xl text-cream">Active Orders Queue</h3>
            <table className="w-full text-left text-xs text-cream/80">
              <thead className="border-b border-white/10 text-gold uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Current Status</th>
                  <th className="py-3 px-4 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.map(order => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-mono font-bold text-cream">{order.id}</td>
                    <td className="py-4 px-4">
                      <p className="font-semibold text-cream">{order.customerName}</p>
                      <p className="text-[10px] text-cream/50">{order.customerEmail}</p>
                    </td>
                    <td className="py-4 px-4 font-mono">{order.date}</td>
                    <td className="py-4 px-4 font-mono font-bold text-gold">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono bg-caramel/20 text-caramel border border-caramel/40">
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value as any)}
                        className="bg-dark border border-white/15 rounded-xl px-3 py-1 text-xs text-cream font-semibold focus:outline-none focus:border-caramel"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Roasted">Roasted</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: PRODUCTS MANAGER */}
        {activeTab === 'products' && (
          <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl overflow-x-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-serif font-bold text-2xl text-cream">Roastery Catalog</h3>
              <span className="text-xs text-cream/60 font-mono">{products.length} Products</span>
            </div>

            <table className="w-full text-left text-xs text-cream/80">
              <thead className="border-b border-white/10 text-gold uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-3 px-4">Coffee</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Roast Level</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map(prod => (
                  <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-serif font-bold text-cream text-sm">{prod.name}</p>
                        <p className="text-[10px] text-cream/50">{prod.origin}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-semibold text-caramel">{prod.category}</td>
                    <td className="py-4 px-4 font-mono">{prod.roastLevel}</td>
                    <td className="py-4 px-4 font-mono font-bold text-gold">${prod.price}</td>
                    <td className="py-4 px-4 font-mono">{prod.stock} bags</td>
                    <td className="py-4 px-4 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(prod);
                          setIsProductModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cream"
                      >
                        <Edit className="w-4 h-4 text-gold" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-5 bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-cream">Create Promo Coupon</h3>
              <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
                <div>
                  <label className="block text-cream/60 mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCouponCode}
                    onChange={e => setNewCouponCode(e.target.value)}
                    placeholder="e.g. SPARK25"
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream uppercase font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-cream/60 mb-1">Discount (%)</label>
                    <input
                      type="number"
                      required
                      value={newCouponDiscount}
                      onChange={e => setNewCouponDiscount(Number(e.target.value))}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 mb-1">Min Spend ($)</label>
                    <input
                      type="number"
                      required
                      value={newCouponMin}
                      onChange={e => setNewCouponMin(Number(e.target.value))}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream font-mono"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow"
                >
                  Generate Active Coupon
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h3 className="font-serif font-bold text-xl text-cream">Active Promo Codes</h3>
              <div className="space-y-3">
                {coupons.map(c => (
                  <div key={c.code} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <div>
                      <span className="font-mono font-bold text-gold text-sm">{c.code}</span>
                      <p className="text-cream/60 mt-0.5">{c.description}</p>
                    </div>
                    <button
                      onClick={() => toggleCouponActive(c.code)}
                      className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold ${
                        c.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit / Add Product Modal */}
      <AnimatePresence>
        {isProductModalOpen && editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-card border border-caramel/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl text-cream my-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-serif font-bold text-xl text-cream">
                  {editingProduct.id ? 'Edit Coffee Product' : 'Add New Coffee Product'}
                </h3>
                <button onClick={() => setIsProductModalOpen(false)} className="text-cream/60 hover:text-cream">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProductForm} className="space-y-4 text-xs">
                <div>
                  <label className="block text-cream/60 mb-1">Coffee Title</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-cream/60 mb-1">Price ($)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.price || 0}
                      onChange={e => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-cream/60 mb-1">Stock (Bags)</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.stock || 50}
                      onChange={e => setEditingProduct({ ...editingProduct, stock: Number(e.target.value) })}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-cream/60 mb-1">Category</label>
                    <select
                      value={editingProduct.category || 'Single Origin'}
                      onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as any })}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                    >
                      <option value="Single Origin">Single Origin</option>
                      <option value="Signature Blend">Signature Blend</option>
                      <option value="Dark Roast">Dark Roast</option>
                      <option value="Espresso">Espresso</option>
                      <option value="Brewing Gear">Brewing Gear</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-cream/60 mb-1">Roast Level</label>
                    <select
                      value={editingProduct.roastLevel || 'Medium'}
                      onChange={e => setEditingProduct({ ...editingProduct, roastLevel: e.target.value as any })}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Medium-Dark">Medium-Dark</option>
                      <option value="Dark">Dark</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-cream/60 mb-1">Origin Location</label>
                  <input
                    type="text"
                    value={editingProduct.origin || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, origin: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsProductModalOpen(false)}
                    className="px-5 py-3 rounded-xl bg-white/10 text-cream font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
