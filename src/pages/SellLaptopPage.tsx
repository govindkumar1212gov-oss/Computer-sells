import React, { useState } from 'react';
import {
  DollarSign,
  CheckCircle2,
  ShieldCheck,
  MessageSquare,
  Phone,
  AlertCircle,
  Clock,
  MapPin
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SellLaptopPage: React.FC = () => {
  const { addSellRequest, getWhatsAppUrl, getPrimaryCallUrl, settings } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    brand: 'HP',
    model: '',
    processor: '',
    ram: '8GB',
    storage: '256GB SSD',
    age: '2 Years',
    condition: 'Working Good',
    expectedPrice: '',
    location: 'Paschim Sharira / Kaushambi',
    additionalDetails: '',
    photoUrl: ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.mobileNumber.trim()) {
      alert('Please fill in your name and mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const req = addSellRequest(formData);
      setSubmittedId(req.id);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Sell For Instant Cash
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-slate-900">
          Sell Your Old Laptop
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
          Turn your unused or older laptop into cash. Transparent physical evaluation and fair pricing right here at GS COMPUTER.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        {submittedId ? (
          <div className="p-8 text-center bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-['Space_Grotesk']">
                Your request has been received.
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Reference ID: <strong className="text-amber-400">{submittedId}</strong>
              </p>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Govind Patrkar from GS COMPUTER will inspect your device details and get in touch with you shortly.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              <a
                href={getWhatsAppUrl({
                  type: 'sell',
                  details: `Sell ID: ${submittedId}, Laptop: ${formData.brand} ${formData.model}, Expected: ₹${formData.expectedPrice}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <button
                onClick={() => setSubmittedId(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold"
              >
                Submit Another Request
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
                Laptop &amp; Seller Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
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
                    Laptop Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dell, HP, Lenovo, ASUS"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Model Name / Model No. <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Inspiron 15 3000 / ThinkPad E480"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Processor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Core i3 7th Gen / Core i5 8th Gen"
                    value={formData.processor}
                    onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    RAM Size
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4GB / 8GB / 16GB"
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Storage (HDD / SSD)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 256GB SSD or 1TB HDD"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Laptop Age / Usage Period
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 year, 3 years, 5 years"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Overall Condition
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Working completely, battery weak, minor dents"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Expected Price (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹15,000"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Location / Village
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Paschim Sharira / Sirathu"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Upload Photo Link (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="Photo link or leave blank"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Additional Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention charger, bag, bill availability, or any other notes"
                    value={formData.additionalDetails}
                    onChange={(e) => setFormData({ ...formData, additionalDetails: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">Important Note on Pricing:</p>
              <p>
                Submitting this form does not automatically promise a price. Final quote will be offered after genuine physical inspection by Govind Patrkar at GS COMPUTER.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-300 text-slate-950 font-black rounded-xl transition shadow-md shadow-amber-500/20 text-xs sm:text-sm uppercase tracking-wider"
            >
              {loading ? 'Submitting Request...' : 'Sell My Laptop'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
