import React, { useEffect, useRef } from 'react';
import { PageId } from '../types';
import { AtomSimulator } from '../components/AtomSimulator';
import { FissionFusionSimulator } from '../components/FissionFusionSimulator';
import { FissionFusionAtomsComparison } from '../components/FissionFusionAtomsComparison';
import { QuizModule } from '../components/QuizModule';
import {
  Atom,
  Clock,
  Zap,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Globe2,
  BookOpen,
  Award,
  ChevronRight,
  Flame
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background subtle canvas for Hero
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for abstract nuclear lattice / orbital field
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#73CAE5' : '#8F83FF'
    }));

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(115, 202, 229, ${0.12 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const pillars = [
    {
      icon: <Atom className="w-6 h-6 text-[#73CAE5]" />,
      title: 'Física Atômica Fundamental',
      description: 'Compreenda a estrutura nuclear, isótopos, forças fundamentais e as leis da radioatividade de Becquerel aos dias atuais.',
      page: 'physics' as PageId
    },
    {
      icon: <Clock className="w-6 h-6 text-[#8F83FF]" />,
      title: 'História & Geopolítica',
      description: 'Explore a cronologia detalhada desde o Projeto Manhattan e a Guerra Fria até os tratados modernos de não proliferação.',
      page: 'history' as PageId
    },
    {
      icon: <Zap className="w-6 h-6 text-[#73CAE5]" />,
      title: 'Energia & Usos Civis',
      description: 'Descubra o papel da tecnologia nuclear na geração elétrica descarbonizada, medicina diagnóstica e exploração espacial.',
      page: 'energy' as PageId
    },
    {
      icon: <Globe2 className="w-6 h-6 text-[#8F83FF]" />,
      title: 'Impactos & Sustentabilidade',
      description: 'Analise de forma científica os efeitos biológicos da radiação, lições de acidentes e modelos de preservação climática.',
      page: 'impacts' as PageId
    }
  ];

  const whatIsNuclearEra = [
    {
      badge: '1896 – 1938',
      title: 'Descoberta da Radioatividade e do Núcleo',
      desc: 'Becquerel, Marie Curie e Rutherford desvendam que a matéria concentra energias imensas em núcleos atômicos infinitesimais.'
    },
    {
      badge: '1938 – 1945',
      title: 'A Fissão Nuclear e o Projeto Manhattan',
      desc: 'Hahn, Meitner e Fermi demonstram a fissão do urânio e a reação em cadeia, levando aos primeiros reatores e dispositivos atômicos.'
    },
    {
      badge: '1947 – 1991',
      title: 'A Guerra Fria e a Corrida Armamentista',
      desc: 'O surgimento das armas termonucleares (Bomba H), mísseis balísticos e a doutrina da Destruição Mútua Assegurada (MAD).'
    },
    {
      badge: '1954 – Atual',
      title: 'O Átomo Pacífico e a Transição Energética',
      desc: 'Desenvolvimento de reatores nucleares civis para eletricidade de baixo carbono, medicina nuclear e pesquisas com fusão (ITER).'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* HERO SECTION - Inspired by modern editorial design */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Canvas Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />

        {/* Ambient Radial Gradient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#73CAE5]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#8F83FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Subtle Pill Tag */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-[#73CAE5]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plataforma de Divulgação Científica e Histórica</span>
          </div>

          {/* Massive Display Title */}
          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white font-display uppercase">
              ERA NUCLEAR
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] via-[#B7B7B7] to-[#73CAE5] max-w-3xl mx-auto font-display">
              A história, a ciência e as consequências da era que mudou o mundo.
            </p>
          </div>

          {/* Editorial Paragraph */}
          <p className="text-base sm:text-lg text-[#B7B7B7] max-w-2xl mx-auto leading-relaxed">
            Explore a física por trás do átomo, descubra como a energia nuclear transformou a sociedade e conheça a história das armas nucleares e seus impactos no planeta.
          </p>

          {/* Dual Action CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('history')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#0D0D0D] font-extrabold text-sm tracking-wide uppercase shadow-2xl hover:bg-[#73CAE5] transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>EXPLORAR A HISTÓRIA</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('physics')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border-2 border-white/20 text-white font-extrabold text-sm tracking-wide uppercase hover:border-[#8F83FF] hover:text-[#8F83FF] hover:bg-white/5 transition-all duration-200 active:scale-95 flex items-center justify-center space-x-2"
            >
              <span>ENTENDER A FÍSICA</span>
              <Atom className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Strip */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">1896</span>
              <p className="text-xs text-[#B7B7B7] mt-0.5">Descoberta da radioatividade natural</p>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#73CAE5] font-mono">~200 MeV</span>
              <p className="text-xs text-[#B7B7B7] mt-0.5">Energia por fissão de Urânio-235</p>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#8F83FF] font-mono">191</span>
              <p className="text-xs text-[#B7B7B7] mt-0.5">Países signatários do Tratado TNP</p>
            </div>
            <div className="p-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">~10%</span>
              <p className="text-xs text-[#B7B7B7] mt-0.5">Da eletricidade global gerada sem CO₂</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: O QUE É A ERA NUCLEAR? */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111] border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle decorative line */}
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#73CAE5] to-[#8F83FF]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
                Contexto Histórico & Científico
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight leading-tight">
                O que é a Era Nuclear?
              </h2>
              <p className="text-sm sm:text-base text-[#B7B7B7] leading-relaxed">
                A <strong>Era Nuclear</strong> é o período histórico e científico inaugurado com a compreensão do núcleo atômico e o domínio da liberação em massa de energia nuclear. Ela redefiniu as fronteiras da física quântica, transformou a geopolítica global com a corrida armamentista e deu origem a fontes de eletricidade civil e tratamentos médicos essenciais.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('history')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center space-x-2 shadow-lg shadow-[#73CAE5]/20"
                >
                  <span>VER LINHA DO TEMPO COMPLETA</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {whatIsNuclearEra.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group"
                >
                  <span className="inline-block px-2.5 py-1 rounded-md bg-[#73CAE5]/10 text-[#73CAE5] text-[11px] font-mono font-bold mb-3">
                    {item.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#73CAE5] transition-colors font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#B7B7B7] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: GRANDES MARCOS EM DESTAQUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
              Páginas Históricas em Destaque
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Grandes Marcos da Era Atômica
            </h2>
            <p className="text-sm text-[#B7B7B7] max-w-2xl leading-relaxed">
              Explore os quatro capítulos mais decisivos do poder nuclear — com dados técnicos originais, físicos pioneiros, explosões documentadas e impacto geopolítico.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna 1: Operação Castle (topo) & Projeto Manhattan (em baixo) */}
          <div className="flex flex-col gap-6">
            {/* 1. Operação Castle */}
            <div
              onClick={() => onNavigate('operation-castle')}
              className="p-6 sm:p-7 rounded-3xl bg-[#111111] border border-[#73CAE5]/30 hover:border-[#73CAE5] transition-all cursor-pointer group shadow-xl hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/15 text-xs font-bold text-[#73CAE5] font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>1954 • 6 TESTES TERMONUCLEARES</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#73CAE5] group-hover:translate-x-1 transition-transform" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display group-hover:text-[#73CAE5] transition-colors">
                  Operação Castle
                </h3>
                <p className="text-xs text-[#73CAE5] font-mono font-semibold mt-0.5">
                  Atol de Bikini • Castle Bravo (15 Mt) • Deutereto de Lítio
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                A revolucionária série de testes de combustível sólido que gerou a maior explosão nuclear dos Estados Unidos, o trágico fallout sobre o barco <em>Lucky Dragon</em> e o despertar do movimento pacifista global.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#73CAE5]">
                <span>Acessar monografia de Castle</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Projeto Manhattan (em baixo da Operação Castle) */}
            <div
              onClick={() => onNavigate('manhattan-project')}
              className="p-6 sm:p-7 rounded-3xl bg-[#111111] border border-[#73CAE5]/30 hover:border-[#73CAE5] transition-all cursor-pointer group shadow-xl hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/15 text-xs font-bold text-[#73CAE5] font-mono">
                  <Atom className="w-3.5 h-3.5" />
                  <span>1942–1945 • O BERÇO DO ÁTOMO</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#73CAE5] group-hover:translate-x-1 transition-transform" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display group-hover:text-[#73CAE5] transition-colors">
                  Projeto Manhattan
                </h3>
                <p className="text-xs text-[#73CAE5] font-mono font-semibold mt-0.5">
                  Los Alamos • Oppenheimer & Físicos • Trinity • Hiroshima & Nagasaki
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                A histórica mobilização científica e militar de 130 mil pessoas liderada por J. Robert Oppenheimer e Leslie Groves, a primeira reação em cadeia de Fermi (Chicago Pile-1), o Teste Trinity e os bombardeios no Japão.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#73CAE5]">
                <span>Acessar monografia do Manhattan</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Coluna 2: Tsar Bomba (topo) & Ivy Mike (em baixo) */}
          <div className="flex flex-col gap-6">
            {/* 1. Tsar Bomba */}
            <div
              onClick={() => onNavigate('tsar-bomba')}
              className="p-6 sm:p-7 rounded-3xl bg-[#111111] border border-[#8F83FF]/30 hover:border-[#8F83FF] transition-all cursor-pointer group shadow-xl hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/15 text-xs font-bold text-[#8F83FF] font-mono">
                  <Flame className="w-3.5 h-3.5" />
                  <span>1961 • 50 MEGATONS</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8F83FF] group-hover:translate-x-1 transition-transform" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display group-hover:text-[#8F83FF] transition-colors">
                  Tsar Bomba
                </h3>
                <p className="text-xs text-[#8F83FF] font-mono font-semibold mt-0.5">
                  Novaya Zemlya • RDS-220 • A Maior Explosão da História
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                A detonação soviética mais destrutiva já realizada: bola de fogo de 8 km de largura, cogumelo de 67 km de altura penetrando a mesosfera e choque térmico que circundou o planeta três vezes.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#8F83FF]">
                <span>Acessar monografia da Tsar Bomba</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Ivy Mike (em baixo da Tsar Bomba) */}
            <div
              onClick={() => onNavigate('ivy-mike')}
              className="p-6 sm:p-7 rounded-3xl bg-[#111111] border border-[#8F83FF]/30 hover:border-[#8F83FF] transition-all cursor-pointer group shadow-xl hover:-translate-y-1 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/15 text-xs font-bold text-[#8F83FF] font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>1952 • 10,4 MEGATONS</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#8F83FF] group-hover:translate-x-1 transition-transform" />
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-white font-display group-hover:text-[#8F83FF] transition-colors">
                  Ivy Mike
                </h3>
                <p className="text-xs text-[#8F83FF] font-mono font-semibold mt-0.5">
                  Atol de Enewetak • "The Sausage" • 1ª Detonação Termonuclear
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                A primeira bomba termonuclear de hidrogênio detonada pela humanidade, comprovando o design Teller-Ulam com deutério líquido criogênico, evaporando a ilha de Elugelab e sintetizando o Einstênio e o Férmio.
              </p>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#8F83FF]">
                <span>Acessar monografia de Ivy Mike</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: 4 PILARES DO CONHECIMENTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Pilares Educativos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Aprenda a Ciência sem Mistérios
          </h2>
          <p className="text-sm text-[#B7B7B7]">
            Uma abordagem didática e imparcial para explorar os fundamentos, aplicações e impactos da tecnologia nuclear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              onClick={() => onNavigate(pillar.page)}
              className="p-6 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1 shadow-lg"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#73CAE5]/50 group-hover:scale-110 transition-all">
                  {pillar.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#73CAE5] transition-colors font-display">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#B7B7B7] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#73CAE5]">
                <span>Explorar módulo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: INTERACTIVE ATOM SIMULATOR EMBED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
              Interatividade
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Laboratório Virtual do Átomo
            </h2>
            <p className="text-sm text-[#B7B7B7] max-w-xl">
              Interaja com o modelo atômico e veja como prótons, nêutrons e elétrons formam isótopos estáveis e instáveis.
            </p>
          </div>
          <button
            onClick={() => onNavigate('physics')}
            className="self-start md:self-auto px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#73CAE5] text-xs font-bold text-white transition-all flex items-center space-x-1.5"
          >
            <span>Ver Seção de Física Completa</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#73CAE5]" />
          </button>
        </div>

        <AtomSimulator />
      </section>

      {/* SECTION: FISSION VS FUSION TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
              Comparativo Teórico
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Fissão × Fusão Nuclear
            </h2>
            <p className="text-sm text-[#B7B7B7] max-w-xl">
              Entenda o mecanismo que alimenta os reatores atômicos atuais e a promessa da fusão como energia das estrelas.
            </p>
          </div>
          <button
            onClick={() => onNavigate('fission-fusion')}
            className="self-start md:self-auto px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-[#8F83FF] text-xs font-bold text-white transition-all flex items-center space-x-1.5"
          >
            <span>Comparador Detalhado</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8F83FF]" />
          </button>
        </div>

        {/* Modelos Atômicos Dinâmicos: U-235, Pu-239, Deutério e Trítio */}
        <FissionFusionAtomsComparison />

        <FissionFusionSimulator />
      </section>

      {/* SECTION: INTERACTIVE QUIZ CHALLENGE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Autoavaliação
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Teste seu Conhecimento
          </h2>
          <p className="text-sm text-[#B7B7B7]">
            Responda às questões e descubra o quão familiarizado você está com a física e história nuclear.
          </p>
        </div>

        <QuizModule />
      </section>
    </div>
  );
};
