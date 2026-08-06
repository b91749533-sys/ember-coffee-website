import React from 'react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { Star, Heart, ShoppingBag, Eye, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { wishlist, toggleWishlist, addToCart, setQuickViewProduct, setActivePage } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const handleCardClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product.id);
    } else {
      setActivePage('shop');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative bg-dark-card rounded-2xl overflow-hidden border border-white/10 hover:border-caramel/40 transition-all duration-500 hover:shadow-card-hover flex flex-col justify-between"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-espresso/30 cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="inline-flex items-center gap-1 bg-caramel text-cream font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              <Flame className="w-3 h-3 fill-cream" /> Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 bg-gold text-espresso-dark font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
              Micro-Lot
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-emerald-700 text-cream font-bold text-[10px] uppercase px-2 py-0.5 rounded-full">
              Save ${product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all z-10 ${
            isWishlisted
              ? 'bg-caramel text-cream border-caramel shadow-glow'
              : 'bg-dark/60 text-cream/70 border-white/10 hover:text-caramel hover:bg-dark'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-cream' : ''}`} />
        </button>

        {/* Hover Action Overlay */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex gap-2 z-10">
          <button
            onClick={e => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 py-2.5 rounded-xl bg-dark-surface/90 hover:bg-dark border border-white/20 text-cream text-xs font-semibold backdrop-blur-md flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            <Eye className="w-3.5 h-3.5 text-gold" /> Quick View
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="p-2.5 rounded-xl bg-caramel hover:bg-caramel-dark text-cream text-xs font-semibold shadow-glow flex items-center justify-center transition-colors"
            title="Add to Cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-3 cursor-pointer" onClick={handleCardClick}>
        <div>
          <div className="flex items-center justify-between text-xs text-cream/60">
            <span className="uppercase tracking-wider font-semibold text-caramel">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-gold text-gold" />
              <span className="font-mono font-bold text-cream">{product.rating}</span>
              <span className="text-cream/40">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-lg text-cream group-hover:text-gold transition-colors mt-1">
            {product.name}
          </h3>
          <p className="text-xs text-cream/60 line-clamp-1 mt-0.5">{product.subtitle}</p>

          {/* Flavor Badges */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.flavorNotes.slice(0, 3).map((note, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-espresso/80 text-caramel/90 border border-caramel/30 px-2 py-0.5 rounded-md font-sans"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-baseline gap-2 font-mono">
            <span className="font-bold text-lg text-cream">${product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-cream/40 line-through">${product.originalPrice}</span>
            )}
            <span className="text-[10px] text-cream/50">/ 250g</span>
          </div>

          <button
            onClick={e => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="text-xs font-semibold text-gold hover:text-cream flex items-center gap-1 transition-colors"
          >
            + Add to Bag
          </button>
        </div>
      </div>
    </motion.div>
  );
};
