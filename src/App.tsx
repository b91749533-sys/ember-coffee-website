import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ToastContainer } from './components/layout/ToastContainer';
import { CartDrawer } from './components/cart/CartDrawer';
import { QuickViewModal } from './components/shop/QuickViewModal';

import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './components/checkout/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { activePage, setActivePage } = useStore();
  const [selectedProductId, setSelectedProductId] = useState<string>('ember-signature-blend');

  const handleSelectProduct = (id: string) => {
    setSelectedProductId(id);
    setActivePage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#171717] text-[#F7F3EE] flex flex-col justify-between selection:bg-caramel selection:text-white">
      <Navbar onSelectProduct={handleSelectProduct} />

      <div className="flex-1">
        {activePage === 'landing' && <LandingPage onSelectProduct={handleSelectProduct} />}
        {activePage === 'shop' && <ShopPage onSelectProduct={handleSelectProduct} />}
        {activePage === 'product' && <ProductDetailPage productId={selectedProductId} onSelectProduct={handleSelectProduct} />}
        {activePage === 'checkout' && <CheckoutPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'blog' && <BlogPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage.startsWith('dashboard') && <UserDashboardPage onSelectProduct={handleSelectProduct} />}
        {activePage === 'admin' && <AdminDashboardPage />}
      </div>

      <Footer />
      <CartDrawer />
      <QuickViewModal onSelectProduct={handleSelectProduct} />
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
