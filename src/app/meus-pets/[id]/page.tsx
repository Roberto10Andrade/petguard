"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { FaDog, FaCat, FaPaw, FaMars, FaVenus, FaWeightHanging, FaCalendarAlt, FaMicrochip, FaHeartbeat, FaNotesMedical, FaEdit, FaArrowLeft } from 'react-icons/fa';

export default function DetalhePetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        // Primeiro tenta buscar no localStorage
        const stored = localStorage.getItem('pets');
        const pets = stored ? JSON.parse(stored) : [];
        const found = pets.find((p: any) => p.id === id);
        
        if (found) {
          setPet(found);
        } else {
          // Se não encontrar no localStorage, tenta no Firebase
          const docRef = doc(db, 'pets', id as string);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setPet(docSnap.data());
          }
        }
      } catch (error) {
        console.error('Erro ao carregar pet:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;
  if (!pet) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Pet não encontrado.</div>;

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'cachorro': return <FaDog className="text-7xl text-yellow-400" />;
      case 'gato': return <FaCat className="text-7xl text-indigo-400" />;
      default: return <FaPaw className="text-7xl text-green-400" />;
    }
  };

  const getSexoIcon = (sexo: string) => {
    return sexo === 'macho' ? <FaMars className="text-blue-500" /> : <FaVenus className="text-pink-500" />;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Não informado';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 px-4 py-4 pet-details-page">
      <div className="max-w-5xl mx-auto">
        {/* Header com botões */}
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => router.push('/meus-pets')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-black font-bold text-sm hover:scale-105 transition-all duration-300"
          >
            <FaArrowLeft />
            Voltar
          </button>
          <button 
            onClick={() => router.push(`/meus-pets/${id}/editar`)}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm hover:scale-105 transition-all duration-300"
          >
            <FaEdit />
            Editar Pet
          </button>
        </div>

        <div className="bg-white/90 border border-gray-300 rounded-3xl shadow-2xl p-6 animate-fade-in">
          {/* Cabeçalho com foto e informações principais */}
          <div className="text-center mb-6">
            {pet.fotoUrl ? (
              <img src={pet.fotoUrl} alt={pet.nome} className="w-28 h-28 object-cover rounded-full border-4 border-blue-200 shadow mx-auto mb-3" />
            ) : (
              <div className="mb-3">{getTipoIcon(pet.tipo)}</div>
            )}
            <h1 className="text-3xl font-black text-black mb-2">{pet.nome}</h1>
            <div className="text-lg text-black mb-2">
              {pet.tipo.charAt(0).toUpperCase() + pet.tipo.slice(1)} - {pet.raca}
            </div>
            <div className="flex items-center justify-center gap-2 text-black">
              {getSexoIcon(pet.sexo)}
              <span className="capitalize">{pet.sexo}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informações Básicas */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-400 pb-1 flex items-center gap-2">
                <FaPaw />
                Informações Básicas
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                  <span className="font-bold text-black text-sm">Idade:</span>
                  <span className="text-black text-sm font-medium">{pet.idade ? `${pet.idade} anos` : 'Não informado'}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                  <span className="font-bold text-black text-sm">Peso:</span>
                  <span className="text-black text-sm font-medium">{pet.peso ? `${pet.peso} kg` : 'Não informado'}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                  <span className="font-bold text-black text-sm">Cor:</span>
                  <span className="text-black text-sm font-medium">{pet.cor || 'Não informado'}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gray-100 rounded-lg">
                  <span className="font-bold text-black text-sm">Microchip:</span>
                  <span className="text-black text-sm font-medium">{pet.microchip || 'Não informado'}</span>
                </div>
              </div>
            </div>

            {/* Status de Saúde */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-black border-b border-gray-400 pb-1 flex items-center gap-2">
                <FaHeartbeat />
                Status de Saúde
              </h2>
              
              <div className="space-y-2">
                <div className={`flex items-center gap-3 p-2 rounded-lg ${pet.castrado ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className={`w-2 h-2 rounded-full ${pet.castrado ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  <span className="font-bold text-black text-sm">Castrado/Esterilizado:</span>
                  <span className={`text-sm font-bold ${pet.castrado ? 'text-green-800' : 'text-red-800'}`}>
                    {pet.castrado ? 'Sim' : 'Não'}
                  </span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-lg ${pet.vacinado ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className={`w-2 h-2 rounded-full ${pet.vacinado ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  <span className="font-bold text-black text-sm">Vacinado:</span>
                  <span className={`text-sm font-bold ${pet.vacinado ? 'text-green-800' : 'text-red-800'}`}>
                    {pet.vacinado ? 'Sim' : 'Não'}
                  </span>
                </div>
                
                <div className={`flex items-center gap-3 p-2 rounded-lg ${pet.vermifugado ? 'bg-green-100' : 'bg-red-100'}`}>
                  <div className={`w-2 h-2 rounded-full ${pet.vermifugado ? 'bg-green-600' : 'bg-red-600'}`}></div>
                  <span className="font-bold text-black text-sm">Vermifugado:</span>
                  <span className={`text-sm font-bold ${pet.vermifugado ? 'text-green-800' : 'text-red-800'}`}>
                    {pet.vermifugado ? 'Sim' : 'Não'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-bold text-black border-b border-gray-400 pb-1 flex items-center gap-2">
              <FaNotesMedical />
              Informações Adicionais
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-bold text-black text-sm">Comportamento</h3>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <span className="text-black text-sm font-medium">{pet.comportamento || 'Não informado'}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-black text-sm">Alergias</h3>
                <div className="p-2 bg-gray-100 rounded-lg min-h-[40px]">
                  <span className="text-black text-sm font-medium">{pet.alergias || 'Nenhuma alergia conhecida'}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-black text-sm">Medicamentos em Uso</h3>
              <div className="p-2 bg-gray-100 rounded-lg min-h-[40px]">
                <span className="text-black text-sm font-medium">{pet.medicamentos || 'Nenhum medicamento em uso'}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-bold text-black text-sm">Observações</h3>
              <div className="p-2 bg-gray-100 rounded-lg min-h-[50px]">
                <span className="text-black text-sm font-medium">{pet.observacoes || 'Nenhuma observação adicional'}</span>
              </div>
            </div>
          </div>

          {/* Data de Cadastro */}
          <div className="mt-6 pt-4 border-t border-gray-400 text-center">
            <p className="text-black text-xs font-medium">
              Cadastrado em: {pet.criadoEm?.toDate ? pet.criadoEm.toDate().toLocaleDateString('pt-BR') : 'Data não disponível'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 