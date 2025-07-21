"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaDog, FaCat, FaPaw, FaEdit, FaTrash, FaEye, FaMicrochip, FaHeartbeat, FaNotesMedical } from 'react-icons/fa';

export default function MeusPetsPage() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Carregar pets do localStorage
    const stored = localStorage.getItem('pets');
    let petsData = stored ? JSON.parse(stored) : [];
    
    // Se não há pets, adicionar exemplos
    if (petsData.length === 0) {
      const petsExemplo = [
        {
          id: "1",
          nome: "Rex",
          tipo: "cachorro",
          raca: "Labrador Retriever",
          idade: 3,
          peso: 28.5,
          cor: "Dourado",
          sexo: "macho",
          microchip: "123456789012345",
          castrado: true,
          vacinado: true,
          vermifugado: true,
          alergias: "Nenhuma alergia conhecida",
          medicamentos: "Nenhum medicamento em uso",
          comportamento: "Brincalhão e ativo",
          observacoes: "Rex adora brincar com bolinhas e é muito sociável com outros cães. Sempre animado para passeios!",
          fotoUrl: "",
          criadoEm: new Date('2024-01-15')
        },
        {
          id: "2",
          nome: "Luna",
          tipo: "gato",
          raca: "Siamês",
          idade: 2,
          peso: 4.2,
          cor: "Bicolor",
          sexo: "femea",
          microchip: "987654321098765",
          castrado: true,
          vacinado: true,
          vermifugado: true,
          alergias: "Alergia a alguns tipos de ração",
          medicamentos: "Antialérgico quando necessário",
          comportamento: "Independente",
          observacoes: "Luna é uma gata muito elegante e independente. Gosta de ficar no alto observando tudo. Muito carinhosa com a família.",
          fotoUrl: "",
          criadoEm: new Date('2024-02-20')
        },
        {
          id: "3",
          nome: "Thor",
          tipo: "cachorro",
          raca: "Husky Siberiano",
          idade: 1,
          peso: 22.0,
          cor: "Cinza",
          sexo: "macho",
          microchip: "555666777888999",
          castrado: false,
          vacinado: true,
          vermifugado: true,
          alergias: "Nenhuma alergia conhecida",
          medicamentos: "Nenhum medicamento em uso",
          comportamento: "Protetor",
          observacoes: "Thor é muito energético e adora correr. Precisa de muito exercício diário. Muito protetor da família.",
          fotoUrl: "",
          criadoEm: new Date('2024-03-10')
        },
        {
          id: "4",
          nome: "Mia",
          tipo: "gato",
          raca: "Persa",
          idade: 4,
          peso: 5.8,
          cor: "Branco",
          sexo: "femea",
          microchip: "111222333444555",
          castrado: true,
          vacinado: true,
          vermifugado: false,
          alergias: "Nenhuma alergia conhecida",
          medicamentos: "Nenhum medicamento em uso",
          comportamento: "Calmo e tranquilo",
          observacoes: "Mia é uma gata muito tranquila e carinhosa. Adora ficar no colo e receber carinho. Muito dócil com crianças.",
          fotoUrl: "",
          criadoEm: new Date('2024-01-05')
        },
        {
          id: "5",
          nome: "Buddy",
          tipo: "cachorro",
          raca: "Golden Retriever",
          idade: 5,
          peso: 32.0,
          cor: "Dourado",
          sexo: "macho",
          microchip: "777888999000111",
          castrado: true,
          vacinado: true,
          vermifugado: true,
          alergias: "Nenhuma alergia conhecida",
          medicamentos: "Suplemento vitamínico para articulações",
          comportamento: "Sociável",
          observacoes: "Buddy é um cão muito amigável e sociável. Adora crianças e outros animais. Excelente companheiro para a família.",
          fotoUrl: "",
          criadoEm: new Date('2023-11-15')
        }
      ];
      
      localStorage.setItem('pets', JSON.stringify(petsExemplo));
      petsData = petsExemplo;
    }
    
    setPets(petsData);
    setLoading(false);
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pet?')) {
      const updatedPets = pets.filter(pet => pet.id !== id);
      setPets(updatedPets);
      localStorage.setItem('pets', JSON.stringify(updatedPets));
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'cachorro': return <FaDog className="text-2xl text-yellow-500" />;
      case 'gato': return <FaCat className="text-2xl text-indigo-500" />;
      default: return <FaPaw className="text-2xl text-green-500" />;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaPaw className="text-3xl text-blue-500" />
          <h1 className="text-3xl font-black text-black">Meus Pets</h1>
        </div>

        {/* Grid de Pets - minimalista premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center gap-3 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              {/* Foto do pet */}
              <div className="mb-4">
                {pet.fotoUrl ? (
                  <img src={pet.fotoUrl} alt={pet.nome} className="w-28 h-28 object-cover rounded-full border-4 border-blue-100 shadow" />
                ) : (
                  <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-green-100 shadow">
                    {getTipoIcon(pet.tipo)}
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-1 text-center">{pet.nome}</h2>
              <div className="text-base text-blue-700 font-semibold mb-1 text-center">{pet.raca} {pet.idade ? `• ${pet.idade} anos` : ''}</div>
              {/* Badges de status */}
              <div className="flex flex-wrap gap-2 justify-center mb-2">
                <span title={pet.vacinado ? 'Vacinado' : 'Não vacinado'} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${pet.vacinado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{pet.vacinado ? 'Vacinado' : 'Não vacinado'}</span>
                <span title={pet.castrado ? 'Castrado' : 'Não castrado'} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${pet.castrado ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>{pet.castrado ? 'Castrado' : 'Não castrado'}</span>
                <span title={pet.vermifugado ? 'Vermifugado' : 'Não vermifugado'} className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${pet.vermifugado ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{pet.vermifugado ? 'Vermifugado' : 'Não vermifugado'}</span>
                {pet.microchip && (
                  <span title="Microchip" className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-800"><FaMicrochip /></span>
                )}
              </div>
              {/* Ações como ícones discretos */}
              <div className="flex gap-4 mt-4">
                <button 
                  onClick={() => router.push(`/dashboard?id=${pet.id}`)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-900 shadow transition"
                  title="Monitorar Pet"
                >
                  <FaEye className="text-lg" />
                </button>
                <button 
                  onClick={() => router.push(`/meus-pets/${pet.id}/editar`)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-50 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-900 shadow transition"
                  title="Editar Pet"
                >
                  <FaEdit className="text-lg" />
                </button>
                <button 
                  onClick={() => handleDelete(pet.id)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900 shadow transition"
                  title="Excluir Pet"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mensagem quando não há pets */}
        {pets.length === 0 && (
          <div className="text-center py-12">
            <FaPaw className="text-6xl text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-black mb-2">Nenhum pet cadastrado</h2>
            <p className="text-black mb-6">Comece cadastrando seu primeiro pet!</p>
            <button 
              onClick={() => router.push('/meus-pets/novo')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors duration-200 text-lg"
            >
              <FaPlus className="inline mr-2" />
              Cadastrar Primeiro Pet
            </button>
          </div>
        )}
      </div>
      {/* Botão flutuante para cadastro com animação pulse */}
      <button 
        onClick={() => router.push('/meus-pets/novo')}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-4 px-6 rounded-full shadow-2xl text-xl z-50 transition-all duration-200 flex items-center gap-2 animate-pulse"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}
      >
        <FaPlus className="text-2xl" />
        <span className="hidden sm:inline">Cadastrar Pet</span>
      </button>
    </div>
  );
} 