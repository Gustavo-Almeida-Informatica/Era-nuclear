import React from 'react';
import { PageId } from '../types';
import { AtomSimulator } from '../components/AtomSimulator';
import { RadiationShieldingSimulator } from '../components/RadiationShieldingSimulator';
import { physicsTopics, radiationTypes } from '../data/physicsData';
import {
  Atom,
  Shield,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  Radio,
  Activity,
  Maximize2
} from 'lucide-react';

interface PhysicsPageProps {
  onNavigate: (page: PageId) => void;
}

export const PhysicsPage: React.FC<PhysicsPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Atom className="w-3.5 h-3.5" />
          <span>Física Nuclear Fundamental</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          A Física por Trás do Átomo
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Compreenda como as forças mais intensas do cosmos operam na escala subatômica, o mecanismo da instabilidade radioativa e a física que rege a conversão de massa em energia.
        </p>
      </div>

      {/* Interactive Atom Simulator Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Sparkles className="w-4 h-4" />
          <span>Módulo 01 • Estrutura Atômica Interativa</span>
        </div>
        <AtomSimulator />
      </section>

      {/* Structured Physics Topic Cards */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Módulo 02 • Conceitos Nucleares Chave
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Fundamentos Teóricos e Leis Físicas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {physicsTopics.map((topic) => (
            <div
              key={topic.id}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#73CAE5]/40 transition-all shadow-xl flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#73CAE5]">
                    {topic.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors mt-1">
                    {topic.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                  {topic.summary}
                </p>

                {/* Key Points Bullet List */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Pontos Principais:
                  </h4>
                  <ul className="space-y-2">
                    {topic.keyPoints.map((kp, idx) => (
                      <li key={idx} className="text-xs text-[#B7B7B7] flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#73CAE5] mt-1.5 shrink-0" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Formula box if present */}
              {topic.formula && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8F83FF]">
                    Relação Matemática:
                  </div>
                  <div className="font-mono text-base font-bold text-white tracking-wide">
                    {topic.formula}
                  </div>
                  <p className="text-[11px] text-[#B7B7B7]">
                    {topic.formulaExplanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Radiation Shielding Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Shield className="w-4 h-4" />
          <span>Módulo 03 • Radiação, Meia-Vida e Blindagem</span>
        </div>
        <RadiationShieldingSimulator />
      </section>

      {/* Banner to Fission vs Fusion Page */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111111] via-[#161616] to-[#1a1528] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Próximo Nível de Aprofundamento
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Quer comparar a Fissão e a Fusão Lado a Lado?
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Acesse nosso simulador avançado com matriz comparativa detalhada de combustíveis, rendimentos energéticos, desafios tecnológicos do Tokamak e cálculo de equivalência energética.
          </p>
        </div>

        <button
          onClick={() => onNavigate('fission-fusion')}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-extrabold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg shadow-[#73CAE5]/20 shrink-0"
        >
          <span>ABRIR COMPARADOR FISSÃO × FUSÃO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
