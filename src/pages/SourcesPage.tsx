import React from 'react';
import { PageId } from '../types';
import { sourceReferences } from '../data/sourcesData';
import {
  BookOpen,
  ExternalLink,
  ShieldCheck,
  Building,
  Award,
  FileCheck2
} from 'lucide-react';

interface SourcesPageProps {
  onNavigate: (page: PageId) => void;
}

export const SourcesPage: React.FC<SourcesPageProps> = ({ onNavigate }) => {
  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Rigor Científico & Fontes Primárias</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Fontes e Referências
        </h1>
        <p className="text-base text-[#B7B7B7] leading-relaxed">
          Todos os conteúdos, dados estatísticos, modelos teóricos e revisões históricas do <strong>ERA NUCLEAR</strong> baseiam-se exclusivamente em organizações científicas multilaterais, agências reguladoras internacionais, periódicos revisados por pares e memoriais históricos credenciados.
        </p>
      </div>

      {/* Grid of Institutional Sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sourceReferences.map((src) => (
          <div
            key={src.acronym}
            className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#73CAE5]/40 transition-all shadow-xl space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-2.5 py-0.5 rounded-full border border-[#73CAE5]/30">
                  {src.acronym}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#8F83FF] font-semibold">
                  {src.category === 'internacional' ? 'Órgão Internacional' : 'Instituição Acadêmica'}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                {src.organization}
              </h3>

              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                {src.description}
              </p>

              {/* Key publications */}
              <div className="pt-3 border-t border-white/5 space-y-1.5">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#73CAE5]" />
                  <span>Publicações e Relatórios Relevantes:</span>
                </span>
                <ul className="space-y-1 text-xs text-[#B7B7B7]">
                  {src.keyPublications.map((pub, i) => (
                    <li key={i} className="flex items-start space-x-2 text-[11px]">
                      <span className="text-[#8F83FF]">•</span>
                      <span className="italic">{pub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5">
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-xs font-bold text-[#73CAE5] hover:text-white transition-colors"
              >
                <span>Acessar portal oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
