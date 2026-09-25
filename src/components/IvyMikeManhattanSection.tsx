import React, { useState } from 'react';
import { PageId } from '../types';
import ivyMikeImg from '../assets/images/ivy_mike_blast_1787763915443.jpg';
import trinityImg from '../assets/images/trinity_test_blast_1787676677780.jpg';
import hiroshimaExplosionImg from '../assets/images/hiroshima_explosion.jpg';
import hiroshimaDomeImg from '../assets/images/genbaku_dome_real.jpg';
import nagasakiExplosionImg from '../assets/images/nagasaki_explosion.jpg';
import nagasakiMemorialImg from '../assets/images/nagasaki_peace_memorial_1787677448589.jpg';
import chicagoPile1Img from '../assets/images/chicago_pile_one_1787677642726.jpg';
import {
  Atom,
  Flame,
  Zap,
  Users,
  Target,
  Maximize2,
  Calendar,
  MapPin,
  AlertTriangle,
  Award,
  BookOpen,
  Scale,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  Radio,
  Layers,
  Activity
} from 'lucide-react';

export interface LightboxData {
  url: string;
  title: string;
  caption?: string;
  details?: string;
}

interface IvyMikeManhattanSectionProps {
  onOpenLightbox: (data: LightboxData) => void;
  onNavigate?: (page: PageId) => void;
}

