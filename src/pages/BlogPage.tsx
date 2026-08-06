import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { BookOpen, Clock, Tag, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'Coffee Science', 'Origin Stories', 'Barista Techniques'];

  const filteredPosts = selectedCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-28 pb-24 bg-[#171717] min-h-screen text-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel/10 border border-caramel/30 text-caramel text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Ember Journal</span>
          </div>
          <h1 className="font-serif font-extrabold text-4xl sm:text-6xl text-cream tracking-tight">
            Coffee Science & Origin Insights
          </h1>
          <p className="text-cream/70 text-base font-light">
            In-depth guides on extraction chemistry, water mineral recipes, and highland harvest stories.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex overflow-x-auto justify-center gap-2 mb-12 py-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-caramel text-cream shadow-glow'
                  : 'bg-dark-card border border-white/10 text-cream/70 hover:text-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-card rounded-3xl overflow-hidden border border-white/10 hover:border-caramel/40 transition-all duration-500 hover:shadow-card-hover flex flex-col justify-between group cursor-pointer"
              onClick={() => setActivePost(post)}
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-espresso/40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md border border-gold/40 text-gold text-[10px] uppercase tracking-wider font-semibold px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-cream/50">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3.5 h-3.5" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-cream group-hover:text-gold transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-cream/70 line-clamp-3 leading-relaxed font-light">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={post.authorAvatar}
                    alt={post.author}
                    className="w-7 h-7 rounded-full object-cover border border-caramel"
                  />
                  <span className="text-xs text-cream/80 font-medium">{post.author}</span>
                </div>

                <span className="text-xs text-gold font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-dark-card border border-caramel/30 rounded-3xl max-w-3xl w-full p-6 sm:p-10 my-8 shadow-2xl relative text-cream space-y-6"
            >
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-cream"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-3">
                <span className="text-xs text-caramel uppercase tracking-widest font-semibold">
                  {activePost.category}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-4xl text-cream">
                  {activePost.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-cream/50 border-b border-white/10 pb-4">
                  <span>By {activePost.author} ({activePost.authorRole})</span>
                  <span>•</span>
                  <span>{activePost.date}</span>
                </div>
              </div>

              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
              </div>

              <div className="prose prose-invert max-w-none text-sm text-cream/80 leading-relaxed font-light whitespace-pre-line space-y-4">
                {activePost.content}
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gold" />
                  <div className="flex gap-1.5">
                    {activePost.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full text-cream/70">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setActivePost(null)}
                  className="px-6 py-2.5 rounded-full bg-caramel text-cream font-bold text-xs shadow-glow"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
