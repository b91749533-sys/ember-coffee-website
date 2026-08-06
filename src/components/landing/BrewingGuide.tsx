import React, { useState } from 'react';
import { BREW_GUIDES } from '../../data/mockData';
import { Clock, Thermometer, Sliders, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BrewingGuide: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState(BREW_GUIDES[0].id);
  const [cupCount, setCupCount] = useState(2);

  const selectedGuide = BREW_GUIDES.find(g => g.id === selectedGuideId) || BREW_GUIDES[0];

  // Calculate coffee & water ratio dynamically based on cups
  let gramsPerCup = 15;
  let waterMlPerCup = 240;
  if (selectedGuide.id === 'espresso') {
    gramsPerCup = 18;
    waterMlPerCup = 36;
  } else if (selectedGuide.id === 'french-press') {
    gramsPerCup = 18;
    waterMlPerCup = 270;
  } else if (selectedGuide.id === 'cold-brew') {
    gramsPerCup = 25;
    waterMlPerCup = 200;
  }

  const totalCoffeeGrams = gramsPerCup * cupCount;
  const totalWaterMl = waterMlPerCup * cupCount;

  return (
    <section className="py-24 bg-gradient-to-b from-[#171717] via-espresso/30 to-[#171717] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Barista Course</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
            Interactive Coffee Brewing Guides
          </h2>
          <p className="text-cream/70 text-sm font-light">
            Select your brewing method and calculate exact water-to-coffee ratios for perfect extraction.
          </p>
        </div>

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          {BREW_GUIDES.map(guide => {
            const isActive = guide.id === selectedGuideId;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedGuideId(guide.id)}
                className={`py-3.5 px-4 rounded-2xl border text-sm font-serif font-bold transition-all text-center ${
                  isActive
                    ? 'bg-caramel text-cream border-caramel shadow-glow scale-105'
                    : 'bg-dark-card border-white/10 text-cream/70 hover:border-gold/40 hover:text-cream'
                }`}
              >
                {guide.name}
              </button>
            );
          })}
        </div>

        {/* Guide Content Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedGuide.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left: Interactive Ratio Calculator */}
            <div className="lg:col-span-5 bg-dark-card border border-caramel/20 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl glass-card">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-serif font-bold text-2xl text-cream">{selectedGuide.name}</h3>
                  <p className="text-xs text-caramel font-semibold mt-0.5">{selectedGuide.subtitle}</p>
                </div>
                <span className="text-xs bg-espresso border border-caramel/40 text-gold px-3 py-1 rounded-full font-mono">
                  Ratio {selectedGuide.ratio}
                </span>
              </div>

              {/* Dynamic Brew Calculator */}
              <div className="bg-espresso/60 p-5 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cream/80 flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-gold" /> Serving Size:
                  </span>
                  <span className="font-mono text-gold font-bold text-base">{cupCount} Cup{cupCount > 1 ? 's' : ''}</span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={6}
                  value={cupCount}
                  onChange={e => setCupCount(Number(e.target.value))}
                  className="w-full h-2 bg-dark rounded-lg appearance-none cursor-pointer accent-caramel"
                />

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-3 bg-dark-surface rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] uppercase text-cream/50">Coffee Dose</span>
                    <p className="font-mono text-xl font-bold text-caramel">{totalCoffeeGrams}g</p>
                  </div>
                  <div className="p-3 bg-dark-surface rounded-xl border border-white/5 text-center">
                    <span className="text-[10px] uppercase text-cream/50">Water Volume</span>
                    <p className="font-mono text-xl font-bold text-gold">{totalWaterMl}ml</p>
                  </div>
                </div>
              </div>

              {/* Spec Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Thermometer className="w-4 h-4 text-caramel" />
                  <div>
                    <span className="text-cream/50 text-[10px]">Temperature</span>
                    <p className="font-mono font-bold text-cream">{selectedGuide.temp}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-gold" />
                  <div>
                    <span className="text-cream/50 text-[10px]">Brew Time</span>
                    <p className="font-mono font-bold text-cream">{selectedGuide.brewTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="lg:col-span-7 bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h4 className="font-serif font-bold text-xl text-cream border-b border-white/10 pb-4">
                Step-by-Step Extraction Recipe
              </h4>

              <div className="space-y-4">
                {selectedGuide.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-caramel/30 transition-colors flex items-start gap-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-caramel/20 border border-caramel/40 text-caramel font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h5 className="font-serif font-bold text-cream text-base">{step.title}</h5>
                      <p className="text-xs sm:text-sm text-cream/70 mt-1 leading-relaxed">{step.instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
