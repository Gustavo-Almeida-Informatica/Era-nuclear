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
  moderateBlastRadiusM: number;
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
  ruralDensityPerKm2?: number;
  isUninhabitedOrWater?: boolean;
  settlementType?: 'metropolis' | 'city' | 'town' | 'village' | 'rural' | 'uninhabited' | 'water';
  confidenceLevel?: 'high' | 'moderate' | 'low' | 'uninhabited';
  dataLimitationNotice?: string;
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
  },
  {
    id: 'shanghai',
    name: 'Xangai',
    country: 'China',
    lat: 31.2304,
    lng: 121.4737,
    description: 'Maior centro financeiro da China e um dos maiores portos e concentrações populacionais do mundo.',
    populationEstimate: '~24,8 milhões (metrópole: 28 milhões)',
    urbanPopulation: 24800000,
    metroPopulation: 28000000,
    coreDensityPerKm2: 6800,
    metroDensityPerKm2: 2900
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    country: 'Índia',
    lat: 19.076,
    lng: 72.8777,
    description: 'Capital financeira da Índia e uma das metrópoles mais densamente povoadas do planeta.',
    populationEstimate: '~12,5 milhões (metrópole: 21 milhões)',
    urbanPopulation: 12500000,
    metroPopulation: 21000000,
    coreDensityPerKm2: 21000,
    metroDensityPerKm2: 4800
  },
  {
    id: 'pyongyang',
    name: 'Pyongyang',
    country: 'Coreia do Norte',
    lat: 39.0392,
    lng: 125.7625,
    description: 'Capital da República Popular Democrática da Coreia, sede do comando militar e nuclear norte-coreano.',
    populationEstimate: '~3,0 milhões',
    urbanPopulation: 3000000,
    metroPopulation: 3300000,
    coreDensityPerKm2: 5500,
    metroDensityPerKm2: 1200
  },
  {
    id: 'toronto',
    name: 'Toronto',
    country: 'Canadá',
    lat: 43.6532,
    lng: -79.3832,
    description: 'Maior cidade do Canadá, centro financeiro e econômico do país.',
    populationEstimate: '~2,8 milhões (metrópole: 6,4 milhões)',
    urbanPopulation: 2800000,
    metroPopulation: 6400000,
    coreDensityPerKm2: 4400,
    metroDensityPerKm2: 1050
  },
  {
    id: 'santiago',
    name: 'Santiago',
    country: 'Chile',
    lat: -33.4489,
    lng: -70.6693,
    description: 'Capital do Chile, situada no vale central cercada pela Cordilheira dos Andes.',
    populationEstimate: '~6,2 milhões (metrópole: 7,1 milhões)',
    urbanPopulation: 6200000,
    metroPopulation: 7100000,
    coreDensityPerKm2: 7500,
    metroDensityPerKm2: 1500
  },
  {
    id: 'bogota',
    name: 'Bogotá',
    country: 'Colômbia',
    lat: 4.711,
    lng: -74.0721,
    description: 'Capital da Colômbia, metrópole de alta altitude no planalto andino.',
    populationEstimate: '~8,0 milhões (metrópole: 11 milhões)',
    urbanPopulation: 8000000,
    metroPopulation: 11000000,
    coreDensityPerKm2: 13500,
    metroDensityPerKm2: 2600
  },
  {
    id: 'lima',
    name: 'Lima',
    country: 'Peru',
    lat: -12.0464,
    lng: -77.0428,
    description: 'Capital do Peru e principal centro urbano da costa do Pacífico na América do Sul.',
    populationEstimate: '~9,7 milhões (metrópole: 11 milhões)',
    urbanPopulation: 9700000,
    metroPopulation: 11000000,
    coreDensityPerKm2: 8300,
    metroDensityPerKm2: 2200
  },
  {
    id: 'luanda',
    name: 'Luanda',
    country: 'Angola',
    lat: -8.839,
    lng: 13.2894,
    description: 'Capital de Angola e maior cidade lusófona do continente africano.',
    populationEstimate: '~2,6 milhões (metrópole: 8,5 milhões)',
    urbanPopulation: 2600000,
    metroPopulation: 8500000,
    coreDensityPerKm2: 9200,
    metroDensityPerKm2: 3100
  },
  {
    id: 'maputo',
    name: 'Maputo',
    country: 'Moçambique',
    lat: -25.9692,
    lng: 32.5732,
    description: 'Capital de Moçambique, principal porto e centro urbano do país.',
    populationEstimate: '~1,1 milhão (metrópole: 2,7 milhões)',
    urbanPopulation: 1100000,
    metroPopulation: 2700000,
    coreDensityPerKm2: 3200,
    metroDensityPerKm2: 900
  },
  {
    id: 'houston',
    name: 'Houston',
    country: 'Estados Unidos',
    lat: 29.7604,
    lng: -95.3698,
    description: 'Quarta maior cidade dos EUA, polo global de energia e sede do Johnson Space Center da NASA.',
    populationEstimate: '~2,3 milhões (metrópole: 7,1 milhões)',
    urbanPopulation: 2300000,
    metroPopulation: 7100000,
    coreDensityPerKm2: 1500,
    metroDensityPerKm2: 600
  },
  {
    id: 'miami',
    name: 'Miami',
    country: 'Estados Unidos',
    lat: 25.7617,
    lng: -80.1918,
    description: 'Importante centro financeiro e comercial do sudeste dos EUA e porta de entrada para a América Latina.',
    populationEstimate: '~450 mil (metrópole: 6,2 milhões)',
    urbanPopulation: 450000,
    metroPopulation: 6200000,
    coreDensityPerKm2: 4800,
    metroDensityPerKm2: 1400
  },
  {
    id: 'san-francisco',
    name: 'São Francisco',
    country: 'Estados Unidos',
    lat: 37.7749,
    lng: -122.4194,
    description: 'Polo global de tecnologia e capital financeira da Bay Area no norte da Califórnia.',
    populationEstimate: '~870 mil (Bay Area: 7,7 milhões)',
    urbanPopulation: 870000,
    metroPopulation: 7700000,
    coreDensityPerKm2: 7300,
    metroDensityPerKm2: 1200
  },
  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    lat: 41.1579,
    lng: -8.6291,
    description: 'Segunda maior cidade de Portugal e centro econômico da região Norte.',
    populationEstimate: '~235 mil (metrópole: 1,8 milhão)',
    urbanPopulation: 235000,
    metroPopulation: 1800000,
    coreDensityPerKm2: 5600,
    metroDensityPerKm2: 1100
  },
  {
    id: 'campinas',
    name: 'Campinas',
    country: 'Brasil',
    lat: -22.9099,
    lng: -47.0626,
    description: 'Principal polo tecnológico do interior paulista e sede de renomadas universidades e centros de pesquisa.',
    populationEstimate: '~1,2 milhão (metrópole: 3,3 milhões)',
    urbanPopulation: 1220000,
    metroPopulation: 3300000,
    coreDensityPerKm2: 1550,
    metroDensityPerKm2: 850
  },
  {
    id: 'santos',
    name: 'Santos',
    country: 'Brasil',
    lat: -23.9618,
    lng: -46.3322,
    description: 'Maior complexo portuário da América Latina e centro da Baixada Santista.',
    populationEstimate: '~430 mil (metrópole: 1,8 milhão)',
    urbanPopulation: 430000,
    metroPopulation: 1800000,
    coreDensityPerKm2: 1500,
    metroDensityPerKm2: 800
  },
  {
    id: 'florianopolis',
    name: 'Florianópolis',
    country: 'Brasil',
    lat: -27.5954,
    lng: -48.548,
    description: 'Capital de Santa Catarina, polo de tecnologia e turismo no Sul do Brasil.',
    populationEstimate: '~530 mil (metrópole: 1,2 milhão)',
    urbanPopulation: 530000,
    metroPopulation: 1250000,
    coreDensityPerKm2: 780,
    metroDensityPerKm2: 350
  },
  {
    id: 'natal',
    name: 'Natal',
    country: 'Brasil',
    lat: -5.7945,
    lng: -35.211,
    description: 'Capital do Rio Grande do Norte, marco estratégico do litoral nordestino ("Esquina do Continente").',
    populationEstimate: '~890 mil (metrópole: 1,5 milhão)',
    urbanPopulation: 890000,
    metroPopulation: 1500000,
    coreDensityPerKm2: 5200,
    metroDensityPerKm2: 1100
  },
  {
    id: 'campo-grande',
    name: 'Campo Grande',
    country: 'Brasil',
    lat: -20.4697,
    lng: -54.6201,
    description: 'Capital do Mato Grosso do Sul, polo agroindustrial e logístico do Centro-Oeste.',
    populationEstimate: '~910 mil',
    urbanPopulation: 910000,
    metroPopulation: 1000000,
    coreDensityPerKm2: 1100,
    metroDensityPerKm2: 300
  },
  {
    id: 'cuiaba',
    name: 'Cuiabá',
    country: 'Brasil',
    lat: -15.6014,
    lng: -56.0979,
    description: 'Capital de Mato Grosso e centro geodésico da América do Sul.',
    populationEstimate: '~650 mil (metrópole: 1,0 milhão)',
    urbanPopulation: 650000,
    metroPopulation: 1050000,
    coreDensityPerKm2: 1800,
    metroDensityPerKm2: 400
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
    fireballRadiusM: 20,
    vaporizationRadiusM: 40,
    carbonizationRadiusM: 60,
    heavyBlastRadiusM: 60,
    moderateBlastRadiusM: 130,
    thermalRadiusM: 210,
    lightBlastRadiusM: 340,
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
    fireballRadiusM: 200,
    vaporizationRadiusM: 780,
    carbonizationRadiusM: 1100,
    heavyBlastRadiusM: 1020,
    moderateBlastRadiusM: 2200,
    thermalRadiusM: 1910,
    lightBlastRadiusM: 5790,
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
    fireballRadiusM: 230,
    vaporizationRadiusM: 870,
    carbonizationRadiusM: 1230,
    heavyBlastRadiusM: 1140,
    moderateBlastRadiusM: 2460,
    thermalRadiusM: 2220,
    lightBlastRadiusM: 6480,
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
    fireballRadiusM: 690,
    vaporizationRadiusM: 2210,
    carbonizationRadiusM: 3120,
    heavyBlastRadiusM: 2890,
    moderateBlastRadiusM: 6230,
    thermalRadiusM: 7840,
    lightBlastRadiusM: 16400,
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
    fireballRadiusM: 730,
    vaporizationRadiusM: 2330,
    carbonizationRadiusM: 3300,
    heavyBlastRadiusM: 3050,
    moderateBlastRadiusM: 6580,
    thermalRadiusM: 8450,
    lightBlastRadiusM: 17320,
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
    fireballRadiusM: 810,
    vaporizationRadiusM: 2510,
    carbonizationRadiusM: 3550,
    heavyBlastRadiusM: 3290,
    moderateBlastRadiusM: 7090,
    thermalRadiusM: 9280,
    lightBlastRadiusM: 18660,
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
    fireballRadiusM: 1300,
    vaporizationRadiusM: 3720,
    carbonizationRadiusM: 5250,
    heavyBlastRadiusM: 4870,
    moderateBlastRadiusM: 10500,
    thermalRadiusM: 15500,
    lightBlastRadiusM: 27650,
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
    fireballRadiusM: 2750,
    vaporizationRadiusM: 6970,
    carbonizationRadiusM: 9840,
    heavyBlastRadiusM: 9130,
    moderateBlastRadiusM: 19680,
    thermalRadiusM: 34400,
    lightBlastRadiusM: 51830,
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
    fireballRadiusM: 3500,
    vaporizationRadiusM: 7860,
    carbonizationRadiusM: 11100,
    heavyBlastRadiusM: 10300,
    moderateBlastRadiusM: 22210,
    thermalRadiusM: 40090,
    lightBlastRadiusM: 58470,
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
    fireballRadiusM: 4290,
    vaporizationRadiusM: 9320,
    carbonizationRadiusM: 13160,
    heavyBlastRadiusM: 12210,
    moderateBlastRadiusM: 26330,
    thermalRadiusM: 49610,
    lightBlastRadiusM: 69330,
    mushroomCloudHeightKm: 48.0,
    mushroomCloudCapDiameterKm: 72.0,
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
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
    fireballRadiusM: 5300,
    vaporizationRadiusM: 11750,
    carbonizationRadiusM: 16580,
    heavyBlastRadiusM: 15380,
    moderateBlastRadiusM: 33180,
    thermalRadiusM: 66000,
    lightBlastRadiusM: 87350,
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
    vaporizationRadiusM: 14800,
    carbonizationRadiusM: 20890,
    heavyBlastRadiusM: 19380,
    moderateBlastRadiusM: 41800,
    thermalRadiusM: 87830,
    lightBlastRadiusM: 110050,
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
  const upwindR = Math.min(upwindRadiusKm, lengthKm * 0.12, maxHalfWidthKm * 0.65);
  const numCapSteps = 48;
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

  // Helper for smooth teardrop half-width at normalized distance s in [0, 1]
  // Starts exactly at upwindR at s = 0, expands smoothly to peak around s = 0.22, and curves smoothly to 0 at s = 1
  const getHalfWidth = (s: number) => {
    const baseCap = upwindR * Math.pow(Math.max(0, 1 - s), 2.2);
    const plumeProfile = maxHalfWidthKm * 2.85 * Math.sqrt(s) * Math.pow(Math.max(0, 1 - s), 1.15);
    return Math.hypot(baseCap, plumeProfile);
  };

  // Non-linear parameter distribution: clusters points densely near s = 0 (stem curve) and s = 1 (downwind tip curve)
  const numDownwindSteps = 140;
  const getParamS = (i: number) => {
    const t = i / numDownwindSteps;
    // Smooth cosine-based clustering at both ends (s=0 and s=1) for completely curved edges even at high zoom
    return 0.5 * (1 - Math.cos(Math.PI * t));
  };

  // 2. Downwind right side (from stem to tip)
  for (let i = 1; i <= numDownwindSteps; i++) {
    const s = getParamS(i);
    const x = s * lengthKm;
    const y = -getHalfWidth(s);

    const dEast = x * dirE + y * perpE;
    const dNorth = x * dirN + y * perpN;

    const lat = centerLat + dNorth / 111.32;
    const lng = centerLng + dEast / (111.32 * cosLat);
    points.push([lat, lng]);
  }

  // 3. Downwind left side (from tip back to stem)
  for (let i = numDownwindSteps - 1; i >= 1; i--) {
    const s = getParamS(i);
    const x = s * lengthKm;
    const y = getHalfWidth(s);

    const dEast = x * dirE + y * perpE;
    const dNorth = x * dirN + y * perpN;

    const lat = centerLat + dNorth / 111.32;
    const lng = centerLng + dEast / (111.32 * cosLat);
    points.push([lat, lng]);
  }

  return points;
}

