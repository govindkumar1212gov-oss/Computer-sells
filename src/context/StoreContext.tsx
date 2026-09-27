import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  RepairRequest,
  ExchangeRequest,
  SellLaptopRequest,
  ContactMessage,
  AdminSettings,
  PaymentMethod,
  OrderCustomer,
  ProductCategory
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_SETTINGS } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  cart: CartItem[];
  wishlist: string[]; // product IDs
  repairRequests: RepairRequest[];
  exchangeRequests: ExchangeRequest[];
  sellRequests: SellLaptopRequest[];
  contactMessages: ContactMessage[];
  settings: AdminSettings;
  isAdminLoggedIn: boolean;
  searchQuery: string;
  selectedCategory: ProductCategory | 'ALL';

  // State setters & Actions
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (c: ProductCategory | 'ALL') => void;

  // Cart
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; deliveryCharge: number; total: number; itemCount: number };

  // Wishlist
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  createOrder: (data: {
    customer: OrderCustomer;
    deliveryOption: 'Home Delivery' | 'Store Pickup';
    paymentMethod: PaymentMethod;
  }) => Order;
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  updateOrderTracking: (orderId: string, trackingNumber: string, estimatedDelivery: string) => void;

  // Requests
  addRepairRequest: (request: Omit<RepairRequest, 'id' | 'createdAt' | 'status'>) => RepairRequest;
  addExchangeRequest: (request: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>) => ExchangeRequest;
  addSellRequest: (request: Omit<SellLaptopRequest, 'id' | 'createdAt' | 'status'>) => SellLaptopRequest;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => void;
  updateRepairStatus: (id: string, status: RepairRequest['status']) => void;
  updateExchangeStatus: (id: string, status: ExchangeRequest['status']) => void;
  updateSellStatus: (id: string, status: SellLaptopRequest['status']) => void;

  // Products Admin
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;

  // Admin & Settings
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;

  // WhatsApp & Phone Helpers
  getWhatsAppUrl: (options?: {
    type?: 'general' | 'product' | 'order' | 'repair' | 'exchange' | 'sell';
    product?: Product;
    orderId?: string;
    details?: string;
  }) => string;
  getPrimaryCallUrl: () => string;
  getSecondaryCallUrl: () => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings
  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_settings');
      return saved ? { ...INITIAL_SETTINGS, ...JSON.parse(saved) } : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Requests
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_repairs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [exchangeRequests, setExchangeRequests] = useState<ExchangeRequest[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_exchanges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [sellRequests, setSellRequests] = useState<SellLaptopRequest[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_sells');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('gs_computer_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Admin auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('gs_admin_auth') === 'true';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'ALL'>('ALL');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gs_computer_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('gs_computer_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('gs_computer_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('gs_computer_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('gs_computer_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('gs_computer_repairs', JSON.stringify(repairRequests));
  }, [repairRequests]);

  useEffect(() => {
    localStorage.setItem('gs_computer_exchanges', JSON.stringify(exchangeRequests));
  }, [exchangeRequests]);

  useEffect(() => {
    localStorage.setItem('gs_computer_sells', JSON.stringify(sellRequests));
  }, [sellRequests]);

  useEffect(() => {
    localStorage.setItem('gs_computer_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const deliveryCharge =
      subtotal === 0 || subtotal >= settings.freeDeliveryThreshold || !settings.deliveryAvailable
        ? 0
        : settings.deliveryCharge;
    const total = subtotal + deliveryCharge;
    return { subtotal, deliveryCharge, total, itemCount };
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = ({
    customer,
    deliveryOption,
    paymentMethod,
  }: {
    customer: OrderCustomer;
    deliveryOption: 'Home Delivery' | 'Store Pickup';
    paymentMethod: PaymentMethod;
  }): Order => {
    const { subtotal } = getCartTotal();
    const deliveryCharge = deliveryOption === 'Home Delivery' ? (subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryCharge) : 0;
    const totalAmount = subtotal + deliveryCharge;
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `GS-2026-${randNum}`;
    const nowStr = new Date().toISOString();

    const paymentStatus =
      paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid (Demo Mode)';

    const newOrder: Order = {
      id: orderId,
      customer,
      deliveryOption,
      deliveryCharge,
      subtotal,
      discount: 0,
      totalAmount,
      paymentMethod,
      paymentStatus,
      status: 'Order Placed',
      trackingNumber: `GSTRK-${randNum}-UP`,
      estimatedDelivery:
        deliveryOption === 'Store Pickup'
          ? 'Ready for pickup in 2-4 hours'
          : settings.estimatedDeliveryTime,
      createdAt: nowStr,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        brand: item.product.brand,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || '',
        condition: item.product.condition
      })),
      history: [
        {
          status: 'Order Placed',
          timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          note: `Order placed successfully with ${paymentMethod}`
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const getOrderById = (orderId: string) => {
    return orders.find(
      (o) => o.id.toLowerCase() === orderId.trim().toLowerCase()
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const newHistory = [
            ...order.history,
            {
              status: newStatus,
              timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
              note: note || `Status updated to ${newStatus}`
            }
          ];
          return { ...order, status: newStatus, history: newHistory };
        }
        return order;
      })
    );
  };

  const updateOrderTracking = (
    orderId: string,
    trackingNumber: string,
    estimatedDelivery: string
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, trackingNumber, estimatedDelivery } : order
      )
    );
  };

  // Requests
  const addRepairRequest = (
    data: Omit<RepairRequest, 'id' | 'createdAt' | 'status'>
  ): RepairRequest => {
    const req: RepairRequest = {
      ...data,
      id: `REP-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending'
    };
    setRepairRequests((prev) => [req, ...prev]);
    return req;
  };

  const addExchangeRequest = (
    data: Omit<ExchangeRequest, 'id' | 'createdAt' | 'status'>
  ): ExchangeRequest => {
    const req: ExchangeRequest = {
      ...data,
      id: `EXC-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Review'
    };
    setExchangeRequests((prev) => [req, ...prev]);
    return req;
  };

  const addSellRequest = (
    data: Omit<SellLaptopRequest, 'id' | 'createdAt' | 'status'>
  ): SellLaptopRequest => {
    const req: SellLaptopRequest = {
      ...data,
      id: `SELL-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Pending Inspection'
    };
    setSellRequests((prev) => [req, ...prev]);
    return req;
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const updateRepairStatus = (id: string, status: RepairRequest['status']) => {
    setRepairRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const updateExchangeStatus = (id: string, status: ExchangeRequest['status']) => {
    setExchangeRequests((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status } : e))
    );
  };

  const updateSellStatus = (id: string, status: SellLaptopRequest['status']) => {
    setSellRequests((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  // Products
  const addProduct = (prodData: Omit<Product, 'id'>): Product => {
    const newProduct: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Admin login
  const loginAdmin = (password: string) => {
    if (password === 'admin' || password === 'gscomputer' || password === 'gs2026') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('gs_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('gs_admin_auth');
  };

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // WhatsApp helper
  const getWhatsAppUrl = (options?: {
    type?: 'general' | 'product' | 'order' | 'repair' | 'exchange' | 'sell';
    product?: Product;
    orderId?: string;
    details?: string;
  }) => {
    const cleanNum = settings.whatsappNumber.replace(/[^0-9]/g, '');
    let text = `Hello GS COMPUTER (Govind Patrkar ji), `;

    switch (options?.type) {
      case 'product':
        if (options.product) {
          text += `I am interested in buying/inquiring about *${options.product.name}* (Price: ₹${options.product.price.toLocaleString('en-IN')}). Is it currently available at your Paschim Sharira store or for delivery?`;
        }
        break;
      case 'order':
        text += `I would like an update regarding my Order ID: *${options.orderId || 'GS-2026'}*. Could you please check the latest delivery status?`;
        break;
      case 'repair':
        text += `I need computer repair service for my device. Details: ${options.details || 'Laptop/Desktop repair'}.`;
        break;
      case 'exchange':
        text += `I want to exchange my old laptop at GS COMPUTER. Details: ${options.details || 'Laptop exchange valuation'}.`;
        break;
      case 'sell':
        text += `I want to sell my used laptop. Details: ${options.details || 'Laptop sale enquiry'}.`;
        break;
      default:
        text += `I want to inquire about laptops, computer accessories and services at GS COMPUTER, Paschim Sharira.`;
    }

    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const getPrimaryCallUrl = () => `tel:${settings.primaryPhone}`;
  const getSecondaryCallUrl = () => `tel:${settings.secondaryPhone}`;

  return (
    <StoreContext.Provider
      value={{
        products,
        orders,
        cart,
        wishlist,
        repairRequests,
        exchangeRequests,
        sellRequests,
        contactMessages,
        settings,
        isAdminLoggedIn,
        searchQuery,
        selectedCategory,
        setSearchQuery,
        setSelectedCategory,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        toggleWishlist,
        isInWishlist,
        createOrder,
        getOrderById,
        updateOrderStatus,
        updateOrderTracking,
        addRepairRequest,
        addExchangeRequest,
        addSellRequest,
        addContactMessage,
        updateRepairStatus,
        updateExchangeStatus,
        updateSellStatus,
        addProduct,
        updateProduct,
        deleteProduct,
        loginAdmin,
        logoutAdmin,
        updateSettings,
        getWhatsAppUrl,
        getPrimaryCallUrl,
        getSecondaryCallUrl
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
