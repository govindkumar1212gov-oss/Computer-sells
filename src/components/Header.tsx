import React, { useState } from 'react';
import {
  Phone,
  MessageSquare,
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  MapPin,
  Wrench,
  RefreshCw,
  DollarSign,
  Truck,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from './GSLogo';
import { ProductCategory } from '../types';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onOpenProductDetail?: (productId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
  onOpenProductDetail
}) => {
  const {
    settings,
    cart,
    wishlist,
    getCartTotal,
    getWhatsAppUrl,
    getPrimaryCallUrl,
    getSecondaryCallUrl,
    products,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  const { itemCount, total } = getCartTotal();

  // Search filtered items preview
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.specifications.processor &&
              p.specifications.processor.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5)
    : [];

  const handleNavClick = (page: string, categoryFilter?: ProductCategory | 'ALL') => {
    if (categoryFilter !== undefined) {
      setSelectedCategory(categoryFilter);
    }
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
      {/* 1. TOP ANNOUNCEMENT & CONTACT BAR */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Location & Tagline */}
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="flex items-center gap-1 text-blue-400 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>{settings.address}</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline text-amber-300 font-semibold">
              ⚡ {settings.bannerNotice || 'Your Trusted Computer Store'}
            </span>
          </div>

          {/* Quick Direct Calls & WhatsApp */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-3">
              <a
                href={getPrimaryCallUrl()}
                className="flex items-center gap-1.5 hover:text-white transition font-medium text-emerald-400"
                title="Call Primary Number"
              >
                <Phone className="w-3 h-3 text-emerald-400" />
                <span>{settings.primaryPhone}</span>
              </a>
              <span className="text-slate-600">/</span>
              <a
                href={getSecondaryCallUrl()}
                className="hover:text-white transition font-medium text-slate-300"
                title="Call Alternate Number"
              >
                <span>{settings.secondaryPhone}</span>
              </a>
            </div>

            <a
              href={getWhatsAppUrl({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full font-semibold transition"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-slate-700 hover:text-blue-600 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer shrink-0"
          >
            <GSLogo
              size="md"
              showTagline={true}
              customLogoUrl={settings.logoUrl}
            />
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search laptops, desktops, SSD, RAM, printer, accessories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchDropdownOpen(true);
                }}
                onFocus={() => setSearchDropdownOpen(true)}
                className="w-full pl-10 pr-10 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-slate-300 focus:border-blue-600 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Instant Search Dropdown */}
            {searchDropdownOpen && searchQuery.trim() && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setSearchDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-20">
                  <div className="p-2 text-xs font-semibold text-slate-400 bg-slate-50 border-b border-slate-100 uppercase tracking-wider flex justify-between">
                    <span>Products matching "{searchQuery}"</span>
                    <span>{searchResults.length} results</span>
                  </div>
                  {searchResults.length > 0 ? (
                    <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                      {searchResults.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            if (onOpenProductDetail) {
                              onOpenProductDetail(item.id);
                            } else {
                              setCurrentPage('products');
                            }
                            setSearchDropdownOpen(false);
                          }}
                          className="p-3 flex items-center gap-3 hover:bg-blue-50/60 cursor-pointer transition"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-11 h-11 object-cover rounded-lg border border-slate-200 bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {item.brand} • <span className="text-blue-600 font-medium">{item.condition}</span>
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-slate-900">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            {item.discount > 0 && (
                              <span className="block text-[11px] text-emerald-600 font-medium">
                                {item.discount}% off
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setCurrentPage('products');
                          setSearchDropdownOpen(false);
                        }}
                        className="w-full text-center py-2.5 text-xs font-bold text-blue-600 hover:bg-slate-50 transition"
                      >
                        View all search results →
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-slate-500">
                      No products found. Try searching for "Dell", "HP", "SSD", or "Used".
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Call Now Header Button (Desktop) */}
            <a
              href={getPrimaryCallUrl()}
              className="hidden xl:flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition border border-blue-200/60 text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call Us</span>
            </a>

            {/* Wishlist Icon */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className={`p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-slate-100 relative transition ${
                currentPage === 'wishlist' ? 'text-rose-600 bg-rose-50' : ''
              }`}
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* My Account */}
            <button
              onClick={() => handleNavClick('account')}
              className={`p-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 relative transition ${
                currentPage === 'account' ? 'text-blue-600 bg-blue-50' : ''
              }`}
              title="My Account & Orders"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => handleNavClick('cart')}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:shadow transition font-medium text-xs sm:text-sm"
              title="View Cart"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-amber-400 text-slate-950 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search laptops, desktops, accessories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (currentPage !== 'products') {
                  setCurrentPage('products');
                }
              }}
              className="w-full pl-9 pr-8 py-2 bg-slate-100 border border-slate-300 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. NAVIGATION BAR (DESKTOP) */}
      <nav className="hidden lg:block bg-slate-900 border-t border-slate-800 text-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center gap-1 text-xs font-semibold tracking-wide">
            <li>
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-3 rounded-none border-b-2 transition ${
                  currentPage === 'home'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                HOME
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('products', 'NEW LAPTOPS')}
                className={`px-3 py-3 border-b-2 transition ${
                  currentPage === 'products'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                NEW LAPTOPS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('products', 'USED / SECOND-HAND LAPTOPS')}
                className="px-3 py-3 border-b-2 border-transparent text-amber-300 hover:text-amber-200 hover:bg-slate-800/50 flex items-center gap-1.5 transition"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                USED / 2ND HAND LAPTOPS
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('products', 'DESKTOP / PC')}
                className="px-3 py-3 border-b-2 border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50 transition"
              >
                DESKTOP / PC
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('products', 'ALL')}
                className="px-3 py-3 border-b-2 border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50 transition"
              >
                ACCESSORIES
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('repair')}
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  currentPage === 'repair'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                REPAIR SERVICES
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('exchange')}
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  currentPage === 'exchange'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                LAPTOP EXCHANGE
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('sell')}
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  currentPage === 'sell'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5 text-yellow-400" />
                SELL OLD LAPTOP
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('delivery')}
                className={`px-3 py-3 border-b-2 transition flex items-center gap-1.5 ${
                  currentPage === 'delivery'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                ONLINE DELIVERY
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('about')}
                className={`px-3 py-3 border-b-2 transition ${
                  currentPage === 'about'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                ABOUT US
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-3 border-b-2 transition ${
                  currentPage === 'contact'
                    ? 'border-blue-400 text-white bg-slate-800/80 font-bold'
                    : 'border-transparent text-slate-300 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                CONTACT
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-2 py-2">
            <button
              onClick={() => handleNavClick('tracking')}
              className="text-[11px] font-semibold text-blue-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1"
            >
              <Truck className="w-3 h-3 text-blue-400" />
              <span>Track Order</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-[11px] font-semibold text-slate-400 hover:text-amber-300 px-2 py-1 rounded hover:bg-slate-800 transition"
              title="Admin Portal"
            >
              Admin Panel
            </button>
          </div>
        </div>
      </nav>

      {/* 4. MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-xs bg-slate-900 text-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <GSLogo size="sm" variant="dark" customLogoUrl={settings.logoUrl} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-900/30 border-b border-blue-900/50 text-xs">
              <p className="font-semibold text-blue-300">Govind Patrkar – Founder</p>
              <p className="text-slate-300 mt-0.5">Paschim Sharira, Kaushambi</p>
            </div>

            <div className="p-4 flex flex-col gap-1 text-sm font-medium flex-1">
              <button
                onClick={() => handleNavClick('home')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('products', 'NEW LAPTOPS')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                New Laptops
              </button>
              <button
                onClick={() => handleNavClick('products', 'USED / SECOND-HAND LAPTOPS')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-300 font-semibold"
              >
                ★ Used / Second-Hand Laptops
              </button>
              <button
                onClick={() => handleNavClick('products', 'DESKTOP / PC')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                Desktop & PC
              </button>
              <button
                onClick={() => handleNavClick('products', 'ALL')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800"
              >
                All Accessories
              </button>
              <div className="my-2 border-t border-slate-800"></div>
              <button
                onClick={() => handleNavClick('repair')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-blue-300 flex items-center gap-2"
              >
                <Wrench className="w-4 h-4" /> Repair Services
              </button>
              <button
                onClick={() => handleNavClick('exchange')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-emerald-300 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Laptop Exchange
              </button>
              <button
                onClick={() => handleNavClick('sell')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-yellow-300 flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4" /> Sell Old Laptop
              </button>
              <button
                onClick={() => handleNavClick('delivery')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-cyan-300 flex items-center gap-2"
              >
                <Truck className="w-4 h-4" /> Online Delivery
              </button>
              <button
                onClick={() => handleNavClick('tracking')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300"
              >
                Track Your Order
              </button>
              <div className="my-2 border-t border-slate-800"></div>
              <button
                onClick={() => handleNavClick('about')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300"
              >
                About Us
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-300"
              >
                Contact & Address
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className="text-left px-3 py-2 rounded-lg hover:bg-slate-800 text-amber-400 font-semibold"
              >
                Admin Dashboard
              </button>
            </div>

            <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950">
              <a
                href={getPrimaryCallUrl()}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 py-2.5 rounded-xl font-bold text-xs"
              >
                <Phone className="w-4 h-4" /> Call {settings.primaryPhone}
              </a>
              <a
                href={getWhatsAppUrl({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 py-2.5 rounded-xl font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
