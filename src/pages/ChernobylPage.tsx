import React, { useState } from 'react';
import { PageId } from '../types';
import chernobylImg from '../assets/images/chernobyl_ruins_1787676689764.jpg';
import {
  AlertTriangle,
  Calendar,
  MapPin,
  ShieldCheck,
  Maximize2,
  X,
  Info,
  ShieldAlert,
  Award,
  Flame,
  Activity
} from 'lucide-react';

interface ChernobylPageProps {
  onNavigate: (page: PageId) => void;
}

export const ChernobylPage: React.FC<ChernobylPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-400">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>História da Energia Nuclear Civil • Acidente de 1986</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Chernobyl — O Desastre Nuclear
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-rose-400 font-medium font-display">
          A análise histórica, técnica e humana do maior acidente da história da energia nuclear civil.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Na madrugada de <strong>26 de abril de 1986</strong>, uma explosão de vapor catastrófica seguida por um incêndio de moderador de grafite destruiu a estrutura do Bloco 4 da Central Nuclear de Chernobyl (Usina Vladimir Lenin), localizada a 3 km da cidade operária de Pripyat, na Ucrânia soviética.
        </p>
      </div>

      {/* Critical Clarification Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-[#121212] border-2 border-amber-500/30 text-xs sm:text-sm text-white shadow-2xl space-y-2">
        <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase tracking-wider font-mono">
          <ShieldAlert className="w-4 h-4" />
          <span>Esclarecimento Científico Fundamental</span>
        </div>
        <p className="text-[#B7B7B7] leading-relaxed">
          <strong className="text-white">Chernobyl foi um acidente de reator nuclear termo-hidráulico civil, e NÃO uma explosão de arma nuclear.</strong> Um reator civil de potência contém urânio com baixo enriquecimento (cerca de 2% a 4% de U-235), tornando a formação de uma detonação nuclear atômica fisicamente impossível. As explosões que destruíram o prédio foram causadas por <strong>superpressão extrema de vapor d'água</strong> e combustão química de <strong>gás hidrogênio</strong> gerado pela reação entre vapor em altíssima temperatura e as ligas de zircônio do combustível.
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Data do Acidente</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">26 Abr 1986</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Tipo de Reator</span>
          <p className="text-lg font-bold text-[#73CAE5]">RBMK-1000</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Escala INES</span>
          <p className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">Nível 7 (Máximo)</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Zona de Exclusão</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">Raio de 30 km</p>
        </div>
      </div>

      {/* Grid: What Happened & Real Photo of Destroyed Reactor 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#73CAE5]" />
              <span>O que aconteceu na madrugada de 26 de abril de 1986?</span>
            </h3>
            <p>
              Durante a preparação de um teste elétrico para verificar se a inércia mecânica da rotação das turbinas a vapor poderia alimentar temporariamente as bombas de água de emergência até o acionamento dos geradores a diesel, o reator foi colocado em uma faixa de baixa potência extremamente instável.
            </p>
            <p>
              O projeto do reator RBMK-1000 possuía uma falha física intrínseca conhecida como <strong>coeficiente de vazio positivo</strong> (quanto mais a água fervia e formava bolhas de vapor, mais a reação nuclear se acelerava em vez de desacelerar).
            </p>
            <p>
              Quando o botão de parada de emergência <strong>AZ-5</strong> foi pressionado às 01:23:40, as barras de controle (feitas com pontas de grafite moderador) inseriram reatividade positiva inicial antes do material absorvedor de boro entrar no núcleo. A potência térmica subiu dezenas de vezes acima da capacidade máxima em frações de segundo, gerando uma explosão de vapor que ejetou a tampa superior de 1.000 toneladas do reator.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Activity className="w-4 h-4 text-rose-400" />
              <span>Contaminação Radioativa & Isótopos Liberados</span>
            </h3>
            <p>
              Com a quebra da integridade estrutural e a queima do grafite a mais de 2.000 °C durante dias, radionuclídeos voláteis subiram na atmosfera europeia:
            </p>
            <ul className="list-disc list-inside space-y-1 text-white/90">
              <li><strong>Iodo-131 (Meia-vida de 8 dias):</strong> absorvido pela glândula tireoide, provocando aumento de casos de câncer de tireoide em crianças da região na época.</li>
              <li><strong>Césio-137 (Meia-vida de 30 anos):</strong> emissor gama e beta que contaminou solo, pastagens e florestas (a "Floresta Vermelha").</li>
              <li><strong>Estrôncio-90 (Meia-vida de 29 anos):</strong> análogo ao cálcio, acumulado em ossos e tecidos animais.</li>
            </ul>
          </div>
        </div>

        {/* Right Photo */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onClick={() => setLightboxImg(chernobylImg)}
            className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-4/3 shadow-xl"
          >
            <img
              src={chernobylImg}
              alt="Reator 4 de Chernobyl destruído"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-medium truncate">Fotografia aérea histórica documentando a destruição do Bloco 4 de Chernobyl (1986)</p>
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-[#B7B7B7]/70 space-y-0.5 px-1">
            <p><strong>Fonte:</strong> Agência Internacional de Energia Atômica (AIEA) / Igor Kostin / Novosti</p>
            <p><strong>Licença:</strong> Arquivo Histórico AIEA / Domínio Público Documental</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
            <div className="flex items-center space-x-1.5 text-[#73CAE5] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Localização</span>
            </div>
            <p className="text-[#B7B7B7]">
              Complexo Nuclear de Chernobyl, Pripyat, Ucrânia (a 110 km ao norte de Kiev).
            </p>
          </div>
        </div>
      </div>

      {/* Impacts, Safety Revolution & Current Status */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="flex items-center space-x-2 text-[#73CAE5] font-bold font-mono uppercase text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Revolução na Segurança Nuclear Global</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            Lições e Transformação Regulatória
          </h3>
          <p>
            O acidente impulsionou a fundação da <strong>Associação Mundial de Operadores Nucleares (WANO)</strong> em 1989, integrando todos os operadores de reatores do mundo para troca transparente de dados e auditorias mútuas.
          </p>
          <p>
            Todos os reatores RBMK em operação passaram por reformas profundas para eliminar o coeficiente de vazio positivo e acelerar o mecanismo de inserção das barras de controle. O conceito de <strong>Cultura de Segurança</strong> e a exigência de <strong>estruturas de contenção primária espessas de concreto armado</strong> tornaram-se normas internacionais obrigatórias da AIEA.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/10 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="flex items-center space-x-2 text-[#8F83FF] font-bold font-mono uppercase text-xs">
            <Award className="w-4 h-4" />
            <span>Situação Atual do Local</span>
          </div>
          <h3 className="text-xl font-bold text-white font-display">
            O Novo Confinamento Seguro (NSC)
          </h3>
          <p>
            Entre 2012 e 2019, um consórcio internacional financiado por mais de 45 países construiu o <strong>New Safe Confinement (NSC)</strong> — o maior arco móvel terrestre já construído pela engenharia humana, com 108 m de altura, 257 m de vão e 36.000 toneladas.
          </p>
          <p>
            A estrutura foi deslizada sobre trilhos por cima do antigo sarcófago de concreto provisório de 1986, garantindo isolamento radiológico estanque projetado para durar pelo menos <strong>100 anos</strong>, permitindo o desmantelamento robótico gradual dos restos do reator com segurança.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setLightboxImg(null)}
        >
          <div className="max-w-4xl w-full bg-[#141414] border border-white/15 rounded-2xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxImg} alt="Chernobyl Reactor 4" referrerPolicy="no-referrer" className="w-full max-h-[80vh] object-contain bg-black" />
            <div className="p-4 text-xs font-bold text-white font-display">
              Reator 4 destruído da Central Nuclear de Chernobyl (1986) — AIEA / Igor Kostin
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
