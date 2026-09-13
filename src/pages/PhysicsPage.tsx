import React, { useState } from 'react';
import { PageId } from '../types';
import { AtomSimulator } from '../components/AtomSimulator';
import { RadiationShieldingSimulator } from '../components/RadiationShieldingSimulator';
import { physicsTopics, radiationTypes } from '../data/physicsData';
import atomStructureImg from '../assets/images/atom_structure_diagram_1787677733510.jpg';
import {
  Atom,
  Shield,
  Layers,
  Sparkles,
  Zap,
  ArrowRight,
  Radio,
  Activity,
  Maximize2,
  X
} from 'lucide-react';

interface PhysicsPageProps {
  onNavigate: (page: PageId) => void;
}

export const PhysicsPage: React.FC<PhysicsPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; desc: string } | null>(null);

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

      {/* Interactive Atom Simulator Section + Visual Structure */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Sparkles className="w-4 h-4" />
          <span>Módulo 01 • Estrutura Atômica Interativa & Esquema Físico</span>
        </div>
        <AtomSimulator />

        {/* Diagram Card */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div
            onClick={() => setLightboxImg({
              url: atomStructureImg,
              title: 'Estrutura Atômica: Núcleo Denso & Eletrosfera Quântica',
              desc: 'O núcleo contém prótons (carga +) e nêutrons (neutros) aglutinados pela Força Nuclear Forte, enquanto elétrons orbitam na eletrosfera quântica.'
            })}
            className="lg:col-span-5 relative aspect-4/3 rounded-xl overflow-hidden bg-black border border-white/10 group cursor-pointer shadow-lg"
          >
            <img
              src={atomStructureImg}
              alt="Diagrama científico da estrutura atômica com prótons, nêutrons no núcleo e elétrons orbitais"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-bold">Diagrama Subatômico Fundamental</p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-3 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            <h3 className="text-xl font-bold text-white font-display">
              A Anatomia do Átomo e as Forças Fundamentais
            </h3>
            <p>
              O núcleo atômico concentra mais de <strong>99,9% da massa</strong> de qualquer átomo em um volume cerca de 100.000 vezes menor que a nuvem eletrônica ao redor.
            </p>
            <p>
              A estabilidade do núcleo depende do equilíbrio dinâmico entre duas forças opostas: a <strong>Repulsão Eletrostática</strong> (que tenta separar os prótons de carga positiva) e a <strong>Força Nuclear Forte</strong> (que atrai prótons e nêutrons em distâncias inferiores a 1 femtômetro).
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#73CAE5]/15 text-[#73CAE5] border border-[#73CAE5]/30">
                Prótons (p⁺)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#8F83FF]/15 text-[#8F83FF] border border-[#8F83FF]/30">
                Nêutrons (n⁰)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/10 text-white border border-white/20">
                Elétrons (e⁻)
              </span>
            </div>
          </div>
        </div>
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

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setLightboxImg(null)}
        >
          <div className="max-w-4xl w-full bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxImg.url} alt={lightboxImg.title} referrerPolicy="no-referrer" className="w-full max-h-[80vh] object-contain bg-black" />
            <div className="p-4 space-y-1">
              <h4 className="text-sm font-bold text-white font-display">
                {lightboxImg.title}
              </h4>
              <p className="text-xs text-[#B7B7B7]">
                {lightboxImg.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