export interface ImpactLayerInfo {
  id: 'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'moderate' | 'thermal' | 'light';
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
    name: '1º Bola de Fogo Nuclear',
    subtitle: 'Vaporização Instantânea & Plasma (100M °C)',
    color: '#FACC15',
    fillColor: '#FACC15',
    strokeColor: '#EAB308',
    severity: 'Letalidade: 100% (Plasma)',
    effects:
      'Temperatura do Sol (~ 100 milhões de °C). Vaporização imediata de qualquer matéria em contato direto.'
  },
  {
    id: 'vaporization',
    name: '2º Vaporização Imediata',
    subtitle: 'Radiação Térmica Extrema & Fusão de Materiais',
    color: '#FB923C',
    fillColor: '#FB923C',
    strokeColor: '#EA580C',
    severity: 'Letalidade: 100%',
    effects:
      'Radiação térmica extrema próximo ao limite da bola de fogo; estruturas de aço, concreto e rochas são instantaneamente vaporizadas ou derretidas.'
  },
  {
    id: 'carbonization',
    name: '3º Carbonização Total',
    subtitle: 'Ignição Instantânea & Cinzas',
    color: '#DC2626',
    fillColor: '#EF4444',
    strokeColor: '#B91C1C',
    severity: 'Letalidade: 100%',
    effects:
      'Ignição instantânea de qualquer material combustível. A vegetação, edifícios e compostos orgânicos viram cinzas antes mesmo da chegada da onda de choque.'
  },
  {
    id: 'heavy',
    name: '4º Onda de Choque Pesada (> 20 psi)',
    subtitle: 'Sobrepressão Extrema & Ventos > 1.000 km/h',
    color: '#EC4899',
    fillColor: '#F472B6',
    strokeColor: '#DB2777',
    severity: 'Letalidade: 95% – 100%',
    effects:
      'Sobrepressão extrema (> 20 psi). Destruição total de edifícios reforçados e estruturas de concreto armado. Ventos superiores a 1.000 km/h.'
  },
  {
    id: 'moderate',
    name: '5º Onda de Choque Moderada (~ 5 psi)',
    subtitle: 'Colapso Quase Total de Alvenaria Residencial',
    color: '#8B5CF6',
    fillColor: '#A78BFA',
    strokeColor: '#7C3AED',
    severity: 'Letalidade: 30% – 55%',
    effects:
      'Sobrepressão média (~ 5 psi). Colapso quase total de edifícios residenciais de alvenaria. Danos graves a estruturas pesadas.'
  },
  {
    id: 'thermal',
    name: '6º Raio Térmico (Queimadura de 3º Grau)',
    subtitle: 'Pulso de Luz e Calor Radiante a Quilômetros',
    color: '#F97316',
    fillColor: '#F97316',
    strokeColor: '#EA580C',
    severity: 'Letalidade: 8% – 22%',
    effects:
      'O pulso de luz e calor causa queimaduras de 3º grau em pele exposta e ignição de roupas e papel a dezenas de quilômetros.'
  },
  {
    id: 'light',
    name: '7º Onda de Choque Leve (1-2 psi)',
    subtitle: 'Sobrepressão Baixa & Estilhaços Voando',
    color: '#94A3B8',
    fillColor: '#94A3B8',
    strokeColor: '#64748B',
    severity: 'Letalidade: 0.5% – 3%',
    effects:
      'Sobrepressão baixa (~ 1 a 2 psi). Quebra maciça de vidros, estilhaços voando e danos menores a estruturas leves.'
  }
];

