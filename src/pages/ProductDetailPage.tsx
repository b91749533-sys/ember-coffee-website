import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingBag, Heart, Check, RotateCw, Sparkles, ArrowLeft, Flame, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '../components/shop/ProductCard';

interface ProductDetailProps {
  productId: string;
  onSelectProduct?: (id: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailProps> = ({ productId, onSelectProduct }) => {
  const { products, addToCart, wishlist, toggleWishlist, addProductReview, setActivePage } = useStore();

  const product = products.find(p => p.id === productId) || products[0];
  const isWishlisted = wishlist.includes(product.id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [is360Mode, setIs360Mode] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const [selectedWeight, setSelectedWeight] = useState<number>(product.weightOptions[0] || 250);
  const [selectedGrind, setSelectedGrind] = useState<'Whole Bean' | 'Espresso' | 'Filter / V60' | 'French Press'>('Whole Bean');
  const [quantity, setQuantity] = useState(1);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    author: '',
    title: '',
    comment: '',
    rating: 5
  });

  const calculatePrice = () => {
    let multiplier = 1;
    if (selectedWeight === 500) multiplier = 1.85;
    if (selectedWeight === 1000) multiplier = 3.4;
    return Math.round(product.price * multiplier);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author || !reviewForm.comment) return;
    addProductReview(product.id, {
      author: reviewForm.author,
      title: reviewForm.title,
      comment: reviewForm.comment,
      rating: reviewForm.rating,
      verified: true
    });
    setIsReviewModalOpen(false);
    setReviewForm({ author: '', title: '', comment: '', rating: 5 });
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => setActivePage('shop')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-cream/70 hover:text-gold transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Roast Collection
        </button>

        {/* Top Product Hero Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Multi-Angle Gallery & 360 Viewer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-espresso/40 border border-caramel/30 shadow-2xl group">
              {is360Mode ? (
                <div className="relative w-full h-full flex items-center justify-center bg-dark p-8">
                  <div
                    className="w-full h-full transition-transform duration-100 flex items-center justify-center"
                    style={{ transform: `rotate(${rotationAngle}deg)` }}
                  >
                    <img
                      src={product.images[0]}
                      alt="360 view"
                      className="w-full h-full object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  {/* 360° Drag Rotation Controls */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark/80 backdrop-blur-md border border-white/10 text-center space-y-2">
                    <p className="text-xs text-gold font-mono font-bold">Interactive 360° View Simulation</p>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={rotationAngle}
                      onChange={e => setRotationAngle(Number(e.target.value))}
                      className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-caramel"
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              )}

              {/* 360 Toggle Button */}
              <button
                onClick={() => setIs360Mode(!is360Mode)}
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-dark/80 backdrop-blur-md border border-gold/40 text-gold text-xs font-semibold flex items-center gap-1.5 hover:bg-dark"
              >
                <RotateCw className={`w-3.5 h-3.5 ${is360Mode ? 'animate-spin' : ''}`} />
                <span>{is360Mode ? 'Standard Gallery' : '360° Interactive'}</span>
              </button>
            </div>

