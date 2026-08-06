import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturedCollection } from '../components/landing/FeaturedCollection';
import { WhyEmber } from '../components/landing/WhyEmber';
import { BestSellers } from '../components/landing/BestSellers';
import { CoffeeJourney } from '../components/landing/CoffeeJourney';
import { BrewingGuide } from '../components/landing/BrewingGuide';
import { Testimonials } from '../components/landing/Testimonials';
import { InstagramGallery } from '../components/landing/InstagramGallery';
import { NewsletterSection } from '../components/landing/NewsletterSection';

export const LandingPage: React.FC<{ onSelectProduct?: (id: string) => void }> = ({ onSelectProduct }) => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <FeaturedCollection onSelectProduct={onSelectProduct} />
      <WhyEmber />
      <BestSellers onSelectProduct={onSelectProduct} />
      <CoffeeJourney />
      <BrewingGuide />
      <Testimonials />
      <InstagramGallery />
      <NewsletterSection />
    </main>
  );
};
