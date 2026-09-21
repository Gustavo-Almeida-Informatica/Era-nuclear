export interface FalloutContourDetails {
  lengthKm: number;
  maxHalfWidthKm: number;
}

export interface BombFalloutProfile {
  fissionPercentage: number;
  cloudTopKm: number;
  cloudStemRadiusM: number;
  surfaceContours: {
    rad1000: FalloutContourDetails;
    rad300: FalloutContourDetails;
    rad100: FalloutContourDetails;
    rad10: FalloutContourDetails;
  };
  historicalFalloutContext: string;
}

export interface NuclearBombRanking {
  id: string;
  name: string;
  code: string;
  yieldKt: number;
  yieldDisplay: string;
  country: string;
  countryCode: 'US' | 'RU' | 'SU';
  year: number;
  type: string;
  carrier: string;
  description: string;
  fireballRadiusM: number;
  vaporizationRadiusM: number;
  carbonizationRadiusM: number;
  heavyBlastRadiusM: number;
  thermalRadiusM: number;
  lightBlastRadiusM: number;
  mushroomCloudHeightKm: number;
  mushroomCloudCapDiameterKm: number;
  badgeColor: string;
  fallout: BombFalloutProfile;
}

export interface TargetCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  populationEstimate: string;
  urbanPopulation?: number;
  metroPopulation?: number;
  coreDensityPerKm2?: number;
  metroDensityPerKm2?: number;
  isHighlighted?: boolean;
  highlightTag?: string;
  landmark?: string;
}

export const TARGET_CITIES: TargetCity[] = [
  {
    id: 'washington',
    name: 'Washington D.C.',
    country: 'Estados Unidos',
    lat: 38.8951,
    lng: -77.0364,
    description: 'Capital dos EUA, centro de comando político e militar supremo (Pentágono e Casa Branca). Alvo de primária prioridade em doutrinas estratégicas.',
    populationEstimate: '~700 mil (área metropolitana: 6,3 milhões)',
    urbanPopulation: 700000,
    metroPopulation: 6300000,
    coreDensityPerKm2: 4450,
    metroDensityPerKm2: 650,
    isHighlighted: true,
    highlightTag: 'Capital dos EUA / Pentágono',
    landmark: 'Casa Branca & Pentágono'
  },
  {
    id: 'moscow',
    name: 'Moscou',
    country: 'Rússia',
    lat: 55.7558,
    lng: 37.6173,
    description: 'Capital da Federação Russa, sede do Kremlin e centro nevrálgico político e militar das Forças de Foguetes Estratégicos.',
    populationEstimate: '~13 milhões',
    urbanPopulation: 13100000,
    metroPopulation: 20000000,
    coreDensityPerKm2: 5100,
    metroDensityPerKm2: 1200,
    isHighlighted: true,
    highlightTag: 'Capital da Rússia / Kremlin',
    landmark: 'Praça Vermelha & Kremlin'
  },
  {
    id: 'hiroshima',
    name: 'Hiroshima',
    country: 'Japão',
    lat: 34.3853,
    lng: 132.4553,
    description: 'Primeira cidade na história humana a sofrer um ataque atômico, em 6 de agosto de 1945, pela bomba "Little Boy" de urânio lançada pelo B-29 Enola Gay.',
    populationEstimate: '~1,2 milhão',
    urbanPopulation: 1200000,
    metroPopulation: 1450000,
    coreDensityPerKm2: 2800,
    metroDensityPerKm2: 950,
    isHighlighted: true,
    highlightTag: 'Alvo Little Boy (06/08/1945)',
    landmark: 'Cúpula Genbaku (Memorial da Paz)'
  },
  {
    id: 'nagasaki',
    name: 'Nagasaki',
    country: 'Japão',
    lat: 32.7503,
    lng: 129.8777,
    description: 'Segunda cidade alvo de bombardeio atômico em 9 de agosto de 1945, detonada pela arma de implosão de plutônio "Fat Man" lançada pelo B-29 Bockscar.',
    populationEstimate: '~410 mil',
    urbanPopulation: 410000,
    metroPopulation: 530000,
    coreDensityPerKm2: 1800,
    metroDensityPerKm2: 850,
    isHighlighted: true,
    highlightTag: 'Alvo Fat Man (09/08/1945)',
    landmark: 'Parque Memorial da Paz de Nagasaki'
  },
  {
    id: 'beijing',
    name: 'Pequim',
    country: 'China',
    lat: 39.9042,
    lng: 116.4074,
    description: 'Capital da República Popular da China, sede do governo central e polo estratégico da potência nuclear asiática.',
    populationEstimate: '~21,5 milhões',
    urbanPopulation: 21800000,
    metroPopulation: 25000000,
    coreDensityPerKm2: 5200,
    metroDensityPerKm2: 1400,
    isHighlighted: true,
    highlightTag: 'Capital da China / Potência Nuclear',
    landmark: 'Praça da Paz Celestial & Zhongnanhai'
  },
  {
    id: 'bikini-atoll',
    name: 'Atol de Bikini',
    country: 'Ilhas Marshall',
    lat: 11.6065,
    lng: 165.3769,
    description: 'Principal atol de testes nucleares dos EUA no Oceano Pacífico (1946–1958). Palco da Operação Crossroads (testes Able e Baker) e da detonação da arma termonuclear Castle Bravo (15 Mt em 1954), provocando severa contaminação radioativa e a evacuação forçada da população nativa.',
    populationEstimate: '~0 hab (Zona Histórica de Testes / Patrimônio UNESCO)',
    urbanPopulation: 0,
    metroPopulation: 0,
    coreDensityPerKm2: 0,
    metroDensityPerKm2: 0,
    isHighlighted: true,
    highlightTag: 'Testes Castle Bravo (15 Mt) & Crossroads',
    landmark: 'Cratera de Castle Bravo & Lagoa de Bikini'
  },
  {
    id: 'novaya-zemlya',
    name: 'Novaya Zemlya',
    country: 'Rússia',
    lat: 73.8500,
    lng: 54.5000,
    description: 'Arquipélago no Oceano Ártico que serviu como o principal campo soviético de ensaios nucleares de megatonelagem. Em 30 de outubro de 1961, foi o local da detonação da Tsar Bomba (50 Megatons / RDS-220), a mais potente explosão atômica da história da humanidade.',
    populationEstimate: '~2.500 hab (Base Militar Ártica de Rogachevo)',
    urbanPopulation: 500,
    metroPopulation: 2500,
    coreDensityPerKm2: 1,
    metroDensityPerKm2: 0.1,
    isHighlighted: true,
    highlightTag: 'Local da Tsar Bomba (50 Mt - 30/10/1961)',
    landmark: 'Península de Sukhoy Nos & Estreito de Matochkin'
  },
  {
    id: 'nevada-test-site',
    name: 'Local de Testes de Nevada',
    country: 'Estados Unidos',
    lat: 37.1167,
    lng: -116.0500,
    description: 'Principal campo de testes nucleares continentais dos EUA (Nevada National Security Site - NTS), localizado a 105 km a noroeste de Las Vegas. Entre 1951 e 1992, sediou 928 testes nucleares (100 atmosféricos e 828 subterrâneos, incluindo a impressionante Cratera Sedan).',
    populationEstimate: '~0 residentes (Área Militar e Científica Restrita DoE)',
    urbanPopulation: 0,
    metroPopulation: 0,
    coreDensityPerKm2: 0,
    metroDensityPerKm2: 0,
    isHighlighted: true,
    highlightTag: '928 Testes Nucleares dos EUA (1951–1992)',
    landmark: 'Cratera Sedan & Yucca Flat'
  },
  {
    id: 'semipalatinsk',
    name: 'Local de Testes de Semipalatinsk',
    country: 'Cazaquistão',
    lat: 50.0000,
    lng: 78.4333,
    description: 'Maior e mais secreto centro de ensaios de armas nucleares da União Soviética ("O Polígono"). Foi o palco do primeiro teste atômico soviético RDS-1 em 1949 e do teste termonuclear RDS-6s em 1953, acumulando 456 explosões atômicas até sua desativação.',
    populationEstimate: '~0 hab (Antigo Polígono Militar Soviético)',
    urbanPopulation: 0,
    metroPopulation: 10000,
    coreDensityPerKm2: 0,
    metroDensityPerKm2: 0.1,
    isHighlighted: true,
    highlightTag: 'O Polígono Soviético (456 Testes - RDS-1)',
    landmark: 'Campo Experimental & Lago Atômico Chagan'
  }
];

export const HISTORIC_NUCLEAR_TEST_SITES: TargetCity[] = TARGET_CITIES.slice(5);

