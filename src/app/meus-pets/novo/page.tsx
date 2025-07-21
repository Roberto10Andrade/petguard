"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaDog, FaCat, FaPaw, FaMars, FaVenus, FaWeightHanging, FaCalendarAlt, FaMicrochip, FaHeartbeat, FaNotesMedical } from 'react-icons/fa';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NovoPetPage() {
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
  const [fotoBase64, setFotoBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

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

  // Função para converter imagem em base64
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Função para upload da foto no Firebase Storage
  async function uploadPetPhoto(file: File, petId: string) {
    const storageRef = ref(storage, `pets/${petId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let fotoUrl = '';
      const id = Date.now().toString();
      if (foto) {
        fotoUrl = fotoBase64 || await fileToBase64(foto);
      }
      const novoPet = { 
        id, 
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
        fotoUrl,
        criadoEm: new Date()
      };
      
      const stored = localStorage.getItem('pets');
      const pets = stored ? JSON.parse(stored) : [];
      
      pets.push(novoPet);
      
      localStorage.setItem('pets', JSON.stringify(pets));
      
      router.push('/meus-pets');
    } catch (err: any) {
      setError('Erro ao cadastrar pet.');
    } finally {
      setLoading(false);
    }
  };

  // Ao selecionar a foto, converter para base64
  const handleFotoChange = async (file: File | null) => {
    setFoto(file);
    if (file) {
      const base64 = await fileToBase64(file);
      setFotoBase64(base64);
    } else {
      setFotoBase64(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-violet-50 pet-form-page">
      {/* Botões de Navegação */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black text-black">Cadastrar Novo Pet</h1>
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
              <h2 className="text-xl font-bold text-black" style={{color: '#000000'}}>Informações Básicas</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Nome do Pet *</span>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                    style={{color: '#000000', backgroundColor: '#ffffff'}}
                    value={nome} 
                    onChange={e => setNome(e.target.value)} 
                    required 
                    placeholder="Digite o nome do seu pet"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Tipo de Pet *</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    style={{color: '#000000', backgroundColor: '#ffffff'}}
                    value={tipo} 
                    onChange={e => setTipo(e.target.value)}
                  >
                    <option value="cachorro" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐕 Cachorro</option>
                    <option value="gato" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐱 Gato</option>
                    <option value="passaro" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐦 Pássaro</option>
                    <option value="peixe" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐠 Peixe</option>
                    <option value="hamster" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐹 Hamster</option>
                    <option value="coelho" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐰 Coelho</option>
                    <option value="outro" style={{color: '#000000', backgroundColor: '#ffffff'}}>🐾 Outro</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Raça *</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    style={{color: '#000000', backgroundColor: '#ffffff'}}
                    value={raca} 
                    onChange={e => setRaca(e.target.value)}
                    required
                  >
                    <option value="" style={{color: '#000000', backgroundColor: '#ffffff'}}>Selecione uma raça</option>
                    {tipo === 'cachorro' && racasCachorro.map(raca => (
                      <option key={raca} value={raca} style={{color: '#000000', backgroundColor: '#ffffff'}}>{raca}</option>
                    ))}
                    {tipo === 'gato' && racasGato.map(raca => (
                      <option key={raca} value={raca} style={{color: '#000000', backgroundColor: '#ffffff'}}>{raca}</option>
                    ))}
                    {tipo !== 'cachorro' && tipo !== 'gato' && (
                      <option value="outro" style={{color: '#000000', backgroundColor: '#ffffff'}}>Outra</option>
                    )}
                  </select>
                </label>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Idade (anos)</span>
                    <input 
                      type="number" 
                      min="0" 
                      max="30" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                      style={{color: '#000000', backgroundColor: '#ffffff'}}
                      value={idade} 
                      onChange={e => setIdade(e.target.value)} 
                      placeholder="0"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Peso (kg)</span>
                    <input 
                      type="number" 
                      step="0.1" 
                      min="0" 
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all placeholder-gray-500" 
                      style={{color: '#000000', backgroundColor: '#ffffff'}}
                      value={peso} 
                      onChange={e => setPeso(e.target.value)} 
                      placeholder="0.0"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-sm font-semibold text-black mb-2 block" style={{color: '#000000'}}>Cor</span>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all [&>option]:bg-white [&>option]:text-black" 
                    style={{color: '#000000', backgroundColor: '#ffffff'}}
                    value={cor} 
                    onChange={e => setCor(e.target.value)}
                  >
                    <option value="" style={{color: '#000000', backgroundColor: '#ffffff'}}>Selecione a cor</option>
                    {cores.map(cor => (
                      <option key={cor} value={cor} style={{color: '#000000', backgroundColor: '#ffffff'}}>{cor}</option>
                    ))}
                  </select>
                </label>

                <div className="space-y-3">
                  <span className="text-sm font-semibold text-black block" style={{color: '#000000'}}>Sexo</span>
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
                      <span className="text-black" style={{color: '#000000'}}>Macho</span>
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
                      <span className="text-black" style={{color: '#000000'}}>Fêmea</span>
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
              <label className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-white">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={e => handleFotoChange(e.target.files?.[0] || null)} 
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
              {loading ? 'Cadastrando...' : 'Cadastrar Pet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 