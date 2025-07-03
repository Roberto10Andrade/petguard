"use client";

import { FaPaw, FaShieldAlt, FaHome, FaTachometerAlt, FaPaw as FaPet, FaCog, FaSignInAlt, FaUserPlus, FaMapMarkerAlt, FaChartLine, FaQuestionCircle, FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaMobileAlt, FaBone, FaDog, FaCat, FaHeart, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import PetCarousel from './components/PetCarousel';
import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Importação dinâmica do LottiePlayer para evitar SSR issues
const LottiePlayer = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-inter relative overflow-x-hidden">
      <AnimatedParticlesBG />
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto pt-32 pb-16 px-6 gap-8 overflow-hidden z-10">
        {/* Texto à esquerda */}
        <div className="flex-1 flex flex-col items-start gap-6 z-10">
          <h1 className="text-4xl md:text-6xl font-black text-blue-900 leading-tight">
            Cuidar do seu pet ficou mais fácil com a Petguard
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 max-w-lg">
            Monitore a saúde, alimentação e localização do seu animal em tempo real.
          </p>
          <button className="mt-4 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300">
            Acompanhar meu pet
          </button>
        </div>
        {/* Ilustração à direita */}
        <div className="flex-1 flex items-center justify-center z-10">
          <Image
            src="/images/ChatGPT Image 1 de jul. de 2025, 11_33_39.png"
            alt="Gato e cachorro amigos"
            width={420}
            height={420}
            className="rounded-3xl border-4 border-blue-200 shadow-xl object-contain bg-white/70 rotate-2 hover:scale-105 hover:shadow-2xl transition-all duration-300 max-w-[98vw] md:max-w-md"
            priority
          />
        </div>
      </section>

      {/* Sobre o Projeto / Objetivo Geral */}
      <section className="max-w-5xl mx-auto my-20 px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Texto */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">Por que a Petguard?</h2>
          <p className="text-lg text-blue-800 mb-2">
            A Petguard é uma plataforma inteligente para monitoramento da saúde, alimentação e localização do seu pet. Nosso objetivo é facilitar o cuidado diário, trazendo tecnologia, segurança e tranquilidade para tutores e seus animais.
          </p>
        </div>
        {/* Ícone ilustrativo */}
        <div className="flex justify-center md:justify-end">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="drop-shadow-xl">
            <circle cx="60" cy="60" r="56" fill="#e0f2fe" />
            <path d="M60 90c-12-8-28-18-28-34a18 18 0 0136 0 18 18 0 0136 0c0 16-16 26-28 34z" fill="#38bdf8"/>
            <ellipse cx="60" cy="60" rx="10" ry="14" fill="#fff"/>
            <path d="M60 70a6 6 0 100-12 6 6 0 000 12z" fill="#38bdf8"/>
          </svg>
        </div>
      </section>

      {/* Funcionalidades / Objetivos Específicos */}
      <section className="max-w-6xl mx-auto my-20 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-10 text-center">Funcionalidades</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <FuncionalidadeCard
            icon={<span className="text-4xl animate-bounce">🛰️</span>}
            title="Monitoramento por GPS"
          />
          <FuncionalidadeCard
            icon={<span className="text-4xl animate-pulse">🏃</span>}
            title="Atividades Físicas Registradas"
          />
          <FuncionalidadeCard
            icon={<span className="text-4xl animate-bounce">🍽️</span>}
            title="Controle Automático de Ração"
          />
          <FuncionalidadeCard
            icon={<span className="text-4xl animate-float">📱</span>}
            title="Dashboard Web e Mobile"
          />
          <FuncionalidadeCard
            icon={<span className="text-4xl animate-pulse">⚠️</span>}
            title="Alertas Inteligentes de Saúde"
          />
        </div>
      </section>

      {/* Demonstração Interativa */}
      <section className="max-w-5xl mx-auto my-20 px-4 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-8 text-center">Veja a Petguard em ação</h2>
        <DemoShowcase />
        <p className="text-blue-700 mt-6 text-center max-w-2xl">
          Navegue pelas telas ou veja a animação para entender como é fácil acompanhar a saúde, localização e alimentação do seu pet em tempo real!
        </p>
      </section>

      {/* Rodapé */}
      <footer className="bg-gradient-to-r from-blue-900 via-violet-900 to-green-900 py-10 text-white text-center border-t border-white/10 mt-auto">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <FaPaw className="w-7 h-7 text-blue-200" />
            <span className="font-black text-xl bg-gradient-to-r from-blue-400 via-violet-400 to-green-400 bg-clip-text text-transparent tracking-tight">PetGuard</span>
          </div>
          <div className="flex gap-6 justify-center">
            <a href="#" className="hover:text-blue-300 transition-colors flex items-center gap-1"><FaEnvelope /> Contato</a>
            <a href="#" className="hover:text-blue-300 transition-colors flex items-center gap-1"><FaQuestionCircle /> FAQ</a>
          </div>
          <div className="flex gap-4 justify-center md:justify-end">
            <a href="#" aria-label="Instagram" className="hover:text-pink-400 transition-colors"><FaInstagram className="w-6 h-6" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors"><FaFacebook className="w-6 h-6" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors"><FaTwitter className="w-6 h-6" /></a>
          </div>
        </div>
        <div className="mt-6 text-blue-200 text-xs">&copy; {new Date().getFullYear()} PetGuard. Todos os direitos reservados.</div>
      </footer>
    </div>
  );
}

