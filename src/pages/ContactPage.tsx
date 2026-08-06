import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Order Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const faqs = [
    {
      q: 'How fresh is Ember coffee when it arrives?',
      a: 'We roast every batch to order in small micro-lots. Packages are dispatched within 24 hours of roasting in oxygen-barrier bags with one-way degas valves.'
    },
    {
      q: 'What is your free shipping threshold?',
      a: 'We offer Free Express Shipping on all U.S. orders above $50. Standard shipping for orders under $50 is a flat rate of $6.00.'
    },
    {
      q: 'Can I change my grind size after placing an order?',
      a: 'If your order has not entered roasting (usually within 2 hours of placement), contact our support team immediately and we will update your grind selection.'
    },
    {
      q: 'How does Ember Perks Loyalty Rewards work?',
      a: 'You earn 10 Ember Perks points for every dollar spent. Every 500 points can be redeemed for a free 250g bag of any signature roast!'
    }
  ];

  const filteredFaqs = faqs.filter(
    f => f.q.toLowerCase().includes(faqSearch.toLowerCase()) || f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    addToast('Message Sent', 'Our master roaster team will reply within 4 hours.', 'success');
  };

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Roastery Concierge</span>
          </div>
          <h1 className="font-serif font-extrabold text-4xl sm:text-6xl text-cream tracking-tight">
            We’d Love to Hear From You
          </h1>
          <p className="text-cream/70 text-base font-light">
            Questions about extraction recipes, wholesale partnerships, or active orders? Reach out to our baristas.
          </p>
        </div>

        {/* Contact Form & Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h3 className="font-serif font-bold text-2xl text-cream border-b border-white/10 pb-4">
                Roastery Flagship HQ
              </h3>

              <div className="space-y-4 text-xs font-sans">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-cream block">Ember Coffee Roasters</strong>
                    <span className="text-cream/60">742 Mission Street, Suite 400</span>
                    <span className="text-cream/60 block">San Francisco, CA 94103</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-caramel shrink-0" />
                  <div>
                    <strong className="text-cream block">Direct Email</strong>
                    <span className="text-cream/60">support@embercoffee.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <strong className="text-cream block">Telephone</strong>
                    <span className="text-cream/60">+1 (800) 555-EMBER</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-espresso/50 border border-caramel/30 space-y-2">
              <span className="text-xs uppercase font-mono font-bold text-caramel">Roastery Hours</span>
              <p className="text-sm font-serif text-cream font-bold">Monday – Saturday: 6:00 AM – 7:00 PM PST</p>
              <p className="text-xs text-cream/60">Sunday Roast Calibration: 8:00 AM – 4:00 PM PST</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <h3 className="font-serif font-bold text-2xl text-cream border-b border-white/10 pb-4">
              Send Us a Message
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-caramel mx-auto" />
                <h4 className="font-serif font-bold text-2xl text-cream">Message Received!</h4>
                <p className="text-xs text-cream/70 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our barista team will review your message and reply via email within 4 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'Order Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-caramel text-cream font-bold text-xs shadow-glow"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                  >
                    <option value="Order Inquiry">Order Inquiry & Tracking</option>
                    <option value="Brewing Recipe Advice">Brewing Recipe Advice</option>
                    <option value="Wholesale Coffee">Wholesale & Office Roasting</option>
                    <option value="Feedback">Feedback & Press</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-cream/60 mb-1">
                    Your Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can our roasters assist you today?"
                    className="w-full bg-dark border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-cream focus:outline-none focus:border-caramel"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-caramel via-caramel-dark to-espresso hover:from-caramel-dark hover:to-espresso-dark text-cream font-bold text-sm shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" /> Send Message to Roastery
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Searchable FAQ Accordion */}
        <div className="bg-dark-card border border-white/10 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="font-serif font-bold text-2xl text-cream">Frequently Asked Questions</h3>
              <p className="text-xs text-cream/60">Instant answers regarding shipping, roasting, and perks.</p>
            </div>

            <input
              type="text"
              value={faqSearch}
              onChange={e => setFaqSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="bg-dark border border-white/15 rounded-full px-4 py-1.5 text-xs text-cream placeholder-cream/40 focus:outline-none focus:border-caramel w-full sm:w-64"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 transition-colors"
                >
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-sm font-serif font-bold text-cream hover:text-gold"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-caramel transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-xs text-cream/70 font-sans font-light leading-relaxed border-t border-white/5 pt-2"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
