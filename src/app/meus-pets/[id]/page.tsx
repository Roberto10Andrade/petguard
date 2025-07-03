"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FaDog, FaCat } from 'react-icons/fa';

export default function DetalhePetPage() {
  const { id } = useParams();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const docRef = doc(db, 'pets', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPet(docSnap.data());
      }
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Pet não encontrado.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 px-4 py-24">
      <div className="bg-white/80 border border-blue-200 rounded-3xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center gap-6 animate-fade-in">
        {pet.fotoUrl ? (
          <img src={pet.fotoUrl} alt={pet.nome} className="w-32 h-32 object-cover rounded-full border-4 border-blue-200 shadow" />
        ) : (
          pet.tipo === 'cachorro' ? <FaDog className="text-7xl text-yellow-400" /> : <FaCat className="text-7xl text-indigo-400" />
        )}
        <div className="text-3xl font-black text-blue-900">{pet.nome}</div>
        <div className="text-lg text-blue-700">{pet.tipo} - {pet.raca}</div>
        <div className="text-blue-500 text-sm">Cadastrado em: {pet.criadoEm?.toDate ? pet.criadoEm.toDate().toLocaleDateString() : ''}</div>
        <div className="w-full mt-6">
          <div className="font-bold text-blue-900 mb-2">Histórico (mock)</div>
          <ul className="list-disc pl-6 text-blue-700 text-sm">
            <li>Vacina em dia</li>
            <li>Última consulta: 10/05/2024</li>
            <li>Alimentação controlada</li>
            <li>Localização monitorada</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 