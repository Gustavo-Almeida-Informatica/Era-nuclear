import { AtomModelData } from '../components/AtomCanvasModel';

export const comparativeIsotopes: AtomModelData[] = [
  {
    id: 'u235',
    name: 'Urânio-235',
    symbol: '²³⁵U',
    protons: 92,
    neutrons: 143,
    electrons: 92,
    stability: 'Físsil',
    category: 'fission',
    roleInReaction: 'Combustível físsil primário em reatores nucleares civis comerciais (PWR, BWR). A absorção de um nêutron térmico lento de 0,025 eV induz a fragmentação em Ba-141 + Kr-92, ejetando 2 a 3 nêutrons rápidos e ~200 MeV de energia.',
    description: 'Único isótopo físsil natural que existe na Terra (0,72% do urânio na crosta). O número ímpar de nêutrons (143) fornece energia de emparelhamento crítica imediata ao capturar um nêutron térmico.',
    decayType: 'Alfa (α) / Fissão induzida',
    halfLife: '704 milhões de anos',
    bindingEnergyPerNucleon: '7,59 MeV / núcleon',
    naturalAbundance: '0,72% do urânio natural extraído'
  },
  {
    id: 'pu239',
    name: 'Plutônio-239',
    symbol: '²³⁹Pu',
    protons: 94,
    neutrons: 145,
    electrons: 94,
    stability: 'Físsil',
    category: 'fission',
    roleInReaction: 'Elemento físsil sintetizado por transmutação fértil em reatores de fissão (U-238 + n → U-239 → Np-239 → Pu-239). Apresenta seção de choque de fissão ainda superior à do U-235 e massa crítica menor (~10 kg).',
    description: 'Elemento transurânico artificial de Z=94. Descoberto por Glenn Seaborg em 1940, é o combustível da bomba Fat Man e de reatores nucleares rápidos regeneradores (Breeders).',
    decayType: 'Alfa (α) / Fissão induzida',
    halfLife: '24.110 anos',
    bindingEnergyPerNucleon: '7,56 MeV / núcleon',
    naturalAbundance: 'Sintético / Artificial (produzido em reatores)'
  },
  {
    id: 'deuterium',
    name: 'Deutério (Hidrogênio-2)',
    symbol: '²H (D)',
    protons: 1,
    neutrons: 1,
    electrons: 1,
    stability: 'Estável',
    category: 'fusion',
    roleInReaction: 'Reagente estequiométrico obrigatório na fusão termonuclear D-T (²H + ³H → ⁴He + n⁰ + 17,6 MeV). Fornece o nêutron adicional ao núcleo leve para atingir a ressonância da Força Forte.',
    description: 'Isótopo estável do hidrogênio contendo 1 próton e 1 nêutron no núcleo. Existe abundantemente na água marinha dos oceanos (1 átomo a cada ~6.400 átomos de hidrogênio), constituindo uma fonte energética virtualmente inesgotável.',
    decayType: 'Nenhum (Núcleo Estável)',
    halfLife: 'Estável (Infinito)',
    bindingEnergyPerNucleon: '1,11 MeV / núcleon',
    naturalAbundance: '1 a cada 6.400 átomos de H na água oceânica'
  },
  {
    id: 'tritium',
    name: 'Trítio (Hidrogênio-3)',
    symbol: '³H (T)',
    protons: 1,
    neutrons: 2,
    electrons: 1,
    stability: 'Radioativo',
    category: 'fusion',
    roleInReaction: 'Combustível da reação de fusão com a maior seção de choque em menor temperatura (150 milhões °C). Nos reatores comerciais de fusão (como ITER e DEMO), o trítio será regenerado no manto (blanket) de lítio: ⁶Li + n → ⁴He + ³H.',
    description: 'Isótopo radioativo do hidrogênio com 1 próton e 2 nêutrons. Decai por emissão de elétrons beta de baixa energia. Devido à sua meia-vida curta, não existe em depósitos geológicos naturais e é reproduzido em ciclos fechados.',
    decayType: 'Beta-menos (β⁻)',
    halfLife: '12,32 anos',
    bindingEnergyPerNucleon: '2,83 MeV / núcleon',
    naturalAbundance: 'Vestigial / Produzido via lítio em reatores'
  }
];
