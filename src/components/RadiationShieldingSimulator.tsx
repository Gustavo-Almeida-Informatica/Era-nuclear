import React, { useState } from 'react';
import { Shield, Info, Check, X } from 'lucide-react';
import { radiationTypes } from '../data/physicsData';

const MATERIALS = [
  { id: 'paper', name: 'Folha de Papel (0,1 mm)', icon: '📄', thickness: 'Muito Fina' },
  { id: 'aluminum', name: 'Placa de Alumínio (5 mm)', icon: '🪨', thickness: 'Média' },
  { id: 'lead', name: 'Bloco de Chumbo (10 cm)', icon: '🧱', thickness: 'Ultra Densa' },
  { id: 'water', name: 'Tanque de Água / Parafina (1 m)', icon: '💧', thickness: 'Rica em Hidrogênio' }
];

export const RadiationShieldingSimulator: React.FC = () => {
  const [selectedRadiation, setSelectedRadiation] = useState<number>(0); // 0: Alfa, 1: Beta, 2: Gama, 3: Nêutron

  const currentRad = radiationTypes[selectedRadiation];

  // Penetration logic matrix
  const getPenetrationResult = (radIdx: number, matId: string): { blocked: boolean; percentageBlocked: number; explanation: string } => {
    if (radIdx === 0) {
      // Alpha is stopped by everything
      return { blocked: true, percentageBlocked: 100, explanation: 'Bloqueada 100%. Partículas alfa são absorvidas na superfície do material.' };
    } else if (radIdx === 1) {
      // Beta penetrates paper, stopped by aluminum, lead, water
      if (matId === 'paper') {
        return { blocked: false, percentageBlocked: 15, explanation: 'Atravessa a folha de papel com facilidade (~85% de transmissão).' };
      }
      return { blocked: true, percentageBlocked: 100, explanation: 'Bloqueada com eficácia pelo alumínio e materiais densos.' };
    } else if (radIdx === 2) {
      // Gamma penetrates paper, aluminum; heavily attenuated by lead/water
      if (matId === 'paper') return { blocked: false, percentageBlocked: 1, explanation: 'Atravessa o papel sem perda mensurável de intensidade.' };
      if (matId === 'aluminum') return { blocked: false, percentageBlocked: 18, explanation: 'Penetra a chapa de alumínio com pouca atenuação.' };
      if (matId === 'lead') return { blocked: true, percentageBlocked: 99.5, explanation: 'Atenuada em >99% pelo chumbo de alta densidade eletrônica.' };
      if (matId === 'water') return { blocked: true, percentageBlocked: 95, explanation: 'Atenuada pela coluna profunda de água.' };
    } else if (radIdx === 3) {
      // Neutrons pass lead easily (need light nuclei like water/paraffin/polyethylene to moderate and capture)
      if (matId === 'paper') return { blocked: false, percentageBlocked: 5, explanation: 'Atravessa sem interação significativa.' };
      if (matId === 'aluminum') return { blocked: false, percentageBlocked: 10, explanation: 'Quase não interage com o alumínio.' };
      if (matId === 'lead') return { blocked: false, percentageBlocked: 30, explanation: 'Penetra o chumbo facilmente (chumbo é ineficaz para desacelerar nêutrons rápidos).' };
      if (matId === 'water') return { blocked: true, percentageBlocked: 99, explanation: 'Excelente moderação: núcleos de hidrogênio (prótons) colidem elasticamente e desaceleram os nêutrons.' };
    }
    return { blocked: false, percentageBlocked: 0, explanation: '' };
  };

  return (
    <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-[#73CAE5]" />
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            Simulador de Penetrabilidade e Blindagem Radiológica
          </h3>
        </div>
        <p className="text-xs text-[#B7B7B7] mt-1">
          Descubra como diferentes tipos de radiação interagem com barreiras de proteção física.
        </p>
      </div>

      {/* Radiation selection chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {radiationTypes.map((rad, idx) => (
          <button
            key={rad.name}
            onClick={() => setSelectedRadiation(idx)}
            className={`p-3 rounded-xl text-left border transition-all ${
              selectedRadiation === idx
                ? 'bg-gradient-to-br from-[#73CAE5]/20 to-[#8F83FF]/20 border-[#73CAE5] text-white shadow-lg shadow-[#73CAE5]/10'
                : 'bg-white/[0.03] border-white/10 text-[#B7B7B7] hover:border-white/25 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm font-mono text-[#73CAE5]">{rad.symbol.split(' ')[0]}</span>
              <span className="text-[10px] uppercase font-semibold text-white/50">{rad.charge}</span>
            </div>
            <p className="font-semibold text-xs mt-1 text-white">{rad.name}</p>
          </button>
        ))}
      </div>

      {/* Shielding interaction cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {MATERIALS.map((mat) => {
          const result = getPenetrationResult(selectedRadiation, mat.id);
          return (
            <div
              key={mat.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                result.blocked
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-rose-950/20 border-rose-500/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{mat.icon}</span>
                  <span
                    className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      result.blocked
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {result.blocked ? <Check className="w-3 h-3 mr-0.5" /> : <X className="w-3 h-3 mr-0.5" />}
                    <span>{result.blocked ? 'BLINDADO' : 'ATRAVESSA'}</span>
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{mat.name}</h4>
                <p className="text-[11px] text-[#B7B7B7] leading-relaxed mb-3">
                  {result.explanation}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] flex items-center justify-between text-[#B7B7B7]">
                <span>Atenuação:</span>
                <span className="font-mono font-bold text-white">{result.percentageBlocked}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Radiation profile summary card */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
        <div className="flex items-center space-x-2 text-white font-semibold">
          <Info className="w-4 h-4 text-[#8F83FF]" />
          <span>Perfil da {currentRad.name} ({currentRad.symbol})</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#B7B7B7]">
          <div>
            <span className="text-white/60">Natureza Física:</span>
            <p className="text-white font-medium">{currentRad.nature}</p>
          </div>
          <div>
            <span className="text-white/60">Penetrabilidade:</span>
            <p className="text-[#73CAE5] font-medium">{currentRad.penetration}</p>
          </div>
          <div>
            <span className="text-white/60">Risco Biológico:</span>
            <p className="text-[#8F83FF] font-medium">{currentRad.biologicalRisk}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
