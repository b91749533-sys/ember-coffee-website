import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Heart, Search, User, Menu, X, ShieldAlert, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  selectedProductId?: string | null;
  onSelectProduct?: (productId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectProduct }) => {
  const {
    cart,
    wishlist,
    user,
    activePage,
    setActivePage,
    setIsCartOpen,
    toggleAdminRole,
    products
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredSearchResults = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.flavorNotes.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-navbar py-3 shadow-xl'
            : 'bg-gradient-to-b from-espresso/80 via-dark/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-espresso via-caramel/80 to-gold/90 p-[1px] shadow-glow transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#171717] rounded-[11px] flex items-center justify-center">
                  <span className="font-serif font-extrabold text-gold text-lg leading-none tracking-tighter">
                    EC
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-cream group-hover:text-gold transition-colors">
                  EMBER
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-caramel font-semibold -mt-1">
                  Coffee Roasters
                </span>
              </div>
            </button>

            {/* Center Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-dark-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-cream/10 shadow-glass">
              {[
                { id: 'landing', label: 'Home' },
                { id: 'shop', label: 'Shop' },
                { id: 'about', label: 'Our Story' },
                { id: 'blog', label: 'Journal' },
                { id: 'contact', label: 'Contact' }
              ].map(link => {
                const isActive = activePage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                      isActive
                        ? 'text-cream font-bold'
                        : 'text-cream/70 hover:text-gold hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-gradient-to-r from-caramel/80 to-espresso rounded-full -z-10 shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Admin Toggle Badge */}
              <button
                onClick={toggleAdminRole}
                title={`Switch Role (Current: ${user.role})`}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  user.role === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                    : 'bg-white/5 text-cream/70 border-white/10 hover:text-cream'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>{user.role === 'admin' ? 'Admin Portal' : 'Customer View'}</span>
              </button>

              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-cream/80 hover:text-gold hover:bg-white/5 rounded-full transition-colors"
                title="Search Coffees"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Icon */}
              <button
                onClick={() => handleNavClick('dashboard-wishlist')}
                className="relative p-2 text-cream/80 hover:text-caramel hover:bg-white/5 rounded-full transition-colors"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-caramel text-cream font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* User Dashboard */}
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`p-2 rounded-full transition-colors ${
                  activePage.startsWith('dashboard')
                    ? 'text-gold bg-gold/10'
                    : 'text-cream/80 hover:text-gold hover:bg-white/5'
                }`}
                title="Account Dashboard"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-caramel to-espresso hover:from-caramel/90 hover:to-espresso/90 text-cream px-3.5 py-2 rounded-full shadow-glow transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4 text-cream" />
                <span className="font-semibold text-xs font-mono">{totalCartCount}</span>
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-cream hover:text-gold"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-dark-surface/95 backdrop-blur-xl border-b border-caramel/20 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-4">
              {[
                { id: 'landing', label: 'Home' },
                { id: 'shop', label: 'Shop Coffee' },
                { id: 'about', label: 'Our Story' },
                { id: 'blog', label: 'Coffee Journal' },
                { id: 'contact', label: 'Contact Us' },
                { id: 'dashboard', label: 'My Account' },
                { id: 'admin', label: 'Admin Portal' }
              ].map(link => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-lg font-serif tracking-wide py-2 border-b border-white/5 transition-colors ${
                    activePage === link.id ? 'text-gold font-bold' : 'text-cream/80 hover:text-gold'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => {
                  toggleAdminRole();
                  setIsMobileMenuOpen(false);
                }}
                className="mt-4 flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold"
              >
                <span>Switch View Mode ({user.role})</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Global Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              className="bg-dark-card border border-caramel/30 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3 flex-1">
                  <Search className="w-6 h-6 text-caramel" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search Ember coffees, flavor notes, origins..."
                    className="w-full bg-transparent text-cream placeholder-cream/40 focus:outline-none text-lg font-serif"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-1 text-cream/50 hover:text-cream rounded-lg hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Results */}
              <div className="mt-4 max-h-96 overflow-y-auto space-y-3">
                {searchQuery.trim() === '' ? (
                  <div className="py-8 text-center text-cream/50 text-sm">
                    Try searching for <span className="text-gold font-medium">"Yirgacheffe"</span>,{' '}
                    <span className="text-gold font-medium">"Caramel"</span>, or{' '}
                    <span className="text-gold font-medium">"Dark Roast"</span>.
                  </div>
                ) : filteredSearchResults.length === 0 ? (
                  <div className="py-8 text-center text-cream/50 text-sm">
                    No coffees found matching "{searchQuery}".
                  </div>
                ) : (
                  filteredSearchResults.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery('');
                        if (onSelectProduct) {
                          onSelectProduct(product.id);
                        } else {
                          setActivePage('shop');
                        }
                      }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-caramel/20 cursor-pointer transition-all"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-serif font-bold text-cream text-base truncate">
                            {product.name}
                          </h4>
                          <span className="font-mono text-gold font-semibold">${product.price}</span>
                        </div>
                        <p className="text-xs text-cream/60">{product.subtitle}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {product.flavorNotes.slice(0, 3).map((note, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-espresso/80 text-caramel border border-caramel/30 px-2 py-0.5 rounded-full"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
