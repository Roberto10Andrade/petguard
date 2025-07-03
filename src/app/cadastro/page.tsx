"use client";

import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import Image from "next/image";

export default function CadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para solicitar permissão de notificação
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return Notification.permission === 'granted';
    }
    return false;
  };

  // Função para mostrar notificação de cadastro
  const showSignupNotification = (userName: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('🐾 PetGuard - Cadastro Realizado!', {
        body: `Parabéns, ${userName}! Sua conta foi criada com sucesso no PetGuard.`,
        icon: '/images/patas-bg.svg',
        badge: '/images/patas-bg.svg',
        tag: 'signup-notification',
        requireInteraction: false,
        silent: false
      });
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Cadastro realizado com sucesso! Você já pode fazer login.");
      setEmail(""); setPassword(""); setConfirmPassword("");
    } catch (err: any) {
      let message = "Erro ao cadastrar.";
      if (err.code === "auth/email-already-in-use") {
        message = "Este e-mail já está cadastrado.";
      } else if (err.code === "auth/invalid-email") {
        message = "E-mail inválido.";
      } else if (err.code === "auth/weak-password") {
        message = "A senha deve ter pelo menos 6 caracteres.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userName = result.user.displayName || result.user.email?.split('@')[0] || 'Usuário';
      
      // Solicitar permissão e mostrar notificação
      await requestNotificationPermission();
      showSignupNotification(userName);
      
      setSuccess("Cadastro realizado com sucesso! Você já está logado.");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (err: any) {
      let message = "Erro ao cadastrar com Google.";
      if (err.code === "auth/account-exists-with-different-credential") {
        message = "Já existe uma conta com esse e-mail usando outro método.";
      } else if (err.code === "auth/popup-closed-by-user") {
        message = "Cadastro cancelado.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 relative overflow-hidden">
      <div className="w-full max-w-5xl min-h-[80vh] flex flex-col md:flex-row items-center justify-center mx-auto select-none py-16 relative z-10 gap-10 animate-fade-in-up">
        <div className="hidden md:flex flex-1 items-center justify-center h-full">
          <Image
            src="/images/imgsq.png"
            alt="Mulher sentada com cachorro e celular, monitorando o pet pelo app PetGuard"
            width={420}
            height={600}
            className="rounded-3xl shadow-2xl border-4 border-white/70 object-contain animate-fade-in"
            priority
          />
        </div>
        <div className="flex-1 flex items-center justify-center w-full">
          <form onSubmit={handleCadastro} className="backdrop-blur-2xl bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 md:p-14 w-full max-w-md animate-fade-in relative z-20 mt-0">
            <div className="flex flex-col items-center mb-6">
              <span className="text-2xl font-black text-blue-700 mb-1 drop-shadow">Bem-vindo ao PetGuard!</span>
              <span className="text-base text-blue-800 text-center">Cadastre-se para cuidar melhor do seu pet.</span>
            </div>
            <div className="mb-2 flex items-center justify-center">
              <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium animate-fade-in-up">
                Use um e-mail válido e senha forte para garantir a segurança do seu pet.
              </span>
            </div>
            <h2 className="flex items-center justify-center gap-2 text-2xl font-extrabold text-indigo-700 mb-6 text-center tracking-tight drop-shadow-lg">
              <FaUser className="text-green-400" /> Cadastro PetGuard
            </h2>
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 py-3 mb-6 rounded-xl bg-white border border-indigo-200 shadow hover:bg-indigo-50 hover:shadow-md transition-all font-semibold text-indigo-700 text-base disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label="Cadastrar com Google"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.36 1.54 7.82 2.83l5.75-5.76C33.78 3.24 29.36 1 24 1 14.82 1 6.96 6.58 3.13 14.14l6.92 5.37C12.1 14.09 17.57 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.59-.14-3.12-.41-4.55H24v9.1h12.4c-.53 2.87-2.13 5.3-4.53 6.95l7.02 5.46C43.85 37.08 46.1 31.29 46.1 24.55z"/><path fill="#FBBC05" d="M10.05 28.73a14.5 14.5 0 0 1 0-9.46l-6.92-5.37A23.97 23.97 0 0 0 1 24c0 3.91.94 7.62 2.58 10.83l7.16-6.1z"/><path fill="#EA4335" d="M24 46.5c6.36 0 11.7-2.1 15.6-5.74l-7.02-5.46c-1.95 1.31-4.45 2.09-8.58 2.09-6.43 0-11.9-4.59-13.95-10.7l-7.16 6.1C6.96 41.42 14.82 46.5 24 46.5z"/></g></svg>
              Cadastrar com Google
            </button>
            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2" htmlFor="email">E-mail</label>
              <div className="relative flex items-center">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-indigo-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white text-blue-900 font-semibold shadow-sm"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2" htmlFor="password">Senha</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-indigo-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white text-blue-900 font-semibold shadow-sm"
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-green-400 transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-indigo-700 font-semibold mb-2" htmlFor="confirmPassword">Confirmar Senha</label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-indigo-200 focus:border-green-400 focus:ring-2 focus:ring-green-200 outline-none transition-all bg-white text-blue-900 font-semibold shadow-sm"
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-green-400 transition-colors"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                  aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            {error && <div className="mb-4 text-red-500 text-center font-semibold animate-pulse">{error}</div>}
            {success && <div className="mb-4 text-green-600 text-center font-semibold animate-fade-in">{success}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">Cadastrando...</span>
              ) : (
                <>
                  <FaUser /> Cadastrar
                </>
              )}
            </button>
            <div className="mt-6 text-center text-indigo-700">
              Já tem conta? <Link href="/login" className="font-bold hover:underline">Entrar</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