export const WORLD_PRESET_CITIES: TargetCity[] = [
  ...TARGET_CITIES,
  {
    id: 'sao-paulo',
    name: 'São Paulo',
    country: 'Brasil',
    lat: -23.5505,
    lng: -46.6333,
    description: 'Maior metrópole da América do Sul e principal centro financeiro e populacional do Brasil.',
    populationEstimate: '~12,3 milhões (metrópole: 22 milhões)',
    urbanPopulation: 12300000,
    metroPopulation: 22000000,
    coreDensityPerKm2: 8100,
    metroDensityPerKm2: 2800
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brasil',
    lat: -22.9068,
    lng: -43.1729,
    description: 'Grande centro metropolitano costeiro histórico do Brasil, polo cultural e energético.',
    populationEstimate: '~6,7 milhões',
    urbanPopulation: 6700000,
    metroPopulation: 13000000,
    coreDensityPerKm2: 5600,
    metroDensityPerKm2: 1800
  },
  {
    id: 'brasilia',
    name: 'Brasília',
    country: 'Brasil',
    lat: -15.7975,
    lng: -47.8919,
    description: 'Capital federal do Brasil, sede dos Três Poderes da República.',
    populationEstimate: '~3,0 milhões',
    urbanPopulation: 3050000,
    metroPopulation: 4300000,
    coreDensityPerKm2: 2800,
    metroDensityPerKm2: 600
  },
  {
    id: 'new-york',
    name: 'Nova York',
    country: 'Estados Unidos',
    lat: 40.7128,
    lng: -74.006,
    description: 'Maior metrópole e centro financeiro dos Estados Unidos e sede das Nações Unidas.',
    populationEstimate: '~8,3 milhões (área metropolitana: 20 milhões)',
    urbanPopulation: 8400000,
    metroPopulation: 20100000,
    coreDensityPerKm2: 11300,
    metroDensityPerKm2: 2200
  },
  {
    id: 'london',
    name: 'Londres',
    country: 'Reino Unido',
    lat: 51.5074,
    lng: -0.1278,
    description: 'Capital do Reino Unido, histórico centro diplomático e potência integrante da OTAN.',
    populationEstimate: '~8,9 milhões',
    urbanPopulation: 8900000,
    metroPopulation: 14800000,
    coreDensityPerKm2: 5700,
    metroDensityPerKm2: 1600
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'França',
    lat: 48.8566,
    lng: 2.3522,
    description: 'Capital da França, potência com força nuclear independente ("Force de frappe").',
    populationEstimate: '~2,1 milhões (metrópole: 12 milhões)',
    urbanPopulation: 2160000,
    metroPopulation: 12400000,
    coreDensityPerKm2: 20500,
    metroDensityPerKm2: 3500
  },
  {
    id: 'berlin',
    name: 'Berlim',
    country: 'Alemanha',
    lat: 52.52,
    lng: 13.405,
    description: 'Capital da Alemanha, antigo epicentro da divisão da Guerra Fria e do Muro de Berlim.',
    populationEstimate: '~3,7 milhões',
    urbanPopulation: 3750000,
    metroPopulation: 6100000,
    coreDensityPerKm2: 4250,
    metroDensityPerKm2: 1100
  },
  {
    id: 'tokyo',
    name: 'Tóquio',
    country: 'Japão',
    lat: 35.6762,
    lng: 139.6503,
    description: 'Maior aglomeração urbana do planeta e capital do Japão.',
    populationEstimate: '~14 milhões (Grande Tóquio: 37 milhões)',
    urbanPopulation: 14100000,
    metroPopulation: 37400000,
    coreDensityPerKm2: 6400,
    metroDensityPerKm2: 4100
  },
  {
    id: 'kyiv',
    name: 'Kiev',
    country: 'Ucrânia',
    lat: 50.4501,
    lng: 30.5234,
    description: 'Capital da Ucrânia, ponto focal da geopolítica europeia e da segurança nuclear contemporânea.',
    populationEstimate: '~2,9 milhões',
    urbanPopulation: 2950000,
    metroPopulation: 4000000,
    coreDensityPerKm2: 3550,
    metroDensityPerKm2: 900
  },
  {
    id: 'seoul',
    name: 'Seul',
    country: 'Coreia do Sul',
    lat: 37.5665,
    lng: 126.978,
    description: 'Capital da Coreia do Sul, localizada a poucos quilômetros da zona desmilitarizada com a Coreia do Norte.',
    populationEstimate: '~9,7 milhões (metrópole: 25 milhões)',
    urbanPopulation: 9700000,
    metroPopulation: 26000000,
    coreDensityPerKm2: 15800,
    metroDensityPerKm2: 4500
  },
  {
    id: 'cairo',
    name: 'Cairo',
    country: 'Egito',
    lat: 30.0444,
    lng: 31.2357,
    description: 'Maior metrópole do Oriente Médio e do mundo árabe, situada às margens do Rio Nilo.',
    populationEstimate: '~10 milhões (metrópole: 21 milhões)',
    urbanPopulation: 10100000,
    metroPopulation: 22000000,
    coreDensityPerKm2: 19300,
    metroDensityPerKm2: 4800
  },
  {
    id: 'tel-aviv',
    name: 'Tel Aviv',
    country: 'Israel',
    lat: 32.0853,
    lng: 34.7818,
    description: 'Principal centro econômico e tecnológico de Israel.',
    populationEstimate: '~460 mil (área metropolitana: 4 milhões)',
    urbanPopulation: 470000,
    metroPopulation: 4050000,
    coreDensityPerKm2: 9100,
    metroDensityPerKm2: 2700
  },
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    country: 'Argentina',
    lat: -34.6037,
    lng: -58.3816,
    description: 'Capital da Argentina e importante metrópole da Bacia do Prata.',
    populationEstimate: '~3,1 milhões (área metropolitana: 15 milhões)',
    urbanPopulation: 3120000,
    metroPopulation: 15600000,
    coreDensityPerKm2: 15100,
    metroDensityPerKm2: 2900
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Austrália',
    lat: -33.8688,
    lng: 151.2093,
    description: 'Maior cidade da Austrália e principal centro financeiro da Oceania.',
    populationEstimate: '~5,3 milhões',
    urbanPopulation: 5300000,
    metroPopulation: 5800000,
    coreDensityPerKm2: 1350,
    metroDensityPerKm2: 850
  },
  {
    id: 'belo-horizonte',
    name: 'Belo Horizonte',
    country: 'Brasil',
    lat: -19.9167,
    lng: -43.9345,
    description: 'Capital de Minas Gerais, polo industrial e terceira maior aglomeração metropolitana do Brasil.',
    populationEstimate: '~2,5 milhões (metrópole: 6,0 milhões)',
    urbanPopulation: 2530000,
    metroPopulation: 6000000,
    coreDensityPerKm2: 7350,
    metroDensityPerKm2: 1850
  },
  {
    id: 'salvador',
    name: 'Salvador',
    country: 'Brasil',
    lat: -12.9777,
    lng: -38.5016,
    description: 'Primeira capital histórica do Brasil e maior metrópole do Nordeste brasileiro.',
    populationEstimate: '~2,9 milhões (metrópole: 4,0 milhões)',
    urbanPopulation: 2900000,
    metroPopulation: 4000000,
    coreDensityPerKm2: 4100,
    metroDensityPerKm2: 1350
  },
  {
    id: 'curitiba',
    name: 'Curitiba',
    country: 'Brasil',
    lat: -25.429,
    lng: -49.2671,
    description: 'Capital do Paraná, referência em planejamento urbano e polo da Região Sul.',
    populationEstimate: '~1,9 milhão (metrópole: 3,7 milhões)',
    urbanPopulation: 1960000,
    metroPopulation: 3730000,
    coreDensityPerKm2: 4400,
    metroDensityPerKm2: 1100
  },
  {
    id: 'porto-alegre',
    name: 'Porto Alegre',
    country: 'Brasil',
    lat: -30.0346,
    lng: -51.2177,
    description: 'Capital do Rio Grande do Sul e importante centro econômico e portuário do Cone Sul.',
    populationEstimate: '~1,5 milhão (metrópole: 4,4 milhões)',
    urbanPopulation: 1490000,
    metroPopulation: 4400000,
    coreDensityPerKm2: 3100,
    metroDensityPerKm2: 1050
  },
  {
    id: 'recife',
    name: 'Recife',
    country: 'Brasil',
    lat: -8.0476,
    lng: -34.877,
    description: 'Capital de Pernambuco, metrópole litorânea densamente povoada e polo tecnológico do Nordeste.',
    populationEstimate: '~1,6 milhão (metrópole: 4,1 milhões)',
    urbanPopulation: 1660000,
    metroPopulation: 4100000,
    coreDensityPerKm2: 7600,
    metroDensityPerKm2: 1900
  },
  {
    id: 'fortaleza',
    name: 'Fortaleza',
    country: 'Brasil',
    lat: -3.7319,
    lng: -38.5267,
    description: 'Capital do Ceará, uma das capitais de maior densidade populacional do Brasil.',
    populationEstimate: '~2,7 milhões (metrópole: 4,2 milhões)',
    urbanPopulation: 2700000,
    metroPopulation: 4200000,
    coreDensityPerKm2: 8700,
    metroDensityPerKm2: 2050
  },
  {
    id: 'manaus',
    name: 'Manaus',
    country: 'Brasil',
    lat: -3.119,
    lng: -60.0217,
    description: 'Metrópole da Amazônia brasileira, centro financeiro e Polo Industrial da Zona Franca de Manaus.',
    populationEstimate: '~2,2 milhões',
    urbanPopulation: 2250000,
    metroPopulation: 2750000,
    coreDensityPerKm2: 2100,
    metroDensityPerKm2: 550
  },
  {
    id: 'goiania',
    name: 'Goiânia',
    country: 'Brasil',
    lat: -16.6869,
    lng: -49.2648,
    description: 'Capital de Goiás e centro do agronegócio e desenvolvimento do Centro-Oeste brasileiro.',
    populationEstimate: '~1,5 milhão (metrópole: 2,6 milhões)',
    urbanPopulation: 1550000,
    metroPopulation: 2600000,
    coreDensityPerKm2: 2100,
    metroDensityPerKm2: 700
  },
  {
    id: 'belem',
    name: 'Belém',
    country: 'Brasil',
    lat: -1.4558,
    lng: -48.5044,
    description: 'Metrópole portuária da foz amazônica e capital do Pará.',
    populationEstimate: '~1,5 milhão (metrópole: 2,5 milhões)',
    urbanPopulation: 1500000,
    metroPopulation: 2500000,
    coreDensityPerKm2: 1400,
    metroDensityPerKm2: 600
  },
  {
    id: 'lisboa',
    name: 'Lisboa',
    country: 'Portugal',
    lat: 38.7223,
    lng: -9.1393,
    description: 'Capital de Portugal e histórica porta de entrada marítima europeia.',
    populationEstimate: '~550 mil (metrópole: 2,9 milhões)',
    urbanPopulation: 550000,
    metroPopulation: 2900000,
    coreDensityPerKm2: 5450,
    metroDensityPerKm2: 950
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'Espanha',
    lat: 40.4168,
    lng: -3.7038,
    description: 'Capital da Espanha, polo geopolítico e financeiro da Península Ibérica.',
    populationEstimate: '~3,3 milhões (metrópole: 6,7 milhões)',
    urbanPopulation: 3300000,
    metroPopulation: 6700000,
    coreDensityPerKm2: 5500,
    metroDensityPerKm2: 1250
  },
  {
    id: 'rome',
    name: 'Roma',
    country: 'Itália',
    lat: 41.9028,
    lng: 12.4964,
    description: 'Capital da Itália e sede histórica da Cidade do Vaticano.',
    populationEstimate: '~2,8 milhões (metrópole: 4,3 milhões)',
    urbanPopulation: 2800000,
    metroPopulation: 4300000,
    coreDensityPerKm2: 2250,
    metroDensityPerKm2: 800
  },
  {
    id: 'los-angeles',
    name: 'Los Angeles',
    country: 'Estados Unidos',
    lat: 34.0522,
    lng: -118.2437,
    description: 'Segunda maior metrópole dos EUA e centro global da Costa Oeste.',
    populationEstimate: '~3,9 milhões (metrópole: 13,2 milhões)',
    urbanPopulation: 3900000,
    metroPopulation: 13200000,
    coreDensityPerKm2: 3300,
    metroDensityPerKm2: 1100
  },
  {
    id: 'chicago',
    name: 'Chicago',
    country: 'Estados Unidos',
    lat: 41.8781,
    lng: -87.6298,
    description: 'Terceira maior cidade dos EUA, polo industrial e logístico dos Grandes Lagos.',
    populationEstimate: '~2,7 milhões (metrópole: 9,6 milhões)',
    urbanPopulation: 2700000,
    metroPopulation: 9600000,
    coreDensityPerKm2: 4600,
    metroDensityPerKm2: 1300
  },
  {
    id: 'mexico-city',
    name: 'Cidade do México',
    country: 'México',
    lat: 19.4326,
    lng: -99.1332,
    description: 'Capital do México e uma das maiores aglomerações urbanas do hemisfério ocidental.',
    populationEstimate: '~9,2 milhões (metrópole: 22 milhões)',
    urbanPopulation: 9200000,
    metroPopulation: 22000000,
    coreDensityPerKm2: 6000,
    metroDensityPerKm2: 2100
  },
  {
    id: 'new-delhi',
    name: 'Nova Déli',
    country: 'Índia',
    lat: 28.6139,
    lng: 77.209,
    description: 'Capital da Índia, potência nuclear asiática com densidade populacional massiva.',
    populationEstimate: '~16,8 milhões (metrópole: 33 milhões)',
    urbanPopulation: 16800000,
    metroPopulation: 33000000,
    coreDensityPerKm2: 11300,
    metroDensityPerKm2: 3600
  },
  {
    id: 'tehran',
    name: 'Teerã',
    country: 'Irã',
    lat: 35.6892,
    lng: 51.389,
    description: 'Capital da República Islâmica do Irã, epicentro político e geoestratégico no Oriente Médio.',
    populationEstimate: '~9,0 milhões (metrópole: 16 milhões)',
    urbanPopulation: 9000000,
    metroPopulation: 16000000,
    coreDensityPerKm2: 11800,
    metroDensityPerKm2: 2800
  }
];

