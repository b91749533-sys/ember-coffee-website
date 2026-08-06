import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, Heart, Check, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const QuickViewModal: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  const { quickViewProduct, setQuickViewProduct, addToCart, wishlist, toggleWishlist, setActivePage } = useStore();

  const [selectedWeight, setSelectedWeight] = useState<number>(250);
  const [selectedGrind, setSelectedGrind] = useState<'Whole Bean' | 'Espresso' | 'Filter / V60' | 'French Press'>('Whole Bean');
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);

  const calculatePrice = () => {
    let multiplier = 1;
    if (selectedWeight === 500) multiplier = 1.85;
    if (selectedWeight === 1000) multiplier = 3.4;
    return Math.round(quickViewProduct.price * multiplier);
  };

  const handleFullDetails = () => {
    const pId = quickViewProduct.id;
    setQuickViewProduct(null);
    if (onSelectProduct) {
      onSelectProduct(pId);
    } else {
      setActivePage('shop');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative max-w-4xl w-full bg-dark-card border border-caramel/30 rounded-3xl overflow-hidden shadow-2xl my-8 text-cream"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black text-cream/70 hover:text-cream transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Image Showcase */}
            <div className="relative aspect-square bg-espresso/40 overflow-hidden">
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-dark/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <span className="text-caramel font-semibold">Origin: {quickViewProduct.origin}</span>
                <span className="text-gold font-mono font-bold">Roast: {quickViewProduct.roastLevel}</span>
              </div>
            </div>

            {/* Right Form Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-caramel uppercase tracking-wider">
                    {quickViewProduct.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs">
                    <Star className="w-4 h-4 fill-gold text-gold" />
                    <span className="font-bold font-mono">{quickViewProduct.rating}</span>
                    <span className="text-cream/40">({quickViewProduct.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-cream mt-1">
                  {quickViewProduct.name}
                </h2>
                <p className="text-xs text-cream/60 mt-1">{quickViewProduct.subtitle}</p>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-mono text-2xl font-bold text-gold">${calculatePrice()}</span>
                  <span className="text-xs text-cream/50">Tax included. Free shipping over $50.</span>
                </div>

                {/* Flavor Notes */}
                <div className="mt-4">
                  <p className="text-[11px] uppercase tracking-wider text-cream/50 mb-1.5">Flavor Notes</p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-espresso border border-caramel/40 text-cream px-2.5 py-1 rounded-lg"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Weight Selector */}
                <div className="mt-5">
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
                    Bag Weight
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {quickViewProduct.weightOptions.map(weight => (
                      <button
                        key={weight}
                        onClick={() => setSelectedWeight(weight)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold font-mono transition-all ${
                          selectedWeight === weight
                            ? 'bg-caramel text-cream border-caramel shadow-glow'
                            : 'bg-white/5 border-white/10 text-cream/70 hover:border-white/30'
                        }`}
                      >
                        {weight >= 1000 ? '1 kg' : `${weight}g`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grind Selector */}
                <div className="mt-4">
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2">
                    Grind Selection
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['Whole Bean', 'Espresso', 'Filter / V60', 'French Press'] as const).map(grind => (
                      <button
                        key={grind}
                        onClick={() => setSelectedGrind(grind)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                          selectedGrind === grind
                            ? 'bg-espresso border-gold text-gold shadow-sm'
                            : 'bg-white/5 border-white/10 text-cream/70 hover:border-white/30'
                        }`}
                      >
                        {grind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity & CTA */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-white/15 rounded-xl overflow-hidden bg-white/5">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-cream hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="px-4 font-mono text-sm font-bold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-cream hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, quantity, selectedWeight, selectedGrind);
                      setQuickViewProduct(null);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-caramel to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm shadow-glow flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Coffee Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    className={`p-3.5 rounded-xl border transition-colors ${
                      isWishlisted
                        ? 'bg-caramel border-caramel text-cream'
                        : 'bg-white/5 border-white/10 text-cream/70 hover:text-caramel'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-cream' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleFullDetails}
                  className="w-full text-center text-xs text-gold hover:underline pt-1"
                >
                  View Full Product Details & 360° Preview →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
