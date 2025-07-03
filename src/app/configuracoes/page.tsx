"use client";
import { FaCog, FaBell, FaUserCircle, FaLock, FaSave, FaQuestionCircle, FaFont, FaPalette, FaSignOutAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Link from 'next/link';
import { collection, query, where, getDocs } from 'firebase/firestore';

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
  const [qtdPets, setQtdPets] = useState<number | null>(null);
  const [loadingPets, setLoadingPets] = useState(false);

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
      // Busca quantidade de pets
      setLoadingPets(true);
      const petsQuery = query(collection(db, 'pets'), where('userId', '==', u.uid));
      const petsSnap = await getDocs(petsQuery);
      setQtdPets(petsSnap.size);
      setLoadingPets(false);
    });
    return () => unsub();
  }, []);

  const handleSalvar = async (e: any) => {
    e.preventDefault();
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
      setSalvo(true);
      setTimeout(() => setSalvo(false), 1800);
    } catch (err: any) {
      console.error('Erro ao salvar configurações:', err);
    }
  };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Faça login para acessar as configurações.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 py-24 flex flex-col items-center text-blue-900">
      <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-8 flex items-center gap-3 drop-shadow-lg">
        <FaCog className="text-green-400 animate-spin-slow" /> Configurações
      </h1>
      <form onSubmit={handleSalvar} className="w-full max-w-2xl bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 flex flex-col gap-8 animate-fade-in text-blue-900">
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
        <button type="submit" className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-blue-900 font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 self-end">
          <FaSave /> Salvar
        </button>
        {salvo && <div className="text-green-600 font-bold text-center animate-fade-in">Configurações salvas com sucesso!</div>}
      </form>
      <div className="w-full max-w-2xl mt-8 bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in text-blue-900">
        <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-2">
          <FaLock className="text-pink-400" /> Segurança
        </h2>
        <div className="flex flex-col gap-2">
          <span className="text-blue-900">Último login: {user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString() : '---'}</span>
          <span className="text-blue-900">Autenticação em duas etapas: <span className="font-semibold text-green-600">Em breve</span></span>
          <button type="button" className="text-blue-500 underline w-fit flex items-center gap-1 cursor-not-allowed opacity-60" disabled><FaSignOutAlt /> Sair de todos os dispositivos</button>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in text-blue-900">
        <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-2">
          <FaBell className="text-yellow-400" /> Preferências Avançadas
        </h2>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notificacoes} onChange={e => setNotificacoes(e.target.checked)} />
            Receber notificações por e-mail
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={notificacoes} onChange={e => setNotificacoes(e.target.checked)} />
            Receber notificações push
          </label>
          <label className="flex items-center gap-2">
            <FaFont className="text-blue-400" /> Tamanho da fonte:
            <select className="ml-2 rounded-xl border border-blue-200 px-2 py-1">
              <option>Pequeno</option>
              <option>Médio</option>
              <option>Grande</option>
            </select>
          </label>
          <label className="flex items-center gap-2">
            <FaPalette className="text-green-400" /> Esquema de cor:
            <select className="ml-2 rounded-xl border border-blue-200 px-2 py-1">
              <option>Clássico</option>
              <option>Pet Colorido</option>
              <option>Minimalista</option>
            </select>
          </label>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in text-blue-900">
        <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-2">
          <FaUserCircle className="text-green-400" /> Meus Pets
        </h2>
        <div>
          {loadingPets ? (
            <span className="text-blue-500">Carregando pets...</span>
          ) : (
            <span className="text-blue-900">Você tem <b>{qtdPets ?? 0}</b> pet{qtdPets === 1 ? '' : 's'} cadastrado{qtdPets === 1 ? '' : 's'}.</span>
          )}
          <Link href="/meus-pets" className="ml-2 text-blue-500 underline">Ver meus pets</Link>
        </div>
      </div>
      <div className="w-full max-w-2xl mt-8 bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-8 flex flex-col gap-6 animate-fade-in text-blue-900">
        <h2 className="flex items-center gap-2 text-xl font-bold text-blue-900 mb-2">
          <FaQuestionCircle className="text-blue-400" /> Ajuda & Feedback
        </h2>
        <button type="button" className="text-blue-500 underline w-fit mb-2" onClick={() => window.open('mailto:suporte@petguard.com?subject=Feedback PetGuard')}>Enviar sugestão</button>
        <a href="mailto:suporte@petguard.com" className="text-blue-500 underline w-fit">Fale com o suporte</a>
      </div>
    </div>
  );
} 