import React from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      likes: '1,420',
      tag: '#EmberMorning'
    },
    {
      url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
      likes: '980',
      tag: '#YirgacheffeHarvest'
    },
    {
      url: 'https://images.unsplash.com/photo-1517668808822-9ebe02f2a6e8?auto=format&fit=crop&w=800&q=80',
      likes: '2,100',
      tag: '#V60PourOver'
    },
    {
      url: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
      likes: '1,850',
      tag: '#LoringRoaster'
    },
    {
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
      likes: '3,200',
      tag: '#SignatureBlend'
    },
    {
      url: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
      likes: '1,640',
      tag: '#BaristaLife'
    }
  ];

  return (
    <section className="py-24 bg-dark-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-caramel text-xs font-semibold uppercase tracking-widest mb-2">
              <Camera className="w-4 h-4" />
              <span>@EmberCoffeeRoasters</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-cream">
              The Ember Journal on Instagram
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-cream text-xs font-semibold hover:border-gold hover:text-gold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Follow Our Roastery</span>
          </a>
        </div>

        {/* Pinterest-Style Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-espresso/40 cursor-pointer shadow-lg"
            >
              <img
                src={item.url}
                alt={item.tag}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <span className="text-xs font-mono font-bold text-gold">{item.tag}</span>
                <div className="flex items-center gap-1.5 text-cream text-xs font-semibold mt-1">
                  <Heart className="w-4 h-4 fill-caramel text-caramel" />
                  <span>{item.likes} likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
