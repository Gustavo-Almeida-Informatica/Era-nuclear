import React, { useState } from 'react';
import { PageId } from '../types';
import { FissionFusionSimulator } from '../components/FissionFusionSimulator';
import { FissionFusionAtomsComparison } from '../components/FissionFusionAtomsComparison';
import { fissionFusionComparison } from '../data/physicsData';
import fissionDiagramImg from '../assets/images/fission_diagram_sci_1787677675023.jpg';
import fusionDiagramImg from '../assets/images/fusion_diagram_sci_1787677708566.jpg';
import fissionReactorModelImg from '../assets/images/fission_reactor_pwr_model_authentic.jpg';
import iterTokamakImg from '../assets/images/tokamak_fusion_reactor_real.jpg';
import {
  Flame,
  Zap,
  Layers,
  ArrowRight,
  Scale,
  Sparkles,
  Calculator,
  Compass,
  Cpu,
  Maximize2,
  X
} from 'lucide-react';

interface FissionFusionPageProps {
  onNavigate: (page: PageId) => void;
}

export const FissionFusionPage: React.FC<FissionFusionPageProps> = ({ onNavigate }) => {
  const [fuelGrams, setFuelGrams] = useState<number>(1);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; desc: string } | null>(null);

  // Energy output calculations
  // Coal: ~30 MJ/kg = 30 kJ/g
  // Uranium-235 Fission: ~82,000,000 kJ/g (82 GJ/g)
  // Deuterium-Tritium Fusion: ~340,000,000 kJ/g (340 GJ/g)
  const coalMJ = fuelGrams * 0.03;
  const fissionMJ = fuelGrams * 82000;
  const fusionMJ = fuelGrams * 340000;

  const coalTons = (fuelGrams * 2.8).toFixed(1);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#73CAE5]/20 to-[#8F83FF]/20 border border-[#73CAE5]/40 text-xs font-semibold text-white">
          <Scale className="w-3.5 h-3.5 text-[#73CAE5]" />
          <span>Comparativo Exclusivo • Duas Rotas Nucleares</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Fissão × Fusão Nuclear
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Enquanto a <strong>fissão</strong> quebra núcleos atômicos pesados para liberar energia e já opera em centenas de usinas civis, a <strong>fusão</strong> combina núcleos ultraleves como o Sol e representa a maior fronteira tecnológica para a energia limpa e inesgotável do futuro.
        </p>
      </div>

      {/* Visual Scientific Diagrams Section */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Layers className="w-4 h-4" />
          <span>Esquemas Físicos Fundamentais</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fission Diagram Card */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
            <div
              onClick={() => setLightboxImg({
                url: fissionDiagramImg,
                title: 'Diagrama Científico: Fissão Nuclear do Urânio-235',
                desc: 'Um nêutron incide sobre o núcleo pesado de U-235, provocando sua fragmentação em núcleos médios (Bário e Criptônio), 3 nêutrons secundários e cerca de 200 MeV de energia.'
              })}
              className="relative aspect-4/3 bg-black cursor-pointer overflow-hidden"
            >
              <img
                src={fissionDiagramImg}
                alt="Diagrama científico de fissão nuclear: divisão de núcleo pesado de Urânio-235 por nêutron"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/30">
                  Fissão Nuclear (Divisão)
                </span>
                <p className="text-sm font-bold text-white font-display mt-1">
                  Núcleo Pesado → Cisão em Fragmentos + Nêutrons + Energia
                </p>
              </div>
            </div>
            <div className="p-5 space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <p>
                <strong>Mecanismo:</strong> O nêutron térmico desestabiliza o núcleo pesado (U-235 ou Pu-239), vencendo a força nuclear forte e gerando fragmentos com altíssima energia cinética convertida em calor.
              </p>
              <p className="text-[11px] text-[#B7B7B7]/70">
                <strong>Fonte:</strong> Divisão de Educação em Física Nuclear / IAEA Nuclear Data
              </p>
            </div>
          </div>

          {/* Fusion Diagram Card */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
            <div
              onClick={() => setLightboxImg({
                url: fusionDiagramImg,
                title: 'Diagrama Científico: Fusão Termonuclear Deutério-Trítio (D-T)',
                desc: 'Dois núcleos leves de hidrogênio (Deutério e Trítio) fundem-se sob temperaturas de milhões de graus, formando Hélio-4, um nêutron de alta energia e liberando 17,6 MeV.'
              })}
              className="relative aspect-4/3 bg-black cursor-pointer overflow-hidden"
            >
              <img
                src={fusionDiagramImg}
                alt="Diagrama científico de fusão nuclear: união de núcleos leves de Deutério e Trítio formando Hélio-4 e nêutron"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#8F83FF]/20 text-[#8F83FF] border border-[#8F83FF]/30">
                  Fusão Nuclear (União)
                </span>
                <p className="text-sm font-bold text-white font-display mt-1">
                  Núcleos Leves (D + T) → Hélio-4 + Nêutron + 17,6 MeV
                </p>
              </div>
            </div>
            <div className="p-5 space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <p>
                <strong>Mecanismo:</strong> A repulsão eletrostática de Coulomb entre os prótons positivos é superada por energia térmica extrema (150 milhões °C), permitindo que a força nuclear forte una os núcleos.
              </p>
              <p className="text-[11px] text-[#B7B7B7]/70">
                <strong>Fonte:</strong> Laboratório de Física de Plasmas / EUROfusion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Machines & Scale Models Showcase */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
          <Cpu className="w-4 h-4 text-[#73CAE5]" />
          <span>Máquinas e Instalações Reais: Engenharia de Fissão × Fusão</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fission Scale Model Card */}
          <div className="bg-[#111111] border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
            <div
              onClick={() =>
                setLightboxImg({
                  url: fissionReactorModelImg,
                  title: 'Foto Real da Maquete em Corte: Reator de Fissão Nuclear PWR',
                  desc: 'Fotografia documental autêntica da maquete física em corte de um vaso de pressão de reator PWR (Pressurized Water Reactor), expondo o conjunto superior de mecanismos de acionamento de barras de controle (CRDM), flanges forjados de retenção e núcleo interno de elementos combustíveis.'
                })
              }
              className="relative aspect-4/3 bg-black/90 cursor-pointer overflow-hidden flex items-center justify-center p-2"
            >
              <img
                src={fissionReactorModelImg}
                alt="Foto real da maquete de um reator de fissão nuclear PWR"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Fissão • Maquete Real em Corte
                </span>
                <span className="text-amber-400 font-semibold text-xs">Ampliar</span>
              </div>
            </div>
            <div className="p-5 space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <h4 className="font-bold text-white text-sm">Vaso de Pressão do Reator PWR (Corte Técnico)</h4>
              <p>
                Visualização física dos componentes estruturais de um reator de água pressurizada: cabeçote com mecanismos eletromecânicos de barras de controle para modulação da reação em cadeia e vaso forjado sob 155 bar de pressão de operação.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#B7B7B7]/70 pt-1">
                <span><strong>Foto:</strong> Guilherme Wiltgen / Defesa Aérea & Naval</span>
                <span>•</span>
                <span><strong>Referência:</strong> Marinha do Brasil / Sinaval</span>
              </div>
            </div>
          </div>

          {/* Fusion Tokamak ITER Card */}
          <div className="bg-[#111111] border border-[#8F83FF]/30 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group">
            <div
              onClick={() =>
                setLightboxImg({
                  url: iterTokamakImg,
                  title: 'Câmara de Vácuo do Reator de Fusão Tokamak (Projeto ITER)',
                  desc: 'Fotografia documental oficial do vaso de vácuo toroidal e ímãs supercondutores do projeto internacional ITER (Cadarache, França), projetado para 500 MW de potência de fusão.'
                })
              }
              className="relative aspect-4/3 bg-black cursor-pointer overflow-hidden"
            >
              <img
                src={iterTokamakImg}
                alt="Câmara de Vácuo do Reator de Fusão Tokamak ITER (Imagem da Galeria)"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#8F83FF]/20 text-[#8F83FF] border border-[#8F83FF]/30">
                  Fusão • Tokamak ITER (Galeria)
                </span>
                <span className="text-[#8F83FF] font-semibold text-xs">Ampliar</span>
              </div>
            </div>
            <div className="p-5 space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <h4 className="font-bold text-white text-sm">Câmara Toroidal de Confinamento Magnético</h4>
              <p>
                A maior máquina de fusão do planeta: gaiola magnética toroidal com ímãs supercondutores criogênicos resfriados a -269 °C para confinar plasma solar a mais de 150 milhões de °C.
              </p>
              <div className="flex flex-wrap gap-2 text-[11px] text-[#B7B7B7]/70 pt-1">
                <span><strong>Fonte:</strong> Organização ITER / Acervo da Galeria</span>
                <span>•</span>
                <span><strong>Local:</strong> Cadarache, França</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Atomic Models Comparison: U-235, Pu-239, Deuterium, Tritium */}
      <section className="space-y-6">
        <FissionFusionAtomsComparison />
      </section>

      {/* Simulator Embed */}
      <section className="space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Sparkles className="w-4 h-4" />
          <span>Simulador Físico Interativo Passo a Passo</span>
        </div>
        <FissionFusionSimulator />
      </section>

      {/* Interactive Energy Density Calculator */}
      <section className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#8F83FF]" />
              <h3 className="text-xl font-bold text-white font-display">
                Calculadora de Equivalência Energética
              </h3>
            </div>
            <p className="text-xs text-[#B7B7B7] mt-1">
              Veja a quantidade colossal de energia liberada por apenas 1 grama de combustível nuclear versus fóssil.
            </p>
          </div>

          {/* Mass input slider */}
          <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
            <span className="text-xs text-[#B7B7B7]">Massa de Combustível:</span>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={fuelGrams}
              onChange={(e) => setFuelGrams(Number(e.target.value))}
              className="w-24 accent-[#73CAE5]"
            />
            <span className="text-xs font-mono font-bold text-[#73CAE5]">{fuelGrams} grama(s)</span>
          </div>
        </div>

        {/* 3 Columns Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Coal Box */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B7B7B7]">Combustível Fóssil (Carvão)</span>
              <span className="text-xl">🪨</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#B7B7B7] font-mono">
              {coalMJ.toFixed(2)} MJ
            </div>
            <p className="text-[11px] text-[#B7B7B7] leading-relaxed">
              Equivalente à queima química de poucas horas de uma lâmpada incandescente. Libera CO₂ e fuligem diretamente na atmosfera.
            </p>
          </div>

          {/* Fission Box */}
          <div className="p-5 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/40 space-y-3 shadow-lg shadow-[#73CAE5]/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5]">Fissão (Urânio-235)</span>
              <Zap className="w-5 h-5 text-[#73CAE5]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#73CAE5] font-mono">
              {(fissionMJ / 1000).toFixed(0)} GJ
            </div>
            <p className="text-[11px] text-[#B7B7B7] leading-relaxed">
              Equivalente à energia de <strong>{coalTons} toneladas de carvão</strong> ou ~13 barris de petróleo, sem emissões de CO₂ na operação.
            </p>
          </div>

          {/* Fusion Box */}
          <div className="p-5 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/40 space-y-3 shadow-lg shadow-[#8F83FF]/5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF]">Fusão (Deutério-Trítio)</span>
              <Flame className="w-5 h-5 text-[#8F83FF]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#8F83FF] font-mono">
              {(fusionMJ / 1000).toFixed(0)} GJ
            </div>
            <p className="text-[11px] text-[#B7B7B7] leading-relaxed">
              Quase <strong>4 vezes superior à fissão</strong>! Gera apenas hélio inofensivo e nêutrons energéticos sem lixo radioativo de longa vida.
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comprehensive Matrix Table */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Matriz Comparativa Completa
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Fissão vs. Fusão: Todos os Parâmetros
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="p-4 sm:p-5 font-bold text-white uppercase tracking-wider font-display w-1/4">
                  Critério / Propriedade
                </th>
                <th className="p-4 sm:p-5 font-bold text-[#73CAE5] uppercase tracking-wider font-display w-3/8">
                  Fissão Nuclear (Divisão)
                </th>
                <th className="p-4 sm:p-5 font-bold text-[#8F83FF] uppercase tracking-wider font-display w-3/8">
                  Fusão Nuclear (União)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#B7B7B7]">
              {fissionFusionComparison.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white font-mono text-xs">
                    {item.attribute}
                  </td>
                  <td className="p-4 sm:p-5 leading-relaxed">
                    {item.fission}
                  </td>
                  <td className="p-4 sm:p-5 leading-relaxed">
                    {item.fusion}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* The Frontier: Tokamak and Fusion Science */}
      <section className="bg-gradient-to-br from-[#111111] to-[#151221] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
          <Cpu className="w-4 h-4" />
          <span>Fronteira Tecnológica • Projeto ITER e Tokamaks</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Criando uma Estrela em um Frasco Magnético
            </h3>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              Como não existe material na Terra capaz de suportar o contato direto com um plasma a 150 milhões de graus Celsius, os físicos desenvolveram a geometria toroidal do <strong>Tokamak</strong>.
            </p>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              Poderosos eletroímãs supercondutores geram campos magnéticos helicoidais de intensidade colossal (superando 5 Tesla) que confinam as partículas carregadas de plasma sem que elas toquem as paredes da câmara de vácuo.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Marcos Históricos Recentes:
            </h4>
            <div className="space-y-2 text-[#B7B7B7]">
              <div className="flex items-start space-x-2">
                <span className="font-mono text-[#73CAE5] font-bold">2022:</span>
                <span>O NIF (National Ignition Facility, EUA) alcançou o ganho líquido de energia (Q &gt; 1) pela primeira vez em confinamento inercial a laser.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-mono text-[#8F83FF] font-bold">2024:</span>
                <span>O reator JET (Reino Unido) bateu recorde mundial ao gerar 69 megajoules de energia sustentada de fusão.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-mono text-[#73CAE5] font-bold">Em curso:</span>
                <span>Construção do reator internacional ITER no sul da França com 35 nações parceiras para demonstrar 500 MW de potência de fusão.</span>
              </div>
            </div>
          </div>
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
