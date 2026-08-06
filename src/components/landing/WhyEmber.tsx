import React from 'react';
import { Flame, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyEmber: React.FC = () => {
  const features = [
    {
      icon: Flame,
      title: 'Freshly Roasted',
      subtitle: 'Micro-Batch Precision',
      description: 'Every batch is custom roasted on our restored Loring Smart Roaster, unlocking peak aroma and vibrant fruit acidity within 48 hours of dispatch.'
    },
    {
      icon: ShieldCheck,
      title: 'Ethically Sourced',
      subtitle: '100% Direct-Trade',
      description: 'We partner directly with smallholder farming cooperatives in Ethiopia, Colombia, and Costa Rica, paying 45% above Fair Trade minimums.'
    },
    {
      icon: Truck,
      title: 'Delivered Fresh',
      subtitle: 'Peak Aroma Guarantee',
      description: 'Shipped in recyclable triple-layer oxygen barrier bags equipped with degas valves to seal in freshly roasted volatile oils.'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#171717] via-espresso/40 to-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Ember Promise</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
            Why Ember Coffee Stand Apart
          </h2>
          <p className="text-cream/70 text-base font-light">
            We bridge the gap between ancient high-altitude coffee origins and modern micro-roasting craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card glass-card-hover p-8 rounded-3xl relative group overflow-hidden border border-white/10"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-caramel via-espresso to-dark border border-gold/30 flex items-center justify-center text-gold shadow-glow mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7" />
              </div>

              <span className="text-xs uppercase tracking-widest text-caramel font-semibold">
                {feature.subtitle}
              </span>
              <h3 className="font-serif font-bold text-2xl text-cream mt-1 mb-3">
                {feature.title}
              </h3>
              <p className="text-cream/70 text-sm leading-relaxed font-sans font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
