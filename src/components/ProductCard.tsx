import React from 'react';
import {
  Heart,
  ShoppingCart,
  MessageSquare,
  Phone,
  Cpu,
  HardDrive,
  CheckCircle,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onViewDetails: (productId: string) => void;
  onBuyNow?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onBuyNow
}) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    getWhatsAppUrl,
    getPrimaryCallUrl
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getWhatsAppUrl({ type: 'product', product });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = getPrimaryCallUrl();
  };

  return (
    <div
      onClick={() => onViewDetails(product.id)}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer relative"
    >
      {/* Top Media & Badges */}
      <div className="relative pt-[65%] sm:pt-[70%] bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Condition Badge (New vs Used) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span
            className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs ${
              product.condition === 'Used / Refurbished'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-blue-600 text-white'
            }`}
          >
            {product.condition === 'Used / Refurbished' ? 'Certified Used' : 'Brand New'}
          </span>
          {product.discount > 0 && (
            <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-md shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full shadow-md backdrop-blur-xs transition z-10 ${
            isFavorited
              ? 'bg-rose-50 text-rose-600 hover:bg-rose-100'
              : 'bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Stock Alert */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-10">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-semibold text-blue-600 uppercase tracking-wide">
              {product.brand}
            </span>
            <span className="text-[10px] text-slate-400">SKU: {product.sku}</span>
          </div>

          <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          {/* Key Specs Chips */}
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.specifications.processor && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                <Cpu className="w-2.5 h-2.5 text-blue-600" />
                <span className="truncate max-w-[120px]">{product.specifications.processor.split('(')[0]}</span>
              </span>
            )}
            {product.specifications.ram && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                {product.specifications.ram.split(' ')[0]} RAM
              </span>
            )}
            {product.specifications.storage && (
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                <HardDrive className="w-2.5 h-2.5 text-emerald-600" />
                <span className="truncate max-w-[100px]">{product.specifications.storage}</span>
              </span>
            )}
            {product.specifications.warranty && (
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                <span className="truncate max-w-[120px]">{product.specifications.warranty}</span>
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-black text-slate-900 font-['Space_Grotesk']">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp > product.price && (
                <span className="ml-2 text-xs text-slate-400 line-through">
                  ₹{product.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
              <CheckCircle className="w-3 h-3" /> In Stock
            </span>
          </div>

          {/* Quick Enquiries (WhatsApp & Call) */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            <button
              onClick={handleWhatsAppEnquiry}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold border border-emerald-200 transition"
              title="Enquire on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handleCall}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold transition"
              title="Call Store"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>Call Now</span>
            </button>
          </div>

          {/* Primary E-commerce Buttons (Buy Now & Add to Cart) */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full flex items-center justify-center gap-1 py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition"
            >
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
