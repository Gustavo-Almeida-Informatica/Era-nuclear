import { PhysicsTopic, RadiationType } from '../types';

export const physicsTopics: PhysicsTopic[] = [
  {
    id: 'o-atomo',
    title: 'A Estrutura do Átomo',
    subtitle: 'Prótons, Nêutrons, Elétrons e a Força Nuclear Forte',
    summary: 'O átomo é a unidade fundamental da matéria, composto por um núcleo denso de prótons e nêutrons, orbitado por elétrons distribuídos em camadas eletrônicas.',
    keyPoints: [
      'Núcleo Atômico: Concentra mais de 99,9% da massa do átomo em um volume diminuto (~10⁻¹⁵ m).',
      'Prótons (p⁺): Partículas com carga elétrica positiva (+1e) que definem o elemento químico (Número Atômico Z).',
      'Nêutrons (n⁰): Partículas de carga elétrica nula que atuam como "cimento nuclear", estabilizando a repulsão eletrostática.',
      'Elétrons (e⁻): Partículas elementares leves com carga negativa (-1e) que orbitam o núcleo.',
      'Força Nuclear Forte: A força fundamental mais intensa do Universo, que supera a repulsão eletrostática entre prótons a distâncias inferiores a 1 femtômetro.'
    ],
    details: 'Em um núcleo atômico estável, a Força Nuclear Forte mantém os núcleons (prótons e nêutrons) unidos. Quando a razão entre nêutrons e prótons (N/Z) é desfavorável ou o núcleo é excessivamente pesado (Z > 82), o núcleo torna-se instável e busca estabilidade através do decaimento radioativo ou da fissão.',
    formula: 'A = Z + N',
    formulaExplanation: 'Onde A é o número de massa atômica, Z é o número de prótons e N é o número de nêutrons.'
  },
  {
    id: 'isotopos',
    title: 'Isótopos e Estabilidade Nuclear',
    subtitle: 'Mesmo elemento químico, diferentes massas e propriedades nucleares',
    summary: 'Isótopos são átomos de um mesmo elemento químico (mesmo número Z de prótons) que possuem diferentes quantidades de nêutrons (N) no núcleo.',
    keyPoints: [
      'Isótopos de Hidrogênio: Hidrogênio-1 (Prótio: 1p), Hidrogênio-2 (Deutério: 1p + 1n) e Hidrogênio-3 (Trítio: 1p + 2n, radioativo).',
      'Isótopos de Urânio: Urânio-238 (99,3% na natureza, fértil) e Urânio-235 (0,7% na natureza, físsil com nêutrons térmicos).',
      'Isótopos Radioativos (Radioisótopos): Possuem núcleos instáveis que decaem com o tempo emitindo partículas ou ondas eletromagnéticas.',
      'Enriquecimento de Urânio: Processo físico de separação isotópica (por centrifugação gasosa) para elevar a concentração de U-235 de 0,7% para 3-5% (uso em usinas civis).'
    ],
    details: 'Enquanto as propriedades químicas de todos os isótopos de um elemento são quase idênticas (pois dependem dos elétrons de valência), suas propriedades nucleares — como probabilidade de fissão e meia-vida — são radicalmente distintas.',
    formula: '^{A}_{Z}\\text{X}',
    formulaExplanation: 'Notação nuclear padrão onde X é o símbolo químico, Z o número atômico e A o número de massa.'
  },
  {
    id: 'radioatividade-decaimento',
    title: 'Radioatividade e Decaimento',
    subtitle: 'A transformação espontânea de núcleos atômicos instáveis',
    summary: 'A radioatividade é o processo natural e espontâneo pelo qual um núcleo instável emite radiação ionizante para atingir um estado de menor energia.',
    keyPoints: [
      'Decaimento Alfa (α): Emissão de um núcleo de Hélio-4 (2 prótons e 2 nêutrons). Reduz Z em 2 e A em 4.',
      'Decaimento Beta (β⁻/β⁺): Transformação de um nêutron em próton (β⁻, elétron + antineutrino) ou próton em nêutron (β⁺, pósitron + neutrino).',
      'Emissão Gama (γ): Liberação de fótons eletromagnéticos de alta frequência a partir de um núcleo excitado, sem alterar Z ou A.',
      'Meia-Vida (T½): Tempo necessário para que metade dos átomos radioativos de uma amostra decaia espontaneamente.',
      'Séries Radioativas Naturais: Cadeias de decaimentos sucessivos (ex: Série do Urânio-238 terminando no Chumbo-206 estável).'
    ],
    details: 'A taxa de desintegração de uma substância radioativa é expressa em Becquerel (1 Bq = 1 desintegração por segundo) ou Curie (1 Ci = 3,7 × 10¹⁰ Bq). O decaimento é estocástico no nível individual, mas segue uma lei matemática exponencial precisa no nível estatístico.',
    formula: 'N(t) = N_0 \\cdot e^{-\\lambda t} = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t / T_{1/2}}',
    formulaExplanation: 'Equação fundamental do decaimento radioativo com constante de desintegração λ e meia-vida T½.'
  },
  {
    id: 'fissao-nuclear',
    title: 'Fissão Nuclear e Reação em Cadeia',
    subtitle: 'A divisão de núcleos pesados e a liberação de energia cinética',
    summary: 'Fissão é o processo no qual um núcleo pesado e instável se divide em dois ou mais fragmentos menores após capturar um nêutron, liberando energia e novos nêutrons.',
    keyPoints: [
      'Reação Típica: n + ²³⁵U → [²³⁶U]* → ¹⁴¹Ba + ⁹²Kr + 3 n + 200 MeV.',
      'Defeito de Massa: A soma das massas dos produtos finais é ligeiramente menor que a massa inicial. A massa que "desaparece" é convertida em energia pura (E = Δm · c²).',
      'Nêutrons Secundários: Cada fissão libera em média 2 a 3 nêutrons rápidos com energia de ~2 MeV.',
      'Fator de Multiplicação (k): k < 1 (subcrítico, a reação cessa); k = 1 (crítico, reação controlada e estável em usinas); k > 1 (supercrítico, reação exponencial).',
      'Moderação de Nêutrons: Uso de água leve, água pesada ou grafite para desacelerar nêutrons rápidos para níveis térmicos (~0,025 eV), aumentando drasticamente a chance de captura pelo U-235.'
    ],
    details: 'Em 1 grama de Urânio-235, a fissão completa de todos os átomos gera aproximadamente 8,2 × 10¹⁰ Joules de energia — o equivalente à queima de cerca de 3 toneladas de carvão mineral de alta qualidade ou 2.000 litros de gasolina.',
    formula: 'E = \\Delta m \\cdot c^2 \\approx 200\\text{ MeV / fissão}',
    formulaExplanation: 'Conversão da diferença de massa Δm em energia cinética dos fragmentos e radiação gama.'
  },
  {
    id: 'fusao-nuclear',
    title: 'Fusão Nuclear: A Energia das Estrelas',
    subtitle: 'A união de núcleos leves em condições extremas de plasma',
    summary: 'Fusão é o processo no qual dois núcleos atômicos leves se combinam para formar um núcleo mais pesado, liberando quantidades ainda maiores de energia por unidade de massa.',
    keyPoints: [
      'Reação Deutério-Trítio (D-T): ²H + ³H → ⁴He (3,5 MeV) + n (14,1 MeV) + 17,6 MeV.',
      'Ocorrência nas Estrelas: No centro do Sol, sob temperaturas de ~15 milhões de °C e pressões imensas, o hidrogênio se funde em hélio pelo ciclo próton-próton.',
      'A Barreira Coulombiana: Para que os núcleos se aproximem até o alcance da Força Forte (~10⁻¹⁵ m), é preciso superar a repulsão eletrostática através de energia cinética térmica extrema (> 100 milhões de °C).',
      'Vantagens Físicas: Combustível praticamente inesgotável (Deutério na água do mar), ausência de lixo radioativo de longa vida na reação principal e impossibilidade física de fusão descontrolada ("meltdown").',
      'Desafios Tecnológicos: Confinamento magnético em Tokamaks (como o projeto internacional ITER) ou confinamento inercial por lasers de alta potência (NIF).'
    ],
    details: 'A fusão nuclear D-T gera quase 4 vezes mais energia por grama de combustível do que a fissão do urânio e não gera emissões diretas de gases de efeito estufa.',
    formula: '^2_1\\text{H} + ^3_1\\text{H} \\rightarrow ^4_2\\text{He} + ^1_0\\text{n} + 17.6\\text{ MeV}',
    formulaExplanation: 'Reação de fusão termonuclear mais acessível termodinamicamente para reatores terrestres.'
  }
];

