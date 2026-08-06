import React, { useState } from 'react';
import { Mountain, Sun, Flame, Box, Truck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CoffeeJourney: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'farm',
      icon: Mountain,
      title: '1. Sustainable Farm',
      subtitle: 'High Altitude Terroir',
      description: 'Cultivated at 1,800 to 2,200 meters above sea level in volcanic soils of Boquete and Yirgacheffe under natural rainforest shade canopy.',
      details: ['Volcanic Mineral Soil', 'Natural Rainforest Canopy', 'Zero Synthetic Fertilizers'],
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'harvest',
      icon: Sun,
      title: '2. Selective Harvest',
      subtitle: 'Selective Hand-Picking',
      description: 'Local coffee artisans hand-select only burgundy-ripe coffee cherries at peak sugar concentration, performing triple density sortings.',
      details: ['Burgundy Ripeness Only', 'Brix Refractometer Testing', 'Triple Density Sorting'],
      image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'roasting',
      icon: Flame,
      title: '3. Micro-Roasting',
      subtitle: 'Convection Heat Control',
      description: 'Roasting in 12kg micro-batches on our Loring Smart Roaster. We monitor real-time rate-of-rise (RoR) curves for ideal Maillard reaction.',
      details: ['Precision RoR Curve Log', 'Convection Air Heating', 'Zero Carbon Emissions'],
      image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'packaging',
      icon: Box,
      title: '4. Oxygen-Free Packaging',
      subtitle: 'One-Way Degas Valve',
      description: 'Flushed with food-grade nitrogen instantly after resting to preserve fragile aromatics in eco-friendly recyclable barrier bags.',
      details: ['Nitrogen Gas Flushed', 'One-Way Valve Seal', '100% Recyclable Pouch'],
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'delivery',
      icon: Truck,
      title: '5. Doorstep Delivery',
      subtitle: 'Roasted to Order',
      description: 'Shipped within 24 hours of roasting directly to your kitchen counter, guaranteeing peak degassing window for extraction.',
      details: ['Dispatched in 24 Hours', 'Carbon-Neutral Courier', 'Live GPS Tracking'],
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const current = steps[activeStep];

  return (
    <section className="py-24 bg-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-semibold text-caramel tracking-widest">
            From Seed to Cup
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
            The Interactive Coffee Journey
          </h2>
          <p className="text-cream/70 text-sm font-light">
            Click through our 5-stage supply chain timeline to discover how every cup is crafted.
          </p>
        </div>

        {/* Timeline Tabs Header */}
        <div className="flex overflow-x-auto justify-start md:justify-center space-x-2 pb-4 mb-12 border-b border-white/10 scrollbar-none">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-caramel text-cream shadow-glow border border-caramel'
                    : 'bg-white/5 text-cream/70 hover:bg-white/10 hover:text-cream border border-white/10'
                }`}
              >
                <step.icon className={`w-4 h-4 ${isActive ? 'text-cream' : 'text-gold'}`} />
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-dark-card border border-caramel/20 rounded-3xl p-6 sm:p-10 shadow-2xl glass-card"
          >
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel/20 border border-caramel/40 text-caramel text-xs font-bold uppercase tracking-wider">
                <current.icon className="w-4 h-4" />
                <span>{current.subtitle}</span>
              </div>

              <h3 className="font-serif font-bold text-3xl sm:text-4xl text-cream">
                {current.title}
              </h3>

              <p className="text-cream/80 text-base leading-relaxed font-sans font-light">
                {current.description}
              </p>

              <div className="space-y-3 pt-2">
                {current.details.map((detail, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-3 text-sm text-cream font-medium">
                    <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-dark/70 backdrop-blur-md border border-white/10">
                  <p className="text-xs text-gold font-mono font-bold uppercase">
                    Stage {activeStep + 1} of 5
                  </p>
                  <p className="text-sm font-serif text-cream font-bold mt-0.5">
                    {current.title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
