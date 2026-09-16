import React, { useRef, useEffect } from 'react';

export interface AtomModelData {
  id: string;
  name: string;
  symbol: string;
  protons: number;
  neutrons: number;
  electrons: number;
  stability: 'Estável' | 'Radioativo' | 'Físsil';
  category: 'fission' | 'fusion';
  roleInReaction: string;
  description: string;
  decayType?: string;
  halfLife?: string;
  bindingEnergyPerNucleon?: string;
  naturalAbundance?: string;
}

interface AtomCanvasModelProps {
  isotope: AtomModelData;
  isPlaying?: boolean;
  speed?: number;
  height?: number;
  showLegend?: boolean;
  showBadge?: boolean;
  showElectrons?: boolean;
  angleOffset?: number;
}

export const AtomCanvasModel: React.FC<AtomCanvasModelProps> = ({
  isotope,
  isPlaying = true,
  speed = 1,
  height = 280,
  showLegend = true,
  showBadge = true,
  showElectrons = true,
  angleOffset = 0
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const angleRef = useRef<number>(angleOffset);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 320);
    canvas.height = height;

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        canvas.height = height;
      }
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Glow color depending on category
      const isFission = isotope.category === 'fission';
      const primaryColor = isFission ? 'rgba(115, 202, 229, ' : 'rgba(143, 131, 255, ';

      // Background subtle radial glow
      const radialGlow = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, Math.min(width, height) * 0.45);
      radialGlow.addColorStop(0, primaryColor + '0.12)');
      radialGlow.addColorStop(0.6, 'rgba(143, 131, 255, 0.03)');
      radialGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width, height) * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Orbital parameters scaled for canvas size
      if (showElectrons) {
        const maxRadius = Math.min(width, height) * 0.44;
        const orbitalCount = Math.min(Math.max(isotope.electrons > 2 ? 3 : 2, 2), 4);
        
        const orbitals = [
          { rx: maxRadius * 0.60, ry: maxRadius * 0.28, tilt: 0.25, speed: 1.2 * speed, color: 'rgba(115, 202, 229, 0.4)' },
          { rx: maxRadius * 0.78, ry: maxRadius * 0.35, tilt: -0.65, speed: -0.9 * speed, color: 'rgba(143, 131, 255, 0.4)' },
          { rx: maxRadius * 0.92, ry: maxRadius * 0.40, tilt: 0.85, speed: 0.7 * speed, color: 'rgba(255, 255, 255, 0.28)' },
          { rx: maxRadius * 1.02, ry: maxRadius * 0.44, tilt: -1.30, speed: -0.5 * speed, color: 'rgba(115, 202, 229, 0.28)' }
        ].slice(0, orbitalCount);

        // Draw Orbitals & Orbiting Electrons
        orbitals.forEach((orb, index) => {
          ctx.save();
          ctx.translate(centerX, centerY);
          ctx.rotate(orb.tilt);

          // Orbit path line
          ctx.strokeStyle = orb.color;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.ellipse(0, 0, orb.rx, orb.ry, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Electron position along ellipse
          const eAngle = angleRef.current * orb.speed + (index * Math.PI) / 2;
          const ex = Math.cos(eAngle) * orb.rx;
          const ey = Math.sin(eAngle) * orb.ry;

          // Electron glow
          const eGlow = ctx.createRadialGradient(ex, ey, 1, ex, ey, 9);
          eGlow.addColorStop(0, '#73CAE5');
          eGlow.addColorStop(0.5, 'rgba(115, 202, 229, 0.5)');
          eGlow.addColorStop(1, 'rgba(115, 202, 229, 0)');
          ctx.fillStyle = eGlow;
          ctx.beginPath();
          ctx.arc(ex, ey, 8, 0, Math.PI * 2);
          ctx.fill();

          // Electron Core (White)
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(ex, ey, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        });
      }

      // Dense Nucleus Rendering
      const totalNucleons = isotope.protons + isotope.neutrons;
      const isHeavy = isotope.protons > 10;
      
      // Radius scale: light nuclei (D, T) have a small distinct radius; heavy (U-235, Pu-239) have a larger dense cluster
      const baseRadius = isHeavy ? Math.min(26 + totalNucleons * 0.08, 38) : Math.max(14, totalNucleons * 7);

      // Nucleus containment halo glow
      const nucGlow = ctx.createRadialGradient(centerX, centerY, 4, centerX, centerY, baseRadius * 1.6);
      nucGlow.addColorStop(0, isFission ? 'rgba(115, 202, 229, 0.4)' : 'rgba(143, 131, 255, 0.45)');
      nucGlow.addColorStop(0.7, 'rgba(115, 202, 229, 0.15)');
      nucGlow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nucGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Render individual nucleons (Protons #8F83FF, Neutrons #73CAE5)
      if (isHeavy) {
        // Heavy nucleus: Draw packed sphere cluster using golden angle
        const renderedNucleons = 30; // representative cluster
        for (let i = 0; i < renderedNucleons; i++) {
          const isProton = i % 2 === 0;
          const phi = (i * 2.39996) + angleRef.current * 0.08;
          const r = Math.sqrt(i / renderedNucleons) * (baseRadius - 5);
          const nx = centerX + Math.cos(phi) * r;
          const ny = centerY + Math.sin(phi) * r * 0.9;

          ctx.beginPath();
          ctx.arc(nx, ny, 4.2, 0, Math.PI * 2);
          if (isProton) {
            ctx.fillStyle = '#8F83FF';
            ctx.fill();
            ctx.strokeStyle = '#B3A8FF';
            ctx.lineWidth = 1;
            ctx.stroke();
          } else {
            ctx.fillStyle = '#73CAE5';
            ctx.fill();
            ctx.strokeStyle = '#A3E8F9';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Central count badge overlay (Exact total A count)
        ctx.fillStyle = 'rgba(13, 13, 13, 0.88)';
        ctx.beginPath();
        ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = isFission ? 'rgba(115, 202, 229, 0.5)' : 'rgba(143, 131, 255, 0.5)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${totalNucleons}`, centerX, centerY);
      } else {
        // Light nucleus (Deutério 1p+1n, Trítio 1p+2n): Show exact individual nucleons with clear labels
        const nucleonsToDraw: Array<{ isProton: boolean; angle: number; dist: number }> = [];
        if (isotope.id === 'deuterium') {
          // 1 proton + 1 neutron orbiting or touching each other
          nucleonsToDraw.push({ isProton: true, angle: angleRef.current * 0.2, dist: 7 });
          nucleonsToDraw.push({ isProton: false, angle: angleRef.current * 0.2 + Math.PI, dist: 7 });
        } else if (isotope.id === 'tritium') {
          // 1 proton + 2 neutrons in a triangle
          nucleonsToDraw.push({ isProton: true, angle: angleRef.current * 0.2, dist: 8 });
          nucleonsToDraw.push({ isProton: false, angle: angleRef.current * 0.2 + (2 * Math.PI) / 3, dist: 8 });
          nucleonsToDraw.push({ isProton: false, angle: angleRef.current * 0.2 + (4 * Math.PI) / 3, dist: 8 });
        } else {
          // Generic light
          for (let i = 0; i < totalNucleons; i++) {
            const isProton = i < isotope.protons;
            nucleonsToDraw.push({
              isProton,
              angle: angleRef.current * 0.2 + (i * 2 * Math.PI) / totalNucleons,
              dist: totalNucleons === 1 ? 0 : 8
            });
          }
        }

        nucleonsToDraw.forEach((nuc) => {
          const nx = centerX + Math.cos(nuc.angle) * nuc.dist;
          const ny = centerY + Math.sin(nuc.angle) * nuc.dist;
          ctx.beginPath();
          ctx.arc(nx, ny, 7.5, 0, Math.PI * 2);
          if (nuc.isProton) {
            ctx.fillStyle = '#8F83FF';
            ctx.fill();
            ctx.strokeStyle = '#C2B8FF';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          } else {
            ctx.fillStyle = '#73CAE5';
            ctx.fill();
            ctx.strokeStyle = '#BAEFFF';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        });
      }

      if (isPlaying) {
        angleRef.current += 0.015 * speed;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isotope, isPlaying, speed, height, angleOffset]);

  return (
    <div className="relative w-full rounded-xl bg-[#090909] border border-white/5 overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        style={{ height: `${height}px` }}
        className="w-full block"
      />

      {/* Stability Badge Overlay */}
      {showBadge && (
        <div className="absolute top-2.5 right-2.5 z-10">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border shadow-md font-mono ${
              isotope.stability === 'Estável'
                ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                : isotope.stability === 'Físsil'
                ? 'bg-purple-500/15 text-[#8F83FF] border-[#8F83FF]/40'
                : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
            }`}
          >
            {isotope.stability}
          </span>
        </div>
      )}

      {/* Particle Legend Overlay */}
      {showLegend && (
        <div className="absolute bottom-2.5 left-2.5 bg-[#0D0D0D]/90 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1.5 text-[10px] space-y-1 z-10 shadow-lg font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#8F83FF]" />
            <span className="text-white/90">Prótons (p⁺): <strong className="text-[#8F83FF]">{isotope.protons}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#73CAE5]" />
            <span className="text-white/90">Nêutrons (n⁰): <strong className="text-[#73CAE5]">{isotope.neutrons}</strong></span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-white ring-1 ring-[#73CAE5]" />
            <span className="text-white/90">Elétrons (e⁻): <strong className="text-white">{isotope.electrons}</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