export const radiationTypes: RadiationType[] = [
  {
    name: 'Partícula Alfa',
    symbol: 'α (⁴₂He²⁺)',
    nature: 'Núcleo de Hélio (2 prótons + 2 nêutrons)',
    charge: '+2e',
    mass: 'Pesada (4 u ≈ 6,64 × 10⁻²⁷ kg)',
    penetration: 'Muito Baixa (poucos centímetros no ar)',
    shieldingMaterial: 'Uma folha de papel comum ou a camada externa morta da pele humana',
    biologicalRisk: 'Baixo se externa; Extremamente perigosa se inalada ou ingerida (alto poder ionizante local)',
    medicalApplications: [
      'Terapia Alfa Dirigida (TAT) para destruir micrometástases de câncer',
      'Rádio-223 no tratamento de metástases ósseas',
      'Detectores de fumaça iônicos (Amerício-241)'
    ]
  },
  {
    name: 'Partícula Beta',
    symbol: 'β⁻ (elétron) / β⁺ (pósitron)',
    nature: 'Elétron ou pósitron de alta velocidade ejetado do núcleo',
    charge: '-1e (β⁻) ou +1e (β⁺)',
    mass: 'Muito Leve (~1/1836 u ≈ 9,11 × 10⁻³¹ kg)',
    penetration: 'Média (alguns metros no ar, mm em tecido vivo)',
    shieldingMaterial: 'Placa fina de alumínio (2-4 mm) ou acrílico/plástico espesso',
    biologicalRisk: 'Pode penetrar a epiderme viva causando queimaduras cutâneas por radiação e danos no DNA',
    medicalApplications: [
      'Iodo-131 para tratamento de tireoide e hipertireoidismo',
      'Estrôncio-89 e Ítrio-90 para radioterapia interna seletiva (SIRT)',
      'PET-Scan utilizando pósitrons (Flúor-18)'
    ]
  },
  {
    name: 'Radiação Gama',
    symbol: 'γ (fóton)',
    nature: 'Onda eletromagnética de frequência ultra-alta e comprimento de onda subnanométrico',
    charge: '0 (Neutro)',
    mass: 'Sem massa de repouso (fóton de energia pura)',
    penetration: 'Altíssima (atravessa corpos humanos, paredes e estruturas metálicas)',
    shieldingMaterial: 'Camadas espessas de chumbo de alta densidade, blocos maciços de concreto ou água profunda',
    biologicalRisk: 'Alto risco de irradiação de corpo inteiro; danifica moléculas orgânicas e quebra fitas duplas de DNA',
    medicalApplications: [
      'Radioterapia com aceleradores lineares e facas gama (Gamma Knife)',
      'Tecnécio-99m em cintilografias e diagnósticos por imagem SPECT',
      'Esterilização industrial de equipamentos cirúrgicos e alimentos'
    ]
  },
  {
    name: 'Radiação por Nêutrons',
    symbol: 'n⁰',
    nature: 'Nêutrons livres de alta energia (térmicos a rápidos) liberados em fissão/fusão',
    charge: '0 (Neutro)',
    mass: 'Pesada (1 u ≈ 1,67 × 10⁻²⁷ kg)',
    penetration: 'Extremamente Alta (não interage com elétrons por carga, apenas colisões nucleares)',
    shieldingMaterial: 'Materiais ricos em hidrogênio (água, parafina, polietileno) seguidos por boro ou cádmio',
    biologicalRisk: 'Severo; causa ativação radioativa de tecidos vivos (transforma núcleos estáveis em radioativos) e grande quebra molecular',
    medicalApplications: [
      'Terapia por Captura de Nêutrons em Boro (BNCT) para glioblastomas cerebrais',
      'Radiografia e tomografia por nêutrons em ciência de materiais',
      'Sondas de perfilagem geofísica em poços de petróleo e água'
    ]
  }
];