            {/* Thumbnail Pickers */}
            {!is360Mode && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-caramel scale-105 shadow-glow'
                        : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Configuration & Purchase Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-caramel uppercase tracking-widest">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="font-bold font-mono">{product.rating}</span>
                  <span className="text-cream/50">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-cream mt-1 leading-tight">
                {product.name}
              </h1>
              <p className="text-sm text-cream/70 mt-1 font-light">{product.subtitle}</p>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-bold text-gold">${calculatePrice()}</span>
                {product.originalPrice && (
                  <span className="text-sm text-cream/40 line-through">${product.originalPrice}</span>
                )}
                <span className="text-xs text-cream/50">/ {selectedWeight}g bag</span>
              </div>
            </div>

            {/* Roast Level Indicator */}
            <div className="p-4 rounded-2xl bg-dark-card border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cream/70 font-semibold">Roast Profile</span>
                <span className="text-gold font-bold font-serif">{product.roastLevel} Roast</span>
              </div>
              <div className="w-full bg-dark h-2 rounded-full flex overflow-hidden p-0.5 border border-white/10">
                <div
                  className="bg-gradient-to-r from-caramel via-gold to-espresso h-full rounded-full transition-all duration-500"
                  style={{
                    width:
                      product.roastLevel === 'Light'
                        ? '30%'
                        : product.roastLevel === 'Medium'
                        ? '55%'
                        : product.roastLevel === 'Medium-Dark'
                        ? '75%'
                        : '95%'
                  }}
                />
              </div>
            </div>

            {/* Flavor Notes */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2 font-semibold">
                Sensory Tasting Notes
              </label>
              <div className="flex flex-wrap gap-2">
                {product.flavorNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-espresso border border-caramel/40 text-cream px-3 py-1.5 rounded-xl font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Weight Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2 font-semibold">
                Bag Weight
              </label>
              <div className="grid grid-cols-3 gap-3">
                {product.weightOptions.map(weight => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-3 px-4 rounded-2xl border text-xs font-bold font-mono transition-all ${
                      selectedWeight === weight
                        ? 'bg-caramel text-cream border-caramel shadow-glow'
                        : 'bg-white/5 border-white/10 text-cream/70 hover:border-white/30'
                    }`}
                  >
                    {weight >= 1000 ? '1.0 kg' : `${weight}g`}
                  </button>
                ))}
              </div>
            </div>

            {/* Grind Selection */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-cream/60 mb-2 font-semibold">
                Grind Preference
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Whole Bean', 'Espresso', 'Filter / V60', 'French Press'] as const).map(grind => (
                  <button
                    key={grind}
                    onClick={() => setSelectedGrind(grind)}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
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

            {/* Add to Cart Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/10">
              <div className="flex items-center border border-white/15 rounded-2xl overflow-hidden bg-dark">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-cream hover:bg-white/10 font-mono font-bold"
                >
                  -
                </button>
                <span className="px-4 font-mono text-sm font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-cream hover:bg-white/10 font-mono font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity, selectedWeight, selectedGrind)}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-caramel via-caramel-dark to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Coffee Bag
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-2xl border transition-colors ${
                  isWishlisted
                    ? 'bg-caramel border-caramel text-cream'
                    : 'bg-white/5 border-white/10 text-cream/70 hover:text-caramel'
                }`}
                title="Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-cream' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Specs & Brewing Recommendation Tab */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 bg-dark-card border border-white/10 rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="font-serif font-bold text-2xl text-cream border-b border-white/10 pb-4">
              Story & Terroir Specs
            </h3>

            <p className="text-cream/80 text-sm leading-relaxed font-light">{product.description}</p>
            <p className="text-cream/70 text-sm leading-relaxed italic">{product.story}</p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
              <div>
                <span className="text-cream/50 uppercase tracking-wider font-semibold">Origin</span>
                <p className="font-serif text-gold font-bold text-base mt-0.5">{product.origin}</p>
              </div>
              <div>
                <span className="text-cream/50 uppercase tracking-wider font-semibold">Elevation</span>
                <p className="font-mono text-cream font-bold text-base mt-0.5">{product.elevation || '1,800m'}</p>
              </div>
              <div>
                <span className="text-cream/50 uppercase tracking-wider font-semibold">Process</span>
                <p className="font-mono text-cream font-bold text-base mt-0.5">{product.process || 'Washed'}</p>
              </div>
              <div>
                <span className="text-cream/50 uppercase tracking-wider font-semibold">Roast Style</span>
                <p className="font-mono text-cream font-bold text-base mt-0.5">{product.roastLevel}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-dark-card border border-caramel/20 rounded-3xl p-8 space-y-4 shadow-xl glass-card">
            <div className="flex items-center gap-2 text-gold">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif font-bold text-xl text-cream">Roaster’s Brewing Advice</h3>
            </div>
            <p className="text-cream/80 text-sm leading-relaxed">{product.brewingRecommendation}</p>
            <div className="p-4 bg-espresso/50 rounded-2xl border border-white/10 text-xs space-y-2">
              <p className="font-semibold text-caramel">★ Recommended Extraction:</p>
              <p className="text-cream/70">Use 92°C - 94°C mineralized water at a 1:16 coffee-to-water brew ratio for optimum floral top notes.</p>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-20 space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <h3 className="font-serif font-bold text-3xl text-cream">Verified Reviews</h3>
              <p className="text-xs text-cream/60 mt-1">
                {product.reviewsCount} customer experiences with {product.name}
              </p>
            </div>

            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="px-6 py-2.5 rounded-full bg-caramel hover:bg-caramel-dark text-cream font-bold text-xs shadow-glow flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviewsList.map(rev => (
              <div key={rev.id} className="p-6 rounded-2xl bg-dark-card border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-gold text-gold' : 'text-cream/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-cream/40 font-mono">{rev.date}</span>
                </div>

                <h4 className="font-serif font-bold text-cream text-base">{rev.title}</h4>
                <p className="text-xs text-cream/70 leading-relaxed">{rev.comment}</p>
                <p className="text-[11px] text-caramel font-semibold">— {rev.author} (Verified Buyer)</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 space-y-8">
            <h3 className="font-serif font-bold text-3xl text-cream">You May Also Enjoy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} onSelectProduct={onSelectProduct} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-dark-card border border-caramel/40 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl text-cream"
            >
              <h3 className="font-serif font-bold text-2xl text-cream">Review {product.name}</h3>

              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.author}
                    onChange={e => setReviewForm({ ...reviewForm, author: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-caramel"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Star Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 text-gold"
                      >
                        <Star className={`w-6 h-6 ${star <= reviewForm.rating ? 'fill-gold' : 'text-cream/20'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={reviewForm.title}
                    onChange={e => setReviewForm({ ...reviewForm, title: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-caramel"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Your Experience
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.comment}
                    onChange={e => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-caramel"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-xl bg-caramel text-cream font-bold text-xs shadow-glow"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(false)}
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
