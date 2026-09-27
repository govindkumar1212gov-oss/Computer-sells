import React, { useState } from 'react';
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OrderStatus } from '../types';
import { GSLogo } from '../components/GSLogo';

interface OrderTrackingPageProps {
  initialOrderId?: string;
  onExploreProducts: () => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({
  initialOrderId = '',
  onExploreProducts
}) => {
  const { orders, getWhatsAppUrl, settings } = useStore();

  const [searchOrderId, setSearchOrderId] = useState(initialOrderId);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(() => {
    if (initialOrderId) {
      return orders.find(
        (o) => o.id.toLowerCase() === initialOrderId.trim().toLowerCase()
      );
    }
    return orders[0]; // Show first order as default sample
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!searchOrderId.trim()) {
      setErrorMsg('Please enter an Order ID (e.g. GS-2026-8812).');
      return;
    }

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === searchOrderId.trim().toLowerCase() &&
        (!searchPhone.trim() || o.customer.mobileNumber.includes(searchPhone.trim()))
    );

    if (found) {
      setSearchedOrder(found);
    } else {
      setErrorMsg(`No matching order found for "${searchOrderId}". Please check the ID.`);
    }
  };

  const statusSteps: OrderStatus[] = [
    'Order Placed',
    'Order Confirmed',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ];

  const getStatusIndex = (currentStatus: OrderStatus) => {
    const idx = statusSteps.indexOf(currentStatus);
    return idx === -1 ? 0 : idx;
  };

  const currentStepIdx = searchedOrder ? getStatusIndex(searchedOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Live Tracking System
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-['Space_Grotesk']">
          Track Your GS COMPUTER Order
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
          Check real-time delivery status, dispatch updates, and WhatsApp confirmation.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Order ID
            </label>
            <input
              type="text"
              placeholder="e.g. GS-2026-8812"
              value={searchOrderId}
              onChange={(e) => setSearchOrderId(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium uppercase"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Mobile Number (Optional)
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile"
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </div>
        </form>

        {errorMsg && (
          <div className="mt-3 p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Searched Order Details */}
      {searchedOrder && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          {/* Top Banner */}
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">
                  Order Details
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-300">
                  {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <h2 className="text-2xl font-black font-['Space_Grotesk'] text-white mt-1">
                {searchedOrder.id}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Tracking AWB: <strong className="text-slate-200">{searchedOrder.trackingNumber || 'Pending Assignment'}</strong>
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <span className="text-xs text-slate-400">Current Status:</span>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/40 text-xs font-extrabold uppercase tracking-wide">
                {searchedOrder.status}
              </span>
              <span className="text-[11px] text-amber-300 font-semibold">
                Est. Delivery: {searchedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Visual Step Timeline */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-6">
                Delivery Progress
              </h3>

              <div className="relative">
                {/* Horizontal Progress Bar for Desktop */}
                <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0">
                  <div
                    className="h-full bg-blue-600 transition-all duration-500"
                    style={{
                      width: `${(currentStepIdx / (statusSteps.length - 1)) * 100}%`
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 relative z-10">
                  {statusSteps.map((step, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center text-center space-y-2"
                      >
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs ${
                            isCurrent
                              ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                              : isDone
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                        <span
                          className={`text-xs font-bold ${
                            isCurrent
                              ? 'text-blue-600'
                              : isDone
                              ? 'text-slate-900'
                              : 'text-slate-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Items Breakdown */}
            <div className="pt-6 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Items in this Order
              </h3>
              <div className="divide-y divide-slate-100">
                {searchedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 bg-slate-50"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900">
                          {item.productName}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Brand: {item.brand} • Condition: {item.condition}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900">
                        Qty: {item.quantity}
                      </span>
                      <p className="text-xs font-black text-slate-950 font-['Space_Grotesk']">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Address & Payment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block mb-1">
                  Delivery Address ({searchedOrder.deliveryOption})
                </span>
                <p className="font-semibold text-slate-800">
                  {searchedOrder.customer.fullName}
                </p>
                <p className="text-slate-600">
                  Phone: <strong>{searchedOrder.customer.mobileNumber}</strong>
                </p>
                {searchedOrder.deliveryOption === 'Home Delivery' ? (
                  <p className="text-slate-600">
                    {searchedOrder.customer.house}, {searchedOrder.customer.street},{' '}
                    {searchedOrder.customer.city}, {searchedOrder.customer.district},{' '}
                    {searchedOrder.customer.state} – {searchedOrder.customer.pinCode}
                  </p>
                ) : (
                  <p className="text-emerald-700 font-medium">
                    Store Pickup: GS COMPUTER, Paschim Sharira, Kaushambi (UP – 212214)
                  </p>
                )}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block mb-1">
                  Payment Summary
                </span>
                <div className="flex justify-between text-slate-600">
                  <span>Method:</span>
                  <span className="font-semibold text-slate-800">{searchedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Payment Status:</span>
                  <span className="font-semibold text-emerald-600">{searchedOrder.paymentStatus}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Charge:</span>
                  <span>{searchedOrder.deliveryCharge === 0 ? 'FREE' : `₹${searchedOrder.deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 text-slate-900 font-bold">
                  <span>Total Amount:</span>
                  <span className="font-black font-['Space_Grotesk'] text-sm">
                    ₹{searchedOrder.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Status History Log */}
            {searchedOrder.history && searchedOrder.history.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  Status History &amp; Activity Log
                </h3>
                <div className="space-y-2">
                  {searchedOrder.history.map((hist, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-700">{hist.status}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600">{hist.note}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{hist.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct WhatsApp Order Update button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl({ type: 'order', orderId: searchedOrder.id })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Order Update</span>
              </a>

              <button
                onClick={onExploreProducts}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
