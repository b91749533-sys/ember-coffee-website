import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/shop/ProductCard';
import { Package, Heart, Sparkles, MapPin, User as UserIcon, CheckCircle2, Clock, Truck, Gift } from 'lucide-react';
import { motion } from 'framer-motion';

export const UserDashboardPage: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  const { user, orders, wishlist, products, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'perks' | 'addresses' | 'settings'>('orders');

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Profile Header Card */}
        <div className="bg-dark-card border border-caramel/30 rounded-3xl p-6 sm:p-8 mb-10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 glass-card">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-caramel shadow-glow"
            />
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="font-serif font-bold text-2xl text-cream">{user.name}</h1>
                <span className="text-[10px] bg-espresso border border-caramel/40 text-gold px-2.5 py-0.5 rounded-full font-mono uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs text-cream/60">{user.email}</p>
            </div>
          </div>

          {/* Ember Perks Points Counter */}
          <div className="p-4 rounded-2xl bg-espresso/60 border border-gold/30 flex items-center gap-4 shadow-sm">
            <div className="p-3 rounded-xl bg-gold/10 text-gold border border-gold/30">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-cream/50">Ember Perks Balance</span>
              <p className="font-mono text-2xl font-extrabold text-gold">{user.perksPoints} pts</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto justify-start sm:justify-center gap-2 mb-10 pb-2 border-b border-white/10 scrollbar-none">
          {[
            { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, badge: wishlist.length },
            { id: 'perks', label: 'Ember Perks', icon: Gift },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'settings', label: 'Account Settings', icon: UserIcon }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-caramel text-cream shadow-glow border border-caramel'
                    : 'bg-dark-card border border-white/10 text-cream/70 hover:text-cream'
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? 'text-cream' : 'text-gold'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="ml-1 bg-espresso px-2 py-0.5 rounded-full text-[10px] text-gold font-mono">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-2xl text-cream">Your Order History</h2>

            {orders.length === 0 ? (
              <div className="py-16 text-center bg-dark-card border border-white/10 rounded-3xl space-y-3">
                <Package className="w-12 h-12 text-cream/30 mx-auto" />
                <p className="text-cream/60 text-sm">You haven’t placed any coffee orders yet.</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order.id} className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
                  {/* Order Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-serif font-bold text-lg text-cream">{order.id}</span>
                        <span className="text-xs text-cream/50 font-mono">Placed on {order.date}</span>
                      </div>
                      <p className="text-xs text-cream/60 mt-0.5">Shipping to {order.shippingAddress}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-gold text-base">${order.total.toFixed(2)}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold font-mono ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : order.status === 'Shipped'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            : order.status === 'Roasted'
                            ? 'bg-caramel/20 text-caramel border border-caramel/40'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}
                      >
                        ● {order.status}
                      </span>
                    </div>
                  </div>

                  {/* Order Progress Tracker */}
                  <div className="grid grid-cols-4 gap-2 text-center text-xs pt-2">
                    {[
                      { label: 'Order Received', done: true, icon: CheckCircle2 },
                      { label: 'Micro-Roasted', done: order.status !== 'Processing', icon: Clock },
                      { label: 'Shipped', done: order.status === 'Shipped' || order.status === 'Delivered', icon: Truck },
                      { label: 'Delivered', done: order.status === 'Delivered', icon: CheckCircle2 }
                    ].map((step, idx) => (
                      <div key={idx} className="space-y-2">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border transition-colors ${
                            step.done
                              ? 'bg-caramel border-caramel text-cream shadow-glow'
                              : 'bg-white/5 border-white/10 text-cream/30'
                          }`}
                        >
                          <step.icon className="w-4 h-4" />
                        </div>
                        <span className={`block font-medium text-[11px] ${step.done ? 'text-cream' : 'text-cream/40'}`}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Items List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl bg-white/5">
                        <img src={item.productImage} alt={item.productName} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-bold text-cream text-sm truncate">{item.productName}</h4>
                          <p className="text-[11px] text-cream/50">
                            {item.quantity}x {item.weight}g ({item.grind})
                          </p>
                        </div>
                        <span className="font-mono text-gold font-bold text-sm">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h2 className="font-serif font-bold text-2xl text-cream">Saved Favorites ({wishlist.length})</h2>
            {wishlistedProducts.length === 0 ? (
              <div className="py-16 text-center bg-dark-card border border-white/10 rounded-3xl space-y-3">
                <Heart className="w-12 h-12 text-cream/30 mx-auto" />
                <p className="text-cream/60 text-sm">Your saved wishlist is empty.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistedProducts.map(prod => (
                  <ProductCard key={prod.id} product={prod} onSelectProduct={onSelectProduct} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PERKS */}
        {activeTab === 'perks' && (
          <div className="bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Gift className="w-6 h-6 text-gold" />
              <h2 className="font-serif font-bold text-2xl text-cream">Ember Perks Rewards Program</h2>
            </div>

            <p className="text-xs text-cream/70 leading-relaxed font-light">
              Earn 10 Ember Perks points for every dollar spent on specialty roasts. Redeem points for exclusive free micro-lots, custom gooseneck kettles, or barista merchandise.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { cost: 500, title: 'Free 250g Micro-Lot', desc: 'Redeem for any single-origin coffee.' },
                { cost: 1000, title: '$25 Gift Voucher', desc: 'Applied directly to your next cart.' },
                { cost: 2500, title: 'Ember Kettle', desc: 'Precision electric gooseneck kettle.' }
              ].map((reward, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3 text-center">
                  <span className="font-mono text-gold font-bold text-xl">{reward.cost} Pts</span>
                  <h4 className="font-serif font-bold text-cream text-base">{reward.title}</h4>
                  <p className="text-xs text-cream/60">{reward.desc}</p>
                  <button
                    onClick={() => {
                      if (user.perksPoints >= reward.cost) {
                        addToast('Reward Claimed!', `You claimed: ${reward.title}`, 'success');
                      } else {
                        addToast('Insufficient Points', `You need ${reward.cost - user.perksPoints} more points.`, 'warning');
                      }
                    }}
                    className="w-full py-2 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow mt-2"
                  >
                    Redeem Reward
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
            <h2 className="font-serif font-bold text-2xl text-cream">Saved Delivery Address</h2>
            <div className="p-6 rounded-2xl bg-white/5 border border-caramel/30 space-y-2">
              <span className="text-xs uppercase font-mono font-bold text-caramel">Primary Shipping Address</span>
              <p className="font-serif font-bold text-cream text-lg">{user.name}</p>
              <p className="text-xs text-cream/70">742 Evergreen Terrace, San Francisco, CA 94102</p>
              <p className="text-xs text-cream/60">Phone: +1 (555) 019-2834</p>
            </div>
          </div>
        )}

        {/* TAB 5: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl max-w-2xl">
            <h2 className="font-serif font-bold text-2xl text-cream">Account Profile Settings</h2>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-cream/60 mb-1">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                />
              </div>
              <div>
                <label className="block text-cream/60 mb-1">Email Address</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-cream"
                />
              </div>
              <button
                onClick={() => addToast('Profile Saved', 'Account information updated.', 'success')}
                className="px-6 py-3 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