// Mascote SVG animado
const Mascote = () => (
  <svg width="60" height="60" viewBox="0 0 80 80" fill="none" className="animate-bounce-slow mx-auto mb-2" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="40" cy="60" rx="18" ry="10" fill="#a5b4fc"/>
    <ellipse cx="20" cy="40" rx="7" ry="10" fill="#818cf8"/>
    <ellipse cx="60" cy="40" rx="7" ry="10" fill="#818cf8"/>
    <ellipse cx="30" cy="25" rx="5" ry="7" fill="#6366f1"/>
    <ellipse cx="50" cy="25" rx="5" ry="7" fill="#6366f1"/>
  </svg>
);

// Animação de partículas SVG e ícones no fundo
const AnimatedParticlesBG = () => (
  <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
    {/* Ícones realistas e coloridos espalhados (quantidade aumentada) */}
    {[...Array(44)].map((_, i) => {
      const icons = [
        <FaPaw key="paw" className="drop-shadow-lg" color="#38bdf8" />,
        <FaBone key="bone" className="drop-shadow-md" color="#fde68a" />,
        <FaDog key="dog" className="drop-shadow-md" color="#fbbf24" />,
        <FaCat key="cat" className="drop-shadow-md" color="#818cf8" />,
        <FaHeart key="heart" className="drop-shadow-md" color="#f87171" />,
        <FaStar key="star" className="drop-shadow-md" color="#facc15" />,
      ];
      const icon = icons[i % icons.length];
      const sizes = [36, 44, 52, 60, 48, 40];
      const size = sizes[i % sizes.length];
      const left = `${(i * 13 + (i % 3) * 17) % 100}%`;
      const top = `${(i * 19 + (i % 5) * 11) % 100}%`;
      const style = {
        left,
        top,
        opacity: 0.18 + (i % 4) * 0.10,
        filter: `blur(${i % 2 === 0 ? 0 : 1.5}px)`,
        animation: `floatY 7s ease-in-out infinite`,
        animationDelay: `${i * 0.5}s`,
        zIndex: 0,
        position: 'absolute' as const,
        width: size,
        height: size,
      };
      return (
        <div key={i} style={style} className="animated-particle">
          {React.cloneElement(icon, { size })}
        </div>
      );
    })}
    {/* Partículas pequenas (bolinhas) */}
    {[...Array(36)].map((_, i) => (
      <svg key={i} className="absolute animated-particle" style={{
        left: `${(i * 7 + (i % 4) * 13) % 100}%`,
        top: `${(i * 11 + (i % 6) * 17) % 100}%`,
        opacity: 0.10 + (i % 3) * 0.07,
        filter: `blur(${i % 2 === 0 ? 1 : 2.5}px)`,
        animation: `floatX 9s ease-in-out infinite`,
        animationDelay: `${i * 0.3}s`,
        zIndex: 0,
      }} width={10 + (i % 5) * 7} height={10 + (i % 4) * 7} viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="10" fill="#60a5fa" />
      </svg>
    ))}
    <style>{`
      @keyframes floatY {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-24px) scale(1.08); }
      }
      @keyframes floatX {
        0%, 100% { transform: translateX(0px) scale(1); }
        50% { transform: translateX(18px) scale(0.95); }
      }
    `}</style>
  </div>
);

