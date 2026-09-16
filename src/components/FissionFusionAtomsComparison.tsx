import React, { useState } from 'react';
import { comparativeIsotopes } from '../data/comparativeAtomsData';
import { AtomCanvasModel, AtomModelData } from './AtomCanvasModel';
import {
  Zap,
  Flame,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Layers,
  Scale,
  Atom,
  Info,
  ChevronRight
} from 'lucide-react';

export const FissionFusionAtomsComparison: React.FC = () => {
  const [fissionSelectedId, setFissionSelectedId] = useState<'u235' | 'pu239'>('u235');
  const [fusionSelectedId, setFusionSelectedId] = useState<'deuterium' | 'tritium'>('deuterium');
  const [viewLayout, setViewLayout] = useState<'side-by-side' | 'all-four'>('side-by-side');
  const [showElectrons, setShowElectrons] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [angleSeed, setAngleSeed] = useState<number>(0);

  const u235 = comparativeIsotopes.find((i) => i.id === 'u235')!;
  const pu239 = comparativeIsotopes.find((i) => i.id === 'pu239')!;
  const deuterium = comparativeIsotopes.find((i) => i.id === 'deuterium')!;
  const tritium = comparativeIsotopes.find((i) => i.id === 'tritium')!;

  const currentFissionAtom = fissionSelectedId === 'u235' ? u235 : pu239;
  const currentFusionAtom = fusionSelectedId === 'deuterium' ? deuterium : tritium;

  const handleReset = () => {
    setAngleSeed((prev) => prev + 1);
  };

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div className="space-y-1.5">
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-gradient-to-r from-[#73CAE5]/20 to-[#8F83FF]/20 border border-[#73CAE5]/30">
              <Atom className="w-4 h-4 text-[#73CAE5]" />
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-display">
              Modelos Atômicos dos Combustíveis: Fissão × Fusão
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl leading-relaxed">
            Mesmos modelos dinâmicos do <strong>Simulador da Estrutura Atômica</strong>: compare em tempo real os núcleos hiperpesados da fissão (<strong>²³⁵U</strong> e <strong>²³⁹Pu</strong>) contra os núcleos ultraleves da fusão (<strong>²H</strong> e <strong>³H</strong>).
          </p>
        </div>

        {/* Global Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Layout switcher */}
          <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewLayout('side-by-side')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1.5 ${
                viewLayout === 'side-by-side'
                  ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-sm'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Lado a Lado</span>
            </button>
            <button
              onClick={() => setViewLayout('all-four')}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center space-x-1.5 ${
                viewLayout === 'all-four'
                  ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-sm'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todos os 4 Átomos</span>
            </button>
          </div>

          {/* Electrons Toggle */}
          <button
            onClick={() => setShowElectrons(!showElectrons)}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center space-x-1.5 ${
              showElectrons
                ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}
            title={showElectrons ? 'Ocultar elétrons e orbitais (ver apenas núcleo)' : 'Exibir elétrons e orbitais'}
          >
            <Atom className="w-3.5 h-3.5" />
            <span>{showElectrons ? 'Elétrons: Ligados' : 'Apenas Núcleo'}</span>
          </button>

          {/* Animation Play/Pause & Speed */}
          <div className="flex items-center space-x-1 bg-white/5 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-md hover:bg-white/10 text-[#73CAE5] transition-colors"
              title={isPlaying ? 'Pausar animações' : 'Retomar animações'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-md hover:bg-white/10 text-[#B7B7B7] hover:text-white transition-colors"
              title="Reiniciar ângulos orbitais"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <select
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="bg-transparent text-[11px] font-mono text-white px-1.5 py-0.5 rounded focus:outline-none border-0"
            >
              <option value={0.5} className="bg-[#121212]">0.5x</option>
              <option value={1} className="bg-[#121212]">1.0x</option>
              <option value={2} className="bg-[#121212]">2.0x</option>
            </select>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: SIDE-BY-SIDE DUAL COMPARISON */}
      {viewLayout === 'side-by-side' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FISSION PANEL */}
          <div className="bg-[#0D0D0D] border border-[#73CAE5]/30 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header & Isotope Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#73CAE5]/15 border border-[#73CAE5]/30 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-[#73CAE5]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#73CAE5]">
                      Rota da Fissão • Núcleos Pesados Físseis
                    </span>
                    <h4 className="text-base font-bold text-white font-display leading-tight">
                      {currentFissionAtom.name} ({currentFissionAtom.symbol})
                    </h4>
                  </div>
                </div>

                {/* Switch between U-235 and Pu-239 */}
                <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs font-mono self-start sm:self-auto">
                  <button
                    onClick={() => setFissionSelectedId('u235')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      fissionSelectedId === 'u235'
                        ? 'bg-[#73CAE5] text-[#0D0D0D] font-bold'
                        : 'text-[#B7B7B7] hover:text-white'
                    }`}
                  >
                    ²³⁵U
                  </button>
                  <button
                    onClick={() => setFissionSelectedId('pu239')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      fissionSelectedId === 'pu239'
                        ? 'bg-[#73CAE5] text-[#0D0D0D] font-bold'
                        : 'text-[#B7B7B7] hover:text-white'
                    }`}
                  >
                    ²³⁹Pu
                  </button>
                </div>
              </div>

              {/* Canvas Atom Model */}
              <AtomCanvasModel
                key={`fission-${currentFissionAtom.id}-${angleSeed}`}
                isotope={currentFissionAtom}
                isPlaying={isPlaying}
                speed={speed}
                height={270}
                showBadge={true}
                showLegend={true}
                showElectrons={showElectrons}
              />

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Número Atômico (Z)</span>
                  <span className="text-white font-bold text-sm text-[#8F83FF]">{currentFissionAtom.protons} p⁺</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Nêutrons (N)</span>
                  <span className="text-white font-bold text-sm text-[#73CAE5]">{currentFissionAtom.neutrons} n⁰</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Massa Total (A)</span>
                  <span className="text-white font-bold text-sm">{currentFissionAtom.protons + currentFissionAtom.neutrons} u</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Energia / Núcleon</span>
                  <span className="text-emerald-400 font-bold text-xs">{currentFissionAtom.bindingEnergyPerNucleon}</span>
                </div>
              </div>
            </div>

            {/* Reaction Role Details */}
            <div className="p-3.5 rounded-xl bg-[#73CAE5]/5 border border-[#73CAE5]/20 text-xs space-y-1 mt-2">
              <div className="text-[#73CAE5] font-bold flex items-center space-x-1.5 font-mono text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Papel na Reação em Cadeia:</span>
              </div>
              <p className="text-[#B7B7B7] leading-relaxed">
                {currentFissionAtom.roleInReaction}
              </p>
              <div className="pt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#B7B7B7] font-mono">
                <span>Meia-Vida: <strong className="text-white">{currentFissionAtom.halfLife}</strong></span>
                <span>Decaimento: <strong className="text-white">{currentFissionAtom.decayType}</strong></span>
              </div>
            </div>
          </div>

          {/* FUSION PANEL */}
          <div className="bg-[#0D0D0D] border border-[#8F83FF]/30 rounded-2xl p-5 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              {/* Header & Isotope Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-[#8F83FF]/15 border border-[#8F83FF]/30 flex items-center justify-center">
                    <Flame className="w-3.5 h-3.5 text-[#8F83FF]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8F83FF]">
                      Rota da Fusão • Núcleos Ultraleves
                    </span>
                    <h4 className="text-base font-bold text-white font-display leading-tight">
                      {currentFusionAtom.name} ({currentFusionAtom.symbol})
                    </h4>
                  </div>
                </div>

                {/* Switch between Deutério and Trítio */}
                <div className="flex rounded-lg bg-white/5 p-1 border border-white/10 text-xs font-mono self-start sm:self-auto">
                  <button
                    onClick={() => setFusionSelectedId('deuterium')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      fusionSelectedId === 'deuterium'
                        ? 'bg-[#8F83FF] text-[#0D0D0D] font-bold'
                        : 'text-[#B7B7B7] hover:text-white'
                    }`}
                  >
                    ²H (D)
                  </button>
                  <button
                    onClick={() => setFusionSelectedId('tritium')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      fusionSelectedId === 'tritium'
                        ? 'bg-[#8F83FF] text-[#0D0D0D] font-bold'
                        : 'text-[#B7B7B7] hover:text-white'
                    }`}
                  >
                    ³H (T)
                  </button>
                </div>
              </div>

              {/* Canvas Atom Model */}
              <AtomCanvasModel
                key={`fusion-${currentFusionAtom.id}-${angleSeed}`}
                isotope={currentFusionAtom}
                isPlaying={isPlaying}
                speed={speed}
                height={270}
                showBadge={true}
                showLegend={true}
                showElectrons={showElectrons}
              />

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Número Atômico (Z)</span>
                  <span className="text-white font-bold text-sm text-[#8F83FF]">{currentFusionAtom.protons} p⁺</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Nêutrons (N)</span>
                  <span className="text-white font-bold text-sm text-[#73CAE5]">{currentFusionAtom.neutrons} n⁰</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Massa Total (A)</span>
                  <span className="text-white font-bold text-sm">{currentFusionAtom.protons + currentFusionAtom.neutrons} u</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                  <span className="text-[10px] text-[#B7B7B7] block">Energia / Núcleon</span>
                  <span className="text-amber-400 font-bold text-xs">{currentFusionAtom.bindingEnergyPerNucleon}</span>
                </div>
              </div>
            </div>

            {/* Reaction Role Details */}
            <div className="p-3.5 rounded-xl bg-[#8F83FF]/5 border border-[#8F83FF]/20 text-xs space-y-1 mt-2">
              <div className="text-[#8F83FF] font-bold flex items-center space-x-1.5 font-mono text-[11px]">
                <Info className="w-3.5 h-3.5" />
                <span>Papel na Reação Termonuclear D-T:</span>
              </div>
              <p className="text-[#B7B7B7] leading-relaxed">
                {currentFusionAtom.roleInReaction}
              </p>
              <div className="pt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#B7B7B7] font-mono">
                <span>Disponibilidade: <strong className="text-white">{currentFusionAtom.naturalAbundance}</strong></span>
                <span>Meia-Vida: <strong className="text-white">{currentFusionAtom.halfLife}</strong></span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: ALL FOUR ATOMS SIMULTANEOUS GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparativeIsotopes.map((iso, idx) => {
            const isFiss = iso.category === 'fission';
            return (
              <div
                key={iso.id}
                className={`bg-[#0D0D0D] rounded-xl p-4 border flex flex-col justify-between space-y-3 ${
                  isFiss ? 'border-[#73CAE5]/30' : 'border-[#8F83FF]/30'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        isFiss
                          ? 'bg-[#73CAE5]/15 text-[#73CAE5] border border-[#73CAE5]/30'
                          : 'bg-[#8F83FF]/15 text-[#8F83FF] border border-[#8F83FF]/30'
                      }`}
                    >
                      {isFiss ? 'Fissão' : 'Fusão'}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">{iso.symbol}</span>
                  </div>

                  <h4 className="text-sm font-bold text-white font-display">{iso.name}</h4>

                  <AtomCanvasModel
                    isotope={iso}
                    isPlaying={isPlaying}
                    speed={speed}
                    height={200}
                    showBadge={true}
                    showLegend={false}
                    showElectrons={showElectrons}
                    angleOffset={idx * 1.5}
                  />

                  <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-center pt-1">
                    <div className="bg-white/[0.03] p-1 rounded">
                      <span className="text-[#8F83FF] font-bold block">{iso.protons}p⁺</span>
                      <span className="text-[9px] text-[#B7B7B7]">Prótons</span>
                    </div>
                    <div className="bg-white/[0.03] p-1 rounded">
                      <span className="text-[#73CAE5] font-bold block">{iso.neutrons}n⁰</span>
                      <span className="text-[9px] text-[#B7B7B7]">Nêutrons</span>
                    </div>
                    <div className="bg-white/[0.03] p-1 rounded">
                      <span className="text-white font-bold block">{iso.protons + iso.neutrons}u</span>
                      <span className="text-[9px] text-[#B7B7B7]">Massa (A)</span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-[#B7B7B7] line-clamp-3 leading-relaxed border-t border-white/5 pt-2">
                  {iso.roleInReaction}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* THEORETICAL COMPARISON EXPLANATION BANNER */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#73CAE5]/10 via-[#111111] to-[#8F83FF]/10 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold text-white font-mono">
          <Sparkles className="w-4 h-4 text-[#73CAE5]" />
          <span>Física Subjacente: Por que Núcleos Pesados se Dividem e Leves se Unem?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#B7B7B7] leading-relaxed">
          <div className="space-y-1.5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <strong className="text-[#73CAE5] block">Fissão (U-235 & Pu-239): A Repulsão de Coulomb Vence</strong>
            <p>
              Com mais de 90 prótons positivos no núcleo, a força eletrostática repulsiva (que atua a longas distâncias) quase empata com a Força Forte residual (que atua apenas a ~1 femtômetro). A captura de um nêutron térmico deforma o núcleo numa forma de haltere; a repulsão mútua dos dois lobos rompe o núcleo ao meio liberando ~200 MeV em energia cinética pura.
            </p>
          </div>

          <div className="space-y-1.5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <strong className="text-[#8F83FF] block">Fusão (Deutério & Trítio): O Poço Profundo do Hélio-4</strong>
            <p>
              O Deutério (1p+1n) e o Trítio (1p+2n) possuem baixa energia de ligação por núcleon (~1,1 a 2,8 MeV). Quando aquecidos a 150 milhões de °C, vencem a barreira eletrostática e colidem; a Força Forte une-os no ultra-estável <strong>Hélio-4</strong> (7,07 MeV/núcleon). A diferença de massa de 0,0188 u converte-se instantaneamente em <strong>17,6 MeV</strong> de energia por reação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
