import React, { useState } from 'react';
import { PageId } from '../types';
import { impactSections } from '../data/impactsData';
import {
  Globe2,
  HeartPulse,
  Leaf,
  CloudRain,
  AlertCircle,
  TrendingDown,
  Sun,
  Shield,
  Activity
} from 'lucide-react';

interface ImpactsPageProps {
  onNavigate: (page: PageId) => void;
}

export const ImpactsPage: React.FC<ImpactsPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>(impactSections[0].id);

  const activeSection = impactSections.find((s) => s.id === activeTab) || impactSections[0];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-400">
          <Globe2 className="w-3.5 h-3.5" />
          <span>Ciência Ambiental & Proteção Planetária</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Impactos no Planeta
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Uma investigação científica e quantitativa sobre as consequências humanas imediatas e de longo prazo, a contaminação radioativa de ecossistemas e as projeções climáticas do <strong>Inverno Nuclear</strong>.
        </p>
      </div>

      {/* Main Tabs (Humanos, Ambientais, Climáticos) */}
      <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
        {impactSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(sec.id)}
            className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2.5 ${
              activeTab === sec.id
                ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-lg shadow-[#73CAE5]/20'
                : 'bg-white/5 text-[#B7B7B7] hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {sec.category === 'humanos' && <HeartPulse className="w-4 h-4" />}
            {sec.category === 'ambientais' && <Leaf className="w-4 h-4" />}
            {sec.category === 'climaticos' && <CloudRain className="w-4 h-4" />}
            <span>{sec.title}</span>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <section className="space-y-8 animate-in fade-in duration-200">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            {activeSection.subtitle}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {activeSection.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-2xl leading-relaxed">
            {activeSection.shortSummary}
          </p>
        </div>

        {/* Grid of Key Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeSection.keyEffects.map((effect, idx) => (
            <div
              key={idx}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-2.5 py-0.5 rounded-full border border-[#73CAE5]/30">
                    Janela Temporal: {effect.timeframe}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {effect.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                  {effect.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 text-xs text-white/70">
                <span className="text-[#8F83FF] font-semibold">Mecanismo Científico: </span>
                <span>{effect.scientificBasis}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Scientific Models and Authority Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            <AlertCircle className="w-4 h-4" />
            <span>Fundamentação em Modelos Computacionais e Estudos Epidemiológicos</span>
          </div>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            {activeSection.scientificModelsText}
          </p>
        </div>
      </section>

      {/* Special Feature: Inverno Nuclear Model Visual Card */}
      {activeTab === 'impactos-climaticos' && (
        <section className="bg-gradient-to-br from-[#121212] via-[#171426] to-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
              Simulações Globais NCAR / NASA GISS
            </span>
            <h3 className="text-2xl font-extrabold text-white font-display">
              A Cascata do Inverno Nuclear em 4 Fases
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#73CAE5]">Fase 01</span>
              <h4 className="text-sm font-bold text-white">Tempestades de Fogo</h4>
              <p className="text-[11px] text-[#B7B7B7]">
                Milhares de incêndios urbanos combinam-se em colunas convectivas de fumaça que perfuram a troposfera.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#73CAE5]">Fase 02</span>
              <h4 className="text-sm font-bold text-white">Fuligem Estratosférica</h4>
              <p className="text-[11px] text-[#B7B7B7]">
                5 a 150 Tg de carbono negro espalham-se ao redor do globo em menos de 14 dias pela circulação de ventos.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-[#8F83FF]">Fase 03</span>
              <h4 className="text-sm font-bold text-white">Queda Térmica Global</h4>
              <p className="text-[11px] text-[#B7B7B7]">
                Redução de até 90% na insolação superficial, provocando quedas térmicas de 5 °C a 15 °C nos continentes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400">Fase 04</span>
              <h4 className="text-sm font-bold text-white">Colapso Agrícola</h4>
              <p className="text-[11px] text-[#B7B7B7]">
                Destruição do ozônio e geadas estivais paralisam a fotossíntese de grãos mundiais (trigo, milho, arroz).
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
