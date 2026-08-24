export interface ImpactSection {
  id: string;
  category: 'humanos' | 'ambientais' | 'climaticos';
  title: string;
  subtitle: string;
  shortSummary: string;
  keyEffects: {
    name: string;
    description: string;
    timeframe: string;
    scientificBasis: string;
  }[];
  scientificModelsText: string;
}

export const impactSections: ImpactSection[] = [
  {
    id: 'impactos-humanos',
    category: 'humanos',
    title: 'Impactos no Corpo Humano e na Sociedade',
    subtitle: 'Onda Térmica, Choque Mecânico e Síndrome Aguda de Radiação',
    shortSummary: 'A detonação de um artefato nuclear desencadeia simultaneamente efeitos físicos imediatos e consequências biológicas severas a curto e longo prazo.',
    keyEffects: [
      {
        name: 'Radiação Térmica (Flash Térmico)',
        description: 'A "bola de fogo" atinge dezenas de milhões de graus no núcleo e emite calor radiante na velocidade da luz. Causa queimaduras de terceiro grau em peles desprotegidas a quilômetros de distância e ignição instantânea de materiais inflamáveis.',
        timeframe: '0 a 10 segundos pós-detonação',
        scientificBasis: 'Espectro de emissão de corpo negro com fluxo de radiação eletromagnética infravermelha e visível extrema.'
      },
      {
        name: 'Onda de Choque e Sobrepressão Mecânica',
        description: 'A rápida expansão do ar superaquecido cria uma onda de sobrepressão (> 5 a 20 psi) acompanhada de ventos com centenas de km/h, derrubando edifícios de concreto armado e transformando detritos em projéteis letais.',
        timeframe: '10 segundos a 2 minutos',
        scientificBasis: 'Frente de onda de choque hidrodinâmica supersônica na atmosfera.'
      },
      {
        name: 'Radiação Ionizante Inicial e Aguda',
        description: 'Emissão maciça de nêutrons e raios gama nos primeiros segundos. Doses elevadas (> 4 Gray) destroem células da medula óssea e do trato gastrointestinal, provocando a Síndrome Aguda da Radiação (SAR), náuseas, hemorragias e colapso imunológico.',
        timeframe: 'Dias a semanas',
        scientificBasis: 'Ionização direta da água celular gerando radicais livres que rompem cadeias de DNA e inibem a mitose celular.'
      },
      {
        name: 'Efeitos Oncológicos e Genéticos Tardios',
        description: 'Aumento significativo na incidência estatística de leucemias, câncer de tireoide, tumores sólidos em pulmões e mamas, além de fibrose tecidual e catarata em sobreviventes expostos.',
        timeframe: '2 a 40+ anos',
        scientificBasis: 'Mutações genéticas estocásticas acumuladas em células somáticas, amplamente documentadas pelo RERF (Radiation Effects Research Foundation).'
      }
    ],
    scientificModelsText: 'O estudo epidemiológico de longo prazo sobre os Hibakusha de Hiroshima e Nagasaki coordenado pela Radiation Effects Research Foundation (RERF) constitui a base médica primária da ICRP (Comissão Internacional de Proteção Radiológica) para estabelecer limites ocupacionais e públicos de proteção contra radiação ionizante.'
  },
  {
    id: 'impactos-ambientais',
    category: 'ambientais',
    title: 'Impactos nos Ecossistemas e Meio Ambiente',
    subtitle: 'Contaminação Radioativa, Bioacumulação e Zonas de Exclusão',
    shortSummary: 'A introdução de radioisótopos antropogênicos no solo, nos corpos hídricos e na biosfera altera cadeias tróficas e a dinâmica florestal por décadas.',
    keyEffects: [
      {
        name: 'Fallout Radioativo (Precipitação Nuclear)',
        description: 'Quando uma explosão nuclear toca o solo, milhões de toneladas de terra e rocha são vaporizadas e misturadas com os subprodutos de fissão. Essas partículas radioativas se condensam e precipitam com a chuva e o vento ao longo de centenas de quilômetros.',
        timeframe: 'Horas até meses após a detonação',
        scientificBasis: 'Dispersão de partículas de aerosol carregadas com Césio-137 (T½ = 30 anos), Estrôncio-90 (T½ = 28,8 anos) e Iodo-131 (T½ = 8 dias).'
      },
      {
        name: 'Bioacumulação e Concentração Trófica',
        description: 'O Estrôncio-90 é quimicamente análogo ao Cálcio e se fixa nos ossos de animais e humanos. O Césio-137 se comporta como o Potássio e se concentra em tecidos musculares, cogumelos, líquens e na carne de animais que pastam em solos contaminados.',
        timeframe: 'Décadas',
        scientificBasis: 'Ciclagem de nutrientes biológicos e transferência trófica em solos florestais e agrícolas.'
      },
      {
        name: 'Efeitos nas Zonas de Exclusão Ecológica',
        description: 'Após acidentes graves como Chernobyl e Fukushima, a ausência de pressão humana permitiu que populações de grandes mamíferos (lobos, cavalos de Przewalski) recolonizassem as áreas, embora pesquisas mostrem maiores taxas de mutação, anomalias morfológicas e menor diversidade de insetos em micro-hotspots.',
        timeframe: 'Longo prazo (permanente)',
        scientificBasis: 'Ecologia de ecossistemas cronicamente irradiados com doses baixas a moderadas contínuas.'
      }
    ],
    scientificModelsText: 'Modelos de transporte atmosférico e ecológico validados pela Agência Internacional de Energia Atômica (AIEA) e pelo UNSCEAR demonstram como os radioisótopos migram através dos horizontes do solo e sedimentos lacustres, exigindo remediação contínua e monitoramento da cadeia alimentar.'
  },
  {
    id: 'impactos-climaticos',
    category: 'climaticos',
    title: 'Impactos Climáticos Globais e Inverno Nuclear',
    subtitle: 'Modelos Atmosféricos Computacionais e Destruição da Camada de Ozônio',
    shortSummary: 'Modelos climáticos científicos indicam que tempestades de fogo provocadas por detonações nucleares em áreas urbanas poderiam injetar milhões de toneladas de fuligem na estratosfera, alterando o clima global.',
    keyEffects: [
      {
        name: 'Injeção de Fuligem (Black Carbon) na Estratosfera',
        description: 'Incêndios maciços simultâneos criariam tempestades de fogo piroconvectivas autoalimentadas (pirocúmulos) capazes de ejetar entre 5 e 150 milhões de toneladas de fuligem preta diretamente na estratosfera, acima da camada de nuvens onde a chuva não pode lavá-la.',
        timeframe: 'Semanas a mais de uma década',
        scientificBasis: 'Simulações em Modelos de Circulação Geral da Atmosfera (GCMs como o NCAR CESM e NASA GISS).'
      },
      {
        name: 'Bloqueio Solar e Queda Global de Temperatura',
        description: 'A fuligem na alta atmosfera absorveria a luz solar incidente, reduzindo a radiação solar na superfície da Terra em 10% a 90%. Em um cenário de conflito em larga escala, as temperaturas globais médias cairiam de 5 °C a 15 °C, com geadas no verão em latitudes agrícolas temperadas ("Inverno Nuclear").',
        timeframe: '1 a 10 anos',
        scientificBasis: 'Pesquisas pioneiras de Carl Sagan, Richard Turco (TTAPS, 1983) e atualizações modernas de Alan Robock, Brian Toon e Lili Xia (2007-2022).'
      },
      {
        name: 'Destruição da Camada de Ozônio Estratosférico',
        description: 'O aquecimento da estratosfera pela fuligem solarizada e a liberação de óxidos de nitrogênio (NOx) acelerariam a destruição catalítica do ozônio protetor (O₃), aumentando drasticamente a radiação ultravioleta UV-B prejudicial na superfície terrestre.',
        timeframe: '5 a 10 anos',
        scientificBasis: 'Cinética química fotoquímica estratosférica acoplada aos modelos de circulação atmosférica.'
      },
      {
        name: 'Colapso na Produção Agrícola Global e Fome Severa',
        description: 'A combinação de redução drástica de temperatura, encurtamento das estações de cultivo, diminuição da precipitação global (monções enfraquecidas) e radiação UV intensificada levaria a quebras generalizadas nas safras de milho, trigo, arroz e soja, ameaçando a segurança alimentar de bilhões de pessoas.',
        timeframe: 'Anos 1 a 5 após o evento',
        scientificBasis: 'Estudos agroclimáticos integrados publicados na revista Nature Food (Xia et al., 2022).'
      }
    ],
    scientificModelsText: 'Nota Importante: O conceito de "Inverno Nuclear" baseia-se em modelos matemáticos e simulações computacionais de alta complexidade desenvolvidas por climatologistas e físicos da atmosfera. Embora existam incertezas quanto à quantidade exata de fumaça gerada por diferentes tipos de construções urbanas, o consenso da comunidade científica aponta que mesmo um conflito nuclear regional limitado teria consequências climáticas e agrícolas severas em escala planetária.'
  }
];
