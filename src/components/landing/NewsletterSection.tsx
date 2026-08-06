import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Mail, Sparkles, Check, ArrowRight } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const { addToast } = useStore();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      addToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setIsSubscribed(true);
    addToast('Subscribed!', 'Use coupon code EMBER15 for 15% off your first order.', 'success');
  };

  return (
    <section className="py-24 bg-gradient-to-r from-espresso via-espresso-dark to-[#171717] relative overflow-hidden border-y border-caramel/20">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Ember Circle</span>
        </div>

        <h2 className="font-serif font-extrabold text-3xl sm:text-5xl text-cream tracking-tight">
          Unlock 15% Off Your First Micro-Lot Batch
        </h2>

        <p className="text-cream/70 text-base font-light max-w-xl mx-auto">
          Join our private roster of specialty coffee enthusiasts. Receive early access to rare micro-lots, barista extraction guides, and private roastery invitations.
        </p>

        {isSubscribed ? (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-caramel/20 border border-caramel/50 text-gold flex items-center justify-center gap-3 text-sm font-semibold shadow-glow">
            <Check className="w-5 h-5 text-gold shrink-0" />
            <span>Welcome to Ember Circle! Your 15% coupon code is: <strong className="text-cream underline font-mono">EMBER15</strong></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Mail className="w-5 h-5 text-cream/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full bg-dark-card border border-white/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-cream placeholder-cream/40 focus:outline-none focus:border-caramel transition-colors"
                required
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-caramel to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105 shrink-0"
            >
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