export interface ZoneCasualtyEstimate {
  id: 'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'moderate' | 'thermal' | 'light';
  name: string;
  radiusM: number;
  innerRadiusM: number;
  ringAreaKm2: number;
  cumulativeAreaKm2: number;
  populationExposed: number;
  fatalityRate: number;
  fatalityMin: number;
  fatalityMax: number;
  fatalities: number;
  fatalitiesMin: number;
  fatalitiesMax: number;
  fatalitiesRangeDisplay: string;
  injuryRate: number;
  injuryMin: number;
  injuryMax: number;
  injuries: number;
  injuriesMin: number;
  injuriesMax: number;
  injuriesRangeDisplay: string;
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
  deathsMin: number;
  deathsMax: number;
  deathsRangeDisplay: string;
  totalInjuries: number;
  injuriesMin: number;
  injuriesMax: number;
  injuriesRangeDisplay: string;
  totalCasualties: number;
  totalAffectedPop: number;
  mortalityPercentage: number;
  carbonizationDeaths: number;
  heavyBlastDeaths?: number;
  moderateBlastDeaths?: number;
  thermalDeaths: number;
  lightBlastDeaths: number;
  confidenceLevel: 'high' | 'moderate' | 'low' | 'uninhabited';
  confidenceLabel: string;
  estimationNotes: string;
  isUninhabitedOrWater: boolean;
  zoneEstimates: Record<
    'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'moderate' | 'thermal' | 'light',
    ZoneCasualtyEstimate
  >;
  orderedZones: ZoneCasualtyEstimate[];
}

export function formatCasualtyNumber(num: number): string {
  return Math.round(num).toLocaleString('pt-BR');
}

export function formatCasualtyRange(min: number, max: number): string {
  if (min === 0 && max === 0) return '0 (área desabitada)';
  if (min === max) return formatCasualtyNumber(min);
  return `${formatCasualtyNumber(min)} – ${formatCasualtyNumber(max)}`;
}

/**
 * Tabela de Métricas Físicas e Relação de Escala de Zonas de Destruição Nucleares
 * (Castle Bravo com Diâmetro de Bola de Fogo de 7,0 km):
 * Valores em metros de Raio (R) para cada uma das 12 potências nucleares de referência:
 * - Davy Crockett (0,02 kt): R: 20m, 40m, 60m, 60m, 130m, 210m (3º grau), 340m (1 psi)
 * - Little Boy (15 kt): R: 200m, 780m, 1,10km, 1,02km, 2,20km, 1,91km (3º grau), 5,79km (1 psi)
 * - Fat Man (21 kt): R: 230m, 870m, 1,23km, 1,14km, 2,46km, 2,22km (3º grau), 6,48km (1 psi)
 * - Minuteman III (340 kt): R: 690m, 2,21km, 3,12km, 2,89km, 6,23km, 7,84km (3º grau), 16,40km (1 psi)
 * - RDS-6 (400 kt): R: 730m, 2,33km, 3,30km, 3,05km, 6,58km, 8,45km (3º grau), 17,32km (1 psi)
 * - Ivy King (500 kt): R: 810m, 2,51km, 3,55km, 3,29km, 7,09km, 9,28km (3º grau), 18,66km (1 psi)
 * - RDS-37 (1,6 Mt): R: 1,30km, 3,72km, 5,25km, 4,87km, 10,50km, 15,50km (3º grau), 27,65km (1 psi)
 * - Ivy Mike (10,4 Mt): R: 2,75km, 6,97km, 9,84km, 9,13km, 19,68km, 34,40km (3º grau), 51,83km (1 psi)
 * - Castle Bravo (15 Mt): R: 3,50km (Ø 7,0km), 7,86km, 11,10km, 10,30km, 22,21km, 40,09km (3º grau), 58,47km (1 psi)
 * - B41 (25 Mt): R: 4,29km, 9,32km, 13,16km, 12,21km, 26,33km, 49,61km (3º grau), 69,33km (1 psi)
 * - Tsar Bomba (50 Mt): R: 5,30km, 11,75km, 16,58km, 15,38km, 33,18km, 66,00km (3º grau), 87,35km (1 psi)
 * - Tsar Bomba (100 Mt): R: 6,70km, 14,80km, 20,89km, 19,38km, 41,80km, 87,83km (3º grau), 110,05km (1 psi)
 */
export const DESTRUCTION_ZONE_BENCHMARKS: Record<
  number,
  {
    fireballRadiusM: number;
    vaporizationRadiusM: number;
    carbonizationRadiusM: number;
    heavyBlastRadiusM: number;
    moderateBlastRadiusM: number;
    thermalRadiusM: number;
    lightBlastRadiusM: number;
  }
