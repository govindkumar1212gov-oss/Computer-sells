import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

interface WishlistPageProps {
  onContinueShopping: () => void;
  onViewProductDetail: (productId: string) => void;
  onBuyNow: (product: Product) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onContinueShopping,
  onViewProductDetail,
  onBuyNow
}) => {
  const { wishlist, products, toggleWishlist, addToCart } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product: Product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, 1);
    onBuyNow(product);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Save your favorite laptops, accessories, and PC components here to review or buy later.
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
            My Wishlist ({wishlistProducts.length} items)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Saved items ready to buy or move to cart
          </p>
        </div>

        <button
          onClick={onContinueShopping}
          className="text-xs text-blue-600 hover:underline font-bold flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-xs hover:border-blue-400 transition"
          >
            <div>
              <div
                onClick={() => onViewProductDetail(product.id)}
                className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 cursor-pointer mb-3"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 text-rose-600 shadow-sm"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase">
                  {product.brand}
                </span>
                <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                  {product.condition}
                </span>
              </div>

              <h3
                onClick={() => onViewProductDetail(product.id)}
                className="text-sm font-bold text-slate-900 hover:text-blue-600 transition cursor-pointer line-clamp-2"
              >
                {product.name}
              </h3>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-lg font-black text-slate-950 font-['Space_Grotesk']">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.mrp > product.price && (
                  <span className="text-xs text-slate-400 line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleMoveToCart(product)}
                className="py-2 px-3 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold flex items-center justify-center gap-1.5 transition"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Move to Cart</span>
              </button>

              <button
                onClick={() => handleBuyNow(product)}
                className="py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition text-center"
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
