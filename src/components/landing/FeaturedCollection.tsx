import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  const { products, setActivePage } = useStore();
  const featuredProducts = products.filter(p => p.isFeatured || p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 bg-[#171717] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-caramel text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hand-Crafted Selection</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
              Featured Coffees
            </h2>
          </div>
          <button
            onClick={() => setActivePage('shop')}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-cream transition-colors group"
          >
            <span>Explore Entire Roast Collection</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
          ))}
        </div>
      </div>
    </section>
  );
};