> = {
  0.02: {
    fireballRadiusM: 20,
    vaporizationRadiusM: 40,
    carbonizationRadiusM: 60,
    heavyBlastRadiusM: 60,
    moderateBlastRadiusM: 130,
    thermalRadiusM: 210,
    lightBlastRadiusM: 340
  },
  15: {
    fireballRadiusM: 200,
    vaporizationRadiusM: 780,
    carbonizationRadiusM: 1100,
    heavyBlastRadiusM: 1020,
    moderateBlastRadiusM: 2200,
    thermalRadiusM: 1910,
    lightBlastRadiusM: 5790
  },
  21: {
    fireballRadiusM: 230,
    vaporizationRadiusM: 870,
    carbonizationRadiusM: 1230,
    heavyBlastRadiusM: 1140,
    moderateBlastRadiusM: 2460,
    thermalRadiusM: 2220,
    lightBlastRadiusM: 6480
  },
  340: {
    fireballRadiusM: 690,
    vaporizationRadiusM: 2210,
    carbonizationRadiusM: 3120,
    heavyBlastRadiusM: 2890,
    moderateBlastRadiusM: 6230,
    thermalRadiusM: 7840,
    lightBlastRadiusM: 16400
  },
  400: {
    fireballRadiusM: 730,
    vaporizationRadiusM: 2330,
    carbonizationRadiusM: 3300,
    heavyBlastRadiusM: 3050,
    moderateBlastRadiusM: 6580,
    thermalRadiusM: 8450,
    lightBlastRadiusM: 17320
  },
  500: {
    fireballRadiusM: 810,
    vaporizationRadiusM: 2510,
    carbonizationRadiusM: 3550,
    heavyBlastRadiusM: 3290,
    moderateBlastRadiusM: 7090,
    thermalRadiusM: 9280,
    lightBlastRadiusM: 18660
  },
  1600: {
    fireballRadiusM: 1300,
    vaporizationRadiusM: 3720,
    carbonizationRadiusM: 5250,
    heavyBlastRadiusM: 4870,
    moderateBlastRadiusM: 10500,
    thermalRadiusM: 15500,
    lightBlastRadiusM: 27650
  },
  10000: {
    fireballRadiusM: 2750,
    vaporizationRadiusM: 6970,
    carbonizationRadiusM: 9840,
    heavyBlastRadiusM: 9130,
    moderateBlastRadiusM: 19680,
    thermalRadiusM: 34400,
    lightBlastRadiusM: 51830
  },
  10400: {
    fireballRadiusM: 2750,
    vaporizationRadiusM: 6970,
    carbonizationRadiusM: 9840,
    heavyBlastRadiusM: 9130,
    moderateBlastRadiusM: 19680,
    thermalRadiusM: 34400,
    lightBlastRadiusM: 51830
  },
  15000: {
    fireballRadiusM: 3500,
    vaporizationRadiusM: 7860,
    carbonizationRadiusM: 11100,
    heavyBlastRadiusM: 10300,
    moderateBlastRadiusM: 22210,
    thermalRadiusM: 40090,
    lightBlastRadiusM: 58470
  },
  25000: {
    fireballRadiusM: 4290,
    vaporizationRadiusM: 9320,
    carbonizationRadiusM: 13160,
    heavyBlastRadiusM: 12210,
    moderateBlastRadiusM: 26330,
    thermalRadiusM: 49610,
    lightBlastRadiusM: 69330
  },
  50000: {
    fireballRadiusM: 5300,
    vaporizationRadiusM: 11750,
    carbonizationRadiusM: 16580,
    heavyBlastRadiusM: 15380,
    moderateBlastRadiusM: 33180,
    thermalRadiusM: 66000,
    lightBlastRadiusM: 87350
  },
  100000: {
    fireballRadiusM: 6700,
    vaporizationRadiusM: 14800,
    carbonizationRadiusM: 20890,
    heavyBlastRadiusM: 19380,
    moderateBlastRadiusM: 41800,
    thermalRadiusM: 87830,
    lightBlastRadiusM: 110050
  }
};

export function calculateRealNuclearRadiiM(yieldKt: number, burstType: 'air' | 'surface' = 'surface') {
  const isAir = burstType === 'air';

  // Se a potência coincide exatamente com um dos patamares de referência, emprega os dados exatos calibrados
  const benchmark = DESTRUCTION_ZONE_BENCHMARKS[yieldKt];
  if (benchmark) {
    if (!isAir) {
      return { ...benchmark };
    }
    return {
      fireballRadiusM: Math.round(benchmark.fireballRadiusM * 0.95),
      vaporizationRadiusM: Math.round(benchmark.vaporizationRadiusM * 1.05),
      carbonizationRadiusM: Math.round(benchmark.carbonizationRadiusM * 1.08),
      heavyBlastRadiusM: Math.round(benchmark.heavyBlastRadiusM * 1.15),
      moderateBlastRadiusM: Math.round(benchmark.moderateBlastRadiusM * 1.15),
      thermalRadiusM: Math.round(benchmark.thermalRadiusM * 1.1),
      lightBlastRadiusM: Math.round(benchmark.lightBlastRadiusM * 1.18)
    };
  }

  // Interpolação contínua e escalonamento rigoroso baseado na tabela oficial de 12 armas
  const sortedYields = [0.02, 15, 21, 340, 400, 500, 1600, 10400, 15000, 25000, 50000, 100000];

  let baseFireball: number;
  let baseVaporization: number;
  let baseCarbonization: number;
  let baseHeavyBlast: number;
  let baseModerateBlast: number;
  let baseThermal: number;
  let baseLightBlast: number;

  if (yieldKt <= 0.02) {
    const factor = Math.pow(Math.max(0.0001, yieldKt) / 0.02, 1 / 3);
    const b = DESTRUCTION_ZONE_BENCHMARKS[0.02];
    baseFireball = Math.max(3, Math.round(b.fireballRadiusM * factor));
    baseVaporization = Math.max(5, Math.round(b.vaporizationRadiusM * factor));
    baseCarbonization = Math.max(8, Math.round(b.carbonizationRadiusM * factor));
    baseHeavyBlast = Math.max(10, Math.round(b.heavyBlastRadiusM * factor));
    baseModerateBlast = Math.max(15, Math.round(b.moderateBlastRadiusM * factor));
    baseThermal = Math.max(20, Math.round(b.thermalRadiusM * factor));
    baseLightBlast = Math.max(30, Math.round(b.lightBlastRadiusM * factor));
  } else if (yieldKt >= 100000) {
    const factor = Math.pow(yieldKt / 100000, 1 / 3);
    const b = DESTRUCTION_ZONE_BENCHMARKS[100000];
    baseFireball = Math.round(b.fireballRadiusM * factor);
    baseVaporization = Math.round(b.vaporizationRadiusM * factor);
    baseCarbonization = Math.round(b.carbonizationRadiusM * factor);
    baseHeavyBlast = Math.round(b.heavyBlastRadiusM * factor);
    baseModerateBlast = Math.round(b.moderateBlastRadiusM * factor);
    baseThermal = Math.round(b.thermalRadiusM * factor);
    baseLightBlast = Math.round(b.lightBlastRadiusM * factor);
  } else {
    let lowerY = sortedYields[0];
    let upperY = sortedYields[sortedYields.length - 1];
    for (let i = 0; i < sortedYields.length - 1; i++) {
      if (yieldKt >= sortedYields[i] && yieldKt <= sortedYields[i + 1]) {
        lowerY = sortedYields[i];
        upperY = sortedYields[i + 1];
        break;
      }
    }
    const bLow = DESTRUCTION_ZONE_BENCHMARKS[lowerY];
    const bHigh = DESTRUCTION_ZONE_BENCHMARKS[upperY];
    const t = (Math.log(yieldKt) - Math.log(lowerY)) / (Math.log(upperY) - Math.log(lowerY));
    const interp = (v1: number, v2: number) => Math.round(Math.exp((1 - t) * Math.log(v1) + t * Math.log(v2)));

    baseFireball = interp(bLow.fireballRadiusM, bHigh.fireballRadiusM);
    baseVaporization = interp(bLow.vaporizationRadiusM, bHigh.vaporizationRadiusM);
    baseCarbonization = interp(bLow.carbonizationRadiusM, bHigh.carbonizationRadiusM);
    baseHeavyBlast = interp(bLow.heavyBlastRadiusM, bHigh.heavyBlastRadiusM);
    baseModerateBlast = interp(bLow.moderateBlastRadiusM, bHigh.moderateBlastRadiusM);
    baseThermal = interp(bLow.thermalRadiusM, bHigh.thermalRadiusM);
    baseLightBlast = interp(bLow.lightBlastRadiusM, bHigh.lightBlastRadiusM);
  }

  if (!isAir) {
    return {
      fireballRadiusM: baseFireball,
      vaporizationRadiusM: baseVaporization,
      carbonizationRadiusM: baseCarbonization,
      heavyBlastRadiusM: baseHeavyBlast,
      moderateBlastRadiusM: baseModerateBlast,
      thermalRadiusM: baseThermal,
      lightBlastRadiusM: baseLightBlast
    };
  }

  return {
    fireballRadiusM: Math.round(baseFireball * 0.95),
    vaporizationRadiusM: Math.round(baseVaporization * 1.05),
    carbonizationRadiusM: Math.round(baseCarbonization * 1.08),
    heavyBlastRadiusM: Math.round(baseHeavyBlast * 1.15),
    moderateBlastRadiusM: Math.round(baseModerateBlast * 1.15),
    thermalRadiusM: Math.round(baseThermal * 1.1),
    lightBlastRadiusM: Math.round(baseLightBlast * 1.18)
  };
}

