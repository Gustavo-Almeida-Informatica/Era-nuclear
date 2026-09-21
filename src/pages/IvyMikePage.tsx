import React, { useState } from 'react';
import { PageId } from '../types';
import ivyMikeImg from '../assets/images/ivy_mike_blast_1787763915443.jpg';
import ivyKingImg from '../assets/images/ivy_king_001.jpg';
import {
  Zap,
  Calendar,
  MapPin,
  Scale,
  Maximize2,
  X,
  AlertTriangle,
  Info,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Flame,
  Atom,
  Target,
  Users
} from 'lucide-react';

interface IvyMikePageProps {
  onNavigate: (page: PageId) => void;
}

export const IvyMikePage: React.FC<IvyMikePageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; caption?: string; details?: string } | null>(null);

  const ivyMikePhysicists = [
    {
      name: 'Edward Teller',
      role: 'Co-inventor do Conceito Teller-Ulam • "Pai da Bomba H"',
      contribution: 'Principal proponente e líder teórico incansável da arma termonuclear ("Super") desde os primórdios em Los Alamos. Concebeu, junto com Stanislaw Ulam, o princípio revolucionário de implosão por radiação e canalização de raios X do primário de fissão para o secundário, viabilizando o disparo histórico de Ivy Mike.',
      tag: 'Arquiteto da "Super"',
      highlight: true
    },
    {
      name: 'Stanislaw Ulam',
      role: 'Matemático & Físico Teórico de Los Alamos',
      contribution: 'Formulou a quebra de paradigma em 1951: separar fisicamente o estágio primário de fissão do estágio secundário termonuclear, utilizando a pressão de radiação e ondas de choque hidrodinâmicas para comprimir o deutério antes da expansão da queima.',
      tag: 'Conceito Teller-Ulam'
    },
    {
      name: 'Richard Garwin',
      role: 'Físico Experimental e Designer de Hardware (Aluno de Fermi)',
      contribution: 'A pedido de Teller e sob mentoria de Enrico Fermi, transformou os conceitos teóricos matemáticos no primeiro projeto de engenharia física detalhado e executável do dispositivo "The Sausage" em julho de 1951.',
      tag: 'Designer de "The Sausage"'
    },
    {
      name: 'John Wheeler',
      role: 'Físico Teórico • Diretor do Projeto Matterhorn B (Princeton)',
      contribution: 'Liderou o grupo de físicos teóricos em Princeton encarregado de realizar simulações matemáticas e cálculos analíticos independentes da taxa de queima termonuclear do deutério para o teste Mike.',
      tag: 'Projeto Matterhorn B'
    },
    {
      name: 'Marshall Holloway',
      role: 'Líder da Divisão de Armas (W-Division) de Los Alamos',
      contribution: 'Comandou o projeto experimental em campo, a fabricação do criostato e a logística no Atol de Enewetak, coordenando a instalação da imensa fábrica criogênica necessária para manter o deutério líquido a 20 K (-250 °C).',
      tag: 'Engenharia de Enewetak'
    },
    {
      name: 'John von Neumann',
      role: 'Matemático e Teórico da Computação (MANIAC I)',
      contribution: 'Pioneiro nos cálculos numéricos e modelagem de hidrodinâmica relativística e choques térmicos, programando as simulações da frente de fusão de Mike no computador pioneiro MANIAC I em Los Alamos.',
      tag: 'Simulação no MANIAC'
    },
    {
      name: 'J. Carson Mark',
      role: 'Chefe da Divisão Teórica (T-Division) de Los Alamos',
      contribution: 'Liderou os físicos teóricos que realizaram os cálculos de transporte de nêutrons, seções de choque nucleares e balanço de rendimento do dispositivo, assegurando a solidez física do experimento.',
      tag: 'Chefe Divisão Teórica'
    },
    {
      name: 'Enrico Fermi',
      role: 'Físico Consultor Sênior • Prêmio Nobel de Física',
      contribution: 'Foi quem originalmente sugeriu a Edward Teller, em setembro de 1941, que uma bomba atômica poderia acender reações termonucleares de fusão no hidrogênio pesado. Participou ativamente das análises teóricas para Ivy Mike.',
      tag: 'Inspiração Original'
    },
    {
      name: 'Albert Ghiorso & Equipe Radioquímica',
      role: 'Físico Nuclear e Radioquímico Líder (Berkeley / Argonne)',
      contribution: 'Ao analisar amostras da poeira radioativa colhida por jatos F-84 após a explosão, descobriu que os núcleos de urânio capturaram até 17 nêutrons sucessivos, sintetizando e identificando pela primeira vez no universo os elementos Einstênio (99) e Férmio (100).',
      tag: 'Descoberta de Elementos (99 & 100)'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
      {/* Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#73CAE5]/15 border border-[#73CAE5]/35 text-xs font-bold text-[#73CAE5] uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>O 1º Teste Termonuclear da História • Operação Ivy (1952)</span>
          </div>
          <button
            onClick={() => onNavigate('operation-castle')}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#B7B7B7] hover:text-white hover:border-[#73CAE5]/40 transition-colors"
          >
            <Zap className="w-3 h-3 text-[#73CAE5]" />
            <span>Ver Sucessora: Operação Castle (1954)</span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white font-display tracking-tight uppercase leading-none">
          Ivy Mike <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#73CAE5] via-teal-300 to-[#8F83FF] font-mono">(10,4 Mt)</span>
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#73CAE5] font-medium font-display">
          A primeira detonação termonuclear de fusão da humanidade, que vaporizou uma ilha do Pacífico e provou o conceito Teller-Ulam de implosão por radiação.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Detonado em 1º de novembro de 1952 às 07h15 no Atol de Enewetak (Ilhas Marshall), o experimento "Mike" liberou estarrecedores 10,4 Megatons de TNT — quase 700 vezes a energia liberada sobre Hiroshima. O aparato experimental de 82 toneladas exigia combustível criogênico líquido a -250 °C e abriu caminho direto para o programa nuclear da Guerra Fria.
        </p>
      </div>

      {/* Quick Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Data & Horário</span>
          <p className="text-lg sm:text-2xl font-bold text-white font-mono">01 Nov 1952 • 07:15</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Rendimento Total</span>
          <p className="text-lg sm:text-2xl font-bold text-[#73CAE5] font-mono">10,4 Megatons</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Dispositivo</span>
          <p className="text-sm sm:text-base font-bold text-white">"The Sausage" (82 ton)</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Combustível</span>
          <p className="text-sm sm:text-base font-bold text-[#8F83FF]">Deutério Líquido (-250°C)</p>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#73CAE5] uppercase tracking-wider bg-[#73CAE5]/10 px-3 py-1 rounded-full border border-[#73CAE5]/30">
              <Zap className="w-3.5 h-3.5" />
              <span>Fotografia Histórica Documental</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              A Ascensão da Nuvem Estratosférica de Ivy Mike
            </h2>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              Fotografada a partir de navios da Força-Tarefa Conjunta 132 a mais de 80 km de distância, a nuvem de cogumelo de Ivy Mike subiu a uma velocidade vertiginosa, penetrando na estratosfera até atingir <strong>41 km de altitude</strong> (mais de quatro vezes a altitude de voo de um avião comercial de passageiros).
            </p>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              O topo da nuvem espalhou-se horizontalmente criando uma abóbada com mais de <strong>160 km de diâmetro</strong>, bloqueando a luz solar sobre todo o atol.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-neutral-400 block font-mono text-[10px] uppercase">Bola de Fogo</span>
                <span className="text-amber-400 font-bold text-sm">5,2 km de diâmetro</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-neutral-400 block font-mono text-[10px] uppercase">Cratera Submarina</span>
                <span className="text-rose-400 font-bold text-sm">1,9 km de largura / 50m prof.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <div
              onClick={() =>
                setLightboxImg({
                  url: ivyMikeImg,
                  title: 'Teste Termonuclear Ivy Mike (1952) — 10,4 Megatons',
                  caption: 'Fotografia oficial da monumental nuvem de cogumelo atômico de Ivy Mike no Atol de Enewetak, alcançando 41 km de altitude.',
                  details: 'Acervo oficial do Laboratório Nacional de Los Alamos / Departamento de Energia dos Estados Unidos (DOE). Domínio Público.'
                })
              }
              className="relative rounded-2xl overflow-hidden bg-black border border-[#73CAE5]/40 group cursor-pointer aspect-4/3 shadow-2xl"
            >
              <img
                src={ivyMikeImg}
                alt="Detonação de Ivy Mike"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <p className="font-semibold truncate">Nuvem do disparo Ivy Mike (10,4 Mt)</p>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#73CAE5]" />
              </div>
            </div>
            <p className="text-[11px] text-[#B7B7B7] italic text-center">
              Clique na fotografia para visualização expandida em alta resolução.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Dive 3-Column Technical Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 flex items-center justify-center text-[#73CAE5]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">O Dispositivo "The Sausage"</h3>
          <p className="text-xs text-[#B7B7B7] leading-relaxed">
            Com 6,19 metros de comprimento e peso de 82 toneladas métricas, o aparato experimental recebeu o apelido de <em>The Sausage</em> (O Salsichão). Por utilizar deutério líquido a 20 Kelvin (-250 °C), exigia uma fábrica criogênica inteira no local para manter o gás liquefeito até segundos antes do disparo.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111111] border border-rose-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Desaparição de Elugelab</h3>
          <p className="text-xs text-[#B7B7B7] leading-relaxed">
            A ilha de coral de Elugelab foi literalmente obliterada e evaporada da superfície da Terra pela bola de fogo de 5,2 km. Em seu lugar, formou-se uma cratera marinha com diâmetro de 1,9 km e profundidade de 50 metros, dentro da qual caberiam 14 edifícios do tamanho do Pentágono.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#111111] border border-amber-500/20 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white font-display">Síntese de Einstênio e Férmio</h3>
          <p className="text-xs text-[#B7B7B7] leading-relaxed">
            O fluxo de nêutrons de Ivy Mike foi tão concentrado que os núcleos de urânio capturaram até 17 nêutrons em microssegundos. Cientistas da Universidade da Califórnia em Berkeley analisaram poeira recolhida por jatos F-84 e descobriram pela primeira vez no cosmos dois novos elementos químicos: o <strong>Einstênio (99)</strong> e o <strong>Férmio (100)</strong>.
          </p>
        </div>
      </section>

      {/* Physicists Section: Responsáveis pelo Projeto Ivy Mike */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            <Users className="w-4 h-4" />
            <span>Mentes Científicas Pioneiras • Termonuclear</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Edward Teller e os Físicos Responsáveis por Ivy Mike
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl leading-relaxed">
            A realização do primeiro teste termonuclear da história exigiu a integração entre a física teórica de ponta, formulações de hidrodinâmica de radiação, as primeiras simulações eletrônicas em computador e uma proeza monumental de engenharia criogênica.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ivyMikePhysicists.map((p, idx) => (
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

      {/* Cross-Roads Navigation Banner */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121212] via-[#121b22] to-[#0D0D0D] border border-[#73CAE5]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#73CAE5] uppercase font-mono px-3 py-1 rounded-full bg-[#73CAE5]/15 border border-[#73CAE5]/30">
            <Atom className="w-3.5 h-3.5" />
            <span>Continuidade Histórica</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Da Fusão Criogênica ao Combustível Sólido (Castle Bravo)
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Ivy Mike provou a fusão termonuclear, mas o deutério líquido era impraticável em combate. Em 1954, os EUA testaram o deutereto de lítio sólido na Operação Castle, atingindo 15 Mt com Castle Bravo.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('manhattan-project')}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
          >
            <Atom className="w-4 h-4 text-[#8F83FF]" />
            <span>Ver Projeto Manhattan (1942–1945)</span>
          </button>
          <button
            onClick={() => onNavigate('operation-castle')}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#73CAE5] to-teal-500 text-black font-bold text-xs hover:shadow-lg hover:shadow-[#73CAE5]/20 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Acessar Operação Castle</span>
            <ChevronRight className="w-4 h-4 text-black/80" />
          </button>
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
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[68vh] flex items-center justify-center bg-black overflow-hidden">
              <img src={lightboxImg.url} alt={lightboxImg.title} referrerPolicy="no-referrer" className="max-h-full max-w-full object-contain" />
            </div>
            <div className="p-4 sm:p-5 space-y-1 bg-[#111111] border-t border-white/10 text-xs">
              <h4 className="font-bold text-white font-display text-base">{lightboxImg.title}</h4>
              {lightboxImg.caption && <p className="text-[#B7B7B7] leading-relaxed">{lightboxImg.caption}</p>}
              {lightboxImg.details && <p className="text-white/80 font-mono text-[11px] pt-1">{lightboxImg.details}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
