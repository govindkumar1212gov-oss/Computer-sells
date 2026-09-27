import React, { useState } from 'react';
import {
  Wrench,
  Laptop,
  Monitor,
  HardDrive,
  Cpu,
  ShieldAlert,
  Printer,
  Wifi,
  Sparkles,
  Phone,
  MessageSquare,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const RepairServicesPage: React.FC = () => {
  const {
    addRepairRequest,
    getWhatsAppUrl,
    getPrimaryCallUrl,
    settings
  } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    deviceType: 'Laptop' as 'Laptop' | 'Desktop' | 'Printer' | 'Accessories' | 'Other',
    brand: '',
    model: '',
    problem: '',
    preferredDate: '',
    address: 'Paschim Sharira, Kaushambi',
    serviceType: 'Store Drop-off' as 'Store Drop-off' | 'Home Pickup'
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const servicesList = [
    { name: 'Laptop Repair', desc: 'Screen replacement, keyboard fixing, hinge repair, charging port.' },
    { name: 'Desktop Repair', desc: 'Motherboard diagnostic, SMPS/power supply replacement, GPU issues.' },
    { name: 'Windows Installation', desc: 'Genuine Windows 10 & 11 setup with drivers and original updates.' },
    { name: 'Software Installation', desc: 'MS Office, Tally Prime, Photoshop, AutoCAD, Hindi typing fonts.' },
    { name: 'Virus Removal', desc: 'Deep malware removal, spyware elimination & anti-virus installation.' },
    { name: 'Data Backup', desc: 'Safe data migration before formatting or system re-installation.' },
    { name: 'Data Recovery', desc: 'Corrupted hard drives, accidental deletion & pendrive recovery.' },
    { name: 'SSD Upgrade', desc: 'Replace slow HDD with high-speed NVMe or SATA SSD for 10x speed.' },
    { name: 'RAM Upgrade', desc: 'Increase RAM for faster multitasking, Photoshop, Tally & coding.' },
    { name: 'Laptop Cleaning', desc: 'Thermal paste re-pasting (Thermal Grizzly) & dust fan servicing.' },
    { name: 'Computer Formatting', desc: 'Clean operating system re-install with essential browser & utility setup.' },
    { name: 'Hardware Repair', desc: 'Chip-level motherboard fixing, IC testing & short-circuit repair.' },
    { name: 'Printer Repair', desc: 'Ink pad reset, cartridge cleaning, roller replacement & head clean.' },
    { name: 'Networking', desc: 'Wi-Fi router setup, LAN cabling for cyber cafes, offices and homes.' },
    { name: 'Other Computer Services', desc: 'Custom PC assembly, bios flashing, display cable replacement.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.mobileNumber.trim()) {
      alert('Please fill in your name and mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const req = addRepairRequest(formData);
      setSubmittedId(req.id);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-400 bg-blue-900/60 border border-blue-700/60 px-3 py-1 rounded-full">
            Workshop &amp; On-Site Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-white">
            Computer &amp; Laptop Repair Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Fast, honest, and expert repair in Paschim Sharira, Kaushambi. Diagnostics, chip-level troubleshooting, speed upgrades, and genuine parts.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="#book-form"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition"
            >
              Book Repair Service
            </a>
            <a
              href={getWhatsAppUrl({ type: 'repair' })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Repair Enquiry</span>
            </a>
            <a
              href={getPrimaryCallUrl()}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-xs text-white border border-slate-700 transition flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-blue-400" />
              <span>Call Technician</span>
            </a>
          </div>
        </div>
      </div>

      {/* 15 Services Grid */}
      <div>
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk']">
            All Repair &amp; Maintenance Services
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete hardware and software care for personal and business computers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {servicesList.map((svc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-md transition flex items-start gap-3.5 group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition flex items-center justify-center shrink-0">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk'] group-hover:text-blue-600 transition">
                  {svc.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Section */}
      <div id="book-form" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Online Service Booking
          </span>
          <h2 className="text-2xl font-black text-slate-900 font-['Space_Grotesk'] mt-2">
            Book a Repair Service
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Drop off your machine at Paschim Sharira store or schedule a home pickup
          </p>
        </div>

        {submittedId ? (
          <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-emerald-900">
                Repair Request Booked!
              </h3>
              <p className="text-xs text-emerald-700 mt-1">
                Your Service Ticket Number: <strong className="text-slate-900">{submittedId}</strong>
              </p>
              <p className="text-xs text-emerald-600 mt-2 max-w-md mx-auto">
                Govind Patrkar from GS COMPUTER will call you shortly to confirm timing and issue diagnosis.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <a
                href={getWhatsAppUrl({
                  type: 'repair',
                  details: `Ticket ID: ${submittedId}, Problem: ${formData.problem}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Notify via WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmittedId(null)}
                className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-xl text-xs font-bold"
              >
                Book Another Device
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Govind Kumar"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Device Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.deviceType}
                  onChange={(e) => setFormData({ ...formData, deviceType: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop / Assembled PC</option>
                  <option value="Printer">Printer</option>
                  <option value="Accessories">Accessories / Keyboard / Mouse</option>
                  <option value="Other">Other Computer Gear</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Device Brand &amp; Model
                </label>
                <input
                  type="text"
                  placeholder="e.g. HP 15s / Dell Latitude 3400"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  Problem Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Laptop not turning on, very slow performance, blue screen error, display broken, needs Windows 11..."
                  value={formData.problem}
                  onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Preferred Service Mode
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Store Drop-off">Store Drop-off (Paschim Sharira)</option>
                  <option value="Home Pickup">Home Pickup (Kaushambi area)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-semibold mb-1">
                  Your Address / Landmark
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition shadow-md shadow-blue-500/20 text-xs sm:text-sm"
            >
              {loading ? 'Submitting Booking...' : 'Book Repair Service Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
