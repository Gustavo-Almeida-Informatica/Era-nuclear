import React, { useState } from 'react';
import { PageId, GlossaryTerm } from '../types';
import { glossaryTerms } from '../data/glossaryData';
import {
  BookOpen,
  Search,
  Tag,
  X,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface GlossaryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GlossaryPage: React.FC<GlossaryPageProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = [
    { id: 'todos', label: 'Todos os Termos' },
    { id: 'fundamentos', label: 'Física Fundamental' },
    { id: 'armamentos', label: 'Armas & Estratégia' },
    { id: 'energia', label: 'Combustível & Reatores' },
    { id: 'efeitos', label: 'Radiação & Clima' },
    { id: 'diplomacia', label: 'Tratados & Diplomacia' }
  ];

  const filteredTerms = glossaryTerms.filter((term) => {
    const matchesCategory = selectedCategory === 'todos' || term.category === selectedCategory;
    const matchesSearch =
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.extendedDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <BookOpen className="w-3.5 h-3.5 shrink-0" />
          <span>Dicionário Enciclopédico</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Glossário da Era Nuclear
        </h1>
        <p className="text-sm sm:text-base text-[#B7B7B7] leading-relaxed">
          Definições claras, concisas e cientificamente fundamentadas dos principais conceitos e vocábulos da física nuclear, engenharia de reatores, diplomacia e proteção radiológica.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-start sm:items-center">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#B7B7B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Pesquisar termo ou conceito..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] sm:min-h-0 pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#B7B7B7]/50 focus:outline-none focus:border-[#73CAE5] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-[#B7B7B7] hover:text-white cursor-pointer"
                aria-label="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#B7B7B7] font-mono self-start sm:self-auto">
            Termos listados: <strong>{filteredTerms.length}</strong> de {glossaryTerms.length}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`min-h-[38px] sm:min-h-0 px-3.5 py-2 sm:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-[#0D0D0D] font-bold shadow-md shadow-[#73CAE5]/20'
                  : 'bg-white/5 text-[#B7B7B7] hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTerms.length === 0 ? (
          <div className="col-span-full p-6 sm:p-8 text-center bg-[#111111] rounded-2xl border border-white/10 text-[#B7B7B7]">
            <p className="text-sm">Nenhum termo corresponde à sua pesquisa.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('todos');
              }}
              className="mt-3 min-h-[40px] sm:min-h-0 px-4 py-2 text-xs text-[#73CAE5] font-semibold hover:underline cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          filteredTerms.map((t) => (
            <div
              key={t.id}
              className="bg-[#111111] border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-[#73CAE5]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between group min-w-0 max-w-full"
            >
              <div className="space-y-3 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8F83FF] bg-[#8F83FF]/10 px-2 py-0.5 rounded border border-[#8F83FF]/20">
                    {t.categoryLabel}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors break-words">
                  {t.term}
                </h3>

                <p className="text-xs font-medium text-white/90 leading-relaxed">
                  {t.shortDefinition}
                </p>

                <p className="text-xs text-[#B7B7B7] leading-relaxed pt-1">
                  {t.extendedDefinition}
                </p>
              </div>

              {t.relatedTerms && t.relatedTerms.length > 0 && (
                <div className="pt-3 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[11px] min-w-0">
                  <span className="text-white/40">Conceitos relacionados:</span>
                  {t.relatedTerms.map((rt, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[#73CAE5] font-mono text-[10px] max-w-full break-words"
                    >
                      {rt}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
