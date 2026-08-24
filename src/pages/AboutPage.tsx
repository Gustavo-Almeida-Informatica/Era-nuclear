import React from 'react';
import { PageId } from '../types';
import {
  Atom,
  Shield,
  BookOpen,
  CheckCircle2,
  Globe2,
  HeartHandshake,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const goals = [
    {
      icon: <Lightbulb className="w-5 h-5 text-[#73CAE5]" />,
      title: 'Educação Científica Acessível',
      desc: 'Desmistificar a física quântica e a energia nuclear através de modelos visuais, animações interativas e linguagem didática para estudantes e entusiastas.'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-[#8F83FF]" />,
      title: 'Divulgação Histórica Rigorosa',
      desc: 'Preservar a memória dos fatos históricos com base em arquivos primários, sem anacronismos ou narrativas de propaganda.'
    },
    {
      icon: <Shield className="w-5 h-5 text-[#73CAE5]" />,
      title: 'Combate à Desinformação',
      desc: 'Esclarecer mitos sobre radiação, gestão de rejeitos e segurança energética com dados verificados de órgãos reguladores internacionais.'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-[#8F83FF]" />,
      title: 'Conscientização e Desarmamento',
      desc: 'Evidenciar as consequências humanitárias e climáticas das armas de destruição em massa para apoiar uma cultura global de paz e diplomacia.'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#73CAE5]">
          <Atom className="w-3.5 h-3.5" />
          <span>Projeto Editorial Independente</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Sobre o Era Nuclear
        </h1>
        <p className="text-base sm:text-lg text-[#B7B7B7] leading-relaxed">
          O projeto <strong>ERA NUCLEAR</strong> é uma plataforma educativa digital criada para transformar a complexidade da física nuclear e a história atômica em uma experiência de aprendizado clara, visual, imparcial e profundamente responsável.
        </p>
      </div>

      {/* Mission & Purpose Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Nossa Missão
          </span>
          <h2 className="text-2xl font-bold text-white font-display">
            A Ciência como Instrumento de Transformação e Consciência
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Acreditamos que o conhecimento científico sobre a energia do átomo é indispensável para os grandes debates do século XXI — desde a urgência da descarbonização da matriz energética global até a prevenção de conflitos geopolíticos e a expansão da medicina nuclear.
          </p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Princípios Éticos
          </span>
          <h2 className="text-2xl font-bold text-white font-display">
            Imparcialidade, Responsabilidade e Segurança
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            O portal rechaça expressamente qualquer conteúdo voltado a fornecer esquemas, especificações dimensionais ou instruções práticas de manufatura de armamentos. Nosso compromisso é estritamente pedagógico, histórico e alinhado aos tratados de não proliferação das Nações Unidas.
          </p>
        </div>
      </div>

      {/* 4 Pillars of the Platform */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Objetivos Institucionais
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Os 4 Pilares da Plataforma
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((g, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                {g.icon}
              </div>
              <h3 className="text-lg font-bold text-white font-display">{g.title}</h3>
              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-gradient-to-br from-[#111111] via-[#161616] to-[#121b22] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Conheça as Fontes Oficiais e Instituições
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Consulte nossa curadoria de links e referências acadêmicas diretas da AIEA, ONU, CTBTO, SIPRI e das maiores publicações científicas internacionais.
          </p>
        </div>

        <button
          onClick={() => onNavigate('sources')}
          className="px-6 py-3.5 rounded-xl bg-white text-[#0D0D0D] font-extrabold text-xs uppercase tracking-wider hover:bg-[#73CAE5] transition-colors flex items-center space-x-2 shrink-0 shadow-xl"
        >
          <span>VER FONTES & REFERÊNCIAS</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