/**
 * Detecta se uma coordenada geográfica (lat, lng) está em águas oceânicas abertas,
 * calotas polares ou áreas continentais inabitadas conhecidas.
 */
export function isLikelyOceanOrUninhabited(lat: number, lng: number): boolean {
  // Áreas polares extremas
  if (lat > 81 || lat < -60) return true;

  // Centro do Oceano Pacífico (vasto e desprovido de população residente contínua)
  if (lat > -55 && lat < 55) {
    if (lng < -125 && lng > -175) return true;
    if (lng > 155 && lng <= 180) return true;
  }

  // Centro do Oceano Atlântico Sul e Norte
  if (lat > -50 && lat < 45 && lng > -42 && lng < -18) return true;

  // Centro do Oceano Índico
  if (lat > -50 && lat < 5 && lng > 60 && lng < 92) return true;

  // Golfo do Alasca / Pacífico Norte
  if (lat > 48 && lat < 58 && lng > -160 && lng < -135) return true;

  return false;
}

/**
 * Calcula a distância geodésica em km entre dois pontos pelo método Haversine.
 */
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Raio médio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Identifica e estima realisticamente o perfil demográfico de qualquer ponto do globo,
 * cruzando proximidade com cidades cadastradas, metadados do OpenStreetMap
 * (tipo de assentamento, município, vila) e modelos territoriais.
 */
export function detectLocationDemographics(
  lat: number,
  lng: number,
  osmData?: {
    address?: Record<string, string>;
    name?: string;
    display_name?: string;
    error?: string;
    addresstype?: string;
    type?: string;
    class?: string;
  }
): {
  urbanPopulation: number;
  metroPopulation: number;
  coreDensityPerKm2: number;
  metroDensityPerKm2: number;
  ruralDensityPerKm2: number;
  settlementType: 'metropolis' | 'city' | 'town' | 'village' | 'rural' | 'uninhabited' | 'water';
  confidenceLevel: 'high' | 'moderate' | 'low' | 'uninhabited';
  dataLimitationNotice: string;
  isUninhabitedOrWater: boolean;
  populationEstimate: string;
} {
  // 1. Proximidade imediata com cidades de referência com censo oficial
  let closestPreset: TargetCity | null = null;
  let minDistanceKm = Infinity;

  for (const preset of WORLD_PRESET_CITIES) {
    const dist = calculateDistanceKm(lat, lng, preset.lat, preset.lng);
    if (dist < minDistanceKm) {
      minDistanceKm = dist;
      closestPreset = preset;
    }
  }

  // Se estiver a menos de 20 km do centro de uma metrópole oficial cadastrada,
  // herda a densidade e características da metrópole (alta confiabilidade)
  if (closestPreset && minDistanceKm <= 20) {
    const decay = Math.exp(-Math.pow(minDistanceKm / 15, 2));
    const coreD = closestPreset.coreDensityPerKm2 ?? 3500;
    const metroD = closestPreset.metroDensityPerKm2 ?? 800;
    const effectiveCoreD = Math.round(metroD + (coreD - metroD) * decay);
    return {
      urbanPopulation: closestPreset.urbanPopulation ?? 500000,
      metroPopulation: closestPreset.metroPopulation ?? 1000000,
      coreDensityPerKm2: effectiveCoreD,
      metroDensityPerKm2: metroD,
      ruralDensityPerKm2: Math.round(metroD * 0.15),
      settlementType: 'metropolis',
      confidenceLevel: 'high',
      dataLimitationNotice: `Dados demográficos calibrados com base no censo da área metropolitana de ${closestPreset.name} (distância do centro: ${minDistanceKm.toFixed(1)} km).`,
      isUninhabitedOrWater: false,
      populationEstimate: closestPreset.populationEstimate
    };
  }

  // 2. Análise de metadados do OpenStreetMap (Nominatim) se fornecido
  const addr = osmData?.address || {};
  const isOsmError = osmData?.error === 'Unable to geocode';
  const isOceanAddress =
    addr.ocean !== undefined ||
    addr.sea !== undefined ||
    osmData?.type === 'water' ||
    osmData?.class === 'natural';

  if (isOsmError || isOceanAddress || isLikelyOceanOrUninhabited(lat, lng)) {
    return {
      urbanPopulation: 0,
      metroPopulation: 0,
      coreDensityPerKm2: 0,
      metroDensityPerKm2: 0,
      ruralDensityPerKm2: 0,
      settlementType: 'water',
      confidenceLevel: 'uninhabited',
      dataLimitationNotice:
        'Localização em área marítima / oceano ou zona polar inabitada. Densidade populacional residente nula.',
      isUninhabitedOrWater: true,
      populationEstimate: 'Área Marítima / Desabitada (0 hab)'
    };
  }

  // Se Nominatim identificou cidade grande
  if (addr.city) {
    return {
      urbanPopulation: 350000,
      metroPopulation: 750000,
      coreDensityPerKm2: 3200,
      metroDensityPerKm2: 850,
      ruralDensityPerKm2: 60,
      settlementType: 'city',
      confidenceLevel: 'moderate',
      dataLimitationNotice: `Área urbana identificada como ${addr.city}. Estimativa baseada em densidades médias de centros urbanos regionais.`,
      isUninhabitedOrWater: false,
      populationEstimate: `Centro Urbano (~350k hab)`
    };
  }

  // Se Nominatim identificou cidade menor / cidade média (town)
  if (addr.town || addr.municipality) {
    const placeName = addr.town || addr.municipality || 'Município';
    return {
      urbanPopulation: 35000,
      metroPopulation: 70000,
      coreDensityPerKm2: 1100,
      metroDensityPerKm2: 320,
      ruralDensityPerKm2: 35,
      settlementType: 'town',
      confidenceLevel: 'moderate',
      dataLimitationNotice: `Município identificado como ${placeName}. Densidade populacional calibrada para cidades de médio/pequeno porte.`,
      isUninhabitedOrWater: false,
      populationEstimate: `Município (~35k hab)`
    };
  }

  // Se Nominatim identificou vila ou povoado rural (village, hamlet)
  if (addr.village || addr.hamlet) {
    const placeName = addr.village || addr.hamlet || 'Vila';
    return {
      urbanPopulation: 2500,
      metroPopulation: 6000,
      coreDensityPerKm2: 250,
      metroDensityPerKm2: 50,
      ruralDensityPerKm2: 18,
      settlementType: 'village',
      confidenceLevel: 'moderate',
      dataLimitationNotice: `Povoado/Vila rural (${placeName}). Densidade reduzida e sem arranha-céus ou grandes concentrações.`,
      isUninhabitedOrWater: false,
      populationEstimate: `Vila Rural (~2.500 hab)`
    };
  }

  // Se for apenas condado/distrito rural ou coordenadas abertas em terra
  const countyName = addr.county || addr.state || 'Área Territorial';
  return {
    urbanPopulation: 5000,
    metroPopulation: 15000,
    coreDensityPerKm2: 80,
    metroDensityPerKm2: 25,
    ruralDensityPerKm2: 12,
    settlementType: 'rural',
    confidenceLevel: 'low',
    dataLimitationNotice: `Coordenada em área rural/aberta (${countyName}). Sem censo populacional direto no ponto; cálculo baseado em densidade territorial média ponderada.`,
    isUninhabitedOrWater: false,
    populationEstimate: `Área Rural Dispersa (~15-80 hab/km²)`
  };
}

