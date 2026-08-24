import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Flame,
  Calendar,
  MapPin,
  Scale,
  Maximize2,
  X,
  ShieldAlert,
  Info,
  Award
} from 'lucide-react';

interface IvyKingPageProps {
  onNavigate: (page: PageId) => void;
}

export const IvyKingPage: React.FC<IvyKingPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Flame className="w-3.5 h-3.5" />
          <span>Física de Fissão Pura • Operação Ivy (1952)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Ivy King
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#73CAE5] font-medium font-display">
          A mais potente arma de fissão pura já testada pelos Estados Unidos.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Disparada em 16 de novembro de 1952 no Atol de Enewetak (duas semanas após o teste termonuclear Ivy Mike), a bomba <strong>MK-18 ("Super Oralloy Bomb")</strong> atingiu o impressionante rendimento de <strong>500 quilotons</strong> exclusivamente através de processos de fissão nuclear de urânio altamente enriquecido.
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Data</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">16 Nov 1952</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Potência</span>
          <p className="text-xl sm:text-2xl font-bold text-[#73CAE5] font-mono">500 quilotons</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Mecanismo</span>
          <p className="text-sm font-bold text-white">Fissão Pura (Sem Fusão)</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Vetor de Teste</span>
          <p className="text-sm font-bold text-[#8F83FF]">Bombardeiro B-36H</p>
        </div>
      </div>

      {/* Grid: Context & Real Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#73CAE5]" />
              <span>Contexto da Guerra Fria & A Razão do Desenvolvimento</span>
            </h3>
            <p>
              No início dos anos 1950, a física das armas termonucleares (bombas de hidrogênio) ainda era uma incógnita experimental. O teste termonuclear <em>Ivy Mike</em> utilizava deutério líquido criogênico em uma estrutura experimental de 82 toneladas que não podia ser embarcada em aeronaves.
            </p>
            <p>
              Diante do risco de que a tecnologia de fusão termonuclear falhasse ou levasse muitos anos para ser miniaturizada, a Comissão de Energia Atômica dos EUA (AEC) encomendou ao físico Ted Taylor no Laboratório de Los Alamos o desenvolvimento do projeto mais potente possível utilizando <strong>única e exclusivamente fissão pura de Urânio-235</strong>.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Scale className="w-4 h-4 text-[#8F83FF]" />
              <span>Características Gerais & O Desafio da Criticalidade</span>
            </h3>
            <p>
              Para alcançar 500 kt sem fusão, o dispositivo utilizava uma esfera oca com mais de quatro massas críticas de urânio enriquecido (Oralloy).
            </p>
            <p>
              Para prevenir uma reação em cadeia acidental durante o manuseio terrestre e o voo, os engenheiros inseriram uma corrente de alumínio e boro absorvedora de nêutrons no núcleo oco, que era removida mecanicamente apenas quando o bombardeiro atingia a altitude de lançamento sobre o oceano.
            </p>
          </div>
        </div>

        {/* Right Photo */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onClick={() => setLightboxImg('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ivy_King_-_mushroom_cloud.jpg/1024px-Ivy_King_-_mushroom_cloud.jpg')}
            className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-4/3 shadow-xl"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ivy_King_-_mushroom_cloud.jpg/1024px-Ivy_King_-_mushroom_cloud.jpg"
              alt="Ivy King mushroom cloud"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-medium truncate">A detonação aérea de 500 quilotons do teste Ivy King (1952)</p>
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-[#B7B7B7]/70 space-y-0.5 px-1">
            <p><strong>Fonte:</strong> U.S. Department of Defense / Defense Threat Reduction Agency</p>
            <p><strong>Licença:</strong> Domínio Público (Governo Federal dos EUA)</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#73CAE5] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Localização: 600 m ao norte da Ilha de Runit, Atol de Enewetak</span>
            </div>
            <p className="text-[#B7B7B7]">
              Detonação a 450 metros de altitude, minimizando a sucção de terra e a formação de crateras pesadas.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Importance */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
          <Award className="w-4 h-4" />
          <span>Importância Histórica & Científica</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          O Limite Físico da Fissão Pura
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <p>
            O teste <strong>Ivy King</strong> marcou o teto prático da tecnologia de fissão nuclear pura. Embora tenha demonstrado que era possível construir bombas de meio megaton com urânio, o consumo de material físsil era excessivamente elevado e o risco de pré-detonação ou criticalidade acidental tornava a estocagem em grande escala perigosa e cara.
          </p>
          <p>
            Com o sucesso estrondoso dos testes termonucleares de combustível sólido da <strong>Operação Castle em 1954</strong> (que atingiram de 1 a 15 Megatons com muito menor quantidade de urânio e dimensões mais reduzidas), a tecnologia de fissão pura para megatonelagem foi rapidamente aposentada em favor dos projetos termonucleares modernos de dois estágios.
          </p>
        </div>
      </section>

      {/* Lightbox */}
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
            <img src={lightboxImg} alt="Ivy King" className="w-full max-h-[80vh] object-contain bg-black" />
            <div className="p-4 text-xs font-bold text-white font-display">
              Teste Ivy King (1952) — U.S. Air Force / Defense Threat Reduction Agency
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
