'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { AnimatedCounter } from './AnimatedCounter';

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2070",
      alt: "Cachorro feliz"
    },
    {
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2070",
      alt: "Gato brincando"
    },
    {
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2064",
      alt: "Pet com seu dono"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-screen overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black to-black"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-40' : 'opacity-0'}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center mix-blend-overlay" 
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          </div>
        ))}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-4xl">
          <div className="inline-block mb-8">
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 text-white px-8 py-3 rounded-full text-lg font-medium relative overflow-hidden group">
              <span className="relative z-10">Novo: Monitoramento em Tempo Real</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-8 md:mb-12 bg-gradient-to-r from-white via-indigo-200 to-violet-200 bg-clip-text text-transparent leading-none">
            PetGuard
          </h1>
          
          <p className="text-3xl md:text-5xl mb-12 md:mb-16 text-gray-200 leading-tight font-light">
            Monitore a saúde e bem-estar do seu pet com tecnologia de ponta e inteligência artificial
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <button className="group relative px-8 sm:px-16 py-4 sm:py-6 bg-gradient-to-r from-indigo-600 to-violet-500 text-white rounded-full text-xl sm:text-2xl font-medium transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30">
              <span className="relative z-10">Comece Agora</span>
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
            <button className="group relative px-8 sm:px-16 py-4 sm:py-6 bg-white/10 text-white rounded-full text-xl sm:text-2xl font-medium backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-white/15">
              <span className="relative z-10">Saiba Mais</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="w-12 h-20 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-2 h-4 bg-white/60 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>
    </section>
  );
};
