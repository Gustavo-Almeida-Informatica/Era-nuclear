import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, ChevronDown, Atom, Sparkles, BookOpen, ShieldAlert, Zap, Flame, Camera, Target } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDrawerSections, setOpenDrawerSections] = useState<{
    principais: boolean;
    monografias: boolean;
    recursos: boolean;
  }>({
    principais: true,
    monografias: true,
    recursos: true,
  });

  const toggleDrawerSection = (section: 'principais' | 'monografias' | 'recursos') => {
    setOpenDrawerSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Início', icon: <Sparkles className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'history', label: 'História', icon: <BookOpen className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'physics', label: 'Física Nuclear', icon: <Atom className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'weapons', label: 'Armas & Tratados', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
    { id: 'map', label: 'Mapa & Simulador', icon: <Target className="w-4 h-4 text-rose-400" /> },
    { id: 'energy', label: 'Energia Civil', icon: <Zap className="w-4 h-4 text-emerald-400" /> },
    { id: 'gallery', label: 'Galeria de Imagens', icon: <Camera className="w-4 h-4 text-[#73CAE5]" /> },
  ];

  const historicalCases: { id: PageId; label: string; sublabel: string; icon: React.ReactNode }[] = [
    { id: 'operation-castle', label: 'Operação Castle', sublabel: '1954 • Castle Bravo (15 Mt)', icon: <Zap className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'manhattan-project', label: 'Projeto Manhattan', sublabel: '1942–1945 • Trinity & Los Alamos', icon: <Atom className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'tsar-bomba', label: 'Tsar Bomba', sublabel: '1961 • 50 Megatons (RDS-220)', icon: <Flame className="w-4 h-4 text-rose-400" /> },
    { id: 'ivy-mike', label: 'Ivy Mike', sublabel: '1952 • 10,4 Mt (1ª Fusão)', icon: <Zap className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'ivy-king', label: 'Ivy King', sublabel: '1952 • Maior Pura Fissão (500 kt)', icon: <Flame className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'b41', label: 'Bomba B41 (SAC)', sublabel: '1960–1976 • 25 Megatons', icon: <ShieldAlert className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'chernobyl', label: 'Chernobyl', sublabel: '1986 • Acidente do Bloco 4', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
    { id: 'cases', label: 'Casos Históricos Marcantes', sublabel: 'Hiroshima, Fukushima, Goiânia...', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
  ];

  const scienceAndResources: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'fission-fusion', label: 'Fissão × Fusão Nuclear', icon: <Atom className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'impacts', label: 'Impactos no Planeta & Clima', icon: <ShieldAlert className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'glossary', label: 'Glossário Científico', icon: <BookOpen className="w-4 h-4 text-[#B7B7B7]" /> },
    { id: 'sources', label: 'Fontes & Arquivos Oficiais', icon: <BookOpen className="w-4 h-4 text-[#B7B7B7]" /> },
    { id: 'about', label: 'Sobre o Projeto Era Nuclear', icon: <Sparkles className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'contact', label: 'Fale Conosco', icon: <ShieldAlert className="w-4 h-4 text-[#B7B7B7]" /> },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#0D0D0D]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/60'
          : 'bg-[#0D0D0D]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 xl:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 xl:gap-3">
        {/* Zone 1: Brand Title & Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5] min-h-[44px] -ml-1 pl-1 shrink-0"
          aria-label="Era Nuclear - Página Inicial"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] flex items-center justify-center p-0.5 shadow-sm shadow-[#73CAE5]/20 group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-[#0D0D0D] rounded-[6px] flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] font-black text-xs sm:text-sm tracking-tighter">
                EN
              </span>
            </div>
          </div>
          <span className="text-base min-[360px]:text-lg sm:text-2xl xl:text-xl 2xl:text-2xl font-extrabold tracking-tight text-white font-display whitespace-nowrap">
            ERA NUCLEAR
          </span>
        </button>

        {/* Zone 2: Primary Nav Links (Desktop) */}
        <nav className="hidden xl:flex items-center space-x-0.5 2xl:space-x-1.5 min-w-0">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.id === 'map' && currentPage === 'nuclear-ranking');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-2 py-2 2xl:px-3 text-[12.5px] 2xl:text-sm font-medium transition-all rounded-md whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5] ${
                  isActive
                    ? 'text-[#73CAE5] bg-white/5 border border-[#73CAE5]/30 font-semibold'
                    : 'text-[#B7B7B7] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Special Historical Cases Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 250)}
              className={`px-2 py-2 2xl:px-3 text-[12.5px] 2xl:text-sm font-medium rounded-md flex items-center space-x-1 whitespace-nowrap transition-colors ${
                ['cases', 'operation-castle', 'tsar-bomba', 'ivy-mike', 'manhattan-project', 'ivy-king', 'b41', 'chernobyl', 'fission-fusion', 'impacts', 'glossary', 'sources', 'about', 'contact'].includes(currentPage)
                  ? 'text-[#8F83FF] bg-white/5 border border-[#8F83FF]/30'
                  : 'text-[#B7B7B7] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Especiais</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
                <div className="px-3.5 py-1 text-[10px] font-mono uppercase text-[#73CAE5] font-bold">
                  Casos & Detonações Especiais
                </div>
                {historicalCases.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center space-x-2.5 transition-colors ${
                      currentPage === item.id
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-[#B7B7B7] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <div className="truncate">
                      <span className="block">{item.label}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">{item.sublabel}</span>
                    </div>
                  </button>
                ))}
                
                <div className="px-3.5 pt-2 pb-1 text-[10px] font-mono uppercase text-[#8F83FF] font-bold border-t border-white/5 mt-1">
                  Recursos & Didática
                </div>
                {scienceAndResources.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full px-3.5 py-2 text-left text-xs flex items-center space-x-2.5 transition-colors ${
                      currentPage === item.id
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-[#B7B7B7] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Destaques Desktop & Touch Hamburger Toggle */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
          {/* Destaque Pair 1: Operação Castle & Projeto Manhattan */}
          <div className="hidden sm:flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('operation-castle')}
              className={`inline-flex items-center space-x-1.5 px-2 2xl:px-2.5 py-1 rounded-md text-[10.5px] 2xl:text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'operation-castle'
                  ? 'bg-[#73CAE5]/25 border border-[#73CAE5] text-white shadow-md shadow-[#73CAE5]/20'
                  : 'bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-white hover:border-[#73CAE5] hover:bg-[#73CAE5]/20'
              }`}
            >
              <Zap className="w-3 h-3 text-[#73CAE5] shrink-0" />
              <span>Operação Castle</span>
            </button>

            <button
              onClick={() => handleNavClick('manhattan-project')}
              className={`inline-flex items-center space-x-1.5 px-2 2xl:px-2.5 py-1 rounded-md text-[10.5px] 2xl:text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'manhattan-project'
                  ? 'bg-[#73CAE5]/25 border border-[#73CAE5] text-white shadow-md shadow-[#73CAE5]/20'
                  : 'bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-white hover:border-[#73CAE5] hover:bg-[#73CAE5]/20'
              }`}
            >
              <Atom className="w-3 h-3 text-[#73CAE5] shrink-0" />
              <span>Projeto Manhattan</span>
            </button>
          </div>

          {/* Destaque Pair 2: Tsar Bomba & Ivy Mike */}
          <div className="hidden sm:flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('tsar-bomba')}
              className={`inline-flex items-center space-x-1.5 px-2 2xl:px-2.5 py-1 rounded-md text-[10.5px] 2xl:text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'tsar-bomba'
                  ? 'bg-[#8F83FF]/30 border border-[#8F83FF] text-white shadow-md shadow-[#8F83FF]/25'
                  : 'bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-white hover:border-[#8F83FF] hover:bg-[#8F83FF]/20'
              }`}
            >
              <Flame className="w-3 h-3 text-[#8F83FF] shrink-0" />
              <span>Tsar Bomba (50 Mt)</span>
            </button>

            <button
              onClick={() => handleNavClick('ivy-mike')}
              className={`inline-flex items-center space-x-1.5 px-2 2xl:px-2.5 py-1 rounded-md text-[10.5px] 2xl:text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'ivy-mike'
                  ? 'bg-[#8F83FF]/30 border border-[#8F83FF] text-white shadow-md shadow-[#8F83FF]/25'
                  : 'bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-white hover:border-[#8F83FF] hover:bg-[#8F83FF]/20'
              }`}
            >
              <Zap className="w-3 h-3 text-[#8F83FF] shrink-0" />
              <span>Ivy Mike (10,4 Mt)</span>
            </button>
          </div>

          {/* Mobile/Tablet Menu Hamburger Button with 44px minimum touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5] shrink-0"
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-x-0 top-16 sm:top-20 bottom-0 h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-5rem)] bg-[#0D0D0D]/98 backdrop-blur-2xl border-t border-white/10 overflow-y-auto px-4 py-5 pb-24 space-y-5 animate-in slide-in-from-top-3 duration-200 z-50 overscroll-contain"
        >
          {/* Quick Shortcuts Banner */}
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 gap-2.5">
            <button
              onClick={() => handleNavClick('map')}
              className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all min-h-[52px] ${
                currentPage === 'map' || currentPage === 'nuclear-ranking'
                  ? 'bg-rose-500/20 border-rose-500 text-white font-bold'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <Target className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-bold leading-snug whitespace-normal break-words">Mapa Nuclear</span>
                <span className="text-[10px] text-rose-300 font-mono block leading-tight whitespace-normal break-words">Simulador 7 Zonas</span>
              </div>
            </button>

            <button
              onClick={() => handleNavClick('tsar-bomba')}
              className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all min-h-[52px] ${
                currentPage === 'tsar-bomba'
                  ? 'bg-[#8F83FF]/25 border-[#8F83FF] text-white font-bold'
                  : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
              }`}
            >
              <Flame className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <span className="block text-xs font-bold leading-snug whitespace-normal break-words">Tsar Bomba</span>
                <span className="text-[10px] text-purple-300 font-mono block leading-tight whitespace-normal break-words">50 Megatons</span>
              </div>
            </button>
          </div>

          {/* Section 1: Seções Principais */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleDrawerSection('principais')}
              aria-expanded={openDrawerSections.principais}
              className="w-full min-h-[44px] text-[11px] font-bold tracking-wider uppercase text-[#73CAE5] px-2 py-2 font-mono flex items-center justify-between border-b border-white/10 hover:text-white transition-colors"
            >
              <span>Seções Principais</span>
              <span className="flex items-center space-x-2 text-[10px] text-neutral-400 font-normal">
                <span>{navLinks.length} itens</span>
                <ChevronDown className={`w-4 h-4 text-[#73CAE5] transition-transform duration-200 ${openDrawerSections.principais ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDrawerSections.principais && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {navLinks.map((link) => {
                  const isActive = currentPage === link.id || (link.id === 'map' && currentPage === 'nuclear-ranking');
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full px-3.5 py-3 rounded-xl text-left text-sm font-semibold transition-all flex items-center justify-between gap-2 min-h-[48px] ${
                        isActive
                          ? 'bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/40 shadow-sm'
                          : 'bg-white/[0.02] border border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center space-x-3 min-w-0 flex-1">
                        <span className="shrink-0">{link.icon}</span>
                        <span className="whitespace-normal break-words leading-snug">{link.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/40 shrink-0">
                          Atual
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 2: Monografias e Detonações Históricas */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => toggleDrawerSection('monografias')}
              aria-expanded={openDrawerSections.monografias}
              className="w-full min-h-[44px] text-[11px] font-bold tracking-wider uppercase text-[#8F83FF] px-2 py-2 font-mono flex items-center justify-between border-b border-white/10 hover:text-white transition-colors"
            >
              <span>Grandes Monografias & Casos</span>
              <span className="flex items-center space-x-2 text-[10px] text-neutral-400 font-normal">
                <span>{historicalCases.length} itens</span>
                <ChevronDown className={`w-4 h-4 text-[#8F83FF] transition-transform duration-200 ${openDrawerSections.monografias ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDrawerSections.monografias && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {historicalCases.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full px-3.5 py-3 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 min-h-[52px] ${
                        isActive
                          ? 'bg-[#8F83FF]/20 text-white border border-[#8F83FF]/50 font-bold'
                          : 'bg-white/[0.02] border border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center space-x-3 min-w-0 flex-1">
                        <span className="shrink-0">{link.icon}</span>
                        <div className="min-w-0 flex-1">
                          <span className="block font-bold text-white whitespace-normal break-words leading-snug">{link.label}</span>
                          <span className="text-[10px] text-neutral-400 font-mono block whitespace-normal break-words leading-tight mt-0.5">{link.sublabel}</span>
                        </div>
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-[#8F83FF]/25 text-white border border-[#8F83FF]/50 shrink-0">
                          Atual
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Section 3: Recursos Científicos & Institucional */}
          <div className="space-y-2 pb-6">
            <button
              type="button"
              onClick={() => toggleDrawerSection('recursos')}
              aria-expanded={openDrawerSections.recursos}
              className="w-full min-h-[44px] text-[11px] font-bold tracking-wider uppercase text-neutral-300 px-2 py-2 font-mono flex items-center justify-between border-b border-white/10 hover:text-white transition-colors"
            >
              <span>Recursos Científicos & Didática</span>
              <span className="flex items-center space-x-2 text-[10px] text-neutral-400 font-normal">
                <span>{scienceAndResources.length} itens</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${openDrawerSections.recursos ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {openDrawerSections.recursos && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {scienceAndResources.map((link) => {
                  const isActive = currentPage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`w-full px-3.5 py-3 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 min-h-[48px] ${
                        isActive
                          ? 'bg-white/15 text-white border border-white/30 font-bold'
                          : 'bg-white/[0.02] border border-white/5 text-neutral-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center space-x-3 min-w-0 flex-1">
                        <span className="shrink-0">{link.icon}</span>
                        <span className="whitespace-normal break-words leading-snug">{link.label}</span>
                      </span>
                      {isActive && (
                        <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white/15 text-white border border-white/30 shrink-0">
                          Atual
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
