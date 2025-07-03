"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db, storage, auth } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default function EditarPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pet, setPet] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('cachorro');
  const [raca, setRaca] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) router.push('/login');
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const docRef = doc(db, 'pets', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setPet(data);
        setNome(data.nome);
        setTipo(data.tipo);
        setRaca(data.raca);
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let fotoUrl = pet.fotoUrl || '';
      if (foto) {
        const storageRef = ref(storage, `pets/${user.uid}_${Date.now()}_${foto.name}`);
        await uploadBytes(storageRef, foto);
        fotoUrl = await getDownloadURL(storageRef);
      }
      await updateDoc(doc(db, 'pets', id as string), {
        nome,
        tipo,
        raca,
        fotoUrl
      });
      router.push('/meus-pets');
    } catch (err: any) {
      setError('Erro ao atualizar pet.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Pet não encontrado.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 py-24">
      <form onSubmit={handleSubmit} className="bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col gap-6 animate-fade-in">
        <h1 className="text-3xl font-black text-blue-900 mb-2">Editar Pet</h1>
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
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
} 