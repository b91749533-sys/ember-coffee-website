import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, Tag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setActivePage
  } = useStore();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setActivePage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="pointer-events-auto w-screen max-w-md bg-dark-card border-l border-caramel/20 text-cream shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-caramel/20 border border-caramel/40 text-caramel">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-cream">Your Coffee Bag</h3>
                    <p className="text-xs text-cream/50">
                      {cart.length} unique item{cart.length === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-cream/60 hover:text-cream hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="bg-espresso/50 px-6 py-3 border-b border-white/10 text-xs">
                {amountNeededForFreeShipping > 0 ? (
                  <p className="text-cream/80 text-center">
                    Add <strong className="text-gold font-mono">${amountNeededForFreeShipping.toFixed(2)}</strong> more for <span className="text-caramel font-semibold">Free Express Shipping!</span>
                  </p>
                ) : (
                  <p className="text-emerald-400 font-semibold text-center flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> You've unlocked Free Express Shipping!
                  </p>
                )}
                <div className="w-full bg-dark h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-caramel to-gold h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Drawer Item List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="py-16 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-cream/40">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <p className="text-cream/60 text-sm">Your coffee bag is currently empty.</p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActivePage('shop');
                      }}
                      className="px-6 py-2.5 rounded-full bg-caramel text-cream font-bold text-xs shadow-glow"
                    >
                      Browse Roast Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3.5 rounded-2xl bg-white/5 border border-white/5 hover:border-caramel/30 transition-all"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-cream text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-cream/60">
                          {item.selectedWeight}g • {item.selectedGrind}
                        </p>
                        <span className="font-mono text-gold font-bold text-sm">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>

                      {/* Quantity Control & Remove */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center border border-white/15 rounded-lg overflow-hidden bg-dark">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.selectedWeight,
                                item.selectedGrind,
                                item.quantity - 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-cream/80 hover:bg-white/10"
                          >
                            -
                          </button>
                          <span className="px-2 font-mono text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                item.selectedWeight,
                                item.selectedGrind,
                                item.quantity + 1
                              )
                            }
                            className="px-2 py-0.5 text-xs text-cream/80 hover:bg-white/10"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedWeight, item.selectedGrind)
                          }
                          className="text-cream/40 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-dark-surface space-y-4">
                  {/* Promo Code Input */}
                  <div>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-caramel/20 border border-caramel/40 text-xs">
                        <span className="flex items-center gap-1.5 text-gold font-medium">
                          <Tag className="w-3.5 h-3.5" /> {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="text-cream/50 hover:text-cream underline"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={e => setCouponCode(e.target.value)}
                          placeholder="Promo code (e.g. EMBER15)"
                          className="flex-1 bg-dark border border-white/10 rounded-xl px-3 py-2 text-xs text-cream uppercase placeholder-cream/30 focus:outline-none focus:border-caramel"
                        />
                        <button
                          onClick={() => {
                            if (applyCoupon(couponCode)) setCouponCode('');
                          }}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-cream text-xs font-semibold"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Summary Rows */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-cream/70">
                      <span>Subtotal</span>
                      <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-caramel">
                        <span>Discount ({appliedCoupon.code})</span>
                        <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-cream/70">
                      <span>Estimated Shipping</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {amountNeededForFreeShipping === 0 ? 'FREE' : '$6.00'}
                      </span>
                    </div>

                    <div className="flex justify-between text-cream text-base font-bold pt-2 border-t border-white/10 font-mono">
                      <span>Total</span>
                      <span className="text-gold">
                        ${(subtotal - discountAmount + (amountNeededForFreeShipping === 0 ? 0 : 6)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-caramel via-caramel-dark to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm tracking-wide shadow-glow flex items-center justify-center gap-2 transition-transform active:scale-98"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