export const IvyMikeManhattanSection: React.FC<IvyMikeManhattanSectionProps> = ({
  onOpenLightbox,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'both' | 'ivy-mike' | 'manhattan'>('both');

  const physicists = [
    {
      name: 'J. Robert Oppenheimer',
      role: 'Diretor Científico de Los Alamos (Projeto Y)',
      contribution: 'Coordenou o projeto teórico e experimental das primeiras bombas atômicas. Conduziu o teste Trinity e a montagem final de Little Boy e Fat Man.',
      tag: 'Diretor Científico'
    },
    {
      name: 'Enrico Fermi',
      role: 'Pioneiro da Reação em Cadeia • Prêmio Nobel',
      contribution: 'Construiu o Chicago Pile-1 (1942), provando que uma reação em cadeia autosustentável era fisicamente possível. Calculou o rendimento de Trinity com tiras de papel.',
      tag: 'Chicago Pile-1'
    },
    {
      name: 'Hans Bethe',
      role: 'Chefe da Divisão Teórica em Los Alamos',
      contribution: 'Formulou a física da fusão solar e chefiou os cálculos hidrodinâmicos da implosão, propagação de choque e temperatura em fissão e fusão.',
      tag: 'Divisão Teórica'
    },
    {
      name: 'Richard Feynman',
      role: 'Líder do Grupo de Computação e Difusão',
      contribution: 'Desenvolveu a equação Bethe-Feynman para o rendimento de fissão e supervisionou os computadores eletromecânicos pioneiros para simulações de nêutrons.',
      tag: 'Fórmula Bethe-Feynman'
    },
    {
      name: 'Edward Teller',
      role: 'Pioneiro da Fusão Termonuclear',
      contribution: 'Defendeu desde 1942 a concepção da "Superbomba" de fusão nuclear. Junto a Stanislaw Ulam, formulou o conceito de implosão por radiação testado em Ivy Mike.',
      tag: 'Arquiteto de Ivy Mike'
    },
    {
      name: 'Ernest Lawrence',
      role: 'Diretor do Laboratório de Radiação em Berkeley',
      contribution: 'Criou os calutrons em Oak Ridge (Tennessee) para separação eletromagnética de Urânio-235 físsil através de espectrometria de massa em grande escala.',
      tag: 'Enriquecimento Y-12'
    },
    {
      name: 'John von Neumann',
      role: 'Consultor Matemático e Teórico de Choques',
      contribution: 'Calculou matematicamente a geometria tridimensional das lentes de explosivos de implosão para comprimir o caroço de plutônio de maneira perfeitamente esférica.',
      tag: 'Lentes de Implosão'
    },
    {
      name: 'Leo Szilard & Albert Einstein',
      role: 'Originadores do Alerta Inicial (Carta de 1939)',
      contribution: 'Szilard concebeu a ideia de reação em cadeia em 1933. Em 1939, Einstein assinou a carta histórica a Franklin Roosevelt alertando sobre a ameaça nazista.',
      tag: 'Carta a Roosevelt'
    }
  ];

  return (
    <section className="space-y-10 pt-8 border-t border-white/10">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#73CAE5]/20 via-[#8F83FF]/20 to-rose-500/20 border border-white/20 text-xs font-bold text-white uppercase tracking-wider font-mono shadow-sm">
            <Atom className="w-3.5 h-3.5 text-[#73CAE5]" />
            <span>A Antecedência Histórica: Da Fissão à Megatonelagem Termonuclear (1942–1952)</span>
          </div>

          {/* Tab Selector & Standalone Page Links */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center bg-[#151515] border border-white/15 rounded-xl p-1 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('both')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'both'
                    ? 'bg-white/15 text-white shadow font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Lado a Lado
              </button>
              <button
                onClick={() => setActiveTab('ivy-mike')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'ivy-mike'
                    ? 'bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/40 shadow font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Zap className="w-3 h-3 text-[#73CAE5]" />
                <span>Ivy Mike</span>
              </button>
              <button
                onClick={() => setActiveTab('manhattan')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                  activeTab === 'manhattan'
                    ? 'bg-[#8F83FF]/20 text-[#8F83FF] border border-[#8F83FF]/40 shadow font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Atom className="w-3 h-3 text-[#8F83FF]" />
                <span>Projeto Manhattan</span>
              </button>
            </div>

            {onNavigate && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => onNavigate('ivy-mike')}
                  className="px-2.5 py-1.5 rounded-xl bg-[#73CAE5]/10 hover:bg-[#73CAE5]/20 border border-[#73CAE5]/30 text-[#73CAE5] text-xs font-medium flex items-center space-x-1.5 transition-colors"
                  title="Abrir página dedicada exclusiva de Ivy Mike"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Aba Ivy Mike</span>
                </button>
                <button
                  onClick={() => onNavigate('manhattan-project')}
                  className="px-2.5 py-1.5 rounded-xl bg-[#8F83FF]/10 hover:bg-[#8F83FF]/20 border border-[#8F83FF]/30 text-[#8F83FF] text-xs font-medium flex items-center space-x-1.5 transition-colors"
                  title="Abrir página dedicada exclusiva do Projeto Manhattan"
                >
                  <Atom className="w-3.5 h-3.5" />
                  <span>Aba Manhattan</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-4xl space-y-2">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display uppercase tracking-tight">
            Ivy Mike & O Projeto Manhattan
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-medium">
            Entenda como a fissão nuclear dominada em Los Alamos levou aos bombardeios de Hiroshima e Nagasaki e, em apenas sete anos, à primeira detonação termonuclear de fusão da história com Ivy Mike — o teste que abriu caminho direto para a <strong>Operação Castle</strong>.
          </p>
        </div>
      </div>

      {/* Main Grid: Left = Ivy Mike (1952) | Right = Manhattan Project (1942-1945) */}
      <div className={`grid gap-8 items-start ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        
        {/* ======================================================== */}
        {/* LEFT COLUMN: IVY MIKE (1952) — TODA A HISTÓRIA DETALHADA */}
        {/* ======================================================== */}
        {(activeTab === 'both' || activeTab === 'ivy-mike') && (
          <div className="bg-[#111111] border border-[#73CAE5]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#73CAE5] uppercase tracking-wider bg-[#73CAE5]/10 px-3 py-1 rounded-full border border-[#73CAE5]/30">
                <Zap className="w-3.5 h-3.5" />
                <span>O 1º Teste Termonuclear da História • 1952</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                10,4 Megatons (10.400 kt)
              </span>
            </div>

            {/* Title & Introduction */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                O Teste Ivy Mike (1º de Novembro de 1952)
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Conduzido na remota ilha de Elugelab, no Atol de Enewetak, <strong>Ivy Mike</strong> foi a primeira bomba termonuclear (bomba de hidrogênio) verdadeiramente testada na história, baseada no conceito <em>Teller-Ulam</em> de implosão por radiação.
              </p>
            </div>

            {/* Primary Explosion Photo with Lightbox */}
            <div className="space-y-2">
              <div
                onClick={() =>
                  onOpenLightbox({
                    url: ivyMikeImg,
                    title: 'Teste Termonuclear Ivy Mike (1952) — 10,4 Megatons',
                    caption: 'A colossal nuvem em cogumelo de Ivy Mike erguendo-se a 41 km de altitude sobre o Atol de Enewetak em 1º de novembro de 1952.',
                    details: 'O dispositivo utilizou deutério líquido criogênico mantido a -250°C. A explosão vaporizou completamente a ilha de Elugelab, abrindo uma cratera submarina de 1,9 km de largura e 50 metros de profundidade.'
                  })
                }
                className="relative rounded-2xl overflow-hidden bg-black border border-[#73CAE5]/40 group cursor-pointer aspect-16/10 shadow-xl"
              >
                <img
                  src={ivyMikeImg}
                  alt="Nuvem de explosão do teste Ivy Mike em 1952"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                  <span className="text-[10px] font-mono text-[#73CAE5] font-bold block uppercase">
                    Foto Histórica Oficial • Acervo Los Alamos / DOE
                  </span>
                  <p className="font-semibold truncate">Nuvem cogumelo de Ivy Mike atingindo 41 km de altitude</p>
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4 text-[#73CAE5]" />
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                Clique na fotografia para ampliá-la em alta definição com ficha técnica e contexto.
              </p>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase">Potência</span>
                <span className="text-sm font-bold text-[#73CAE5]">10,4 Mt</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase">Peso Total</span>
                <span className="text-sm font-bold text-white">82 Toneladas</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase">Bola de Fogo</span>
                <span className="text-sm font-bold text-amber-400">5,2 km diâm.</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-[10px] text-neutral-400 block uppercase">Cratera</span>
                <span className="text-sm font-bold text-rose-400">1,9 km larg.</span>
              </div>
            </div>

            {/* Technical Highlights & The Sausage */}
            <div className="space-y-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="font-bold text-white flex items-center space-x-2">
                  <Layers className="w-4 h-4 text-[#73CAE5]" />
                  <span>O Monstro Criogênico: O Dispositivo "The Sausage"</span>
                </h4>
                <p>
                  O dispositivo pesava <strong>82 toneladas métricas</strong> e tinha mais de 6 metros de altura. Por utilizar <strong>deutério líquido puro</strong>, exigia uma temperatura extrema de <strong>-250 °C (20 Kelvin)</strong> mantida por um gigantesco Dewar de vácuo e uma usina criogênica de liquefação inteira construída na ilha.
                </p>
                <p className="text-neutral-400 text-xs">
                  Não era uma arma militarizável para bombardeiros, mas sim um colossal experimento científico de prova de conceito para validar a implosão termonuclear por radiação (Teller-Ulam).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <h4 className="font-bold text-rose-300 flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>A Aniquilação Total da Ilha de Elugelab</span>
                </h4>
                <p>
                  A explosão foi tão violenta que a ilha de coral de Elugelab <strong>desapareceu por completo da superfície da Terra</strong>. Em seu lugar restou apenas uma cratera oceânica de 1,9 km de diâmetro e 50 metros de profundidade, com água do Pacífico fervendo.
                </p>
                <p className="text-xs text-rose-200/80">
                  A nuvem subiu a 41 km de altitude e atingiu uma largura de 160 km em poucos minutos, expelindo milhões de toneladas de coral pulverizado.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="font-bold text-amber-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Descoberta de Novos Elementos: Einstênio e Férmio</span>
                </h4>
                <p>
                  O fluxo monumental de nêutrons de Ivy Mike sintetizou pela primeira vez no universo átomos que capturaram até 17 nêutrons sucessivos.
                </p>
                <p className="text-xs text-neutral-300">
                  Ao analisar filtros de papel trazidos por jatos F-84 Thunderjet que sobrevoaram a nuvem, os cientistas de Berkeley liderados por Albert Ghiorso descobriram dois novos elementos químicos da tabela periódica: o <strong>Einstênio (Es, elemento 99)</strong> e o <strong>Férmio (Fm, elemento 100)</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 space-y-2">
                <h4 className="font-bold text-[#73CAE5] flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>A Ponte Direta com a Operação Castle (1954)</span>
                </h4>
                <p>
                  Embora Ivy Mike tenha comprovado que a fusão funcionava, manter deutério líquido em tanques criogênicos era inviável para mísseis ou aviões da Guerra Fria.
                </p>
                <p className="text-xs text-neutral-200">
                  Essa limitação forçou o avanço imediato para a <strong>Operação Castle</strong> em 1954, substituindo o deutério líquido por <strong>deutereto de lítio sólido (LiD)</strong>, inaugurando a era das bombas de hidrogênio compactas e operacionais como Castle Bravo.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* RIGHT COLUMN: PROJETO MANHATTAN (1942–1945) — COMPLETO    */}
        {/* ======================================================== */}
        {(activeTab === 'both' || activeTab === 'manhattan') && (
          <div className="bg-[#111111] border border-[#8F83FF]/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#8F83FF] uppercase tracking-wider bg-[#8F83FF]/10 px-3 py-1 rounded-full border border-[#8F83FF]/30">
                <Atom className="w-3.5 h-3.5" />
                <span>A Gênese Nuclear • 1942 a 1945</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                Los Alamos • Oak Ridge • Hanford
              </span>
            </div>

            {/* Title & Introduction */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                O Projeto Manhattan & Os Pioneiros
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Iniciado formalmente em agosto de 1942 sob comando do <strong>General Leslie Groves</strong> e direção científica de <strong>J. Robert Oppenheimer</strong>, o Projeto Manhattan reuniu os maiores físicos do século XX para desenvolver a primeira arma de fissão atômica da história.
              </p>
            </div>

            {/* Trinity Explosion Image with Lightbox */}
            <div className="space-y-2">
              <div
                onClick={() =>
                  onOpenLightbox({
                    url: trinityImg,
                    title: 'Teste Trinity (16 de Julho de 1945) — A Primeira Detonação Atômica',
                    caption: 'A bola de fogo do teste Trinity fotografada 0,016 segundo após a ignição do dispositivo "The Gadget" no deserto do Novo México.',
                    details: 'O teste liberou ~21 quilotons de TNT usando uma esfera de plutônio comprimida por implosão com lentes explosivas. O calor extremo fundiu a areia do deserto em um novo mineral vítreo esverdeado batizado de Trinitita.'
                  })
                }
                className="relative rounded-2xl overflow-hidden bg-black border border-[#8F83FF]/40 group cursor-pointer aspect-16/10 shadow-xl"
              >
                <img
                  src={trinityImg}
                  alt="Bola de fogo do Teste Trinity em 1945"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                  <span className="text-[10px] font-mono text-[#8F83FF] font-bold block uppercase">
                    Foto Histórica Oficial • Trinity Site, Jornada del Muerto (EUA)
                  </span>
                  <p className="font-semibold truncate">Teste Trinity: Bola de fogo de 21 kt que inaugurou a Era Atômica</p>
                </div>

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white backdrop-blur-md opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4 text-[#8F83FF]" />
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 italic">
                Fotografia histórica preservada do Laboratório Nacional de Los Alamos. Clique para expandir.
              </p>
            </div>

            {/* Physicists Spotlight Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-white">
                <Users className="w-4 h-4 text-[#8F83FF]" />
                <span>Os Físicos & Cientistas Envolvidos</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {physicists.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#8F83FF]/50 transition-colors space-y-1"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-white truncate">{p.name}</span>
                      <span className="text-[9px] font-mono font-bold text-[#8F83FF] bg-[#8F83FF]/15 px-1.5 py-0.5 rounded shrink-0">
                        {p.tag}
                      </span>
                    </div>
                    <span className="text-[10px] text-neutral-400 block font-medium">{p.role}</span>
                    <p className="text-[11px] text-neutral-300 leading-snug">{p.contribution}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Chicago Pile-1 Feature */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center gap-4">
              <div
                onClick={() =>
                  onOpenLightbox({
                    url: chicagoPile1Img,
                    title: 'Chicago Pile-1 (1942) — Primeira Reação em Cadeia Autosustentável',
                    caption: 'O reator Chicago Pile-1 construído sob a liderança de Enrico Fermi sob as arquibancadas de Stagg Field na Universidade de Chicago em 2 de dezembro de 1942.',
                    details: 'Construído com blocos de grafite e esferas de urânio natural, atingiu a criticalidade nuclear pela primeira vez na história humana, provando experimentalmente que a energia do átomo podia ser libertada de forma controlada.'
                  })
                }
                className="w-full sm:w-36 h-24 rounded-xl overflow-hidden bg-black border border-white/15 shrink-0 relative cursor-pointer group shadow"
              >
                <img
                  src={chicagoPile1Img}
                  alt="Esboço e foto histórica do Chicago Pile-1"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <Maximize2 className="w-4 h-4 text-white drop-shadow" />
                </div>
              </div>
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-mono text-[#73CAE5] font-bold uppercase">
                  Marco Fundamental • 2 de Dezembro de 1942
                </span>
                <h5 className="font-bold text-white text-sm">O Reator Chicago Pile-1 de Fermi</h5>
                <p className="text-neutral-300 leading-relaxed">
                  Enrico Fermi provou a fissão em cadeia controlada, validando a física que permitiu a construção dos reatores de Hanford para produzir plutônio e o projeto de armas em Los Alamos.
                </p>
              </div>
            </div>

            {/* Hiroshima & Nagasaki Bombing Section */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
                <Target className="w-4 h-4" />
                <span>Os Bombardeios de Hiroshima e Nagasaki (Agosto de 1945)</span>
              </div>

              {/* Hiroshima & Nagasaki Side-by-Side Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Hiroshima Little Boy */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Hiroshima — Little Boy</span>
                    </h5>
                    <span className="text-[10px] font-mono text-amber-300 font-bold bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                      ~15 kt
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      onOpenLightbox({
                        url: hiroshimaExplosionImg,
                        title: 'Nuvem Atômica de Hiroshima — Little Boy (6 de Agosto de 1945)',
                        caption: 'A histórica fotografia aérea registrando a colossal nuvem de cogumelo atômico elevando-se sobre Hiroshima após o ataque do B-29 Enola Gay.',
                        details: 'A arma utilizou o método de disparo por canhão com 64 kg de Urânio-235 físsil enriquecido em Oak Ridge, detonando a 600 metros acima da cidade.'
                      })
                    }
                    className="relative rounded-xl overflow-hidden aspect-4/3 bg-black border border-white/10 cursor-pointer group shadow"
                  >
                    <img
                      src={hiroshimaExplosionImg}
                      alt="Nuvem atômica de Hiroshima"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-white font-medium">Nuvem sobre Hiroshima (NARA)</span>
                    </div>
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 space-y-1 leading-relaxed">
                    <p>
                      <strong>6 de agosto de 1945:</strong> Lançada pelo bombardeiro B-29 <em>Enola Gay</em>. Bomba de fissão por canhão com <strong>Urânio-235</strong>.
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      O calor na superfície superou 4.000 °C, destruindo 12 km² do centro urbano e ceifando entre 70.000 e 140.000 vidas até o fim daquele ano.
                    </p>
                  </div>
                </div>

                {/* Nagasaki Fat Man */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-sm flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>Nagasaki — Fat Man</span>
                    </h5>
                    <span className="text-[10px] font-mono text-rose-300 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                      ~21 kt
                    </span>
                  </div>

                  <div
                    onClick={() =>
                      onOpenLightbox({
                        url: nagasakiExplosionImg,
                        title: 'Nuvem Atômica de Nagasaki — Fat Man (9 de Agosto de 1945)',
                        caption: 'A coluna de fumaça e cogumelo atômico de 18 km de altura erguendo-se sobre o vale de Urakami após a detonação da bomba Fat Man lançada pelo B-29 Bockscar.',
                        details: 'A bomba empregou uma esfera de Plutônio-239 comprimida por lentes de explosivos convencionais de alta precisão (método de implosão simétrica).'
                      })
                    }
                    className="relative rounded-xl overflow-hidden aspect-4/3 bg-black border border-white/10 cursor-pointer group shadow"
                  >
                    <img
                      src={nagasakiExplosionImg}
                      alt="Nuvem atômica de Nagasaki"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                      <span className="text-[10px] text-white font-medium">Nuvem sobre Nagasaki (NARA)</span>
                    </div>
                    <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="text-xs text-neutral-300 space-y-1 leading-relaxed">
                    <p>
                      <strong>9 de agosto de 1945:</strong> Lançada pelo bombardeiro B-29 <em>Bockscar</em>. Bomba de implosão de <strong>Plutônio-239</strong>.
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      Detonada a 500m sobre o vale de Urakami. Deixou entre 40.000 e 80.000 vítimas fatais e selou a capitulação formal do Japão, encerrando a 2ª Guerra Mundial.
                    </p>
                  </div>
                </div>
              </div>

              {/* Memorials & Peace Legacy */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                    Memoriais Históricos de Paz
                  </span>
                  <p className="text-neutral-300 text-[11px]">
                    O Genbaku Dome em Hiroshima e a Estátua da Paz em Nagasaki permanecem como símbolos eternos da busca global pela não-proliferação e paz mundial.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() =>
                      onOpenLightbox({
                        url: hiroshimaDomeImg,
                        title: 'Cúpula da Bomba Atômica (Genbaku Dome) — Hiroshima',
                        caption: 'A estrutura preservada do Pavilhão de Promoção Industrial a 160m do hipocentro da explosão de 6 de agosto de 1945.',
                        details: 'Tombado como Patrimônio Mundial da UNESCO, o monumento serve como memorial perpétuo pela paz e pela eliminação definitiva das armas nucleares.'
                      })
                    }
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                    title="Ver Cúpula Genbaku"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() =>
                      onOpenLightbox({
                        url: nagasakiMemorialImg,
                        title: 'Estátua da Paz de Nagasaki — Parque da Paz',
                        caption: 'A emblemática escultura de Seibo Kitamura no hipocentro de Nagasaki.',
                        details: 'A mão direita aponta para o perigo das armas nucleares e a esquerda estende-se em sinal de paz eterna e esperança para as futuras gerações.'
                      })
                    }
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                    title="Ver Memorial de Nagasaki"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
