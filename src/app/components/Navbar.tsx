"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface NavbarProps {
  isNavOpen: boolean;
  setIsNavOpen: (isOpen: boolean) => void;
}

import { FaHome, FaPaw, FaCog, FaTachometerAlt, FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuthUser } from '../useAuthUser';
import { usePathname } from "next/navigation";

export const Navbar = ({ isNavOpen, setIsNavOpen }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, loading } = useAuthUser();
  const pathname = usePathname();

  // Debug: Log do estado de autenticação
  console.log('🔍 Navbar Debug:', JSON.stringify({ 
    user: user ? { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName,
      photoURL: user.photoURL 
    } : null, 
    loading, 
    isAuthenticated: !!user 
  }, null, 2));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      
      // Mostrar notificação de logout
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🐾 PetGuard - Logout Realizado!', {
          body: 'Você saiu da sua conta. Volte sempre para cuidar dos seus pets!',
          icon: '/images/patas-bg.svg',
          badge: '/images/patas-bg.svg',
          tag: 'logout-notification',
          requireInteraction: false,
          silent: false
        });
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/80 backdrop-blur-2xl shadow-2xl border-b border-green-100"
        : "bg-gradient-to-r from-blue-900 via-blue-800 to-green-600 backdrop-blur-2xl shadow-xl"
    }`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-4">

          {/* Logo circular animado */}
          <div className="flex items-center space-x-4 group select-none">
            <div className="relative w-14 h-14 animate-pulse-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-full shadow-2xl animate-glow"></div>
              <div className="relative w-full h-full bg-white/80 rounded-full p-2 shadow-xl flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2069"
                  alt="Logo PetGuard"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <span className="font-black text-2xl bg-gradient-to-r from-indigo-400 via-pink-400 to-violet-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg animate-gradient-x animate-fade-in select-none">
              PetGuard
            </span>
          </div>

          {/* Menu Principal Premium */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { name: 'Início', href: '/', icon: <FaHome /> },
              { name: 'Dashboard', href: '/dashboard', icon: <FaTachometerAlt /> },
              { name: 'Meus Pets', href: '/meus-pets', icon: <FaPaw /> },
              { name: 'Configurações', href: '/configuracoes', icon: <FaCog /> }
            ].map((link) => {
              const isActive = pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-lg transition-all duration-300 relative
                    ${isActive ? "text-indigo-200 bg-white/10 shadow-lg scale-105 after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-300 after:to-violet-300 after:rounded-full" : "hover:text-indigo-100 hover:bg-white/10 hover:shadow-lg hover:-translate-y-1 hover:scale-105"}
                  `}
                  style={{ willChange: 'transform' }}
                >
                  <span className="text-xl">{link.icon}</span>
                  <span>{link.name}</span>
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-indigo-300 to-violet-300 group-hover:w-full transition-all duration-300"></span>
                </a>
              );
            })}
          </div>

          {/* Botões de Ação Premium */}
          <div className="flex items-center gap-4">
            {/* Notificações */}
            <button className="relative p-3 text-indigo-600 bg-white/80 rounded-full shadow hover:bg-indigo-50 transition-all duration-300 group animate-fade-in" aria-label="Notificações">
              <FaBell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-500 rounded-full text-xs text-white flex items-center justify-center animate-pulse shadow-lg border-2 border-white">3</span>
            </button>
            
            {/* Autenticação */}
            {(!mounted || loading) ? (
              <div className="w-12 h-12 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : !user ? (
              <>
                <a href="/login" className="flex items-center gap-2 px-5 py-2 bg-white/80 text-indigo-600 rounded-xl shadow-lg hover:bg-indigo-100 hover:text-violet-700 transition-all duration-300 font-bold text-lg animate-fade-in border-2 border-indigo-100">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  Entrar
                </a>
                <a href="/cadastro" className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-xl shadow-lg hover:scale-105 hover:from-indigo-600 hover:to-violet-600 transition-all duration-300 font-bold text-lg animate-fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  Cadastrar
                </a>
              </>
            ) : (
              <div className="relative">
                <button 
                  className="flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 group"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="Menu do usuário"
                >
                  {/* Foto do usuário */}
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-200">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "Usuário"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                        <FaUserCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Nome do usuário */}
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      {user.displayName || user.email?.split('@')[0] || "Usuário"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                  
                  {/* Ícone de seta */}
                  <svg 
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Menu suspenso */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl py-2 border border-gray-100 animate-fade-in z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800">
                        {user.displayName || "Usuário"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    
                    <div className="py-1">
                      <a 
                        href="/configuracoes" 
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FaCog className="w-4 h-4" />
                        Configurações
                      </a>
                      
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                </div>
                )}
              </div>
            )}

            {/* Botão de modo escuro/claro */}
            <button
              className="ml-2 w-12 h-12 rounded-full flex items-center justify-center bg-white/70 hover:bg-indigo-100 shadow-lg transition-all duration-300 border-2 border-indigo-100 text-indigo-600 hover:text-violet-600"
              aria-label="Alternar modo claro/escuro"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  document.documentElement.classList.toggle('dark');
                }
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m8.66-12.66l-.71.71M4.05 19.07l-.71.71m16.97 0l-.71-.71M4.05 4.93l-.71-.71M21 12h1M2 12H1" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>

          {/* Menu Mobile Hambúrguer Animado */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 group relative z-50"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Abrir menu"
          >
            <span className={`block w-6 h-0.5 bg-indigo-700 transition-all duration-300 ${isNavOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-indigo-700 my-1 transition-all duration-300 ${isNavOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-indigo-700 transition-all duration-300 ${isNavOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Menu Mobile Overlay Moderno */}
      {isNavOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 flex flex-col items-center justify-center animate-fade-in">
          <ul className="bg-white rounded-2xl shadow-2xl p-10 space-y-8 text-center">
            {[
              { name: 'Início', href: '/' },
              { name: 'Dashboard', href: '/dashboard' },
              { name: 'Meus Pets', href: '/meus-pets' },
              { name: 'Configurações', href: '/configuracoes' }
            ].map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`block text-2xl font-bold px-4 py-2 rounded transition-colors duration-200
                    ${pathname === link.href ? 'text-indigo-700 bg-indigo-100' : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-700'}
                  `}
                  onClick={() => setIsNavOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            
            {/* Usuário logado no mobile */}
            {user && (
              <li className="border-t pt-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-200">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.displayName || "Usuário"}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                        <FaUserCircle className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800">
                      {user.displayName || user.email?.split('@')[0] || "Usuário"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsNavOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaSignOutAlt className="w-4 h-4" />
                  Sair
                </button>
              </li>
            )}
          </ul>
          <button
            className="mt-8 text-gray-400 hover:text-indigo-400 text-lg"
            onClick={() => setIsNavOpen(false)}
            aria-label="Fechar menu"
          >
            Fechar
          </button>
        </div>
      )}
    </nav>
  );
}; 