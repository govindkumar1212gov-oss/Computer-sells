import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Wrench,
  Laptop,
  Truck,
  RotateCcw
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from '../components/GSLogo';
import { OwnerSection } from '../components/OwnerSection';

export const AboutUsPage: React.FC = () => {
  const { settings, getWhatsAppUrl, getPrimaryCallUrl, getSecondaryCallUrl } = useStore();

  const servicesList = [
    'New Laptop Sales (HP, Dell, Lenovo, ASUS)',
    'Certified Second-Hand / Used Laptops with Store Warranty',
    'Custom Assembled Desktop PCs & Gaming Rigs',
    'Computer Accessories (SSD, RAM, Keyboards, Mice, Monitors, Cables)',
    'Professional Computer & Laptop Hardware/Software Repair',
    'Fair Valuation Laptop Exchange Program',
    'Sell Old Laptop for Instant Cash',
    'Local & Regional Online Delivery across Kaushambi & UP'
  ];

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <GSLogo size="xl" variant="dark" customLogoUrl={settings.logoUrl} className="justify-center" />
          <h1 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-white mt-4">
            About GS COMPUTER
          </h1>
          <p className="text-blue-400 font-bold tracking-widest uppercase text-sm">
            "Your Tech Partner"
          </p>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            GS COMPUTER is focused on providing computers, laptops, accessories and reliable technology services to customers in Paschim Sharira, Kaushambi, and neighboring regions.
          </p>
        </div>
      </section>

      {/* Main Info */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Our Business Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded and operated by <strong>Govind Patrkar</strong>, GS COMPUTER was established with the single objective of bringing dependable, transparent, and pocket-friendly technology to the people of Kaushambi.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are a student needing a reliable second-hand laptop for coding and online education, a business requiring office PCs, or an individual whose laptop needs urgent repair, GS COMPUTER provides honest guidance without confusing jargon.
            </p>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 space-y-1">
              <span className="text-xs font-bold text-blue-900">Official Business Address</span>
              <p className="text-xs text-blue-800 font-semibold">{settings.address}</p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-['Space_Grotesk']">
              Our Core Services
            </h2>
            <div className="space-y-2.5">
              {servicesList.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Owner Section Component */}
      <OwnerSection />

      {/* Contact Quick Row */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-200 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Have Questions or Need Tech Advice?</h3>
          <p className="text-xs text-slate-600">
            Govind Patrkar is available to help you choose the right laptop or computer hardware.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={getPrimaryCallUrl()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call Primary ({settings.primaryPhone})</span>
            </a>
            <a
              href={getWhatsAppUrl({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-emerald-500 transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Message</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
