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

export const TestimonialsSection = () => (
  <section className="py-24 bg-gradient-to-br from-indigo-900 via-black to-violet-900 relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-white mb-16 animate-fade-in-up">O que dizem os tutores</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[{
          name: "Ana Paula",
          pet: "Thor",
          text: "O PetGuard me deu paz de espírito! Recebo alertas sempre que algo foge do normal com o Thor.",
          img: "https://randomuser.me/api/portraits/women/44.jpg"
        }, {
          name: "Carlos Silva",
          pet: "Mia",
          text: "Acompanhar a saúde da Mia ficou muito mais fácil. Recomendo para todos os tutores!",
          img: "https://randomuser.me/api/portraits/men/32.jpg"
        }, {
          name: "Juliana Souza",
          pet: "Luna",
          text: "A inteligência artificial do PetGuard detectou um problema cedo e salvou a Luna!",
          img: "https://randomuser.me/api/portraits/women/68.jpg"
        }].map((t, i) => (
          <div key={i} className="bg-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center text-center hover:bg-white/20 transition-all duration-300 animate-fade-in-up">
            <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-indigo-400 shadow-lg object-cover" />
            <p className="text-lg text-white mb-4 italic">“{t.text}”</p>
            <span className="font-bold text-indigo-200">{t.name} <span className="font-normal text-indigo-400">&amp; {t.pet}</span></span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const HowItWorksSection = () => (
  <section className="py-24 bg-black relative overflow-hidden">
    <div className="container mx-auto px-4 relative z-10">
      <h2 className="text-5xl font-bold text-center text-white mb-16 animate-fade-in-up">Como funciona?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {[{
          step: 1,
          title: "Cadastro do Pet",
          desc: "Registre seu pet e personalize o perfil.",
          icon: "🐾"
        }, {
          step: 2,
          title: "Conecte o Dispositivo",
          desc: "Sincronize o sensor inteligente ao app.",
          icon: "📡"
        }, {
          step: 3,
          title: "Monitore em Tempo Real",
          desc: "Acompanhe saúde, sono e atividades.",
          icon: "📈"
        }, {
          step: 4,
          title: "Receba Alertas",
          desc: "Notificações instantâneas sobre o pet.",
          icon: "🔔"
        }].map((s, i) => (
          <div key={i} className="flex flex-col items-center bg-white/5 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 animate-fade-in-up">
            <div className="text-5xl mb-4 animate-bounce-slow">{s.icon}</div>
            <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
            <p className="text-gray-400">{s.desc}</p>
            <span className="mt-4 text-indigo-300 font-bold text-lg">Passo {s.step}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ... Outras seções aqui ... 