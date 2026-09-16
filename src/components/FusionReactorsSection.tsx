import React, { useState } from 'react';
import {
  FUSION_REACTORS,
  FISSION_VS_FUSION_COMPARISON,
  FusionReactorProject
} from '../data/energyData';
import {
  Flame,
  Zap,
  ShieldCheck,
  Atom,
  Thermometer,
  Magnet,
  RefreshCw,
  Layers,
  CheckCircle2,
  ChevronRight,
  Gauge,
  Globe,
  Sparkles,
  Award,
  ArrowRight,
  Info
} from 'lucide-react';

export const FusionReactorsSection: React.FC = () => {
  const [selectedReactorId, setSelectedReactorId] = useState<string>(FUSION_REACTORS[0].id);
  const [activeTab, setActiveTab] = useState<'reactors' | 'how-it-works' | 'comparison'>('reactors');

  const currentReactor =
    FUSION_REACTORS.find((r) => r.id === selectedReactorId) || FUSION_REACTORS[0];

  const reactorTypeColors: Record<FusionReactorProject['type'], { bg: string; text: string; border: string }> = {
    'Tokamak Magnético': {
      bg: 'bg-[#8F83FF]/15',
      text: 'text-[#8F83FF]',
      border: 'border-[#8F83FF]/30'
    },
    'Stellarator': {
      bg: 'bg-[#73CAE5]/15',
      text: 'text-[#73CAE5]',
      border: 'border-[#73CAE5]/30'
    },
    'Confinamento Inercial a Laser': {
      bg: 'bg-amber-500/15',
      text: 'text-amber-400',
      border: 'border-amber-500/30'
    },
    'Magneto-Inercial / FRC': {
      bg: 'bg-emerald-500/15',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30'
    }
  };

  const fusionSteps = [
    {
      num: '01',
      title: 'Injeção de Combustível Isotópico',
      desc: 'Deutério (extraído diretamente da água do mar) e Trítio (gerado no reator a partir de lítio) são injetados na câmara de vácuo em quantidades microscópicas (menos de 4 gramas).',
      badge: 'Deutério (²H) + Trítio (³H)'
    },
    {
      num: '02',
      title: 'Confinamento e Aquecimento a 150 Milhões °C',
      desc: 'Campos magnéticos colossais (até 20 Tesla) gerados por bobinas supercondutoras mantêm o plasma suspenso sem tocar nenhuma parede. Micro-ondas e feixes de partículas aceleram o gás até 10 vezes a temperatura do núcleo do Sol.',
      badge: 'Ímãs HTS • 10× Centro Solar'
    },
    {
      num: '03',
      title: 'Reação Termonuclear D-T',
      desc: 'A energia térmica extrema vence a repulsão eletrostática entre os prótons positivos. Ao colidirem a 1 femtômetro, a Força Nuclear Forte funde os núcleos, gerando uma partícula Alfa (⁴He com 3,5 MeV) e um nêutron ultrarrápido (14,1 MeV).',
      badge: '17,6 MeV por fusão'
    },
    {
      num: '04',
      title: 'Absorção Térmica no Manto de Lítio (Blanket)',
      desc: 'Como os nêutrons não possuem carga elétrica, escapam da gaiola magnética e atingem o manto de lítio que envolve a câmara. A colisão desacelera o nêutron, gerando calor intenso e sintetizando novo Trítio (⁶Li + n → ⁴He + ³H) para recirculação contínua.',
      badge: 'Breeding Autossustentável'
    },
    {
      num: '05',
      title: 'Conversão em Eletricidade Comercial',
      desc: 'O fluido refrigerante do manto (água pressurizada ou hélio supercrítico a >600 °C) alimenta geradores de vapor que giram turbinas elétricas convencionais ou geram indução magnética direta, enviando gigawatts de energia limpa para a rede.',
      badge: 'Zero CO₂ • Sem Lixo de Longa Duração'
    }
  ];

  return (
    <section id="fusion-reactors" className="space-y-10 pt-6">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#8F83FF]/20 to-[#73CAE5]/20 border border-[#8F83FF]/40 text-xs font-semibold text-white">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-[#8F83FF] font-bold">Fronteira Tecnológica</span>
          <span className="text-white/40">•</span>
          <span>Reatores de Fusão Nuclear</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Reatores de Fusão: A Energia das Estrelas na Terra
            </h2>
            <p className="text-sm sm:text-base text-[#B7B7B7] max-w-3xl mt-2 leading-relaxed">
              Diferente dos reatores nucleares de fissão comerciais atuais, os <strong>reatores de fusão</strong> buscam reproduzir a física do interior das estrelas. Sem risco de derretimento de núcleo, com combustível inesgotável extraído da água e sem produção de lixo radioativo de longa vida, eles representam o santo graal da energia limpa global.
            </p>
          </div>

          {/* View mode toggle */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 self-start lg:self-auto shrink-0">
            <button
              onClick={() => setActiveTab('reactors')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'reactors'
                  ? 'bg-gradient-to-r from-[#8F83FF] to-[#73CAE5] text-[#0D0D0D] font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Grandes Reatores</span>
            </button>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'how-it-works'
                  ? 'bg-gradient-to-r from-[#8F83FF] to-[#73CAE5] text-[#0D0D0D] font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Como Funciona a Usina</span>
            </button>
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                activeTab === 'comparison'
                  ? 'bg-gradient-to-r from-[#8F83FF] to-[#73CAE5] text-[#0D0D0D] font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Fissão vs. Fusão</span>
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: REATORES GLOBAIS */}
      {activeTab === 'reactors' && (
        <div className="space-y-6">
          {/* Reactor Selector Pills */}
          <div className="flex flex-wrap gap-2.5">
            {FUSION_REACTORS.map((reactor) => {
              const isSelected = reactor.id === selectedReactorId;
              return (
                <button
                  key={reactor.id}
                  onClick={() => setSelectedReactorId(reactor.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center space-x-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#8F83FF]/20 to-[#73CAE5]/20 border-[#8F83FF] text-white shadow-lg shadow-[#8F83FF]/15 font-bold'
                      : 'bg-white/5 border-white/5 text-[#B7B7B7] hover:border-white/20 hover:text-white'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      reactor.status === 'Em Construção'
                        ? 'bg-amber-400'
                        : reactor.status === 'Protótipo Comercial'
                        ? 'bg-emerald-400'
                        : 'bg-[#73CAE5]'
                    }`}
                  />
                  <span>{reactor.name.split(' (')[0]}</span>
                  <span className="text-[10px] opacity-70">
                    ({reactor.type.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Reactor Detailed Dossier */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                      reactorTypeColors[currentReactor.type].bg
                    } ${reactorTypeColors[currentReactor.type].text} ${
                      reactorTypeColors[currentReactor.type].border
                    }`}
                  >
                    {currentReactor.type}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white/5 border border-white/10 text-white flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#73CAE5]" />
                    <span>{currentReactor.country}</span>
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                      currentReactor.status === 'Em Construção'
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        : currentReactor.status === 'Protótipo Comercial'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                    }`}
                  >
                    {currentReactor.status}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {currentReactor.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#B7B7B7]">
                  <strong>Operador / Consórcio:</strong> {currentReactor.operator} •{' '}
                  <strong>Localização:</strong> {currentReactor.location}
                </p>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Meta de Ignição / Q</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold pt-0.5">
                  {currentReactor.ignitionGoal}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-[#8F83FF] font-bold uppercase tracking-wider">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>Temperatura Plasma</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold pt-0.5">
                  {currentReactor.plasmaTemp}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-[#73CAE5] font-bold uppercase tracking-wider">
                  <Magnet className="w-3.5 h-3.5" />
                  <span>Campo Magnético</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold pt-0.5">
                  {currentReactor.magneticField}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-emerald-400 font-bold uppercase tracking-wider">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Potência / Rendimento</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold pt-0.5">
                  {currentReactor.powerOrYield}
                </p>
              </div>
            </div>

            {/* Description & Innovations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Visão Geral do Projeto
                </h4>
                <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                  {currentReactor.description}
                </p>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Inovações Tecnológicas & Marcos:
                  </h4>
                  <ul className="space-y-2">
                    {currentReactor.keyInnovations.map((inno, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-[#B7B7B7]">
                        <CheckCircle2 className="w-4 h-4 text-[#73CAE5] shrink-0 mt-0.5" />
                        <span>{inno}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Blueprint */}
              <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-8 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-[#8F83FF]" />
                  <span>Arquitetura Físico-Operacional:</span>
                </h4>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-[#8F83FF] uppercase tracking-wider font-mono">
                      Confinamento & Gaiola de Plasma:
                    </span>
                    <p className="text-xs text-[#B7B7B7]">
                      {currentReactor.schematicDetails.confinementMethod}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-[#73CAE5] uppercase tracking-wider font-mono">
                      Ciclo de Combustível Nuclear:
                    </span>
                    <p className="text-xs text-[#B7B7B7]">
                      {currentReactor.schematicDetails.fuelCycle}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      Manto Térmico (Blanket) & Resfriamento:
                    </span>
                    <p className="text-xs text-[#B7B7B7]">
                      {currentReactor.schematicDetails.coolingBlanket}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider font-mono flex items-center space-x-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Segurança Passiva Incondicional:</span>
                    </span>
                    <p className="text-xs text-white">
                      {currentReactor.schematicDetails.safetyMechanisms}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: COMO FUNCIONA UMA USINA DE FUSÃO */}
      {activeTab === 'how-it-works' && (
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">
              Ciclo Energético de uma Usina Termonuclear de Fusão
            </h3>
            <p className="text-xs sm:text-sm text-[#B7B7B7]">
              Entenda o fluxo completo: da água do mar e do lítio até a geração de eletricidade pura na rede elétrica sem emissão de gases estufa ou resíduos de longa vida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {fusionSteps.map((step) => (
              <div
                key={step.num}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#8F83FF] font-mono group-hover:text-[#73CAE5] transition-colors">
                      {step.num}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-white/70">
                      Etapa
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#B7B7B7] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/5">
                  <span className="text-[11px] font-mono font-medium text-[#73CAE5]">
                    {step.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Key Advantages Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Risco Zero de Meltdown</span>
              </div>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                A câmara contém apenas gramas de combustível. Qualquer desvio térmico ou perda de vácuo faz o plasma esfriar em milissegundos, apagando a reação como uma vela soprada.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/30 space-y-2">
              <div className="flex items-center space-x-2 text-[#8F83FF] font-bold text-xs uppercase tracking-wider">
                <RefreshCw className="w-4 h-4" />
                <span>Combustível Oceânico Inesgotável</span>
              </div>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                1 metro cúbico de água do mar contém 33 gramas de Deutério. A energia de fusão contida na água dos oceanos é capaz de sustentar a civilização por mais de 100 milhões de anos.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 space-y-2">
              <div className="flex items-center space-x-2 text-[#73CAE5] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Subproduto: Gás Hélio Inerte</span>
              </div>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                A reação termonuclear não produz plutônio, césio ou estrôncio. O único subproduto direto é gás hélio não tóxico e não inflamável (usado em balões festivos).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPARAÇÃO FISSÃO VS. FUSÃO */}
      {activeTab === 'comparison' && (
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="max-w-2xl space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">
              Comparação Direta: Reatores de Fissão vs. Fusão
            </h3>
            <p className="text-xs sm:text-sm text-[#B7B7B7]">
              Entenda como a fissão nuclear (tecnologia das centrais atômicas comerciais contemporâneas) compara-se aos reatores de fusão termonuclear da nova fronteira.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-[#B7B7B7]">
                  <th className="py-3 px-4">Parâmetro de Engenharia</th>
                  <th className="py-3 px-4 text-amber-400">Reator de Fissão (PWR / BWR)</th>
                  <th className="py-3 px-4 text-[#8F83FF]">Reator de Fusão (Tokamak / ICF)</th>
                  <th className="py-3 px-4 text-center">Vantagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {FISSION_VS_FUSION_COMPARISON.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-bold text-white font-mono">
                      {row.parameter}
                    </td>
                    <td className="py-4 px-4 text-[#B7B7B7] leading-relaxed">
                      {row.fission}
                    </td>
                    <td className="py-4 px-4 text-[#B7B7B7] leading-relaxed">
                      {row.fusion}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase font-mono ${
                          row.advantage === 'Fusão'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : row.advantage === 'Fissão'
                            ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                            : 'bg-white/5 text-white/70 border border-white/10'
                        }`}
                      >
                        {row.advantage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};
