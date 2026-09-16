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
  }
];

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
  }
];

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
    fireballRadiusM: 15,
    vaporizationRadiusM: 22,
    carbonizationRadiusM: 95,
    heavyBlastRadiusM: 76,
    thermalRadiusM: 140,
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
      'A primeira arma nuclear utilizada em combate sobre Hiroshima. Mecanismo de tiro disparando um projétil subcrítico de Urânio-235 contra anéis alvos de urânio, com eficiência de fissão inferior a 1.4%.',
    fireballRadiusM: 180,
    vaporizationRadiusM: 260,
    carbonizationRadiusM: 1350,
    heavyBlastRadiusM: 690,
    thermalRadiusM: 1900,
    lightBlastRadiusM: 3100,
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
    fireballRadiusM: 220,
    vaporizationRadiusM: 310,
    carbonizationRadiusM: 1600,
    heavyBlastRadiusM: 770,
    thermalRadiusM: 2300,
    lightBlastRadiusM: 3400,
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
    name: 'B61 (Mod 11)',
    code: 'B61-11 Earth Penetrator',
    yieldKt: 340,
    yieldDisplay: '340 kt (0.34 MT)',
    country: 'Estados Unidos',
    countryCode: 'US',
    year: 1997,
    type: 'Termonuclear Gravitacional com Penetração de Solo',
    carrier: 'B-2 Spirit, B-52H, F-15E, F-35A',
    description:
      'Bomba termonuclear com carcaça de aço endurecido projetada para penetrar dezenas de metros no solo antes de detonar, canalizando a energia sísmica e de choque para destruir bunkers subterrâneos blindados.',
    fireballRadiusM: 780,
    vaporizationRadiusM: 1100,
    carbonizationRadiusM: 5200,
    heavyBlastRadiusM: 1950,
    thermalRadiusM: 7500,
    lightBlastRadiusM: 8700,
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
      'Primeiro teste com queima termonuclear da União Soviética, concebido por Andrei Sakharov com a "Primeira Ideia" (camadas concêntricas alternadas de Urânio-238 e deutereto de lítio-6 enriquecido com trítio). Produziu 400 kt e demonstrou a capacidade soviética de empregar fusão nuclear em artefatos transportáveis.',
    fireballRadiusM: 860,
    vaporizationRadiusM: 1200,
    carbonizationRadiusM: 5500,
    heavyBlastRadiusM: 2100,
    thermalRadiusM: 7900,
    lightBlastRadiusM: 9300,
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
    fireballRadiusM: 960,
    vaporizationRadiusM: 1350,
    carbonizationRadiusM: 6200,
    heavyBlastRadiusM: 2250,
    thermalRadiusM: 8800,
    lightBlastRadiusM: 10100,
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
    name: 'RDS-37',
    code: 'RDS-37 / 3ª Ideia de Sakharov',
    yieldKt: 1600,
    yieldDisplay: '1.600 kt (1.6 MT)',
    country: 'União Soviética',
    countryCode: 'SU',
    year: 1955,
    type: 'Bomba Termonuclear Bifásica de Implosão por Radiação',
    carrier: 'Bombardeiro Tupolev Tu-16',
    description:
      'A primeira verdadeira bomba de hidrogênio de dois estágios da URSS baseada em implosão por radiação (equivalente soviético ao conceito Teller-Ulam). Lançada por paraquedas a 1.550m sobre Semipalatinsk; para conter a devastação regional, o rendimento foi intencionalmente reduzido de ~3 MT para 1.6 MT.',
    fireballRadiusM: 1520,
    vaporizationRadiusM: 2150,
    carbonizationRadiusM: 10400,
    heavyBlastRadiusM: 3350,
    thermalRadiusM: 14800,
    lightBlastRadiusM: 15200,
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
    fireballRadiusM: 3100,
    vaporizationRadiusM: 4350,
    carbonizationRadiusM: 21500,
    heavyBlastRadiusM: 6100,
    thermalRadiusM: 30200,
    lightBlastRadiusM: 27200,
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
    vaporizationRadiusM: 4900,
    carbonizationRadiusM: 25000,
    heavyBlastRadiusM: 6900,
    thermalRadiusM: 35000,
    lightBlastRadiusM: 30800,
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
    fireballRadiusM: 4300,
    vaporizationRadiusM: 6000,
    carbonizationRadiusM: 31000,
    heavyBlastRadiusM: 8200,
    thermalRadiusM: 43000,
    lightBlastRadiusM: 36500,
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
    fireballRadiusM: 5200,
    vaporizationRadiusM: 7300,
    carbonizationRadiusM: 43000,
    heavyBlastRadiusM: 10300,
    thermalRadiusM: 60000,
    lightBlastRadiusM: 46000,
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
    vaporizationRadiusM: 9400,
    carbonizationRadiusM: 55000,
    heavyBlastRadiusM: 13000,
    thermalRadiusM: 77000,
    lightBlastRadiusM: 58000,
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
    description: 'Dose maciça absorvida nas primeiras horas de exposição direta desabrigada.',
    medicalImpact: 'Colapso vascular e neurológico irreversível, falência gastrointestinal aguda. Morte em prazo de 24 a 72 horas.'
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
    description: 'Área com severa precipitação de partículas e cinzas radioativas pesadas.',
    medicalImpact: 'Destruição total da medula óssea, hemorragias internas graves, perda completa de defesas imunológicas e vômitos intensos.'
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
    description: 'Zona de perigo radiológico com necessidade de abrigo subterrâneo imediato e evacuação.',
    medicalImpact: 'Queda drástica de glóbulos brancos, náuseas, alopecia (queda de cabelo) e risco exponencialmente elevado de leucemia.'
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
    description: 'Pluma periférica carregando isótopos de meia-vida média e longa (Iodo-131, Césio-137, Estrôncio-90).',
    medicalImpact: 'Contaminação crônica de mananciais, solo e plantações. Exige embargo alimentar e descontaminação civil.'
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
      'Temperatura na ordem de dezenas de milhões de graus Celsius. Tudo dentro deste raio — edifícios, asfalto, aço e matéria orgânica — é instantaneamente vaporizado em fração de segundo.'
  },
  {
    id: 'vaporization',
    name: 'Zona de Vaporização (Além da Bola de Fogo)',
    subtitle: 'Desintegração Instantânea & Pirólise Térmica',
    color: '#FB923C',
    fillColor: '#FB923C',
    strokeColor: '#EA580C',
    severity: 'Mortalidade: 100% Instantânea',
    effects:
      'Zona além do plasma da bola de fogo onde o fluxo radiativo direto (> 150 a 300 cal/cm²) vaporiza e desseca instantaneamente corpos biológicos, asfalto e materiais leves antes da chegada mecânica da onda de choque.'
  },
  {
    id: 'carbonization',
    name: 'Zona de Carbonização (Pessoas Carbonizadas)',
    subtitle: 'Calcinação Térmica & Combustão Humana Instantânea',
    color: '#DC2626',
    fillColor: '#DC2626',
    strokeColor: '#991B1B',
    severity: 'Mortalidade: 100% por Carbonização',
    effects:
      'Zona onde o fluxo radiativo térmico excede 25–35 cal/cm². Qualquer ser humano exposto ao ar livre é instantaneamente carbonizado e calcinado até os ossos em fração de segundo. Roupas e calçados entram em combustão imediata fundindo-se à pele. Letalidade biológica imediata de 100%.'
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
      'Sobrepressão de 20 libras por polegada quadrada (psi). Destruição de edifícios de concreto reforçado, pontes e fábricas. Ventos de choque superiores a 800 km/h rasgam estruturas.'
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
      'Pulso térmico emitido em segundos que causa queimaduras de 3º grau sem dor imediata (destruição de terminações nervosas) em toda a pele exposta. Ignição espontânea de madeira, tecidos e combustível, gerando tempestades de fogo.'
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
      'Sobrepressão moderada capaz de estilhaçar vidraças a dezenas de quilômetros, projetando fragmentos afiados em velocidade letal. Deslocamento de telhados e portas residenciais.'
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
  zoneEstimates: Record<'fireball' | 'vaporization' | 'carbonization' | 'heavy' | 'thermal' | 'light', ZoneCasualtyEstimate>;
  orderedZones: ZoneCasualtyEstimate[];
}

