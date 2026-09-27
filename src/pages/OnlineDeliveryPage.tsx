import React from 'react';
import {
  Truck,
  Store,
  MapPin,
  Clock,
  ShieldCheck,
  MessageSquare,
  Phone,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface OnlineDeliveryPageProps {
  onShopNow: () => void;
  onTrackOrder: () => void;
}

export const OnlineDeliveryPage: React.FC<OnlineDeliveryPageProps> = ({
  onShopNow,
  onTrackOrder
}) => {
  const { settings, getWhatsAppUrl, getPrimaryCallUrl } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-950 text-white p-6 sm:p-12 border border-blue-800 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/80 border border-cyan-800/80 px-3 py-1 rounded-full">
            Local &amp; Regional Doorstep Logistics
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-white">
            Order Online – Get Delivered to Your Door
          </h1>
          <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
            GS COMPUTER provides convenient online ordering for laptops, PC hardware, printers, and accessories with home delivery or store pickup directly from our Paschim Sharira store.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <button
              onClick={onShopNow}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition"
            >
              Start Shopping Online
            </button>
            <button
              onClick={onTrackOrder}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition"
            >
              Track Your Package
            </button>
            <a
              href={getWhatsAppUrl({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Delivery Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Delivery Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Estimated Delivery Time
          </h3>
          <p className="text-xl font-black text-blue-600 font-['Space_Grotesk']">
            {settings.estimatedDeliveryTime}
          </p>
          <p className="text-xs text-slate-500">
            Same-day or next-day delivery in Paschim Sharira and neighboring Kaushambi areas.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Delivery Charges
          </h3>
          <p className="text-xl font-black text-emerald-600 font-['Space_Grotesk']">
            ₹{settings.deliveryCharge} Flat
          </p>
          <p className="text-xs text-slate-500">
            <strong>FREE delivery</strong> on all orders above ₹{settings.freeDeliveryThreshold.toLocaleString('en-IN')}!
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Store className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 font-['Space_Grotesk']">
            Store Pickup Option
          </h3>
          <p className="text-xl font-black text-amber-600 font-['Space_Grotesk']">
            100% Free
          </p>
          <p className="text-xs text-slate-500">
            Order online and pick up same-day at our Paschim Sharira retail store counter.
          </p>
        </div>
      </div>

      {/* Delivery Coverage Areas */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
            Configured Delivery Areas &amp; Towns
          </h2>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          We actively fulfill deliveries to the following regions configured by store administration:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {settings.deliveryAreas.map((area, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{area}</span>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-400 mt-4 italic">
          *Outside these locations? We ship via registered express courier across Uttar Pradesh. Call Govind Patrkar at {settings.primaryPhone} for courier queries.
        </p>
      </div>

      {/* How It Works Steps */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk'] text-center">
          How Online Delivery Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              1
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Place Order</h4>
            <p className="text-[11px] text-slate-500">
              Select products, choose Home Delivery or Pickup, and place order online.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              2
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Verification</h4>
            <p className="text-[11px] text-slate-500">
              Govind Patrkar confirms the order and packs your machine safely with accessories.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              3
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Dispatch &amp; Tracking</h4>
            <p className="text-[11px] text-slate-500">
              Receive live tracking updates with tracking number and WhatsApp notifications.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto text-sm">
              4
            </div>
            <h4 className="font-bold text-slate-900 text-xs">Doorstep Delivery</h4>
            <p className="text-[11px] text-slate-500">
              Safely delivered to your doorstep. Inspect your machine with the warranty card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