// Dicionário de normalização demográfica para cidades do Brasil e do mundo
const DEMOGRAPHIC_DATABASE: Array<{
  matchKeys: string[];
  name: string;
  country: string;
  populationEstimate: string;
  urbanPop: number;
  metroPop: number;
  coreDensity: number;
  metroDensity: number;
}> = [
  { matchKeys: ['sao paulo', 'são paulo', 'sp'], name: 'São Paulo', country: 'Brasil', populationEstimate: '~12,3M (Metrópole: 22M)', urbanPop: 12300000, metroPop: 22000000, coreDensity: 8100, metroDensity: 2800 },
  { matchKeys: ['rio de janeiro', 'rio', 'rj'], name: 'Rio de Janeiro', country: 'Brasil', populationEstimate: '~6,7M (Metrópole: 13M)', urbanPop: 6700000, metroPop: 13000000, coreDensity: 5600, metroDensity: 1800 },
  { matchKeys: ['brasilia', 'brasília', 'df'], name: 'Brasília', country: 'Brasil', populationEstimate: '~3,0M (Metrópole: 4,3M)', urbanPop: 3050000, metroPop: 4300000, coreDensity: 2800, metroDensity: 600 },
  { matchKeys: ['salvador', 'salvador da bahia', 'ba'], name: 'Salvador', country: 'Brasil', populationEstimate: '~2,9M (Metrópole: 4,0M)', urbanPop: 2900000, metroPop: 4000000, coreDensity: 4100, metroDensity: 1350 },
  { matchKeys: ['fortaleza', 'ce'], name: 'Fortaleza', country: 'Brasil', populationEstimate: '~2,7M (Metrópole: 4,2M)', urbanPop: 2700000, metroPop: 4200000, coreDensity: 8700, metroDensity: 2050 },
  { matchKeys: ['belo horizonte', 'bh', 'mg'], name: 'Belo Horizonte', country: 'Brasil', populationEstimate: '~2,5M (Metrópole: 6,0M)', urbanPop: 2530000, metroPop: 6000000, coreDensity: 7350, metroDensity: 1850 },
  { matchKeys: ['manaus', 'am'], name: 'Manaus', country: 'Brasil', populationEstimate: '~2,2M (Metrópole: 2,7M)', urbanPop: 2250000, metroPop: 2750000, coreDensity: 2100, metroDensity: 550 },
  { matchKeys: ['curitiba', 'pr'], name: 'Curitiba', country: 'Brasil', populationEstimate: '~1,9M (Metrópole: 3,7M)', urbanPop: 1960000, metroPop: 3730000, coreDensity: 4400, metroDensity: 1100 },
  { matchKeys: ['recife', 'pe'], name: 'Recife', country: 'Brasil', populationEstimate: '~1,6M (Metrópole: 4,1M)', urbanPop: 1660000, metroPop: 4100000, coreDensity: 7600, metroDensity: 1900 },
  { matchKeys: ['goiania', 'goiânia', 'go'], name: 'Goiânia', country: 'Brasil', populationEstimate: '~1,5M (Metrópole: 2,6M)', urbanPop: 1550000, metroPop: 2600000, coreDensity: 2100, metroDensity: 700 },
  { matchKeys: ['porto alegre', 'poa', 'rs'], name: 'Porto Alegre', country: 'Brasil', populationEstimate: '~1,5M (Metrópole: 4,4M)', urbanPop: 1490000, metroPop: 4400000, coreDensity: 3100, metroDensity: 1050 },
  { matchKeys: ['belem', 'belém', 'pa'], name: 'Belém', country: 'Brasil', populationEstimate: '~1,5M (Metrópole: 2,5M)', urbanPop: 1500000, metroPop: 2500000, coreDensity: 1400, metroDensity: 600 },
  { matchKeys: ['campinas'], name: 'Campinas', country: 'Brasil', populationEstimate: '~1,2M (Metrópole: 3,3M)', urbanPop: 1220000, metroPop: 3300000, coreDensity: 1550, metroDensity: 850 },
  { matchKeys: ['sao luis', 'são luís'], name: 'São Luís', country: 'Brasil', populationEstimate: '~1,1M (Metrópole: 1,6M)', urbanPop: 1100000, metroPop: 1600000, coreDensity: 1300, metroDensity: 550 },
  { matchKeys: ['maceio', 'maceió'], name: 'Maceió', country: 'Brasil', populationEstimate: '~1,0M', urbanPop: 1030000, metroPop: 1300000, coreDensity: 2000, metroDensity: 700 },
  { matchKeys: ['natal'], name: 'Natal', country: 'Brasil', populationEstimate: '~900 mil', urbanPop: 890000, metroPop: 1500000, coreDensity: 5200, metroDensity: 1100 },
  { matchKeys: ['campo grande'], name: 'Campo Grande', country: 'Brasil', populationEstimate: '~900 mil', urbanPop: 910000, metroPop: 1000000, coreDensity: 1100, metroDensity: 300 },
  { matchKeys: ['teresina'], name: 'Teresina', country: 'Brasil', populationEstimate: '~870 mil', urbanPop: 870000, metroPop: 1200000, coreDensity: 630, metroDensity: 250 },
  { matchKeys: ['joao pessoa', 'joão pessoa'], name: 'João Pessoa', country: 'Brasil', populationEstimate: '~830 mil', urbanPop: 830000, metroPop: 1250000, coreDensity: 3900, metroDensity: 900 },
  { matchKeys: ['aracaju'], name: 'Aracaju', country: 'Brasil', populationEstimate: '~670 mil', urbanPop: 670000, metroPop: 1000000, coreDensity: 3700, metroDensity: 800 },
  { matchKeys: ['cuiaba', 'cuiabá'], name: 'Cuiabá', country: 'Brasil', populationEstimate: '~650 mil (Metrópole: 1,0M)', urbanPop: 650000, metroPop: 1050000, coreDensity: 1800, metroDensity: 400 },
  { matchKeys: ['porto velho'], name: 'Porto Velho', country: 'Brasil', populationEstimate: '~540 mil', urbanPop: 540000, metroPop: 600000, coreDensity: 850, metroDensity: 150 },
  { matchKeys: ['florianopolis', 'florianópolis'], name: 'Florianópolis', country: 'Brasil', populationEstimate: '~530 mil (Metrópole: 1,2M)', urbanPop: 530000, metroPop: 1250000, coreDensity: 780, metroDensity: 350 },
  { matchKeys: ['macapa', 'macapá'], name: 'Macapá', country: 'Brasil', populationEstimate: '~520 mil', urbanPop: 520000, metroPop: 650000, coreDensity: 800, metroDensity: 150 },
  { matchKeys: ['rio branco'], name: 'Rio Branco', country: 'Brasil', populationEstimate: '~420 mil', urbanPop: 420000, metroPop: 460000, coreDensity: 480, metroDensity: 120 },
  { matchKeys: ['vitoria', 'vitória'], name: 'Vitória', country: 'Brasil', populationEstimate: '~370 mil (Metrópole: 2,0M)', urbanPop: 370000, metroPop: 2000000, coreDensity: 3800, metroDensity: 1200 },
  { matchKeys: ['boa vista'], name: 'Boa Vista', country: 'Brasil', populationEstimate: '~430 mil', urbanPop: 430000, metroPop: 470000, coreDensity: 750, metroDensity: 100 },
  { matchKeys: ['palmas'], name: 'Palmas', country: 'Brasil', populationEstimate: '~320 mil', urbanPop: 320000, metroPop: 380000, coreDensity: 450, metroDensity: 90 },
  { matchKeys: ['santos'], name: 'Santos', country: 'Brasil', populationEstimate: '~430 mil (Baixada: 1,8M)', urbanPop: 430000, metroPop: 1800000, coreDensity: 1500, metroDensity: 800 },
  { matchKeys: ['new york', 'nova york', 'nyc'], name: 'Nova York', country: 'Estados Unidos', populationEstimate: '~8,3M (Metrópole: 20M)', urbanPop: 8400000, metroPop: 20100000, coreDensity: 11300, metroDensity: 2200 },
  { matchKeys: ['washington', 'washington dc', 'dc'], name: 'Washington D.C.', country: 'Estados Unidos', populationEstimate: '~700 mil (Metrópole: 6,3M)', urbanPop: 700000, metroPop: 6300000, coreDensity: 4450, metroDensity: 650 },
  { matchKeys: ['los angeles', 'la'], name: 'Los Angeles', country: 'Estados Unidos', populationEstimate: '~3,9M (Metrópole: 13,2M)', urbanPop: 3900000, metroPop: 13200000, coreDensity: 3300, metroDensity: 1100 },
  { matchKeys: ['chicago'], name: 'Chicago', country: 'Estados Unidos', populationEstimate: '~2,7M (Metrópole: 9,6M)', urbanPop: 2700000, metroPop: 9600000, coreDensity: 4600, metroDensity: 1300 },
  { matchKeys: ['houston'], name: 'Houston', country: 'Estados Unidos', populationEstimate: '~2,3M (Metrópole: 7,1M)', urbanPop: 2300000, metroPop: 7100000, coreDensity: 1500, metroDensity: 600 },
  { matchKeys: ['miami'], name: 'Miami', country: 'Estados Unidos', populationEstimate: '~450 mil (Metrópole: 6,2M)', urbanPop: 450000, metroPop: 6200000, coreDensity: 4800, metroDensity: 1400 },
  { matchKeys: ['san francisco', 'são francisco'], name: 'São Francisco', country: 'Estados Unidos', populationEstimate: '~870 mil (Bay Area: 7,7M)', urbanPop: 870000, metroPop: 7700000, coreDensity: 7300, metroDensity: 1200 },
  { matchKeys: ['london', 'londres'], name: 'Londres', country: 'Reino Unido', populationEstimate: '~8,9M (Metrópole: 14,8M)', urbanPop: 8900000, metroPop: 14800000, coreDensity: 5700, metroDensity: 1600 },
  { matchKeys: ['paris'], name: 'Paris', country: 'França', populationEstimate: '~2,1M (Metrópole: 12,4M)', urbanPop: 2160000, metroPop: 12400000, coreDensity: 20500, metroDensity: 3500 },
  { matchKeys: ['berlin', 'berlim'], name: 'Berlim', country: 'Alemanha', populationEstimate: '~3,7M (Metrópole: 6,1M)', urbanPop: 3750000, metroPop: 6100000, coreDensity: 4250, metroDensity: 1100 },
  { matchKeys: ['madrid'], name: 'Madrid', country: 'Espanha', populationEstimate: '~3,3M (Metrópole: 6,7M)', urbanPop: 3300000, metroPop: 6700000, coreDensity: 5500, metroDensity: 1250 },
  { matchKeys: ['rome', 'roma'], name: 'Roma', country: 'Itália', populationEstimate: '~2,8M (Metrópole: 4,3M)', urbanPop: 2800000, metroPop: 4300000, coreDensity: 2250, metroDensity: 800 },
  { matchKeys: ['lisbon', 'lisboa'], name: 'Lisboa', country: 'Portugal', populationEstimate: '~550 mil (Metrópole: 2,9M)', urbanPop: 550000, metroPop: 2900000, coreDensity: 5450, metroDensity: 950 },
  { matchKeys: ['porto'], name: 'Porto', country: 'Portugal', populationEstimate: '~230 mil (Metrópole: 1,8M)', urbanPop: 235000, metroPop: 1800000, coreDensity: 5600, metroDensity: 1100 },
  { matchKeys: ['moscow', 'moscou'], name: 'Moscou', country: 'Rússia', populationEstimate: '~13M (Metrópole: 20M)', urbanPop: 13100000, metroPop: 20000000, coreDensity: 5100, metroDensity: 1200 },
  { matchKeys: ['kyiv', 'kiev'], name: 'Kiev', country: 'Ucrânia', populationEstimate: '~2,9M (Metrópole: 4,0M)', urbanPop: 2950000, metroPop: 4000000, coreDensity: 3550, metroDensity: 900 },
  { matchKeys: ['tokyo', 'tóquio'], name: 'Tóquio', country: 'Japão', populationEstimate: '~14M (Metrópole: 37,4M)', urbanPop: 14100000, metroPop: 37400000, coreDensity: 6400, metroDensity: 4100 },
  { matchKeys: ['hiroshima'], name: 'Hiroshima', country: 'Japão', populationEstimate: '~1,2M', urbanPop: 1200000, metroPop: 1450000, coreDensity: 2800, metroDensity: 950 },
  { matchKeys: ['nagasaki'], name: 'Nagasaki', country: 'Japão', populationEstimate: '~410 mil', urbanPop: 410000, metroPop: 530000, coreDensity: 1800, metroDensity: 850 },
  { matchKeys: ['beijing', 'pequim'], name: 'Pequim', country: 'China', populationEstimate: '~21,8M (Metrópole: 25M)', urbanPop: 21800000, metroPop: 25000000, coreDensity: 5200, metroDensity: 1400 },
  { matchKeys: ['shanghai', 'xangai'], name: 'Xangai', country: 'China', populationEstimate: '~24,8M (Metrópole: 28M)', urbanPop: 24800000, metroPop: 28000000, coreDensity: 6800, metroDensity: 2900 },
  { matchKeys: ['seoul', 'seul'], name: 'Seul', country: 'Coreia do Sul', populationEstimate: '~9,7M (Metrópole: 26M)', urbanPop: 9700000, metroPop: 26000000, coreDensity: 15800, metroDensity: 4500 },
  { matchKeys: ['pyongyang', 'pionguiang'], name: 'Pyongyang', country: 'Coreia do Norte', populationEstimate: '~3,0M', urbanPop: 3000000, metroPop: 3300000, coreDensity: 5500, metroDensity: 1200 },
  { matchKeys: ['new delhi', 'nova deli', 'nova déli', 'delhi'], name: 'Nova Déli', country: 'Índia', populationEstimate: '~16,8M (Metrópole: 33M)', urbanPop: 16800000, metroPop: 33000000, coreDensity: 11300, metroDensity: 3600 },
  { matchKeys: ['mumbai'], name: 'Mumbai', country: 'Índia', populationEstimate: '~12,5M (Metrópole: 21M)', urbanPop: 12500000, metroPop: 21000000, coreDensity: 21000, metroDensity: 4800 },
  { matchKeys: ['tehran', 'teerã', 'teera'], name: 'Teerã', country: 'Irã', populationEstimate: '~9,0M (Metrópole: 16M)', urbanPop: 9000000, metroPop: 16000000, coreDensity: 11800, metroDensity: 2800 },
  { matchKeys: ['tel aviv'], name: 'Tel Aviv', country: 'Israel', populationEstimate: '~470 mil (Metrópole: 4,0M)', urbanPop: 470000, metroPop: 4050000, coreDensity: 9100, metroDensity: 2700 },
  { matchKeys: ['cairo'], name: 'Cairo', country: 'Egito', populationEstimate: '~10,1M (Metrópole: 22M)', urbanPop: 10100000, metroPop: 22000000, coreDensity: 19300, metroDensity: 4800 },
  { matchKeys: ['luanda'], name: 'Luanda', country: 'Angola', populationEstimate: '~2,6M (Metrópole: 8,5M)', urbanPop: 2600000, metroPop: 8500000, coreDensity: 9200, metroDensity: 3100 },
  { matchKeys: ['maputo'], name: 'Maputo', country: 'Moçambique', populationEstimate: '~1,1M (Metrópole: 2,7M)', urbanPop: 1100000, metroPop: 2700000, coreDensity: 3200, metroDensity: 900 },
  { matchKeys: ['buenos aires'], name: 'Buenos Aires', country: 'Argentina', populationEstimate: '~3,1M (Metrópole: 15,6M)', urbanPop: 3120000, metroPop: 15600000, coreDensity: 15100, metroDensity: 2900 },
  { matchKeys: ['santiago'], name: 'Santiago', country: 'Chile', populationEstimate: '~6,2M (Metrópole: 7,1M)', urbanPop: 6200000, metroPop: 7100000, coreDensity: 7500, metroDensity: 1500 },
  { matchKeys: ['bogota', 'bogotá'], name: 'Bogotá', country: 'Colômbia', populationEstimate: '~8,0M (Metrópole: 11M)', urbanPop: 8000000, metroPop: 11000000, coreDensity: 13500, metroDensity: 2600 },
  { matchKeys: ['lima'], name: 'Lima', country: 'Peru', populationEstimate: '~9,7M (Metrópole: 11M)', urbanPop: 9700000, metroPop: 11000000, coreDensity: 8300, metroDensity: 2200 },
  { matchKeys: ['mexico city', 'cidade do mexico', 'cidade do méxico'], name: 'Cidade do México', country: 'México', populationEstimate: '~9,2M (Metrópole: 22M)', urbanPop: 9200000, metroPop: 22000000, coreDensity: 6000, metroDensity: 2100 },
  { matchKeys: ['toronto'], name: 'Toronto', country: 'Canadá', populationEstimate: '~2,8M (Metrópole: 6,4M)', urbanPop: 2800000, metroPop: 6400000, coreDensity: 4400, metroDensity: 1050 },
  { matchKeys: ['sydney'], name: 'Sydney', country: 'Austrália', populationEstimate: '~5,3M (Metrópole: 5,8M)', urbanPop: 5300000, metroPop: 5800000, coreDensity: 1350, metroDensity: 850 },
  { matchKeys: ['atol de bikini', 'bikini', 'bikini atoll', 'castle bravo'], name: 'Atol de Bikini', country: 'Ilhas Marshall', populationEstimate: '~0 hab (Zona de Testes Históricos)', urbanPop: 0, metroPop: 0, coreDensity: 0, metroDensity: 0 },
  { matchKeys: ['novaya zemlya', 'nova zembla', 'tsar bomba', 'sukhoy nos', 'matochkin'], name: 'Novaya Zemlya', country: 'Rússia', populationEstimate: '~2.500 hab (Base Militar Ártica)', urbanPop: 500, metroPop: 2500, coreDensity: 1, metroDensity: 0.1 },
  { matchKeys: ['local de testes de nevada', 'nevada test site', 'nts', 'yucca flat', 'testes de nevada'], name: 'Local de Testes de Nevada', country: 'Estados Unidos', populationEstimate: '~0 residentes (Área Militar DoE)', urbanPop: 0, metroPop: 0, coreDensity: 0, metroDensity: 0 },
  { matchKeys: ['local de testes de semipalatinsk', 'semipalatinsk', 'poligono de semipalatinsk', 'o poligono', 'kurchatov'], name: 'Local de Testes de Semipalatinsk', country: 'Cazaquistão', populationEstimate: '~0 hab (Polígono Militar Soviético)', urbanPop: 0, metroPop: 10000, coreDensity: 0, metroDensity: 0.1 }
];

