import React, { useState } from 'react';
import { PageId, CastleTest } from '../types';
import { castleTests } from '../data/castleData';
import { IvyMikeManhattanSection, LightboxData } from '../components/IvyMikeManhattanSection';
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
  AlertTriangle,
  Zap,
  Users
} from 'lucide-react';

interface OperationCastlePageProps {
  onNavigate: (page: PageId) => void;
}

export const OperationCastlePage: React.FC<OperationCastlePageProps> = ({ onNavigate }) => {
  const [selectedTest, setSelectedTest] = useState<CastleTest>(castleTests[0]);
  const [lightboxImg, setLightboxImg] = useState<LightboxData | null>(null);

  const totalYield = castleTests.reduce((acc, t) => {
    const num = parseFloat(t.yieldReported.replace(',', '.').replace(' Megatons', '').replace(' quilotons', ''));
    return t.yieldReported.includes('quilotons') ? acc + (num / 1000) : acc + num;
  }, 0);

  const castlePhysicists = [
    {
      name: 'Edward Teller',
      role: 'Cofundador de Lawrence Livermore • Arquiteto Conceitual',
      contribution: 'Pressionou pela transição do hidrogênio líquido de Ivy Mike para o combustível seco de deutereto de lítio (LiD) e fundou em 1952 o laboratório Lawrence Livermore (UCRL) para competir cientificamente com Los Alamos no desenvolvimento de artefatos termonucleares transportáveis por via aérea.',
      tag: 'Pioneiro do LiD Sólido',
      highlight: true
    },
    {
      name: 'J. Carson Mark',
      role: 'Chefe da Divisão Teórica (T-Division) de Los Alamos',
      contribution: 'Liderou os físicos teóricos que projetaram o dispositivo "Shrimp" (o teste Castle Bravo). Conduziu os estudos pós-detonação para explicar fisicamente por que a reação alcançou 15 Megatons (o triplo do valor previsto).',
      tag: 'Designer de Castle Bravo'
    },
    {
      name: 'Stanislaw Ulam',
      role: 'Matemático e Físico Teórico de Los Alamos',
      contribution: 'Aperfeiçoou os modelos geométricos de implosão por radiação para configurações cilíndricas com combustível seco sólido, permitindo que as bombas da Operação Castle fossem miniaturizadas em armas de combate para bombardeiros B-36 e B-52.',
      tag: 'Geometria de Implosão'
    },
    {
      name: 'Marshall Holloway',
      role: 'Diretor Associado de Armas (W-Division) de Los Alamos',
      contribution: 'Supervisionou a engenharia das ogivas termonucleares testadas em Castle e coordenou a transição imediata dos protótipos de Bikini para as primeiras bombas termonucleares operacionais do arsenal dos EUA (TX-14, TX-16, TX-17 e TX-21).',
      tag: 'Engenharia de Ogivas'
    },
    {
      name: 'Norris Bradbury',
      role: 'Diretor Geral do Laboratório Científico de Los Alamos (LASL)',
      contribution: 'Liderou Los Alamos durante toda a Operação Castle, defendendo o pioneirismo do laboratório e prestando depoimentos cruciais perante a Comissão de Energia Atômica (AEC) sobre o rendimento imprevisto e as medidas de segurança radiológica.',
      tag: 'Diretor Geral de Los Alamos'
    },
    {
      name: 'Herbert York',
      role: 'Primeiro Diretor do Laboratório Lawrence Livermore (UCRL)',
      contribution: 'Comandou a jovem equipe de físicos de Livermore que projetou o dispositivo "Koon" para a Operação Castle, estabelecendo as bases de engenharia que moldariam a rivalidade e avanços dos dois laboratórios federais.',
      tag: '1º Diretor de Livermore'
    },
    {
      name: 'Ernest Lawrence',
      role: 'Cofundador de Livermore • Prêmio Nobel de Física',
      contribution: 'Articulador político e científico em Washington para a expansão dos testes termonucleares; canalizou recursos dos ciclotrons e laboratórios de Berkeley para análises de espectrometria dos produtos de fissão de Castle.',
      tag: 'Cofundador de Livermore'
    },
    {
      name: 'Alvin C. Graves',
      role: 'Diretor Científico da Joint Task Force 7 (JTF-7)',
      contribution: 'Físico experimental encarregado da autorização técnica e avaliação das condições meteorológicas para as detonações no Atol de Bikini. Foi quem tomou a decisão de prosseguir com o disparo de Bravo em 1º de março apesar de alertas sobre os ventos em altitude.',
      tag: 'Diretor Científico JTF-7'
    },
    {
      name: 'Equipe Teórica de Cálculos Neutrônicos',
      role: 'Físicos de Seção de Choque de Los Alamos',
      contribution: 'Grupo responsável pelo cálculo de queima que presumiu que o isótopo abundante Lítio-7 (60% do LiD) seria inerte. A reação inelástica inesperada ⁷Li + n → α + t + n com nêutrons rápidos de 14 MeV triplicou a quantidade de trítio gerado, multiplicando a potência da explosão de 6 para 15 Mt.',
      tag: 'O Fenômeno do Lítio-7'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Zap className="w-3.5 h-3.5" />
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

      {/* Physicists Section: Responsáveis pela Operação Castle */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            <Users className="w-4 h-4" />
            <span>Mentes Científicas & Liderança da Operação Castle</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Edward Teller e os Físicos Responsáveis pela Operação Castle
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl leading-relaxed">
            A revolução do combustível sólido (Deutereto de Lítio) e a corrida entre Los Alamos e Lawrence Livermore exigiram a atuação direta dos maiores físicos teóricos e experimentais da Era Termonuclear americana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {castlePhysicists.map((p, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-[#111111] border transition-all space-y-3 flex flex-col justify-between ${
                p.highlight
                  ? 'border-[#73CAE5]/60 bg-gradient-to-br from-[#73CAE5]/10 via-[#111111] to-[#111111] shadow-xl shadow-[#73CAE5]/10'
                  : 'border-white/10 hover:border-[#73CAE5]/40'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-white text-base font-display">{p.name}</h3>
                    <span className="text-xs text-[#73CAE5] block font-medium mt-0.5 leading-tight">{p.role}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/15 border border-[#73CAE5]/30 px-2 py-0.5 rounded-full shrink-0">
                    {p.tag}
                  </span>
                </div>
                <p className="text-xs text-[#B7B7B7] leading-relaxed pt-1">{p.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Ivy Mike (1952) & Manhattan Project (1942-1945) right underneath Operation Castle */}
      <IvyMikeManhattanSection
        onOpenLightbox={(data) => setLightboxImg(data)}
        onNavigate={onNavigate}
      />

      {/* Navigation Banner: Explore Tsar Bomba (50 Mt) right below Operation Castle */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121212] via-[#1b1430] to-[#0D0D0D] border border-[#8F83FF]/40 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#8F83FF] uppercase font-mono px-3 py-1 rounded-full bg-[#8F83FF]/15 border border-[#8F83FF]/30">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Aprofundamento Histórico Sequencial</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            A Resposta Soviética: Tsar Bomba (1961) — 50 Megatons
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Sete anos após os 15 Megatons de Castle Bravo, a União Soviética detonou o mais colossal artefato bélico da história humana. Conheça todo o teste, o poder destrutivo da explosão e a galeria vertical detalhada: <strong>a bomba</strong>, <strong>a bola de fogo</strong> e <strong>a nuvem de cogumelo</strong>.
          </p>
        </div>
        <button
          onClick={() => {
            onNavigate('tsar-bomba');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#8F83FF] to-purple-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-[#8F83FF]/30 hover:scale-[1.02] active:scale-95 transition-all whitespace-nowrap shrink-0 group"
        >
          <Flame className="w-4 h-4 text-white" />
          <span>Acessar Aba Tsar Bomba</span>
          <ChevronRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>
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
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[65vh] sm:max-h-[72vh] flex items-center justify-center bg-black overflow-hidden">
              <img src={lightboxImg.url} alt={lightboxImg.title} referrerPolicy="no-referrer" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4 sm:p-5 space-y-1.5 bg-[#111111] border-t border-white/10 text-xs">
              <h4 className="font-bold text-white font-display text-sm sm:text-base">
                {lightboxImg.title}
              </h4>
              {lightboxImg.caption && (
                <p className="text-[#B7B7B7] text-xs leading-relaxed">
                  {lightboxImg.caption}
                </p>
              )}
              {lightboxImg.details && (
                <p className="text-white/80 text-[11px] font-mono leading-relaxed pt-1 border-t border-white/5">
                  {lightboxImg.details}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
