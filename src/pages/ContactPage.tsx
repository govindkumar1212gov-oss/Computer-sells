import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { GSLogo } from '../components/GSLogo';

export const ContactPage: React.FC = () => {
  const {
    settings,
    addContactMessage,
    getWhatsAppUrl,
    getPrimaryCallUrl,
    getSecondaryCallUrl
  } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Laptop Enquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      alert('Please fill in required fields (Name, Phone, Message).');
      return;
    }

    addContactMessage(form);
    setSubmitted(true);
    setForm({ name: '', email: '', phone: '', subject: 'Laptop Enquiry', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-slate-900">
          Contact GS COMPUTER
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm max-w-md mx-auto">
          We are here to answer your queries regarding laptops, desktop builds, computer repairs, or online orders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Details & Quick Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <GSLogo size="lg" customLogoUrl={settings.logoUrl} />

            <div className="space-y-4 text-xs text-slate-700">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Store Address</h4>
                  <p className="text-slate-600 leading-relaxed mt-0.5 font-medium">
                    {settings.address}
                  </p>
                  <p className="text-[11px] text-blue-600 font-semibold mt-1">
                    Paschim Sharira, Kaushambi (UP – 212214)
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Call Numbers</h4>
                  <div className="flex flex-col gap-1 mt-1">
                    <a
                      href={getPrimaryCallUrl()}
                      className="font-bold text-emerald-600 hover:underline"
                    >
                      Primary: {settings.primaryPhone}
                    </a>
                    <a
                      href={getSecondaryCallUrl()}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      Alternate: {settings.secondaryPhone}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official WhatsApp</h4>
                  <a
                    href={getWhatsAppUrl({ type: 'general' })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-600 hover:underline mt-0.5 inline-block"
                  >
                    {settings.whatsappNumber}
                  </a>
                  <p className="text-[11px] text-slate-400">Instant response during store hours</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Address</h4>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-blue-600 hover:underline mt-0.5 inline-block font-medium"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Store Hours</h4>
                  <p className="text-slate-600 mt-0.5">
                    Monday to Saturday: 9:00 AM – 8:00 PM
                  </p>
                  <p className="text-[11px] text-slate-400">Sunday: Call before visiting</p>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <a
                href={getPrimaryCallUrl()}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Store</span>
              </a>

              <a
                href={getWhatsAppUrl({ type: 'general' })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href={`mailto:${settings.email}`}
                className="col-span-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition text-center"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>Email Us ({settings.email})</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form & Interactive Map (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Interactive Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk'] mb-1">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Fill out this form and Govind Patrkar will reply to your phone or email.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-900 rounded-2xl border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Thank you for reaching out to GS COMPUTER. We will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Laptop Enquiry">Laptop Enquiry (New or Used)</option>
                      <option value="Repair Booking">Computer Repair / Upgrade</option>
                      <option value="Exchange Old Laptop">Laptop Exchange</option>
                      <option value="Online Order Delivery">Online Order & Delivery</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Message / Requirement <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what laptop model, configuration or repair service you are looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-['Space_Grotesk']">
                  Store Location on Map
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Paschim Sharira, Kaushambi, Uttar Pradesh – 212214
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'GS Computer, Paschim Sharira, Kaushambi, Uttar Pradesh 212214'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-semibold flex items-center gap-1 transition"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-16/9 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg mb-3">
                <MapPin className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">GS COMPUTER Store Location</h4>
              <p className="text-xs text-slate-600 max-w-sm mt-1">
                Paschim Sharira, Kaushambi, Uttar Pradesh – 212214
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  'GS Computer, Paschim Sharira, Kaushambi, Uttar Pradesh 212214'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
