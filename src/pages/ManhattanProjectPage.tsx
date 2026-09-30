import React, { useState } from 'react';
import { PageId } from '../types';
import trinityImg from '../assets/images/trinity_test_blast_1787676677780.jpg';
import hiroshimaExplosionImg from '../assets/images/hiroshima_explosion.jpg';
import hiroshimaDomeImg from '../assets/images/genbaku_dome_real.jpg';
import nagasakiExplosionImg from '../assets/images/nagasaki_explosion.jpg';
import nagasakiMemorialImg from '../assets/images/nagasaki_peace_memorial_real.jpg';
import chicagoPile1Img from '../assets/images/chicago_pile_one_1787677642726.jpg';
import demonCoreImg from '../assets/images/demon-core.jpeg';
import {
  Atom,
  Users,
  Target,
  Maximize2,
  X,
  Calendar,
  MapPin,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  ShieldCheck,
  Zap,
  Flame,
  Info,
  AlertTriangle,
  Radio
} from 'lucide-react';

interface ManhattanProjectPageProps {
  onNavigate: (page: PageId) => void;
}

export const ManhattanProjectPage: React.FC<ManhattanProjectPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string; caption?: string; details?: string } | null>(null);

  const physicists = [
    {
      name: 'J. Robert Oppenheimer',
      role: 'Diretor Científico de Los Alamos (Projeto Y)',
      contribution: 'Coordenou o corpo científico em Los Alamos, estruturou os grupos teóricos e de implosão, e supervisionou a montagem do Teste Trinity, de Little Boy e de Fat Man.',
      tag: 'Diretor de Los Alamos'
    },
    {
      name: 'Enrico Fermi',
      role: 'Pioneiro da Reação em Cadeia • Prêmio Nobel',
      contribution: 'Construiu o histórico reator Chicago Pile-1 (1942), provando a reação em cadeia autosustentável. Calculou com precisão a energia de Trinity soltando pedaços de papel ao passar da onda de choque.',
      tag: 'Chicago Pile-1'
    },
    {
      name: 'Hans Bethe',
      role: 'Chefe da Divisão Teórica em Los Alamos',
      contribution: 'Explicou os processos de fusão no interior das estrelas e chefiou a matemática da propagação de choque, hidrodinâmica e rendimento das bombas de fissão.',
      tag: 'Divisão Teórica'
    },
    {
      name: 'Richard Feynman',
      role: 'Líder do Grupo de Computação Teórica',
      contribution: 'Desenvolveu a equação Bethe-Feynman para calcular o rendimento da reação explosiva de fissão e organizou sistemas de computação humana e com cartões perfurados pioneiros.',
      tag: 'Cálculos de Rendimento'
    },
    {
      name: 'Edward Teller',
      role: 'Pioneiro da Fusão Termonuclear',
      contribution: 'Trabalhou nos cálculos de implosão e defendeu desde 1942 a concepção de uma superbomba de fusão de hidrogênio, concebendo mais tarde com Ulam o teste Ivy Mike.',
      tag: 'Fusão Nuclear'
    },
    {
      name: 'Ernest Lawrence',
      role: 'Diretor do Laboratório de Radiação em Berkeley',
      contribution: 'Adaptou ciclotrons em calutrons na usina Y-12 de Oak Ridge para separar eletromagneticamente o isótopo físsil Urânio-235 do Urânio-238 natural.',
      tag: 'Enriquecimento de Urânio'
    },
    {
      name: 'John von Neumann',
      role: 'Consultor Matemático e Hidrodinâmico',
      contribution: 'Calculou a geometria das lentes explosivas de implosão capazes de transformar uma onda de choque esférica divergente em convergente para comprimir a esfera de plutônio.',
      tag: 'Lentes de Implosão'
    },
    {
      name: 'Leo Szilard & Albert Einstein',
      role: 'Originadores do Alerta Histórico (1939)',
      contribution: 'Szilard patenteou a reação em cadeia e redigiu com Einstein a carta enviada ao presidente Roosevelt em 1939, alertando que a Alemanha nazista poderia fabricar bombas atômicas.',
      tag: 'Carta a Roosevelt'
    }
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
      {/* Hero Header */}
      <div className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#8F83FF]/15 border border-[#8F83FF]/35 text-xs font-bold text-[#8F83FF] uppercase tracking-wider font-mono">
            <Atom className="w-3.5 h-3.5" />
            <span>O Maior Empreendimento Científico-Militar da História • 1942–1945</span>
          </div>
          <button
            onClick={() => onNavigate('ivy-mike')}
            className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#B7B7B7] hover:text-white hover:border-[#73CAE5]/40 transition-colors"
          >
            <Zap className="w-3 h-3 text-[#73CAE5]" />
            <span>Ver Evolução: Teste Ivy Mike (1952)</span>
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white font-display tracking-tight uppercase leading-none">
          Projeto Manhattan <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8F83FF] via-purple-300 to-rose-400 font-mono">(1942–1945)</span>
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#8F83FF] font-medium font-display">
          A mobilização de 130 mil pessoas e dos maiores físicos do planeta para desvendar o poder do núcleo atômico, culminando no Teste Trinity e no desfecho da Segunda Guerra Mundial.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Comandado administrativamente pelo <strong>General Leslie R. Groves</strong> e cientificamente por <strong>J. Robert Oppenheimer</strong>, o Projeto Manhattan operou em instalações ultra-secretas em Los Alamos (Novo México), Oak Ridge (Tennessee) e Hanford (Washington), desenvolvendo em menos de três anos tanto armas de Urânio-235 quanto de Plutônio-239.
        </p>
      </div>

      {/* Quick Numbers Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Período Operacional</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">1942 – 1946</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">1º Teste Atômico</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">Trinity • 21 kt</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Efetivo de Pessoas</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">~130.000</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Investimento (1945)</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">~US$ 2 Bilhões</p>
        </div>
      </div>

      {/* Primary Section: Trinity Test with Explosion Image */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[#8F83FF] uppercase tracking-wider bg-[#8F83FF]/10 px-3 py-1 rounded-full border border-[#8F83FF]/30">
              <Atom className="w-3.5 h-3.5" />
              <span>Marco Zero • 16 de Julho de 1945</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              O Teste Trinity: A Primeira Detonação Nuclear
            </h2>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              Às 05h29 da manhã no deserto de Jornada del Muerto (Campo de Testes de White Sands, Novo México), a humanidade entrou na Era Atômica com a detonação do dispositivo <strong>"The Gadget"</strong> — uma esfera de plutônio comprimida por 32 lentes de explosivos de implosão.
            </p>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              O rendimento verificado foi de aproximadamente <strong>21 quilotons de TNT</strong>. A bola de fogo ofuscante gerou temperaturas superiores a milhões de graus centígrados e derreteu os grãos de areia do deserto, formando uma crosta de mineral vítreo esverdeado que ficou conhecida mundialmente como <em>Trinitita</em>.
            </p>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs italic text-neutral-300">
              "Agora eu me tornei a Morte, o destruidor de mundos." — Citação do Bhagavad Gita lembrada por J. Robert Oppenheimer ao testemunhar a bola de fogo de Trinity.
            </div>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <div
              onClick={() =>
                setLightboxImg({
                  url: trinityImg,
                  title: 'Teste Trinity (16 de Julho de 1945) — A Primeira Detonação Nuclear',
                  caption: 'Fotografia ultrarrápida capturando a bola de fogo do teste Trinity aos 0,016 segundo após a detonação no deserto de White Sands (Novo México).',
                  details: 'Acervo oficial do Laboratório Nacional de Los Alamos / Departamento de Energia dos EUA (DOE). Domínio Público.'
                })
              }
              className="relative rounded-2xl overflow-hidden bg-black border border-[#8F83FF]/40 group cursor-pointer aspect-4/3 shadow-2xl"
            >
              <img
                src={trinityImg}
                alt="Bola de fogo do Teste Trinity"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <p className="font-semibold truncate">Bola de Fogo de Trinity aos 0,016s (~21 kt)</p>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[#8F83FF]" />
              </div>
            </div>
            <p className="text-[11px] text-[#B7B7B7] italic text-center">
              Clique para expandir a fotografia de Trinity em alta definição com contexto histórico.
            </p>
          </div>
        </div>
      </section>

      {/* Physicists Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            <Users className="w-4 h-4" />
            <span>Mentes Científicas Pioneiras</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Os Físicos & Teóricos Envolvidos no Projeto Manhattan
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl">
            Conheça os cientistas cujas formulações matemáticas, experimentos em laboratório e liderança tornaram possível a liberação controlada e explosiva da energia nuclear.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {physicists.map((p, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/50 transition-all space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-bold text-white text-sm">{p.name}</h4>
                  <span className="text-[9px] font-mono font-bold text-[#8F83FF] bg-[#8F83FF]/15 px-1.5 py-0.5 rounded shrink-0">
                    {p.tag}
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 block font-medium leading-tight">{p.role}</span>
                <p className="text-xs text-neutral-300 leading-relaxed pt-1">{p.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chicago Pile-1 Feature */}
      <section className="p-6 sm:p-8 rounded-3xl bg-[#111111] border border-white/10 flex flex-col md:flex-row items-center gap-6 shadow-xl">
        <div
          onClick={() =>
            setLightboxImg({
              url: chicagoPile1Img,
              title: 'Chicago Pile-1 (1942) — Primeira Reação em Cadeia Autosustentável',
              caption: 'O histórico reator Chicago Pile-1 construído sob a liderança de Enrico Fermi sob as arquibancadas de Stagg Field na Universidade de Chicago em 2 de dezembro de 1942.',
              details: 'Construído com blocos de grafite e esferas de urânio natural, atingiu a criticalidade nuclear pela primeira vez na história humana, provando experimentalmente que a energia do átomo podia ser libertada de forma controlada.'
            })
          }
          className="w-full md:w-64 h-40 rounded-2xl overflow-hidden bg-black border border-white/15 shrink-0 relative cursor-pointer group shadow"
        >
          <img
            src={chicagoPile1Img}
            alt="Reator Chicago Pile-1"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
            <Maximize2 className="w-5 h-5 text-white drop-shadow" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono font-bold text-[#73CAE5] uppercase tracking-wider bg-[#73CAE5]/10 px-2.5 py-0.5 rounded-full border border-[#73CAE5]/30">
            <span>2 de Dezembro de 1942 • Chicago Pile-1</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
            A Primeira Reação Nuclear em Cadeia Autosustentável
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Sob as arquibancadas do estádio Stagg Field na Universidade de Chicago, a equipe de <strong>Enrico Fermi</strong> montou uma pilha de 400 toneladas de grafite intercaladas com blocos de urânio natural. Ao removerem a barra de controle de cádmio, o reator entrou em regime crítico por 28 minutos, gerando apenas 0,5 watt de potência térmica — mas provando definitivamente a física das reações em cadeia.
          </p>
        </div>
      </section>

      {/* Atomic Bombings: Hiroshima & Nagasaki with Authentic Images */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-mono">
            <Target className="w-4 h-4" />
            <span>O Emprego Militar em Combate • Agosto de 1945</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Os Bombardeios Atômicos de Hiroshima e Nagasaki
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl">
            As duas primeiras e únicas detonações nucleares em combate na história que aceleraram o fim da Segunda Guerra Mundial e geraram as cinzas sobre as quais se ergueu a geopolítica moderna.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hiroshima */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-amber-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">6 de Agosto de 1945 • 08:15</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">Hiroshima — "Little Boy"</h3>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                ~15 quilotons
              </span>
            </div>

            <div
              onClick={() =>
                setLightboxImg({
                  url: hiroshimaExplosionImg,
                  title: 'Bombardeio de Hiroshima — Nuvem de Cogumelo da Little Boy',
                  caption: 'A histórica fotografia aérea registrando a ascensão da colossal nuvem de cogumelo atômico sobre Hiroshima imediatamente após a detonação da bomba Little Boy a 600 metros de altitude.',
                  details: 'Acervo oficial do National Archives and Records Administration (NARA 542192). Lançada pelo bombardeiro B-29 Enola Gay pilotado por Paul Tibbets.'
                })
              }
              className="relative rounded-2xl overflow-hidden aspect-16/10 bg-black border border-white/15 cursor-pointer group shadow"
            >
              <img
                src={hiroshimaExplosionImg}
                alt="Nuvem sobre Hiroshima"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs text-white font-medium">Nuvem atômica sobre Hiroshima (NARA)</span>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <p>
                <strong>Mecanismo Físico:</strong> Disparo tipo-canhão impulsionando um projétil oco de <strong>Urânio-235</strong> contra um alvo de urânio fixo para atingir a massa supercrítica. Detonada a 600m de altura sobre o Hospital Shima pelo bombardeiro B-29 <em>Enola Gay</em>.
              </p>
              <p>
                <strong>Efeitos Imediatos:</strong> A temperatura no hipocentro superou 4.000 °C, gerando tempestade de fogo e onda de choque que destruiu quase toda a área central da cidade, provocando entre 70.000 e 140.000 vítimas fatais até o final de 1945.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs">
              <span className="text-[#B7B7B7]">Monumento Memorial Genbaku Dome (Cúpula da Paz)</span>
              <button
                onClick={() =>
                  setLightboxImg({
                    url: hiroshimaDomeImg,
                    title: 'Memorial da Paz de Hiroshima — Cúpula da Bomba Atômica (Genbaku Dome)',
                    caption: 'A estrutura remanescente preservada do Pavilhão de Promoção Industrial a apenas 160 metros do hipocentro da explosão de 6 de agosto de 1945.',
                    details: 'Patrimônio Mundial da UNESCO preservado como lembrança perene contra o uso de armas atômicas.'
                  })
                }
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver Cúpula</span>
              </button>
            </div>
          </div>

          {/* Nagasaki */}
          <div className="p-6 rounded-3xl bg-[#111111] border border-rose-500/30 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">9 de Agosto de 1945 • 11:02</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-display">Nagasaki — "Fat Man"</h3>
              </div>
              <span className="text-xs font-mono font-bold text-rose-300 bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/30">
                ~21 quilotons
              </span>
            </div>

            <div
              onClick={() =>
                setLightboxImg({
                  url: nagasakiExplosionImg,
                  title: 'Bombardeio de Nagasaki — Nuvem Atômica da Fat Man',
                  caption: 'A colossal coluna de fumaça e cogumelo atômico de 18 km de altitude erguendo-se sobre o vale de Urakami após a detonação da bomba Fat Man lançada pelo B-29 Bockscar.',
                  details: 'Fotografada pelo Tenente Charles Levy da Força Aérea dos EUA (USAAF). Acervo do Arquivo Nacional dos EUA (NARA).'
                })
              }
              className="relative rounded-2xl overflow-hidden aspect-16/10 bg-black border border-white/15 cursor-pointer group shadow"
            >
              <img
                src={nagasakiExplosionImg}
                alt="Nuvem sobre Nagasaki"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs text-white font-medium">Nuvem atômica sobre Nagasaki (NARA)</span>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-rose-400" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#B7B7B7] leading-relaxed">
              <p>
                <strong>Mecanismo Físico:</strong> Implosão perfeitamente simétrica de alta precisão comprimindo uma esfera de 6,2 kg de <strong>Plutônio-239</strong>. Detonada a 500m de altura sobre o vale industrial de Urakami pelo bombardeiro B-29 <em>Bockscar</em>.
              </p>
              <p>
                <strong>Efeitos Imediatos:</strong> A geografia acidentada concentrou os efeitos no vale de Urakami, destruindo o complexo fabril da Mitsubishi e a Catedral de Urakami, resultando em cerca de 40.000 a 80.000 vítimas fatais.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-3 text-xs">
              <span className="text-[#B7B7B7]">Estátua da Paz e Parque do Hipocentro de Nagasaki</span>
              <button
                onClick={() =>
                  setLightboxImg({
                    url: nagasakiMemorialImg,
                    title: 'Parque da Paz de Nagasaki — Estátua da Paz',
                    caption: 'A emblemática escultura de Seibo Kitamura no hipocentro de Nagasaki, apontando para o céu em advertência e estendendo o braço em sinal de paz perpétua.',
                    details: 'Parque da Paz de Nagasaki, Urakami, Japão.'
                  })
                }
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors"
              >
                <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Ver Memorial</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO HISTÓRICA: O "DEMON CORE" (1945–1946) */}
      <section className="bg-[#111111] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Epílogo Trágico de Los Alamos • 1945–1946</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            O "Demon Core": Os Acidentes de Criticalidade em Los Alamos
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] max-w-3xl leading-relaxed">
            Após a rendição do Japão, o terceiro núcleo de plutônio de 6,2 kg produzido pelo Projeto Manhattan (destinado a um terceiro bombardeio atômico) permaneceu no laboratório para experimentos com refletores de nêutrons. Dois acidentes fatais com poucos meses de intervalo marcaram para sempre a física nuclear.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Imagem Documental do Experimento com Lightbox */}
          <div className="lg:col-span-5 space-y-2">
            <div
              onClick={() =>
                setLightboxImg({
                  url: demonCoreImg,
                  title: 'O "Demon Core" — Reconstituição do Experimento de Criticalidade',
                  caption: 'A esfera de 6,2 kg de plutônio revestida de níquel sendo testada com semiesferas refletoras de berílio e carbeto de tungstênio no Omega Site de Los Alamos.',
                  details: 'Laboratório Nacional de Los Alamos (LANL Archives / U.S. Department of Energy).'
                })
              }
              className="relative aspect-16/10 rounded-2xl overflow-hidden cursor-pointer group border border-white/10 bg-black shadow-xl"
            >
              <img
                src={demonCoreImg}
                alt="Demon Core Experiment"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                <span className="text-xs text-white font-medium">Experimento do Demon Core com berílio refletor</span>
              </div>
              <div className="absolute top-3 right-3 p-2 rounded-full bg-black/70 text-white opacity-90 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <p className="text-[11px] text-[#B7B7B7] italic text-center">
              Clique para ampliar a reconstituição documental do experimento de criticalidade.
            </p>
          </div>

          {/* Dados Técnicos e Físicos */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-amber-400 uppercase font-mono font-bold">Massa & Material</span>
                <p className="text-sm sm:text-base font-bold text-white font-mono">6,2 kg Plutônio (δ)</p>
                <span className="text-[10px] text-[#B7B7B7] block">Estabilizado com Gálio</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-[#73CAE5] uppercase font-mono font-bold">Geometria</span>
                <p className="text-sm sm:text-base font-bold text-white font-mono">8,9 cm diâmetro</p>
                <span className="text-[10px] text-[#B7B7B7] block">Esfera subcrítica nua</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-rose-400 uppercase font-mono font-bold">Destino Original</span>
                <p className="text-sm sm:text-base font-bold text-white font-mono">3ª Bomba Atômica</p>
                <span className="text-[10px] text-[#B7B7B7] block">Tóquio (cancelada)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <p>
                Uma esfera sólida de plutônio-239 à temperatura ambiente e sem refletores possui massa subcrítica (k &lt; 1). Contudo, quando cercada por materiais com alto poder de espalhamento de nêutrons — como <strong>berílio</strong> ou <strong>carbeto de tungstênio</strong> —, os nêutrons que escapariam da superfície são rebatidos de volta para o núcleo, elevando a densidade neutrônica até a <em>prompt-criticality</em>.
              </p>
            </div>
          </div>
        </div>

        {/* Os Dois Acidentes Lado a Lado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {/* Acidente 1: Harry Daghlian */}
          <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 space-y-4 hover:border-amber-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                1º Incidente • 21 de Agosto de 1945
              </span>
              <span className="text-xs text-[#B7B7B7] font-mono">Dose: ~510 rem (5,1 Sv)</span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Harry Daghlian e os Tijolos de Carbeto de Tungstênio
            </h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              Trabalhando tarde da noite no Omega Site, Daghlian empilhava tijolos de carbeto de tungstênio de 4,4 kg ao redor da esfera de plutônio para monitorar o incremento na contagem de nêutrons. Ao posicionar o bloco final, sua mão escorregou e o tijolo pesado caiu diretamente sobre o topo da esfera.
            </p>
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1 text-xs text-[#B7B7B7]">
              <strong className="text-white block">Clarão Azul e Síndrome de Radiação:</strong>
              O núcleo entrou instantaneamente em estado supercrítico com emissão de um brilho azulado de ionização do ar e radiação Cherenkov. Daghlian desmontou a pilha rapidamente, mas faleceu 25 dias depois aos 24 anos.
            </div>
          </div>

          {/* Acidente 2: Louis Slotin */}
          <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-white/10 space-y-4 hover:border-rose-500/40 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                2º Incidente • 21 de Maio de 1946
              </span>
              <span className="text-xs text-[#B7B7B7] font-mono">Dose: &gt;1.000 rem (10 Sv)</span>
            </div>
            <h3 className="text-lg font-bold text-white font-display">
              Louis Slotin: "Fazendo Cócegas na Cauda do Dragão"
            </h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              O físico canadense Louis Slotin realizava o experimento diante de outros sete cientistas, descendo uma cúpula semiesférica de berílio sobre o núcleo de plutônio. O protocolo exigia calços metálicos rígidos para evitar o fechamento total, mas Slotin usava a lâmina de uma <strong>chave de fenda comum</strong> para regular a abertura manualmente.
            </p>
            <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1 text-xs text-[#B7B7B7]">
              <strong className="text-white block">Ato Heroico e Morte:</strong>
              A ponta da chave escorregou e a cúpula de berílio caiu, fechando o refletor. Uma onda maciça de calor, nêutrons e radiação gama disparou; Slotin arrancou a cúpula com as mãos nuas e cobriu a esfera com o próprio corpo para proteger os colegas na sala. Faleceu 9 dias depois aos 35 anos.
            </div>
          </div>
        </div>

        {/* Lições e Legado */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-white/[0.02] to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2">
              <Radio className="w-4 h-4 text-amber-400" />
              <span>O Fim dos Testes Manuais e o Nascimento da Radioproteção Moderna</span>
            </h4>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              Após a morte de Slotin, o governo dos EUA baniu permanentemente qualquer teste manual de criticalidade ("hands-on"). Todos os experimentos com massas físseis passaram a ser operados obrigatoriamente por <strong>controle remoto motorizado</strong> e atrás de espessas paredes de concreto e chumbo a mais de 400 metros de distância (sistema <em>Topsy</em> e <em>Godiva</em>). A esfera foi posteriormente fundida e reutilizada na Operação Crossroads.
            </p>
          </div>
          <button
            onClick={() => onNavigate('cases')}
            className="shrink-0 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors flex items-center space-x-1.5"
          >
            <span>Ver em Casos Históricos</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#73CAE5]" />
          </button>
        </div>
      </section>

      {/* Cross Navigation Banner */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121212] via-[#161224] to-[#0D0D0D] border border-[#8F83FF]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-[#8F83FF] uppercase font-mono px-3 py-1 rounded-full bg-[#8F83FF]/15 border border-[#8F83FF]/30">
            <Zap className="w-3.5 h-3.5 text-[#73CAE5]" />
            <span>Passo Seguinte na História Nuclear</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Da Fissão à Fusão Termonuclear (Ivy Mike & Operação Castle)
          </h3>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            Sete anos após os bombardeios no Japão, a corrida armamentista contra a União Soviética levou os físicos do Projeto Manhattan a criarem o teste termonuclear Ivy Mike (10,4 Mt) e os testes da Operação Castle (15 Mt).
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('ivy-mike')}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#73CAE5] to-teal-500 text-black font-bold text-xs hover:shadow-lg hover:shadow-[#73CAE5]/20 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 text-black" />
            <span>Ver Teste Ivy Mike (10,4 Mt)</span>
            <ChevronRight className="w-4 h-4 text-black/80" />
          </button>
          <button
            onClick={() => onNavigate('operation-castle')}
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs transition-colors"
          >
            <Zap className="w-4 h-4 text-[#73CAE5]" />
            <span>Operação Castle (1954)</span>
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
