import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from './GSLogo';
import { ProductCategory } from '../types';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  setSelectedCategory?: (c: ProductCategory | 'ALL') => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage, setSelectedCategory }) => {
  const { settings, getWhatsAppUrl, getPrimaryCallUrl, getSecondaryCallUrl } = useStore();

  const handleNav = (page: string, category?: ProductCategory | 'ALL') => {
    if (category && setSelectedCategory) {
      setSelectedCategory(category);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-blue-900/40 text-blue-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                100% Genuine
              </h4>
              <p className="text-[11px] text-slate-400">Tested products & warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-emerald-900/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Online Delivery
              </h4>
              <p className="text-[11px] text-slate-400">Doorstep & store pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-amber-900/40 text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Laptop Exchange
              </h4>
              <p className="text-[11px] text-slate-400">Fair valuation for old laptops</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div className="w-10 h-10 rounded-lg bg-cyan-900/40 text-cyan-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Quick Repair
              </h4>
              <p className="text-[11px] text-slate-400">Expert hardware & OS fixes</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* Brand & Owner Column */}
          <div className="space-y-4">
            <GSLogo size="lg" variant="dark" customLogoUrl={settings.logoUrl} />
            <p className="text-xs text-slate-400 leading-relaxed">
              GS COMPUTER is focused on providing computers, laptops, accessories and reliable
              technology services to customers in Kaushambi and surrounding areas.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <p className="text-xs font-bold text-white">Owner & Leadership</p>
              <p className="text-sm font-semibold text-blue-400 mt-0.5">Govind Patrkar</p>
              <p className="text-[11px] text-slate-400">Founder & Owner – GS COMPUTER</p>
              <p className="text-[10px] text-blue-300 font-semibold tracking-wider uppercase mt-1">
                "Your Tech Partner"
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'NEW LAPTOPS')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> New Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'USED / SECOND-HAND LAPTOPS')}
                  className="hover:text-amber-400 text-amber-300 transition flex items-center gap-1.5 font-medium"
                >
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Used / Second-Hand Laptops
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'DESKTOP / PC')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Desktop & Gaming PC
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('repair')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Repair & Upgrades
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('exchange')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Laptop Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('sell')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Sell Old Laptop
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('delivery')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Online Delivery Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('tracking')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Hardware & Accessories
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('products', 'SSD')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Fast SSD (NVMe / SATA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'RAM')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Laptop & Desktop RAM
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'MONITORS')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Full HD Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'PRINTERS')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Laser & Ink Tank Printers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'KEYBOARDS')}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Wireless & Gaming Keyboards
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products', 'LAPTOPS' as any)}
                  className="hover:text-blue-400 transition flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" /> Chargers, Bags & Webcams
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Address */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Store & Contact
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">GS COMPUTER</span>
                  <p className="text-slate-400">{settings.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="flex flex-wrap gap-2">
                  <a href={getPrimaryCallUrl()} className="text-emerald-400 font-semibold hover:underline">
                    {settings.primaryPhone}
                  </a>
                  <span className="text-slate-600">/</span>
                  <a href={getSecondaryCallUrl()} className="text-slate-300 hover:underline">
                    {settings.secondaryPhone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={getWhatsAppUrl({ type: 'general' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: {settings.whatsappNumber}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-slate-300 hover:text-white">
                  {settings.email}
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => handleNav('admin')}
                className="text-[11px] text-slate-500 hover:text-blue-400 transition"
              >
                Store Admin Portal Login
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            © {new Date().getFullYear()} <strong className="text-slate-300">GS COMPUTER</strong>. All rights reserved. Paschim Sharira, Kaushambi, UP – 212214.
          </p>
          <p className="text-[11px] text-slate-500">
            Govind Patrkar, Founder & Owner • Your Tech Partner
          </p>
        </div>
      </div>
    </footer>
  );
};
