import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flame, Zap, CheckCircle2, Sparkles, Atom } from 'lucide-react';

type SimMode = 'fission' | 'fusion';
type FissionFuel = 'u235' | 'pu239';
type FusionReaction = 'dt' | 'dd';

interface Nucleon {
  id: number;
  type: 'proton' | 'neutron';
  x: number;
  y: number;
  z: number;
  cluster: 'ba' | 'kr' | 'free';
  fx: number;
  fy: number;
  fz: number;
}

// Deterministic generator for fission nucleons
function createFissionNucleons(fuel: FissionFuel): Nucleon[] {
  const nucleons: Nucleon[] = [];
  const isPu = fuel === 'pu239';
  
  // U-236 compound: 92p, 144n (Ba-141: 56p+85n, Kr-92: 36p+56n, Free: 3n)
  // Pu-240 compound: 94p, 146n (Xe-134: 54p+80n, Zr-104: 40p+64n, Free: 2n)
  let pFrag1 = isPu ? 54 : 56;
  let nFrag1 = isPu ? 80 : 85;
  let pFrag2 = isPu ? 40 : 36;
  let nFrag2 = isPu ? 64 : 56;
  const freeCount = isPu ? 2 : 3;
  const total = isPu ? 240 : 236;
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
  
  for (let i = 0; i < total; i++) {
    let type: 'proton' | 'neutron';
    let cluster: 'ba' | 'kr' | 'free';
    
    if (i < freeCount) {
      type = 'neutron';
      cluster = 'free';
    } else if (pFrag1 > 0 && (i % 2 === 0 || nFrag1 === 0)) {
      type = 'proton';
      cluster = 'ba';
      pFrag1--;
    } else if (pFrag2 > 0 && (i % 3 === 0 || nFrag2 === 0)) {
      type = 'proton';
      cluster = 'kr';
      pFrag2--;
    } else if (nFrag1 > 0) {
      type = 'neutron';
      cluster = 'ba';
      nFrag1--;
    } else {
      type = 'neutron';
      cluster = 'kr';
      nFrag2--;
    }

    const norm = (i + 1) / total;
    const r = Math.cbrt(norm) * 45;
    const y = 1 - (i / (total - 1)) * 2;
    const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;

    // Fragment offsets
    let fx = 0, fy = 0, fz = 0;
    const frag1Total = isPu ? 134 : 141;
    const frag2Total = isPu ? 104 : 92;
    
    if (cluster === 'ba') {
      const bIdx = ((isPu ? 54 : 56) - pFrag1) + ((isPu ? 80 : 85) - nFrag1);
      const bNorm = Math.cbrt(Math.max(1, bIdx) / frag1Total) * 32;
      const by = 1 - (bIdx / Math.max(1, frag1Total - 1)) * 2;
      const bRad = Math.sqrt(Math.max(0, 1 - by * by));
      const bTheta = phi * bIdx;
      fx = Math.cos(bTheta) * bRad * bNorm;
      fy = by * bNorm;
      fz = Math.sin(bTheta) * bRad * bNorm;
    } else if (cluster === 'kr') {
      const kIdx = ((isPu ? 40 : 36) - pFrag2) + ((isPu ? 64 : 56) - nFrag2);
      const kNorm = Math.cbrt(Math.max(1, kIdx) / frag2Total) * 28;
      const ky = 1 - (kIdx / Math.max(1, frag2Total - 1)) * 2;
      const kRad = Math.sqrt(Math.max(0, 1 - ky * ky));
      const kTheta = phi * kIdx;
      fx = Math.cos(kTheta) * kRad * kNorm;
      fy = ky * kNorm;
      fz = Math.sin(kTheta) * kRad * kNorm;
    }

    nucleons.push({
      id: i,
      type,
      x: x * r,
      y: y * r,
      z: z * r,
      cluster,
      fx,
      fy,
      fz
    });
  }

  return nucleons.sort((a, b) => a.z - b.z);
}

const STATIC_U235_NUCLEONS = createFissionNucleons('u235');
const STATIC_PU239_NUCLEONS = createFissionNucleons('pu239');