export function lookupLocationDemographics(
  name: string,
  country?: string,
  lat?: number,
  lng?: number,
  rawOsmAddress?: any
): Partial<TargetCity> {
  const normName = (name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  const normCountry = (country || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();

  // 1. Procurar correspondência no banco de dados demográfico exato
  const found = DEMOGRAPHIC_DATABASE.find((entry) =>
    entry.matchKeys.some((k) => normName.includes(k) || (normCountry && k.includes(normCountry) && normName.length > 2))
  );

  if (found) {
    return {
      name: found.name,
      country: found.country,
      populationEstimate: found.populationEstimate,
      urbanPopulation: found.urbanPop,
      metroPopulation: found.metroPop,
      coreDensityPerKm2: found.coreDensity,
      metroDensityPerKm2: found.metroDensity
    };
  }

  // 2. Verificar se o local é oceano/mar aberto (zero população humana residente)
  const isOcean =
    (rawOsmAddress && (rawOsmAddress.natural === 'water' || rawOsmAddress.ocean || rawOsmAddress.sea || rawOsmAddress.bay)) ||
    (!rawOsmAddress && (!country || country.toLowerCase().includes('oceano') || country.toLowerCase().includes('ocean') || country.toLowerCase().includes('sea')));

  if (isOcean) {
    return {
      populationEstimate: 'Área Marítima Desabitada (0 habitantes)',
      urbanPopulation: 0,
      metroPopulation: 0,
      coreDensityPerKm2: 0,
      metroDensityPerKm2: 0
    };
  }

  // 3. Estimar com base no tipo geográfico retornado pelo OpenStreetMap
  if (rawOsmAddress) {
    if (rawOsmAddress.village || rawOsmAddress.hamlet) {
      return {
        populationEstimate: '~8 mil habitantes (Área Rural / Vila)',
        urbanPopulation: 8000,
        metroPopulation: 15000,
        coreDensityPerKm2: 450,
        metroDensityPerKm2: 80
      };
    }
    if (rawOsmAddress.town) {
      return {
        populationEstimate: '~75 mil habitantes (Cidade Média)',
        urbanPopulation: 75000,
        metroPopulation: 140000,
        coreDensityPerKm2: 1400,
        metroDensityPerKm2: 350
      };
    }
    if (rawOsmAddress.city) {
      return {
        populationEstimate: '~900 mil habitantes (Centro Urbano)',
        urbanPopulation: 900000,
        metroPopulation: 1800000,
        coreDensityPerKm2: 3800,
        metroDensityPerKm2: 950
      };
    }
  }

  // Padrão realista para área urbana média global
  return {
    populationEstimate: '~850 mil habitantes (Área Urbana)',
    urbanPopulation: 850000,
    metroPopulation: 1700000,
    coreDensityPerKm2: 3500,
    metroDensityPerKm2: 900
  };
}

export const NUCLEAR_RANKING_BOMBS: NuclearBombRanking[] = [
  {
    id: 'w54-davy-crockett',
    name: 'Davy Crockett (W54)',
    code: 'M-388 / W54',
    yieldKt: 0.02,
    yieldDisplay: '0.02 kt (20 t)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1961,
    type: 'Dispositivo Fissão Tática Sub-quiloton',
    carrier: 'Canhão sem recuo montado em jipe ou tripé',
    description:
      'Uma das menores armas nucleares já implantadas. Projetada para ser disparada por soldados de infantaria contra blindados soviéticos na Europa, com raio de radiação letal que podia atingir o próprio operador se o vento mudasse.',
    fireballRadiusM: 40,
    vaporizationRadiusM: 70,
    heavyBlastRadiusM: 110,
    carbonizationRadiusM: 300,
    thermalRadiusM: 630,
    lightBlastRadiusM: 790,
    mushroomCloudHeightKm: 2.1,
    mushroomCloudCapDiameterKm: 1.8,
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    fallout: {
      fissionPercentage: 100,
      cloudTopKm: 2.1,
      cloudStemRadiusM: 80,
      surfaceContours: {
        rad1000: { lengthKm: 0.5, maxHalfWidthKm: 0.12 },
        rad300: { lengthKm: 0.9, maxHalfWidthKm: 0.22 },
        rad100: { lengthKm: 1.6, maxHalfWidthKm: 0.38 },
        rad10: { lengthKm: 3.2, maxHalfWidthKm: 0.7 }
      },
      historicalFalloutContext:
        'Devido à potência sub-quiloton, o perigo biológico primário consistia no pulso maciço de nêutrons imediatos no momento do disparo. A pluma de precipitação de partículas é relativamente curta, estendendo-se por ~3 km.'
    }
  },
  {
    id: 'little-boy',
    name: 'Little Boy',
    code: 'Mk-1 (L-11)',
    yieldKt: 15,
    yieldDisplay: '15 kt',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1945,
    type: 'Bomba de Fissão Tipo Canhão (U-235)',
    carrier: 'Bombardeiro B-29 Superfortress (Enola Gay)',
    description:
      'A primeira arma nuclear utilizada em combate sobre Hiroshima. Mecanismo de tiro disparando um projétil subcrítico de Urânio-238 contra anéis alvos de urânio, com eficiência de fissão inferior a 1.4%.',
    fireballRadiusM: 380,
    vaporizationRadiusM: 660,
    heavyBlastRadiusM: 1030,
    carbonizationRadiusM: 2900,
    thermalRadiusM: 6030,
    lightBlastRadiusM: 7520,
    mushroomCloudHeightKm: 12.0,
    mushroomCloudCapDiameterKm: 5.0,
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    fallout: {
      fissionPercentage: 100,
      cloudTopKm: 12.0,
      cloudStemRadiusM: 400,
      surfaceContours: {
        rad1000: { lengthKm: 12.0, maxHalfWidthKm: 2.2 },
        rad300: { lengthKm: 24.0, maxHalfWidthKm: 4.0 },
        rad100: { lengthKm: 45.0, maxHalfWidthKm: 6.8 },
        rad10: { lengthKm: 88.0, maxHalfWidthKm: 12.5 }
      },
      historicalFalloutContext:
        'Detonada a 600m de altitude (explosão aérea) sobre Hiroshima. O contato do plasma com a crosta terrestre foi moderado, mas as correntes de convecção formaram fuligem radioativa que caiu cerca de 20 minutos depois sob a forma da infame "Chuva Negra" (Kuroi Ame), contaminando fontes de água e sobreviventes desidratados.'
    }
  },
  {
    id: 'fat-man',
    name: 'Fat Man',
    code: 'Mk-3',
    yieldKt: 21,
    yieldDisplay: '21 kt',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1945,
    type: 'Bomba de Fissão por Implosão (Pu-239)',
    carrier: 'Bombardeiro B-29 Superfortress (Bockscar)',
    description:
      'Lançada sobre Nagasaki. Utilizou lentes explosivas de alta e baixa velocidade para comprimir uniformemente um caroço de Plutônio-239 de 6.2 kg até a supercriticidade instantânea.',
    fireballRadiusM: 430,
    vaporizationRadiusM: 740,
    heavyBlastRadiusM: 1160,
    carbonizationRadiusM: 3330,
    thermalRadiusM: 6920,
    lightBlastRadiusM: 8420,
    mushroomCloudHeightKm: 13.5,
    mushroomCloudCapDiameterKm: 6.2,
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    fallout: {
      fissionPercentage: 100,
      cloudTopKm: 13.5,
      cloudStemRadiusM: 450,
      surfaceContours: {
        rad1000: { lengthKm: 15.0, maxHalfWidthKm: 2.6 },
        rad300: { lengthKm: 29.0, maxHalfWidthKm: 4.8 },
        rad100: { lengthKm: 54.0, maxHalfWidthKm: 8.0 },
        rad10: { lengthKm: 105.0, maxHalfWidthKm: 14.5 }
      },
      historicalFalloutContext:
        'Detonada a 503m sobre o vale de Urakami em Nagasaki. As cordilheiras que cercam o vale canalizaram o cogumelo e os ventos costeiros dispersaram a pluma em direção ao Mar da China Oriental e vilarejos a leste.'
    }
  },
  {
    id: 'b61-mod11',
    name: 'W78 / Minuteman III (340 kt)',
    code: 'W78 / Minuteman III / B61 Mod 11',
    yieldKt: 340,
    yieldDisplay: '340 kt (0.34 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1997,
    type: 'Ogiva Termonuclear MIRV (W78) / Penetrador de Solo (B61)',
    carrier: 'ICBM LGM-30G Minuteman III, B-2 Spirit, B-52H',
    description:
      'Ogiva termonuclear de alta precisão utilizada nos mísseis balísticos intercontinentais Minuteman III dos EUA. Também representativa da família de armas de 340 kt como a B61 Mod 11, projetada com carcaça endurecida para penetração profunda.',
    fireballRadiusM: 1080,
    vaporizationRadiusM: 1870,
    heavyBlastRadiusM: 2930,
    carbonizationRadiusM: 8220,
    thermalRadiusM: 17120,
    lightBlastRadiusM: 21340,
    mushroomCloudHeightKm: 18.0,
    mushroomCloudCapDiameterKm: 14.0,
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    fallout: {
      fissionPercentage: 50,
      cloudTopKm: 18.0,
      cloudStemRadiusM: 900,
      surfaceContours: {
        rad1000: { lengthKm: 38.0, maxHalfWidthKm: 6.2 },
        rad300: { lengthKm: 68.0, maxHalfWidthKm: 10.8 },
        rad100: { lengthKm: 125.0, maxHalfWidthKm: 18.5 },
        rad10: { lengthKm: 230.0, maxHalfWidthKm: 32.0 }
      },
      historicalFalloutContext:
        'Por ser uma bomba de penetração geológica que explode sob a superfície da terra, a B61-11 vaporiza e pulveriza centenas de milhares de toneladas de rocha e solo, ligando-os a produtos de fissão quentes. Cria a pluma de precipitação radioativa local mais concentrada e letal por quiloton de todas as armas modernas.'
    }
  },
  {
    id: 'rds-6s',
    name: 'RDS-6s (Sloika)',
    code: 'RDS-6s / Joe-4',
    yieldKt: 400,
    yieldDisplay: '400 kt (0.4 MT)',
    country: 'União Soviética',
    countryCode: 'SU',
    year: 1953,
    type: 'Dispositivo Termonuclear de Camadas ("Sloika" / Bolo em Camadas)',
    carrier: 'Torre de aço de 30m no Polígono de Semipalatinsk',
    description:
      'Primeiro teste com queima termonuclear da União Soviética, concebido por Andrei Sakharov com a "Primeira Ideia" (camadas concêntricas alternadas de Urânio-238 e deutereto de lítio-6 enriquecido com trítio). Produziu 400 kt e demonstrou a capacidade soviética de empregar fusão nuclear em artefatos transportáveis. Também representativa da ogiva termonuclear americana W87 de 400 kt.',
    fireballRadiusM: 1140,
    vaporizationRadiusM: 1970,
    heavyBlastRadiusM: 3090,
    carbonizationRadiusM: 8680,
    thermalRadiusM: 18080,
    lightBlastRadiusM: 22530,
    mushroomCloudHeightKm: 19.5,
    mushroomCloudCapDiameterKm: 16.5,
    badgeColor: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
    fallout: {
      fissionPercentage: 82,
      cloudTopKm: 19.5,
      cloudStemRadiusM: 1100,
      surfaceContours: {
        rad1000: { lengthKm: 42.0, maxHalfWidthKm: 6.8 },
        rad300: { lengthKm: 75.0, maxHalfWidthKm: 12.0 },
        rad100: { lengthKm: 140.0, maxHalfWidthKm: 20.5 },
        rad10: { lengthKm: 255.0, maxHalfWidthKm: 35.0 }
      },
      historicalFalloutContext:
        'Mais de 80% do rendimento energético da RDS-6s decorreu da quebra físsil rápida do Urânio-238 nas camadas exteriores, desencadeada pelos nêutrons energéticos de 14 MeV gerados na fusão de lítio. Detonada sobre uma torre de 30 metros, a bola de fogo atingiu o chão das estepes do Cazaquistão e gerou densa pluma radioativa que contaminou aldeias a sotavento.'
    }
  },
  {
    id: 'ivy-king',
    name: 'Ivy King',
    code: 'Mk-18 / SOB (Super Oralloy)',
    yieldKt: 500,
    yieldDisplay: '500 kt (0.5 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1952,
    type: 'Bomba de Fissão Pura por Implosão (U-235)',
    carrier: 'Bombardeiro B-36H Peacemaker',
    description:
      'A mais potente arma exclusivamente de fissão já construída e detonada na história. Concebida como salvaguarda caso a fusão termonuclear falhasse, continha ~60 kg de Urânio-235 enriquecido a mais de 93% (mais de 4 massas críticas em casca oca), estabilizada por uma corrente de boro removida no ar antes do lançamento.',
    fireballRadiusM: 1230,
    vaporizationRadiusM: 2130,
    heavyBlastRadiusM: 3330,
    carbonizationRadiusM: 9350,
    thermalRadiusM: 19480,
    lightBlastRadiusM: 24280,
    mushroomCloudHeightKm: 21.0,
    mushroomCloudCapDiameterKm: 18.5,
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    fallout: {
      fissionPercentage: 100,
      cloudTopKm: 21.0,
      cloudStemRadiusM: 1300,
      surfaceContours: {
        rad1000: { lengthKm: 48.0, maxHalfWidthKm: 7.8 },
        rad300: { lengthKm: 86.0, maxHalfWidthKm: 13.8 },
        rad100: { lengthKm: 160.0, maxHalfWidthKm: 23.5 },
        rad10: { lengthKm: 290.0, maxHalfWidthKm: 40.0 }
      },
      historicalFalloutContext:
        'A Ivy King detém o recorde absoluto de materiais físseis de Urânio-235 puramente quebrados em uma explosão (~60 kg físsil com 500 kt de rendimento puro). Ao contrário de bombas termonucleares, 100% da sua energia gerou fragmentos de fissão radioativos altamente perigosos.'
    }
  },
  {
    id: 'rds-37',
    name: 'RDS-37 / B83 (1.6 Mt)',
    code: 'RDS-37 / B83 Strategic Bomb',
    yieldKt: 1600,
    yieldDisplay: '1.600 kt (1.6 MT)',
    country: 'União Soviética',
    countryCode: 'SU',
    year: 1955,
    type: 'Bomba Termonuclear Bifásica de Implosão por Radiação',
    carrier: 'Bombardeiro Tupolev Tu-16 / B-2 Spirit / B-52H',
    description:
      'A primeira verdadeira bomba de hidrogênio de dois estágios da URSS baseada em implosão por radiação (equivalente soviético ao conceito Teller-Ulam), reduzida para 1.6 MT. Também equivalente ao rendimento máximo da moderna bomba termonuclear americana B83 (1.2 - 1.6 MT).',
    fireballRadiusM: 1810,
    vaporizationRadiusM: 3140,
    heavyBlastRadiusM: 4910,
    carbonizationRadiusM: 13780,
    thermalRadiusM: 28710,
    lightBlastRadiusM: 35780,
    mushroomCloudHeightKm: 26.0,
    mushroomCloudCapDiameterKm: 28.0,
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    fallout: {
      fissionPercentage: 50,
      cloudTopKm: 26.0,
      cloudStemRadiusM: 1900,
      surfaceContours: {
        rad1000: { lengthKm: 78.0, maxHalfWidthKm: 12.5 },
        rad300: { lengthKm: 140.0, maxHalfWidthKm: 22.0 },
        rad100: { lengthKm: 260.0, maxHalfWidthKm: 38.0 },
        rad10: { lengthKm: 460.0, maxHalfWidthKm: 62.0 }
      },
      historicalFalloutContext:
        'A RDS-37 provou o princípio termonuclear soviético de 2 estágios. Para proteger assentamentos e evitar mortes de civis a centenas de quilômetros a sotavento em Semipalatinsk, parte dos elementos físseis secundários foi substituída, cortando a energia esperada de 3 MT para 1.6 MT e atenuando o fallout catastrófico.'
    }
  },
  {
    id: 'ivy-mike',
    name: 'Ivy Mike',
    code: 'Sausage Device / TX-5',
    yieldKt: 10400,
    yieldDisplay: '10.400 kt (10.4 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1952,
    type: 'Dispositivo Termonuclear Criogênico Experimental (Teller-Ulam)',
    carrier: 'Instalação industrial terrestre na Ilha de Elugelab (Atol de Enewetak)',
    description:
      'O primeiro teste termonuclear em escala real da história. Um laboratório industrial pesando mais de 74 toneladas com deutério líquido mantido a temperatura criogênica próxima ao zero absoluto. A detonação de 10.4 MT vaporizou por completo a ilha de Elugelab, deixando uma cratera submarina de 1.9 km.',
    fireballRadiusM: 3370,
    vaporizationRadiusM: 5840,
    heavyBlastRadiusM: 9160,
    carbonizationRadiusM: 25670,
    thermalRadiusM: 53490,
    lightBlastRadiusM: 66680,
    mushroomCloudHeightKm: 41.0,
    mushroomCloudCapDiameterKm: 52.0,
    badgeColor: 'border-teal-500/40 text-teal-400 bg-teal-500/10',
    fallout: {
      fissionPercentage: 77,
      cloudTopKm: 41.0,
      cloudStemRadiusM: 3500,
      surfaceContours: {
        rad1000: { lengthKm: 180.0, maxHalfWidthKm: 28.0 },
        rad300: { lengthKm: 340.0, maxHalfWidthKm: 52.0 },
        rad100: { lengthKm: 620.0, maxHalfWidthKm: 92.0 },
        rad10: { lengthKm: 1050.0, maxHalfWidthKm: 150.0 }
      },
      historicalFalloutContext:
        'A explosão de 10.4 MT na superfície de Elugelab vaporizou milhões de toneladas de rocha de coral e água marítima. Cerca de 8 Megatons (77%) da energia foram gerados pela quebra do pesado tamper de Urânio-238 natural de 5 toneladas fisionado pelos nêutrons de fusão, espalhando poeira altamente radioativa por centenas de quilômetros do Oceano Pacífico.'
    }
  },
  {
    id: 'castle-bravo',
    name: 'Castle Bravo',
    code: 'Shrimp Device / TX-21',
    yieldKt: 15000,
    yieldDisplay: '15.000 kt (15 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1954,
    type: 'Dispositivo Termonuclear Bifásico (LiD seco)',
    carrier: 'Teste em superfície (Atol de Bikini)',
    description:
      'O maior teste nuclear da história americana. Projetada para render ~6 MT, a reação imprevista do isótopo Lítio-7 gerou uma liberação cataclísmica de 15 MT, vaporizando ilhas inteiras e espalhando precipitação radioativa global.',
    fireballRadiusM: 3810,
    vaporizationRadiusM: 6600,
    heavyBlastRadiusM: 10350,
    carbonizationRadiusM: 29010,
    thermalRadiusM: 60450,
    lightBlastRadiusM: 75340,
    mushroomCloudHeightKm: 43.0,
    mushroomCloudCapDiameterKm: 60.0,
    badgeColor: 'border-orange-500/40 text-orange-400 bg-orange-500/10',
    fallout: {
      fissionPercentage: 68,
      cloudTopKm: 43.0,
      cloudStemRadiusM: 4200,
      surfaceContours: {
        rad1000: { lengthKm: 230.0, maxHalfWidthKm: 35.0 },
        rad300: { lengthKm: 450.0, maxHalfWidthKm: 68.0 },
        rad100: { lengthKm: 780.0, maxHalfWidthKm: 115.0 },
        rad10: { lengthKm: 1300.0, maxHalfWidthKm: 190.0 }
      },
      historicalFalloutContext:
        'O mais grave desastre radiológico da história das armas atômicas americanas. Ao produzir 15 MT em vez dos 6 MT previstos em uma barcaça rasa no recife de coral de Bikini, levantou uma colossal coluna de calcário triturado e físsil. A pluma radioativa letal cobriu mais de 450 km a leste, atingindo os atóis habitados de Rongelap, Ailinginae e Rongerik, além do barco de pesca japonês Daigo Fukuryū Maru (Lucky Dragon No. 5) a 130 km.'
    }
  },
  {
    id: 'b41-mark41',
    name: 'B41 (Mark 41)',
    code: 'B-41 / Mk-41 (SAC)',
    yieldKt: 25000,
    yieldDisplay: '25.000 kt (25 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1961,
    type: 'Bomba Termonuclear Trifásica (Fissão-Fusão-Fissão)',
    carrier: 'Bombardeiros B-52 Stratofortress e B-47 Stratojet',
    description:
      'A arma nuclear mais potente e com a mais alta relação rendimento-peso (5.2 Mt/ton) construída pelos Estados Unidos. Única bomba americana operacional de três estágios produzida em escala serial (~500 unidades).',
    fireballRadiusM: 4510,
    vaporizationRadiusM: 7810,
    heavyBlastRadiusM: 12250,
    carbonizationRadiusM: 34340,
    thermalRadiusM: 71560,
    lightBlastRadiusM: 89190,
    mushroomCloudHeightKm: 48.0,
    mushroomCloudCapDiameterKm: 72.0,
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    fallout: {
      fissionPercentage: 75,
      cloudTopKm: 48.0,
      cloudStemRadiusM: 5000,
      surfaceContours: {
        rad1000: { lengthKm: 310.0, maxHalfWidthKm: 46.0 },
        rad300: { lengthKm: 580.0, maxHalfWidthKm: 85.0 },
        rad100: { lengthKm: 980.0, maxHalfWidthKm: 142.0 },
        rad10: { lengthKm: 1650.0, maxHalfWidthKm: 235.0 }
      },
      historicalFalloutContext:
        'A B41 empregava uma camisa terciária espessa de Urânio-238 para maximizar a energia de fissão rápida. Concebida para o Comando Aéreo Estratégico (SAC) aniquilar instalações soviéticas fortificadas com contaminação radioativa massiva e prolongada estendendo-se por quase mil quilômetros.'
    }
  },
  {
    id: 'tsar-bomba',
    name: 'Tsar Bomba (50 Mt)',
    code: 'RDS-220 / Big Ivan (50 MT)',
    yieldKt: 50000,
    yieldDisplay: '50.000 kt (50 MT)',
    country: 'União Soviética',
    countryCode: 'SU',
    year: 1961,
    type: 'Superbomba Termonuclear Trifásica com Tamper de Chumbo',
    carrier: 'Bombardeiro modificado Tupolev Tu-95V',
    description:
      'O evento explosivo artificial mais potente da história da humanidade. Detonada a 4.000m de altitude em Nova Zembla com rendimento medido de 50 Megatons. O tamper original de urânio foi substituído por chumbo para reduzir em 97% a precipitação radioativa, constituindo um dos testes mais "limpos" por megaton.',
    fireballRadiusM: 5680,
    vaporizationRadiusM: 9840,
    heavyBlastRadiusM: 15440,
    carbonizationRadiusM: 43260,
    thermalRadiusM: 90150,
    lightBlastRadiusM: 112370,
    mushroomCloudHeightKm: 67.0,
    mushroomCloudCapDiameterKm: 95.0,
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    fallout: {
      fissionPercentage: 3,
      cloudTopKm: 67.0,
      cloudStemRadiusM: 6000,
      surfaceContours: {
        rad1000: { lengthKm: 90.0, maxHalfWidthKm: 14.0 },
        rad300: { lengthKm: 160.0, maxHalfWidthKm: 25.0 },
        rad100: { lengthKm: 300.0, maxHalfWidthKm: 45.0 },
        rad10: { lengthKm: 520.0, maxHalfWidthKm: 78.0 }
      },
      historicalFalloutContext:
        'Notável triunfo de moderação científica: Andrei Sakharov convenceu a liderança soviética a substituir a camisa externa de Urânio-238 por chumbo inerte. Com isso, 97% dos 50 Megatons derivaram puramente de fusão de hidrogênio (apenas 1.5 MT de fissão no primário). A detonação a 4.000m evitou o contato do plasma com a crosta ártica, resultando em um dos testes nucleares com menor precipitação radioativa local por megaton da história.'
    }
  },
  {
    id: 'tsar-bomba-100mt',
    name: 'Tsar Bomba (100 Mt)',
    code: 'RDS-220 Projeto Máximo (Tamper U-238)',
    yieldKt: 100000,
    yieldDisplay: '100.000 kt (100 MT)',
    country: 'União Soviética',
    countryCode: 'SU',
    year: 1961,
    type: 'Superbomba Termonuclear Trifásica Máxima com Tamper de Urânio-238',
    carrier: 'Bombardeiro modificado Tupolev Tu-95V (Projeto Máximo)',
    description:
      'O projeto original e pleno idealizado por Andrei Sakharov e Igor Kurchatov. Equipado com uma camisa externa (tamper) de Urânio-238 no estágio final, a fissão induzida por nêutrons de fusão dobraria a energia para astronômicos 100 Megatons (>6.600 vezes Hiroshima). O teste foi limitado a 50 MT para evitar que a precipitação radioativa letal contaminasse populações na URSS e na Europa.',
    fireballRadiusM: 6700,
    vaporizationRadiusM: 11600,
    heavyBlastRadiusM: 18200,
    carbonizationRadiusM: 51000,
    thermalRadiusM: 106300,
    lightBlastRadiusM: 132500,
    mushroomCloudHeightKm: 75.0,
    mushroomCloudCapDiameterKm: 115.0,
    badgeColor: 'border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/10',
    fallout: {
      fissionPercentage: 51,
      cloudTopKm: 75.0,
      cloudStemRadiusM: 7800,
      surfaceContours: {
        rad1000: { lengthKm: 550.0, maxHalfWidthKm: 82.0 },
        rad300: { lengthKm: 1050.0, maxHalfWidthKm: 155.0 },
        rad100: { lengthKm: 1850.0, maxHalfWidthKm: 260.0 },
        rad10: { lengthKm: 3100.0, maxHalfWidthKm: 420.0 }
      },
      historicalFalloutContext:
        'Se o projeto pleno de 100 Megatons com camisa de Urânio-238 tivesse sido detonado, mais de 51 Megatons puramente de fissão direta teriam sido liberados. A pluma radioativa teria cruzado fronteiras internacionais, espalhando cinzas letais por milhares de quilômetros na Europa Ocidental e no norte da Eurásia, contaminando territórios do tamanho da Europa por décadas.'
    }
  }
];

export interface FalloutZoneConfig {
  id: 'rad1000' | 'rad300' | 'rad100' | 'rad10';
  doseDisplay: string;
  name: string;
  severity: string;
  color: string;
  fillColor: string;
  fillOpacity: number;
  strokeWeight: number;
  description: string;
  medicalImpact: string;
}

export const FALLOUT_ZONES_CONFIG: FalloutZoneConfig[] = [
  {
    id: 'rad1000',
    doseDisplay: '≥ 1.000 rad (10 Gy)',
    name: 'Zona Letal Imediata (Colapso SNC)',
    severity: 'Letalidade: 100%',
    color: '#8B5CF6',
    fillColor: '#8B5CF6',
    fillOpacity: 0.38,
    strokeWeight: 2,
    description: 'Dose maciça (>1.000 rad).',
    medicalImpact: 'Colapso neurológico e vascular fulminante.\nFalência aguda em 24 a 72h.\nLetalidade 100%.'
  },
  {
    id: 'rad300',
    doseDisplay: '300 – 1.000 rad (3 – 10 Gy)',
    name: 'Síndrome Aguda da Radiação (SAR)',
    severity: 'Mortalidade: 50% a 90%',
    color: '#EF4444',
    fillColor: '#EF4444',
    fillOpacity: 0.28,
    strokeWeight: 1.8,
    description: 'Cinzas radioativas densas (300-1.000 rad).',
    medicalImpact: 'Destruição total da medula óssea.\nHemorragias internas e colapso imune.\nMortalidade 50% a 90% sem terapia.'
  },
  {
    id: 'rad100',
    doseDisplay: '100 – 300 rad (1 – 3 Gy)',
    name: 'Doença da Radiação & Evacuação',
    severity: 'Hospitalização Obrigatória',
    color: '#F97316',
    fillColor: '#F97316',
    fillOpacity: 0.20,
    strokeWeight: 1.5,
    description: 'Precipitação perigosa (100-300 rad).',
    medicalImpact: 'Queda severa de leucócitos e náuseas.\nVômitos e risco oncológico elevado.\nHospitalização e evacuação imediata.'
  },
  {
    id: 'rad10',
    doseDisplay: '10 – 100 rad (0.1 – 1 Gy)',
    name: 'Zona de Contaminação Prolongada',
    severity: 'Alerta / Isolamento Agrícola',
    color: '#EAB308',
    fillColor: '#EAB308',
    fillOpacity: 0.12,
    strokeWeight: 1.2,
    description: 'Pluma periférica (10-100 rad).',
    medicalImpact: 'Contaminação de água, solo e lavouras.\nPresença de Césio-137 e Estrôncio-90.\nIsolamento civil e embargo alimentar.'
  }
];

// Helper to compute teardrop fallout contour polygon coordinates on earth surface
export function computeFalloutContourCoordinates(
  centerLat: number,
  centerLng: number,
  lengthKm: number,
  maxHalfWidthKm: number,
  windAngleDeg: number,
  upwindRadiusKm: number = 0.8
): [number, number][] {
  // windAngleDeg: 0° = Ventos para o Norte, 90° = para o Leste, 180° = para o Sul, 270° = para o Oeste
  const rad = (windAngleDeg * Math.PI) / 180;

  // Direction downwind in [East, North]
  const dirE = Math.sin(rad);
  const dirN = Math.cos(rad);

  // Perpendicular to downwind (right side) in [East, North]
  const perpE = Math.cos(rad);
  const perpN = -Math.sin(rad);

  const points: [number, number][] = [];
  const cosLat = Math.max(Math.cos((centerLat * Math.PI) / 180), 0.05);

  // 1. Upwind circular cap around ground zero (behind the wind direction)
  const upwindR = Math.min(upwindRadiusKm, lengthKm * 0.12);
  const numCapSteps = 10;
  for (let i = 0; i <= numCapSteps; i++) {
    const angle = Math.PI / 2 + (Math.PI * i) / numCapSteps; // from PI/2 to 3PI/2
    const x = upwindR * Math.cos(angle);
    const y = upwindR * Math.sin(angle);

    const dEast = x * dirE + y * perpE;
    const dNorth = x * dirN + y * perpN;

    const lat = centerLat + dNorth / 111.32;
    const lng = centerLng + dEast / (111.32 * cosLat);
    points.push([lat, lng]);
  }

  // 2. Downwind right side (from stem to tip)
  const numDownwindSteps = 20;
  for (let i = 1; i <= numDownwindSteps; i++) {
    const s = i / numDownwindSteps;
    const x = s * lengthKm;
    // Teardrop profile: peak width around s = 0.22, smoothly tapering to 0 at s = 1.0
    const wFactor = 2.85 * Math.sqrt(s) * Math.pow(Math.max(0, 1 - s), 1.15);
    const y = -maxHalfWidthKm * wFactor;

    const dEast = x * dirE + y * perpE;
    const dNorth = x * dirN + y * perpN;

    const lat = centerLat + dNorth / 111.32;
    const lng = centerLng + dEast / (111.32 * cosLat);
    points.push([lat, lng]);
  }

  // 3. Downwind left side (from tip back to stem)
  for (let i = numDownwindSteps - 1; i >= 1; i--) {
    const s = i / numDownwindSteps;
    const x = s * lengthKm;
    const wFactor = 2.85 * Math.sqrt(s) * Math.pow(Math.max(0, 1 - s), 1.15);
    const y = maxHalfWidthKm * wFactor;

    const dEast = x * dirE + y * perpE;
    const dNorth = x * dirN + y * perpN;

    const lat = centerLat + dNorth / 111.32;
    const lng = centerLng + dEast / (111.32 * cosLat);
    points.push([lat, lng]);
  }

  return points;
}

export interface ImpactLayerInfo {
  id: 'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'thermal' | 'light';
  name: string;
  subtitle: string;
  color: string;
  fillColor: string;
  strokeColor: string;
  severity: string;
  effects: string;
}

export const IMPACT_LAYERS: ImpactLayerInfo[] = [
  {
    id: 'fireball',
    name: 'Bola de Fogo (Fireball)',
    subtitle: 'Vaporização Instantânea & Plasma',
    color: '#FACC15',
    fillColor: '#FACC15',
    strokeColor: '#EAB308',
    severity: 'Letalidade: 100%',
    effects:
      'Temperatura na ordem de dezenas de milhões de °C.\nTudo dentro deste raio (edifícios, asfalto, aço e matéria orgânica)\né instantaneamente vaporizado em fração de segundo.'
  },
  {
    id: 'vaporization',
    name: 'Zona de Vaporização (Além da Bola de Fogo)',
    subtitle: 'Desintegração Instantânea & Pirólise Térmica',
    color: '#FB923C',
    fillColor: '#FB923C',
    strokeColor: '#EA580C',
    severity: 'Letalidade: 100%',
    effects:
      'Fluxo radiativo direto (> 150 a 300 cal/cm²).\nVaporiza e desseca corpos biológicos, asfalto e materiais leves\nantes da chegada mecânica da onda de choque.'
  },
  {
    id: 'carbonization',
    name: 'Zona de Carbonização (Pessoas Carbonizadas)',
    subtitle: 'Calcinação Térmica & Combustão Humana Instantânea',
    color: '#DC2626',
    fillColor: '#DC2626',
    strokeColor: '#991B1B',
    severity: 'Letalidade: 100%',
    effects:
      'Fluxo térmico direto (>25-35 cal/cm²).\nQualquer ser humano ao ar livre é instantaneamente carbonizado\ne calcinado até os ossos antes da onda mecânica.\nRoupas entram em combustão imediata. Letalidade 100%'
  },
  {
    id: 'heavy',
    name: 'Onda de Choque Pesada (20 psi)',
    subtitle: 'Colapso Estrutural Severo',
    color: '#EF4444',
    fillColor: '#EF4444',
    strokeColor: '#DC2626',
    severity: 'Sobrevivência: < 1%',
    effects:
      'Sobrepressão extrema de 20 psi.\nDestruição de edifícios de concreto armado, pontes e fábricas.\nVentos de choque superiores a 800 km/h rasgam estruturas.'
  },
  {
    id: 'thermal',
    name: 'Raio de Radiação Térmica',
    subtitle: 'Queimaduras de 3º Grau',
    color: '#F97316',
    fillColor: '#F97316',
    strokeColor: '#EA580C',
    severity: 'Queimaduras Graves',
    effects:
      'Pulso térmico emitido em segundos.\nQueimaduras de 3º grau e destruição de terminações nervosas.\nIgnição espontânea gerando tempestades de fogo.'
  },
  {
    id: 'light',
    name: 'Onda de Choque Leve (1-2 psi)',
    subtitle: 'Danos Moderados & Estilhaços',
    color: '#94A3B8',
    fillColor: '#94A3B8',
    strokeColor: '#64748B',
    severity: 'Ferimentos por Vidro',
    effects:
      'Sobrepressão moderada (1-2 psi).\nEstilhaça vidraças a quilômetros com velocidade letal.\nDeslocamento de telhados, portas e fragmentos.'
  }
];

export interface ZoneCasualtyEstimate {
  id: 'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'thermal' | 'light';
  name: string;
  radiusM: number;
  innerRadiusM: number;
  ringAreaKm2: number;
  cumulativeAreaKm2: number;
  populationExposed: number;
  fatalityRate: number;
  fatalities: number;
  injuryRate: number;
  injuries: number;
  survivors: number;
  severityLabel: string;
  cumulativeDeaths: number;
  cumulativePop: number;
}

export interface BombCasualtySummary {
  bombId: string;
  bombName: string;
  yieldDisplay: string;
  cityId: string;
  cityName: string;
  totalDeaths: number;
  totalInjuries: number;
  totalCasualties: number;
  totalAffectedPop: number;
  mortalityPercentage: number;
  carbonizationDeaths: number;
  thermalDeaths: number;
  lightBlastDeaths: number;
  zoneEstimates: Record<'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'thermal' | 'light', ZoneCasualtyEstimate>;
  orderedZones: ZoneCasualtyEstimate[];
}

export function formatCasualtyNumber(num: number): string {
  return Math.round(num).toLocaleString('pt-BR');
}

/**
 * Tabela Oficial de Zonas de Destruição e Escalonamento Nuclear solicitada pelo usuário.
 * Valores em metros de Raio (R) para cada uma das 12 potências nucleares de referência.
 */
export const DESTRUCTION_ZONE_BENCHMARKS: Record<
  number,
  {
    fireballRadiusM: number;
    vaporizationRadiusM: number;
    heavyBlastRadiusM: number;
    carbonizationRadiusM: number;
    thermalRadiusM: number;
    lightBlastRadiusM: number;
  }
> = {
  0.02: {
    fireballRadiusM: 40,
    vaporizationRadiusM: 70,
    heavyBlastRadiusM: 110,
    carbonizationRadiusM: 300,
    thermalRadiusM: 630,
    lightBlastRadiusM: 790
  },
  15: {
    fireballRadiusM: 380,
    vaporizationRadiusM: 660,
    heavyBlastRadiusM: 1030,
    carbonizationRadiusM: 2900,
    thermalRadiusM: 6030,
    lightBlastRadiusM: 7520
  },
  21: {
    fireballRadiusM: 430,
    vaporizationRadiusM: 740,
    heavyBlastRadiusM: 1160,
    carbonizationRadiusM: 3330,
    thermalRadiusM: 6920,
    lightBlastRadiusM: 8420
  },
  340: {
    fireballRadiusM: 1080,
    vaporizationRadiusM: 1870,
    heavyBlastRadiusM: 2930,
    carbonizationRadiusM: 8220,
    thermalRadiusM: 17120,
    lightBlastRadiusM: 21340
  },
  400: {
    fireballRadiusM: 1140,
    vaporizationRadiusM: 1970,
    heavyBlastRadiusM: 3090,
    carbonizationRadiusM: 8680,
    thermalRadiusM: 18080,
    lightBlastRadiusM: 22530
  },
  500: {
    fireballRadiusM: 1230,
    vaporizationRadiusM: 2130,
    heavyBlastRadiusM: 3330,
    carbonizationRadiusM: 9350,
    thermalRadiusM: 19480,
    lightBlastRadiusM: 24280
  },
  1600: {
    fireballRadiusM: 1810,
    vaporizationRadiusM: 3140,
    heavyBlastRadiusM: 4910,
    carbonizationRadiusM: 13780,
    thermalRadiusM: 28710,
    lightBlastRadiusM: 35780
  },
  10400: {
    fireballRadiusM: 3370,
    vaporizationRadiusM: 5840,
    heavyBlastRadiusM: 9160,
    carbonizationRadiusM: 25670,
    thermalRadiusM: 53490,
    lightBlastRadiusM: 66680
  },
  15000: {
    fireballRadiusM: 3810,
    vaporizationRadiusM: 6600,
    heavyBlastRadiusM: 10350,
    carbonizationRadiusM: 29010,
    thermalRadiusM: 60450,
    lightBlastRadiusM: 75340
  },
  25000: {
    fireballRadiusM: 4510,
    vaporizationRadiusM: 7810,
    heavyBlastRadiusM: 12250,
    carbonizationRadiusM: 34340,
    thermalRadiusM: 71560,
    lightBlastRadiusM: 89190
  },
  50000: {
    fireballRadiusM: 5680,
    vaporizationRadiusM: 9840,
    heavyBlastRadiusM: 15440,
    carbonizationRadiusM: 43260,
    thermalRadiusM: 90150,
    lightBlastRadiusM: 112370
  },
  100000: {
    fireballRadiusM: 6700,
    vaporizationRadiusM: 11600,
    heavyBlastRadiusM: 18200,
    carbonizationRadiusM: 51000,
    thermalRadiusM: 106300,
    lightBlastRadiusM: 132500
  }
};

export function calculateRealNuclearRadiiM(yieldKt: number, burstType: 'air' | 'surface' = 'surface') {
  const isAir = burstType === 'air';

  // Se a potência coincide com um dos 12 patamares de referência, emprega os dados exatos fornecidos
  const benchmark = DESTRUCTION_ZONE_BENCHMARKS[yieldKt];
  if (benchmark) {
    if (!isAir) {
      return { ...benchmark };
    }
    // Modificadores físicos de onda Mach para explosão aérea (air burst)
    return {
      fireballRadiusM: Math.round(benchmark.fireballRadiusM * 0.95),
      vaporizationRadiusM: Math.round(benchmark.vaporizationRadiusM * 1.05),
      heavyBlastRadiusM: Math.round(benchmark.heavyBlastRadiusM * 1.15),
      carbonizationRadiusM: Math.round(benchmark.carbonizationRadiusM * 1.08),
      thermalRadiusM: Math.round(benchmark.thermalRadiusM * 1.1),
      lightBlastRadiusM: Math.round(benchmark.lightBlastRadiusM * 1.18)
    };
  }

  // Interpolação/extrapolação física calibrada no benchmark Tsar Bomba 100 Mt
  const scale = Math.pow(Math.max(0.001, yieldKt) / 100000, 1 / 3);
  const baseFireball = Math.max(15, Math.round(6700 * scale));
  const baseVaporization = Math.max(baseFireball + 10, Math.round(11600 * scale));
  const baseHeavyBlast = Math.max(baseFireball + 20, Math.round(18200 * scale));
  const baseCarbonization = Math.max(baseVaporization + 30, Math.round(51000 * scale));
  const baseThermal = Math.max(baseCarbonization + 50, Math.round(106300 * scale));
  const baseLightBlast = Math.max(baseHeavyBlast + 50, Math.round(132500 * scale));

  if (!isAir) {
    return {
      fireballRadiusM: baseFireball,
      vaporizationRadiusM: baseVaporization,
      heavyBlastRadiusM: baseHeavyBlast,
      carbonizationRadiusM: baseCarbonization,
      thermalRadiusM: baseThermal,
      lightBlastRadiusM: baseLightBlast
    };
  }

  return {
    fireballRadiusM: Math.round(baseFireball * 0.95),
    vaporizationRadiusM: Math.round(baseVaporization * 1.05),
    heavyBlastRadiusM: Math.round(baseHeavyBlast * 1.15),
    carbonizationRadiusM: Math.round(baseCarbonization * 1.08),
    thermalRadiusM: Math.round(baseThermal * 1.1),
    lightBlastRadiusM: Math.round(baseLightBlast * 1.18)
  };
}

export function calculateBombCityCasualties(
  bomb: NuclearBombRanking,
  city: TargetCity,
  burstType: 'air' | 'surface' = 'surface'
): BombCasualtySummary {
  // Obter raios reais calculados de acordo com as leis físicas e altitude de explosão
  const realRadii = calculateRealNuclearRadiiM(bomb.yieldKt, burstType);

  const zoneConfigs = [
    {
      id: 'fireball' as const,
      name: 'Bola de Fogo (Plasma)',
      rM: realRadii.fireballRadiusM,
      fatalityRate: 1.0,
      injuryRate: 0.0,
      severityLabel: 'Letalidade: 100%'
    },
    {
      id: 'vaporization' as const,
      name: 'Zona de Vaporização Total',
      rM: realRadii.vaporizationRadiusM,
      fatalityRate: 1.0,
      injuryRate: 0.0,
      severityLabel: 'Letalidade: 100%'
    },
    {
      id: 'carbonization' as const,
      name: 'Zona de Carbonização Humana',
      rM: realRadii.carbonizationRadiusM,
      fatalityRate: 1.0,
      injuryRate: 0.0,
      severityLabel: 'Letalidade: 100%'
    },
    {
      id: 'heavy' as const,
      name: 'Choque Pesado (20 psi)',
      rM: realRadii.heavyBlastRadiusM,
      fatalityRate: realRadii.heavyBlastRadiusM <= realRadii.carbonizationRadiusM ? 1.0 : 0.85,
      injuryRate: realRadii.heavyBlastRadiusM <= realRadii.carbonizationRadiusM ? 0.0 : 0.12,
      severityLabel: realRadii.heavyBlastRadiusM <= realRadii.carbonizationRadiusM ? 'Letalidade: 100%' : 'Mortalidade: 85%'
    },
    {
      id: 'thermal' as const,
      name: 'Raio Térmico (Queimaduras 3º Grau)',
      rM: realRadii.thermalRadiusM,
      fatalityRate: 0.50,
      injuryRate: 0.40,
      severityLabel: 'Mortalidade: 50%'
    },
    {
      id: 'light' as const,
      name: 'Choque Leve (1 psi)',
      rM: realRadii.lightBlastRadiusM,
      fatalityRate: 0.08,
      injuryRate: 0.35,
      severityLabel: 'Mortalidade: 8%'
    },
  ];

  // Ordenar por raio crescente para calcular anéis concêntricos sem sobreposição de população
  const sorted = [...zoneConfigs].sort((a, b) => a.rM - b.rM);

  const coreDensity = city.coreDensityPerKm2 !== undefined ? city.coreDensityPerKm2 : 4000;
  const metroDensity = city.metroDensityPerKm2 !== undefined ? city.metroDensityPerKm2 : 1000;
  const maxMetroPop = city.metroPopulation !== undefined
    ? city.metroPopulation
    : (city.urbanPopulation !== undefined ? (city.urbanPopulation === 0 ? 0 : city.urbanPopulation * 1.8) : 3000000);
  const urbanPop = city.urbanPopulation !== undefined ? city.urbanPopulation : (maxMetroPop * 0.6);

  const coreRadiusKm = coreDensity > 0 ? Math.sqrt(urbanPop / (Math.PI * coreDensity)) : 2.0;

  let prevRadiusKm = 0;
  let accumulatedPop = 0;
  let totalDeaths = 0;
  let totalInjuries = 0;

  const zoneMap = {} as Record<'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'thermal' | 'light', ZoneCasualtyEstimate>;
  const orderedZones: ZoneCasualtyEstimate[] = [];

  for (const z of sorted) {
    const rKm = z.rM / 1000;
    const ringAreaKm2 = Math.max(0, Math.PI * (rKm * rKm - prevRadiusKm * prevRadiusKm));
    const cumulativeAreaKm2 = Math.PI * rKm * rKm;
    const midRKm = (rKm + prevRadiusKm) / 2;

    // Gradiente exponencial do centro urbano para periferia/subúrbios
    const densityAtMid = coreDensity === 0
      ? 0
      : metroDensity + (coreDensity - metroDensity) * Math.exp(-0.5 * Math.pow(midRKm / Math.max(coreRadiusKm, 1.5), 2));

    let rawRingPop = coreDensity === 0 ? 0 : Math.round(ringAreaKm2 * densityAtMid);
    if (accumulatedPop + rawRingPop > maxMetroPop) {
      rawRingPop = Math.max(0, Math.round(maxMetroPop - accumulatedPop));
    }
    accumulatedPop += rawRingPop;

    const fatalities = Math.round(rawRingPop * z.fatalityRate);
    const injuries = Math.round(rawRingPop * z.injuryRate);
    const survivors = Math.max(0, rawRingPop - fatalities - injuries);

    totalDeaths += fatalities;
    totalInjuries += injuries;

    const estimate: ZoneCasualtyEstimate = {
      id: z.id,
      name: z.name,
      radiusM: z.rM,
      innerRadiusM: Math.round(prevRadiusKm * 1000),
      ringAreaKm2,
      cumulativeAreaKm2,
      populationExposed: rawRingPop,
      fatalityRate: z.fatalityRate,
      fatalities,
      injuryRate: z.injuryRate,
      injuries,
      survivors,
      severityLabel: z.severityLabel,
      cumulativeDeaths: totalDeaths,
      cumulativePop: accumulatedPop
    };

    zoneMap[z.id] = estimate;
    orderedZones.push(estimate);
    prevRadiusKm = rKm;
  }

  return {
    bombId: bomb.id,
    bombName: bomb.name,
    yieldDisplay: bomb.yieldDisplay,
    cityId: city.id,
    cityName: city.name,
    totalDeaths,
    totalInjuries,
    totalCasualties: totalDeaths + totalInjuries,
    totalAffectedPop: accumulatedPop,
    mortalityPercentage: accumulatedPop > 0 ? (totalDeaths / accumulatedPop) * 100 : 0,
    carbonizationDeaths: zoneMap.carbonization?.fatalities ?? 0,
    thermalDeaths: zoneMap.thermal?.fatalities ?? 0,
    lightBlastDeaths: zoneMap.light?.fatalities ?? 0,
    zoneEstimates: zoneMap,
    orderedZones
  };
}

export interface FalloutCasualtyEstimate {
  id: 'rad1000' | 'rad300' | 'rad100' | 'rad10';
  name: string;
  doseDisplay: string;
  lengthKm: number;
  widthKm: number;
  areaKm2: number;
  incrementalAreaKm2: number;
  popExposed: number;
  fatalityRate: number;
  fatalities: number;
  injuryRate: number;
  injuries: number;
  prognosis: string;
}

export interface BombFalloutCasualtiesSummary {
  totalFalloutDeaths: number;
  totalFalloutInjuries: number;
  totalFalloutExposedPop: number;
  zones: Record<'rad1000' | 'rad300' | 'rad100' | 'rad10', FalloutCasualtyEstimate>;
}

export function calculateFalloutCasualties(
  bomb: NuclearBombRanking,
  city: TargetCity,
  burstType: 'air' | 'surface' = 'surface',
  windSpeedKmh: number = 24
): BombFalloutCasualtiesSummary {
  if (!bomb.fallout) {
    const emptyZone = (id: 'rad1000' | 'rad300' | 'rad100' | 'rad10', name: string, dose: string): FalloutCasualtyEstimate => ({
      id,
      name,
      doseDisplay: dose,
      lengthKm: 0,
      widthKm: 0,
      areaKm2: 0,
      incrementalAreaKm2: 0,
      popExposed: 0,
      fatalityRate: 0,
      fatalities: 0,
      injuryRate: 0,
      injuries: 0,
      prognosis: 'Sem dados de precipitação'
    });
    return {
      totalFalloutDeaths: 0,
      totalFalloutInjuries: 0,
      totalFalloutExposedPop: 0,
      zones: {
        rad1000: emptyZone('rad1000', 'Zona Letal Imediata', '≥ 1.000 rad'),
        rad300: emptyZone('rad300', 'Síndrome Aguda SAR', '300 – 1.000 rad'),
        rad100: emptyZone('rad100', 'Doença da Radiação', '100 – 300 rad'),
        rad10: emptyZone('rad10', 'Contaminação Prolongada', '10 – 100 rad')
      }
    };
  }

  const speedScale = Math.pow(windSpeedKmh / 25, 0.65);
  const burstScale = burstType === 'air' ? 0.35 : 1.0;
  const widthScale = Math.pow(25 / windSpeedKmh, 0.3);

  const configs: {
    id: 'rad1000' | 'rad300' | 'rad100' | 'rad10';
    name: string;
    doseDisplay: string;
    fatalityRate: number;
    injuryRate: number;
    prognosis: string;
  }[] = [
    {
      id: 'rad1000',
      name: 'Zona Letal Imediata',
      doseDisplay: '≥ 1.000 rad (10 Gy)',
      fatalityRate: 1.0,
      injuryRate: 0.0,
      prognosis: '100% Letal em 24h a 72h (Colapso SNC)'
    },
    {
      id: 'rad300',
      name: 'Síndrome Aguda da Radiação',
      doseDisplay: '300 – 1.000 rad (3 – 10 Gy)',
      fatalityRate: 0.75,
      injuryRate: 0.25,
      prognosis: '50% a 90% Fatal sem terapia intensiva'
    },
    {
      id: 'rad100',
      name: 'Doença da Radiação & Evacuação',
      doseDisplay: '100 – 300 rad (1 – 3 Gy)',
      fatalityRate: 0.20,
      injuryRate: 0.65,
      prognosis: 'Evacuação e Hospitalização Obrigatória'
    },
    {
      id: 'rad10',
      name: 'Contaminação Prolongada',
      doseDisplay: '10 – 100 rad (0.1 – 1 Gy)',
      fatalityRate: 0.04,
      injuryRate: 0.35,
      prognosis: 'Risco Oncológico & Embargo Alimentar'
    }
  ];

  let prevAreaKm2 = 0;
  let totalFalloutDeaths = 0;
  let totalFalloutInjuries = 0;
  let totalFalloutExposedPop = 0;

  const metroDensity = city.metroDensityPerKm2 ?? 1000;
  const coreDensity = city.coreDensityPerKm2 ?? 3500;

  const zonesRecord = {} as Record<'rad1000' | 'rad300' | 'rad100' | 'rad10', FalloutCasualtyEstimate>;

  for (const cfg of configs) {
    const contour = bomb.fallout.surfaceContours[cfg.id];
    const lenKm = (contour?.lengthKm ?? 1) * speedScale * burstScale;
    const maxHalfWKm = (contour?.maxHalfWidthKm ?? 0.5) * widthScale * (burstType === 'air' ? 0.5 : 1.0);
    const widthKm = maxHalfWKm * 2;

    // Área da pluma elíptica/gotiforme
    const totalPlumeAreaKm2 = Math.max(0.1, (Math.PI / 2) * lenKm * maxHalfWKm);
    const incrementalAreaKm2 = Math.max(0.1, totalPlumeAreaKm2 - prevAreaKm2);

    // Gradiente populacional decrescente à medida que a pluma viaja a sotavento
    const midDistanceKm = lenKm * 0.5;
    const baseDensity = Math.max(
      45,
      Math.round((metroDensity * 0.7) * Math.exp(-midDistanceKm / 50) + (coreDensity * 0.15) * Math.exp(-midDistanceKm / 15) + 60)
    );

    const popExposed = Math.round(incrementalAreaKm2 * baseDensity * (burstType === 'air' ? 0.4 : 1.0));
    const fatalities = Math.round(popExposed * cfg.fatalityRate);
    const injuries = Math.round(popExposed * cfg.injuryRate);

    totalFalloutDeaths += fatalities;
    totalFalloutInjuries += injuries;
    totalFalloutExposedPop += popExposed;

    zonesRecord[cfg.id] = {
      id: cfg.id,
      name: cfg.name,
      doseDisplay: cfg.doseDisplay,
      lengthKm: Math.round(lenKm * 10) / 10,
      widthKm: Math.round(widthKm * 10) / 10,
      areaKm2: Math.round(totalPlumeAreaKm2 * 10) / 10,
      incrementalAreaKm2: Math.round(incrementalAreaKm2 * 10) / 10,
      popExposed,
      fatalityRate: cfg.fatalityRate,
      fatalities,
      injuryRate: cfg.injuryRate,
      injuries,
      prognosis: cfg.prognosis
    };

    prevAreaKm2 = totalPlumeAreaKm2;
  }

  return {
    totalFalloutDeaths,
    totalFalloutInjuries,
    totalFalloutExposedPop,
    zones: zonesRecord
  };
}

export function createCustomNuclearBomb(yieldKt: number): NuclearBombRanking {
  const clampedKt = Math.max(0.02, Math.min(100000, yieldKt));
  const match = NUCLEAR_RANKING_BOMBS.find((b) => Math.abs(b.yieldKt - clampedKt) < 0.0001);
  if (match) return match;

  let yieldDisplay = '';
  if (clampedKt < 1) {
    yieldDisplay = `${clampedKt} kt (${Math.round(clampedKt * 1000)} t TNT)`;
  } else if (clampedKt < 1000) {
    yieldDisplay = `${clampedKt >= 10 ? Math.round(clampedKt * 10) / 10 : clampedKt} kt`;
  } else {
    const mt = clampedKt / 1000;
    yieldDisplay = `${mt >= 10 ? (Math.round(mt * 10) / 10).toLocaleString('pt-BR') : mt.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} MT (${Math.round(clampedKt).toLocaleString('pt-BR')} kt)`;
  }

  const radii = calculateRealNuclearRadiiM(clampedKt, 'surface');
  const falloutScale = Math.pow(Math.max(0.01, clampedKt) / 15, 0.42);

  const mushroomCloudHeightKm = Math.min(
    78,
    Math.max(1.8, Math.round(11.5 * Math.pow(clampedKt / 15, 0.23) * 10) / 10)
  );
  const mushroomCloudCapDiameterKm = Math.min(
    120,
    Math.max(1.5, Math.round(5.0 * Math.pow(clampedKt / 15, 0.28) * 10) / 10)
  );

  return {
    id: `custom-${clampedKt}`,
    name: `Potência Personalizada (${yieldDisplay})`,
    code: `CUSTOM-YIELD-${clampedKt}KT`,
    yieldKt: clampedKt,
    yieldDisplay,
    country: 'Configuração Personalizada',
    countryCode: 'US',
    year: 2026,
    type: clampedKt < 100 ? 'Artefato de Fissão / Tático' : 'Artefato Termonuclear Multiestágio',
    carrier: 'Simulador Físico de Potência',
    description: `Detonação nuclear física com rendimento calibrado de ${yieldDisplay}.`,
    fireballRadiusM: radii.fireballRadiusM,
    vaporizationRadiusM: radii.vaporizationRadiusM,
    heavyBlastRadiusM: radii.heavyBlastRadiusM,
    carbonizationRadiusM: radii.carbonizationRadiusM,
    thermalRadiusM: radii.thermalRadiusM,
    lightBlastRadiusM: radii.lightBlastRadiusM,
    mushroomCloudHeightKm,
    mushroomCloudCapDiameterKm,
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    fallout: {
      fissionPercentage: clampedKt > 1000 ? 50 : 80,
      cloudTopKm: mushroomCloudHeightKm,
      cloudStemRadiusM: Math.round(350 * Math.pow(clampedKt / 15, 0.3)),
      surfaceContours: {
        rad1000: {
          lengthKm: Math.max(0.8, Math.round(18 * falloutScale * 10) / 10),
          maxHalfWidthKm: Math.max(0.2, Math.round(1.8 * falloutScale * 10) / 10)
        },
        rad300: {
          lengthKm: Math.max(1.5, Math.round(42 * falloutScale * 10) / 10),
          maxHalfWidthKm: Math.max(0.3, Math.round(3.5 * falloutScale * 10) / 10)
        },
        rad100: {
          lengthKm: Math.max(3.0, Math.round(75 * falloutScale * 10) / 10),
          maxHalfWidthKm: Math.max(0.5, Math.round(5.8 * falloutScale * 10) / 10)
        },
        rad10: {
          lengthKm: Math.max(6.0, Math.round(120 * falloutScale * 10) / 10),
          maxHalfWidthKm: Math.max(0.9, Math.round(9.5 * falloutScale * 10) / 10)
        }
      },
      historicalFalloutContext: `Dispersão física modelada para ${yieldDisplay}.`
    }
  };
}
