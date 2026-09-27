import React from 'react';
import { Tag, ShieldCheck, Wrench, Truck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const cards = [
    {
      title: 'Best Price',
      subtitle: 'Competitive & Honest Rates',
      description:
        'We offer competitive pricing on brand new laptops, thoroughly inspected second-hand laptops, and quality computer accessories.',
      icon: Tag,
      color: 'blue'
    },
    {
      title: 'Genuine Products',
      subtitle: '100% Tested Quality',
      description:
        'All products, parts, SSDs, and laptops are checked and verified for authentic quality and backed with store or brand warranty.',
      icon: ShieldCheck,
      color: 'emerald'
    },
    {
      title: 'Trusted Service',
      subtitle: 'Dedicated Tech Support',
      description:
        'Reliable repair, fast Windows setup, hardware upgrades, and honest exchange valuations right here at our Paschim Sharira workshop.',
      icon: Wrench,
      color: 'amber'
    },
    {
      title: 'Fast Delivery',
      subtitle: 'Doorstep & In-Store Pickup',
      description:
        'Prompt online delivery across Kaushambi and surrounding areas, or convenient same-day pickup directly at our store.',
      icon: Truck,
      color: 'cyan'
    }
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Why Choose GS COMPUTER
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-['Space_Grotesk']">
            Your Reliable Technology Partner
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Built on customer satisfaction, transparent pricing, and responsive service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Space_Grotesk']">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
