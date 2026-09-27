import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { RepairServicesPage } from './pages/RepairServicesPage';
import { LaptopExchangePage } from './pages/LaptopExchangePage';
import { SellLaptopPage } from './pages/SellLaptopPage';
import { OnlineDeliveryPage } from './pages/OnlineDeliveryPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { ContactPage } from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { Product, ProductCategory } from './types';
import { Home, Layers, Phone, ShoppingCart, User, MessageSquare } from 'lucide-react';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string>('');

  const {
    setSelectedCategory,
    getCartTotal,
    getPrimaryCallUrl,
    getWhatsAppUrl
  } = useStore();

  const { itemCount } = getCartTotal();

  const handleOpenProductDetail = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (product: Product) => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = (orderId: string) => {
    setTrackingOrderId(orderId);
    setCurrentPage('tracking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 pb-16 lg:pb-0">
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenProductDetail={handleOpenProductDetail}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            setCurrentPage={setCurrentPage}
            onOpenProductDetail={handleOpenProductDetail}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            onViewProductDetail={handleOpenProductDetail}
            onBuyNowProduct={handleBuyNow}
          />
        )}

        {currentPage === 'product-detail' && selectedProductId && (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => setCurrentPage('products')}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onContinueShopping={() => setCurrentPage('products')}
            onProceedToCheckout={() => setCurrentPage('checkout')}
            onViewProductDetail={handleOpenProductDetail}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onBackToCart={() => setCurrentPage('cart')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {currentPage === 'tracking' && (
          <OrderTrackingPage
            initialOrderId={trackingOrderId}
            onExploreProducts={() => setCurrentPage('products')}
          />
        )}

        {currentPage === 'repair' && <RepairServicesPage />}

        {currentPage === 'exchange' && <LaptopExchangePage />}

        {currentPage === 'sell' && <SellLaptopPage />}

        {currentPage === 'delivery' && (
          <OnlineDeliveryPage
            onShopNow={() => setCurrentPage('products')}
            onTrackOrder={() => setCurrentPage('tracking')}
          />
        )}

        {currentPage === 'about' && <AboutUsPage />}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onContinueShopping={() => setCurrentPage('products')}
            onViewProductDetail={handleOpenProductDetail}
            onBuyNow={handleBuyNow}
          />
        )}

        {currentPage === 'account' && (
          <MyAccountPage
            onTrackOrder={(orderId) => {
              setTrackingOrderId(orderId);
              setCurrentPage('tracking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreProducts={() => setCurrentPage('products')}
            onViewWishlist={() => setCurrentPage('wishlist')}
          />
        )}

        {currentPage === 'admin' && <AdminDashboard />}
      </main>

      {/* Floating WhatsApp Widget */}
      <WhatsAppFloatingButton />

      {/* Mobile Bottom Action Bar (Fixed on mobile screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-1.5 px-3 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            currentPage === 'home' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setSelectedCategory('ALL');
            setCurrentPage('products');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${
            currentPage === 'products' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Catalog</span>
        </button>

        <a
          href={getPrimaryCallUrl()}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-emerald-600"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>

        <a
          href={getWhatsAppUrl({ type: 'general' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-emerald-600"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => {
            setCurrentPage('cart');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold relative ${
            currentPage === 'cart' ? 'text-blue-600' : 'text-slate-500'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-4 h-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 w-3.5 h-3.5 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </div>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
