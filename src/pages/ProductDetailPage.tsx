import React, { useState } from 'react';
import {
  Heart,
  ShoppingCart,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  CheckCircle,
  ArrowLeft,
  Share2,
  Cpu,
  HardDrive,
  Monitor,
  Battery,
  Layers,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
  onBuyNow: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onBack,
  onBuyNow
}) => {
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    getWhatsAppUrl,
    getPrimaryCallUrl,
    settings
  } = useStore();

  const product = products.find((p) => p.id === productId);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [pincodeCheck, setPincodeCheck] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeCheck.trim()) return;

    if (pincodeCheck.trim() === '212214') {
      setPincodeResult('✓ Paschim Sharira: Express Same-Day / 24-hr Delivery available or Instant Store Pickup!');
    } else if (pincodeCheck.trim().startsWith('212') || pincodeCheck.trim().startsWith('211')) {
      setPincodeResult('✓ Kaushambi & Prayagraj Region: Delivery within 24 to 48 hours.');
    } else {
      setPincodeResult('✓ Delivery available across UP & India via Express Courier (2-4 Days).');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button & Breadcrumb */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-xl transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Product'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
            <img
              src={product.images[selectedImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />

            {/* Condition Badge */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span
                className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg shadow-md ${
                  product.condition === 'Used / Refurbished'
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-blue-600 text-white'
                }`}
              >
                {product.condition}
              </span>
              {product.discount > 0 && (
                <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-lg shadow-md">
                  {product.discount}% DISCOUNT
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg backdrop-blur-xs transition ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600'
                  : 'bg-white/90 text-slate-600 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-rose-600' : ''}`} />
            </button>
          </div>

          {/* Thumbnail list */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImageIdx === idx
                      ? 'border-blue-600 ring-2 ring-blue-500/20'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Guarantee Highlights */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Store Verified</p>
                <p className="text-slate-500 text-[11px]">Hardware & Diagnostics Checked</p>
              </div>
            </div>
            <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-2xl flex items-center gap-3">
              <Truck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-slate-900">Doorstep Delivery</p>
                <p className="text-slate-500 text-[11px]">Or Pickup in Paschim Sharira</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
              <span>{product.brand}</span>
              <span>•</span>
              <span>{product.category}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk'] leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-slate-400 mt-1">SKU: {product.sku}</p>
          </div>

          {/* Pricing */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-slate-950 font-['Space_Grotesk']">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-base text-slate-400 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {product.mrp > product.price && (
                <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                  You save ₹{(product.mrp - product.price).toLocaleString('en-IN')} ({product.discount}% off)
                </p>
              )}
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>In Stock ({product.stockCount} units)</span>
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
              Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Key Specifications Grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {product.specifications.processor && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Processor</span>
                    <span className="font-semibold text-slate-800">{product.specifications.processor}</span>
                  </div>
                </div>
              )}
              {product.specifications.ram && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Installed RAM</span>
                    <span className="font-semibold text-slate-800">{product.specifications.ram}</span>
                  </div>
                </div>
              )}
              {product.specifications.storage && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <HardDrive className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Storage / SSD</span>
                    <span className="font-semibold text-slate-800">{product.specifications.storage}</span>
                  </div>
                </div>
              )}
              {product.specifications.display && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <Monitor className="w-4 h-4 text-cyan-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Display</span>
                    <span className="font-semibold text-slate-800">{product.specifications.display}</span>
                  </div>
                </div>
              )}
              {product.specifications.warranty && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5 sm:col-span-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Warranty & Service</span>
                    <span className="font-semibold text-slate-800">{product.specifications.warranty}</span>
                  </div>
                </div>
              )}
              {product.specifications.batteryHealth && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <Battery className="w-4 h-4 text-green-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Battery Backup</span>
                    <span className="font-semibold text-slate-800">{product.specifications.batteryHealth}</span>
                  </div>
                </div>
              )}
              {product.specifications.os && (
                <div className="p-2.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Operating System</span>
                    <span className="font-semibold text-slate-800">{product.specifications.os}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Delivery & Pincode Checker */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Check Delivery in Your Area</span>
            </h4>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code (e.g. 212214)"
                value={pincodeCheck}
                onChange={(e) => setPincodeCheck(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                Check
              </button>
            </form>
            {pincodeResult && (
              <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                {pincodeResult}
              </p>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => addToCart(product, 1)}
                className="py-3 px-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  onBuyNow(product);
                }}
                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* Direct Contact Buttons (WhatsApp Enquiry & Call Now) */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={getWhatsAppUrl({ type: 'product', product })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Enquiry</span>
              </a>

              <a
                href={getPrimaryCallUrl()}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Call Store ({settings.primaryPhone})</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
