import React from 'react';
import { Sparkles, Mountain, Flame, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const AboutPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Founding Philosophy</span>
          </div>
          <h1 className="font-serif font-extrabold text-4xl sm:text-6xl text-cream tracking-tight">
            Every Cup Starts with a Spark.
          </h1>
          <p className="text-cream/80 text-base sm:text-lg font-light leading-relaxed">
            Founded by Youssef Manssouri, Ember Coffee was born from a simple obsession: to eliminate compromise in specialty coffee by bridging ancient high-altitude origins with precision convection micro-roasting.
          </p>
        </div>

        {/* Hero Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 relative aspect-square rounded-3xl overflow-hidden border border-caramel/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80"
              alt="Highland Coffee Farm"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark/70 backdrop-blur-md border border-white/10">
              <p className="text-xs text-gold font-mono uppercase">Direct Trade Partnership</p>
              <p className="text-sm font-serif font-bold text-cream mt-0.5">
                Yirgacheffe Highlands, Ethiopia • 2,200m Elevation
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-cream">
              The Alchemy of Micro-Batch Roasting
            </h2>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-light">
              We reject high-volume commercial drum roasting that bakes out delicate fruit aromatics. Instead, every Ember roast takes place in small 12-kilogram micro-batches on our state-of-the-art Loring convection roasters.
            </p>
            <p className="text-cream/80 text-sm sm:text-base leading-relaxed font-light">
              By using recirculated hot air rather than direct metal conductive heat, we eliminate scorching while preserving the intrinsic terroir of each micro-lot—from jasmine and bergamot in Ethiopian Heirloom to toasted hazelnut in high-altitude Guatemalan beans.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-dark-card border border-white/10">
                <Mountain className="w-5 h-5 text-gold mb-2" />
                <h4 className="font-serif font-bold text-cream text-sm">1,800m+ High Altitude</h4>
                <p className="text-xs text-cream/60 mt-1">Denser beans with concentrated natural sugars.</p>
              </div>
              <div className="p-4 rounded-2xl bg-dark-card border border-white/10">
                <Flame className="w-5 h-5 text-caramel mb-2" />
                <h4 className="font-serif font-bold text-cream text-sm">Restored Loring Roaster</h4>
                <p className="text-xs text-cream/60 mt-1">80% reduced carbon emissions during roast cycle.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Values Grid */}
        <div className="bg-dark-card border border-caramel/20 rounded-3xl p-8 sm:p-12 mb-24 shadow-2xl glass-card">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h3 className="font-serif font-bold text-3xl text-cream">The Four Ember Pillars</h3>
            <p className="text-xs text-cream/60">Uncompromising principles guiding our roastery daily.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: 'Direct Sourcing', desc: 'Paying 45% above Fair Trade minimums to grower collectives.' },
              { icon: Flame, title: 'Freshness Guarantee', desc: 'Dispatched within 24 hours of roasting for peak degassing.' },
              { icon: Mountain, title: 'Single-Origin Focus', desc: 'Highlighting distinct terroir and harvest micro-lots.' },
              { icon: Heart, title: 'Community Impact', desc: 'Reinvesting 5% of profits into clean water wells at origin.' }
            ].map((pillar, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                <pillar.icon className="w-8 h-8 text-gold" />
                <h4 className="font-serif font-bold text-cream text-lg">{pillar.title}</h4>
                <p className="text-xs text-cream/70 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
