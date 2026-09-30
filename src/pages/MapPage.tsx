import React from 'react';
import { PageId } from '../types';
import { NuclearRankingMapTab } from '../components/NuclearRankingMapTab';
import { Target, Globe } from 'lucide-react';

interface MapPageProps {
  onNavigate: (page: PageId) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate: _onNavigate }) => {
  return (
    <div className="pt-24 sm:pt-28 pb-16 w-full max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 space-y-6">
      {/* Header da Página de Mapa */}
      <div className="max-w-4xl space-y-3 px-2 sm:px-0">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400">
          <Target className="w-3.5 h-3.5" />
          <span>Simulador Tático & Cartografia Interativa</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Mapa Nuclear Interativo
        </h1>
        <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-red-400 font-medium font-display">
          Simulação de raios de destruição atômica em escala real sobre mapas mundiais, estimativas populacionais e ranking de armamentos.
        </p>
      </div>

      {/* Componente Integral do Mapa e Simulador */}
      <div className="w-full">
        <NuclearRankingMapTab />
      </div>
    </div>
  );
};
