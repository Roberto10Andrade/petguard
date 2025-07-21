"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FaDog, FaCat, FaPaw, FaMars, FaVenus, FaWeightHanging, FaCalendarAlt, FaMicrochip, FaHeartbeat, FaNotesMedical } from 'react-icons/fa';

export default function EditarPetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [pet, setPet] = useState<any>(null);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('cachorro');
  const [raca, setRaca] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [cor, setCor] = useState('');
  const [sexo, setSexo] = useState('macho');
  const [microchip, setMicrochip] = useState('');
  const [castrado, setCastrado] = useState(false);
  const [vacinado, setVacinado] = useState(false);
  const [vermifugado, setVermifugado] = useState(false);
  const [alergias, setAlergias] = useState('');
  const [medicamentos, setMedicamentos] = useState('');
  const [comportamento, setComportamento] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const racasCachorro = [
    'Labrador Retriever', 'Golden Retriever', 'Pastor Alemão', 'Bulldog Francês', 'Poodle', 'Rottweiler',
    'Beagle', 'Dachshund', 'Boxer', 'Chihuahua', 'Yorkshire Terrier', 'Shih Tzu', 'Pug', 'Husky Siberiano',
    'Border Collie', 'Doberman', 'Schnauzer', 'Cocker Spaniel', 'Outra'
  ];

  const racasGato = [
    'Persa', 'Siamês', 'Maine Coon', 'Ragdoll', 'Bengala', 'Abissínio', 'Sphynx', 'British Shorthair',
    'Russian Blue', 'Munchkin', 'Scottish Fold', 'Exótico', 'Outra'
  ];

  const cores = [
    'Preto', 'Branco', 'Marrom', 'Dourado', 'Cinza', 'Tricolor', 'Bicolor', 'Tigrado', 'Malhado', 'Outra'
  ];

  const comportamentos = [
    'Calmo e tranquilo', 'Brincalhão e ativo', 'Protetor', 'Sociável', 'Independente', 'Timido', 'Agressivo', 'Outro'
  ];

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem('pets');
    const pets = stored ? JSON.parse(stored) : [];
    const found = pets.find((p: any) => p.id === id);
    if (found) {
      setPet(found);
      setNome(found.nome || '');
      setTipo(found.tipo || 'cachorro');
      setRaca(found.raca || '');
      setIdade(found.idade?.toString() || '');
      setPeso(found.peso?.toString() || '');
      setCor(found.cor || '');
      setSexo(found.sexo || 'macho');
      setMicrochip(found.microchip || '');
      setCastrado(found.castrado || false);
      setVacinado(found.vacinado || false);
      setVermifugado(found.vermifugado || false);
      setAlergias(found.alergias || '');
      setMedicamentos(found.medicamentos || '');
      setComportamento(found.comportamento || '');
      setObservacoes(found.observacoes || '');
    }
    setLoading(false);
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let fotoUrl = pet?.fotoUrl || '';
      if (foto) {
        fotoUrl = URL.createObjectURL(foto);
      }
      const stored = localStorage.getItem('pets');
      let pets = stored ? JSON.parse(stored) : [];
      pets = pets.map((p: any) => p.id === id ? { 
        ...p, 
        nome, 
        tipo, 
        raca, 
        idade: parseInt(idade) || 0,
        peso: parseFloat(peso) || 0,
        cor,
        sexo,
        microchip,
        castrado,
        vacinado,
        vermifugado,
        alergias,
        medicamentos,
        comportamento,
        observacoes,
        fotoUrl 
      } : p);
      localStorage.setItem('pets', JSON.stringify(pets));
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 pet-form-page">
      {/* Botões de Navegação */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-black">Editar Pet</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => router.push('/meus-pets')}
              className="px-4 py-2 rounded-lg bg-gray-100 text-black font-medium hover:bg-gray-200 transition-colors"
            >
              ← Voltar
            </button>
            <button 
              onClick={() => router.push('/meus-pets')}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Seção 1: Informações Básicas */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FaPaw className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-black">Informações Básicas</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Nome do Pet *</span>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    required 
                    placeholder="Digite o nome do seu pet"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Tipo de Pet *</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    value={tipo} 
                    onChange={e => setTipo(e.target.value)}
                  >
                    <option value="cachorro">🐕 Cachorro</option>
                    <option value="gato">🐱 Gato</option>
                    <option value="passaro">🐦 Pássaro</option>
                    <option value="peixe">🐠 Peixe</option>
                    <option value="hamster">🐹 Hamster</option>
                    <option value="coelho">🐰 Coelho</option>
                    <option value="outro">🐾 Outro</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Raça *</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    value={raca} 
                    onChange={e => setRaca(e.target.value)}
                    required
                  >
                    <option value="">Selecione uma raça</option>
                    {tipo === 'cachorro' && racasCachorro.map(raca => (
                      <option key={raca} value={raca}>{raca}</option>
                    ))}
                    {tipo === 'gato' && racasGato.map(raca => (
                      <option key={raca} value={raca}>{raca}</option>
                    ))}
                    {tipo !== 'cachorro' && tipo !== 'gato' && (
                      <option value="outro">Outra</option>
                    )}
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-black mb-2 block">Idade (anos)</span>
                    <input 
                      type="number" 
                      min="0" 
                      max="30" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                      value={idade} 
                      onChange={e => setIdade(e.target.value)} 
                      placeholder="0"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-black mb-2 block">Peso (kg)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                      value={peso} 
                      onChange={e => setPeso(e.target.value)} 
                      placeholder="0.0"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Cor</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    value={cor} 
                    onChange={e => setCor(e.target.value)}
                  >
                    <option value="">Selecione a cor</option>
                    {cores.map(cor => (
                      <option key={cor} value={cor}>{cor}</option>
                    ))}
                  </select>
                </label>

                <div className="space-y-3">
                  <span className="text-sm font-semibold text-black block">Sexo</span>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="sexo" 
                        value="macho" 
                        checked={sexo === 'macho'} 
                        onChange={e => setSexo(e.target.value)} 
                        className="w-4 h-4 text-blue-500"
                      />
                      <FaMars className="text-blue-500" />
                      <span className="text-black">Macho</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="sexo" 
                        value="femea" 
                        checked={sexo === 'femea'} 
                        onChange={e => setSexo(e.target.value)} 
                        className="w-4 h-4 text-blue-500"
                      />
                      <FaVenus className="text-pink-500" />
                      <span className="text-black">Fêmea</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Seção 2: Saúde e Comportamento */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <FaHeartbeat className="text-white text-sm" />
              </div>
              <h2 className="text-xl font-bold text-black">Saúde e Comportamento</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Número do Microchip</span>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    value={microchip} 
                    onChange={e => setMicrochip(e.target.value)} 
                    placeholder="Ex: 123456789012345"
                  />
                </label>

                <div className="space-y-3">
                  <span className="text-sm font-semibold text-black block">Status de Saúde</span>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={castrado} 
                        onChange={e => setCastrado(e.target.checked)} 
                        className="w-4 h-4 text-blue-500 rounded"
                      />
                      <span className="text-black">Castrado/Esterilizado</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={vacinado} 
                        onChange={e => setVacinado(e.target.checked)} 
                        className="w-4 h-4 text-blue-500 rounded"
                      />
                      <span className="text-black">Vacinado</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={vermifugado} 
                        onChange={e => setVermifugado(e.target.checked)} 
                        className="w-4 h-4 text-blue-500 rounded"
                      />
                      <span className="text-black">Vermifugado</span>
                    </label>
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Comportamento</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    value={comportamento} 
                    onChange={e => setComportamento(e.target.value)}
                  >
                    <option value="">Selecione o comportamento</option>
                    {comportamentos.map(comp => (
                      <option key={comp} value={comp}>{comp}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Alergias</span>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    rows="3"
                    value={alergias} 
                    onChange={e => setAlergias(e.target.value)} 
                    placeholder="Liste as alergias conhecidas..."
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Medicamentos em Uso</span>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    rows="3"
                    value={medicamentos} 
                    onChange={e => setMedicamentos(e.target.value)} 
                    placeholder="Medicamentos que o pet está tomando..."
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block">Observações Adicionais</span>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    rows="3"
                    value={observacoes} 
                    onChange={e => setObservacoes(e.target.value)} 
                    placeholder="Outras informações importantes sobre o pet..."
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Seção 3: Foto do Pet */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📸</span>
              </div>
              <h2 className="text-xl font-bold text-black">Foto do Pet</h2>
            </div>
            
            <div className="max-w-md">
              {pet.fotoUrl && (
                <div className="mb-4 text-center">
                  <img src={pet.fotoUrl} alt={pet.nome} className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Foto atual</p>
                </div>
              )}
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => setFoto(e.target.files?.[0] || null)} 
                  />
                  <div className="text-4xl mb-4">📸</div>
                  <div className="text-black mb-2">
                    {foto ? `Arquivo selecionado: ${foto.name}` : 'Clique para selecionar uma foto do seu pet'}
                  </div>
                  <div className="text-sm text-black">
                    PNG, JPG ou GIF até 10MB
                  </div>
                </div>
              </label>
            </div>
          </section>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-center">
              {error}
            </div>
          )}
          
          {/* Botões de Ação */}
          <div className="flex gap-4 justify-center pt-6 border-t border-gray-200">
            <button 
              type="submit" 
              disabled={loading} 
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 