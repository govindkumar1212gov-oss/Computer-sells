import React, { useState } from 'react';
import {
  Laptop,
  Monitor,
  HardDrive,
  Cpu,
  Wrench,
  RefreshCw,
  DollarSign,
  Truck,
  Phone,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { OwnerSection } from '../components/OwnerSection';
import { ProductCategory, Product } from '../types';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
  onOpenProductDetail: (productId: string) => void;
  setSelectedCategory: (c: ProductCategory | 'ALL') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  setCurrentPage,
  onOpenProductDetail,
  setSelectedCategory
}) => {
  const {
    products,
    settings,
    getWhatsAppUrl,
    getPrimaryCallUrl
  } = useStore();

  const [activeTab, setActiveTab] = useState<'ALL' | 'USED' | 'NEW' | 'ACC'>('ALL');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'USED') return p.condition === 'Used / Refurbished';
    if (activeTab === 'NEW') return p.condition === 'New' && p.category.includes('LAPTOP');
    if (activeTab === 'ACC') return !p.category.includes('LAPTOP') && !p.category.includes('DESKTOP');
    return true;
  });

  const featuredLaptops = products
    .filter((p) => p.category === 'USED / SECOND-HAND LAPTOPS')
    .slice(0, 4);

  const categoriesList: { name: string; category: ProductCategory; icon: any; count: number }[] = [
    {
      name: 'New Laptops',
      category: 'NEW LAPTOPS',
      icon: Laptop,
      count: products.filter((p) => p.category === 'NEW LAPTOPS').length
    },
    {
      name: 'Used / 2nd Hand',
      category: 'USED / SECOND-HAND LAPTOPS',
      icon: RefreshCw,
      count: products.filter((p) => p.category === 'USED / SECOND-HAND LAPTOPS').length
    },
    {
      name: 'Desktop & PC',
      category: 'DESKTOP / PC',
      icon: Monitor,
      count: products.filter((p) => p.category === 'DESKTOP / PC').length
    },
    {
      name: 'Monitors',
      category: 'MONITORS',
      icon: Monitor,
      count: products.filter((p) => p.category === 'MONITORS').length
    },
    {
      name: 'High Speed SSD',
      category: 'SSD',
      icon: HardDrive,
      count: products.filter((p) => p.category === 'SSD').length
    },
    {
      name: 'Computer RAM',
      category: 'RAM',
      icon: Cpu,
      count: products.filter((p) => p.category === 'RAM').length
    },
    {
      name: 'Keyboards & Mice',
      category: 'KEYBOARDS',
      icon: Layers,
      count: products.filter((p) => p.category === 'KEYBOARDS' || p.category === 'MOUSE').length
    },
    {
      name: 'Printers',
      category: 'PRINTERS',
      icon: Wrench,
      count: products.filter((p) => p.category === 'PRINTERS').length
    }
  ];

  const handleCategoryClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = (product: Product) => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden py-14 sm:py-20 border-b border-slate-800">
        {/* Glow Effects */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-5 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Paschim Sharira, Kaushambi's Tech Hub</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-black font-['Space_Grotesk'] tracking-tight text-white leading-none">
                  GS <span className="text-blue-500">COMPUTER</span>
                </h1>
                <p className="text-xl sm:text-2xl font-bold text-blue-400 mt-2 tracking-wide font-['Space_Grotesk'] uppercase">
                  "Your Tech Partner"
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                New &amp; Used Laptops | Desktop &amp; PC | Accessories | Repair Services | Online Delivery
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setCurrentPage('products');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
                >
                  Shop Now
                </button>

                <button
                  onClick={() => {
                    setSelectedCategory('USED / SECOND-HAND LAPTOPS');
                    setCurrentPage('products');
                  }}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5"
                >
                  Buy Used Laptop
                </button>

                <a
                  href={getWhatsAppUrl({ type: 'general' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </a>

                <a
                  href={getPrimaryCallUrl()}
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>Call Now</span>
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified 30-Point Check</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Store Warranty Included</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Truck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Doorstep Delivery in UP</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/90 rounded-3xl p-6 border border-slate-700/60 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Popular In Store Today
                    </span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                    Refurbished Special
                  </span>
                </div>

                <div className="mt-4 relative rounded-2xl overflow-hidden bg-slate-950 aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
                    alt="Dell Latitude Refurbished Laptop"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase bg-blue-600 text-white px-2 py-0.5 rounded">
                        Dell Latitude 5510
                      </span>
                      <p className="text-xs font-bold text-white mt-1">Core i5 • 16GB • 512GB SSD</p>
                    </div>
                    <span className="text-lg font-black text-amber-400 font-['Space_Grotesk']">
                      ₹28,699
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Condition:</span>
                    <span className="font-bold text-emerald-400">Like New Grade A+</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">Warranty:</span>
                    <span className="font-bold text-slate-200">6 Months Store Warranty</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Availability:</span>
                    <span className="font-bold text-blue-400">Paschim Sharira / Delivery</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setSelectedCategory('USED / SECOND-HAND LAPTOPS');
                      setCurrentPage('products');
                    }}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-center transition"
                  >
                    View Laptops
                  </button>
                  <a
                    href={getWhatsAppUrl({
                      type: 'product',
                      product: products.find((p) => p.id === 'prod-used-1')
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-center flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Order on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY QUICK TILES */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Explore Catalog
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Space_Grotesk']">
              Product Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('ALL');
              setCurrentPage('products');
            }}
            className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categoriesList.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => handleCategoryClick(cat.category)}
                className="group p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md cursor-pointer transition text-center flex flex-col items-center justify-between"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-1">
                  {cat.name}
                </h4>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {cat.count} items
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SECOND-HAND / USED LAPTOPS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50 to-blue-50/40 rounded-3xl p-6 sm:p-8 border border-amber-200/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Verified Quality • Budget-Friendly</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
                Used &amp; Second-Hand Laptops
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Dell, HP, Lenovo ThinkPads with original chargers, healthy battery &amp; store warranty.
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedCategory('USED / SECOND-HAND LAPTOPS');
                setCurrentPage('products');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 self-start md:self-auto transition shadow-sm"
            >
              <span>Explore All Used Laptops</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredLaptops.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onOpenProductDetail}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS & TABS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Top Deals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Space_Grotesk']">
              Featured Tech Catalog
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('USED')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'USED'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Used Laptops
            </button>
            <button
              onClick={() => setActiveTab('NEW')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'NEW'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              New Laptops
            </button>
            <button
              onClick={() => setActiveTab('ACC')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'ACC'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Accessories &amp; Parts
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={onOpenProductDetail}
              onBuyNow={handleBuyNow}
            />
          ))}
        </div>
      </section>

      {/* 5. SERVICES BANNER (REPAIR, EXCHANGE, SELL) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Repair Card */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk']">
                Computer &amp; Laptop Repair
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Windows installation, chip-level hardware repair, virus cleaning, screen replacement &amp; RAM/SSD upgrades.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('repair');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs transition"
            >
              Book Repair Service →
            </button>
          </div>

          {/* Exchange Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-950 to-slate-900 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk']">
                Laptop Exchange Offer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Trade in your old slow laptop for an upgraded high-speed machine. Get instant fair exchange valuation.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('exchange');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs transition"
            >
              Exchange Old Laptop →
            </button>
          </div>

          {/* Sell Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950 to-slate-900 text-white flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/30 text-amber-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-['Space_Grotesk']">
                Sell Your Old Laptop
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Got a laptop you no longer use? Submit details and get a quick quote from GS COMPUTER in Paschim Sharira.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('sell');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition"
            >
              Sell My Laptop →
            </button>
          </div>
        </div>
      </section>

      {/* 6. ONLINE DELIVERY HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-6 sm:p-10 border border-blue-800/60 shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-full">
                Online Delivery System
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-['Space_Grotesk']">
                Order Online – Get Delivered to Your Door
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                We deliver laptops, PCs, accessories, and replacement parts directly to your home in
                Paschim Sharira, Manjhanpur, Bharwari, Sirathu, Karari, and Kaushambi. Or choose convenient in-store pickup!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-cyan-400">Delivery Time</p>
                  <p className="text-slate-300 mt-0.5">{settings.estimatedDeliveryTime}</p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <p className="font-bold text-cyan-400">Delivery Charge</p>
                  <p className="text-slate-300 mt-0.5">
                    ₹{settings.deliveryCharge} (Free above ₹{settings.freeDeliveryThreshold})
                  </p>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <p className="font-bold text-cyan-400">Order Updates</p>
                  <p className="text-slate-300 mt-0.5">Instant WhatsApp Tracking</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setCurrentPage('delivery');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs text-center transition"
              >
                View Delivery Coverage &amp; Policy
              </button>
              <button
                onClick={() => {
                  setCurrentPage('tracking');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center border border-slate-700 transition"
              >
                Track An Existing Order
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE GS COMPUTER */}
      <WhyChooseUs />

      {/* 8. MEET THE FOUNDER / OWNER (Govind Patrkar) */}
      <OwnerSection />

      {/* 9. CONTACT / MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                Visit Our Physical Store
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Space_Grotesk']">
                GS COMPUTER in Paschim Sharira
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm">
                Walk in to inspect laptops physically, get your laptop diagnosed on the spot, or pick up online orders.
              </p>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-semibold">{settings.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Call: <strong>{settings.primaryPhone}</strong> / <strong>{settings.secondaryPhone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Open: Monday to Saturday (9:00 AM – 8:00 PM)</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition"
                >
                  Contact Page &amp; Form
                </button>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    'GS Computer, Paschim Sharira, Kaushambi, Uttar Pradesh 212214'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-100 rounded-2xl p-6 border border-slate-200 flex flex-col justify-center items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-3 shadow-md">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Store Landmark</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Paschim Sharira Main Market, Kaushambi District, UP – 212214.
              </p>
              <p className="text-[11px] text-blue-600 font-semibold mt-2">
                Need directions? Call Govind Patrkar at {settings.primaryPhone}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
