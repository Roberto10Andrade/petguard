"use client";
import { FaCog, FaBell, FaUserCircle, FaLock, FaSave } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function ConfiguracoesPage() {
  const [salvo, setSalvo] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [fotoUrl, setFotoUrl] = useState('');
  const [notificacoes, setNotificacoes] = useState(true);
  const [tema, setTema] = useState('claro');
  const [idioma, setIdioma] = useState('pt');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [erro, setErro] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (!u) return;
      setUser(u);
      setNome(u.displayName || '');
      setEmail(u.email || '');
      setFotoUrl(u.photoURL || '');
      // Carrega preferências do Firestore
      const docRef = doc(db, 'users', u.uid);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        const data = snap.data();
        setNotificacoes(data.notificacoes ?? true);
        setTema(data.tema ?? 'claro');
        setIdioma(data.idioma ?? 'pt');
      }
    });
    return () => unsub();
  }, []);

  const handleSalvar = async (e: any) => {
    e.preventDefault();
    setErro(''); setMsg('');
    try {
      // Atualiza nome e foto no Auth
      let newPhotoUrl = fotoUrl;
      if (foto) {
        const storageRef = ref(storage, `users/${user.uid}_profile_${Date.now()}`);
        await uploadBytes(storageRef, foto);
        newPhotoUrl = await getDownloadURL(storageRef);
        setFotoUrl(newPhotoUrl);
      }
      await updateProfile(user, { displayName: nome, photoURL: newPhotoUrl });
      // Atualiza e-mail
      if (email !== user.email) {
        await updateEmail(user, email);
      }
      // Salva preferências no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        notificacoes,
        tema,
        idioma,
        nome,
        email,
        fotoUrl: newPhotoUrl
      }, { merge: true });
      setMsg('Configurações salvas com sucesso!');
      setSalvo(true);
      setTimeout(() => setSalvo(false), 1800);
    } catch (err: any) {
      setErro('Erro ao salvar configurações.');
    }
  };

  const handleAlterarSenha = async (e: any) => {
    e.preventDefault();
    setErro(''); setMsg('');
    try {
      await updatePassword(user, novaSenha);
      setMsg('Senha alterada com sucesso!');
      setSenhaAtual(''); setNovaSenha('');
    } catch (err: any) {
      setErro('Erro ao alterar senha. Faça login novamente para alterar a senha.');
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Faça login para acessar as configurações.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 py-24 flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 flex items-center gap-3 drop-shadow-lg">
        <FaCog className="text-green-400 animate-spin-slow" /> Configurações
      </h1>
      <form onSubmit={handleSalvar} className="w-full max-w-2xl bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 animate-fade-in">
        <div className="flex items-center gap-4">
          <img src={fotoUrl || '/images/patas-bg.svg'} alt="Foto de perfil" className="w-16 h-16 rounded-full border-4 border-blue-200 object-cover" />
          <div className="flex-1">
            <label className="font-bold text-blue-900">Nome
              <input type="text" className="mt-1 w-full rounded-xl border border-blue-200 px-4 py-2" value={nome} onChange={e => setNome(e.target.value)} required />
            </label>
            <label className="font-bold text-blue-900 mt-2 block">E-mail
              <input type="email" className="mt-1 w-full rounded-xl border border-blue-200 px-4 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label className="font-bold text-blue-900 mt-2 block">Foto de Perfil
              <input type="file" accept="image/*" className="mt-1 w-full" onChange={e => setFoto(e.target.files?.[0] || null)} />
            </label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaBell className="text-3xl text-yellow-400" />
          <div className="flex-1">
            <label className="font-bold text-blue-900">Notificações</label>
            <div className="text-blue-700 text-sm">Receber alertas sobre saúde, alimentação e localização do pet.</div>
          </div>
          <input type="checkbox" className="w-6 h-6 accent-green-400" checked={notificacoes} onChange={e => setNotificacoes(e.target.checked)} />
        </div>
        <div className="flex items-center gap-4">
          <FaCog className="text-3xl text-green-400" />
          <div className="flex-1">
            <label className="font-bold text-blue-900">Preferências</label>
            <div className="flex gap-4 mt-2">
              <select className="rounded-xl border border-blue-200 px-4 py-2" value={tema} onChange={e => setTema(e.target.value)}>
                <option value="claro">Tema Claro</option>
                <option value="escuro">Tema Escuro</option>
              </select>
              <select className="rounded-xl border border-blue-200 px-4 py-2" value={idioma} onChange={e => setIdioma(e.target.value)}>
                <option value="pt">Português</option>
                <option value="en">Inglês</option>
              </select>
            </div>
          </div>
        </div>
        <button type="submit" className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 self-end">
          <FaSave /> Salvar
        </button>
        {salvo && <div className="text-green-600 font-bold text-center animate-fade-in">Configurações salvas com sucesso!</div>}
      </form>
      <form onSubmit={handleAlterarSenha} className="w-full max-w-2xl bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 flex flex-col gap-6 animate-fade-in mt-8">
        <div className="flex items-center gap-4">
          <FaLock className="text-3xl text-pink-400" />
          <div className="flex-1">
            <label className="font-bold text-blue-900">Alterar Senha</label>
            <input type="password" className="mt-2 w-full rounded-xl border border-blue-200 px-4 py-2" placeholder="Nova senha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)} required />
          </div>
        </div>
        <button type="submit" className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 self-end">
          Alterar Senha
        </button>
        {erro && <div className="text-red-600 font-bold text-center animate-pulse">{erro}</div>}
        {msg && <div className="text-green-600 font-bold text-center animate-fade-in">{msg}</div>}
      </form>
    </div>
  );
} 