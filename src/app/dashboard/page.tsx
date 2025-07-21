"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { FaPaw, FaBone, FaHeartbeat, FaMapMarkerAlt, FaUtensils, FaChartLine, FaDog, FaCat, FaCheckCircle, FaExclamationTriangle, FaPlus, FaNotesMedical, FaMicrochip, FaHome } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import petLottie from '../../../public/lottie/pet-demo.json';
import PetCarousel from '../components/PetCarousel';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function Dashboard() {
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

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
          raca: "Golden Retriever",
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
        }
      ];
      
      localStorage.setItem('pets', JSON.stringify(petsExemplo));
      petsData = petsExemplo;
    }
    
    setPets(petsData);
    setLoading(false);
  }, []);

  // Calcular estatísticas dos pets
  const totalPets = pets.length;
  const petsVacinados = pets.filter(pet => pet.vacinado).length;
  const petsCastrados = pets.filter(pet => pet.castrado).length;
  const percentualVacinados = totalPets > 0 ? Math.round((petsVacinados / totalPets) * 100) : 0;
  const percentualCastrados = totalPets > 0 ? Math.round((petsCastrados / totalPets) * 100) : 0;

  // Pet principal: busca pelo id, se não achar, pega o primeiro
  const petPrincipal = pets.find(pet => pet.id === id) || pets[0];

  // Exemplo de dados mockados
  const atividade = 82;
  const alimentacao = 67;
  const conquistas = [
    { icon: <FaCheckCircle className="text-green-500 animate-bounce" />, texto: `${petsVacinados} pets vacinados!` },
    { icon: <FaPaw className="text-blue-400 animate-bounce" />, texto: `${totalPets} pets cadastrados!` },
  ];
  const timeline = [
    { hora: '08:00', evento: 'Café da manhã', cor: 'bg-green-100', icon: <FaUtensils className="text-green-500" /> },
    { hora: '10:00', evento: 'Passeio', cor: 'bg-blue-100', icon: <FaPaw className="text-blue-400" /> },
    { hora: '12:00', evento: 'Alerta: água baixa', cor: 'bg-yellow-100', icon: <FaExclamationTriangle className="text-yellow-500 animate-pulse" /> },
    { hora: '14:00', evento: 'Almoço', cor: 'bg-green-100', icon: <FaUtensils className="text-green-500" /> },
    { hora: '16:00', evento: 'Brincadeira', cor: 'bg-purple-100', icon: <FaBone className="text-purple-400" /> },
  ];

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'cachorro': return <FaDog className="text-yellow-400" />;
      case 'gato': return <FaCat className="text-indigo-400" />;
      default: return <FaPaw className="text-green-400" />;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Carregando...</div>;
  if (!petPrincipal) return <div className="min-h-screen flex items-center justify-center text-blue-900 text-xl font-bold">Pet não encontrado.</div>;
  return (
    <div className="min-h-screen relative font-inter px-4 py-10 overflow-x-hidden bg-gradient-to-br from-blue-400 via-violet-300 to-green-200 animate-gradient-x">
      {/* Saudação animada com partículas leves */}
      <div className="flex flex-col items-center mb-10 mt-24">
        <div className="relative mb-2">
          {petPrincipal.fotoUrl ? (
            <div className="rounded-full p-1 bg-gradient-to-tr from-blue-300 via-blue-100 to-violet-200 shadow-lg">
              <Image src={petPrincipal.fotoUrl} alt={petPrincipal.nome} width={140} height={140} className="w-36 h-36 object-cover rounded-full border-4 border-white shadow-md" priority />
              {/* Badge do tipo do pet */}
              <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md border border-blue-200 flex items-center justify-center" style={{width: '38px', height: '38px'}}>
                {getTipoIcon(petPrincipal.tipo)}
              </span>
            </div>
          ) : (
            <div className="w-36 h-36 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-purple-200 shadow-lg">
              {getTipoIcon(petPrincipal.tipo)}
            </div>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-blue-900 mb-2">{petPrincipal.nome}</h1>
        <div className="text-xl text-blue-700 font-semibold mb-1">{petPrincipal.tipo?.charAt(0).toUpperCase() + petPrincipal.tipo?.slice(1)} - {petPrincipal.raca}</div>
        <div className="flex items-center gap-2 text-blue-800 font-medium mb-1">
          <span className="capitalize">{petPrincipal.sexo}</span>
          <span className="text-gray-400">|</span>
          <span>Cor: {petPrincipal.cor || 'Não informado'}</span>
        </div>
        <div className="flex items-center gap-4 text-blue-900 font-medium">
          <span>Idade: <b>{petPrincipal.idade || '-'}</b> anos</span>
          <span>Peso: <b>{petPrincipal.peso || '-'}</b> kg</span>
        </div>
      </div>
      {/* Widgets do Dashboard Modular */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 max-w-7xl mx-auto">
        {/* Widget Saúde */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaHeartbeat className="text-5xl text-green-400 mb-2" />
          <h3 className="text-lg font-bold text-green-900">Saúde</h3>
          <span className={`text-base font-bold ${petPrincipal.vacinado ? 'text-green-700' : 'text-red-700'}`}>{petPrincipal.vacinado ? 'Vacinado em dia' : 'Vacinação pendente'}</span>
          <span className="text-xs text-gray-500">Última vacina: {petPrincipal.ultimaVacinacao || '10/03/2024'}</span>
        </div>
        {/* Widget Castração */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaPaw className="text-5xl text-blue-400 mb-2" />
          <h3 className="text-lg font-bold text-blue-900">Castração</h3>
          <span className={`text-base font-bold ${petPrincipal.castrado ? 'text-blue-700' : 'text-red-700'}`}>{petPrincipal.castrado ? 'Castrado' : 'Não castrado'}</span>
        </div>
        {/* Widget Vermifugação */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-yellow-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaBone className="text-5xl text-yellow-400 mb-2" />
          <h3 className="text-lg font-bold text-yellow-900">Vermifugação</h3>
          <span className={`text-base font-bold ${petPrincipal.vermifugado ? 'text-yellow-700' : 'text-red-700'}`}>{petPrincipal.vermifugado ? 'Vermifugado' : 'Não vermifugado'}</span>
        </div>
        {/* Widget Microchip */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-purple-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaMicrochip className="text-5xl text-purple-400 mb-2" />
          <h3 className="text-lg font-bold text-purple-900">Microchip</h3>
          <span className={`text-base font-bold ${petPrincipal.microchip ? 'text-purple-700' : 'text-red-700'}`}>{petPrincipal.microchip ? 'Sim' : 'Não'}</span>
          <span className="text-xs text-gray-500">{petPrincipal.microchip || 'Não informado'}</span>
        </div>
        {/* Widget Alimentação */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-orange-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaUtensils className="text-5xl text-orange-400 mb-2" />
          <h3 className="text-lg font-bold text-orange-900">Alimentação</h3>
          <div className="w-full mb-1">
            <div className="h-3 w-full bg-orange-100 rounded-full overflow-hidden">
              <div className="h-3 bg-orange-400 rounded-full transition-all duration-500" style={{width: '80%'}}></div>
            </div>
            <span className="text-xs text-orange-700 font-bold">Ração: 80%</span>
          </div>
          <span className="text-xs text-gray-500">Última alimentação: 08:00</span>
        </div>
        {/* Widget Localização */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-200 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform">
          <FaMapMarkerAlt className="text-5xl text-blue-500 mb-2" />
          <h3 className="text-lg font-bold text-blue-900">Localização</h3>
          <span className="text-base font-bold text-blue-700">Em casa</span>
          <span className="text-xs text-gray-500">Atualizado: 09:15</span>
        </div>
        {/* Widget Observações */}
        <div className="rounded-2xl shadow-xl bg-gradient-to-br from-pink-100 to-white p-6 flex flex-col items-center gap-2 hover:scale-105 transition-transform col-span-1 sm:col-span-2 lg:col-span-3">
          <FaNotesMedical className="text-4xl text-pink-400 mb-2" />
          <h3 className="text-lg font-bold text-pink-900">Observações</h3>
          <span className="text-base text-pink-800 text-center">{petPrincipal.observacoes || 'Nenhuma observação adicional'}</span>
        </div>
      </div>
      {/* Recomendações rápidas animadas */}
      <div className="mt-8 max-w-3xl mx-auto">
        <div className="bg-gradient-to-r from-blue-200 via-green-100 to-violet-200 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-center gap-4 animate-fade-in-up">
          <FaCheckCircle className="text-green-500 text-3xl animate-bounce" />
          <span className="text-blue-900 font-bold text-lg">Mantenha as vacinas em dia e visite o veterinário regularmente!</span>
        </div>
      </div>
      {/* Animação de partículas no fundo */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s ease-in-out infinite;
        }
        .animate-glow {
          box-shadow: 0 0 32px 8px #a5b4fc, 0 0 64px 16px #f0abfc;
          animation: glow 2.5s ease-in-out infinite alternate;
        }
        @keyframes glow {
          0% { box-shadow: 0 0 32px 8px #a5b4fc, 0 0 64px 16px #f0abfc; }
          100% { box-shadow: 0 0 48px 16px #818cf8, 0 0 80px 24px #f472b6; }
        }
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fade-in-up 1s forwards;
        }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in-up.delay-300 { animation-delay: 0.3s; }
        @keyframes fade-in-up {
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  )
} 