import React from 'react';
import { Phone, MessageSquare, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OwnerSection: React.FC = () => {
  const { settings, getWhatsAppUrl, getPrimaryCallUrl } = useStore();

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle tech background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60">
            Store Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
            Meet the Founder
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Committed to providing authentic technology solutions and reliable service.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Owner Photo / Portrait Frame */}
            <div className="shrink-0 relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl bg-slate-800 relative group">
                {settings.ownerPhotoUrl ? (
                  <img
                    src={settings.ownerPhotoUrl}
                    alt="Govind Patrkar - Founder & Owner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-blue-950 p-4 text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-600/30 border border-blue-400/50 flex items-center justify-center text-blue-300 font-extrabold text-2xl font-['Space_Grotesk'] mb-3 shadow-inner">
                      GP
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Govind Patrkar
                    </span>
                    <span className="text-[10px] text-blue-300 mt-0.5">
                      Founder & Owner
                    </span>
                  </div>
                )}
                {/* Tech badge overlay */}
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-xs py-1 px-2 rounded-lg border border-slate-700/50 text-center">
                  <span className="text-[10px] font-semibold text-blue-300">
                    Paschim Sharira, Kaushambi
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Details & Mission Statement */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <span className="inline-block text-xs font-bold text-blue-400 tracking-wider uppercase bg-blue-950/70 border border-blue-800/60 px-3 py-0.5 rounded-full mb-2">
                  Founder & Owner
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white font-['Space_Grotesk']">
                  Govind Patrkar
                </h3>
                <p className="text-blue-300 text-sm font-semibold tracking-wider uppercase mt-1">
                  Founder & Owner, GS COMPUTER
                </p>
                <div className="inline-block mt-1">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-md border border-amber-800/40">
                    "Your Tech Partner"
                  </span>
                </div>
              </div>

              {/* Exact user-mandated description without invented awards/qualifications */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                "GS COMPUTER is focused on providing computers, laptops, accessories and reliable
                technology services to customers."
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-lg">
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 p-2 rounded-lg border border-slate-700/40">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct founder assistance & advice</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 p-2 rounded-lg border border-slate-700/40">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% Tested new & used laptops</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 p-2 rounded-lg border border-slate-700/40">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Store in Paschim Sharira, Kaushambi</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/60 p-2 rounded-lg border border-slate-700/40">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Doorstep delivery & store pickup</span>
                </div>
              </div>

              {/* Action Buttons to contact Govind Patrkar directly */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                <a
                  href={getWhatsAppUrl({
                    details: 'Hello Govind ji, I am contacting you through the GS COMPUTER website.'
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message on WhatsApp</span>
                </a>
                <a
                  href={getPrimaryCallUrl()}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Govind Patrkar ({settings.primaryPhone})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
