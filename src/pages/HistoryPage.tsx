import React, { useState } from 'react';
import { timelineEvents } from '../data/timelineData';
import { TimelineEvent, PageId } from '../types';
import {
  Clock,
  Search,
  Filter,
  Calendar,
  User,
  BookOpen,
  ArrowRight,
  X,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Maximize2,
  MapPin
} from 'lucide-react';

interface HistoryPageProps {
  onNavigate: (page: PageId) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const [selectedDecade, setSelectedDecade] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalEvent, setActiveModalEvent] = useState<TimelineEvent | null>(null);
  const [lightboxImg, setLightboxImg] = useState<{ url: string; title: string } | null>(null);

  const decades = [
    { id: 'todos', label: 'Todos os Períodos' },
    { id: '1890-1940', label: '1890–1940' },
    { id: '1940-1950', label: '1940–1950' },
    { id: '1950-1960', label: '1950–1960' },
    { id: '1960-1970', label: '1960–1970' },
    { id: '1970-1990', label: '1970–1990' },
    { id: '1990-2000', label: '1990–2000' },
    { id: '2000-atualidade', label: '2000–Atualidade' }
  ];

  const categories = [
    { id: 'todos', label: 'Todas as Categorias' },
    { id: 'ciencia', label: 'Ciência Fundamental' },
    { id: 'militar', label: 'Militar & Guerra Fria' },
    { id: 'energia', label: 'Energia Civil' },
    { id: 'acidente', label: 'Acidentes Históricos' },
    { id: 'tratado', label: 'Tratados Internacionais' }
  ];

  const filteredEvents = timelineEvents.filter((event) => {
    const matchesDecade = selectedDecade === 'todos' || event.decade === selectedDecade;
    const matchesCategory = selectedCategory === 'todos' || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.keyFigures && event.keyFigures.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesDecade && matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Page Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <Clock className="w-3.5 h-3.5" />
          <span>Cronologia Documental (1896 – Atualidade)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white font-display tracking-tight uppercase">
          A História da Era Nuclear
        </h1>
        <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#73CAE5] font-medium font-display">
          Acontecimentos, testes históricos, tratados e descobertas científicas em ordem cronológica estrita.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Navegue pela linha do tempo interativa no formato <strong>Data → Acontecimento → Imagem → Descrição → Importância Histórica → Fonte</strong>.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#B7B7B7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por ano, evento, cientista..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-white placeholder-[#B7B7B7]/50 focus:outline-none focus:border-[#73CAE5] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B7B7B7] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-[#B7B7B7] self-end sm:self-auto font-mono">
            Exibindo <strong className="text-white">{filteredEvents.length}</strong> de {timelineEvents.length} acontecimentos
          </div>
        </div>

        {/* DECADE FILTERS (Exact requested tabs) */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase font-bold text-[#73CAE5] tracking-wider block">
            Filtro Cronológico por Década:
          </span>
          <div className="flex flex-wrap gap-2">
            {decades.map((dec) => (
              <button
                key={dec.id}
                onClick={() => setSelectedDecade(dec.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border whitespace-nowrap ${
                  selectedDecade === dec.id
                    ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-black border-transparent shadow-md shadow-[#73CAE5]/20 font-bold'
                    : 'bg-white/5 text-[#B7B7B7] hover:bg-white/10 hover:text-white border-white/5'
                }`}
              >
                {dec.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="space-y-2 pt-2 border-t border-white/5">
          <span className="text-[11px] font-mono uppercase font-bold text-[#8F83FF] tracking-wider block">
            Filtro por Categoria Temática:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#8F83FF]/20 text-white border border-[#8F83FF]'
                    : 'bg-white/[0.03] text-[#B7B7B7] hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Timeline Spine & Events (Data -> Acontecimento -> Imagem -> Descrição -> Importância -> Fonte) */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center bg-[#111111] rounded-2xl border border-white/10 text-[#B7B7B7]">
            <p className="text-sm">Nenhum evento histórico encontrado para a combinação de filtros.</p>
            <button
              onClick={() => {
                setSelectedDecade('todos');
                setSelectedCategory('todos');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#73CAE5] font-semibold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        ) : (
          filteredEvents.map((evt, index) => {
            const isBlue = index % 2 === 0;
            return (
              <div key={evt.id} className="relative group">
                {/* Node point on timeline */}
                <div
                  className={`absolute -left-[31px] sm:-left-[47px] top-6 w-4 h-4 rounded-full border-2 transition-transform group-hover:scale-125 ${
                    isBlue
                      ? 'bg-[#0D0D0D] border-[#73CAE5] ring-4 ring-[#73CAE5]/20'
                      : 'bg-[#0D0D0D] border-[#8F83FF] ring-4 ring-[#8F83FF]/20'
                  }`}
                />

                {/* Event Card (Structured according to strict prompt specs) */}
                <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-white/20 transition-all duration-200 shadow-xl group-hover:shadow-2xl space-y-6">
                  {/* Row 1: DATA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                        {evt.year}
                      </span>
                      {evt.exactDate && (
                        <span className="text-xs text-[#73CAE5] font-mono bg-[#73CAE5]/10 px-3 py-1 rounded-full border border-[#73CAE5]/30">
                          {evt.exactDate}
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md border ${
                        evt.category === 'ciencia'
                          ? 'bg-[#73CAE5]/10 text-[#73CAE5] border-[#73CAE5]/30'
                          : evt.category === 'militar'
                          ? 'bg-[#8F83FF]/10 text-[#8F83FF] border-[#8F83FF]/30'
                          : evt.category === 'acidente'
                          ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          : evt.category === 'energia'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {evt.categoryLabel}
                    </span>
                  </div>

                  {/* Row 2: ACONTECIMENTO */}
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
                      {evt.title}
                    </h3>
                    {evt.location && (
                      <p className="text-xs text-[#8F83FF] flex items-center space-x-1.5 mt-1 font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{evt.location}</span>
                      </p>
                    )}
                  </div>

                  {/* Row 3: IMAGENS (se disponíveis) */}
                  {evt.imageUrl && evt.secondaryImageUrl ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                      {/* Imagem 1: Explosão Atômica */}
                      <div className="space-y-2">
                        <div
                          onClick={() => setLightboxImg({ url: evt.imageUrl!, title: `${evt.title} — Detonação Atômica` })}
                          className="relative rounded-xl overflow-hidden cursor-pointer group/img aspect-16/10 bg-black border border-white/5"
                        >
                          <img
                            src={evt.imageUrl}
                            alt={`${evt.title} - Detonação`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 border border-white/10 text-[10px] font-mono font-semibold text-[#73CAE5]">
                            Detonação / Nuvem de Cogumelo
                          </span>
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-white/90 leading-tight">
                          {evt.imageCaption || evt.title}
                        </p>
                        <p className="text-[10px] text-[#73CAE5]">Clique para ampliar em alta resolução.</p>
                      </div>

                      {/* Imagem 2: Memorial Histórico Preservado */}
                      <div className="space-y-2">
                        <div
                          onClick={() => setLightboxImg({ url: evt.secondaryImageUrl!, title: `${evt.title} — Memorial Preservado` })}
                          className="relative rounded-xl overflow-hidden cursor-pointer group/img aspect-16/10 bg-black border border-white/5"
                        >
                          <img
                            src={evt.secondaryImageUrl}
                            alt={`${evt.title} - Memorial`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors" />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/75 border border-white/10 text-[10px] font-mono font-semibold text-[#8F83FF]">
                            Memorial Histórico
                          </span>
                          <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-white/90 leading-tight">
                          {evt.secondaryImageCaption || 'Memorial Histórico'}
                        </p>
                        <p className="text-[10px] text-[#8F83FF]">Clique para ampliar em alta resolução.</p>
                      </div>
                    </div>
                  ) : evt.imageUrl ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-black/40 p-4 rounded-2xl border border-white/5">
                      <div
                        onClick={() => setLightboxImg({ url: evt.imageUrl!, title: evt.title })}
                        className="md:col-span-4 relative rounded-xl overflow-hidden cursor-pointer group/img aspect-16/10 bg-black"
                      >
                        <img
                          src={evt.imageUrl}
                          alt={evt.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover/img:bg-transparent transition-colors" />
                        <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="md:col-span-8 text-xs text-[#B7B7B7] space-y-1">
                        <p className="font-semibold text-white/90">{evt.imageCaption || evt.title}</p>
                        <p className="text-[11px] text-[#73CAE5]">Clique na imagem para ampliar no visualizador de alta resolução.</p>
                      </div>
                    </div>
                  ) : null}

                  {/* Row 4: DESCRIÇÃO */}
                  <div className="space-y-2 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                    <p>{evt.fullDescription || evt.summary}</p>
                  </div>

                  {/* Row 5: IMPORTÂNCIA HISTÓRICA */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Importância Histórica & Científica:</span>
                    </span>
                    <p className="text-white text-xs leading-relaxed">{evt.historicalImpact}</p>
                  </div>

                  {/* Row 6: FONTE & FIGURAS */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                    {evt.source && (
                      <div className="text-[11px] text-[#B7B7B7]/70">
                        <strong>Fonte Oficial:</strong> <span className="text-white/80">{evt.source}</span>
                      </div>
                    )}

                    {evt.keyFigures && (
                      <div className="flex items-center space-x-1.5 text-[#B7B7B7] text-[11px]">
                        <User className="w-3.5 h-3.5 text-[#8F83FF]" />
                        <span>Figuras: <strong className="text-white">{evt.keyFigures.join(', ')}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-150"
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
            <div className="p-4 text-xs font-bold text-white font-display">
              {lightboxImg.title} — Arquivo Histórico Oficial
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
