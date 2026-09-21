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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'history', label: 'História' },
    { id: 'physics', label: 'Física Nuclear' },
    { id: 'weapons', label: 'Armas' },
    { id: 'map', label: 'Mapa' },
    { id: 'energy', label: 'Energia' },
    { id: 'gallery', label: 'Imagens' },
  ];

  const specialCaseLinks: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'operation-castle', label: 'Operação Castle (1954)', icon: <Zap className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'tsar-bomba', label: 'Tsar Bomba (1961)', icon: <Flame className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'ivy-mike', label: 'Ivy Mike (1952)', icon: <Zap className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'manhattan-project', label: 'Projeto Manhattan (1942–1945)', icon: <Atom className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'ivy-king', label: 'Ivy King (1952)', icon: <Flame className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'b41', label: 'Bomba B41 (SAC)', icon: <ShieldAlert className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'map', label: 'Simulador & Ranking (Mapa)', icon: <Target className="w-4 h-4 text-rose-400" /> },
    { id: 'chernobyl', label: 'Chernobyl (1986)', icon: <ShieldAlert className="w-4 h-4 text-rose-400" /> },
    { id: 'fission-fusion', label: 'Fissão × Fusão', icon: <Atom className="w-4 h-4 text-[#73CAE5]" /> },
    { id: 'impacts', label: 'Impactos & Clima', icon: <ShieldAlert className="w-4 h-4 text-[#8F83FF]" /> },
    { id: 'glossary', label: 'Glossário Científico', icon: <BookOpen className="w-4 h-4 text-[#B7B7B7]" /> },
    { id: 'sources', label: 'Fontes & Arquivos', icon: <BookOpen className="w-4 h-4 text-[#B7B7B7]" /> },
    { id: 'about', label: 'Sobre o Projeto', icon: <Atom className="w-4 h-4 text-[#B7B7B7]" /> },
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
        scrolled
          ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50'
          : 'bg-[#0D0D0D]/70 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Title */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center space-x-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5]"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] flex items-center justify-center p-0.5 shadow-sm shadow-[#73CAE5]/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0D0D0D] rounded-[6px] flex items-center justify-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] font-black text-sm tracking-tighter">
                EN
              </span>
            </div>
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
            ERA NUCLEAR
          </span>
        </button>

        {/* Zone 2: Primary Nav Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id || (link.id === 'map' && currentPage === 'nuclear-ranking');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-2 text-sm font-medium transition-all rounded-md whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5] ${
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
              className={`px-3 py-2 text-sm font-medium rounded-md flex items-center space-x-1 whitespace-nowrap transition-colors ${
                ['operation-castle', 'tsar-bomba', 'ivy-mike', 'manhattan-project', 'ivy-king', 'b41', 'chernobyl', 'fission-fusion', 'impacts', 'glossary', 'sources', 'about'].includes(currentPage)
                  ? 'text-[#8F83FF] bg-white/5 border border-[#8F83FF]/30'
                  : 'text-[#B7B7B7] hover:text-white hover:bg-white/5'
              }`}
            >
              <span>Especiais</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150 max-h-[75vh] overflow-y-auto">
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#73CAE5] font-bold">
                  Casos & Detonações Especiais
                </div>
                {specialCaseLinks.slice(0, 6).map((item) => (
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
                
                <div className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase text-[#8F83FF] font-bold border-t border-white/5 mt-1">
                  Recursos & Didática
                </div>
                {specialCaseLinks.slice(6).map((item) => (
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

        {/* Zone 3: Primary Action Destaque CTAs & Mobile Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Destaque Pair 1: Operação Castle (top) & Projeto Manhattan (em baixo) */}
          <div className="hidden sm:flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('operation-castle')}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'operation-castle'
                  ? 'bg-[#73CAE5]/25 border border-[#73CAE5] text-white shadow-md shadow-[#73CAE5]/20'
                  : 'bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-white hover:border-[#73CAE5] hover:bg-[#73CAE5]/20'
              }`}
            >
              <Zap className="w-3 h-3 text-[#73CAE5]" />
              <span>Operação Castle</span>
            </button>

            <button
              onClick={() => handleNavClick('manhattan-project')}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'manhattan-project'
                  ? 'bg-[#73CAE5]/25 border border-[#73CAE5] text-white shadow-md shadow-[#73CAE5]/20'
                  : 'bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-white hover:border-[#73CAE5] hover:bg-[#73CAE5]/20'
              }`}
            >
              <Atom className="w-3 h-3 text-[#73CAE5]" />
              <span>Projeto Manhattan</span>
            </button>
          </div>

          {/* Destaque Pair 2: Tsar Bomba (top) & Ivy Mike (em baixo) */}
          <div className="hidden sm:flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('tsar-bomba')}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'tsar-bomba'
                  ? 'bg-[#8F83FF]/30 border border-[#8F83FF] text-white shadow-md shadow-[#8F83FF]/25'
                  : 'bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-white hover:border-[#8F83FF] hover:bg-[#8F83FF]/20'
              }`}
            >
              <Flame className="w-3 h-3 text-[#8F83FF]" />
              <span>Tsar Bomba (50 Mt)</span>
            </button>

            <button
              onClick={() => handleNavClick('ivy-mike')}
              className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all active:scale-95 whitespace-nowrap ${
                currentPage === 'ivy-mike'
                  ? 'bg-[#8F83FF]/30 border border-[#8F83FF] text-white shadow-md shadow-[#8F83FF]/25'
                  : 'bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-white hover:border-[#8F83FF] hover:bg-[#8F83FF]/20'
              }`}
            >
              <Zap className="w-3 h-3 text-[#8F83FF]" />
              <span>Ivy Mike (10,4 Mt)</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-[#B7B7B7] hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#73CAE5]"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D0D]/95 border-b border-white/10 backdrop-blur-2xl px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top duration-200 space-y-4">
          {/* Featured Highlighted Cases: 2 Columns */}
          <div className="space-y-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
            <div className="text-[10px] font-bold tracking-wider uppercase text-white font-mono flex items-center justify-between">
              <span>Grandes Marcos em Destaque</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Column 1: Castle & Manhattan */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('operation-castle')}
                  className={`p-2 rounded-xl text-left text-xs flex items-center space-x-2 border transition-all ${
                    currentPage === 'operation-castle'
                      ? 'bg-[#73CAE5]/20 border-[#73CAE5] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-200 hover:border-[#73CAE5]/50'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#73CAE5] shrink-0" />
                  <div className="truncate">
                    <span className="block font-bold">Op. Castle</span>
                    <span className="text-[10px] text-neutral-400">1954 • 15 Mt</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('manhattan-project')}
                  className={`p-2 rounded-xl text-left text-xs flex items-center space-x-2 border transition-all ${
                    currentPage === 'manhattan-project'
                      ? 'bg-[#73CAE5]/20 border-[#73CAE5] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-200 hover:border-[#73CAE5]/50'
                  }`}
                >
                  <Atom className="w-3.5 h-3.5 text-[#73CAE5] shrink-0" />
                  <div className="truncate">
                    <span className="block font-bold">Proj. Manhattan</span>
                    <span className="text-[10px] text-neutral-400">1942–1945</span>
                  </div>
                </button>
              </div>

              {/* Column 2: Tsar Bomba & Ivy Mike */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('tsar-bomba')}
                  className={`p-2 rounded-xl text-left text-xs flex items-center space-x-2 border transition-all ${
                    currentPage === 'tsar-bomba'
                      ? 'bg-[#8F83FF]/25 border-[#8F83FF] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-200 hover:border-[#8F83FF]/50'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#8F83FF] shrink-0" />
                  <div className="truncate">
                    <span className="block font-bold">Tsar Bomba</span>
                    <span className="text-[10px] text-neutral-400">1961 • 50 Mt</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('ivy-mike')}
                  className={`p-2 rounded-xl text-left text-xs flex items-center space-x-2 border transition-all ${
                    currentPage === 'ivy-mike'
                      ? 'bg-[#8F83FF]/25 border-[#8F83FF] text-white font-bold'
                      : 'bg-white/5 border-white/10 text-neutral-200 hover:border-[#8F83FF]/50'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-[#8F83FF] shrink-0" />
                  <div className="truncate">
                    <span className="block font-bold">Ivy Mike</span>
                    <span className="text-[10px] text-neutral-400">1952 • 10,4 Mt</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#73CAE5] px-3 py-1 font-mono">
              Seções Principais
            </div>
            {navLinks.map((link) => {
              const isActive = currentPage === link.id || (link.id === 'map' && currentPage === 'nuclear-ranking');
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#73CAE5]/15 text-[#73CAE5] border border-[#73CAE5]/30 font-semibold'
                      : 'text-[#B7B7B7] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#8F83FF] px-3 pt-2 pb-1 font-mono">
              Páginas Históricas Especiais
            </div>
            {specialCaseLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full px-4 py-2 rounded-lg text-left text-xs flex items-center space-x-2.5 transition-colors ${
                  currentPage === link.id
                    ? 'bg-[#8F83FF]/15 text-[#8F83FF] border border-[#8F83FF]/30'
                    : 'text-[#B7B7B7] hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
