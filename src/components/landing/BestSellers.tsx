import React, { useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../shop/ProductCard';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';

export const BestSellers: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  const { products } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bestSellers = products.filter(p => p.isBestSeller || p.rating >= 4.8);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-caramel text-xs font-semibold uppercase tracking-widest mb-2">
              <Flame className="w-4 h-4 fill-caramel text-caramel" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
              Best Sellers Carousel
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleScroll('left')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-cream transition-colors"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-cream transition-colors"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Grid */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestSellers.map(product => (
            <div key={product.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start">
              <ProductCard product={product} onSelectProduct={onSelectProduct} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