export interface FissionFusionComparisonItem {
  attribute: string;
  fission: string;
  fusion: string;
  verdict: string;
}

export const fissionFusionComparison: FissionFusionComparisonItem[] = [
  {
    attribute: 'Conceito Fundamental',
    fission: 'Divisão de um núcleo atômico pesado em núcleos mais leves.',
    fusion: 'União de dois núcleos atômicos leves para formar um mais pesado.',
    verdict: 'Processos físicos opostos, ambos convertem defeito de massa em energia.'
  },
  {
    attribute: 'Combustível Típico',
    fission: 'Isótopos pesados: Urânio-235 (²³⁵U) e Plutônio-239 (²³⁹Pu).',
    fusion: 'Isótopos leves de hidrogênio: Deutério (²H) e Trítio (³H).',
    verdict: 'O combustível de fusão é abundante na água do mar (deutério) e no lítio (trítio).'
  },
  {
    attribute: 'Condições Operacionais',
    fission: 'Ocorre em temperatura ambiente ou moderada; requer moderação e controle de nêutrons.',
    fusion: 'Requer temperaturas superiores a 100-150 milhões de °C e pressão extrema para formar plasma.',
    verdict: 'A fissão é simples de iniciar e manter; a fusão é um dos maiores desafios de engenharia da humanidade.'
  },
  {
    attribute: 'Rendimento Energético por Grama',
    fission: '~8,2 × 10¹⁰ J/g (~24.000 kWh/g de U-235).',
    fusion: '~3,4 × 10¹¹ J/g (~94.000 kWh/g de D-T) — cerca de 4x superior à fissão.',
    verdict: 'A fusão é a reação termodinamicamente mais energética conhecida para massas leves.'
  },
  {
    attribute: 'Ocorrência Natural',
    fission: 'Extremamente rara na natureza atual (ex: reator fóssil natural de Oklo no Gabão há 2 bilhões de anos).',
    fusion: 'É o motor dominante do Universo: alimenta o Sol e todas as estrelas ativas.',
    verdict: 'A fusão é o processo cósmico primordial que forjou todos os elementos químicos.'
  },
  {
    attribute: 'Subprodutos e Rejeitos',
    fission: 'Produtos de fissão radioativos (Césio-137, Estrôncio-90) e actinídeos de vida longa que requerem repositórios geológicos profundos.',
    fusion: 'Hélio-4 não radioativo (gás nobre) e nêutrons. Não produz actinídeos de alta atividade.',
    verdict: 'A fusão produz subprodutos limpos, com ativação apenas estrutural dos materiais do reator.'
  },
  {
    attribute: 'Segurança Operacional',
    fission: 'Risco de superaquecimento e fusão do núcleo se o resfriamento falhar por longo período.',
    fusion: 'Segurança intrínseca total: qualquer perturbação no plasma faz a reação cessar instantaneamente em microssegundos.',
    verdict: 'Impossibilidade física de acidente do tipo "Chernobyl" ou "Fukushima" em reatores de fusão.'
  },
  {
    attribute: 'Maturidade Tecnológica',
    fission: 'Comercialmente madura desde a década de 1950 (~440 reatores gerando ~10% da eletricidade global).',
    fusion: 'Em fase de pesquisa avançada e protótipos experimentais (ITER, SPARC, NIF, JET).',
    verdict: 'Fissão é a solução presente; fusão é a promessa limpa para a segunda metade do século XXI.'
  }
];
