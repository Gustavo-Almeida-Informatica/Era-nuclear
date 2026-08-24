import React, { useState } from 'react';
import { PageId } from '../types';
import { weaponCategories, nuclearTreaties } from '../data/weaponsData';
import {
  ShieldAlert,
  Layers,
  FileText,
  AlertTriangle,
  Scale,
  Sparkles,
  ChevronRight,
  Info,
  Zap,
  Target,
  Globe,
  Radio,
  Flame,
  ArrowRight
} from 'lucide-react';

interface WeaponsPageProps {
  onNavigate: (page: PageId) => void;
}

export const WeaponsPage: React.FC<WeaponsPageProps> = ({ onNavigate }) => {
  const [selectedWeaponCat, setSelectedWeaponCat] = useState<string>(weaponCategories[0].id);
  const [activePrinciple, setActivePrinciple] = useState<'fissao' | 'fusao'>('fissao');

  const activeCategory = weaponCategories.find((w) => w.id === selectedWeaponCat) || weaponCategories[0];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="max-w-4xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-xs font-semibold text-[#8F83FF]">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Física dos Armamentos & Tratados Internacionais</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white font-display tracking-tight uppercase">
          Armas Nucleares
        </h1>
        <p className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#B7B7B7] to-[#8F83FF] font-medium font-display">
          Como a física atômica e a energia do núcleo foram transformadas nos maiores arsenais da história humana.
        </p>
        <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
          Uma análise estritamente educativa, histórica e conceitual sobre os princípios físicos de fissão e fusão, as arquiteturas conceituais clássicas da Guerra Fria e os regimes jurídicos de controle e desarmamento das Nações Unidas.
        </p>
      </div>

      {/* Safety & Educational Ethics Notice */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start space-x-3 text-xs text-[#B7B7B7] shadow-xl">
        <Info className="w-4 h-4 text-[#73CAE5] mt-0.5 shrink-0" />
        <p className="leading-relaxed">
          <strong className="text-white">Aviso de Responsabilidade e Segurança:</strong> Esta seção tem finalidade exclusivamente didática, histórica e de conscientização sobre o desarmamento. Todos os diagramas são puramente abstratos e conceituais. O site não apresenta projetos técnicos, desenhos construtivos, dimensões internas, proporções, materiais específicos ou procedimentos de montagem de armamentos.
        </p>
      </div>

      {/* Quick Navigation Cards to Special Historical Case Pages */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Aprofundamentos Históricos Especiais
          </h3>
          <span className="text-xs text-[#B7B7B7]">Páginas Monográficas Dedicadas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('operation-castle')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#73CAE5] font-bold">1954 • 6 TESTES</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#73CAE5] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
              Operação Castle
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A série de testes de combustível sólido no Atol de Bikini que gerou 48 Mt e o fallout de Bravo.
            </p>
          </div>

          <div
            onClick={() => onNavigate('tsar-bomba')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8F83FF] font-bold">1961 • 50 MT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#8F83FF] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#8F83FF] transition-colors">
              Tsar Bomba
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior detonação da história humana (50 Megatons) e seus impactos no Tratado PTBT.
            </p>
          </div>

          <div
            onClick={() => onNavigate('ivy-king')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#73CAE5] font-bold">1952 • 500 KT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#73CAE5] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#73CAE5] transition-colors">
              Ivy King
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior arma de fissão pura já testada pelos Estados Unidos (MK-18).
            </p>
          </div>

          <div
            onClick={() => onNavigate('b41')}
            className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/50 transition-all cursor-pointer group space-y-2 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8F83FF] font-bold">1960–1976 • 25 MT</span>
              <ChevronRight className="w-4 h-4 text-[#B7B7B7] group-hover:text-[#8F83FF] group-hover:translate-x-1 transition-all" />
            </div>
            <h4 className="text-base font-bold text-white font-display group-hover:text-[#8F83FF] transition-colors">
              Bomba B41
            </h4>
            <p className="text-xs text-[#B7B7B7] line-clamp-2">
              A maior arma termonuclear estocada em série pelos EUA e a transição para ogivas guiadas.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: Como Funcionam as Armas Nucleares (Princípios Gerais e Diagramas Conceituais) */}
      <section className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-xs font-semibold text-[#73CAE5]">
            <Zap className="w-3.5 h-3.5" />
            <span>Física Teórica Fundamental</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Como Funcionam as Armas Nucleares: Os Princípios Científicos
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7] leading-relaxed max-w-3xl">
            Toda a liberação de energia em artefatos nucleares baseia-se em dois processos subatômicos opostos descritos pela equivalência massa-energia de Einstein ($E = \Delta m \cdot c^2$):
          </p>
        </div>

        {/* Switch Buttons: Fissão vs Fusão */}
        <div className="flex space-x-2">
          <button
            onClick={() => setActivePrinciple('fissao')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activePrinciple === 'fissao'
                ? 'bg-[#73CAE5] text-black border-[#73CAE5] shadow-lg shadow-[#73CAE5]/20'
                : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
            }`}
          >
            1. Princípio da Fissão Nuclear
          </button>
          <button
            onClick={() => setActivePrinciple('fusao')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              activePrinciple === 'fusao'
                ? 'bg-[#8F83FF] text-white border-[#8F83FF] shadow-lg shadow-[#8F83FF]/20'
                : 'bg-white/5 border-white/10 text-[#B7B7B7] hover:text-white'
            }`}
          >
            2. Princípio da Fusão Termonuclear
          </button>
        </div>

        {/* Principle Display */}
        {activePrinciple === 'fissao' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#73CAE5]" />
                <span>Fissão: Divisão de Núcleos Pesados</span>
              </h3>
              <p>
                Um núcleo atômico pesado e instável (como o <strong>Urânio-235</strong> ou o <strong>Plutônio-239</strong>) absorve um nêutron térmico ou rápido, tornando-se altamente excitado e dividindo-se em dois fragmentos menores (produtos de fissão).
              </p>
              <p>
                Durante a quebra, uma fração minúscula da massa dos núcleos é convertida diretamente em imensa energia cinética e térmica, acompanhada da ejeção de <strong>2 a 3 nêutrons secundários</strong> em velocidades da ordem de dezenas de milhares de quilômetros por segundo.
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white">
                <strong>Equação Conceitual:</strong><br />
                <span className="font-mono text-[#73CAE5]">¹n + ²³⁵U → [²³⁶U*] → Ba-141 + Kr-92 + 3 ¹n + ~200 MeV</span>
              </div>
            </div>

            {/* Conceptual Animation Block: Núcleo -> Divisão -> Energia */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-xl bg-[#090909] border border-[#73CAE5]/20 space-y-4">
              <span className="text-[11px] font-mono text-[#73CAE5] uppercase font-bold tracking-wider">
                Fluxo Conceitual da Fissão
              </span>
              <div className="flex items-center space-x-3 text-xs font-mono text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <div className="w-8 h-8 rounded-full bg-[#8F83FF] mx-auto mb-1 flex items-center justify-center font-bold">U</div>
                  <span>Núcleo Pesado</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#73CAE5] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-[#73CAE5]/10 border border-[#73CAE5]/30 text-[#73CAE5]">
                  <div className="flex space-x-1 justify-center mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#73CAE5]" />
                    <div className="w-4 h-4 rounded-full bg-[#73CAE5]" />
                  </div>
                  <span>Divisão Nuclear</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#73CAE5] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Zap className="w-5 h-5 mx-auto mb-1" />
                  <span>Energia (~200 MeV)</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 p-6 sm:p-8 rounded-2xl border border-white/5">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-[#B7B7B7] leading-relaxed">
              <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8F83FF]" />
                <span>Fusão: Junção de Núcleos Leves</span>
              </h3>
              <p>
                Dois núcleos atômicos extremamente leves (os isótopos de hidrogênio <strong>Deutério ²H</strong> e <strong>Trítio ³H</strong>) são submetidos a temperaturas de dezenas de milhões de graus Celsius e pressões astronômicas.
              </p>
              <p>
                A energia térmica extrema vence a repulsão eletrostática natural entre os prótons positivos (Barreira de Coulomb), permitindo que a <strong>Força Nuclear Forte</strong> funda os núcleos em um único núcleo de <strong>Hélio-4</strong> mais um nêutron rápido de altíssima energia (14,1 MeV).
              </p>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white">
                <strong>Equação Conceitual:</strong><br />
                <span className="font-mono text-[#8F83FF]">²H (Deutério) + ³H (Trítio) → ⁴He (3.5 MeV) + ¹n (14.1 MeV) + 17.6 MeV</span>
              </div>
            </div>

            {/* Conceptual Animation Block: Núcleos Leves -> Fusão -> Núcleo Mais Pesado + Energia */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 rounded-xl bg-[#090909] border border-[#8F83FF]/20 space-y-4">
              <span className="text-[11px] font-mono text-[#8F83FF] uppercase font-bold tracking-wider">
                Fluxo Conceitual da Fusão
              </span>
              <div className="flex items-center space-x-3 text-xs font-mono text-center">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                  <div className="flex space-x-1 justify-center mb-1">
                    <div className="w-4 h-4 rounded-full bg-[#73CAE5]" />
                    <div className="w-4 h-4 rounded-full bg-[#8F83FF]" />
                  </div>
                  <span>Núcleos Leves (D+T)</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8F83FF] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-[#8F83FF]/10 border border-[#8F83FF]/30 text-[#8F83FF]">
                  <div className="w-6 h-6 rounded-full bg-[#8F83FF] mx-auto mb-1 flex items-center justify-center">🔥</div>
                  <span>Fusão em Plasma</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8F83FF] shrink-0 animate-pulse" />
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-400 mx-auto mb-1 flex items-center justify-center text-black font-bold text-[10px]">⁴He</div>
                  <span>Núcleo + Energia</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* SECTION 10: Arquiteturas Históricas de Armas Nucleares (Conceituais e Não Construtivos) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8F83FF] font-mono">
            Evolução Conceitual Abstrata
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Arquiteturas Históricas de Armas Nucleares
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7]">
            Modelos didáticos e conceituais dos três métodos históricos clássicos desenvolvidos durante o século XX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Gun Type */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#73CAE5]/40 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold text-[#73CAE5] uppercase tracking-wider">
                Conceito 01 • Fissão por Junção
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Fissão Tipo Canhão (Gun-Type)
              </h3>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                <strong>Conceito Teórico:</strong> O método mais elementar historicamente. Consiste em acelerar uma massa subcrítica de material físsil (Urânio-235) em direção a outra massa subcrítica através de um tubo, unindo-as rapidamente para formar uma massa supercrítica.
              </p>
              
              {/* Abstract Non-constructive Diagram */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-center space-y-2">
                <div className="text-[10px] font-mono text-[#B7B7B7]">Diagrama Conceitual Abstrato:</div>
                <div className="flex items-center justify-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/30">Subcrítico A</span>
                  <span className="text-white">➔</span>
                  <span className="px-2 py-1 rounded bg-[#73CAE5]/20 text-[#73CAE5] border border-[#73CAE5]/30">Subcrítico B</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-[#B7B7B7]">
              <strong className="text-white">Exemplo Histórico:</strong> Little Boy (Hiroshima, 1945). Obsoleto devido à baixa eficiência física e peso excessivo.
            </div>
          </div>

          {/* Card 2: Implosion Type */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#8F83FF]/40 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold text-[#8F83FF] uppercase tracking-wider">
                Conceito 02 • Compressão Esférica
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Fissão por Implosão (Implosion-Type)
              </h3>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                <strong>Conceito Teórico:</strong> Uma esfera oca ou sólida de material físsil (Plutônio-239) é cercada por uma camada esférica simétrica. A pressão convergente comprime o núcleo em milionésimos de segundo, aumentando sua densidade para atingir a super-criticalidade.
              </p>

              {/* Abstract Non-constructive Diagram */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-center space-y-2">
                <div className="text-[10px] font-mono text-[#B7B7B7]">Diagrama Conceitual Abstrato:</div>
                <div className="flex items-center justify-center space-x-1 text-xs font-mono">
                  <span className="text-[#8F83FF]">⬇</span>
                  <span className="w-8 h-8 rounded-full bg-[#8F83FF]/20 border border-[#8F83FF] flex items-center justify-center text-white text-[10px]">Núcleo</span>
                  <span className="text-[#8F83FF]">⬆</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-[#B7B7B7]">
              <strong className="text-white">Exemplos Históricos:</strong> Trinity, Fat Man (Nagasaki, 1945), RDS-1 (1949). Padrão para gatilhos de ogivas modernas.
            </div>
          </div>

          {/* Card 3: Teller-Ulam */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#111111] border border-white/10 hover:border-amber-500/40 transition-all space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                Conceito 03 • Dois Estágios
              </span>
              <h3 className="text-xl font-bold text-white font-display">
                Termonuclear (Teller-Ulam)
              </h3>
              <p className="text-xs text-[#B7B7B7] leading-relaxed">
                <strong>Conceito Teórico:</strong> Uma primária de fissão por implosão libera um banho intenso de raios-X térmicos. Essa radiação canalizada comprime e aquece um estágio secundário contendo combustível de fusão de deutereto de lítio.
              </p>

              {/* Abstract Non-constructive Diagram */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 text-center space-y-2">
                <div className="text-[10px] font-mono text-[#B7B7B7]">Diagrama Conceitual Abstrato:</div>
                <div className="flex items-center justify-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-1 rounded bg-[#8F83FF]/20 text-[#8F83FF]">Primário</span>
                  <span className="text-amber-400">⚡ (Raios-X)</span>
                  <span className="px-2 py-1 rounded bg-[#73CAE5]/20 text-[#73CAE5]">Secundário</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 text-[11px] text-[#B7B7B7]">
              <strong className="text-white">Exemplos Históricos:</strong> Ivy Mike (1952), Castle Bravo (1954), RDS-37 (1955), Tsar Bomba (1961), B41.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: Tabela de Comparação Visual Solicitada */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Quadro Comparativo Integrado
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Comparação Visual dos Conceitos e Arquiteturas
          </h2>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-white/5 text-[#73CAE5] font-display uppercase tracking-wider text-[11px] border-b border-white/10">
              <tr>
                <th className="py-4 px-6 font-bold">Conceito</th>
                <th className="py-4 px-6 font-bold">Processo Físico</th>
                <th className="py-4 px-6 font-bold">Contexto Histórico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-[#B7B7B7]">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão</td>
                <td className="py-4 px-6">Divisão de núcleos pesados</td>
                <td className="py-4 px-6 text-[#73CAE5]">Primeiras armas nucleares</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fusão</td>
                <td className="py-4 px-6">Combinação de núcleos leves</td>
                <td className="py-4 px-6 text-[#8F83FF]">Armas termonucleares</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão tipo canhão</td>
                <td className="py-4 px-6">Arquitetura histórica de fissão</td>
                <td className="py-4 px-6">Segunda Guerra Mundial</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Fissão por implosão</td>
                <td className="py-4 px-6">Arquitetura histórica de fissão</td>
                <td className="py-4 px-6">Projeto Manhattan e desenvolvimento posterior</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-4 px-6 font-bold text-white font-mono">Termonuclear</td>
                <td className="py-4 px-6">Processos de fusão em condições extremas</td>
                <td className="py-4 px-6 text-amber-300">Guerra Fria</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Non-Proliferation & Disarmament Treaties */}
      <section className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#73CAE5] font-mono">
            Direito Internacional & Governança Multilateral
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Tratados de Controle de Armas e Não Proliferação
          </h2>
          <p className="text-xs sm:text-sm text-[#B7B7B7]">
            Os principais instrumentos negociados sob a égide das Nações Unidas e da AIEA para conter a proliferação e pavimentar o desarmamento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {nuclearTreaties.map((treaty) => (
            <div
              key={treaty.name}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#73CAE5]/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#73CAE5] bg-[#73CAE5]/10 px-2.5 py-0.5 rounded-full border border-[#73CAE5]/30">
                    {treaty.year}
                  </span>
                  <span className="text-[11px] text-[#B7B7B7]">{treaty.signatories}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {treaty.name}
                </h3>

                <p className="text-xs text-[#B7B7B7] leading-relaxed">
                  {treaty.scope}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                <div className="text-white/80 font-mono text-[11px]">
                  <strong>Dispositivo Central:</strong> {treaty.keyArticle}
                </div>
                <div className="text-[#8F83FF] text-[11px] font-semibold">
                  Status: {treaty.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
