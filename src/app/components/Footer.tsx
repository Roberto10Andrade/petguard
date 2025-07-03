import { FaPaw, FaQuestionCircle, FaInstagram, FaFacebook, FaTwitter, FaEnvelope } from 'react-icons/fa';
import React from 'react';

export default function Footer() {
  return (
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
  );
} 