import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Info, Sparkles } from 'lucide-react';

interface IsotopeConfig {
  name: string;
  symbol: string;
  protons: number;
  neutrons: number;
  electrons: number;
  stability: 'Estável' | 'Radioativo' | 'Físsil';
  description: string;
  decayType?: string;
  halfLife?: string;
}

const ISOTOPES: IsotopeConfig[] = [
  {
    name: 'Hidrogênio-1 (Prótio)',
    symbol: '¹H',
    protons: 1,
    neutrons: 0,
    electrons: 1,
    stability: 'Estável',
    description: 'O átomo mais simples e abundante do Universo (99,98% do hidrogênio natural).'
  },
  {
    name: 'Deutério (Hidrogênio-2)',
    symbol: '²H (D)',
    protons: 1,
    neutrons: 1,
    electrons: 1,
    stability: 'Estável',
    description: 'Isótopo estável com 1 nêutron, fundamental para reações de fusão nuclear (D-T) e água pesada (D₂O).'
  },
  {
    name: 'Trítio (Hidrogênio-3)',
    symbol: '³H (T)',
    protons: 1,
    neutrons: 2,
    electrons: 1,
    stability: 'Radioativo',
    description: 'Isótopo radioativo do hidrogênio com 1 próton e 2 nêutrons. Decai emitindo elétrons beta de baixa energia e é insubstituível em reações de fusão experimental como no ITER.',
    decayType: 'Beta-menos (β⁻)',
    halfLife: '12,32 anos'
  },
  {
    name: 'Hélio-4',
    symbol: '⁴He',
    protons: 2,
    neutrons: 2,
    electrons: 2,
    stability: 'Estável',
    description: 'Núcleo de excepcional estabilidade ("número mágico" duplo), idêntico a uma partícula Alfa emitida em decaimentos radioativos.'
  },
  {
    name: 'Carbono-14',
    symbol: '¹⁴C',
    protons: 6,
    neutrons: 8,
    electrons: 6,
    stability: 'Radioativo',
    description: 'Isótopo radioativo gerado por raios cósmicos na alta atmosfera, com meia-vida de 5.730 anos, essencial para datação arqueológica e paleontológica.',
    decayType: 'Beta-menos (β⁻)',
    halfLife: '5.730 anos'
  },
  {
    name: 'Urânio-235',
    symbol: '²³⁵U',
    protons: 92,
    neutrons: 143,
    electrons: 92,
    stability: 'Físsil',
    description: 'Único isótopo físsil natural com nêutrons térmicos (0,72% do urânio na crosta terrestre); base do combustível para reatores comerciais e pesquisas.',
    decayType: 'Alfa (α) / Fissão induzida',
    halfLife: '704 milhões de anos'
  },
  {
    name: 'Plutônio-239',
    symbol: '²³⁹Pu',
    protons: 94,
    neutrons: 145,
    electrons: 94,
    stability: 'Físsil',
    description: 'Elemento transurânico sintético produzido em reatores nucleares por captura de nêutrons em Urânio-238. Possui número atômico Z=94 e massa atômica A=239.',
    decayType: 'Alfa (α) / Fissão induzida',
    halfLife: '24.110 anos'
  }
];

