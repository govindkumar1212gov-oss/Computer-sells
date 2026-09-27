import React from 'react';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartPageProps {
  onContinueShopping: () => void;
  onProceedToCheckout: () => void;
  onViewProductDetail: (productId: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onContinueShopping,
  onProceedToCheckout,
  onViewProductDetail
}) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    settings
  } = useStore();

  const { subtotal, deliveryCharge, total, itemCount } = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
          Explore our wide range of new and used laptops, PC components, and accessories.
        </p>
        <button
          onClick={onContinueShopping}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
            Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified inventory from GS COMPUTER, Paschim Sharira
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const { product, quantity } = item;
            const itemTotal = product.price * quantity;

            return (
              <div
                key={product.id}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition hover:border-slate-300"
              >
                <div
                  onClick={() => onViewProductDetail(product.id)}
                  className="flex items-center gap-4 cursor-pointer flex-1"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-100 bg-slate-50 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">
                        {product.brand}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                          product.condition === 'Used / Refurbished'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {product.condition}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition line-clamp-1 mt-0.5">
                      {product.name}
                    </h3>
                    <p className="text-xs font-black text-slate-950 mt-1 font-['Space_Grotesk']">
                      ₹{product.price.toLocaleString('en-IN')} each
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Total */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                    <button
                      onClick={() => updateCartQuantity(product.id, quantity - 1)}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(product.id, quantity + 1)}
                      className="p-1.5 rounded-lg hover:bg-white text-slate-600 hover:text-slate-900 transition"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-black text-slate-950 font-['Space_Grotesk']">
                      ₹{itemTotal.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-1 mt-0.5"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={onContinueShopping}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary Card (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 font-['Space_Grotesk'] pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-slate-900">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span className="font-bold text-slate-900">
                {deliveryCharge === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${deliveryCharge}`
                )}
              </span>
            </div>

            {subtotal < settings.freeDeliveryThreshold && (
              <p className="text-[11px] text-blue-600 bg-blue-50 p-2 rounded-lg">
                Add ₹{(settings.freeDeliveryThreshold - subtotal).toLocaleString('en-IN')} more for free delivery!
              </p>
            )}

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="text-sm font-bold text-slate-900">Final Total</span>
              <span className="text-xl font-black text-slate-950 font-['Space_Grotesk']">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={onProceedToCheckout}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-3 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Safe &amp; transparent checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-500 shrink-0" />
              <span>Doorstep Delivery or Store Pickup in Paschim Sharira</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
