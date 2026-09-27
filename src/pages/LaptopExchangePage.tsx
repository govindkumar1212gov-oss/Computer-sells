import React, { useState } from 'react';
import {
  RefreshCw,
  Calculator,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const LaptopExchangePage: React.FC = () => {
  const { addExchangeRequest, getWhatsAppUrl, settings } = useStore();

  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    laptopBrand: 'Dell',
    laptopModel: '',
    processor: 'Core i5',
    ram: '8GB',
    storage: '256GB SSD',
    purchaseYear: '2021',
    condition: 'Working with minor scratches',
    batteryCondition: 'Holds 2+ hours charge',
    screenCondition: 'Clean, no dead pixels',
    keyboardCondition: 'All keys working',
    expectedPrice: '',
    additionalInfo: '',
    photoUrl: ''
  });

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateEstimate = () => {
    let base = 8000;
    if (formData.processor.includes('i7')) base += 6000;
    else if (formData.processor.includes('i5')) base += 4000;
    else if (formData.processor.includes('i3')) base += 2000;

    if (formData.ram.includes('16GB')) base += 1800;
    else if (formData.ram.includes('8GB')) base += 1000;

    if (formData.storage.includes('512GB') || formData.storage.includes('1TB')) base += 1500;
    if (formData.condition.includes('Brand New') || formData.condition.includes('Flawless')) base += 2000;
    if (formData.screenCondition.includes('Faulty') || formData.screenCondition.includes('Broken')) base -= 3000;

    setEstimatedValue(Math.max(3000, base));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.mobileNumber.trim()) {
      alert('Please fill in your name and 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const req = addExchangeRequest(formData);
      setSubmittedId(req.id);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Smart Upgrade Program
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-['Space_Grotesk'] text-slate-900">
          Exchange Your Old Laptop
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
          Upgrade to a fast new or certified second-hand laptop at GS COMPUTER. Get fair value deduced straight from your new purchase!
        </p>
      </div>

      {/* Main Form Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        {submittedId ? (
          <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-900">
                Exchange Request Received!
              </h3>
              <p className="text-xs text-emerald-700 mt-1">
                Exchange Request ID: <strong className="text-slate-900">{submittedId}</strong>
              </p>
              <p className="text-xs text-emerald-800 mt-2 max-w-md mx-auto">
                Govind Patrkar from GS COMPUTER will review the specifications of your {formData.laptopBrand} {formData.laptopModel} and contact you with our best exchange valuation.
              </p>
            </div>
            <div className="flex justify-center gap-3 pt-3">
              <a
                href={getWhatsAppUrl({
                  type: 'exchange',
                  details: `Request ID: ${submittedId}, Brand: ${formData.laptopBrand}, Model: ${formData.laptopModel}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Exchange Enquiry</span>
              </a>
              <button
                onClick={() => setSubmittedId(null)}
                className="px-4 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-xl text-xs font-bold"
              >
                Submit Another Laptop
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* Customer Details */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                1. Your Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Govind Patrkar"
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
                    placeholder="10-digit phone number"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Laptop Specifications */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                2. Old Laptop Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Laptop Brand
                  </label>
                  <select
                    value={formData.laptopBrand}
                    onChange={(e) => setFormData({ ...formData, laptopBrand: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Dell">Dell</option>
                    <option value="HP">HP</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="Acer">Acer</option>
                    <option value="ASUS">ASUS</option>
                    <option value="Apple MacBook">Apple MacBook</option>
                    <option value="Other">Other Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Laptop Model Name / Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Inspiron 3542 / ThinkPad T460"
                    value={formData.laptopModel}
                    onChange={(e) => setFormData({ ...formData, laptopModel: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Processor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Intel Core i5 7th Gen / Ryzen 5"
                    value={formData.processor}
                    onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Installed RAM
                  </label>
                  <select
                    value={formData.ram}
                    onChange={(e) => setFormData({ ...formData, ram: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="4GB">4GB</option>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Storage (SSD / HDD)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 256GB SSD or 500GB HDD"
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Approx. Year of Purchase
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2019 / 2021"
                    value={formData.purchaseYear}
                    onChange={(e) => setFormData({ ...formData, purchaseYear: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Condition Check */}
            <div className="space-y-3 pb-5 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                3. Physical &amp; Functional Condition
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Overall Body Condition
                  </label>
                  <input
                    type="text"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Battery Condition / Backup
                  </label>
                  <input
                    type="text"
                    value={formData.batteryCondition}
                    onChange={(e) => setFormData({ ...formData, batteryCondition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Screen / Display Condition
                  </label>
                  <input
                    type="text"
                    value={formData.screenCondition}
                    onChange={(e) => setFormData({ ...formData, screenCondition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Keyboard &amp; Trackpad Condition
                  </label>
                  <input
                    type="text"
                    value={formData.keyboardCondition}
                    onChange={(e) => setFormData({ ...formData, keyboardCondition: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Your Expected Exchange Price (₹)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹12,000"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="Image link or paste URL"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-semibold mb-1">
                    Additional Information / Defects (if any)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Mention if adapter is original, any crack on hinge, etc."
                    value={formData.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Estimated Value Banner */}
            {estimatedValue !== null && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-blue-900 uppercase">Estimated Indicative Value</p>
                  <p className="text-xl font-black text-blue-700 font-['Space_Grotesk']">
                    ₹{estimatedValue.toLocaleString('en-IN')}*
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 max-w-xs text-right">
                  *Final exchange price depends on physical inspection by Govind Patrkar at GS COMPUTER.
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={calculateEstimate}
                className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Get Exchange Value Estimate</span>
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition shadow-md shadow-blue-500/20"
              >
                {loading ? 'Submitting...' : 'Submit Exchange Request'}
              </button>

              <a
                href={getWhatsAppUrl({
                  type: 'exchange',
                  details: `Brand: ${formData.laptopBrand}, Model: ${formData.laptopModel}, Specs: ${formData.processor} ${formData.ram}`
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Exchange Enquiry</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
