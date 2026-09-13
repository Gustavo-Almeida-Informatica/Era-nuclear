import React, { useState } from 'react';
import { PageId, CastleTest } from '../types';
import { castleTests } from '../data/castleData';
import {
  Flame,
  Calendar,
  MapPin,
  Scale,
  ShieldAlert,
  Sparkles,
  Info,
  ChevronRight,
  Maximize2,
  X,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface OperationCastlePageProps {
  onNavigate: (page: PageId) => void;
}

export const OperationCastlePage: React.FC<OperationCastlePageProps> = ({ onNavigate }) => {
  const [selectedTest, setSelectedTest] = useState<CastleTest>(castleTests[0]);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);

  const totalYield = castleTests.reduce((acc, t) => {
    const num = parseFloat(t.yieldReported.replace(',', '.').replace(' Megatons', '').replace(' quilotons', ''));
    return t.yieldReported.includes('quilotons') ? acc + (num / 1000) : acc + num;
  }, 0);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Flame className="w-3.5 h-3.5" />
          <span>Série de Testes no Pacífico (1954)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Operação Castle
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#73CAE5] font-medium font-display">
          A série de detonações termonucleares de combustível sólido que redefiniu a Guerra Fria e provocou o maior desastre de contaminação por radiação dos testes norte-americanos.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Conduzida pela Força-Tarefa Conjunta 7 (Joint Task Force 7) dos EUA entre março e maio de 1954 nos atóis de Bikini e Enewetak, a Operação Castle teve como objetivo principal transformar a tecnologia termonuclear criogênica experimental (de Ivy Mike) em armas termonucleares sólidas e militarizáveis de alto rendimento.
        </p>
      </div>

      {/* Quick Numbers Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Período</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">Mar–Mai 1954</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Total de Testes</span>
          <p className="text-xl sm:text-2xl font-bold text-[#73CAE5] font-mono">6 Detonações</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Potência Acumulada</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">~48,2 Megatons</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Inovação Técnica</span>
          <p className="text-sm font-bold text-white">Deutereto de Lítio (LiD)</p>
        </div>
      </div>

      {/* Interactive Visual Timeline of the 6 Tests */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Cronologia dos 6 Disparos
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Os Testes da Operação Castle em Ordem Cronológica
          </h2>
        </div>

        {/* Test Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {castleTests.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedTest(t)}
              className={`p-3.5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                selectedTest.id === t.id
                  ? 'bg-gradient-to-br from-[#73CAE5]/20 to-[#8F83FF]/20 border-[#73CAE5] text-white shadow-lg shadow-[#73CAE5]/10'
                  : 'bg-white/[0.03] border-white/10 text-[#B7B7B7] hover:border-white/20 hover:text-white'
              }`}
            >
              <div>
                <span className="text-[10px] font-mono text-[#73CAE5] font-bold">0{idx + 1} • {t.date.split(' ')[0]} {t.date.split(' ')[2]}</span>
                <h4 className="font-bold text-xs sm:text-sm text-white mt-1">{t.name}</h4>
              </div>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#8F83FF]">
                {t.yieldReported.split(' (')[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Selected Test Detail Card */}
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Info & Details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase text-[#73CAE5] font-bold">
                    {selectedTest.deviceType}
                  </span>
                  <h3 className="text-3xl font-extrabold text-white font-display mt-0.5">
                    {selectedTest.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-[#B7B7B7] block">Rendimento Real:</span>
                  <span className="text-xl font-bold font-mono text-[#8F83FF] bg-[#8F83FF]/10 px-3 py-1 rounded-full border border-[#8F83FF]/30 inline-block">
                    {selectedTest.yieldReported}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[#B7B7B7] flex items-center space-x-1.5 font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#73CAE5]" />
                    <span>Data & Horário:</span>
                  </span>
                  <p className="text-white font-medium">{selectedTest.date}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[#B7B7B7] flex items-center space-x-1.5 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#8F83FF]" />
                    <span>Localização Exata:</span>
                  </span>
                  <p className="text-white font-medium">{selectedTest.location}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                    Objetivo Histórico do Teste:
                  </h4>
                  <p>{selectedTest.historicalObjective}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] mb-1">
                    Resultado Físico e Consequências:
                  </h4>
                  <p>{selectedTest.resultAndImpact}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F83FF]">
                    Importância Histórica & Geopolítica:
                  </h4>
                  <p className="text-white text-xs">{selectedTest.historicalImportance}</p>
                </div>
              </div>
            </div>

            {/* Right: Verified Historical Photograph */}
            <div className="lg:col-span-5 space-y-3">
              <div
                onClick={() => setLightboxImg({ url: selectedTest.imageUrl, title: selectedTest.name })}
                className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-4/3 shadow-xl"
              >
                <img
                  src={selectedTest.imageUrl}
                  alt={selectedTest.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
                  <p className="font-medium truncate">{selectedTest.imageCaption}</p>
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="text-[11px] text-[#B7B7B7]/70 space-y-0.5 px-1">
                <p><strong>Fonte:</strong> {selectedTest.source}</p>
                <p><strong>Licença:</strong> {selectedTest.license}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Section: Castle Bravo Fallout & The Lucky Dragon Catastrophe */}
      <section className="bg-gradient-to-br from-[#121212] via-[#1a1424] to-[#0D0D0D] border border-rose-500/20 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
          <AlertTriangle className="w-4 h-4" />
          <span>Consequências Humanas e Ambientais • Caso Castle Bravo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              A Catástrofe da Precipitação Radioativa (Fallout)
            </h3>
            <p>
              No dia 1º de março de 1954, quando a detonação de <strong>Castle Bravo</strong> atingiu 15 Megatons (250% da estimativa dos cientistas), milhões de toneladas de coral, areia e água do Atol de Bikini foram pulverizados e transformados em cinzas hiperradioativas que subiram à estratosfera.
            </p>
            <p>
              Ventos inesperados sopraram para leste, despejando "neve radioativa" sobre os atóis habitados de <strong>Rongelap, Rongerik, Utirik e Ailinginae</strong>. Os habitantes locais, sem aviso prévio ou evacuação imediata, sofreram queimaduras por radiação beta, queda de cabelo e contaminação de poços de água e alimentos.
            </p>
          </div>

          <div className="space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-lg font-bold text-white font-display">
              O Caso do Daigo Fukuryū Maru (Lucky Dragon No. 5)
            </h4>
            <p>
              A cerca de 130 km a leste de Bikini, o barco pesqueiro japonês de atum <em>Daigo Fukuryū Maru</em> foi coberto por cinzas radioativas brancas durante horas. Todos os 23 marinheiros foram acometidos pela Síndrome Aguda de Radiação, resultando na morte do radiotelegrafista Aikichi Kuboyama meses depois.
            </p>
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-white/90">
              <strong>Impacto Geopolítico Global:</strong> O clamor popular no Japão e em todo o mundo deflagrou o movimento pacifista global, a criação da Conferência Pugwash sobre Ciência e Assuntos Mundiais e culminou no Tratado de Proibição Parcial de Testes (PTBT) de 1963, que baniu para sempre testes nucleares na atmosfera e nos oceanos.
            </div>
          </div>
        </div>
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
            <div className="p-4 text-xs font-bold text-white font-display">
              {lightboxImg.title} — Operação Castle (1954)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
