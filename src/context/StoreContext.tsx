import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Coupon, Review } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS } from '../data/mockData';
import confetti from 'canvas-confetti';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'warning';
}

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  user: User;
  orders: Order[];
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  quickViewProduct: Product | null;
  toasts: ToastMessage[];
  activePage: string;
  
  // Actions
  setActivePage: (page: string) => void;
  setIsCartOpen: (open: boolean) => void;
  setQuickViewProduct: (product: Product | null) => void;
  addToCart: (product: Product, quantity?: number, weight?: number, grind?: CartItem['selectedGrind']) => void;
  removeFromCart: (productId: string, weight: number, grind: string) => void;
  updateCartQuantity: (productId: string, weight: number, grind: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  placeOrder: (shippingDetails: {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
  }) => Order;
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  toggleAdminRole: () => void;
  
  // Admin Operations
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  addCoupon: (coupon: Coupon) => void;
  toggleCouponActive: (code: string) => void;
  addProductReview: (productId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('ember_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('ember_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('ember_wishlist');
    return saved ? JSON.parse(saved) : ['ethiopian-yirgacheffe', 'mountain-reserve-panama'];
  });

  const [user, setUser] = useState<User>(() => {
    return {
      id: 'usr-1',
      name: 'Youssef Manssouri',
      email: 'youssef@embercoffee.com',
      role: 'admin',
      perksPoints: 450,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('ember_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('ember_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activePage, setActivePage] = useState<string>('landing');

  // LocalStorage Persistence
  useEffect(() => {
    localStorage.setItem('ember_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('ember_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ember_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('ember_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('ember_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const addToCart = (
    product: Product,
    quantity: number = 1,
    weight: number = product.weightOptions[0] || 250,
    grind: CartItem['selectedGrind'] = 'Whole Bean'
  ) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.selectedWeight === weight && item.selectedGrind === grind
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedWeight: weight, selectedGrind: grind }];
      }
    });

    addToast('Added to Coffee Bag', `${quantity}x ${product.name} (${weight}g, ${grind})`, 'success');
  };

  const removeFromCart = (productId: string, weight: number, grind: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedWeight === weight && item.selectedGrind === grind)));
  };

  const updateCartQuantity = (productId: string, weight: number, grind: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight, grind);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId && item.selectedWeight === weight && item.selectedGrind === grind) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      const prodName = products.find(p => p.id === productId)?.name || 'Coffee';
      if (exists) {
        addToast('Removed from Wishlist', `${prodName} removed from saved favorites`, 'info');
      } else {
        addToast('Saved to Wishlist', `${prodName} added to saved favorites`, 'success');
      }
      return updated;
    });
  };

  const applyCoupon = (code: string): boolean => {
    const codeClean = code.trim().toUpperCase();
    const found = coupons.find(c => c.code === codeClean && c.active);

    if (!found) {
      addToast('Invalid Coupon', `Promo code "${codeClean}" is invalid or expired.`, 'warning');
      return false;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (subtotal < found.minSpend) {
      addToast('Minimum Spend Required', `Coupon "${codeClean}" requires minimum spend of $${found.minSpend}.`, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast('Coupon Applied!', `${found.discountPercent}% discount applied to your order.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon Removed', 'Discount removed from total.', 'info');
  };

  const placeOrder = (details: {
    customerName: string;
    customerEmail: string;
    shippingAddress: string;
    city: string;
    postalCode: string;
  }): Order => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent) / 100 : 0;
    const shippingCost = subtotal >= 50 ? 0 : 6;
    const total = subtotal - discount + shippingCost;

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      shippingAddress: details.shippingAddress,
      city: details.city,
      postalCode: details.postalCode,
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        weight: item.selectedWeight,
        grind: item.selectedGrind
      })),
      subtotal,
      discount,
      shippingCost,
      total,
      status: 'Processing',
      estimatedDelivery: 'Estimated in 2-3 business days'
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Add rewards points (10 points per dollar spent)
    setUser(prev => ({
      ...prev,
      perksPoints: prev.perksPoints + Math.floor(total * 10)
    }));

    clearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C67C4E', '#D6A85F', '#2C1810', '#F7F3EE']
    });

    addToast('Order Placed Successfully!', `Order #${orderId} has been sent to our roastery!`, 'success');
    return newOrder;
  };

  const toggleAdminRole = () => {
    setUser(prev => {
      const newRole = prev.role === 'admin' ? 'customer' : 'admin';
      addToast('Role Switched', `Switched to ${newRole.toUpperCase()} view mode`, 'info');
      return { ...prev, role: newRole };
    });
  };

  // Admin Actions
  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
    addToast('Order Status Updated', `Order #${orderId} marked as ${status}`, 'success');
  };

  const saveProduct = (product: Product) => {
    setProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.map(p => (p.id === product.id ? product : p));
      }
      return [product, ...prev];
    });
    addToast('Product Saved', `${product.name} updated in roastery catalog`, 'success');
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('Product Deleted', 'Product removed from catalog', 'info');
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
    addToast('Coupon Created', `Code ${coupon.code} is now active`, 'success');
  };

  const toggleCouponActive = (code: string) => {
    setCoupons(prev =>
      prev.map(c => (c.code === code ? { ...c, active: !c.active } : c))
    );
  };

  const addProductReview = (productId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Math.random().toString(36).substr(2, 6)}`,
      date: new Date().toISOString().split('T')[0]
    };

    setProducts(prev =>
      prev.map(p => {
        if (p.id === productId) {
          const updatedList = [newRev, ...p.reviewsList];
          const newAvgRating = Number(
            (updatedList.reduce((acc, r) => acc + r.rating, 0) / updatedList.length).toFixed(1)
          );
          return {
            ...p,
            rating: newAvgRating,
            reviewsCount: updatedList.length,
            reviewsList: updatedList
          };
        }
        return p;
      })
    );

    addToast('Review Submitted', 'Thank you for your feedback on Ember Coffee!', 'success');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        orders,
        coupons,
        appliedCoupon,
        isCartOpen,
        quickViewProduct,
        toasts,
        activePage,
        setActivePage,
        setIsCartOpen,
        setQuickViewProduct,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        applyCoupon,
        removeCoupon,
        placeOrder,
        addToast,
        removeToast,
        toggleAdminRole,
        updateOrderStatus,
        saveProduct,
        deleteProduct,
        addCoupon,
        toggleCouponActive,
        addProductReview
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
