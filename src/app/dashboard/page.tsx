import Image from 'next/image'
import { FaPaw, FaBone, FaHeartbeat, FaMapMarkerAlt, FaUtensils, FaChartLine, FaDog, FaCat, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-green-100 to-violet-100 font-inter">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <h1 className="text-4xl font-black text-blue-900 flex items-center gap-3 drop-shadow-lg">
            <FaPaw className="text-green-400 animate-bounce" /> Dashboard PetGuard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-4 border-green-300 shadow-lg animate-pulse">
              <Image
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=2062"
                alt="Avatar do Pet"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-blue-900 text-lg flex items-center gap-1"><FaDog className="text-yellow-400" /> Rex</p>
              <p className="text-sm text-blue-700 flex items-center gap-1"><FaBone className="text-green-400" /> Golden Retriever</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card de Status do Pet */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-green-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-blue-700 flex items-center gap-2"><FaHeartbeat className="text-pink-400 animate-pulse" /> Status do Pet</h2>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold animate-pulse">Online</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Última localização</p>
                  <p className="text-blue-900 font-bold">Casa</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaChartLine className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Nível de atividade</p>
                  <p className="text-blue-900 font-bold">Normal</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaUtensils className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-700">Última alimentação</p>
                  <p className="text-blue-900 font-bold">2h atrás</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Localização */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-blue-200">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaMapMarkerAlt className="text-green-400" /> Localização em Tempo Real</h2>
            <div className="h-64 bg-blue-50 rounded-xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074"
                alt="Mapa de localização"
                fill
                className="object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-10 h-10 bg-green-400 rounded-full border-4 border-white animate-pulse shadow-lg" />
              </div>
            </div>
          </div>

          {/* Card de Atividade */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-blue-200">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaChartLine className="text-purple-400" /> Atividade Física</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaPaw className="w-6 h-6 text-blue-600 animate-bounce" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Tempo em movimento</p>
                    <p className="text-blue-900 font-bold">45 min</p>
                  </div>
                </div>
              </div>
              <div className="h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '75%' }} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Distância</p>
                  <p className="text-blue-900 font-bold">2.5 km</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Energia</p>
                  <p className="text-blue-900 font-bold">Alto</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Alimentação */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-green-200">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaUtensils className="text-yellow-400" /> Controle de Alimentação</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">
                    <FaUtensils className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-700">Próxima refeição</p>
                    <p className="text-blue-900 font-bold">14:00</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-blue-700">Nível do reservatório</span>
                  <span className="text-sm font-bold text-blue-900">75%</span>
                </div>
                <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Quantidade</p>
                  <p className="text-blue-900 font-bold">200g</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-700">Refeições</p>
                  <p className="text-blue-900 font-bold">3/dia</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Alertas */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-yellow-200">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaExclamationTriangle className="text-yellow-400 animate-bounce" /> Alertas</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <FaCheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-green-700 font-bold">Sistema funcionando normalmente</p>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-yellow-100 flex items-center justify-center">
                  <FaExclamationTriangle className="w-5 h-5 text-yellow-600 animate-pulse" />
                </div>
                <p className="text-yellow-700 font-bold">Reservatório de ração em 75%</p>
              </div>
            </div>
          </div>

          {/* Card de Estatísticas */}
          <div className="bg-white/80 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border-2 border-blue-200">
            <h2 className="text-xl font-extrabold text-blue-700 mb-4 flex items-center gap-2"><FaChartLine className="text-green-400" /> Estatísticas Diárias</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">Tempo de atividade</p>
                  <p className="text-2xl font-black text-blue-900">2h 30min</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">Calorias gastas</p>
                  <p className="text-2xl font-black text-blue-900">450</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-blue-700">Refeições realizadas</span>
                  <span className="text-sm font-bold text-blue-900">2/3</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full animate-pulse" style={{ width: '66%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 