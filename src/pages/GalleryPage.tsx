import React, { useState } from 'react';
import { PageId, GalleryItem } from '../types';
import { galleryItems } from '../data/galleryData';
import {
  Sparkles,
  Search,
  Filter,
  Maximize2,
  X,
  ExternalLink,
  Tag,
  Camera,
  Calendar,
  MapPin,
  ShieldCheck,
  Info
} from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todo o Acervo' },
    { id: 'testes', label: 'Testes Históricos' },
    { id: 'acontecimentos', label: 'Acontecimentos & Memória' },
    { id: 'cientistas', label: 'Cientistas Pioneiros' },
    { id: 'laboratorios', label: 'Instalações & Laboratórios' },
    { id: 'documentos', label: 'Acervo Museológico' }
  ];

  const filteredItems = galleryItems.filter(
    (item) => selectedCategory === 'todos' || item.category === selectedCategory
  );

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
          <Camera className="w-3.5 h-3.5" />
          <span>Acervo Fotográfico e Documental Oficial</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Imagens da Era Nuclear
        </h1>
        <p className="text-base sm:text-lg text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#73CAE5] font-medium font-display">
          Fotografias históricas reais de domínio público e arquivos governamentais, museus e instituições científicas internacionais.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Cada registro fotográfico possui procedência histórica verificada, datação, coordenadas geográficas, contexto geopolítico, fonte primária e termo de licença correspondente.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
              selectedCategory === cat.id
                ? 'bg-gradient-to-r from-[#73CAE5] to-[#8F83FF] text-black font-bold border-transparent shadow-md shadow-[#73CAE5]/20'
                : 'bg-[#111111] text-[#B7B7B7] hover:bg-white/10 hover:text-white border-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxItem(item)}
            className="bg-[#111111] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:border-[#73CAE5]/50 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative aspect-4/3 overflow-hidden bg-black">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-80" />

              {/* Tag pill */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-[#73CAE5]">
                  {item.tag}
                </span>
              </div>

              {/* Hover icon */}
              <div className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#B7B7B7]">
                <span className="font-mono text-[#8F83FF] font-bold">{item.year}</span>
                <span className="text-[11px] uppercase tracking-wider text-[#73CAE5]">{item.categoryLabel}</span>
              </div>

              <h3 className="text-base font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors leading-snug">
                {item.title}
              </h3>

              <div className="text-xs text-[#8F83FF] flex items-center space-x-1.5 font-mono truncate">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>

              <p className="text-xs text-[#B7B7B7] line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-3 border-t border-white/5 space-y-1 text-[10px] text-[#B7B7B7]/70">
                <p className="truncate"><strong>Fonte:</strong> {item.source}</p>
                <p className="text-emerald-400 font-mono"><strong>Licença:</strong> {item.license}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal with Full Details */}
      {activeLightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-150"
          onClick={() => setActiveLightboxItem(null)}
        >
          <div
            className="bg-[#141414] border border-white/15 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-black text-white transition-colors"
              aria-label="Fechar lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain bg-black"
              />
            </div>

            {/* Details Below */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-3 py-1 rounded-full border border-[#73CAE5]/30 inline-block">
                    {activeLightboxItem.date} • {activeLightboxItem.categoryLabel}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
                    {activeLightboxItem.title}
                  </h2>
                </div>

                <div className="text-xs text-[#8F83FF] flex items-center space-x-1.5 font-mono">
                  <MapPin className="w-4 h-4" />
                  <span>{activeLightboxItem.location}</span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-1">
                    Descrição do Registro Fotográfico:
                  </h4>
                  <p>{activeLightboxItem.description}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8F83FF]">
                    Contexto Histórico & Importância:
                  </h4>
                  <p className="text-white text-xs leading-relaxed">{activeLightboxItem.historicalContext}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[#B7B7B7] block font-mono text-[11px]">FONTE OFICIAL / ACERVO:</span>
                    <strong className="text-white">{activeLightboxItem.source}</strong>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[#B7B7B7] block font-mono text-[11px]">CRÉDITO / LICENÇA:</span>
                    <strong className="text-emerald-400">{activeLightboxItem.license}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
