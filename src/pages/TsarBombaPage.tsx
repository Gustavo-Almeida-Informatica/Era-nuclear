import React, { useState } from 'react';
import { PageId } from '../types';
import tsarBombaCasingImg from '../assets/images/the_tsar_bomba_casing.jpg';
import tsarFireballImg from '../assets/images/tsar_fireball_real_1789483895592.jpg';
import tsarMushroomImg from '../assets/images/tsar_bomba_documentary_real.jpg';
import {
  Globe,
  Calendar,
  MapPin,
  Zap,
  ShieldCheck,
  AlertOctagon,
  Maximize2,
  X,
  Scale,
  Award,
  Flame,
  Info,
  ChevronRight,
  Wind,
  Layers,
  Activity,
  Radio,
  Eye,
  Target,
  FileText
} from 'lucide-react';

interface TsarBombaPageProps {
  onNavigate: (page: PageId) => void;
}

export const TsarBombaPage: React.FC<TsarBombaPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; caption: string } | null>(null);

  const openLightbox = (url: string, title: string, caption: string) => {
    setLightboxImg({ url, title, caption });
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
      {/* Hero Header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#8F83FF]/15 border border-[#8F83FF]/35 text-xs font-bold text-[#8F83FF] uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5" />
            <span>O Ápice da Megatonelagem Nuclear • 1961</span>
          </div>
          <button
            onClick={() => onNavigate('operation-castle')}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#B7B7B7] hover:text-white hover:border-[#73CAE5]/40 transition-colors"
          >
            <Flame className="w-3 h-3 text-[#73CAE5]" />
            <span>Ver Testes de Bikini (Operação Castle)</span>
          </button>
        </div>

        <div className="space-y-3 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white font-display tracking-tight uppercase leading-none">
            Tsar Bomba <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F83FF] via-purple-400 to-rose-400 font-mono">(RDS-220)</span>
          </h1>
          <p className="text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-[#8F83FF] font-medium font-display leading-snug">
            A maior detonação nuclear e o evento explosivo artificial de maior energia já liberado pela humanidade: 50 Megatons de potência.
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#B7B7B7] max-w-4xl leading-relaxed">
          Detonada em <strong>30 de outubro de 1961</strong> pela União Soviética sobre o polígono ártico de Nova Zembla, a <strong>Tsar Bomba</strong> (designação técnica <em>RDS-220 / Produto 602 / Ivan</em>) liberou uma energia colossal de <strong>50 Megatons</strong> (50 milhões de toneladas de TNT ou 2,1 × 10<sup>17</sup> Joules) — mais de <strong>3.300 vezes a bomba de Hiroshima</strong> e cerca de 1,4% de toda a potência energética emitida pelo Sol durante a fração de microssegundo da detonação.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => {
              onNavigate('nuclear-ranking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm hover:shadow-xl hover:shadow-rose-500/25 active:scale-95 transition-all"
          >
            <Target className="w-4 h-4 text-white" />
            <span>Simular Tsar Bomba no Mapa Interativo</span>
            <ChevronRight className="w-4 h-4 text-white/80" />
          </button>

          <a
            href="#visual-sequence"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            <Eye className="w-4 h-4 text-[#8F83FF]" />
            <span>Ver Sequência Visual da Explosão</span>
          </a>
        </div>
      </div>

      {/* Main Spec Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 p-6 rounded-3xl bg-[#111111] border border-white/10 shadow-2xl">
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Potência Real</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">50 Megatons</p>
          <span className="text-[10px] text-slate-400 block font-mono">3.333× Hiroshima</span>
        </div>
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Bola de Fogo (Ø)</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">8,0 km</p>
          <span className="text-[10px] text-slate-400 block font-mono">Raio de 4.000 m</span>
        </div>
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Altura do Cogumelo</span>
          <p className="text-xl sm:text-2xl font-bold text-[#73CAE5] font-mono">67 km</p>
          <span className="text-[10px] text-slate-400 block font-mono">Penetrou Mesosfera</span>
        </div>
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Largura do Chapéu</span>
          <p className="text-xl sm:text-2xl font-bold text-purple-300 font-mono">95 km</p>
          <span className="text-[10px] text-slate-400 block font-mono">Diâmetro da Cúpula</span>
        </div>
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Massa da Bomba</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">27 Toneladas</p>
          <span className="text-[10px] text-slate-400 block font-mono">8 m comprimento</span>
        </div>
        <div className="space-y-1 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
          <span className="text-[11px] text-[#B7B7B7] uppercase font-mono block">Onda no Globo</span>
          <p className="text-xl sm:text-2xl font-bold text-rose-400 font-mono">3 Voltas</p>
          <span className="text-[10px] text-slate-400 block font-mono">Barógrafos Globais</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEÇÃO PRINCIPAL SOLICITADA: SEQUÊNCIA VERTICAL DE IMAGENS                 */}
      {/* 1. Imagem da Bomba                                                        */}
      {/* 2. Embaixo a Bola de Fogo                                                 */}
      {/* 3. Embaixo a Nuvem de Cogumelo                                            */}
      {/* ========================================================================= */}
      <section id="visual-sequence" className="space-y-10">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            <Layers className="w-4 h-4 text-[#8F83FF]" />
            <span>Tríade Visual da Tsar Bomba • Registro em Sequência Vertical</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            A Anatomia do Maior Teste Nuclear: Da Carcaça ao Cogumelo
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl leading-relaxed">
            Acompanhe em ordem cronológica os três elementos visuais definidores do teste: a monumental carcaça física da bomba, a colossal bola de fogo de plasma criada no instante zero e a gigantesca nuvem de cogumelo que perfurou a atmosfera terrestre até a mesosfera.
          </p>
        </div>

        {/* CONTAINER VERTICAL DE IMAGENS */}
        <div className="space-y-12">
          {/* ================================================================= */}
          {/* 1. A IMAGEM DA BOMBA (O DISPOSITIVO RDS-220)                      */}
          {/* ================================================================= */}
          <div className="rounded-3xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-[#8F83FF]/40 group">
            <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950/30 via-transparent to-transparent">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#8F83FF] uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF] animate-pulse" />
                  <span>1º Elemento • O Artefato Físico</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  A Bomba RDS-220 (Produto 602 / "Kuzkina Mat")
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#B7B7B7]">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">8,0 m × 2,1 m</span>
                <span className="px-3 py-1 rounded-lg bg-[#8F83FF]/20 border border-[#8F83FF]/40 text-purple-200 font-bold">27.000 kg</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Frame */}
              <div
                onClick={() =>
                  openLightbox(
                    tsarBombaCasingImg,
                    'A Bomba RDS-220 (Produto 602 / Tsar Bomba)',
                    'Carcaça de aço e blindagem da Tsar Bomba sobre carrinho de transporte industrial de alta capacidade. A bomba de 27 toneladas e 8 metros de comprimento exigiu modificação extrema do bombardeiro Tupolev Tu-95V para poder ser acoplada semifechada em sua fuselagem.'
                  )
                }
                className="lg:col-span-7 relative aspect-16/9 sm:aspect-16/10 bg-black overflow-hidden cursor-pointer group/img"
              >
                <img
                  src={tsarBombaCasingImg}
                  alt="Carcaça da Tsar Bomba RDS-220 em exibição"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                    Registro de Engenharia • Carcaça & Aletas Aerodinâmicas
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </div>
                </div>
              </div>

              {/* Technical Description Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 flex flex-col justify-between text-xs sm:text-sm text-[#B7B7B7] leading-relaxed bg-[#131313]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#8F83FF]" />
                    <span>Engenharia Estrutural do Dispositivo</span>
                  </div>
                  <p>
                    Com <strong>8 metros de comprimento</strong>, <strong>2,1 metros de diâmetro</strong> e peso monumental de <strong>27 toneladas</strong>, a RDS-220 era grande demais para caber inteiramente no compartimento de bombas de qualquer avião do mundo.
                  </p>
                  <p>
                    O bombardeiro quadrimotor <strong>Tupolev Tu-95V</strong> teve suas portas do compartimento de bombas completamente removidas e reforços estruturais soldados à fuselagem. O artefato ficava parcialmente exposto para fora da barriga do avião durante o voo.
                  </p>
                  <p>
                    Para retardar a queda da bomba e permitir que o avião chegasse a 45 km de distância antes da detonação, foi projetado um <strong>paraquedas de náilon de 800 m²</strong> pesando quase <strong>800 kg</strong>, acionado imediatamente após a liberação a 10.500 m.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 font-mono text-xs">
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Camisa Externa:</span>
                    <span className="text-[#8F83FF]">Chumbo (substituindo U-238)</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Paraquedas de Retardo:</span>
                    <span className="text-slate-300">800 m² (800 kg de náilon)</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Aeronave Portadora:</span>
                    <span className="text-[#73CAE5]">Tu-95V (Pintura Térmica Branca)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 2. EMBAIXO: A BOLA DE FOGO (A DETONAÇÃO DE 50 MT)                  */}
          {/* ================================================================= */}
          <div className="rounded-3xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-amber-500/40 group">
            <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-950/30 via-transparent to-transparent">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>2º Elemento (Embaixo) • O Clarão & A Esfera Incandescente</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  A Bola de Fogo Termonuclear (8 km de Diâmetro)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#B7B7B7]">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Altitude: 4.000 m</span>
                <span className="px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 font-bold">Ø 8.000 metros</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Technical Description Panel */}
              <div className="lg:col-span-5 order-2 lg:order-1 p-6 sm:p-8 space-y-4 flex flex-col justify-between text-xs sm:text-sm text-[#B7B7B7] leading-relaxed bg-[#131313]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Física do Plasma & Pulso Térmico</span>
                  </div>
                  <p>
                    Detonada às <strong>11h32 (horário de Moscou)</strong> a 4.000 metros de altitude acima do Campo D-II de Nova Zembla, a ignição termonuclear gerou quase que instantaneamente uma <strong>esfera de plasma superaquecido com 8 quilômetros de diâmetro</strong> (raio de 4.000 metros).
                  </p>
                  <p>
                    A bola de fogo foi tão descomunal que tocou quase o solo simultaneamente e expandiu-se verticalmente até a altitude de onde a bomba havia sido lançada (10.500 m). Ela só não encostou na superfície terrestre porque a <strong>onda de choque refletida pelo solo e pelo oceano congelado</strong> empurrou a bola de fogo para cima.
                  </p>
                  <p>
                    A radiação térmica liberada foi tão intensa que causaria <strong>queimaduras de terceiro grau em qualquer ser humano desprotegido a até 100 km de distância</strong>. A tripulação do Tu-95V, mesmo já a 45 km do ponto zero e dentro de cabine protegida, sentiu uma onda sufocante de calor intenso varrer seus corpos.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2 font-mono text-xs">
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Clarão Térmico Visível:</span>
                    <span className="text-amber-300">&gt; 1.000 km (Noruega, Finlândia)</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Sensação Térmica Corporal:</span>
                    <span className="text-slate-300">Sentida a 270 km do hipocentro</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Taxa de Potência de Pico:</span>
                    <span className="text-amber-400 font-bold">5,4 × 10²⁴ Watts (~1,4% do Sol)</span>
                  </div>
                </div>
              </div>

              {/* Image Frame */}
              <div
                onClick={() =>
                  openLightbox(
                    tsarFireballImg,
                    'A Bola de Fogo da Tsar Bomba (8.000 metros de diâmetro)',
                    'Registro documental do momento em que a esfera colossal de plasma termonuclear de 8 km paira sobre a paisagem ártica de Nova Zembla a 4.000 metros de altitude. A onda de choque refletida do solo sustenta a imensa bola incandescente no ar.'
                  )
                }
                className="lg:col-span-7 order-1 lg:order-2 relative aspect-16/9 sm:aspect-16/10 bg-black overflow-hidden cursor-pointer group/img"
              >
                <img
                  src={tsarFireballImg}
                  alt="Bola de fogo monumental da Tsar Bomba no céu ártico"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                    Detonação Aérea • 4.000 m de Altitude • Plasma Solar
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 3. EMBAIXO: A NUVEM DE COGUMELO (A ASCENSÃO À MESOSFERA)           */}
          {/* ================================================================= */}
          <div className="rounded-3xl bg-[#111111] border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-[#73CAE5]/40 group">
            <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-950/30 via-transparent to-transparent">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#73CAE5] uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5] animate-pulse" />
                  <span>3º Elemento (Embaixo) • O Cogumelo Atômico Gigantesco</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                  A Nuvem em Cogumelo (67 km de Altura • Mesosfera)
                </h3>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#B7B7B7]">
                <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10">Base: 40 km largura</span>
                <span className="px-3 py-1 rounded-lg bg-[#73CAE5]/20 border border-[#73CAE5]/40 text-cyan-200 font-bold">Cúpula: Ø 95 km</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              {/* Image Frame */}
              <div
                onClick={() =>
                  openLightbox(
                    tsarMushroomImg,
                    'A Nuvem em Cogumelo da Tsar Bomba (67 km de altitude)',
                    'A colossal coluna de condensação e gases ionizados subindo a 67 km de altura, perfurando a troposfera, a estratosfera e penetrando na mesosfera. A cúpula em couve-flor espalhou-se por 95 km de diâmetro na atmosfera polar.'
                  )
                }
                className="lg:col-span-7 relative aspect-16/9 sm:aspect-16/10 bg-black overflow-hidden cursor-pointer group/img"
              >
                <img
                  src={tsarMushroomImg}
                  alt="Nuvem de cogumelo da Tsar Bomba subindo a 67 km de altura"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-md">
                    Ascensão à Mesosfera • 67.000 metros de altitude
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Ampliar</span>
                  </div>
                </div>
              </div>

              {/* Technical Description Panel */}
              <div className="lg:col-span-5 p-6 sm:p-8 space-y-4 flex flex-col justify-between text-xs sm:text-sm text-[#B7B7B7] leading-relaxed bg-[#131313]">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-white font-bold text-sm">
                    <Activity className="w-4 h-4 text-[#73CAE5]" />
                    <span>Dinâmica Atmosférica & Propagação</span>
                  </div>
                  <p>
                    A ascensão térmica da explosão criou uma coluna convectiva monstruosa que atingiu <strong>67 quilômetros de altitude</strong> — cerca de <strong>sete vezes e meia a altura do Monte Everest</strong>.
                  </p>
                  <p>
                    A nuvem atravessou completamente a troposfera (11 km), cruzou toda a estratosfera (50 km) e <strong>penetrou profundamente na mesosfera superior</strong>. Sua cúpula expandiu-se com um diâmetro de <strong>95 quilômetros</strong>, criando anéis múltiplos de condensação atmosférica ao redor da coluna principal de 40 km de diâmetro.
                  </p>
                  <p>
                    A intensa ionização dos gases atmosféricos e o pulso eletromagnético (EMP) causaram um <strong>blackout total das comunicações via rádio</strong> em centenas de milhares de quilômetros quadrados do Ártico soviético por mais de uma hora.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20 space-y-2 font-mono text-xs">
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Onda Sísmica (Solo):</span>
                    <span className="text-[#73CAE5] font-bold">5,0 a 5,25 Escala Richter</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Onda de Choque Atmosférica:</span>
                    <span className="text-purple-300 font-bold">Circundou a Terra 3 vezes</span>
                  </div>
                  <div className="text-white font-bold flex items-center justify-between">
                    <span>Destruição Severny (55 km):</span>
                    <span className="text-rose-400 font-bold">100% de arrasamento físico</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO: HISTÓRIA COMPLETA DO TESTE                                         */}
      {/* ========================================================================= */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-white/10 pb-4">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            <Calendar className="w-4 h-4 text-[#8F83FF]" />
            <span>Crônica Histórica Completa • Outubro de 1961</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Todo o Teste da Tsar Bomba: Bastidores, Política e Execução
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-white/10 space-y-3.5">
            <div className="flex items-center space-x-2.5 text-white font-bold">
              <span className="w-7 h-7 rounded-lg bg-[#8F83FF]/20 border border-[#8F83FF]/40 flex items-center justify-center font-mono text-xs text-[#8F83FF]">
                01
              </span>
              <h4 className="text-base font-bold font-display">A Decisão de Nikita Khrushchev</h4>
            </div>
            <p>
              No outono de 1961, as superpotências viviam o ápice da tensão com a <strong>Crise de Berlim</strong> e a recém-iniciada construção do Muro de Berlim. O premiê Nikita Khrushchev queria uma demonstração estarrecedora do poder científico e militar soviético durante o 22º Congresso do Partido Comunista da União Soviética.
            </p>
            <p>
              Khrushchev declarou publicamente que a URSS possuía uma bomba de 100 Megatons, mas que os testes seriam limitados a 50 Mt para <em>"não quebrar os vidros em Moscou"</em>.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-white/10 space-y-3.5">
            <div className="flex items-center space-x-2.5 text-white font-bold">
              <span className="w-7 h-7 rounded-lg bg-[#73CAE5]/20 border border-[#73CAE5]/40 flex items-center justify-center font-mono text-xs text-[#73CAE5]">
                02
              </span>
              <h4 className="text-base font-bold font-display">O Grupo de Físicos de Sarov (Arzamas-16)</h4>
            </div>
            <p>
              A equipe de físicos teóricos em Sarov — liderada por <strong>Andrei Sakharov, Viktor Adamsky, Yuri Babaev, Yuri Smirnov e Yulii Khariton</strong> — recebeu o encargo de desenhar o artefato termonuclear em tempo recorde de <strong>menos de 15 semanas</strong> (julho a outubro de 1961).
            </p>
            <p>
              A física teórica exigia soluções inéditas de hidrodinâmica de radiação para garantir a compressão termonuclear simétrica de múltiplos módulos secundários.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-white/10 space-y-3.5">
            <div className="flex items-center space-x-2.5 text-white font-bold">
              <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center font-mono text-xs text-amber-400">
                03
              </span>
              <h4 className="text-base font-bold font-display">A Missão Extrema do Tu-95V</h4>
            </div>
            <p>
              A aeronave transportadora foi pilotada pelo <strong>Major Andrei Durnovtsev</strong>, acompanhada por um avião-laboratório Tu-16 pilotado pelo Tenente-Coronel Vladimir Erokhin. As estimativas oficiais calculavam uma <strong>chance de sobrevivência de apenas 50%</strong> para os tripulantes devido ao pulso térmico e à onda de choque.
            </p>
            <p>
              A onda de choque atingiu o Tu-95V quando este já estava a <strong>115 km de distância</strong>, fazendo a aeronave despencar quase 1.000 metros de altitude em queda livre antes de os pilotos conseguirem estabilizar os controles.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO: EFEITOS E PODER DA EXPLOSÃO (ANÁLISE CIENTÍFICA DETALHADA)          */}
      {/* ========================================================================= */}
      <section className="bg-gradient-to-br from-[#121212] via-[#1a1329] to-[#0D0D0D] border border-white/10 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-10">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>Fenomenologia Física e Potência Destrutiva</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            O Poder Energético Absoluto e os Efeitos Físicos Observados
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Uma análise quantitativa da escala destrutiva gerada pelos 50 Megatons no arquipélago ártico e ao redor do planeta:
          </p>
        </div>

        {/* Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs leading-relaxed">
          {/* Item 1 */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 uppercase font-mono text-[11px]">Pulso Térmico</span>
              <Flame className="w-4 h-4 text-rose-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Queimaduras a 100 km</h4>
            <p className="text-[#B7B7B7]">
              O fluxo térmico emitido foi de aproximadamente <strong>43 J/cm² a 100 km de distância</strong>, limiar suficiente para provocar queimaduras humanas de 3º grau generalizadas e inflamar tecidos, madeira e vegetação expostos.
            </p>
          </div>

          {/* Item 2 */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#8F83FF] uppercase font-mono text-[11px]">Arrasamento Estrutural</span>
              <AlertOctagon className="w-4 h-4 text-[#8F83FF]" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Vila de Severny (55 km)</h4>
            <p className="text-[#B7B7B7]">
              Localizada a 55 km do hipocentro, a vila militar de Severny (previamente desocupada) foi <strong>completamente pulverizada</strong>: todas as casas de madeira e alvenaria foram arrancadas de seus alicerces e niveladas.
            </p>
          </div>

          {/* Item 3 */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#73CAE5] uppercase font-mono text-[11px]">Onda Atmosférica</span>
              <Globe className="w-4 h-4 text-[#73CAE5]" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">3 Voltas ao Redor da Terra</h4>
            <p className="text-[#B7B7B7]">
              A onda de pressão atmosférica continuou circundando o globo terrestre e foi <strong>detectada por barógrafos científicos durante 3 voltas completas</strong>. Janelas de vidro foram trincadas e estilhaçadas a até 780 km na Ilha de Dikson.
            </p>
          </div>

          {/* Item 4 */}
          <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 uppercase font-mono text-[11px]">Sismo Induzido</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-white font-display">Magnitude 5,0 a 5,25 Richter</h4>
            <p className="text-[#B7B7B7]">
              Mesmo sendo detonada no ar a 4 km de altura sem crateramento profundo direto no solo, a transmissão de momento mecânico ao solo gerou uma onda sísmica profunda registrada por sismógrafos em todo o hemisfério norte.
            </p>
          </div>
        </div>

        {/* Scientific Comparison Bar */}
        <div className="p-6 rounded-2xl bg-black/60 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#8F83FF]" />
              <span>Comparativo Brutal de Rendimento Energético</span>
            </h4>
            <span className="text-xs text-slate-400 font-mono">Em Megatons de TNT</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Hiroshima */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Hiroshima "Little Boy" (1945)</span>
                <span className="text-white font-bold">0,015 Mt (15 kt)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-slate-400 rounded-full" style={{ width: '0.5%' }} />
              </div>
            </div>

            {/* Castle Bravo */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-400">
                <span>Castle Bravo (1954, Maior Teste dos EUA)</span>
                <span className="text-[#73CAE5] font-bold">15,0 Mt</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-[#73CAE5] rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            {/* Tsar Bomba */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-300 font-bold">
                <span className="text-purple-300">Tsar Bomba RDS-220 (1961, Maior Teste da História)</span>
                <span className="text-[#8F83FF] font-extrabold text-sm">50,0 Megatons</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-slate-800 overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-[#8F83FF] via-purple-400 to-rose-400 rounded-full" style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO: A DECISÃO DO CHUMBO (POR QUE 50 MT EM VEZ DE 100 MT)               */}
      {/* ========================================================================= */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Info className="w-4 h-4 text-[#73CAE5]" />
          <span>Física Nuclear Teórica & Responsabilidade Científica</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          Por que 50 Megatons em vez de 100 Megatons?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="space-y-4">
            <p>
              O projeto teórico inicial da RDS-220 previa um rendimento estarrecedor de <strong>100 Megatons</strong> utilizando uma camisa externa (tamper) fabricada em <strong>Urânio-238</strong>.
            </p>
            <p>
              Sob o fluxo descomunal de nêutrons rápidos de 14,1 MeV gerados pela fusão do deutereto de lítio no secundário, o Urânio-238 sofreria fissão acelerada, dobrando a potência da arma para 100 Mt.
            </p>
            <p>
              Porém, os cálculos meticulosos de <strong>Andrei Sakharov</strong> revelaram que 50 Megatons derivados puramente de fissão de urânio espalhariam uma quantidade catastrófica de <strong>precipitação radioativa (fallout)</strong> por todo o hemisfério norte, contaminando irremediavelmente território soviético povoado.
            </p>
          </div>

          <div className="space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-bold text-white font-display">
              A Decisão Histórica da Camisa de Chumbo
            </h4>
            <p>
              Sakharov convenceu o ministro Efim Slavsky e a liderança militar a substituir a camisa de Urânio-238 por um <strong>revestimento inerte de chumbo puro</strong>.
            </p>
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-white space-y-1.5">
              <span className="font-bold text-emerald-400 block uppercase font-mono">Resultado Notável e Inesperado:</span>
              <p className="text-[#B7B7B7]">
                Mais de <strong>97% da energia total de 50 Megatons foi liberada exclusivamente por reações de fusão nuclear pura</strong>. Paradoxalmente, a Tsar Bomba tornou-se um dos testes atmosféricos com <em>menor resíduo de fissão radioativa por megaton</em> de toda a história humana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SEÇÃO: LEGADO HISTÓRICO, SAKHAROV E O TRATADO PTBT                        */}
      {/* ========================================================================= */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121212] via-[#1b1430] to-[#0D0D0D] border border-[#8F83FF]/30 space-y-6 shadow-2xl">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
          <Award className="w-4 h-4 text-[#8F83FF]" />
          <span>Transformação Geopolítica & Consequências Globais</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          O Ponto de Inflexão da Guerra Fria
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <h4 className="text-base font-bold text-white font-display">1. Fim das Bombas Gigantes</h4>
            <p>
              O teste provou de forma categórica que armas nucleares acima de 20–30 Mt eram <strong>militarmente ineficientes</strong>: a maior parte da energia escapava para o vácuo espacial. O peso excessivo impedia o lançamento por mísseis balísticos intercontinentais (ICBMs). As potências voltaram seu foco para a precisão e ogivas menores múltiplas (MIRVs).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <h4 className="text-base font-bold text-white font-display">2. Tratado PTBT de 1963</h4>
            <p>
              O choque e o pavor causados pela escala da explosão aceleraram diretamente as conversações entre John F. Kennedy e Nikita Khrushchev, resultando na assinatura do <strong>Tratado de Proibição Parcial de Testes (PTBT)</strong> em agosto de 1963, que baniu permanentemente testes na atmosfera, no espaço e debaixo d'água.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <h4 className="text-base font-bold text-white font-display">3. A Transformação de Sakharov</h4>
            <p>
              O contato direto com a força aterradora da Tsar Bomba foi o estopim moral para <strong>Andrei Sakharov</strong>. O "pai da bomba de hidrogênio soviética" transformou-se no maior dissidente pacífico da URSS, lutando pelo desarmamento nuclear e pelos direitos humanos, o que lhe rendeu o <strong>Prêmio Nobel da Paz em 1975</strong>.
            </p>
          </div>
        </div>

        {/* Bottom Interactive Navigation */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('operation-castle')}
            className="inline-flex items-center space-x-2 text-xs sm:text-sm text-[#73CAE5] hover:text-white transition-colors font-mono"
          >
            <span>← Retornar para Aba da Operação Castle (1954)</span>
          </button>

          <button
            onClick={() => {
              onNavigate('nuclear-ranking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs sm:text-sm hover:shadow-xl hover:shadow-rose-500/25 active:scale-95 transition-all"
          >
            <Target className="w-4 h-4 text-white" />
            <span>Simular Detonação da Tsar Bomba no Mapa</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MODAL LIGHTBOX FULL-SCREEN INTERATIVO                                     */}
      {/* ========================================================================= */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="max-w-5xl w-full bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF]" />
                <h4 className="text-xs sm:text-sm font-bold text-white font-display">
                  {lightboxImg.title}
                </h4>
              </div>
              <button
                onClick={() => setLightboxImg(null)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Fechar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
              <img
                src={lightboxImg.url}
                alt={lightboxImg.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[65vh] object-contain rounded-xl"
              />
            </div>

            <div className="p-4 sm:p-5 bg-[#121212] border-t border-white/10 text-xs text-[#B7B7B7] space-y-1.5 leading-relaxed">
              <p className="font-semibold text-white">{lightboxImg.title}</p>
              <p>{lightboxImg.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
