"use client";
import { useState } from 'react';
import { db, storage, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function NovoPetPage() {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('cachorro');
  const [raca, setRaca] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Verifica usuário logado
  useState(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.push('/login');
    });
    return () => unsub();
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let fotoUrl = '';
      if (foto) {
        const storageRef = ref(storage, `pets/${user.uid}_${Date.now()}_${foto.name}`);
        await uploadBytes(storageRef, foto);
        fotoUrl = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, 'pets'), {
        nome,
        tipo,
        raca,
        fotoUrl,
        userId: user.uid,
        criadoEm: new Date()
      });
      router.push('/meus-pets');
    } catch (err: any) {
      setError('Erro ao cadastrar pet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 py-24">
      <form onSubmit={handleSubmit} className="bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 animate-fade-in">
        <h1 className="text-3xl font-black text-blue-900 mb-2">Cadastrar Novo Pet</h1>
        <label className="font-bold text-blue-900">Nome
          <input type="text" className="mt-1 w-full rounded-xl border border-blue-200 px-4 py-2" value={nome} onChange={e => setNome(e.target.value)} required />
        </label>
        <label className="font-bold text-blue-900">Tipo
          <select className="mt-1 w-full rounded-xl border border-blue-200 px-4 py-2" value={tipo} onChange={e => setTipo(e.target.value)}>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <label className="font-bold text-blue-900">Raça
          <input type="text" className="mt-1 w-full rounded-xl border border-blue-200 px-4 py-2" value={raca} onChange={e => setRaca(e.target.value)} required />
        </label>
        <label className="font-bold text-blue-900">Foto do Pet
          <input type="file" accept="image/*" className="mt-1 w-full" onChange={e => setFoto(e.target.files?.[0] || null)} />
        </label>
        {error && <div className="text-red-500 font-bold text-center">{error}</div>}
        <button type="submit" disabled={loading} className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300">
          {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
        </button>
      </form>
    </div>
  );
} 