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
  Flame,
  Maximize2,
  X
} from 'lucide-react';
import fissionReactorModelImg from '../assets/images/fission_reactor_pwr_model_authentic.jpg';
import iterTokamakImg from '../assets/images/iter_tokamak_fusion_1787677659756.jpg';

interface EnergyPageProps {
  onNavigate: (page: PageId) => void;
}

export const EnergyPage: React.FC<EnergyPageProps> = ({ onNavigate }) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(energyApplications[0].id);
  const [riskDomainTab, setRiskDomainTab] = useState<'fission' | 'fusion'>('fission');
  const [lightboxImg, setLightboxImg] = useState<{ src: string; title: string; caption: string } | null>(null);

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

          {/* Fission Reactor Scale Model Visual Showcase */}
          {activeApp.id === 'geracao-eletricidade' && (
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/[0.02] p-5 rounded-xl">
              <div className="md:col-span-4 flex justify-center">
                <div
                  onClick={() =>
                    setLightboxImg({
                      src: fissionReactorModelImg,
                      title: 'Maquete Técnica em Corte: Vaso de Pressão de Reator de Fissão Nuclear (PWR)',
                      caption: 'Maquete didática e técnica de engenharia naval e civil exibindo os mecanismos de acionamento de barras de controle no cabeçote superior, bocais de circulação primária e o arranjo de elementos combustíveis no núcleo (Foto: Guilherme Wiltgen / Defesa Aérea & Naval / PROSUB / LABGENE).'
                    })
                  }
                  className="relative group rounded-xl overflow-hidden bg-black/60 border border-amber-500/30 cursor-pointer shadow-lg max-h-72 w-full flex items-center justify-center"
                >
                  <img
                    src={fissionReactorModelImg}
                    alt="Maquete em corte de reator nuclear de fissão PWR"
                    referrerPolicy="no-referrer"
                    className="h-72 w-auto object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2.5 py-1 rounded text-[10px] text-white flex justify-between items-center">
                    <span className="font-mono">Maquete PWR Naval / Civil</span>
                    <span className="text-amber-400 font-semibold">Ampliar</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-8 space-y-3 text-xs text-[#B7B7B7] leading-relaxed">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[11px] font-mono font-bold border border-amber-500/20">
                  <span>FOTO REAL DA MAQUETE EM CORTE</span>
                  <span>•</span>
                  <span>REATOR DE FISSÃO PWR</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  Anatomia Interna de um Reator Nuclear de Potência
                </h4>
                <p>
                  Esta maquete expositiva revela a estrutura crítica de um reator de água pressurizada (PWR): o vaso de contenção forjado em liga de aço de altíssima resistência mecânica, os flanges superiores com parafusos de retenção sob pressão de 155 bar, o conjunto de barras de controle (CRDM) e, no interior em corte, o cesto do núcleo contendo os elementos combustíveis de urânio enriquecido.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#B7B7B7]/70 pt-1">
                  <span><strong>Foto:</strong> Guilherme Wiltgen / Defesa Aérea & Naval</span>
                  <span>•</span>
                  <span><strong>Referência:</strong> Marinha do Brasil (PROSUB / LABGENE / Amazônia Azul)</span>
                </div>
              </div>
            </div>
          )}

          {/* Fusion Reactor Showcase */}
          {activeApp.id === 'reatores-fusao' && (
            <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-white/[0.02] p-5 rounded-xl">
              <div className="md:col-span-5">
                <div
                  onClick={() =>
                    setLightboxImg({
                      src: iterTokamakImg,
                      title: 'Câmara de Vácuo do Reator de Fusão Tokamak (Projeto ITER)',
                      caption: 'Fotografia documental oficial do vaso de vácuo toroidal e ímãs supercondutores do projeto internacional ITER (Cadarache, França), projetado para 500 MW de potência de fusão.'
                    })
                  }
                  className="relative group rounded-xl overflow-hidden bg-black border border-[#8F83FF]/30 cursor-pointer shadow-lg aspect-16/10"
                >
                  <img
                    src={iterTokamakImg}
                    alt="Câmara de Vácuo do Reator de Fusão Tokamak ITER"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50" />
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white flex justify-between items-center">
                    <span className="font-mono">ITER Tokamak • Cadarache</span>
                    <span className="text-[#8F83FF] font-semibold">Ampliar</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-7 space-y-3 text-xs text-[#B7B7B7] leading-relaxed">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#8F83FF]/15 text-[#8F83FF] text-[11px] font-mono font-bold border border-[#8F83FF]/30">
                  <span>IMAGEM DOCUMENTAL DA GALERIA</span>
                  <span>•</span>
                  <span>FUSÃO MAGNÉTICA ITER</span>
                </div>
                <h4 className="text-base font-bold text-white font-display">
                  A Maior Máquina de Fusão Termonuclear do Mundo
                </h4>
                <p>
                  Fotografia oficial da câmara toroidal de vácuo e das estruturas criogênicas de ímãs supercondutores do projeto internacional ITER. Ao confinar o plasma a 150 milhões de °C, esta tecnologia é o pilar da nova era da fusão comercial.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-[#B7B7B7]/70 pt-1">
                  <span><strong>Fonte:</strong> ITER Organization / EFDA-JET</span>
                  <span>•</span>
                  <span><strong>Licença:</strong> Uso Educacional Autorizado</span>
                </div>
              </div>
            </div>
          )}
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
            {/* Fission Engineering Showcase Card */}
            <div className="bg-[#111111] border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-56 shrink-0 flex justify-center">
                <div
                  onClick={() =>
                    setLightboxImg({
                      src: fissionReactorModelImg,
                      title: 'Maquete em Corte: Vaso de Pressão de Reator de Fissão Nuclear (PWR)',
                      caption: 'Maquete didática e técnica de corte seccional de um reator nuclear PWR (Foto: Guilherme Wiltgen / Defesa Aérea & Naval / PROSUB).'
                    })
                  }
                  className="relative group rounded-xl overflow-hidden bg-black/60 border border-white/10 cursor-pointer shadow-lg w-full h-52 flex items-center justify-center"
                >
                  <img
                    src={fissionReactorModelImg}
                    alt="Maquete em corte de reator nuclear de fissão PWR"
                    referrerPolicy="no-referrer"
                    className="h-full w-auto object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white flex justify-between items-center">
                    <span>Reator PWR</span>
                    <span className="text-amber-400 font-semibold">Ampliar</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[11px] font-mono font-bold">
                  <span>ENGENHARIA NUCLEAR CONTEMPORÂNEA</span>
                  <span>•</span>
                  <span>FISSÃO CIVIL</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Tecnologia e Barreiras de Contenção dos Reatores PWR
                </h3>
                <p>
                  A fissão controlada é operada em vasos de contenção forjados em ligas de aço com mais de 20 cm de espessura. As barras de controle (CRDM no cabeçote superior) realizam o desligamento imediato (SCRAM) em segundos por gravidade, garantindo a modulação da reatividade da reação em cadeia.
                </p>
                <div className="text-[11px] text-[#B7B7B7]/70 pt-1">
                  <strong>Fonte da Maquete:</strong> Defesa Aérea & Naval / Foto: Guilherme Wiltgen / PROSUB
                </div>
              </div>
            </div>

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
            {/* Fusion Tokamak Showcase Card */}
            <div className="bg-[#111111] border border-[#8F83FF]/30 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-full md:w-64 shrink-0">
                <div
                  onClick={() =>
                    setLightboxImg({
                      src: iterTokamakImg,
                      title: 'Câmara de Vácuo do Reator de Fusão Tokamak (Projeto ITER)',
                      caption: 'Fotografia documental oficial do vaso de vácuo toroidal e ímãs supercondutores do projeto internacional ITER (Cadarache, França).'
                    })
                  }
                  className="relative group rounded-xl overflow-hidden bg-black border border-white/10 cursor-pointer shadow-lg aspect-16/10"
                >
                  <img
                    src={iterTokamakImg}
                    alt="Câmara de Vácuo do Reator de Fusão Tokamak ITER"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
                  <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white flex justify-between items-center">
                    <span>Tokamak ITER</span>
                    <span className="text-[#8F83FF] font-semibold">Ampliar</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-[#8F83FF]/15 text-[#8F83FF] text-[11px] font-mono font-bold">
                  <span>FRONTEIRA DA FUSÃO TERMONUCLEAR</span>
                  <span>•</span>
                  <span>CONFINAMENTO MAGNÉTICO</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  Câmara de Vácuo do Reator Tokamak (Projeto ITER)
                </h3>
                <p>
                  Fotografia oficial da câmara toroidal do complexo ITER (Cadarache, França), a maior infraestrutura de pesquisa de fusão da Terra. Bobinas supercondutoras geram campos de 11,8 Tesla para suspender plasma a 150 milhões de °C sem contato físico com as paredes.
                </p>
                <div className="text-[11px] text-[#B7B7B7]/70 pt-1">
                  <strong>Fonte:</strong> ITER Organization / Imagens da Galeria do App
                </div>
              </div>
            </div>

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
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="max-w-4xl w-full bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative space-y-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[72vh] overflow-hidden flex items-center justify-center bg-black/50 rounded-xl p-2">
              <img
                src={lightboxImg.src}
                alt={lightboxImg.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>
            <div className="space-y-1 text-xs text-[#B7B7B7]">
              <h4 className="text-base font-bold text-white font-display">{lightboxImg.title}</h4>
              <p className="leading-relaxed">{lightboxImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
