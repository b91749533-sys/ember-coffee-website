import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, CreditCard, CheckCircle2, ShieldCheck, Truck, ArrowLeft, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CheckoutPage: React.FC = () => {
  const { cart, appliedCoupon, placeOrder, setActivePage, addToast } = useStore();

  const [formData, setFormData] = useState({
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@example.com',
    shippingAddress: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94102',
    cardNumber: '4242 •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'sameDay'>('express');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
  
  let shippingCost = 6;
  if (shippingMethod === 'standard') shippingCost = subtotal >= 50 ? 0 : 6;
  if (shippingMethod === 'express') shippingCost = 12;
  if (shippingMethod === 'sameDay') shippingCost = 25;

  const grandTotal = subtotal - discountAmount + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast('Bag Empty', 'Please add coffees to your bag before checking out.', 'warning');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = placeOrder({
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        shippingAddress: `${formData.shippingAddress}, ${formData.state}`,
        city: formData.city,
        postalCode: formData.postalCode
      });

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
    }, 1200);
  };

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-10">
          <button
            onClick={() => setActivePage('shop')}
            className="flex items-center gap-2 text-xs font-semibold text-cream/70 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Shop
          </button>

          <div className="flex items-center gap-2 text-xs text-caramel font-semibold">
            <Lock className="w-4 h-4" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>

        {cart.length === 0 && !completedOrder ? (
          <div className="py-20 text-center max-w-md mx-auto space-y-4">
            <ShoppingBag className="w-16 h-16 text-cream/30 mx-auto" />
            <h2 className="font-serif font-bold text-2xl">Your Coffee Bag is Empty</h2>
            <p className="text-sm text-cream/60">Explore our specialty roasts to proceed to checkout.</p>
            <button
              onClick={() => setActivePage('shop')}
              className="px-8 py-3 rounded-full bg-caramel text-cream font-bold text-xs shadow-glow"
            >
              Browse Coffees
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Steps */}
            <div className="lg:col-span-7 space-y-8">
              {/* Express Checkout */}
              <div className="bg-dark-card border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
                <p className="text-xs uppercase tracking-wider text-cream/50 text-center font-semibold">
                  Express Checkout
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => addToast('Apple Pay', 'Apple Pay simulated authentication success', 'success')}
                    className="py-3 rounded-2xl bg-white text-black font-semibold text-xs flex items-center justify-center gap-2 hover:bg-cream transition-colors"
                  >
                    <span>Pay</span>
                  </button>
                  <button
                    onClick={() => addToast('Google Pay', 'Google Pay simulated authentication success', 'success')}
                    className="py-3 rounded-2xl bg-dark-surface border border-white/20 text-cream font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                  >
                    <span>G Pay</span>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* Step 1: Contact & Shipping Address */}
                <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                  <h3 className="font-serif font-bold text-xl text-cream flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-caramel text-cream text-xs flex items-center justify-center font-mono">
                      1
                    </span>
                    Shipping Destination
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.customerEmail}
                        onChange={e => setFormData({ ...formData, customerEmail: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.shippingAddress}
                      onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={e => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-caramel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={e => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-caramel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        required
                        value={formData.postalCode}
                        onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3 py-2 text-xs text-cream focus:outline-none focus:border-caramel font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Delivery Speed */}
                <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
                  <h3 className="font-serif font-bold text-xl text-cream flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-caramel text-cream text-xs flex items-center justify-center font-mono">
                      2
                    </span>
                    Shipping Method
                  </h3>

                  <div className="space-y-3">
                    {[
                      { id: 'standard', name: 'Standard Roastery Shipping', speed: '3-4 business days', cost: subtotal >= 50 ? 0 : 6 },
                      { id: 'express', name: 'Express Air Priority', speed: '2 business days', cost: 12 },
                      { id: 'sameDay', name: 'Same-Day Courier Delivery', speed: 'Within 24 hours', cost: 25 }
                    ].map(method => (
                      <label
                        key={method.id}
                        className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                          shippingMethod === method.id
                            ? 'bg-espresso/60 border-caramel shadow-glow'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={shippingMethod === method.id}
                            onChange={() => setShippingMethod(method.id as any)}
                            className="accent-caramel"
                          />
                          <div>
                            <p className="font-semibold text-xs text-cream">{method.name}</p>
                            <p className="text-[11px] text-cream/50">{method.speed}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-gold">
                          {method.cost === 0 ? 'FREE' : `$${method.cost}.00`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 3: Card Payment */}
                <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
                  <h3 className="font-serif font-bold text-xl text-cream flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-caramel text-cream text-xs flex items-center justify-center font-mono">
                        3
                      </span>
                      Payment Details
                    </span>
                    <CreditCard className="w-5 h-5 text-gold" />
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={e => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream font-mono focus:outline-none focus:border-caramel"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardExp}
                          onChange={e => setFormData({ ...formData, cardExp: e.target.value })}
                          className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream font-mono focus:outline-none focus:border-caramel"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                          CVC / CVV
                        </label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={formData.cardCvc}
                          onChange={e => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream font-mono focus:outline-none focus:border-caramel"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-caramel via-caramel-dark to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Processing Payment...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Pay ${grandTotal.toFixed(2)} & Complete Order</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary Box */}
            <div className="lg:col-span-5 bg-dark-card border border-caramel/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl sticky top-28">
              <h3 className="font-serif font-bold text-xl text-cream border-b border-white/10 pb-4">
                Order Summary ({cart.length} item{cart.length === 1 ? '' : 's'})
              </h3>

              <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-serif font-bold text-cream truncate">{item.product.name}</p>
                      <p className="text-[10px] text-cream/50">
                        {item.quantity}x {item.selectedWeight}g ({item.selectedGrind})
                      </p>
                    </div>
                    <span className="font-mono font-bold text-gold">
                      ${item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-white/10 pt-4">
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
                  <span>Shipping ({shippingMethod})</span>
                  <span className="font-mono font-bold">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost}.00`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-cream pt-3 border-t border-white/10">
                  <span>Total</span>
                  <span className="font-mono text-gold text-lg">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-espresso/50 rounded-xl border border-white/10 text-[11px] text-cream/70 space-y-1">
                <p className="font-semibold text-caramel">★ Ember Satisfaction Guarantee</p>
                <p>If your coffee isn't roasted to absolute perfection, we will re-roast and dispatch a fresh batch free of charge.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Confirmation Receipt Modal */}
      <AnimatePresence>
        {completedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-card border border-caramel/40 rounded-3xl max-w-lg w-full p-8 text-center space-y-6 shadow-2xl text-cream"
            >
              <div className="w-16 h-16 rounded-full bg-caramel/20 border border-caramel text-gold flex items-center justify-center mx-auto shadow-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-caramel font-semibold">
                  Order Confirmed
                </span>
                <h2 className="font-serif font-bold text-3xl text-cream">
                  Thank You, {completedOrder.customerName}!
                </h2>
                <p className="text-xs text-cream/70 font-mono">
                  Order Reference: <strong className="text-gold">{completedOrder.id}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-espresso/50 border border-white/10 text-xs text-left space-y-2 font-sans">
                <p className="text-cream/80">
                  We have sent your receipt to <strong className="text-cream">{completedOrder.customerEmail}</strong>.
                </p>
                <p className="text-cream/80">
                  Destination: <strong className="text-cream">{completedOrder.shippingAddress}</strong>
                </p>
                <div className="pt-2 border-t border-white/10 flex justify-between font-mono text-gold font-bold">
                  <span>Total Paid</span>
                  <span>${completedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setCompletedOrder(null);
                    setActivePage('dashboard');
                  }}
                  className="flex-1 py-3 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow"
                >
                  View Order Tracking
                </button>
                <button
                  onClick={() => {
                    setCompletedOrder(null);
                    setActivePage('shop');
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 text-cream font-semibold text-xs"
                >
                  Keep Shopping
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
