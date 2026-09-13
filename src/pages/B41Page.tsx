import React, { useState } from 'react';
import { PageId } from '../types';
import b41Img from '../assets/images/b41_real_usaf_museum.jpg';
import b41MuseumDocImg from '../assets/images/b41_real_usaf_museum.jpg';
import {
  Flame,
  Calendar,
  Shield,
  Scale,
  Maximize2,
  X,
  Clock,
  Award,
  Info,
  Archive,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';

interface B41PageProps {
  onNavigate: (page: PageId) => void;
}

export const B41Page: React.FC<B41PageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<{ src: string; caption: string } | null>(null);
  const [selectedPhotoView, setSelectedPhotoView] = useState<'museum_exhibit' | 'historical_archive'>('museum_exhibit');

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <Archive className="w-3.5 h-3.5" />
          <span>Arsenal Estratégico da Guerra Fria (1960–1976)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          B41 (Mark 41)
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#8F83FF] font-medium font-display">
          A maior e mais potente arma termonuclear produzida em série e estocada pelos Estados Unidos.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Projetada pelo Laboratório Nacional Lawrence Livermore no final da década de 1950 e colocada em prontidão operacional entre 1960 e 1976, a bomba termonuclear <strong>B41</strong> podia atingir até <strong>25 Megatons</strong> de energia explosiva — o ápice da megatonelagem aerotransportada norte-americana.
        </p>
      </div>

      {/* Highlights Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Potência Máxima</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">25 Megatons</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Período de Serviço</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">1960 – 1976</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Produção em Série</span>
          <p className="text-xl sm:text-2xl font-bold text-[#73CAE5] font-mono">~500 Unidades</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Plataforma Principal</span>
          <p className="text-sm font-bold text-white">Boeing B-52 Stratofortress</p>
        </div>
      </div>

      {/* Grid: Context & Real Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#73CAE5]" />
              <span>Desenvolvimento & Finalidade Estratégica</span>
            </h3>
            <p>
              Durante a década de 1950, a precisão dos sistemas de navegação inercial dos bombardeiros ainda possuía margens de erro de algumas centenas de metros a quilômetros.
            </p>
            <p>
              Para compensar essa imprecisão e garantir a neutralização de alvos estratégicos fortemente fortificados (bunkers de comando subterrâneos, silos de mísseis e bases aéreas soviéticas), a Força Aérea dos EUA encomendou uma arma com o maior rendimento destrutivo possível em relação ao seu peso (alta razão megaton/tonelada).
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#8F83FF]" />
              <span>Aposentadoria em 1976 & A Evolução para Ogivas Precisas</span>
            </h3>
            <p>
              Ao longo dos anos 1970, a revolução da microeletrônica e dos sensores de guiamento por satélite e radar permitiu que os mísseis balísticos intercontinentais (como o Minuteman III e os mísseis disparados por submarinos Poseidon/Trident) atingissem seus alvos com precisão de dezenas de metros.
            </p>
            <p>
              Com precisão quase cirúrgica, ogivas compactas de centenas de quilotons conseguiam o mesmo efeito militar sem a necessidade de carregar bombas monstruosas de 25 Megatons. Todas as unidades da B41 foram retiradas de serviço ativo e desmanteladas em 1976.
            </p>
          </div>
        </div>

        {/* Right Photo & Exhibit Gallery */}
        <div className="lg:col-span-5 space-y-4">
          {/* Photo View Selector Tabs */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
            <button
              onClick={() => setSelectedPhotoView('museum_exhibit')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-medium transition-all flex items-center justify-center space-x-1.5 ${
                selectedPhotoView === 'museum_exhibit'
                  ? 'bg-[#8F83FF] text-white font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Exposição Museológica</span>
            </button>
            <button
              onClick={() => setSelectedPhotoView('historical_archive')}
              className={`flex-1 py-1.5 px-2.5 rounded-lg font-medium transition-all flex items-center justify-center space-x-1.5 ${
                selectedPhotoView === 'historical_archive'
                  ? 'bg-[#8F83FF] text-white font-bold shadow-md'
                  : 'text-[#B7B7B7] hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Acervo Histórico Real</span>
            </button>
          </div>

          <div
            onClick={() =>
              setLightboxImg({
                src: selectedPhotoView === 'museum_exhibit' ? b41MuseumDocImg : b41Img,
                caption:
                  selectedPhotoView === 'museum_exhibit'
                    ? 'B41 (Mark 41) sobre dolly de manuseio com trilhos amarelos e placa interpretativa: "A MAIOR BOMBA TERMONUCLEAR DO ARSENAL DOS EUA"'
                    : 'Carcaça desativada da B41 em exibição permanente no Museu Nacional Nuclear (Albuquerque, NM)'
              })
            }
            className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-4/3 shadow-2xl"
          >
            <img
              src={selectedPhotoView === 'museum_exhibit' ? b41MuseumDocImg : b41Img}
              alt={
                selectedPhotoView === 'museum_exhibit'
                  ? 'Fotografia documental da bomba termonuclear B41 em museu com placa iluminada e suporte com trilhos amarelos'
                  : 'Carcaça da bomba termonuclear B41 em exibição museológica'
              }
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/95 space-y-1">
              <p className="font-bold font-display text-[13px] text-white">
                {selectedPhotoView === 'museum_exhibit'
                  ? 'Exposição Noturna com Placa Interpretativa'
                  : 'Exemplar Preservado em Albuquerque (NM)'}
              </p>
              <p className="text-[11px] text-[#B7B7B7] line-clamp-2">
                {selectedPhotoView === 'museum_exhibit'
                  ? 'Carcaça verde-oliva com estêncil amarelo ("TYPE 3 / B 41") sobre suporte móvel com trilhos amarelos e placa descritiva frontal iluminada.'
                  : 'Carcaça desativada da B41 em exibição permanente no Museu Nacional de Ciência & História Nuclear.'}
              </p>
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>

          <div className="text-[11px] text-[#B7B7B7]/70 space-y-0.5 px-1">
            <p>
              <strong>Registro:</strong>{' '}
              {selectedPhotoView === 'museum_exhibit'
                ? 'Exposição Fotográfica Documental / Galeria Museológica'
                : 'National Museum of Nuclear Science & History / U.S. Air Force'}
            </p>
            <p><strong>Classificação:</strong> Peça Histórica Desarmada (Sem Carga Físsil)</p>
          </div>

          {/* Museum Plaque Highlights Callout */}
          {selectedPhotoView === 'museum_exhibit' && (
            <div className="p-4 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/25 space-y-2 text-xs">
              <div className="flex items-center space-x-1.5 text-[#8F83FF] font-bold">
                <Info className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider font-mono text-[10px]">Placa Interpretativa em Metal Escovado</span>
              </div>
              <p className="text-white font-semibold font-display">
                "B41 (Mark 41) — A MAIOR BOMBA TERMONUCLEAR DO ARSENAL DOS EUA"
              </p>
              <p className="text-[#B7B7B7] text-[11px] leading-relaxed">
                Especificações registradas: 11.000 lbs (~4.850 kg), produção no início da década de 1960 e rendimento termonuclear recorde de 25 Megatons.
              </p>
            </div>
          )}

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
            <div className="flex items-center space-x-1.5 text-[#8F83FF] font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Dimensões Físicas Gerais</span>
            </div>
            <p className="text-[#B7B7B7]">
              Comprimento: 3,76 metros • Diâmetro: 1,32 metro • Peso aproximado: 4.850 kg.
            </p>
          </div>
        </div>
      </div>

      {/* Historical Context Card */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Award className="w-4 h-4" />
          <span>Importância Histórica & Doutrina Nuclear</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          O Fim da Era das Megabombas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <p>
            A bomba <strong>B41</strong> encerrou o período dos anos 1950 e 1960 em que o poderio nuclear era medido em Megatons brutos de destruição em massa. O custo logístico, o peso sobre os bombardeiros e o risco de precipitação radioativa maciça sobre territórios aliados tornaram as megabombas obsoletas perante a estratégia moderna de dissuasão focada em vetores múltiplos de lançamento de alta precisão.
          </p>
          <p>
            Hoje, exemplares desarmados e desprovidos de qualquer material físsil encontram-se preservados exclusivamente em museus e memoriais de história científica para ensinar as futuras gerações sobre os dilemas tecnológicos e geopolíticos da Guerra Fria.
          </p>
        </div>
      </section>

      {/* Lightbox */}
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
            <img src={lightboxImg.src} alt={lightboxImg.caption} referrerPolicy="no-referrer" className="w-full max-h-[80vh] object-contain bg-black" />
            <div className="p-4 text-xs font-bold text-white font-display">
              {lightboxImg.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
