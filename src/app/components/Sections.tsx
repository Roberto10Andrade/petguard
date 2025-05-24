'use client';

import Image from 'next/image';
import { AnimatedCounter } from './AnimatedCounter';

export const StatsSection = () => (
  <section className="py-24 bg-black relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black"></div>
    <div className="container mx-auto px-4 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">
            <AnimatedCounter end={98} suffix="%" />
          </div>
          <p className="text-xl text-gray-400">Precisão no diagnóstico</p>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">
            <AnimatedCounter end={24} suffix="/7" />
          </div>
          <p className="text-xl text-gray-400">Monitoramento contínuo</p>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-white mb-4">
            <AnimatedCounter end={10000} prefix="+" />
          </div>
          <p className="text-xl text-gray-400">Pets monitorados</p>
        </div>
      </div>
    </div>
  </section>
);

export const FeaturesSection = () => (
  <section className="py-24 bg-black relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-black to-black"></div>
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-white mb-16">Recursos Principais</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "Monitoramento em Tempo Real",
            description: "Acompanhe a saúde do seu pet 24 horas por dia, 7 dias por semana.",
            icon: "📊"
          },
          {
            title: "Inteligência Artificial",
            description: "Análise avançada de dados para prever possíveis problemas de saúde.",
            icon: "🤖"
          },
          {
            title: "Alertas Instantâneos",
            description: "Receba notificações imediatas sobre mudanças no estado do seu pet.",
            icon: "🔔"
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ... Outras seções aqui ... 