// Ilustração: pet feliz, tutor com celular, mockup do app
const PetAndTutorMockup = () => (
  <div className="relative flex flex-col items-center">
    {/* Tutor com celular */}
    <svg width="90" height="160" viewBox="0 0 90 160" className="mb-2 animate-float" fill="none">
      <ellipse cx="45" cy="150" rx="35" ry="10" fill="#e0e7ef"/>
      <rect x="30" y="60" width="30" height="60" rx="15" fill="#fbbf24"/>
      <rect x="40" y="100" width="10" height="20" rx="5" fill="#2563eb"/>
      <rect x="38" y="120" width="14" height="24" rx="7" fill="#fff" stroke="#2563eb" strokeWidth="2"/>
      <rect x="44" y="130" width="2" height="8" rx="1" fill="#2563eb"/>
    </svg>
    {/* Pet feliz */}
    <svg width="120" height="100" viewBox="0 0 120 100" className="absolute left-20 top-24 animate-float-slow" fill="none">
      <ellipse cx="60" cy="90" rx="50" ry="10" fill="#a5f3fc"/>
      <ellipse cx="60" cy="60" rx="40" ry="30" fill="#fde68a"/>
      <ellipse cx="60" cy="40" rx="15" ry="15" fill="#fbbf24"/>
      <ellipse cx="80" cy="50" rx="7" ry="15" fill="#fbbf24"/>
      <ellipse cx="40" cy="50" rx="7" ry="15" fill="#fbbf24"/>
      <circle cx="60" cy="60" r="6" fill="#1e293b"/>
      <ellipse cx="60" cy="75" rx="5" ry="2" fill="#1e293b"/>
    </svg>
    {/* Mockup do app */}
    <div className="relative mt-8 animate-float">
      <div className="w-40 h-64 bg-white rounded-3xl shadow-2xl border-4 border-blue-100 flex flex-col items-center justify-between p-4">
        <div className="w-24 h-4 bg-blue-100 rounded-full mb-2" />
        <div className="w-28 h-28 bg-gradient-to-br from-green-200 to-blue-200 rounded-2xl flex items-center justify-center">
          <FaMobileAlt className="text-blue-500 w-12 h-12" />
        </div>
        <div className="w-20 h-4 bg-green-100 rounded-full mt-2" />
        <div className="w-24 h-4 bg-yellow-100 rounded-full mt-2" />
      </div>
    </div>
  </div>
);

// Card de funcionalidade
function FuncionalidadeCard({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center gap-4 border border-blue-100 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer group">
      <div className="text-blue-500 group-hover:text-green-500 transition-all duration-300">{icon}</div>
      <span className="text-lg font-bold text-blue-900 text-center">{title}</span>
    </div>
  );
}

// Carrossel simples de demonstração (mockup)
function DemoCarousel() {
  // Mockup de imagens
  const images = [
    '/images/demo1.png',
    '/images/demo2.png',
    '/images/demo3.png',
  ];
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="w-full max-w-xl flex flex-col items-center">
      <div className="relative w-full h-72 bg-blue-50 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden mb-4">
        <img src={images[idx]} alt={`Demonstração ${idx+1}`} className="object-contain w-full h-full transition-all duration-500" />
        <button onClick={()=>setIdx((idx-1+images.length)%images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-blue-100 transition"><span className="text-2xl">‹</span></button>
        <button onClick={()=>setIdx((idx+1)%images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-blue-100 transition"><span className="text-2xl">›</span></button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, i) => (
          <button key={i} onClick={()=>setIdx(i)} className={`w-3 h-3 rounded-full ${i===idx ? 'bg-blue-500' : 'bg-blue-200'} transition`} />
        ))}
      </div>
    </div>
  );
}

// Demonstração: Lottie se disponível, senão carrossel
function DemoShowcase() {
  // Caminho do arquivo Lottie na public
  const lottieUrl = '/lottie/pet-demo.json';
  const [lottieData, setLottieData] = React.useState<any>(null);
  const [lottieExists, setLottieExists] = React.useState(false);

  React.useEffect(() => {
    fetch(lottieUrl, { method: 'HEAD' })
      .then(res => setLottieExists(res.ok))
      .catch(() => setLottieExists(false));
    if (lottieExists) {
      fetch(lottieUrl)
        .then(res => res.json())
        .then(setLottieData)
        .catch(() => setLottieData(null));
    }
  }, [lottieExists]);

  if (lottieExists && lottieData) {
    return (
      <div className="w-full max-w-xl flex flex-col items-center">
        <div className="w-full h-72 bg-blue-50 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden mb-4">
          <LottiePlayer
            loop
            play
            animationData={lottieData}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>
    );
  }
  return <DemoCarousel />;
}


