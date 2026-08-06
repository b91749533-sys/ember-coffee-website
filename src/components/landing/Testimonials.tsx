import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Chef Antoine Laurent',
      role: 'Michelin Star Chef, Paris',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      coffee: 'Mountain Reserve Panama Geisha',
      comment: 'The flavor clarity in Ember’s Panama Geisha is extraordinary. Jasmine top notes backed by clean tropical acidity. It sets a new standard for specialty coffee.'
    },
    {
      name: 'Dr. Elena Rostova',
      role: 'Coffee Chemist & Sensory Judge',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      coffee: 'Ethiopian Yirgacheffe',
      comment: 'Micro-roasted to absolute perfection. Zero baked notes or astringency. Just pure fruit sweetness and silky mouthfeel.'
    },
    {
      name: 'Marcus Vance',
      role: 'Home Barista & Tech Founder',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      coffee: 'Ember Signature Blend',
      comment: 'Subscribed 6 months ago and haven’t looked back. Freshness is unmatched—dispatched within 24 hours of roasting every single time.'
    }
  ];

  return (
    <section className="py-24 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-semibold text-gold tracking-widest">
            Words From Connoisseurs
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
            Trusted by World-Class Baristas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card p-8 rounded-3xl relative border border-white/10 flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-caramel/30 absolute top-6 right-6" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>

                <p className="text-cream/90 text-sm italic font-serif leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-caramel shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="font-serif font-bold text-cream text-base truncate">{item.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-caramel shrink-0" />
                  </div>
                  <p className="text-xs text-cream/50 truncate">{item.role}</p>
                  <p className="text-[10px] text-gold font-mono font-medium truncate mt-0.5">
                    Brew: {item.coffee}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
