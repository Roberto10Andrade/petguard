"use client";

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StatsSection, FeaturesSection } from './components/Sections';

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  return (
    <main className="min-h-screen bg-black">
      <Navbar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
    </main>
  );
}
