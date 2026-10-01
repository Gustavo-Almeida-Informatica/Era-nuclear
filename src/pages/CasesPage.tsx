import React, { useState } from 'react';
import { PageId, CaseStudy } from '../types';
import { caseStudies } from '../data/casesData';
import {
  ShieldAlert,
  MapPin,
  Calendar,
  AlertTriangle,
  BookOpen,
  X,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

interface CasesPageProps {
  onNavigate: (page: PageId) => void;
}

export const CasesPage: React.FC<CasesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalCase, setActiveModalCase] = useState<CaseStudy | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Casos' },
    { id: 'conflito', label: 'Emprego Bélico' },
    { id: 'acidente', label: 'Acidentes Civis & Médicos' },
    { id: 'teste', label: 'Testes Nucleares' },
    { id: 'crise', label: 'Crises Geopolíticas' }
  ];

  const filteredCases = caseStudies.filter(
    (c) => selectedCategory === 'todos' || c.category === selectedCategory
  );

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Memória Histórica & Estudos de Caso</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Casos Históricos Marcantes
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Examine os acontecimentos mais impactantes da história nuclear: das detonações de 1945 e testes no Pacífico às crises diplomáticas e aos acidentes de Chernobyl, Goiânia e Fukushima, analisando suas lições para a segurança global.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-md shadow-[#73CAE5]/20'
                : 'bg-[#111111] text-[#B7B7B7] hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCases.map((cs) => (
          <div
            key={cs.id}
            className="bg-[#111111] border border-white/10 rounded-2xl p-6 hover:border-[#73CAE5]/40 transition-all shadow-xl flex flex-col justify-between group space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-white">
                  {cs.year}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                    cs.category === 'conflito'
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                      : cs.category === 'acidente'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : cs.category === 'teste'
                      ? 'bg-[#73CAE5]/10 text-[#73CAE5] border-[#73CAE5]/30'
                      : 'bg-[#8F83FF]/10 text-[#8F83FF] border-[#8F83FF]/30'
                  }`}
                >
                  {cs.categoryLabel}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
                {cs.title}
              </h3>

              <div className="flex items-center space-x-1.5 text-xs text-[#B7B7B7]">
                <MapPin className="w-3.5 h-3.5 text-[#73CAE5] shrink-0" />
                <span className="truncate">{cs.location}</span>
              </div>

              <p className="text-xs text-[#B7B7B7] leading-relaxed pt-1">
                {cs.shortSummary}
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => setActiveModalCase(cs)}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-[#73CAE5] hover:text-[#0D0D0D] text-xs font-bold text-white transition-all flex items-center justify-center space-x-2 border border-white/5 hover:border-transparent"
              >
                <span>Ver Análise Completa</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModalCase && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-[#141414] border border-white/15 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6 relative animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveModalCase(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-[#B7B7B7] hover:text-white transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="font-bold text-[#73CAE5] text-lg">{activeModalCase.year}</span>
                <span className="text-[#8F83FF] uppercase font-bold">• {activeModalCase.categoryLabel}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                {activeModalCase.title}
              </h2>
              <div className="flex items-center space-x-1.5 text-xs text-[#B7B7B7]">
                <MapPin className="w-3.5 h-3.5 text-[#73CAE5]" />
                <span>{activeModalCase.location}</span>
              </div>
            </div>

            <div className="space-y-5 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                  1. Contexto Histórico e Antecedentes
                </h4>
                <p>{activeModalCase.context}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                  2. O que Aconteceu
                </h4>
                <p>{activeModalCase.whatHappened}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  3. Consequências Principais
                </h4>
                <ul className="space-y-1.5">
                  {activeModalCase.consequences.map((c, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-white/90">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#73CAE5]">
                    Importância Histórica
                  </h4>
                  <p className="text-xs text-white/90">{activeModalCase.historicalSignificance}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/30 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F83FF]">
                    Lições Aprendidas
                  </h4>
                  <p className="text-xs text-white/90">{activeModalCase.lessonsLearned}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setActiveModalCase(null)}
                className="px-5 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition-all"
              >
                Fechar Análise
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
