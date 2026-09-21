import React from 'react';
import { PageId } from '../types';
import { ArrowUp, Atom, Shield, BookOpen, ExternalLink, Flame, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-12 text-[#B7B7B7] text-sm relative">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-[#73CAE5]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/5">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] flex items-center justify-center p-0.5">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[5px] flex items-center justify-center">
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#73CAE5] to-[#8F83FF] font-black text-xs">
                    EN
                  </span>
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-display">
                ERA NUCLEAR
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed max-w-md">
              Plataforma independente e aberta dedicada à divulgação científica, educação histórica e conscientização sobre a física nuclear, energia limpa, tratados internacionais e as lições da era atômica.
            </p>
            <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-[#B7B7B7]/80 space-y-1">
              <div className="flex items-center space-x-2 text-white font-medium">
                <Shield className="w-3.5 h-3.5 text-[#73CAE5]" />
                <span>Compromisso Ético e Científico</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Conteúdo exclusivamente didático e histórico. Não inclui esquemas de construção, dimensões ou instruções para fabricação de armas.
              </p>
            </div>
          </div>

          {/* Column 2: Educação & Ciência */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-display">
              Educação & Ciência
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('physics')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none"
                >
                  Física do Átomo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('fission-fusion')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none"
                >
                  Fissão × Fusão
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('energy')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none"
                >
                  Energia Nuclear Civil
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none"
                >
                  Imagens da Era Nuclear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('glossary')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none"
                >
                  Glossário Científico
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Aprofundamentos Especiais */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-display">
              Especiais Históricos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-rose-400 transition-colors focus:outline-none text-left flex items-center gap-1.5 font-medium text-rose-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                  <span>Mapa Nuclear & Simulador</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('operation-castle')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none text-left"
                >
                  Operação Castle (1954)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('tsar-bomba')}
                  className="hover:text-[#8F83FF] transition-colors focus:outline-none text-left"
                >
                  Tsar Bomba (50 Mt)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ivy-mike')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none text-left"
                >
                  Ivy Mike (10,4 Mt)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manhattan-project')}
                  className="hover:text-[#8F83FF] transition-colors focus:outline-none text-left"
                >
                  Projeto Manhattan (1942–1945)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ivy-king')}
                  className="hover:text-[#73CAE5] transition-colors focus:outline-none text-left"
                >
                  Ivy King (500 kt)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('b41')}
                  className="hover:text-[#8F83FF] transition-colors focus:outline-none text-left"
                >
                  Bomba B41 (25 Mt)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chernobyl')}
                  className="hover:text-rose-400 transition-colors focus:outline-none text-left"
                >
                  Chernobyl (1986)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Institucional & História */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-display">
              História & Plataforma
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  Cronologia (1896–Hoje)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('weapons')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  Armas & Tratados
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  Sobre o Projeto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('sources')}
                  className="hover:text-white transition-colors focus:outline-none"
                >
                  Fontes & Referências
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.iaea.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-[#73CAE5] hover:underline"
                >
                  <span>Portal Oficial AIEA</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B7B7B7]/60">
          <p>© {new Date().getFullYear()} ERA NUCLEAR. Plataforma aberta de divulgação científica e histórica.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#73CAE5]/50 hover:text-white transition-all text-xs focus:outline-none"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