/**
 * ============================================================================
 * CÁLCULO CIENTÍFICO E REALISTA DE VÍTIMAS NUCLEARES (calculateBombCityCasualties)
 * ============================================================================
 * 
 * ANÁLISE DETALHADA: POR QUE O CÁLCULO ANTERIOR ESTAVA ERRADO:
 * ----------------------------------------------------------------------------
 * 1. SUPERESTIMATIVA DE LETALIDADE NAS ZONAS INTERMEDIÁRIAS (CARBONIZAÇÃO E TÉRMICA):
 *    - O código anterior atribuía uma taxa de letalidade irreal de 92% (fatalityRate: 0.92)
 *      para a "Zona de Carbonização" (raio de até 2.900 m no caso da Little Boy de 15 kt)
 *      e 28% no raio térmico (até 6.030 m).
 *    - Em termos físicos e geométricos, a coroa circular entre 1.030 m e 2.900 m possui
 *      23,09 km². Em cidades densas, residem aí de 60.000 a 150.000 pessoas.
 *      Aplicar 92% de mortes nessa faixa gerava mais de 58.000 mortes apenas nela,
 *      somando mais 62.000 mortes na faixa térmica seguinte. O total para a Little Boy
 *      ultrapassava 131.000 a 180.000 mortes imediatas!
 *    - Em Hiroshima histórica (agosto de 1945), a população total era de ~340.000 a 350.000,
 *      e as mortes diretas imediatas foram de aproximadamente 70.000 a 80.000.
 *    - Erro conceitual: A 2 km de uma detonação de 15 kt, a sobrepressão cai para menos de 3 psi.
 *      A vasta maioria da população urbana em qualquer instante está no interior de edificações,
 *      veículos ou áreas com sombra de relevo/estruturas, fora da linha de visada direta do flash.
 *      A taxa de 92% só é válida para pessoas completamente expostas ao ar livre no pico do fluxo,
 *      não para 100% dos residentes do anel.
 * 
 * 2. FALTA DE TETO / BOUNDING POPULACIONAL (CRIAÇÃO DE "VÍTIMAS FANTASMA"):
 *    - Na integração radial do anel (2 * pi * r * dr * D(r)), para bombas de média e alta
 *      potência (como 340 kt, 1.6 Mt, ou a Tsar Bomba de 50-100 Mt), o raio se estende por dezenas
 *      a centenas de quilômetros.
 *    - A função de densidade anterior acumulava a população rural e periférica indefinidamente
 *      sem limitar a população urbana ao censo real (urbanPopulation) e a metropolitana ao
 *      censo oficial (metroPopulation). Em Hiroshima, a Tsar Bomba acumulava 3.124.404 pessoas
 *      e 2.274.998 mortes — gerando 1,6 milhão de mortes a mais do que toda a população metropolitana!
 * 
 * 3. VALORES MÍNIMOS E PROPORÇÕES ARBITRÁRIAS:
 *    - Haviam termos residuais forçados (como densidades mínimas fixas) que inflavam artificialmente
 *      áreas de estepe, tundra ártica ou sertão com populações que não existem no terreno.
 * 
 * 4. APRESENTAÇÃO DE NÚMERO EXATO FICTÍCIO:
 *    - Apresentava valores com precisão unitária ilusória nos cartões das zonas (ex: "5.043 pessoas"),
 *      quando os efeitos de armas de destruição em massa são estocásticos, dependendo de hora do dia
 *      (trabalho x repouso), materiais construtivos (alvenaria, concreto, madeira), clima e abrigos.
 * 
 * COMO O CÁLCULO FOI CORRIGIDO:
 * ----------------------------------------------------------------------------
 * 1. CALIBRAÇÃO DAS TAXAS FÍSICAS DE LETALIDADE E FERIMENTOS:
 *    - Bola de Fogo (Plasma): 100% de letalidade (min 100%, max 100%), 0% feridos.
 *    - Vaporização (Fluxo > 100 cal/cm²): 100% letalidade (min 100%, max 100%), 0% feridos.
 *    - Carbonização Total: 100% letalidade (min 100%, max 100%), 0% feridos.
 *    - Choque Pesado (> 20 psi / colapso concreto): 98% letalidade (95% – 100%), 2% feridos.
 *    - Choque Moderado (~ 5 psi): 45% letalidade (30% – 55%), 40% feridos.
 *    - Raio Térmico (Queimaduras 3º grau / linha de visada): 15% letalidade (8% – 22%), 50% feridos.
 *    - Choque Leve (1-2 psi / estilhaçamento de vidros): 1.5% letalidade (0.5% – 3%), 25% feridos.
 * 
 * 2. MODELO DE DENSIDADE RADIAL COM TETO POPULACIONAL RIGOROSO:
 *    - As coroas circulares r_inner a r_outer calculam a área exata em km²: Math.PI * (r_outer² - r_inner²).
 *    - O raio é estritamente convertido de metros para quilômetros (rKm = rM / 1000).
 *    - A densidade integrada obedece aos limites demográficos reais:
 *      * Dentro da mancha metropolitana, a população acumulada não pode exceder metroPopulation.
 *      * Fora da mancha metropolitana, a densidade é a densidade rural média real da região geográfica.
 *      * Em oceanos, calotas polares ou áreas inabitadas identificadas, a densidade é exatamente 0.
 * 
 * 3. ESTIMATIVA APRESENTADA EM INTERVALO [MÍNIMO, MÁXIMO]:
 *    - O resultado fornece intervalo probabilístico de mortes e feridos em cada camada e no total,
 *      refletindo a incerteza de abrigamento, horário e tipo de edificação.
 * 
 * 4. TRANSPARÊNCIA NAS LIMITAÇÕES DE DADOS:
 *    - Para coordenadas sem censo oficial, é exibido aviso de "Estimativa Territorial (Dados Limitados)".
 * ============================================================================
 */
