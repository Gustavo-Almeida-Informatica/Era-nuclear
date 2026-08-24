import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Flame, Zap, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

type SimMode = 'fission' | 'fusion';

export const FissionFusionSimulator: React.FC = () => {
  const [mode, setMode] = useState<SimMode>('fission');
  const [stage, setStage] = useState<number>(0); // 0: initial, 1: approaching, 2: compound, 3: split/fusion, 4: energetic release
  const [autoPlaying, setAutoPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const progressRef = useRef<number>(0);

  // Reset when changing mode
  useEffect(() => {
    setStage(0);
    progressRef.current = 0;
    setAutoPlaying(false);
  }, [mode]);

  // Stage steps descriptions
  const fissionSteps = [
    {
      title: '1. Nêutron Térmico Incidente',
      desc: 'Um nêutron lento (~0,025 eV) aproxima-se do núcleo pesado e estável de Urânio-235 (92 prótons, 143 nêutrons).'
    },
    {
      title: '2. Captura e Formação do Núcleo Excitado [²³⁶U]*',
      desc: 'O nêutron é absorvido pela força nuclear forte, gerando um estado intermediário instável e oscilante.'
    },
    {
      title: '3. Deformação e Ruptura da Gota Líquida',
      desc: 'A repulsão eletrostática entre os 92 prótons supera a tensão superficial da Força Forte, alongando o núcleo em dois lobos.'
    },
    {
      title: '4. Fissão e Emissão de Energia (200 MeV)',
      desc: 'O núcleo divide-se em fragmentos (ex: Bário-141 e Criptônio-92), liberando 2 a 3 nêutrons rápidos e radiação gama.'
    }
  ];

  const fusionSteps = [
    {
      title: '1. Núcleos Leves em Alta Velocidade',
      desc: 'Deutério (1p + 1n) e Trítio (1p + 2n) movem-se em alta velocidade térmica em um plasma a mais de 100 milhões de °C.'
    },
    {
      title: '2. Superação da Barreira Coulombiana',
      desc: 'A energia cinética térmica extrema vence a repulsão eletrostática mútua entre os prótons positivos a distâncias de 1 femtômetro.'
    },
    {
      title: '3. Coalescência e Tunelamento Quântico',
      desc: 'A Força Nuclear Forte assume o controle, fundindo os 5 núcleons em um estado hiperenergético de Hélio-5 efêmero.'
    },
    {
      title: '4. Formação de Hélio-4 e Liberação de Nêutron (17.6 MeV)',
      desc: 'O sistema ejeta um nêutron ultrarrápido (14,1 MeV) e um núcleo estável de Hélio-4 (3,5 MeV), gerando energia sem emissão de carbono.'
    }
  ];

  const currentSteps = mode === 'fission' ? fissionSteps : fusionSteps;

  // Auto-player timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlaying) {
      timer = setInterval(() => {
        setStage((prev) => {
          if (prev >= 3) {
            setAutoPlaying(false);
            return 3;
          }
          return prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(timer);
  }, [autoPlaying]);

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 550);
    let height = (canvas.height = 360);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      // Glow effect background
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 170);
      if (mode === 'fission') {
        grad.addColorStop(0, 'rgba(115, 202, 229, 0.1)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
      } else {
        grad.addColorStop(0, 'rgba(143, 131, 255, 0.12)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
      }
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      if (mode === 'fission') {
        // --- FISSION DRAWING ---
        if (stage === 0) {
          // Neutron at left, U-235 at center
          // U-235 Nucleus
          ctx.fillStyle = '#8F83FF';
          ctx.beginPath();
          ctx.arc(cx + 40, cy, 42, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#B3A8FF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 14px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('²³⁵U', cx + 40, cy - 6);
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText('92p + 143n', cx + 40, cy + 12);

          // Neutron
          ctx.fillStyle = '#73CAE5';
          ctx.beginPath();
          ctx.arc(cx - 140, cy, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Arrow indicating neutron motion
          ctx.strokeStyle = 'rgba(115, 202, 229, 0.8)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(cx - 125, cy);
          ctx.lineTo(cx - 20, cy);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#73CAE5';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.fillText('n⁰ (Térmico)', cx - 140, cy - 18);
        } else if (stage === 1) {
          // Compound U-236 vibrating
          const wobble = Math.sin(Date.now() * 0.02) * 5;

          ctx.fillStyle = '#A395FF';
          ctx.beginPath();
          ctx.ellipse(cx, cy, 48 + wobble, 44 - wobble, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 14px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('[²³⁶U]*', cx, cy - 8);
          ctx.font = '11px JetBrains Mono, monospace';
          ctx.fillStyle = '#FFE600';
          ctx.fillText('Instável / Excitado', cx, cy + 12);
        } else if (stage === 2) {
          // Elongation into dumbbell shape
          ctx.fillStyle = '#8F83FF';
          // Left lobe
          ctx.beginPath();
          ctx.arc(cx - 38, cy, 32, 0, Math.PI * 2);
          ctx.fill();
          // Right lobe
          ctx.beginPath();
          ctx.arc(cx + 38, cy, 28, 0, Math.PI * 2);
          ctx.fill();
          // Neck bridge
          ctx.fillRect(cx - 30, cy - 14, 60, 28);

          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('Estrangulamento Nuclear', cx, cy + 45);
        } else if (stage === 3) {
          // Full Fission Blast
          // Flash explosion ring
          ctx.strokeStyle = 'rgba(255, 230, 0, 0.4)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, 75, 0, Math.PI * 2);
          ctx.stroke();

          // Ba-141 Fragment (Left)
          ctx.fillStyle = '#73CAE5';
          ctx.beginPath();
          ctx.arc(cx - 90, cy - 25, 30, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#0D0D0D';
          ctx.font = 'bold 12px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('¹⁴¹Ba', cx - 90, cy - 25);

          // Kr-92 Fragment (Right)
          ctx.fillStyle = '#8F83FF';
          ctx.beginPath();
          ctx.arc(cx + 90, cy + 25, 26, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 12px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⁹²Kr', cx + 90, cy + 25);

          // 3 Free Secondary Neutrons flying out
          const nPositions = [
            { x: cx, y: cy - 90, label: 'n⁰ (+2 MeV)' },
            { x: cx - 40, y: cy + 85, label: 'n⁰' },
            { x: cx + 55, y: cy + 80, label: 'n⁰' }
          ];

          nPositions.forEach((np) => {
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(np.x, np.y, 7, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#73CAE5';
            ctx.lineWidth = 2;
            ctx.stroke();
          });

          // Energy text banner
          ctx.fillStyle = '#FFE600';
          ctx.font = 'bold 14px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('+ ~200 MeV Energia Cinética & γ', cx, cy - 10);
        }
      } else {
        // --- FUSION DRAWING ---
        if (stage === 0) {
          // Deuterium approaching from Left, Tritium from Right
          // Deuterium (1p + 1n)
          ctx.fillStyle = '#73CAE5';
          ctx.beginPath();
          ctx.arc(cx - 110, cy, 22, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#0D0D0D';
          ctx.font = 'bold 12px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('²H (D)', cx - 110, cy + 4);

          // Tritium (1p + 2n)
          ctx.fillStyle = '#8F83FF';
          ctx.beginPath();
          ctx.arc(cx + 110, cy, 26, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 12px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('³H (T)', cx + 110, cy + 4);

          // High temperature tag
          ctx.fillStyle = '#FF8A65';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.fillText('T > 100.000.000 °C (Plasma)', cx, cy - 50);
        } else if (stage === 1) {
          // Approaching against Coulomb barrier
          ctx.strokeStyle = 'rgba(255, 100, 100, 0.7)';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.arc(cx, cy, 45, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          ctx.fillStyle = '#73CAE5';
          ctx.beginPath();
          ctx.arc(cx - 28, cy, 20, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#8F83FF';
          ctx.beginPath();
          ctx.arc(cx + 28, cy, 24, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FF5252';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText('Repulsão Eletrostática Vencida', cx, cy + 60);
        } else if (stage === 2) {
          // Transient compound nucleus [5He]
          ctx.fillStyle = '#FFD54F';
          ctx.beginPath();
          ctx.arc(cx, cy, 38, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#0D0D0D';
          ctx.font = 'bold 14px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('[⁵He]*', cx, cy - 4);
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText('Coalescência Nuclear', cx, cy + 12);
        } else if (stage === 3) {
          // Fusion Ejection: Helium-4 (Alpha) + Fast Neutron (14.1 MeV)
          // Helium-4 (Left)
          ctx.fillStyle = '#8F83FF';
          ctx.beginPath();
          ctx.arc(cx - 75, cy, 32, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 14px Space Grotesk, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('⁴He (α)', cx - 75, cy - 4);
          ctx.font = '10px JetBrains Mono, monospace';
          ctx.fillText('+3,5 MeV', cx - 75, cy + 12);

          // Fast Neutron (Right)
          ctx.fillStyle = '#73CAE5';
          ctx.beginPath();
          ctx.arc(cx + 90, cy, 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();

          ctx.fillStyle = '#73CAE5';
          ctx.font = 'bold 11px JetBrains Mono, monospace';
          ctx.fillText('n⁰ (+14,1 MeV)', cx + 90, cy - 18);

          // Total Energy Release
          ctx.fillStyle = '#FFE600';
          ctx.font = 'bold 15px JetBrains Mono, monospace';
          ctx.fillText('Total: 17,6 MeV de Energia Limpa!', cx, cy + 85);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [mode, stage]);

  return (
    <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      {/* Mode Switch Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex bg-[#0A0A0A] p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setMode('fission')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
              mode === 'fission'
                ? 'bg-[#73CAE5] text-[#0D0D0D] shadow-md shadow-[#73CAE5]/20'
                : 'text-[#B7B7B7] hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Fissão (Quebra de Núcleo)</span>
          </button>
          <button
            onClick={() => setMode('fusion')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
              mode === 'fusion'
                ? 'bg-[#8F83FF] text-[#0D0D0D] shadow-md shadow-[#8F83FF]/20'
                : 'text-[#B7B7B7] hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Fusão (União de Núcleos)</span>
          </button>
        </div>

        {/* Stepper / Controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setAutoPlaying(!autoPlaying)}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 flex items-center space-x-1.5 focus:outline-none"
          >
            <Play className={`w-3.5 h-3.5 ${autoPlaying ? 'text-emerald-400' : 'text-[#73CAE5]'}`} />
            <span>{autoPlaying ? 'Pausar Passo a Passo' : 'Reproduzir Auto'}</span>
          </button>

          <button
            onClick={() => {
              setStage(0);
              setAutoPlaying(false);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white transition-colors"
            title="Reiniciar etapas"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="relative rounded-xl bg-[#090909] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-2">
        <canvas ref={canvasRef} className="w-full h-[320px] block" />
      </div>

      {/* Step Indicators & Current Step Explanation */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          {currentSteps.map((step, idx) => (
            <button
              key={step.title}
              onClick={() => {
                setStage(idx);
                setAutoPlaying(false);
              }}
              className={`p-2.5 rounded-lg text-left transition-all border text-xs ${
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
              <p className="font-medium truncate">{step.title.split('. ')[1]}</p>
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
