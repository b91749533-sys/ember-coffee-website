import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/shop/ProductCard';
import { Search, SlidersHorizontal, Grid, List, Sparkles, X } from 'lucide-react';
import { Category, Product } from '../types';

export const ShopPage: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  const { products } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedRoast, setSelectedRoast] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: (string | Category)[] = ['All', 'Single Origin', 'Signature Blend', 'Dark Roast', 'Espresso', 'Brewing Gear'];
  const roasts = ['All', 'Light', 'Medium', 'Medium-Dark', 'Dark'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p: Product) => {
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        if (selectedRoast !== 'All' && p.roastLevel !== selectedRoast) return false;
        if (p.price > maxPrice) return false;
        if (
          searchQuery.trim() &&
          !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.origin.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !p.flavorNotes.some((n: string) => n.toLowerCase().includes(searchQuery.toLowerCase()))
        ) {
          return false;
        }
        return true;
      })
      .sort((a: Product, b: Product) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedRoast, maxPrice, searchQuery, sortBy]);

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Roaster’s Vault</span>
          </div>
          <h1 className="font-serif font-bold text-4xl sm:text-6xl text-cream">
            Explore Specialty Coffees
          </h1>
          <p className="text-cream/70 text-sm sm:text-base font-light">
            Micro-lots, single origins, and signature blends roasted fresh to order.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-dark-card border border-white/10 rounded-3xl p-6 mb-10 space-y-6 shadow-xl">
          {/* Top Controls */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-cream/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search coffee names, notes, origins..."
                className="w-full bg-dark border border-white/15 rounded-full pl-11 pr-10 py-2.5 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-caramel"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 w-full lg:w-auto scrollbar-none py-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-caramel text-cream shadow-glow'
                      : 'bg-white/5 border border-white/10 text-cream/70 hover:text-cream'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown & Layout Controls */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="bg-dark border border-white/15 rounded-full px-4 py-2 text-xs text-cream font-semibold focus:outline-none focus:border-caramel"
              >
                <option value="featured">Sort: Featured</option>
                <option value="rating">Sort: Highest Rated</option>
                <option value="price-asc">Sort: Price Low to High</option>
                <option value="price-desc">Sort: Price High to Low</option>
              </select>

              <div className="flex items-center border border-white/15 rounded-full p-1 bg-dark">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-caramel text-cream' : 'text-cream/50'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-full ${viewMode === 'list' ? 'bg-caramel text-cream' : 'text-cream/50'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Secondary Filters (Roast Level & Price Range) */}
          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
            {/* Roast Filters */}
            <div className="flex items-center gap-2">
              <span className="text-cream/60 font-semibold flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5 text-caramel" /> Roast Profile:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {roasts.map(roast => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`px-3 py-1 rounded-lg border text-[11px] font-medium transition-colors ${
                      selectedRoast === roast
                        ? 'bg-espresso border-gold text-gold'
                        : 'bg-white/5 border-white/10 text-cream/60 hover:text-cream'
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Slider */}
            <div className="flex items-center gap-3 w-full md:w-64">
              <span className="text-cream/60 font-semibold">Max Price:</span>
              <input
                type="range"
                min={20}
                max={150}
                step={5}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="flex-1 h-1.5 bg-dark rounded-lg appearance-none cursor-pointer accent-caramel"
              />
              <span className="font-mono text-gold font-bold text-sm min-w-12 text-right">
                ${maxPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 text-xs text-cream/60">
          <span>Showing {filteredProducts.length} specialty coffees</span>
          {(selectedCategory !== 'All' || selectedRoast !== 'All' || searchQuery || maxPrice < 150) && (
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedRoast('All');
                setSearchQuery('');
                setMaxPrice(150);
              }}
              className="text-caramel hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Grid / List Display */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-dark-card border border-white/10 rounded-3xl space-y-4">
            <p className="text-cream/60 text-sm">No coffees match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedRoast('All');
                setSearchQuery('');
                setMaxPrice(150);
              }}
              className="px-6 py-2.5 rounded-full bg-caramel text-cream font-bold text-xs shadow-glow"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} onSelectProduct={onSelectProduct} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