export function calculateBombCityCasualties(
  bomb: NuclearBombRanking,
  city: TargetCity,
  burstType: 'air' | 'surface' = 'surface'
): BombCasualtySummary {
  // 1. Obter raios físicos em metros (m) calculados para a potência e tipo de explosão
  const realRadii = calculateRealNuclearRadiiM(bomb.yieldKt, burstType);

  // 2. Configuração física das 7 zonas com faixas calibradas pelas especificações solicitadas:
  // - Bola de Fogo: 100% de letalidade
  // - Vaporização Imediata: 100% de letalidade
  // - Carbonização Total: 100% de letalidade
  // - Onda de Choque Pesada (> 20 psi): 95% – 100% de letalidade
  const zoneConfigs = [
    {
      id: 'fireball' as const,
      name: '1º Bola de Fogo Nuclear (Plasma)',
      rM: realRadii.fireballRadiusM,
      fatalityRate: 1.0,
      fatalityMin: 1.0,
      fatalityMax: 1.0,
      injuryRate: 0.0,
      injuryMin: 0.0,
      injuryMax: 0.0,
      severityLabel: 'Temperatura do Sol (~100 milhões °C). Vaporização instantânea (100%)'
    },
    {
      id: 'vaporization' as const,
      name: '2º Vaporização Imediata',
      rM: realRadii.vaporizationRadiusM,
      fatalityRate: 1.0,
      fatalityMin: 1.0,
      fatalityMax: 1.0,
      injuryRate: 0.0,
      injuryMin: 0.0,
      injuryMax: 0.0,
      severityLabel: 'Radiação térmica extrema; aço e rochas vaporizados. Letalidade imediata 100%'
    },
    {
      id: 'carbonization' as const,
      name: '3º Carbonização Total',
      rM: realRadii.carbonizationRadiusM,
      fatalityRate: 1.0,
      fatalityMin: 1.0,
      fatalityMax: 1.0,
      injuryRate: 0.0,
      injuryMin: 0.0,
      injuryMax: 0.0,
      severityLabel: 'Ignição instantânea; combustíveis e corpos viram cinzas antes da onda mecânica. Letalidade 100%'
    },
    {
      id: 'heavy' as const,
      name: '4º Onda de Choque Pesada (> 20 psi)',
      rM: realRadii.heavyBlastRadiusM,
      fatalityRate: 0.98,
      fatalityMin: 0.95,
      fatalityMax: 1.0,
      injuryRate: 0.02,
      injuryMin: 0.0,
      injuryMax: 0.05,
      severityLabel: 'Sobrepressão >20 psi e ventos >1.000 km/h; demolição total (95% – 100%)'
    },
    {
      id: 'moderate' as const,
      name: '5º Onda de Choque Moderada (~ 5 psi)',
      rM: realRadii.moderateBlastRadiusM,
      fatalityRate: 0.45,
      fatalityMin: 0.30,
      fatalityMax: 0.55,
      injuryRate: 0.40,
      injuryMin: 0.30,
      injuryMax: 0.50,
      severityLabel: 'Sobrepressão ~5 psi; colapso de edifícios residenciais (30% – 55%)'
    },
    {
      id: 'thermal' as const,
      name: '6º Raio Térmico (Queimadura de 3º Grau)',
      rM: realRadii.thermalRadiusM,
      fatalityRate: 0.15,
      fatalityMin: 0.08,
      fatalityMax: 0.22,
      injuryRate: 0.50,
      injuryMin: 0.38,
      injuryMax: 0.60,
      severityLabel: 'Pulso térmico; queimaduras de 3º grau na pele (8% – 22%)'
    },
    {
      id: 'light' as const,
      name: '7º Onda de Choque Leve (1-2 psi)',
      rM: realRadii.lightBlastRadiusM,
      fatalityRate: 0.015,
      fatalityMin: 0.005,
      fatalityMax: 0.03,
      injuryRate: 0.25,
      injuryMin: 0.15,
      injuryMax: 0.35,
      severityLabel: 'Sobrepressão 1-2 psi; quebra maciça de vidros e estilhaços (0.5% – 3%)'
    },
  ];

  // Ordenar as zonas por raio crescente (em metros) para cálculo de anéis concêntricos sem sobreposição
  const sorted = [...zoneConfigs].sort((a, b) => a.rM - b.rM);

  // 3. Parâmetros demográficos reais da localidade alvo
  const isUninhabited =
    city.isUninhabitedOrWater === true ||
    (city.coreDensityPerKm2 === 0 && (city.metroPopulation ?? 0) === 0) ||
    isLikelyOceanOrUninhabited(city.lat, city.lng);

  const coreDensity = isUninhabited ? 0 : (city.coreDensityPerKm2 ?? 3500);
  const metroDensity = isUninhabited ? 0 : (city.metroDensityPerKm2 ?? 800);
  const ruralDensity = isUninhabited ? 0 : (city.ruralDensityPerKm2 ?? Math.round(metroDensity * 0.12));
  const urbanPop = isUninhabited ? 0 : (city.urbanPopulation ?? 350000);
  const metroPop = isUninhabited ? 0 : (city.metroPopulation ?? 750000);

  // Raios característicos do núcleo urbano central e da conurbação metropolitana (em km)
  // r = sqrt(Pop / (pi * Densidade))
  const rCoreKm = coreDensity > 0 ? Math.sqrt(urbanPop / (Math.PI * coreDensity)) : 1.5;
  const rMetroKm = metroDensity > 0 ? Math.max(rCoreKm * 1.25, Math.sqrt(metroPop / (Math.PI * Math.max(metroDensity, 50)))) : 6.0;

  // Função contínua de densidade populacional radial D(r) em habitantes por km²
  const getDensityAtRadiusKm = (rKm: number): number => {
    if (coreDensity === 0) return 0;
    if (rKm <= rCoreKm) {
      // Núcleo urbano central
      const factor = Math.exp(-Math.pow(rKm / Math.max(rCoreKm, 0.4), 2));
      return metroDensity + (coreDensity - metroDensity) * factor;
    }
    if (rKm <= rMetroKm) {
      // Transição da mancha urbana para a conurbação periférica metropolitana
      const t = (rKm - rCoreKm) / Math.max(rMetroKm - rCoreKm, 0.5);
      const factor = Math.exp(-Math.pow(t, 2));
      return ruralDensity + (metroDensity - ruralDensity) * factor;
    }
    // Além da mancha metropolitana: atenuação suave da densidade rural regional
    const distBeyond = rKm - rMetroKm;
    return ruralDensity * Math.exp(-distBeyond / 60);
  };

  let prevRadiusKm = 0;
  let accumulatedPop = 0;
  let totalDeaths = 0;
  let totalDeathsMin = 0;
  let totalDeathsMax = 0;
  let totalInjuries = 0;
  let totalInjuriesMin = 0;
  let totalInjuriesMax = 0;

  const zoneMap = {} as Record<
    'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'moderate' | 'thermal' | 'light',
    ZoneCasualtyEstimate
  >;
  const orderedZones: ZoneCasualtyEstimate[] = [];

  for (const z of sorted) {
    // Conversão dimensional estrita: raio de metros (m) para quilômetros (km)
    const rKm = z.rM / 1000;
    // Área da coroa circular em km²: Delta A = pi * (r_outer² - r_inner²)
    const ringAreaKm2 = Math.max(0, Math.PI * (rKm * rKm - prevRadiusKm * prevRadiusKm));
    // Área cumulativa total em km²: A = pi * r_outer²
    const cumulativeAreaKm2 = Math.PI * rKm * rKm;

    // Integração numérica em 10 sub-anéis concêntricos (dr) para precisão da densidade local
    const STEPS = 10;
    const dr = (rKm - prevRadiusKm) / STEPS;
    let ringPopExact = 0;

    if (coreDensity > 0 && dr > 0) {
      for (let s = 0; s < STEPS; s++) {
        const subMidR = prevRadiusKm + (s + 0.5) * dr;
        const subArea = 2 * Math.PI * subMidR * dr;
        const subDensity = getDensityAtRadiusKm(subMidR);
        ringPopExact += subArea * subDensity;
      }
    }

    let rawRingPop = Math.round(ringPopExact);

    // CORREÇÃO CRÍTICA DE LIMITAÇÃO DEMOGRÁFICA (Bounding):
    // Impede que a integração populacional radial crie milhões de "habitantes fantasma"
    // quando o anel de explosão ultrapassa a mancha urbana ou conurbada real do censo
    if (rKm <= rMetroKm && accumulatedPop + rawRingPop > metroPop) {
      rawRingPop = Math.max(0, metroPop - accumulatedPop);
    }
    accumulatedPop += rawRingPop;

    // Cálculo das vítimas estimadas com intervalo de incerteza (mínimo e máximo)
    const fatalities = Math.round(rawRingPop * z.fatalityRate);
    const fatalitiesMin = Math.round(rawRingPop * z.fatalityMin);
    const fatalitiesMax = Math.round(rawRingPop * z.fatalityMax);

    const injuries = Math.round(rawRingPop * z.injuryRate);
    const injuriesMin = Math.round(rawRingPop * z.injuryMin);
    const injuriesMax = Math.round(rawRingPop * z.injuryMax);

    const survivors = Math.max(0, rawRingPop - fatalities - injuries);

    totalDeaths += fatalities;
    totalDeathsMin += fatalitiesMin;
    totalDeathsMax += fatalitiesMax;

    totalInjuries += injuries;
    totalInjuriesMin += injuriesMin;
    totalInjuriesMax += injuriesMax;

    const estimate: ZoneCasualtyEstimate = {
      id: z.id,
      name: z.name,
      radiusM: z.rM,
      innerRadiusM: Math.round(prevRadiusKm * 1000),
      ringAreaKm2,
      cumulativeAreaKm2,
      populationExposed: rawRingPop,
      fatalityRate: z.fatalityRate,
      fatalityMin: z.fatalityMin,
      fatalityMax: z.fatalityMax,
      fatalities,
      fatalitiesMin,
      fatalitiesMax,
      fatalitiesRangeDisplay: formatCasualtyRange(fatalitiesMin, fatalitiesMax),
      injuryRate: z.injuryRate,
      injuryMin: z.injuryMin,
      injuryMax: z.injuryMax,
      injuries,
      injuriesMin,
      injuriesMax,
      injuriesRangeDisplay: formatCasualtyRange(injuriesMin, injuriesMax),
      survivors,
      severityLabel: z.severityLabel,
      cumulativeDeaths: totalDeaths,
      cumulativePop: accumulatedPop
    };

    zoneMap[z.id] = estimate;
    orderedZones.push(estimate);
    prevRadiusKm = rKm;
  }

  // 4. Avaliação de confiabilidade estatística e limites de dados (Requisito 7)
  const confidenceLevel = isUninhabited
    ? 'uninhabited'
    : city.confidenceLevel ?? (city.coreDensityPerKm2 !== undefined ? 'high' : 'moderate');

  const confidenceLabel =
    confidenceLevel === 'high'
      ? 'Alta Confiabilidade (Censo Oficial Registrado)'
      : confidenceLevel === 'moderate'
      ? 'Confiabilidade Média (Município Identificado via OSM)'
      : confidenceLevel === 'uninhabited'
      ? 'Área Desabitada / Marítima (0 hab)'
      : 'Estimativa Territorial Ponderada (Dados Limitados)';

  const estimationNotes = isUninhabited
    ? 'Localização identificada em águas marítimas ou zona desprovida de população permanente. Fatalidades e feridos diretos nulos sob a área de impacto.'
    : city.dataLimitationNotice ||
      'Estimativa baseada em integração radial da densidade demográfica, calibrada com taxas de letalidade de literatura (Glasstone/Dolan e FEMA), expressa em intervalo de incerteza por cenários de abrigamento e hora do dia.';

  return {
    bombId: bomb.id,
    bombName: bomb.name,
    yieldDisplay: bomb.yieldDisplay,
    cityId: city.id,
    cityName: city.name,
    totalDeaths,
    deathsMin: totalDeathsMin,
    deathsMax: totalDeathsMax,
    deathsRangeDisplay: formatCasualtyRange(totalDeathsMin, totalDeathsMax),
    totalInjuries,
    injuriesMin: totalInjuriesMin,
    injuriesMax: totalInjuriesMax,
    injuriesRangeDisplay: formatCasualtyRange(totalInjuriesMin, totalInjuriesMax),
    totalCasualties: totalDeaths + totalInjuries,
    totalAffectedPop: accumulatedPop,
    mortalityPercentage: accumulatedPop > 0 ? (totalDeaths / accumulatedPop) * 100 : 0,
    carbonizationDeaths: zoneMap.carbonization?.fatalities ?? 0,
    heavyBlastDeaths: zoneMap.heavy?.fatalities ?? 0,
    moderateBlastDeaths: zoneMap.moderate?.fatalities ?? 0,
    thermalDeaths: zoneMap.thermal?.fatalities ?? 0,
    lightBlastDeaths: zoneMap.light?.fatalities ?? 0,
    confidenceLevel,
    confidenceLabel,
    estimationNotes,
    isUninhabitedOrWater: isUninhabited,
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

  const isUninhabited =
    city.isUninhabitedOrWater === true ||
    (city.coreDensityPerKm2 === 0 && (city.metroPopulation ?? 0) === 0) ||
    isLikelyOceanOrUninhabited(city.lat, city.lng);

  const metroDensity = isUninhabited ? 0 : (city.metroDensityPerKm2 ?? 1000);
  const coreDensity = isUninhabited ? 0 : (city.coreDensityPerKm2 ?? 3500);
  const ruralDensity = isUninhabited ? 0 : (city.ruralDensityPerKm2 ?? Math.round(metroDensity * 0.12));

  const zonesRecord = {} as Record<'rad1000' | 'rad300' | 'rad100' | 'rad10', FalloutCasualtyEstimate>;

  for (const cfg of configs) {
    const contour = bomb.fallout.surfaceContours[cfg.id];
    const lenKm = (contour?.lengthKm ?? 1) * speedScale * burstScale;
    const maxHalfWKm = (contour?.maxHalfWidthKm ?? 0.5) * widthScale * (burstType === 'air' ? 0.5 : 1.0);
    const widthKm = maxHalfWKm * 2;

    // Área da pluma elíptica/gotiforme em km²
    const totalPlumeAreaKm2 = Math.max(0.1, (Math.PI / 2) * lenKm * maxHalfWKm);
    const incrementalAreaKm2 = Math.max(0.1, totalPlumeAreaKm2 - prevAreaKm2);

    // Gradiente populacional decrescente à medida que a pluma viaja a sotavento
    // Respeita a densidade real sem impor pisos arbitrários (+20 ou 15) em áreas desérticas ou árticas
    const midDistanceKm = lenKm * 0.5;
    const baseDensity = isUninhabited
      ? 0
      : Math.round(
          (metroDensity * 0.5) * Math.exp(-midDistanceKm / 45) +
          (coreDensity * 0.15) * Math.exp(-midDistanceKm / 15) +
          ruralDensity * Math.exp(-midDistanceKm / 90)
        );

    const popExposed = isUninhabited ? 0 : Math.round(incrementalAreaKm2 * baseDensity * (burstType === 'air' ? 0.35 : 1.0));
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
    carbonizationRadiusM: radii.carbonizationRadiusM,
    heavyBlastRadiusM: radii.heavyBlastRadiusM,
    moderateBlastRadiusM: radii.moderateBlastRadiusM,
    thermalRadiusM: radii.thermalRadiusM,
    lightBlastRadiusM: radii.lightBlastRadiusM,
    mushroomCloudHeightKm,
    mushroomCloudCapDiameterKm,
    badgeColor: 'border-red-500/40 text-red-400 bg-red-500/10',
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