export const FissionFusionSimulator: React.FC = () => {
  const [mode, setMode] = useState<SimMode>('fission');
  const [fissionFuel, setFissionFuel] = useState<FissionFuel>('u235');
  const [fusionReaction, setFusionReaction] = useState<FusionReaction>('dt');
  const [speed, setSpeed] = useState<number>(1);
  const [stage, setStage] = useState<number>(0);
  const [autoPlaying, setAutoPlaying] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const angleRef = useRef<number>(0);

  // Reset when changing mode or fuel
  useEffect(() => {
    setStage(0);
    setAutoPlaying(false);
  }, [mode, fissionFuel, fusionReaction]);

  // Stage steps descriptions based on fuel/reaction
  const fissionSteps = fissionFuel === 'u235' ? [
    {
      title: '1. Nêutron Térmico Incidente (1 n⁰)',
      desc: 'Um nêutron livre (~0,025 eV) aproxima-se do núcleo denso de Urânio-235 (92 prótons violetas e 143 nêutrons cianos unidos pela Força Nuclear Forte).'
    },
    {
      title: '2. Absorção e Excitação do Composto [²³⁶U]*',
      desc: 'O nêutron é capturado pelo poço de potencial nuclear. O núcleo composto oscila violentamente com 236 núcleons em agitação contínua.'
    },
    {
      title: '3. Deformação em Haltere (Gota Líquida)',
      desc: 'A repulsão eletrostática mútua entre os 92 prótons positivos supera a tensão superficial da Força Forte, deformando o núcleo em dois lobos.'
    },
    {
      title: '4. Fissão: Bário-141 + Criptônio-92 + 3 Nêutrons',
      desc: 'Ruptura violenta: formam-se os núcleos filhos ¹⁴¹Ba (56p, 85n) e ⁹²Kr (36p, 56n) com liberação de 3 nêutrons rápidos e ~200 MeV de energia!'
    }
  ] : [
    {
      title: '1. Nêutron Térmico Incidente (1 n⁰)',
      desc: 'Um nêutron térmico aproxima-se do núcleo fértil/físsil de Plutônio-239 (núcleo superpesado com 94 prótons e 145 nêutrons).'
    },
    {
      title: '2. Absorção e Excitação do Composto [²⁴⁰Pu]*',
      desc: 'Captura pelo poço nuclear. O núcleo composto [²⁴⁰Pu]* entra em ressonância altamente instável de 240 núcleons.'
    },
    {
      title: '3. Deformação em Haltere com Estrangulamento',
      desc: 'A colossal repulsão de Coulomb dos 94 prótons positivos estica o núcleo, afinando o pescoço de ligação central.'
    },
    {
      title: '4. Fissão: Xenônio-134 + Zircônio-104 + 2 Nêutrons',
      desc: 'Ruptura nuclear: formam-se ¹³⁴Xe (54p, 80n) e ¹⁰⁴Zr (40p, 64n), ejetando 2 nêutrons rápidos e liberando cerca de ~207 MeV!'
    }
  ];

  const fusionSteps = fusionReaction === 'dt' ? [
    {
      title: '1. Núcleos Leves: Deutério (²H) e Trítio (³H)',
      desc: 'Núcleo de Deutério (1 próton violeta + 1 nêutron ciano) e Trítio (1 próton violeta + 2 nêutrons cianos) aceleram a mais de 100 milhões de °C.'
    },
    {
      title: '2. Barreira Coulombiana e Tunelamento Quântico',
      desc: 'Os prótons positivos (+ / +) repelem-se com força extrema. A energia cinética e o tunelamento quântico vencem a barreira a 1 femtômetro.'
    },
    {
      title: '3. Coalescência Nuclear e Composto [⁵He]*',
      desc: 'A Força Nuclear Forte atrativa une os 5 núcleons (2 prótons + 3 nêutrons) em um estado quântico efêmero hiperenergético.'
    },
    {
      title: '4. Ejeção: Núcleo Hélio-4 (Alfa) + Nêutron (17,6 MeV)',
      desc: 'Decaimento no núcleo estável de Hélio-4 (2 prótons + 2 nêutrons, +3,5 MeV) e ejeção de 1 nêutron veloz (+14,1 MeV) gerando energia pura!'
    }
  ] : [
    {
      title: '1. Colisão Térmica: Deutério + Deutério (D-D)',
      desc: 'Dois núcleos de Deutério (cada um com 1 próton e 1 nêutron) colidem em altíssima velocidade em confinamento térmico.'
    },
    {
      title: '2. Vencendo a Repulsão Coulombiana',
      desc: 'A energia cinética térmica e o tunelamento quântico superam a barreira eletrostática dos 2 prótons em distâncias subatômicas.'
    },
    {
      title: '3. Formação do Núcleo Intermediário [⁴He]*',
      desc: 'Os 4 núcleons (2 prótons e 2 nêutrons) fundem-se em um núcleo composto excitado transitório.'
    },
    {
      title: '4. Produtos D-D: Hélio-3 (³He) + Nêutron (+3,27 MeV)',
      desc: 'Geração de núcleo de Hélio-3 (2p, 1n) com liberação de 1 nêutron (+3,27 MeV) ou Trítio (1p, 2n) + próton (+4,03 MeV).'
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
      }, 3200);
    }
    return () => clearInterval(timer);
  }, [autoPlaying]);

  // Helper matching the AtomSimulator Nucleon Design (flat clean vector with outline)
  const drawNucleon = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    type: 'proton' | 'neutron',
    symbol?: string
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);

    if (type === 'proton') {
      ctx.fillStyle = '#8F83FF';
      ctx.fill();
      ctx.strokeStyle = '#B3A8FF';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    } else {
      ctx.fillStyle = '#73CAE5';
      ctx.fill();
      ctx.strokeStyle = '#9DE5F7';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    if (symbol && radius >= 7) {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(radius * 1.05)}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(symbol, x, y + 0.5);
    }

    ctx.restore();
  };

  // Helper for nuclear containment glow matching AtomSimulator
  const drawNucleusContainmentGlow = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    radius: number,
    customColor?: string
  ) => {
    ctx.save();
    const nucGlow = ctx.createRadialGradient(cx, cy, 3, cx, cy, radius * 1.6);
    if (customColor === 'gold') {
      nucGlow.addColorStop(0, 'rgba(255, 230, 0, 0.45)');
      nucGlow.addColorStop(0.7, 'rgba(255, 170, 0, 0.15)');
    } else {
      nucGlow.addColorStop(0, 'rgba(143, 131, 255, 0.35)');
      nucGlow.addColorStop(0.7, 'rgba(115, 202, 229, 0.15)');
    }
    nucGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = nucGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = width < 500 ? 310 : 360);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
      height = canvas.height = width < 500 ? 310 : 360;
    };
    window.addEventListener('resize', handleResize);
    const ro = typeof ResizeObserver !== 'undefined' && canvas.parentElement
      ? new ResizeObserver(handleResize)
      : null;
    if (ro && canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      angleRef.current += 0.02 * speed;
      const t = angleRef.current;

      // Scale factor for mobile devices (<550px) to prevent elements clipping while preserving 100% desktop geometry
      const scale = Math.min(1, Math.max(0.55, width / 550));
      const isMobile = width < 480;
      const maxTextFull = isMobile ? width - 16 : undefined;
      const maxTextHalf = isMobile ? Math.max(115, Math.floor(width * 0.44)) : undefined;

      // Subtle background radial glow matching AtomSimulator
      const radialGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 190 * scale);
      radialGlow.addColorStop(0, mode === 'fission' ? 'rgba(115, 202, 229, 0.08)' : 'rgba(143, 131, 255, 0.08)');
      radialGlow.addColorStop(0.5, 'rgba(143, 131, 255, 0.03)');
      radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 210 * scale, 0, Math.PI * 2);
      ctx.fill();

      // =======================================================================
      // MODE 1: FISSÃO NUCLEAR (Urânio-235 ou Plutônio-239)
      // =======================================================================
      if (mode === 'fission') {
        const nucleonRadius = 4.2 * Math.min(1, Math.max(0.85, scale));
        const isPu = fissionFuel === 'pu239';
        const activeNucleons = isPu ? STATIC_PU239_NUCLEONS : STATIC_U235_NUCLEONS;
        const parentSymbol = isPu ? '²³⁹Pu' : '²³⁵U';
        const parentName = isPu ? 'Plutônio-239' : 'Urânio-235';
        const parentZ = isPu ? 94 : 92;
        const parentN = isPu ? 145 : 143;
        const compoundSymbol = isPu ? '[²⁴⁰Pu]*' : '[²³⁶U]*';
        const compoundA = isPu ? '240*' : '236*';
        const frag1Name = isPu ? 'Xenônio-134 (¹³⁴Xe)' : 'Bário-141 (¹⁴¹Ba)';
        const frag1Z = isPu ? 54 : 56;
        const frag1N = isPu ? 80 : 85;
        const frag1A = isPu ? '134' : '141';
        const frag2Name = isPu ? 'Zircônio-104 (¹⁰⁴Zr)' : 'Criptônio-92 (⁹²Kr)';
        const frag2Z = isPu ? 40 : 36;
        const frag2N = isPu ? 64 : 56;
        const frag2A = isPu ? '104' : '92';
        const freeCount = isPu ? 2 : 3;
        const energyText = isPu ? '⚡ Liberação de ~207 MeV' : '⚡ Liberação de ~200 MeV';

        if (stage === 0) {
          // --- STAGE 0: Initial atom and incoming thermal neutron ---
          const uCenter = { x: cx + Math.round(35 * scale), y: cy };
          const nIncoming = { x: cx - Math.round(135 * scale) + (Math.sin(t * 1.2) * 6), y: cy };

          // Trajectory dashed guide
          ctx.save();
          ctx.strokeStyle = 'rgba(115, 202, 229, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(nIncoming.x + 12, cy);
          ctx.lineTo(uCenter.x - 50 * scale, cy);
          ctx.stroke();
          ctx.restore();

          // Nucleus containment glow matching AtomSimulator
          drawNucleusContainmentGlow(ctx, uCenter.x, uCenter.y, 46 * scale);

          // Incoming thermal neutron
          drawNucleon(ctx, nIncoming.x, nIncoming.y, 7 * scale, 'neutron', 'n');
          ctx.fillStyle = '#73CAE5';
          ctx.font = `bold ${isMobile ? '10px' : '11px'} JetBrains Mono, monospace`;
          ctx.textAlign = 'center';
          ctx.fillText('n⁰ (Térmico)', nIncoming.x, nIncoming.y - 14);

          // Draw the nucleons of the target atom
          for (let i = freeCount; i < activeNucleons.length; i++) {
            const n = activeNucleons[i];
            const px = uCenter.x + n.x * scale;
            const py = uCenter.y + n.y * scale;
            drawNucleon(ctx, px, py, nucleonRadius, n.type);
          }

          // Central badge count matching AtomSimulator
          ctx.save();
          ctx.fillStyle = 'rgba(13, 13, 13, 0.88)';
          ctx.beginPath();
          ctx.arc(uCenter.x, uCenter.y, 16 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '9.5px' : '10.5px'} JetBrains Mono, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(isPu ? '239' : '235', uCenter.x, uCenter.y);
          ctx.restore();

          // Labels
          const labelX = isMobile ? cx : uCenter.x;
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '11px' : '13px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(`Núcleo de ${parentName} (${parentSymbol})`, labelX, uCenter.y + Math.round(65 * scale), maxTextFull);
          ctx.font = `${isMobile ? '9px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#B7B7B7';
          ctx.fillText(`${parentZ} Prótons (#8F83FF) • ${parentN} Nêutrons (#73CAE5)`, labelX, uCenter.y + Math.round(80 * scale), maxTextFull);

        } else if (stage === 1) {
          // --- STAGE 1: Excited Compound Nucleus oscillating ---
          const uCenter = { x: cx, y: cy };
          const wobble = Math.sin(t * 5) * 4;

          drawNucleusContainmentGlow(ctx, uCenter.x, uCenter.y, (48 + wobble) * scale, 'gold');

          for (let i = 0; i < activeNucleons.length; i++) {
            const n = activeNucleons[i];
            const vibX = Math.sin(t * 7 + n.id) * 2.2 * scale;
            const vibY = Math.cos(t * 7 + n.id * 1.3) * 2.2 * scale;
            const scaleX = 1 + (wobble * 0.05);
            const scaleY = 1 - (wobble * 0.05);

            const px = uCenter.x + (n.x * scale * scaleX) + vibX;
            const py = uCenter.y + (n.y * scale * scaleY) + vibY;
            drawNucleon(ctx, px, py, nucleonRadius, n.type);
          }

          // Central badge matching AtomSimulator
          ctx.save();
          ctx.fillStyle = 'rgba(13, 13, 13, 0.9)';
          ctx.beginPath();
          ctx.arc(uCenter.x, uCenter.y, 16 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#FFE600';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.fillStyle = '#FFE600';
          ctx.font = `bold ${isMobile ? '9px' : '10px'} JetBrains Mono, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(compoundA, uCenter.x, uCenter.y);
          ctx.restore();

          ctx.fillStyle = '#FFE600';
          ctx.font = `bold ${isMobile ? '11.5px' : '14px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(`Núcleo Composto Altamente Excitado ${compoundSymbol}`, cx, cy - Math.round(65 * scale), maxTextFull);
          ctx.font = `${isMobile ? '9px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(`${parentZ} Prótons 🟣 + ${parentN + 1} Nêutrons 🔵 = ${isPu ? 240 : 236} Núcleons em Vibração Ressonante`, cx, cy + Math.round(70 * scale), maxTextFull);

        } else if (stage === 2) {
          // --- STAGE 2: Dumbbell elongation (Neck constriction) ---
          const neckDist = Math.round(48 * scale);
          const baCenter = { x: cx - neckDist, y: cy };
          const krCenter = { x: cx + neckDist, y: cy };

          drawNucleusContainmentGlow(ctx, baCenter.x, baCenter.y, 34 * scale);
          drawNucleusContainmentGlow(ctx, krCenter.x, krCenter.y, 29 * scale);

          for (let i = 0; i < activeNucleons.length; i++) {
            const n = activeNucleons[i];
            let px = cx, py = cy;

            if (n.cluster === 'ba') {
              px = baCenter.x + n.fx * 1.1 * scale + Math.sin(t * 6 + n.id) * 1.2 * scale;
              py = baCenter.y + n.fy * 0.95 * scale + Math.cos(t * 6 + n.id) * 1.2 * scale;
            } else if (n.cluster === 'kr') {
              px = krCenter.x + n.fx * 1.1 * scale + Math.sin(t * 6 + n.id) * 1.2 * scale;
              py = krCenter.y + n.fy * 0.95 * scale + Math.cos(t * 6 + n.id) * 1.2 * scale;
            } else {
              const neckOffset = (n.id - 1) * 14 * scale;
              px = cx + (Math.sin(t * 7 + n.id) * 6 * scale);
              py = cy + neckOffset + (Math.cos(t * 7 + n.id) * 4 * scale);
            }

            drawNucleon(ctx, px, py, nucleonRadius, n.type);
          }

          // Electric repulsion field lines
          ctx.save();
          ctx.strokeStyle = 'rgba(143, 131, 255, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(cx - 22 * scale, cy - 35 * scale);
          ctx.lineTo(cx + 22 * scale, cy - 35 * scale);
          ctx.moveTo(cx - 22 * scale, cy + 35 * scale);
          ctx.lineTo(cx + 22 * scale, cy + 35 * scale);
          ctx.stroke();
          ctx.restore();

          ctx.fillStyle = '#8F83FF';
          ctx.font = `bold ${isMobile ? '10.5px' : '12px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('Estrangulamento da Gota Líquida (Haltere Nuclear)', cx, cy - Math.round(65 * scale), maxTextFull);
          ctx.font = `${isMobile ? '9px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#B7B7B7';
          ctx.fillText('Repulsão Eletrostática Coulombiana supera a Força Nuclear Forte', cx, cy + Math.round(70 * scale), maxTextFull);

        } else if (stage === 3) {
          // --- STAGE 3: Full Fission (Two daughter nuclei + free neutrons) ---
          const separation = Math.round(108 * scale);
          const baCenter = { x: cx - separation, y: cy - Math.round(20 * scale) };
          const krCenter = { x: cx + separation, y: cy + Math.round(20 * scale) };

          // Center explosion flash
          ctx.save();
          const flashGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 60 * scale);
          flashGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
          flashGrad.addColorStop(0.3, 'rgba(115, 202, 229, 0.4)');
          flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, 60 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          drawNucleusContainmentGlow(ctx, baCenter.x, baCenter.y, 32 * scale);
          drawNucleusContainmentGlow(ctx, krCenter.x, krCenter.y, 26 * scale);

          // Render nucleons in Daughter 1 and Daughter 2
          for (let i = 0; i < activeNucleons.length; i++) {
            const n = activeNucleons[i];
            if (n.cluster === 'ba') {
              const px = baCenter.x + n.fx * scale;
              const py = baCenter.y + n.fy * scale;
              drawNucleon(ctx, px, py, nucleonRadius, n.type);
            } else if (n.cluster === 'kr') {
              const px = krCenter.x + n.fx * scale;
              const py = krCenter.y + n.fy * scale;
              drawNucleon(ctx, px, py, nucleonRadius, n.type);
            }
          }

          // Central badges for fragments matching AtomSimulator
          ctx.save();
          ctx.fillStyle = 'rgba(13, 13, 13, 0.88)';
          ctx.beginPath();
          ctx.arc(baCenter.x, baCenter.y, 14 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '8.5px' : '9.5px'} JetBrains Mono, monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(frag1A, baCenter.x, baCenter.y);

          ctx.beginPath();
          ctx.arc(krCenter.x, krCenter.y, 13 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(frag2A, krCenter.x, krCenter.y);
          ctx.restore();

          // Free high-energy neutrons flying outwards
          const freeNeutrons = isPu ? [
            { x: cx - Math.round(25 * scale), y: cy - Math.round(80 * scale) },
            { x: cx + Math.round(35 * scale), y: cy + Math.round(75 * scale) }
          ] : [
            { x: cx - Math.round(15 * scale), y: cy - Math.round(85 * scale) },
            { x: cx - Math.round(40 * scale), y: cy + Math.round(75 * scale) },
            { x: cx + Math.round(45 * scale), y: cy + Math.round(70 * scale) }
          ];

          freeNeutrons.forEach((fn, idx) => {
            ctx.save();
            ctx.strokeStyle = '#73CAE5';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(fn.x, fn.y);
            ctx.stroke();
            ctx.restore();

            drawNucleon(ctx, fn.x, fn.y, 6.5 * Math.max(0.8, scale), 'neutron', 'n');
            ctx.fillStyle = '#73CAE5';
            ctx.font = `bold ${isMobile ? '8.5px' : '9.5px'} JetBrains Mono, monospace`;
            ctx.textAlign = 'center';
            ctx.fillText(`n⁰ livre #${idx + 1}`, fn.x, fn.y - Math.round(11 * scale));
          });

          // Fragment Labels
          const baLabelX = isMobile ? Math.max(width * 0.25, baCenter.x) : baCenter.x;
          const krLabelX = isMobile ? Math.min(width * 0.75, krCenter.x) : krCenter.x;

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '12px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(`Núcleo Filho: ${frag1Name}`, baLabelX, baCenter.y - Math.round(44 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '9.5px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#73CAE5';
          ctx.fillText(`${frag1Z}p⁺ 🟣 + ${frag1N}n⁰ 🔵`, baLabelX, baCenter.y + Math.round(44 * scale), maxTextHalf);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '12px'} Space Grotesk, sans-serif`;
          ctx.fillText(`Núcleo Filho: ${frag2Name}`, krLabelX, krCenter.y - Math.round(38 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '9.5px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#8F83FF';
          ctx.fillText(`${frag2Z}p⁺ 🟣 + ${frag2N}n⁰ 🔵`, krLabelX, krCenter.y + Math.round(38 * scale), maxTextHalf);

          ctx.fillStyle = '#FFE600';
          ctx.font = `bold ${isMobile ? '11px' : '13px'} JetBrains Mono, monospace`;
          ctx.fillText(energyText, cx, cy + Math.round(120 * scale), maxTextFull);
        }

      // =======================================================================
      // MODE 2: FUSÃO NUCLEAR (Deutério com Trítio ou D-D)
      // =======================================================================
      } else {
        const nucleonR = 12 * Math.min(1, Math.max(0.8, scale));
        const isDD = fusionReaction === 'dd';

        if (stage === 0) {
          // --- STAGE 0: Deuterium & Tritium / Deuterium nuclei ---
          const dCenter = { x: cx - Math.round(110 * scale), y: cy };
          const tCenter = { x: cx + Math.round(110 * scale), y: cy };

          drawNucleusContainmentGlow(ctx, dCenter.x, dCenter.y, 18 * scale);

          const rotD = t * 1.2;
          const dP = { x: dCenter.x + Math.cos(rotD) * 10 * scale, y: dCenter.y + Math.sin(rotD) * 10 * scale };
          const dN = { x: dCenter.x - Math.cos(rotD) * 10 * scale, y: dCenter.y - Math.sin(rotD) * 10 * scale };

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(dP.x, dP.y);
          ctx.lineTo(dN.x, dN.y);
          ctx.stroke();

          drawNucleon(ctx, dP.x, dP.y, nucleonR, 'proton', '+');
          drawNucleon(ctx, dN.x, dN.y, nucleonR, 'neutron', 'n');

          // Partner nucleus: Tritium (³H) or 2nd Deuterium
          if (isDD) {
            drawNucleusContainmentGlow(ctx, tCenter.x, tCenter.y, 18 * scale);

            const rotT = -t * 1.2;
            const tP = { x: tCenter.x + Math.cos(rotT) * 10 * scale, y: tCenter.y + Math.sin(rotT) * 10 * scale };
            const tN = { x: tCenter.x - Math.cos(rotT) * 10 * scale, y: tCenter.y - Math.sin(rotT) * 10 * scale };

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(tP.x, tP.y);
            ctx.lineTo(tN.x, tN.y);
            ctx.stroke();

            drawNucleon(ctx, tP.x, tP.y, nucleonR, 'proton', '+');
            drawNucleon(ctx, tN.x, tN.y, nucleonR, 'neutron', 'n');
          } else {
            drawNucleusContainmentGlow(ctx, tCenter.x, tCenter.y, 20 * scale);

            const rotT = t * 1.1;
            const tP = { x: tCenter.x + Math.cos(rotT) * 12 * scale, y: tCenter.y + Math.sin(rotT) * 12 * scale };
            const tN1 = { x: tCenter.x + Math.cos(rotT + 2.1) * 12 * scale, y: tCenter.y + Math.sin(rotT + 2.1) * 12 * scale };
            const tN2 = { x: tCenter.x + Math.cos(rotT + 4.2) * 12 * scale, y: tCenter.y + Math.sin(rotT + 4.2) * 12 * scale };

            ctx.beginPath();
            ctx.moveTo(tP.x, tP.y);
            ctx.lineTo(tN1.x, tN1.y);
            ctx.lineTo(tN2.x, tN2.y);
            ctx.closePath();
            ctx.stroke();

            drawNucleon(ctx, tP.x, tP.y, nucleonR, 'proton', '+');
            drawNucleon(ctx, tN1.x, tN1.y, nucleonR, 'neutron', 'n');
            drawNucleon(ctx, tN2.x, tN2.y, nucleonR, 'neutron', 'n');
          }

          // Trajectory dashed arrows
          ctx.save();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(dCenter.x + 35 * scale, cy);
          ctx.lineTo(cx - 25 * scale, cy);
          ctx.moveTo(tCenter.x - 35 * scale, cy);
          ctx.lineTo(cx + 25 * scale, cy);
          ctx.stroke();
          ctx.restore();

          // Labels
          const dLabelX = isMobile ? Math.max(width * 0.25, dCenter.x) : dCenter.x;
          const tLabelX = isMobile ? Math.min(width * 0.75, tCenter.x) : tCenter.x;

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '13px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('Núcleo de Deutério (²H / D)', dLabelX, dCenter.y + Math.round(48 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#73CAE5';
          ctx.fillText('1 Próton 🟣 + 1 Nêutron 🔵', dLabelX, dCenter.y + Math.round(64 * scale), maxTextHalf);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '13px'} Space Grotesk, sans-serif`;
          ctx.fillText(isDD ? 'Núcleo de Deutério (²H / D)' : 'Núcleo de Trítio (³H / T)', tLabelX, tCenter.y + Math.round(48 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#8F83FF';
          ctx.fillText(isDD ? '1 Próton 🟣 + 1 Nêutron 🔵' : '1 Próton 🟣 + 2 Nêutrons 🔵', tLabelX, tCenter.y + Math.round(64 * scale), maxTextHalf);

          ctx.fillStyle = '#73CAE5';
          ctx.font = `bold ${isMobile ? '9.5px' : '11px'} JetBrains Mono, monospace`;
          ctx.fillText('Núcleos Térmicos em Rota de Colisão (T > 100.000.000 °C)', cx, cy - Math.round(65 * scale), maxTextFull);

        } else if (stage === 1) {
          // --- STAGE 1: Coulomb Barrier & Approaching Protons ---
          const dCenter = { x: cx - Math.round(35 * scale), y: cy };
          const tCenter = { x: cx + Math.round(35 * scale), y: cy };

          const barrierPulse = Math.sin(t * 8) * 4 * scale;
          ctx.save();
          ctx.strokeStyle = 'rgba(143, 131, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(cx, cy, 38 * scale + barrierPulse, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          drawNucleon(ctx, dCenter.x - 6 * scale, cy - 8 * scale, nucleonR, 'proton', '+');
          drawNucleon(ctx, dCenter.x - 6 * scale, cy + 12 * scale, nucleonR, 'neutron', 'n');

          drawNucleon(ctx, tCenter.x + 6 * scale, cy - 8 * scale, nucleonR, 'proton', '+');
          drawNucleon(ctx, tCenter.x + 12 * scale, cy + 12 * scale, nucleonR, 'neutron', 'n');
          if (!isDD) {
            drawNucleon(ctx, tCenter.x - 4 * scale, cy + 14 * scale, nucleonR, 'neutron', 'n');
          }

          ctx.fillStyle = '#8F83FF';
          ctx.font = `bold ${isMobile ? '11px' : '13px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('Barreira Coulombiana: Repulsão entre Prótons (+ / +)', cx, cy - Math.round(58 * scale), maxTextFull);
          ctx.font = `${isMobile ? '9px' : '10.5px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#FFE600';
          ctx.fillText('Tunelamento Quântico supera a repulsão eletrostática a distâncias < 1 fm', cx, cy + Math.round(62 * scale), maxTextFull);

        } else if (stage === 2) {
          // --- STAGE 2: Quantum Coalescence [5He]* or [4He]* ---
          const jitter = Math.sin(t * 12) * 2 * scale;
          drawNucleusContainmentGlow(ctx, cx, cy, 35 * scale, 'gold');

          const pos = isDD ? [
            { x: cx - 11 * scale + jitter, y: cy - 9 * scale, type: 'proton' as const, sym: '+' },
            { x: cx + 11 * scale - jitter, y: cy - 9 * scale, type: 'proton' as const, sym: '+' },
            { x: cx - 12 * scale, y: cy + 11 * scale + jitter, type: 'neutron' as const, sym: 'n' },
            { x: cx + 12 * scale, y: cy + 11 * scale - jitter, type: 'neutron' as const, sym: 'n' }
          ] : [
            { x: cx - 11 * scale + jitter, y: cy - 10 * scale, type: 'proton' as const, sym: '+' },
            { x: cx + 11 * scale - jitter, y: cy - 10 * scale, type: 'proton' as const, sym: '+' },
            { x: cx - 14 * scale, y: cy + 12 * scale + jitter, type: 'neutron' as const, sym: 'n' },
            { x: cx + 14 * scale, y: cy + 12 * scale - jitter, type: 'neutron' as const, sym: 'n' },
            { x: cx, y: cy + 2 * scale + jitter, type: 'neutron' as const, sym: 'n' }
          ];

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < pos.length; i++) {
            for (let j = i + 1; j < pos.length; j++) {
              ctx.moveTo(pos[i].x, pos[i].y);
              ctx.lineTo(pos[j].x, pos[j].y);
            }
          }
          ctx.stroke();

          pos.forEach((p) => drawNucleon(ctx, p.x, p.y, nucleonR, p.type, p.sym));

          ctx.fillStyle = '#FFE600';
          ctx.font = `bold ${isMobile ? '11px' : '13px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(isDD ? 'Núcleo Composto Efêmero [⁴He]*' : 'Núcleo Composto Efêmero [⁵He]*', cx, cy - Math.round(58 * scale), maxTextFull);
          ctx.font = `${isMobile ? '9px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(isDD ? 'Força Nuclear Forte funde os 4 núcleons (2p + 2n)' : 'Força Nuclear Forte funde os 5 núcleons (2p + 3n)', cx, cy + Math.round(62 * scale), maxTextFull);

        } else if (stage === 3) {
          // --- STAGE 3: Helium Nucleus + Ejected Particle ---
          const alphaCenter = { x: cx - Math.round(90 * scale), y: cy };
          const freeNeutron = { x: cx + Math.round(115 * scale), y: cy };

          // Center flash
          ctx.save();
          const flashGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 50 * scale);
          flashGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
          flashGrad.addColorStop(0.4, 'rgba(115, 202, 229, 0.4)');
          flashGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = flashGrad;
          ctx.beginPath();
          ctx.arc(cx, cy, 50 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          drawNucleusContainmentGlow(ctx, alphaCenter.x, alphaCenter.y, 22 * scale);

          const aP1 = { x: alphaCenter.x - 9 * scale, y: alphaCenter.y - 9 * scale };
          const aP2 = { x: alphaCenter.x + 9 * scale, y: alphaCenter.y + 9 * scale };
          const aN1 = { x: alphaCenter.x + 9 * scale, y: alphaCenter.y - 9 * scale };
          const aN2 = { x: alphaCenter.x - 9 * scale, y: alphaCenter.y + 9 * scale };

          drawNucleon(ctx, aP1.x, aP1.y, nucleonR, 'proton', '+');
          drawNucleon(ctx, aP2.x, aP2.y, nucleonR, 'proton', '+');
          drawNucleon(ctx, aN1.x, aN1.y, nucleonR, 'neutron', 'n');
          if (!isDD) {
            drawNucleon(ctx, aN2.x, aN2.y, nucleonR, 'neutron', 'n');
          } else {
            // In D-D, produces He-3 (2p + 1n)
            drawNucleon(ctx, aN2.x, aN2.y, nucleonR, 'neutron', 'n');
          }

          // High-speed Free Neutron (+14.1 MeV)
          ctx.save();
          ctx.strokeStyle = '#73CAE5';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(freeNeutron.x, freeNeutron.y);
          ctx.stroke();
          ctx.restore();

          drawNucleon(ctx, freeNeutron.x, freeNeutron.y, nucleonR + 1, 'neutron', 'n');

          // Labels
          const aLabelX = isMobile ? Math.max(width * 0.25, alphaCenter.x) : alphaCenter.x;
          const nLabelX = isMobile ? Math.min(width * 0.75, freeNeutron.x) : freeNeutron.x;

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '13px'} Space Grotesk, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(isDD ? 'Núcleo Formado: Hélio-3 (³He)' : 'Núcleo Estável: Hélio-4 (⁴He)', aLabelX, alphaCenter.y - Math.round(44 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#8F83FF';
          ctx.fillText('2 Prótons 🟣 + 2 Nêutrons 🔵 (Partícula Alfa)', aLabelX, alphaCenter.y + Math.round(44 * scale), maxTextHalf);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isMobile ? '10.5px' : '13px'} Space Grotesk, sans-serif`;
          ctx.fillText('Nêutron Rápido Livre', nLabelX, freeNeutron.y - Math.round(36 * scale), maxTextHalf);
          ctx.font = `${isMobile ? '8.5px' : '10px'} JetBrains Mono, monospace`;
          ctx.fillStyle = '#73CAE5';
          ctx.fillText('1 Nêutron 🔵 (+14,1 MeV)', nLabelX, freeNeutron.y + Math.round(36 * scale), maxTextHalf);

          ctx.fillStyle = '#FFE600';
          ctx.font = `bold ${isMobile ? '10.5px' : '13px'} JetBrains Mono, monospace`;
          ctx.fillText(isDD ? '⚡ Energia Liberada: 3,27 MeV' : '⚡ Energia Total Liberada: 17,6 MeV (Livre de Carbono)', cx, cy + Math.round(115 * scale), maxTextFull);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      ro?.disconnect();
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [mode, stage, fissionFuel, fusionReaction, speed]);

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
          {/* Top particle legend matching AtomSimulator */}
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
                  className={`px-2.5 py-1.5 sm:px-2 sm:py-1 rounded transition-colors min-w-[36px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center ${
                    speed === s ? 'bg-white/20 text-white font-bold' : 'text-[#B7B7B7] hover:text-white'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              onClick={() => setAutoPlaying(!autoPlaying)}
              className="flex-1 sm:flex-none justify-center min-h-[38px] sm:min-h-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white hover:bg-white/10 flex items-center space-x-1.5 focus:outline-none transition-colors"
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
              }}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white transition-colors min-w-[38px] min-h-[38px] sm:min-w-0 sm:min-h-0 flex items-center justify-center"
              title="Reiniciar etapas"
              aria-label="Reiniciar etapas"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Viewport with Legend Overlay matching AtomSimulator */}
      <div className="relative rounded-2xl bg-[#090909] border border-white/10 overflow-hidden flex flex-col items-center justify-center p-2 shadow-inner">
        <canvas ref={canvasRef} className="w-full h-[310px] sm:h-[370px] block" />

        {/* Top-Right Badge: Active Nuclear Model */}
        <div className="max-sm:order-first max-sm:static max-sm:w-full max-sm:mb-1.5 max-sm:justify-center sm:absolute sm:top-3 sm:right-3 bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-mono text-white/80 flex items-center space-x-1.5 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>
            {mode === 'fission'
              ? fissionFuel === 'u235'
                ? 'Núcleo: ²³⁵U (92p + 143n)'
                : 'Núcleo: ²³⁹Pu (94p + 145n)'
              : fusionReaction === 'dt'
              ? 'Núcleos: ²H + ³H (2p + 3n)'
              : 'Núcleos: ²H + ²H (2p + 2n)'}
          </span>
        </div>

        {/* Legend Overlay inside canvas matching AtomSimulator (stacked below canvas on small phones so canvas artwork never overlaps) */}
        <div className="max-sm:static max-sm:w-full max-sm:mt-2 sm:absolute sm:bottom-3 sm:left-3 bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 rounded-lg p-2.5 text-[11px] space-y-1.5 z-10 shadow-lg font-mono">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF]" />
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
            <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5]" />
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
              className={`min-h-[44px] p-2.5 rounded-lg text-left transition-all border text-xs ${
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
