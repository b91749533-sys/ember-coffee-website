import React, { useEffect, useRef } from 'react';
import { useStore } from '../../context/StoreContext';
import { Flame, ArrowRight, Compass, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setActivePage } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated Canvas Coffee Steam particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      vy: number;
      vx: number;
    }[] = [];

    // Create initial steam particles centered around hero coffee cup
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: width * 0.75 + (Math.random() - 0.5) * 120,
        y: height * 0.5 + Math.random() * 200,
        radius: Math.random() * 25 + 15,
        alpha: Math.random() * 0.15 + 0.05,
        vy: -Math.random() * 1.2 - 0.4,
        vx: (Math.random() - 0.5) * 0.6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.y * 0.01) * 0.4;
        p.alpha -= 0.0008;

        if (p.alpha <= 0 || p.y < height * 0.1) {
          p.x = width * 0.75 + (Math.random() - 0.5) * 120;
          p.y = height * 0.75;
          p.alpha = Math.random() * 0.15 + 0.05;
        }

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(198, 124, 78, ${p.alpha * 1.2})`);
        gradient.addColorStop(0.5, `rgba(214, 168, 95, ${p.alpha * 0.6})`);
        gradient.addColorStop(1, 'rgba(23, 23, 23, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-b from-[#171717] via-[#2C1810]/40 to-[#171717]">
      {/* Animated Steam Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10 opacity-70 hidden md:block"
      />

      {/* Atmospheric Radial Glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-caramel/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-caramel/10 border border-caramel/30 backdrop-blur-md"
            >
              <Flame className="w-4 h-4 text-caramel animate-pulse" />
              <span className="text-xs uppercase tracking-widest text-gold font-semibold">
                Micro-Batch Specialty Roastery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-cream leading-[1.08]"
            >
              Crafted to <br />
              <span className="text-gradient-gold italic font-normal">Ignite</span> Your Morning.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl text-cream/75 max-w-xl font-sans font-light leading-relaxed"
            >
              Small-batch specialty coffee roasted with precision and passion. Discover rare single-origin micro-lots, rich signature blends, and artisanal brewing gear.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={() => setActivePage('shop')}
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-caramel via-caramel-dark to-espresso text-cream font-semibold text-sm tracking-wide shadow-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 font-bold">Shop Coffee</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => setActivePage('about')}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-cream font-semibold text-sm tracking-wide backdrop-blur-md transition-all duration-300 hover:border-gold/50 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-gold" />
                <span>Explore Our Story</span>
              </button>
            </motion.div>

            {/* Key Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10"
            >
              <div>
                <div className="flex items-center gap-1 text-gold font-bold text-xl sm:text-2xl font-serif">
                  <span>4.9</span>
                  <Star className="w-4 h-4 fill-gold text-gold" />
                </div>
                <p className="text-xs text-cream/60 mt-0.5">Over 2,400+ 5-Star Reviews</p>
              </div>

              <div>
                <p className="text-gold font-bold text-xl sm:text-2xl font-serif">100%</p>
                <p className="text-xs text-cream/60 mt-0.5">Direct-Trade Ethically Sourced</p>
              </div>

              <div>
                <p className="text-gold font-bold text-xl sm:text-2xl font-serif">24h</p>
                <p className="text-xs text-cream/60 mt-0.5">Fresh Roast to Door Dispatch</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Product Display */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Outer Glowing Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-caramel via-gold to-espresso blur-2xl opacity-40 animate-pulse-slow" />

              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden border border-caramel/30 shadow-2xl glass-panel group p-2">
                <div className="relative h-[420px] sm:h-[480px] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1000&q=80"
                    alt="Ember Signature Coffee Cup"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-80" />

                  {/* Floating Flavor Badge */}
                  <div className="absolute top-4 right-4 glass-card px-3.5 py-2 rounded-2xl border border-gold/40 flex items-center gap-2 shadow-glass animate-float">
                    <Sparkles className="w-4 h-4 text-gold" />
                    <div>
                      <p className="text-[10px] uppercase text-cream/60 tracking-wider">Flavor Profile</p>
                      <p className="text-xs font-serif font-bold text-gold">Dark Cocoa & Honey</p>
                    </div>
                  </div>

                  {/* Product Title Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark/70 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] uppercase tracking-widest text-caramel font-semibold">
                      Featured Micro-Lot
                    </span>
                    <h3 className="font-serif font-bold text-xl text-cream mt-0.5">
                      Ember Signature Blend
                    </h3>
                    <p className="text-xs text-cream/70 line-clamp-1 mt-1">
                      Guatemala & Ethiopia washed Heirloom beans.
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                      <span className="font-mono text-gold font-bold text-lg">$24.00</span>
                      <button
                        onClick={() => setActivePage('shop')}
                        className="text-xs text-cream font-semibold hover:text-gold flex items-center gap-1"
                      >
                        Quick Shop <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
