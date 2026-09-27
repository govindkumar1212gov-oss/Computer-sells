import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings, getWhatsAppUrl, getPrimaryCallUrl, getSecondaryCallUrl } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2">
      {/* Expanded Quick Contact Card */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 sm:w-80 text-slate-800 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900">
                Direct Contact
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs space-y-1">
            <p className="font-bold text-slate-900 text-sm">GS COMPUTER</p>
            <p className="text-slate-600 font-medium">Govind Patrkar (Founder & Owner)</p>
            <p className="text-[11px] text-blue-600 font-semibold uppercase tracking-wider">
              "Your Tech Partner"
            </p>
            <p className="text-[11px] text-slate-500 pt-1">
              Paschim Sharira, Kaushambi, UP
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={getWhatsAppUrl({ type: 'general' })}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-3 rounded-xl text-xs transition shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={getPrimaryCallUrl()}
                className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold py-2 px-2 rounded-xl text-xs border border-blue-200 transition"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call Primary</span>
              </a>
              <a
                href={getSecondaryCallUrl()}
                className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-2 rounded-xl text-xs transition"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Alternate</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Main floating trigger buttons */}
      <div className="flex items-center gap-2">
        <a
          href={getPrimaryCallUrl()}
          className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-2.5 rounded-full shadow-lg font-bold text-xs transition transform hover:scale-105"
          title={`Call ${settings.primaryPhone}`}
        >
          <Phone className="w-4 h-4" />
          <span>{settings.primaryPhone}</span>
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 relative"
          aria-label="Contact on WhatsApp or Call"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></span>
        </button>
      </div>
    </div>
  );
};
