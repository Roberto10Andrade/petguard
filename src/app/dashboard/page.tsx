"use client";
import Image from 'next/image'
import { FaPaw, FaBone, FaHeartbeat, FaMapMarkerAlt, FaUtensils, FaChartLine, FaDog, FaCat, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import petLottie from '../../../public/lottie/pet-demo.json';
import PetCarousel from '../components/PetCarousel';

export default function Dashboard() {
  // Exemplo de dados mockados
  const atividade = 82;
  const alimentacao = 67;
  const conquistas = [
    { icon: <FaCheckCircle className="text-green-500 animate-bounce" />, texto: '7 dias sem alertas!' },
    { icon: <FaPaw className="text-blue-400 animate-bounce" />, texto: 'Meta de atividade batida!' },
  ];
  const timeline = [
    { hora: '08:00', evento: 'Café da manhã', cor: 'bg-green-100', icon: <FaUtensils className="text-green-500" /> },
    { hora: '10:00', evento: 'Passeio', cor: 'bg-blue-100', icon: <FaPaw className="text-blue-400" /> },
    { hora: '12:00', evento: 'Alerta: água baixa', cor: 'bg-yellow-100', icon: <FaExclamationTriangle className="text-yellow-500 animate-pulse" /> },
    { hora: '14:00', evento: 'Almoço', cor: 'bg-green-100', icon: <FaUtensils className="text-green-500" /> },
    { hora: '16:00', evento: 'Brincadeira', cor: 'bg-purple-100', icon: <FaBone className="text-purple-400" /> },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 font-inter relative overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Saudação animada */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 mt-16">
          <div className="flex items-center gap-4">
            <Image src="/images/freepik__a-golden-retriever-outdoors-in-a-sunny-park-wearin__68617.jpeg" alt="Golden Retriever" width={120} height={120} className="w-24 h-24 md:w-32 md:h-32 rounded-2xl shadow-lg object-cover" priority />
            <div>
              <h1 className="text-4xl font-black text-blue-900">Bem-vindo de volta, Roberto!</h1>
              <p className="text-lg text-blue-700">Seu pet está saudável e feliz 🐾</p>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.08 }} className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-green-300 shadow-lg animate-pulse">
              <Image src="/images/freepik__a-golden-retriever-outdoors-in-a-sunny-park-wearin__68617.jpeg" alt="Avatar do Pet" fill className="object-cover" />
                </div>
                <div>
              <p className="font-bold text-blue-900 text-lg flex items-center gap-1"><FaDog className="text-yellow-400" /> Rex</p>
              <p className="text-sm text-blue-700 flex items-center gap-1"><FaBone className="text-green-400" /> Golden Retriever</p>
            </div>
          </motion.div>
        </motion.div>
        {/* Adicionar blocos logo após a saudação */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Card de Atividade com gráfico circular */}
          <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            <CircularProgressbar value={atividade} text={`${atividade}%`} styles={buildStyles({
              pathColor: '#3b82f6',
              textColor: '#1e3a8a',
              trailColor: '#dbeafe',
              backgroundColor: '#fff',
            })} className="w-28 h-28" />
            <p className="mt-4 text-blue-900 font-bold">Meta de atividade</p>
          </motion.div>
          {/* Card de Alimentação com gráfico circular */}
          <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            <CircularProgressbar value={alimentacao} text={`${alimentacao}%`} styles={buildStyles({
              pathColor: '#22c55e',
              textColor: '#166534',
              trailColor: '#bbf7d0',
              backgroundColor: '#fff',
            })} className="w-28 h-28" />
            <p className="mt-4 text-green-700 font-bold">Meta de alimentação</p>
          </motion.div>
          {/* Card de Conquistas */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-yellow-100 via-pink-100 to-blue-100 rounded-3xl shadow-2xl p-8 flex flex-col items-center">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaCheckCircle className="text-green-400 animate-bounce" /> Conquistas</h2>
            <ul className="space-y-3">
              {conquistas.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-blue-900 font-bold">{c.icon} {c.texto}</li>
              ))}
            </ul>
          </motion.div>
          {/* Card de Alertas */}
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-yellow-50 via-red-50 to-pink-50 border-l-8 border-yellow-400 rounded-3xl shadow-2xl p-8 animate-pulse flex flex-col items-center">
            <h2 className="text-xl font-extrabold text-yellow-700 mb-4 flex items-center gap-2"><FaExclamationTriangle className="text-yellow-400 animate-bounce" /> Alertas</h2>
            <p className="text-yellow-700 font-bold">Reservatório de ração em 75%</p>
            <p className="text-red-600 font-bold">Alerta: água baixa!</p>
          </motion.div>
                </div>
        {/* Linha do tempo do pet */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="mt-12 bg-white/90 rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-black text-blue-900 mb-6 flex items-center gap-2"><FaChartLine className="text-green-400" /> Linha do Tempo do Pet</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <ul className="flex-1 space-y-4">
              {timeline.map((item, i) => (
                <li key={i} className={`flex items-center gap-4 p-4 rounded-xl shadow-sm ${item.cor}`}>
                  <span className="font-bold text-blue-900 w-16">{item.hora}</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-blue-100">{item.icon}</span>
                  <span className="text-blue-800 font-semibold">{item.evento}</span>
                </li>
              ))}
            </ul>
            <div className="flex-1 flex flex-col items-center justify-center">
              <Image src="/images/pets21.png" alt="Pets" width={320} height={180} className="w-64 h-auto rounded-2xl shadow-lg object-contain" priority />
              <p className="mt-4 text-blue-700 text-center">Acompanhe o dia do seu pet em tempo real!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 