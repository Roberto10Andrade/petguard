"use client";
import { FaPaw, FaDog, FaCat, FaPlusCircle, FaEdit, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { deleteObject, ref as storageRef } from 'firebase/storage';

export default function MeusPetsPage() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        setLoading(true);
        const q = query(collection(db, 'pets'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const petsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPets(petsData);
        setLoading(false);
      } else {
        setPets([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleRemover = async (pet: any) => {
    if (!window.confirm('Tem certeza que deseja remover este pet?')) return;
    if (pet.fotoUrl) {
      try {
        const fotoRef = storageRef(storage, pet.fotoUrl);
        await deleteObject(fotoRef);
      } catch {}
    }
    await deleteDoc(doc(db, 'pets', pet.id));
    setPets(pets.filter(p => p.id !== pet.id));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Faça login para ver seus pets.</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-24 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-black text-blue-900 mb-8 flex items-center gap-3 drop-shadow-lg">
        <FaPaw className="text-green-400" /> Meus Pets
      </h1>
      <div className="w-full max-w-3xl flex flex-col items-center">
        <Link href="/meus-pets/novo" className="mb-10 flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white font-bold text-lg shadow hover:bg-blue-700 transition-all">
          <FaPlusCircle /> Adicionar Pet
        </Link>
        {pets.length === 0 ? (
          <div className="bg-white/90 border border-blue-100 rounded-2xl shadow p-8 flex flex-col items-center w-full max-w-xl">
            <FaDog className="text-5xl text-blue-200 mb-4" />
            <span className="text-lg text-blue-800 font-semibold mb-2">Você ainda não cadastrou nenhum pet.</span>
            <span className="text-blue-500 mb-6">Clique em "Adicionar Pet" para começar!</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 w-full">
              {[
                {
                  nome: "Thor",
                  tipo: "Cachorro",
                  raca: "Golden Retriever",
                  foto: "/images/demo1.png"
                },
                {
                  nome: "Mimi",
                  tipo: "Gato",
                  raca: "Siamês",
                  foto: "/images/demo2.png"
                },
                {
                  nome: "Luna",
                  tipo: "Cachorro",
                  raca: "Pug",
                  foto: "/images/demo3.png"
                }
              ].map((pet, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-5 flex flex-col items-center relative hover:shadow-lg transition-all">
                  <img src={pet.foto} alt={pet.nome} className="w-20 h-20 rounded-full object-cover mb-2 border border-gray-200" />
                  <div className="font-bold text-blue-900 text-base mb-1">{pet.nome}</div>
                  <div className="text-xs text-gray-500 mb-1">{pet.tipo} - {pet.raca}</div>
                  <span className="absolute top-2 right-2 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">Exemplo</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {pets.map((pet, idx) => (
              <div key={pet.id} className="bg-white rounded-xl shadow p-6 flex flex-col items-center relative hover:shadow-lg transition-all">
                <Link href={`/meus-pets/${pet.id}`} className="flex flex-col items-center group">
                  {pet.fotoUrl ? (
                    <img src={pet.fotoUrl} alt={pet.nome} className="w-20 h-20 object-cover rounded-full border border-gray-200 mb-2 group-hover:brightness-105 transition-all" />
                  ) : (
                    pet.tipo === 'cachorro' ? <FaDog className="text-5xl text-yellow-400 mb-2" /> : <FaCat className="text-5xl text-indigo-400 mb-2" />
                  )}
                  <div className="font-bold text-blue-900 text-base mb-1">{pet.nome}</div>
                  <div className="text-xs text-gray-500 mb-1">{pet.raca}</div>
                </Link>
                <div className="flex gap-2 absolute top-2 right-2">
                  <Link href={`/meus-pets/${pet.id}/editar`} className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-blue-600 text-base shadow-sm transition-colors"><FaEdit /></Link>
                  <button onClick={() => handleRemover(pet)} className="p-2 rounded-full bg-gray-100 hover:bg-red-100 text-red-500 text-base shadow-sm transition-colors"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 