import React, { useState } from 'react';
import { PageId } from '../types';
import { energyApplications, risksAndBenefitsMatrix, FUSION_RISKS_AND_BENEFITS } from '../data/energyData';
import { FusionReactorsSection } from '../components/FusionReactorsSection';
import {
  Zap,
  HeartPulse,
  Leaf,
  Layers,
  Rocket,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  Atom,
  Flame
} from 'lucide-react';

interface EnergyPageProps {
  onNavigate: (page: PageId) => void;
}

export const EnergyPage: React.FC<EnergyPageProps> = ({ onNavigate }) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(energyApplications[0].id);
  const [riskDomainTab, setRiskDomainTab] = useState<'fission' | 'fusion'>('fission');

  const activeApp = energyApplications.find((a) => a.id === selectedAppId) || energyApplications[0];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Aplicações Pacíficas & Transição Energética</span>
          </div>
          <a
            href="#fusion-reactors"
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#8F83FF]/15 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF] hover:bg-[#8F83FF]/25 transition-colors"
          >
            <span>Ver Reatores de Fusão (ITER, SPARC, W7-X)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Energia Nuclear Civil
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Muito além dos arsenais bélicos, a física do átomo impulsiona a medicina oncológica moderna, a segurança alimentar contra pragas, a exploração do espaço profundo, centenas de usinas de fissão comercial e a promissora fronteira dos <strong>reatores de fusão termonuclear</strong>.
        </p>
      </div>

      {/* Peaceful Applications Interactive Hub */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Setores de Aplicação Civil
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Onde a Tecnologia Nuclear Salva Vidas e Gera Valor
          </h2>
        </div>

        {/* Application Selector Buttons */}
        <div className="flex flex-wrap gap-2.5">
          {energyApplications.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                selectedAppId === app.id
                  ? 'bg-gradient-to-r from-[#73CAE5]/20 to-[#8F83FF]/20 border-[#73CAE5] text-white shadow-lg shadow-[#73CAE5]/10 font-bold'
                  : 'bg-white/5 border-white/5 text-[#B7B7B7] hover:border-white/20 hover:text-white'
              }`}
            >
              {app.title}
            </button>
          ))}
        </div>

        {/* Selected Application Card */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8F83FF]">
                {activeApp.category}
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                {activeApp.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                  Resumo Geral da Tecnologia:
                </h4>
                <p>{activeApp.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                  Como Funciona o Processo Físico:
                </h4>
                <p>{activeApp.howItWorks}</p>
              </div>
            </div>

            <div className="space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Benefício para a Sociedade e Sustentabilidade:</span>
                </h4>
                <p className="text-white text-xs">{activeApp.societalBenefit}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <span className="text-[11px] font-bold text-[#73CAE5] uppercase tracking-wider">
                  Radioisótopos e Elementos Utilizados:
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeApp.keyRadioisotopes.map((iso, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white"
                    >
                      {iso}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fusion Reactors Section */}
      <FusionReactorsSection />

      {/* Balanced Section: Nuclear Risk vs Benefit */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white">
              <Scale className="w-3.5 h-3.5 text-[#73CAE5]" />
              <span>Debate Equilibrado & Transparência</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Nuclear: Risco e Benefício
            </h2>
            <p className="text-xs sm:text-sm text-[#B7B7B7]">
              Uma análise técnica e transparente comparando as vantagens energéticas e os desafios operacionais tanto da <strong>fissão comercial contemporânea</strong> quanto da <strong>fusão termonuclear do futuro</strong>.
            </p>
          </div>

          {/* Fission vs Fusion Toggle */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setRiskDomainTab('fission')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                riskDomainTab === 'fission'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>Fissão Comercial (PWR/BWR)</span>
            </button>
            <button
              onClick={() => setRiskDomainTab('fusion')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center space-x-2 ${
                riskDomainTab === 'fusion'
                  ? 'bg-gradient-to-r from-[#8F83FF] to-[#73CAE5] text-black font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Fusão Nuclear (Nova Fronteira)</span>
            </button>
          </div>
        </div>

        {/* Fission Matrix */}
        {riskDomainTab === 'fission' && (
          <div className="grid grid-cols-1 gap-6">
            {risksAndBenefitsMatrix.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-white font-display border-b border-white/5 pb-3">
                  {item.domain}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Benefits column */}
                  <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Vantagens & Benefícios Comprovados</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#B7B7B7]">
                      {item.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risks column */}
                  <div className="p-5 rounded-xl bg-amber-950/15 border border-amber-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Riscos, Desafios & Limitações</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#B7B7B7]">
                      {item.risksAndChallenges.map((r, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fusion Matrix */}
        {riskDomainTab === 'fusion' && (
          <div className="grid grid-cols-1 gap-6">
            {FUSION_RISKS_AND_BENEFITS.map((item) => (
              <div
                key={item.id}
                className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                      {item.domain}
                    </h3>
                    <p className="text-xs text-[#B7B7B7] mt-0.5">{item.summary}</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono font-semibold text-[#73CAE5] self-start sm:self-auto">
                    {item.keyMetric}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Benefits column */}
                  <div className="p-5 rounded-xl bg-emerald-950/15 border border-emerald-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Vantagens Físicas & Ambientais da Fusão</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#B7B7B7]">
                      {item.benefits.map((b, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Risks column */}
                  <div className="p-5 rounded-xl bg-amber-950/15 border border-amber-500/20 space-y-3">
                    <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Desafios de Engenharia & Gargalos Críticos</span>
                    </div>
                    <ul className="space-y-2 text-xs text-[#B7B7B7]">
                      {item.risksAndChallenges.map((r, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border-t border-white/5">
                  <span className="text-[#B7B7B7]">Veredito Científico Internacional:</span>
                  <span className="font-semibold text-white font-mono text-[11px] bg-white/5 px-2.5 py-1 rounded border border-white/10">
                    {item.verdict}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
