import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Flame, Zap, CheckCircle2, Sparkles, Atom } from 'lucide-react';
import {
  NuclearReaction3DViewport,
  SimMode,
  FissionFuel,
  FusionReaction,
} from './NuclearReaction3DViewport';

export const FissionFusionSimulator: React.FC = () => {
  const [mode, setMode] = useState<SimMode>('fission');
  const [fissionFuel, setFissionFuel] = useState<FissionFuel>('u235');
  const [fusionReaction, setFusionReaction] = useState<FusionReaction>('dt');
  const [speed, setSpeed] = useState<number>(1);
  const [stage, setStage] = useState<number>(0);
  const [autoPlaying, setAutoPlaying] = useState<boolean>(false);
  const [resetSignal, setResetSignal] = useState<number>(0);

  // Reset stage when switching mode or isotope/reaction
  useEffect(() => {
    setStage(0);
    setAutoPlaying(false);
    setResetSignal((c) => c + 1);
  }, [mode, fissionFuel, fusionReaction]);

  const handleStageChange = useCallback((newStage: number) => {
    setStage(newStage);
  }, []);

  const handleAutoPlayEnd = useCallback(() => {
    setAutoPlaying(false);
  }, []);

  // Stage descriptions preserved per fuel/reaction
  const fissionSteps =
    fissionFuel === 'u235'
      ? [
          {
            title: '1. Nêutron Térmico Incidente (1 n⁰)',
            desc: 'Um nêutron livre (~0,025 eV) aproxima-se do núcleo denso de Urânio-235 (92 prótons violetas e 143 nêutrons cianos unidos pela Força Nuclear Forte).',
          },
          {
            title: '2. Absorção e Excitação do Composto [²³⁶U]*',
            desc: 'O nêutron é capturado pelo poço de potencial nuclear. O núcleo composto oscila violentamente com 236 núcleons em agitação contínua.',
          },
          {
            title: '3. Deformação em Haltere (Gota Líquida)',
            desc: 'A repulsão eletrostática mútua entre os 92 prótons positivos supera a tensão superficial da Força Forte, deformando o núcleo em dois lobos.',
          },
          {
            title: '4. Fissão: Bário-141 + Criptônio-92 + 3 Nêutrons',
            desc: 'Ruptura violenta: formam-se os núcleos filhos ¹⁴¹Ba (56p, 85n) e ⁹²Kr (36p, 56n) com liberação de 3 nêutrons rápidos e ~200 MeV de energia!',
          },
        ]
      : [
          {
            title: '1. Nêutron Térmico Incidente (1 n⁰)',
            desc: 'Um nêutron térmico aproxima-se do núcleo fértil/físsil de Plutônio-239 (núcleo superpesado com 94 prótons e 145 nêutrons).',
          },
          {
            title: '2. Absorção e Excitação do Composto [²⁴⁰Pu]*',
            desc: 'Captura pelo poço nuclear. O núcleo composto [²⁴⁰Pu]* entra em ressonância altamente instável de 240 núcleons.',
          },
          {
            title: '3. Deformação em Haltere com Estrangulamento',
            desc: 'A colossal repulsão de Coulomb dos 94 prótons positivos estica o núcleo, afinando o pescoço de ligação central.',
          },
          {
            title: '4. Fissão: Xenônio-134 + Zircônio-104 + 2 Nêutrons',
            desc: 'Ruptura nuclear: formam-se ¹³⁴Xe (54p, 80n) e ¹⁰⁴Zr (40p, 64n), ejetando 2 nêutrons rápidos e liberando cerca de ~207 MeV!',
          },
        ];

  const fusionSteps =
    fusionReaction === 'dt'
      ? [
          {
            title: '1. Núcleos Leves: Deutério (²H) e Trítio (³H)',
            desc: 'Núcleo de Deutério (1 próton violeta + 1 nêutron ciano) e Trítio (1 próton violeta + 2 nêutrons cianos) aceleram a mais de 100 milhões de °C.',
          },
          {
            title: '2. Barreira Coulombiana e Tunelamento Quântico',
            desc: 'Os prótons positivos (+ / +) repelem-se com força extrema. A energia cinética e o tunelamento quântico vencem a barreira a 1 femtômetro.',
          },
          {
            title: '3. Coalescência Nuclear e Composto [⁵He]*',
            desc: 'A Força Nuclear Forte atrativa une os 5 núcleons (2 prótons + 3 nêutrons) em um estado quântico efêmero hiperenergético.',
          },
          {
            title: '4. Ejeção: Núcleo Hélio-4 (Alfa) + Nêutron (17,6 MeV)',
            desc: 'Decaimento no núcleo estável de Hélio-4 (2 prótons + 2 nêutrons, +3,5 MeV) e ejeção de 1 nêutron veloz (+14,1 MeV) gerando energia pura!',
          },
        ]
      : [
          {
            title: '1. Colisão Térmica: Deutério + Deutério (D-D)',
            desc: 'Dois núcleos de Deutério (cada um com 1 próton e 1 nêutron) colidem em altíssima velocidade em confinamento térmico.',
          },
          {
            title: '2. Vencendo a Repulsão Coulombiana',
            desc: 'A energia cinética térmica e o tunelamento quântico superam a barreira eletrostática dos 2 prótons em distâncias subatômicas.',
          },
          {
            title: '3. Formação do Núcleo Intermediário [⁴He]*',
            desc: 'Os 4 núcleons (2 prótons e 2 nêutrons) fundem-se em um núcleo composto excitado transitório.',
          },
          {
            title: '4. Produtos D-D: Hélio-3 (³He) + Nêutron (+3,27 MeV)',
            desc: 'Geração de núcleo de Hélio-3 (2p, 1n) com liberação de 1 nêutron (+3,27 MeV) ou Trítio (1p, 2n) + próton (+4,03 MeV).',
          },
        ];

  const currentSteps = mode === 'fission' ? fissionSteps : fusionSteps;

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl space-y-6">
      {/* Mode Switch Tabs and Particle Controls */}
      <div className="flex flex-col gap-4 pb-4 border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Main Fission / Fusion Mode Tabs */}
          <div className="flex w-full sm:w-auto bg-[#0A0A0A] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setMode('fission')}
              className={`flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                mode === 'fission'
                  ? 'bg-[#73CAE5] text-[#0D0D0D] shadow-md shadow-[#73CAE5]/20 font-bold'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Fissão Nuclear</span>
            </button>
            <button
              onClick={() => setMode('fusion')}
              className={`flex-1 sm:flex-none min-h-[40px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                mode === 'fusion'
                  ? 'bg-[#8F83FF] text-[#0D0D0D] shadow-md shadow-[#8F83FF]/20 font-bold'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Fusão Nuclear</span>
            </button>
          </div>

          {/* Secondary Isotope / Reaction Selector */}
          <div className="flex w-full sm:w-auto bg-[#0A0A0A] p-1 rounded-xl border border-white/10 text-xs">
            {mode === 'fission' ? (
              <>
                <button
                  onClick={() => setFissionFuel('u235')}
                  className={`flex-1 sm:flex-none min-h-[38px] px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    fissionFuel === 'u235'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  Urânio-235 (²³⁵U)
                </button>
                <button
                  onClick={() => setFissionFuel('pu239')}
                  className={`flex-1 sm:flex-none min-h-[38px] px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    fissionFuel === 'pu239'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  Plutônio-239 (²³⁹Pu)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setFusionReaction('dt')}
                  className={`flex-1 sm:flex-none min-h-[38px] px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    fusionReaction === 'dt'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  Deutério + Trítio (D-T)
                </button>
                <button
                  onClick={() => setFusionReaction('dd')}
                  className={`flex-1 sm:flex-none min-h-[38px] px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-center ${
                    fusionReaction === 'dd'
                      ? 'bg-white/20 text-white font-bold'
                      : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  Deutério + Deutério (D-D)
                </button>
              </>
            )}
          </div>
        </div>

        {/* Playback Controls and Speed */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Top particle legend */}
          <div className="flex flex-wrap items-center gap-3 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF] border border-[#B3A8FF]" />
              <span className="text-white font-medium">Próton (p⁺)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5] border border-[#9DE5F7]" />
              <span className="text-white font-medium">Nêutron (n⁰)</span>
            </div>
          </div>

          {/* Stepper / Speed / Play Controls */}
          <div className="flex flex-wrap items-center gap-2 max-sm:w-full">
            {/* Speed Selector */}
            <div className="flex bg-[#0A0A0A] p-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2.5 py-1.5 sm:px-2 sm:py-1 rounded transition-colors min-w-[36px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer ${
                    speed === s ? 'bg-white/20 text-white font-bold' : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setAutoPlaying(!autoPlaying)}
              className="flex-1 sm:flex-none justify-center min-h-[38px] sm:min-h-0 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 flex items-center space-x-1.5 focus:outline-none transition-colors cursor-pointer whitespace-nowrap"
            >
              {autoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#73CAE5]" />
                  <span>Reproduzir Auto</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setStage(0);
                setAutoPlaying(false);
                setResetSignal((c) => c + 1);
              }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white transition-colors min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center cursor-pointer"
              title="Reiniciar etapas"
              aria-label="Reiniciar etapas"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive 3D Three.js Simulation Viewport */}
      <div className="relative rounded-2xl bg-[#060913] border border-white/10 overflow-hidden flex flex-col shadow-inner max-sm:p-2 max-sm:gap-2">
        {/* Top-Right Badge: Active Nuclear Model (stacked above 3D stage on small mobile phones) */}
        <div className="max-sm:order-first max-sm:static max-sm:w-full max-sm:justify-center sm:absolute sm:top-3 sm:right-3 z-10 bg-[#0D0D0D]/95 border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-mono text-white/90 flex items-center space-x-1.5 shadow-md">
          <Atom className={`w-3 h-3 shrink-0 ${mode === 'fission' ? 'text-[#73CAE5]' : 'text-[#8F83FF]'}`} />
          <span>
            {mode === 'fission'
              ? fissionFuel === 'u235'
                ? 'Núcleo 3D: ²³⁵U (92p + 143n)'
                : 'Núcleo 3D: ²³⁹Pu (94p + 145n)'
              : fusionReaction === 'dt'
              ? 'Núcleos 3D: ²H + ³H (2p + 3n)'
              : 'Núcleos 3D: ²H + ²H (2p + 2n)'}
          </span>
        </div>

        {/* 3D WebGL Scene */}
        <div className="w-full rounded-xl sm:rounded-2xl overflow-hidden">
          <NuclearReaction3DViewport
            mode={mode}
            fissionFuel={fissionFuel}
            fusionReaction={fusionReaction}
            stage={stage}
            speed={speed}
            autoPlaying={autoPlaying}
            resetSignal={resetSignal}
            onStageChange={handleStageChange}
            onAutoPlayEnd={handleAutoPlayEnd}
          />
        </div>

        {/* Particle Counter Legend Overlay (bottom-left on tablet/desktop, stacked neatly below 3D stage on small phones) */}
        <div className="max-sm:static max-sm:w-full sm:absolute sm:bottom-3.5 sm:left-3 z-10 bg-[#0D0D0D]/95 border border-white/10 rounded-lg p-2.5 text-[11px] space-y-1.5 shadow-lg font-mono pointer-events-none">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF] shrink-0" />
            <span className="text-white">
              Próton (p⁺):{' '}
              <strong className="text-[#8F83FF]">
                {mode === 'fission'
                  ? fissionFuel === 'u235'
                    ? stage === 3
                      ? '56 (Ba) + 36 (Kr) = 92'
                      : '92'
                    : stage === 3
                    ? '54 (Xe) + 40 (Zr) = 94'
                    : '94'
                  : stage === 3
                  ? '2 (He)'
                  : '2'}
              </strong>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5] shrink-0" />
            <span className="text-white">
              Nêutron (n⁰):{' '}
              <strong className="text-[#73CAE5]">
                {mode === 'fission'
                  ? fissionFuel === 'u235'
                    ? stage === 0
                      ? '143 (U) + 1 livre'
                      : stage === 3
                      ? '85 (Ba) + 56 (Kr) + 3 livres = 144'
                      : '144'
                    : stage === 0
                    ? '145 (Pu) + 1 livre'
                    : stage === 3
                    ? '80 (Xe) + 64 (Zr) + 2 livres = 146'
                    : '146'
                  : stage === 3
                  ? fusionReaction === 'dt'
                    ? '2 (He) + 1 livre = 3'
                    : '1 (³He) + 1 livre = 2'
                  : fusionReaction === 'dt'
                  ? '3'
                  : '2'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Step Indicators & Current Step Explanation */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-4 gap-2">
          {currentSteps.map((step, idx) => (
            <button
              key={step.title}
              onClick={() => {
                setStage(idx);
                setAutoPlaying(false);
              }}
              className={`min-h-[44px] p-2.5 rounded-lg text-left transition-all border text-xs cursor-pointer ${
                stage === idx
                  ? mode === 'fission'
                    ? 'bg-[#73CAE5]/15 border-[#73CAE5] text-white shadow-md'
                    : 'bg-[#8F83FF]/15 border-[#8F83FF] text-white shadow-md'
                  : stage > idx
                  ? 'bg-white/[0.02] border-white/15 text-[#B7B7B7]'
                  : 'bg-white/[0.01] border-white/5 text-[#B7B7B7]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-[10px] text-white/70">PASSO 0{idx + 1}</span>
                {stage > idx && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </div>
              <p className="font-medium whitespace-normal break-words leading-snug">{step.title.split('. ')[1]}</p>
            </button>
          ))}
        </div>

        {/* Current Active Step Banner */}
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
          <div className="flex items-center space-x-2 text-sm font-bold text-white font-display">
            <Sparkles className="w-4 h-4 text-[#73CAE5]" />
            <span>{currentSteps[stage].title}</span>
          </div>
          <p className="text-xs text-[#B7B7B7] leading-relaxed">
            {currentSteps[stage].desc}
          </p>
        </div>
      </div>
    </div>
  );
};