export function formatCasualtyNumber(num: number): string {
  return Math.round(num).toLocaleString('pt-BR');
}

export function calculateBombCityCasualties(bomb: NuclearBombRanking, city: TargetCity): BombCasualtySummary {
  const zoneConfigs = [
    { id: 'fireball' as const, name: 'Bola de Fogo (Plasma)', rM: bomb.fireballRadiusM, fatalityRate: 1.0, injuryRate: 0.0, severityLabel: 'Letalidade: 100%' },
    { id: 'vaporization' as const, name: 'Zona de Vaporização Total', rM: bomb.vaporizationRadiusM, fatalityRate: 0.99, injuryRate: 0.01, severityLabel: 'Mortalidade: 99%' },
    { id: 'heavy' as const, name: 'Choque Pesado (20 psi)', rM: bomb.heavyBlastRadiusM, fatalityRate: 0.85, injuryRate: 0.12, severityLabel: 'Mortalidade: 85%' },
    { id: 'carbonization' as const, name: 'Zona de Carbonização Humana', rM: bomb.carbonizationRadiusM, fatalityRate: 0.95, injuryRate: 0.05, severityLabel: 'Mortalidade: 95%' },
    { id: 'thermal' as const, name: 'Raio Térmico (Queimaduras 3º Grau)', rM: bomb.thermalRadiusM, fatalityRate: 0.50, injuryRate: 0.40, severityLabel: 'Mortalidade: 50%' },
    { id: 'light' as const, name: 'Choque Leve (1 psi)', rM: bomb.lightBlastRadiusM, fatalityRate: 0.08, injuryRate: 0.35, severityLabel: 'Mortalidade: 8%' },
  ];

  // Ordenar por raio crescente para calcular anéis concêntricos sem sobreposição de população
  const sorted = [...zoneConfigs].sort((a, b) => a.rM - b.rM);

  const coreDensity = city.coreDensityPerKm2 || 4000;
  const metroDensity = city.metroDensityPerKm2 || 1000;
  const maxMetroPop = city.metroPopulation || (city.urbanPopulation ? city.urbanPopulation * 1.8 : 3000000);
  const urbanPop = city.urbanPopulation || (maxMetroPop * 0.6);

  const coreRadiusKm = Math.sqrt(urbanPop / (Math.PI * coreDensity));

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
    const densityAtMid = metroDensity + (coreDensity - metroDensity) * Math.exp(-0.5 * Math.pow(midRKm / Math.max(coreRadiusKm, 1.5), 2));

    let rawRingPop = Math.round(ringAreaKm2 * densityAtMid);
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
      severityLabel: z.severityLabel
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
    zoneEstimates: zoneMap,
    orderedZones
  };
}
