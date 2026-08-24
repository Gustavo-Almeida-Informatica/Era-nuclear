import React, { useState } from 'react';
import { PageId } from '../types';
import {
  Globe,
  Calendar,
  MapPin,
  Zap,
  ShieldCheck,
  AlertOctagon,
  Maximize2,
  X,
  Scale,
  Award,
  Flame,
  Info
} from 'lucide-react';

interface TsarBombaPageProps {
  onNavigate: (page: PageId) => void;
}

export const TsarBombaPage: React.FC<TsarBombaPageProps> = ({ onNavigate }) => {
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Hero Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <Zap className="w-3.5 h-3.5" />
          <span>O Ápice da Megatonelagem Nuclear (1961)</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Tsar Bomba (RDS-220)
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#8F83FF] font-medium font-display">
          A maior detonação nuclear e o evento explosivo de maior energia já provocado pela humanidade em toda a sua história.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Detonada em 30 de outubro de 1961 pela União Soviética no arquipélago ártico de Nova Zembla, a <strong>Tsar Bomba</strong> (designação de fábrica <em>RDS-220 / Produto 602</em>) liberou uma potência energética de <strong>50 Megatons</strong> (50 milhões de toneladas de TNT), equivalente a mais de 3.300 bombas de Hiroshima detonadas em um único instante.
        </p>
      </div>

      {/* Main Spec Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#111111] border border-white/10 shadow-xl">
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Potência Real</span>
          <p className="text-xl sm:text-2xl font-bold text-[#8F83FF] font-mono">50 Megatons</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Altitude de Detonação</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">4.000 m (Aérea)</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Altura do Cogumelo</span>
          <p className="text-xl sm:text-2xl font-bold text-[#73CAE5] font-mono">67 km (Mesosfera)</p>
        </div>
        <div className="space-y-1">
          <span className="text-xs text-[#B7B7B7] uppercase font-mono">Massa do Dispositivo</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-mono">27 Toneladas</p>
        </div>
      </div>

      {/* Grid: Context, Preparation & Real Historical Photo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left text column */}
        <div className="lg:col-span-7 space-y-6 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#73CAE5]" />
              <span>Contexto da Guerra Fria & A Decisão de Nikita Khrushchev</span>
            </h3>
            <p>
              No outono de 1961, as tensões entre as superpotências atingiram um pico extremo durante a <strong>Crise de Berlim</strong> e a construção do Muro de Berlim. O premiê soviético Nikita Khrushchev desejava uma demonstração incontestável da capacidade científica e estratégica soviética durante o 22º Congresso do Partido Comunista.
            </p>
            <p>
              A equipe de físicos teóricos liderada por <strong>Andrei Sakharov, Viktor Adamsky, Yuri Babaev, Yuri Smirnov e Yulii Khariton</strong> recebeu o desafio de projetar e montar o artefato em Sarov (Arzamas-16) em tempo recorde de menos de 15 semanas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center space-x-2">
              <Zap className="w-4 h-4 text-[#8F83FF]" />
              <span>A Preparação Aérea & O Voo do Tu-95V</span>
            </h3>
            <p>
              A bomba media 8 metros de comprimento por 2 metros de diâmetro e pesava 27 toneladas — grande demais para o compartimento interno de bombas de qualquer avião da época.
            </p>
            <p>
              Um bombardeiro quadrimotor turboélice <strong>Tupolev Tu-95V</strong> sob comando do Major Andrei Durnovtsev foi amplamente modificado, removendo as portas do compartimento e aplicando uma tinta refletiva branca especial sobre toda a fusagem para resistir ao pulso térmico.
            </p>
            <p>
              Para permitir que a aeronave voasse cerca de 45 km para longe da zona zero antes da detonação, a bomba foi equipada com um <strong>paraquedas de náilon gigante de 800 m²</strong> pesando quase 800 kg, retardando sua descida desde 10.500 m até os 4.000 m programados para a detonação.
            </p>
          </div>
        </div>

        {/* Right column with Image */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onClick={() => setLightboxImg('https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tsar_Bomba_Mushroom_Cloud.png/1024px-Tsar_Bomba_Mushroom_Cloud.png')}
            className="relative rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer aspect-4/3 shadow-xl"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Tsar_Bomba_Mushroom_Cloud.png/1024px-Tsar_Bomba_Mushroom_Cloud.png"
              alt="Tsar Bomba Mushroom Cloud"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
              <p className="font-medium truncate">A gigantesca coluna de condensação e cogumelo da Tsar Bomba (1961)</p>
            </div>
            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-[11px] text-[#B7B7B7]/70 space-y-0.5 px-1">
            <p><strong>Fonte:</strong> Rosatom / Arquivo Central da Federação Russa</p>
            <p><strong>Licença:</strong> Domínio Público (Arquivo Histórico Estatal da URSS)</p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
            <div className="flex items-center space-x-1.5 text-[#73CAE5] font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Localização: Campo D-II, Ilha de Nova Zembla</span>
            </div>
            <p className="text-[#B7B7B7]">
              Coordenadas: 73°51′N 54°34′E, acima do Círculo Polar Ártico.
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Explanation & The Lead Tamper Decision */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
          <Info className="w-4 h-4" />
          <span>Física & Engenharia Teórica</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          A Ciência da Tsar Bomba: O Porquê dos 50 Mt em vez de 100 Mt
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="space-y-4">
            <p>
              O projeto conceitual inicial da RDS-220 previa um rendimento colossal de <strong>100 Megatons</strong> utilizando uma camisa externa (tamper) feita de <strong>Urânio-238</strong>. O urânio sofreria fissão acelerada sob o intenso fluxo de nêutrons rápidos de 14,1 MeV gerados pela fusão de deutereto de lítio.
            </p>
            <p>
              No entanto, os cálculos teóricos de Andrei Sakharov demonstraram que uma detonação de 100 Mt geraria uma quantidade sem precedentes de precipitação radioativa global (fallout), contaminando cidades soviéticas habitadas e vastas áreas do hemisfério norte.
            </p>
          </div>

          <div className="space-y-4 lg:border-l lg:border-white/10 lg:pl-8">
            <h4 className="text-base font-bold text-white font-display">
              A Decisão Histórica de Substituição por Chumbo
            </h4>
            <p>
              Sakharov convenceu a liderança a substituir o tamper de urânio por um <strong>revestimento inerte de chumbo</strong>. Isso eliminou a etapa de fissão rápida dos nêutrons secundários, limitando a potência a 50 Megatons.
            </p>
            <div className="p-4 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs text-white">
              <strong>Resultado Notável:</strong> Mais de <strong>97% da energia</strong> da explosão derivou puramente de reações de fusão nuclear limpa. Paradoxalmente, a Tsar Bomba foi um dos testes nucleares com menor resíduo de fissão por megaton de toda a história dos testes atmosféricos.
            </div>
          </div>
        </div>
      </section>

      {/* Observed Physical Effects */}
      <section className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Fenomenologia Física
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Efeitos Observados da Explosão
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#73CAE5]/10 flex items-center justify-center text-[#73CAE5]">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-display">Clarão e Pulso Térmico</h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              O clarão luminoso foi avistado a mais de 1.000 km de distância na Noruega e Groenlândia. O calor radiante emitido poderia causar queimaduras de terceiro grau em pessoas desprotegidas a até 100 km do hipocentro.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-[#8F83FF]/10 flex items-center justify-center text-[#8F83FF]">
              <Globe className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-display">Ondas de Choque Globais</h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              A onda de sobrepressão atmosférica completou <strong>três voltas completas ao redor do globo terrestre</strong>, sendo registrada por barógrafos de dezenas de universidades ao redor do mundo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111111] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white font-display">Dimensões da Nuvem</h3>
            <p className="text-xs text-[#B7B7B7] leading-relaxed">
              O cogumelo atingiu 67 km de altura (penetrando profundamente na mesosfera) com diâmetro superior a 95 km na sua cúpula, mantendo a ionosfera perturbada por mais de uma hora.
            </p>
          </div>
        </div>
      </section>

      {/* Specialized Section: Por que a Tsar Bomba foi tão importante? */}
      <section className="bg-gradient-to-br from-[#121212] via-[#1f1633] to-[#0D0D0D] border border-[#8F83FF]/30 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-8">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
          <Award className="w-4 h-4" />
          <span>Análise Histórica & Geopolítica</span>
        </div>

        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Por que a Tsar Bomba foi tão importante?
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
            A Tsar Bomba não foi apenas um recorde estatístico; ela transformou irrevogavelmente a doutrina militar e a diplomacia nuclear internacional:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-base font-bold text-white font-display">
              1. Demonstração do Limite Militar da Megatonelagem
            </h4>
            <p>
              Provou aos estrategistas de ambos os blocos que bombas gigantescas (acima de 20–50 Mt) eram militarmente ineficientes. A maior parte da sua energia era desperdiçada empurrando a atmosfera para o espaço, enquanto o peso de 27 toneladas tornava impossível carregá-las em mísseis balísticos intercontinentais (ICBMs). A corrida mudou para a <strong>precisão de guiamento</strong> e ogivas múltiplas menores (MIRVs).
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-base font-bold text-white font-display">
              2. Catalisador do Tratado de Proibição Parcial de Testes (PTBT de 1963)
            </h4>
            <p>
              O choque provocado pela escala da explosão em governos e populações mundiais convenceu John F. Kennedy e Nikita Khrushchev a interromperem os testes atmosféricos, assinando em Moscou o <strong>Tratado PTBT em agosto de 1963</strong>.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-base font-bold text-white font-display">
              3. Transformação Moral de Andrei Sakharov
            </h4>
            <p>
              A experiência direta com a concepção da Tsar Bomba marcou a virada na consciência do físico Andrei Sakharov, que passou a militar ativamente pelos direitos humanos, pelo desarmamento nuclear e pela paz mundial, sendo laureado com o <strong>Prêmio Nobel da Paz em 1975</strong>.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-base font-bold text-white font-display">
              4. Consagração da Paridade Estratégica
            </h4>
            <p>
              Consolidou de maneira irrefutável a Doutrina de Destruição Mútua Assegurada (MAD): nenhum lado poderia vencer uma guerra nuclear sem sofrer aniquilação completa.
            </p>
          </div>
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
            <img src={lightboxImg} alt="Tsar Bomba" className="w-full max-h-[80vh] object-contain bg-black" />
            <div className="p-4 text-xs font-bold text-white font-display">
              Registro histórico da detonação da Tsar Bomba (1961) — Rosatom / Arquivo da Federação Russa
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