export const AtomSimulator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedIsotope, setSelectedIsotope] = useState<IsotopeConfig>(ISOTOPES[1]); // Default to Deuterium
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'3d' | 'bohr'>('3d');
  const animationFrameId = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 420);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = 420;
      }
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle background grid/glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 180);
      radialGlow.addColorStop(0, 'rgba(115, 202, 229, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(143, 131, 255, 0.03)');
      radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2);
      ctx.fill();

      // Orbital parameters based on selected element
      const orbitalCount = Math.min(Math.max(selectedIsotope.electrons > 2 ? 3 : 2, 2), 4);
      const orbitals = [
        { rx: 110, ry: 45, tilt: 0.2, speed: 1.2 * speed, color: 'rgba(115, 202, 229, 0.35)' },
        { rx: 140, ry: 55, tilt: -0.65, speed: -0.9 * speed, color: 'rgba(143, 131, 255, 0.35)' },
        { rx: 165, ry: 60, tilt: 0.85, speed: 0.7 * speed, color: 'rgba(255, 255, 255, 0.25)' },
        { rx: 190, ry: 70, tilt: -1.3, speed: -0.5 * speed, color: 'rgba(115, 202, 229, 0.25)' }
      ].slice(0, orbitalCount);

      // Draw Orbitals & Electrons
      orbitals.forEach((orb, index) => {
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(orb.tilt);

        // Orbit path
        ctx.strokeStyle = orb.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Electron position on orbit
        const eAngle = angleRef.current * orb.speed + (index * Math.PI) / 2;
        const ex = Math.cos(eAngle) * orb.rx;
        const ey = Math.sin(eAngle) * orb.ry;

        // Electron glow
        const eGlow = ctx.createRadialGradient(ex, ey, 1, ex, ey, 10);
        eGlow.addColorStop(0, '#73CAE5');
        eGlow.addColorStop(0.5, 'rgba(115, 202, 229, 0.4)');
        eGlow.addColorStop(1, 'rgba(115, 202, 229, 0)');
        ctx.fillStyle = eGlow;
        ctx.beginPath();
        ctx.arc(ex, ey, 8, 0, Math.PI * 2);
        ctx.fill();

        // Electron Core
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Render Dense Nucleus (Protons + Neutrons with 3D stacking)
      const nucleusRadius = Math.min(28 + (selectedIsotope.protons + selectedIsotope.neutrons) * 0.2, 45);

      // Nucleus containment glow
      const nucGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, nucleusRadius * 1.5);
      nucGlow.addColorStop(0, 'rgba(143, 131, 255, 0.3)');
      nucGlow.addColorStop(0.7, 'rgba(115, 202, 229, 0.15)');
      nucGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nucGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, nucleusRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Draw individual nucleons in stylized cluster
      const totalNucleons = Math.min(selectedIsotope.protons + selectedIsotope.neutrons, 32);
      const isHeavy = selectedIsotope.protons > 10;

      for (let i = 0; i < totalNucleons; i++) {
        const isProton = i % 2 === 0;
        const phi = (i * 2.39996) + angleRef.current * 0.1; // Golden angle for even packing
        const r = Math.sqrt(i / totalNucleons) * (nucleusRadius - 6);
        const nx = centerX + Math.cos(phi) * r;
        const ny = centerY + Math.sin(phi) * r * 0.9;

        ctx.beginPath();
        ctx.arc(nx, ny, isHeavy ? 4.5 : 6, 0, Math.PI * 2);
        if (isProton) {
          // Proton: Violet/Magenta with white highlight
          ctx.fillStyle = '#8F83FF';
          ctx.fill();
          ctx.strokeStyle = '#B3A8FF';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else {
          // Neutron: Cyan with subtle outline
          ctx.fillStyle = '#73CAE5';
          ctx.fill();
          ctx.strokeStyle = '#9DE5F7';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // If heavy atom (e.g. U-235), show central badge count
      if (isHeavy) {
        ctx.fillStyle = 'rgba(13, 13, 13, 0.85)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${selectedIsotope.protons + selectedIsotope.neutrons}`, centerX, centerY);
      }

      if (isPlaying) {
        angleRef.current += 0.015 * speed;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [selectedIsotope, isPlaying, speed, viewMode]);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Header bar of simulator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#73CAE5]" />
            <h3 className="text-base sm:text-lg font-bold text-white font-display">
              Simulador da Estrutura Atômica
            </h3>
          </div>
          <p className="text-xs text-[#B7B7B7] mt-0.5">
            Visualize prótons, nêutrons, elétrons e a estabilidade nuclear em tempo real.
          </p>
        </div>

        {/* Play / Pause / Speed Controls */}
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors focus:outline-none"
            title={isPlaying ? 'Pausar animação' : 'Iniciar animação'}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#73CAE5]" /> : <Play className="w-4 h-4 text-[#73CAE5]" />}
          </button>
          
          <button
            onClick={() => {
              angleRef.current = 0;
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
            title="Reiniciar posição orbital"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-[#73CAE5]"
          >
            <option value={0.5} className="bg-[#121212]">0.5x</option>
            <option value={1} className="bg-[#121212]">1.0x</option>
            <option value={2} className="bg-[#121212]">2.0x</option>
          </select>
        </div>
      </div>

      {/* Select isotope pills */}
      <div className="py-4">
        <div className="text-xs font-semibold text-[#B7B7B7] uppercase tracking-wider mb-2">
          Escolha um Isótopo para Analisar:
        </div>
        <div className="flex flex-wrap gap-2">
          {ISOTOPES.map((iso) => (
            <button
              key={iso.name}
              onClick={() => setSelectedIsotope(iso)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap focus:outline-none ${
                selectedIsotope.name === iso.name
                  ? 'bg-gradient-to-r from-[#73CAE5]/20 to-[#8F83FF]/20 text-white border border-[#73CAE5] shadow-md shadow-[#73CAE5]/10'
                  : 'bg-white/5 text-[#B7B7B7] border border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              <span className="font-bold text-[#73CAE5] mr-1.5 font-mono">{iso.symbol}</span>
              <span>{iso.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative rounded-xl bg-[#090909] border border-white/5 overflow-hidden flex items-center justify-center min-h-[380px]">
        <canvas ref={canvasRef} className="w-full h-[380px] block cursor-grab active:cursor-grabbing" />

        {/* Legend Overlay inside canvas */}
        <div className="absolute bottom-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 rounded-lg p-2.5 text-[11px] space-y-1.5 z-10 shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF]" />
            <span className="text-white">Próton (p⁺, +1e): <strong className="text-[#8F83FF] font-mono">{selectedIsotope.protons}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5]" />
            <span className="text-white">Nêutron (n⁰, 0): <strong className="text-[#73CAE5] font-mono">{selectedIsotope.neutrons}</strong></span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-white ring-2 ring-[#73CAE5]" />
            <span className="text-white">Elétron (e⁻, -1e): <strong className="text-white font-mono">{selectedIsotope.electrons}</strong></span>
          </div>
        </div>

        {/* Stability Badge Overlay */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border shadow-md ${
              selectedIsotope.stability === 'Estável'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : selectedIsotope.stability === 'Físsil'
                ? 'bg-purple-500/10 text-[#8F83FF] border-[#8F83FF]/40'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {selectedIsotope.stability}
          </span>
        </div>
      </div>

      {/* Isotope details block */}
      <div className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="sm:col-span-2 space-y-1">
          <div className="font-semibold text-white flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-[#73CAE5]" />
            <span>{selectedIsotope.name} ({selectedIsotope.symbol})</span>
          </div>
          <p className="text-[#B7B7B7] leading-relaxed">
            {selectedIsotope.description}
          </p>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-4">
          <div className="text-[#B7B7B7]">Número Atômico (Z): <strong className="text-[#8F83FF] font-mono">{selectedIsotope.protons} prótons</strong></div>
          <div className="text-[#B7B7B7]">Massa Atômica (A): <strong className="text-white font-mono">{selectedIsotope.protons + selectedIsotope.neutrons} u</strong></div>
          {selectedIsotope.halfLife && (
            <div className="text-[#B7B7B7]">Meia-vida: <strong className="text-[#73CAE5] font-mono">{selectedIsotope.halfLife}</strong></div>
          )}
          {selectedIsotope.decayType && (
            <div className="text-[#B7B7B7]">Modo de Decaimento: <strong className="text-[#8F83FF]">{selectedIsotope.decayType}</strong></div>
          )}
        </div>
      </div>

      {/* Educational definition of Isotope */}
      <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-[#73CAE5]/10 to-[#8F83FF]/10 border border-white/10 text-xs text-[#B7B7B7] leading-relaxed flex items-start space-x-2.5">
        <Sparkles className="w-4 h-4 text-[#73CAE5] shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">O que é um Isótopo?</strong> Isótopos são átomos que possuem o mesmo número de <strong>prótons</strong> (mesmo elemento químico e mesmas propriedades químicas na tabela periódica), mas quantidades diferentes de <strong>nêutrons</strong> no núcleo. Essa variação na quantidade de nêutrons altera a massa atômica e determina se o núcleo será estável, radioativo ou físsil.
        </div>
      </div>
    </div>
  );
};
