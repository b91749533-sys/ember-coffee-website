import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Camera, Globe, Share2, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, addToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to Ember Circle!', 'Check your inbox for your 15% discount code EMBER15.', 'success');
  };

  const handleNav = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-espresso-dark text-cream border-t border-caramel/20 pt-20 pb-12 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-cream/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-espresso via-caramel/80 to-gold/90 p-[1px] shadow-glow">
                <div className="w-full h-full bg-[#171717] rounded-[11px] flex items-center justify-center">
                  <span className="font-serif font-extrabold text-gold text-lg leading-none">
                    EC
                  </span>
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-cream">
                EMBER COFFEE
              </span>
            </div>

            <p className="text-cream/70 text-sm leading-relaxed max-w-sm">
              "Every Cup Starts with a Spark."
              <br />
              Artisanal micro-lot specialty coffee roasted in small batches with uncompromising passion and precision.
            </p>

            <div className="flex items-center gap-4 text-cream/70">
              {[
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: Globe, href: '#', label: 'Website' },
                { icon: Share2, href: '#', label: 'Community' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cream/80 hover:text-gold hover:border-gold hover:bg-gold/10 transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-cream text-base tracking-wide uppercase text-xs text-gold">
              Specialty Coffees
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70 font-sans">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-cream transition-colors">
                  Single Origin Micro-Lots
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-cream transition-colors">
                  Ember Signature Blends
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-cream transition-colors">
                  Velvet Espresso Series
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-cream transition-colors">
                  Dark Roast Classics
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-cream transition-colors">
                  Precision Brewing Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Experience */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-cream text-base tracking-wide uppercase text-xs text-gold">
              The Experience
            </h4>
            <ul className="space-y-2.5 text-sm text-cream/70 font-sans">
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-cream transition-colors">
                  Our Story & Philosophy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-cream transition-colors">
                  Coffee Science Journal
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('landing')} className="hover:text-cream transition-colors">
                  Interactive Brewing Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-cream transition-colors">
                  Contact Roastery Support
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('dashboard')} className="hover:text-cream transition-colors">
                  Ember Perks Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-cream text-base tracking-wide uppercase text-xs text-gold">
              Join Ember Circle
            </h4>
            <p className="text-xs text-cream/70 leading-relaxed">
              Subscribe to receive micro-lot releases, barista brewing secrets, and 15% off your first order.
            </p>

            {subscribed ? (
              <div className="p-3 bg-caramel/20 border border-caramel/40 rounded-xl flex items-center gap-2 text-gold text-xs font-medium">
                <Check className="w-4 h-4 shrink-0" />
                <span>Subscribed! Use code <strong>EMBER15</strong> for 15% off.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-dark-card/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-caramel transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 bg-caramel hover:bg-caramel-dark text-cream px-3 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-cream/50 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} Ember Coffee Roasters. All rights reserved.</p>
          
          <div className="flex items-center gap-2 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="text-cream/80">Built by Youssef Manssouri</span>
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => handleNav('contact')} className="hover:text-cream transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-cream transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
