import React, { useState } from 'react';
import { PageId } from '../types';
import { weaponCategories, nuclearTreaties } from '../data/weaponsData';
import gunTypeDiagramImg from '../assets/images/little_boy_gun_type_diagram.svg';
import implosionTypeDiagramImg from '../assets/images/implosion_type_fission_diagram_1787680148801.jpg';
import tellerUlamDiagramImg from '../assets/images/BombH_explosion.svg';
import { NuclearRankingMapTab } from '../components/NuclearRankingMapTab';
import {
  ShieldAlert,
  Layers,
  FileText,
  AlertTriangle,
  Scale,
  Sparkles,
  ChevronRight,
  Info,
  Zap,
  Target,
  Globe,
  Radio,
  Flame,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';

interface WeaponsPageProps {
  onNavigate: (page: PageId) => void;
}

export const WeaponsPage: React.FC<WeaponsPageProps> = ({ onNavigate }) => {
  const [selectedWeaponCat, setSelectedWeaponCat] = useState<string>(weaponCategories[0].id);
  const [activePrinciple, setActivePrinciple] = useState<'fissao' | 'fusao'>('fissao');
  const [selectedArch, setSelectedArch] = useState<'all' | 'gun-type' | 'implosion' | 'teller-ulam'>('all');
  const [diagramLightbox, setDiagramLightbox] = useState<{ src: string; title: string; caption: string } | null>(null);

  const activeCategory = weaponCategories.find((w) => w.id === selectedWeaponCat) || weaponCategories[0];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Física dos Armamentos & Tratados Internacionais</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Armas Nucleares
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#8F83FF] font-medium font-display">
          Como a física atômica e a energia do núcleo foram transformadas nos maiores arsenais da história humana.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Uma análise estritamente educativa, histórica e conceitual sobre os princípios físicos de fissão e fusão, as arquiteturas conceituais clássicas da Guerra Fria e os regimes jurídicos de controle e desarmamento das Nações Unidas.
        </p>
      </div>

      {/* Safety & Educational Ethics Notice */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start space-x-3 text-xs text-[#B7B7B7] shadow-xl">
        <Info className="w-4 h-4 text-[#73CAE5] mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-white">Aviso de Responsabilidade e Segurança:</strong> Esta seção tem finalidade exclusivamente didática, histórica e de conscientização sobre o desarmamento. Todos os diagramas são puramente abstratos e conceituais. O site não apresenta projetos técnicos, desenhos construtivos, dimensões internas, proporções, materiais específicos ou procedimentos de montagem de armamentos.
        </p>
      </div>

      {/* Quick Navigation Cards to Special Historical Case Pages */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Aprofundamentos Históricos Especiais
          </h3>
          <span className="text-xs text-[#B7B7B7]">Páginas Monográficas Dedicadas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('operation-castle')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#73CAE5] font-bold">1954 • 6 TESTES</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#73CAE5] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
              Operação Castle
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A série de testes de combustível sólido no Atol de Bikini que gerou 48 Mt e o fallout de Bravo.
            </p>
          </div>

          <div
            onClick={() => onNavigate('tsar-bomba')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8F83FF] font-bold">1961 • 50 MT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#8F83FF] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#8F83FF] transition-colors">
              Tsar Bomba
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior detonação da história humana (50 Megatons) e seus impactos no Tratado PTBT.
            </p>
          </div>

          <div
            onClick={() => onNavigate('ivy-king')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#73CAE5] font-bold">1952 • 500 KT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#73CAE5] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
              Ivy King
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior arma de fissão pura já testada pelos Estados Unidos (MK-18).
            </p>
          </div>

          <div
            onClick={() => onNavigate('b41')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8F83FF] font-bold">1960–1976 • 25 MT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#8F83FF] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#8F83FF] transition-colors">
              Bomba B41
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior arma termonuclear estocada em série pelos EUA e a transição para ogivas guiadas.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Module: Nuclear Ranking & Blast Radius Simulator */}
      <section id="simulador-ranking" className="space-y-4 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-12 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)] xl:w-[calc(100%+6rem)]">
        <NuclearRankingMapTab />
      </section>

      {/* SECTION 9: Como Funcionam as Armas Nucleares (Princípios Gerais e Diagramas Conceituais) */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
            <Zap className="w-3.5 h-3.5" />
            <span>Física Teórica Fundamental</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Como Funcionam as Armas Nucleares: Os Princípios Científicos
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed max-w-3xl">
            Toda a liberação de energia em artefatos nucleares baseia-se em dois processos subatômicos opostos descritos pela equivalência massa-energia de Einstein ($E = \Delta m \cdot c^2$):
          </p>
        </div>

        {/* Switch Buttons: Fissão vs Fusão */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActivePrinciple('fissao')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activePrinciple === 'fissao'
                ? 'bg-[#73CAE5] text-black border-[#73CAE5] shadow-lg shadow-[#73CAE5]/20'
                : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
            }`}
          >
            1. Princípio da Fissão Nuclear
          </button>
          <button
            onClick={() => setActivePrinciple('fusao')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activePrinciple === 'fusao'
                ? 'bg-[#8F83FF] text-white border-[#8F83FF] shadow-lg shadow-[#8F83FF]/20'
                : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
            }`}
          >
            2. Princípio da Fusão Termonuclear
          </button>
        </div>

        {/* Principle Display */}
        {activePrinciple === 'fissao' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5]" />
                <span>Fissão: Divisão de Núcleos Pesados</span>
              </h3>
              <p>
                Um núcleo atômico pesado e instável (como o <strong>Urânio-235</strong> ou o <strong>Plutônio-239</strong>) absorve um nêutron térmico ou rápido, tornando-se altamente excitado e dividindo-se em dois fragmentos menores (produtos de fissão).
              </p>
              <p>
                Durante a quebra, uma fração minúscula da massa dos núcleos é convertida diretamente em imensa energia cinética e térmica, acompanhada da ejeção de <strong>2 a 3 nêutrons secundários</strong> em velocidades da ordem de dezenas de milhares de quilômetros por segundo.
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white">
                <strong>Equação Conceitual:</strong><br />
                <span className="font-mono text-[#73CAE5]">¹n + ²³⁵U → [²³⁶U*] → Ba-141 + Kr-92 + 3 ¹n + ~200 MeV</span>
              </div>
            </div>

            {/* Conceptual Animation Block: Núcleo -> Divisão -> Energia */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-xl bg-[#090909] border border-[#73CAE5]/20 space-y-4">
              <span className="text-[11px] font-mono text-[#73CAE5] uppercase font-bold tracking-wider">
                Fluxo Conceitual da Fissão
              </span>
              <div className="flex items-center space-x-3 text-xs font-mono text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <div className="w-8 h-8 rounded-full bg-[#8F83FF] mx-auto mb-1 flex items-center justify-center font-bold">U</div>
                  <span>Núcleo Pesado</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#73CAE5] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-[#73CAE5]">
                  <div className="flex space-x-1 justify-center mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#73CAE5]" />
                    <div className="w-4 h-4 rounded-full bg-[#73CAE5]" />
                  </div>
                  <span>Divisão Nuclear</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#73CAE5] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Zap className="w-5 h-5 mx-auto mb-1" />
                  <span>Energia (~200 MeV)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF]" />
                <span>Fusão: Junção de Núcleos Leves</span>
              </h3>
              <p>
                Dois núcleos atômicos extremamente leves (os isótopos de hidrogênio <strong>Deutério ²H</strong> e <strong>Trítio ³H</strong>) são submetidos a temperaturas de dezenas de milhões de graus Celsius e pressões astronômicas.
              </p>
              <p>
                A energia térmica extrema vence a repulsão eletrostática natural entre os prótons positivos (Barreira de Coulomb), permitindo que a <strong>Força Nuclear Forte</strong> funda os núcleos em um único núcleo de <strong>Hélio-4</strong> mais um nêutron rápido de altíssima energia (14,1 MeV).
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white">
                <strong>Equação Conceitual:</strong><br />
                <span className="font-mono text-[#8F83FF]">²H (Deutério) + ³H (Trítio) → ⁴He (3.5 MeV) + ¹n (14.1 MeV) + 17.6 MeV</span>
              </div>
            </div>

            {/* Conceptual Animation Block: Núcleos Leves -> Fusão -> Nêutrons 14.1 MeV -> Fissão U-238 */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-xl bg-[#090909] border border-[#8F83FF]/20 space-y-4">
              <span className="text-[11px] font-mono text-[#8F83FF] uppercase font-bold tracking-wider">
                Fluxo Conceitual: Fissão → Fusão → Fissão de U-238
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center w-full">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white flex flex-col items-center justify-center">
                  <div className="flex space-x-1 justify-center mb-1">
                    <div className="w-3.5 h-3.5 rounded-full bg-[#73CAE5]" />
                    <div className="w-3.5 h-3.5 rounded-full bg-[#8F83FF]" />
                  </div>
                  <span className="text-[11px]">1. D + T</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-[#8F83FF] flex flex-col items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#8F83FF] mx-auto mb-1 flex items-center justify-center text-xs">🔥</div>
                  <span className="text-[11px]">2. Fusão</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex flex-col items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-emerald-400 mx-auto mb-1 flex items-center justify-center text-black font-bold text-[9px]">¹n</div>
                  <span className="text-[11px]">3. 14.1 MeV</span>
                </div>
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 flex flex-col items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-red-500 mx-auto mb-1 flex items-center justify-center text-white font-bold text-[9px]">²³⁸U</div>
                  <span className="text-[11px]">4. Fissão U-238</span>
                </div>
              </div>
              <div className="w-full text-[11px] text-[#B7B7B7] bg-white/[0.02] p-2.5 rounded-lg border border-white/5 leading-relaxed">
                <strong className="text-amber-300">O 6º Elemento (Fissão Terciária):</strong> Em armas termonucleares reais, os nêutrons de 14,1 MeV da fusão causam a fissão rápida do invólucro de Urânio-238 (inerte para fissão comum), gerando mais da metade do rendimento total e quase todo o fallout.
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 10: Arquiteturas Históricas de Armas Nucleares (Esquemas Técnicos Didáticos) */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
              Física e Mecânica Clássica dos Artefatos
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Arquiteturas Históricas de Armas Nucleares
            </h2>
            <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl">
              Esquemas conceituais didáticos e sequência física detalhada dos três métodos históricos clássicos desenvolvidos no século XX.
            </p>
          </div>

          {/* Selector buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedArch('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedArch === 'all'
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
              }`}
            >
              Todos os Modelos
            </button>
            <button
              onClick={() => setSelectedArch('gun-type')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedArch === 'gun-type'
                  ? 'bg-[#73CAE5] text-black border-[#73CAE5]'
                  : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
              }`}
            >
              1. Canhão (Gun-Type)
            </button>
            <button
              onClick={() => setSelectedArch('implosion')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedArch === 'implosion'
                  ? 'bg-[#8F83FF] text-white border-[#8F83FF]'
                  : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
              }`}
            >
              2. Implosão (Plutônio)
            </button>
            <button
              onClick={() => setSelectedArch('teller-ulam')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                selectedArch === 'teller-ulam'
                  ? 'bg-amber-400 text-black border-amber-400'
                  : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
              }`}
            >
              3. Teller-Ulam (Termonuclear)
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Card 1: Gun-Type (Little Boy) */}
          {(selectedArch === 'all' || selectedArch === 'gun-type') && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#73CAE5]/30 hover:border-[#73CAE5] transition-all space-y-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#73CAE5]/10 text-[#73CAE5] text-[11px] font-mono font-bold">
                    <span>MÉTODO 01</span>
                    <span>•</span>
                    <span>DISPARO BALÍSTICO (URÂNIO-235)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Fissão Tipo Canhão (Gun-Type Nuclear Fission Bomb)
                  </h3>
                </div>
                <div className="text-xs text-[#B7B7B7] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <strong className="text-white">Exemplo Histórico:</strong> Little Boy (Hiroshima, 6 de agosto de 1945, ~15 kt)
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Technical Diagram */}
                <div className="lg:col-span-6 space-y-3">
                  <div
                    onClick={() =>
                      setDiagramLightbox({
                        src: gunTypeDiagramImg,
                        title: 'Diagrama Técnico: Bomba de Fissão Tipo Canhão (Gun-Type / Little Boy)',
                        caption:
                          'Representação didática dos dois estágios internos: propulsão do projétil de Urânio-235 pelo cano até a inserção completa no anel/esfera alvo, gerando massa supercrítica e fissão nuclear instantânea.'
                      })
                    }
                    className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-lg aspect-[4/3]"
                  >
                    <img
                      src={gunTypeDiagramImg}
                      alt="Diagrama Didático de Bomba Tipo Canhão (Gun-Type)"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-black p-1 transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2.5 py-1 rounded text-[11px] text-white/90 flex justify-between items-center backdrop-blur-sm">
                      <span>Diagrama didático de corte transversal</span>
                      <span className="text-[#73CAE5] font-mono">Clique p/ expandir</span>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Explanation in Portuguese */}
                <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                  <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-[#73CAE5]">
                    Mecanismo Físico e Sequência Operacional
                  </h4>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="text-white font-bold flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#73CAE5]/20 text-[#73CAE5] font-mono text-xs flex items-center justify-center font-bold">1</span>
                        <span>Carga Propulsora e Disparo Balístico</span>
                      </div>
                      <p className="text-xs pl-7">
                        Uma carga de propelente convencional (como cordite) é detonada na culatra na parte traseira da carcaça. A pressão dos gases em expansão acelera um projétil tubular subcrítico de <strong>Urânio-235 (~38,5 kg)</strong> a aproximadamente 300 m/s ao longo de um cano de aço liso.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="text-white font-bold flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#73CAE5]/20 text-[#73CAE5] font-mono text-xs flex items-center justify-center font-bold">2</span>
                        <span>Junção da Massa Supercrítica e Detonação</span>
                      </div>
                      <p className="text-xs pl-7">
                        O projétil atinge o anel/esfera alvo subcrítico de <strong>Urânio-235 (~25,5 kg)</strong> na ponta da bomba. A união das duas peças ultrapassa instantaneamente a massa crítica (fator de multiplicação k &gt; 1). Iniciadores de nêutrons de polônio-berílio injetam nêutrons no instante exato da máxima penetração, deflagrando a reação em cadeia descontrolada de fissão.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#73CAE5]/5 border border-[#73CAE5]/20 text-xs space-y-1">
                      <strong className="text-white flex items-center space-x-1">
                        <Info className="w-3.5 h-3.5 text-[#73CAE5]" />
                        <span>Por que o método Gun-Type tornou-se obsoleto?</span>
                      </strong>
                      <ul className="list-disc list-inside space-y-0.5 text-[#B7B7B7] pl-1">
                        <li><strong>Incompatível com Plutônio:</strong> O Pu-240 presente no plutônio tem alta taxa de fissão espontânea e provocaria "fizzle" (pré-detonação prematura) antes da bala se unir ao alvo.</li>
                        <li><strong>Baixíssima Eficiência:</strong> Apenas ~1,4% do urânio de Little Boy fisionou antes de a energia dissipar o artefato; o restante (~98,6%) foi disperso.</li>
                        <li><strong>Peso e Segurança:</strong> Pesava mais de 4.400 kg e possuía alto risco de disparo acidental por impacto mecânico ou quedas.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Implosion-Type (Plutonium / Fat Man) */}
          {(selectedArch === 'all' || selectedArch === 'implosion') && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-[#8F83FF]/30 hover:border-[#8F83FF] transition-all space-y-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#8F83FF]/10 text-[#8F83FF] text-[11px] font-mono font-bold">
                    <span>MÉTODO 02</span>
                    <span>•</span>
                    <span>COMPRESSÃO ESFÉRICA HIDRODINÂMICA (PLUTÔNIO-239)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Fissão por Implosão (Plutonium Implosion-Type Bomb)
                  </h3>
                </div>
                <div className="text-xs text-[#B7B7B7] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <strong className="text-white">Exemplos Históricos:</strong> Trinity (1945), Fat Man (Nagasaki, 1945, ~21 kt), RDS-1 (1949)
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual Technical Diagram */}
                <div className="lg:col-span-6 space-y-3">
                  <div
                    onClick={() =>
                      setDiagramLightbox({
                        src: implosionTypeDiagramImg,
                        title: 'Diagrama Técnico: Bomba de Fissão por Implosão de Plutônio (Fat Man / Trinity)',
                        caption:
                          'Cortes em três etapas: 1. Invólucro externo esférico; 2. Lentes de alto explosivo gerando onda de choque convergente para comprimir o núcleo de Plutônio-239; 3. Compressão supercrítica extrema gerando a detonação nuclear.'
                      })
                    }
                    className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-lg aspect-[4/3]"
                  >
                    <img
                      src={implosionTypeDiagramImg}
                      alt="Diagrama Didático de Fissão por Implosão de Plutônio"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white p-2 transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2.5 py-1 rounded text-[11px] text-white/90 flex justify-between items-center backdrop-blur-sm">
                      <span>Diagrama didático de corte em 3 etapas</span>
                      <span className="text-[#8F83FF] font-mono">Clique p/ expandir</span>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Explanation in Portuguese */}
                <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                  <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-[#8F83FF]">
                    Mecanismo Físico e Sequência Operacional
                  </h4>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="text-white font-bold flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#8F83FF]/20 text-[#8F83FF] font-mono text-xs flex items-center justify-center font-bold">1</span>
                        <span>Disparo Simultâneo das Lentes Explosivas</span>
                      </div>
                      <p className="text-xs pl-7">
                        Dezenas de detonadores elétricos de fio explosivo (EBW) disparam em sincronia perfeita (com tolerância inferior a 10 nanossegundos). Uma camada externa de 32 lentes explosivas moldadas combina explosivos rápidos (Composition B) e lentos (Baratol) para converter frentes de onda divergentes em uma <strong>onda de choque esférica convergente</strong> perfeita.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="text-white font-bold flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#8F83FF]/20 text-[#8F83FF] font-mono text-xs flex items-center justify-center font-bold">2</span>
                        <span>Compressão Hidrodinâmica e Super-Criticalidade</span>
                      </div>
                      <p className="text-xs pl-7">
                        A onda de choque atinge uma blindagem inercial de urânio natural (tamper) e comprime a esfera central de <strong>Plutônio-239 (fase delta, ~6,2 kg)</strong>, reduzindo seu volume em mais de 50% e duplicando instantaneamente sua densidade. Essa súbita compressão transforma a massa subcrítica em um estado profundamente supercrítico.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="text-white font-bold flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-[#8F83FF]/20 text-[#8F83FF] font-mono text-xs flex items-center justify-center font-bold">3</span>
                        <span>Injeção de Nêutrons e Explosão Nuclear</span>
                      </div>
                      <p className="text-xs pl-7">
                        No núcleo exato da esfera comprimida, o iniciador de nêutrons (codinome <em>Urchin</em>, feito de polônio-210 e berílio) é esmagado, liberando uma rajada de nêutrons que inicia as gerações exponenciais da fissão antes que o núcleo possa se desintegrar hidrodinamicamente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Staged Thermonuclear (Teller-Ulam) */}
          {(selectedArch === 'all' || selectedArch === 'teller-ulam') && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-amber-500/30 hover:border-amber-400 transition-all space-y-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-400 text-[11px] font-mono font-bold">
                    <span>MÉTODO 03</span>
                    <span>•</span>
                    <span>IMPLOSÃO POR RADIAÇÃO EM ESTÁGIOS (TELLER-ULAM)</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                    Arma Termonuclear em Estágios (Teller-Ulam Design)
                  </h3>
                </div>
                <div className="text-xs text-[#B7B7B7] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                  <strong className="text-white">Exemplos Históricos:</strong> Ivy Mike (1952, 10,4 Mt), Castle Bravo (1954, 15 Mt), Tsar Bomba (1961, 50 Mt)
                </div>
              </div>

              <div className="space-y-6">
                {/* Visual Technical Diagram (16:9 widescreen) */}
                <div className="space-y-3">
                  <div
                    onClick={() =>
                      setDiagramLightbox({
                        src: tellerUlamDiagramImg,
                        title: 'Diagrama Técnico: Arma Termonuclear em Estágios (Configuração Teller-Ulam)',
                        caption:
                          'Sequência cronológica dos 6 estágios: 1. Ogiva antes do disparo; 2. Fissão da primária; 3. Canalização e reflexão dos raios-X térmicos; 4. Plasma de poliestireno e implosão por radiação do secundário + vela de plutônio; 5. Ignição da fusão termonuclear no deutereto de lítio-6; 6. Fissão rápida terciária do invólucro de Urânio-238.'
                      })
                    }
                    className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 cursor-pointer shadow-lg aspect-[16/9] max-h-[420px]"
                  >
                    <img
                      src={tellerUlamDiagramImg}
                      alt="Diagrama Didático da Configuração Teller-Ulam"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain bg-white p-2 transition-transform duration-500 group-hover:scale-102"
                    />
                    <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2.5 py-1 rounded text-[11px] text-white/90 flex justify-between items-center backdrop-blur-sm">
                      <span>Diagrama didático com os 6 passos sequenciais da detonação termonuclear (Ciclo Fissão-Fusão-Fissão)</span>
                      <span className="text-amber-400 font-mono">Clique p/ expandir</span>
                    </div>
                  </div>
                </div>

                {/* 6-Step Detailed Sequential Physical Explanation */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider text-amber-400">
                    Os 6 Passos Sequenciais da Detonação Termonuclear (Física em Milionésimos de Segundo)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 text-xs text-[#B7B7B7]">
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono flex items-center justify-center text-[11px]">1</span>
                        <span>Ogiva em Repouso</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        No topo, a <strong>primária de fissão</strong> (implosão). Abaixo, o <strong>secundário</strong> com deutereto de lítio-6, a "vela" central de plutônio e o <strong>invólucro denso de Urânio-238</strong>, suspensos em matriz de espuma de poliestireno.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono flex items-center justify-center text-[11px]">2</span>
                        <span>Fissão da Primária</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        Explosivos convencionais comprimem o caroço de plutônio. Ocorre a fissão primária, atingindo dezenas de milhões de °C e inundando a cavidade com <strong>raios-X térmicos</strong> de altíssima energia.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono flex items-center justify-center text-[11px]">3</span>
                        <span>Canal de Raios-X</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        Os raios-X propagam-se na velocidade da luz pelo canal de radiação, refletindo nas paredes internas de alta densidade da carcaça antes que qualquer onda de choque mecânica destrua a estrutura.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono flex items-center justify-center text-[11px]">4</span>
                        <span>Implosão por Radiação</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        A espuma vira plasma hiperbárico. A camada externa do secundário sofre ablação explosiva, gerando pressão de milhões de atmosferas que comprime o combustível de lítio e inicia a fissão da vela central de plutônio.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-400 font-mono flex items-center justify-center text-[11px]">5</span>
                        <span>Ignição da Fusão</span>
                      </div>
                      <p className="leading-relaxed text-[11px]">
                        O Lítio-6 captura nêutrons e gera Trítio (&sup6;Li + n &rarr; &sup4;He + &sup3;H). O trítio funde-se instantaneamente com o deutério sob calor estelar, liberando energia massiva e um fluxo descomunal de <strong>nêutrons ultrarrápidos de 14,1 MeV</strong>.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 space-y-2 shadow-lg shadow-red-500/5">
                      <div className="flex items-center space-x-2 text-white font-bold">
                        <span className="w-6 h-6 rounded-full bg-red-500/30 text-red-400 font-mono flex items-center justify-center text-[11px]">6</span>
                        <span className="text-red-300">Fissão do U-238</span>
                      </div>
                      <p className="leading-relaxed text-[11px] text-[#D0D0D0]">
                        O fluxo de nêutrons de 14,1 MeV bombardeia o <strong>invólucro/tamper de Urânio-238</strong>. Incapaz de fisionar com nêutrons lentos, o U-238 sofre <em>fissão rápida</em>, dobrando o rendimento em megatons (50%–80% da energia) e gerando o fallout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 11: Tabela de Comparação Visual Solicitada */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Quadro Comparativo Integrado
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Comparação Visual dos Conceitos e Arquiteturas
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/5 text-[#73CAE5] font-display uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-4 px-6 font-bold">Conceito</th>
                <th className="py-4 px-6 font-bold">Processo Físico</th>
                <th className="py-4 px-6 font-bold">Contexto Histórico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#B7B7B7]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão</td>
                <td className="py-4 px-6">Divisão de núcleos pesados</td>
                <td className="py-4 px-6 text-[#73CAE5]">Primeiras armas nucleares</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fusão</td>
                <td className="py-4 px-6">Combinação de núcleos leves</td>
                <td className="py-4 px-6 text-[#8F83FF]">Armas termonucleares</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão tipo canhão</td>
                <td className="py-4 px-6">Arquitetura histórica de fissão</td>
                <td className="py-4 px-6">Segunda Guerra Mundial</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão por implosão</td>
                <td className="py-4 px-6">Arquitetura histórica de fissão</td>
                <td className="py-4 px-6">Projeto Manhattan e desenvolvimento posterior</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Termonuclear</td>
                <td className="py-4 px-6">Processos de fusão em condições extremas</td>
                <td className="py-4 px-6 text-amber-300">Guerra Fria</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Non-Proliferation & Disarmament Treaties */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Direito Internacional & Governança Multilateral
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Tratados de Controle de Armas e Não Proliferação
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7]">
            Os principais instrumentos negociados sob a égide das Nações Unidas e da AIEA para conter a proliferação e pavimentar o desarmamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nuclearTreaties.map((treaty) => (
            <div
              key={treaty.name}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#73CAE5]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-2.5 py-0.5 rounded-full border border-[#73CAE5]/30">
                    {treaty.year}
                  </span>
                  <span className="text-[11px] text-[#B7B7B7]">{treaty.signatories}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {treaty.name}
                </h3>

                <p className="text-xs text-[#B7B7B7] leading-relaxed">
                  {treaty.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                <div className="text-white/80 font-mono text-[11px]">
                  <strong>Dispositivo Central:</strong> {treaty.keyArticle}
                </div>
                <div className="text-[#8F83FF] text-[11px] font-semibold">
                  Status: {treaty.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal for Architecture Diagrams */}
      {diagramLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setDiagramLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#111111] border border-white/20 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                {diagramLightbox.title}
              </h4>
              <button
                onClick={() => setDiagramLightbox(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[65vh] overflow-auto flex items-center justify-center bg-black border border-white/10 rounded-xl p-3">
              <img
                src={diagramLightbox.src}
                alt={diagramLightbox.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="text-xs text-[#B7B7B7] leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/5">
              <strong className="text-white font-mono text-[11px] uppercase tracking-wider block mb-1">Explicação Técnica Didática:</strong>
              {diagramLightbox.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
