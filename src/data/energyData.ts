export interface EnergyApplication {
  id: string;
  title: string;
  category: string;
  summary: string;
  howItWorks: string;
  societalBenefit: string;
  keyRadioisotopes: string[];
}

export const energyApplications: EnergyApplication[] = [
  {
    id: 'geracao-eletricidade',
    title: 'Geração de Eletricidade em Larga Escala',
    category: 'Energia & Clima',
    summary: 'A fissão nuclear controlada em reatores comerciais aquece água para produzir vapor em alta pressão e girar turbogeradores elétricos.',
    howItWorks: 'Em um reator de água pressurizada (PWR), a fissão do U-235 aquece o circuito primário a ~320 °C sob 155 bar (evitando ebulição). Esse calor é transferido pelo gerador de vapor ao circuito secundário, cujo vapor aciona a turbina elétrica e depois é condensado e reciclado em circuito fechado.',
    societalBenefit: 'Fornece eletricidade contínua de base (fator de capacidade > 90%) com pegada de carbono quase nula durante a operação, crucial para descarbonizar redes elétricas globais.',
    keyRadioisotopes: ['Urânio-235', 'Urânio-238', 'Plutônio-239 (combustível MOX)']
  },
  {
    id: 'medicina-nuclear',
    title: 'Medicina Nuclear: Diagnóstico e Radioterapia',
    category: 'Saúde & Medicina',
    summary: 'Utilização de radiofármacos para mapeamento metabólico de órgãos e feixes de radiação ionizante para erradicação de células cancerígenas.',
    howItWorks: 'Radioisótopos emissores de pósitrons (como o Flúor-18 acoplado à glicose) são injetados no paciente; células tumorais de alto metabolismo acumulam a molécula e emitem fótons captados pelo tomógrafo PET-Scan, revelando tumores microscópicos.',
    societalBenefit: 'Mais de 40 milhões de procedimentos médicos nucleares realizados anualmente no mundo, salvando vidas com diagnósticos precoces de câncer, cardiopatias e doenças neurológicas.',
    keyRadioisotopes: ['Tecnécio-99m', 'Flúor-18', 'Iodo-131', 'Lutécio-177', 'Cobalto-60']
  },
  {
    id: 'agricultura-alimentos',
    title: 'Agricultura, Mutagênese e Irradiação de Alimentos',
    category: 'Alimentação & Agricultura',
    summary: 'Aplicação da tecnologia nuclear para desenvolver culturas resistentes a secas, esterilizar pragas agrícolas e conservar alimentos.',
    howItWorks: 'A técnica do inseto estéril (SIT) irradia machos de pragas com raios gama para esterilizá-los antes da soltura controlada no campo, erradicando espécies invasoras sem uso de pesticidas químicos. A irradiação de grãos e frutas elimina bactérias (Salmonella, E. coli) e retarda a deterioração.',
    societalBenefit: 'Redução de perdas pós-colheita, garantia de segurança alimentar para populações em desenvolvimento e combate ecológico a pragas sem contaminação por agrotóxicos.',
    keyRadioisotopes: ['Cobalto-60', 'Césio-137']
  },
  {
    id: 'industria-engenharia',
    title: 'Indústria, Gamagrafia e Hidrologia Isotópica',
    category: 'Indústria & Recursos Hídricos',
    summary: 'Controle de qualidade não destrutivo de estruturas metálicas e tubulações, além de rastreamento de aquíferos subterrâneos profundos.',
    howItWorks: 'Fontes de Irídio-192 ou Selênio-75 emitem radiação para inspecionar soldas críticas em fuselagens de aviões, gasodutos e plataformas de petróleo sem danificar as peças. Isótopos ambientais de oxigênio e hidrogênio revelam a idade e a recarga de reservatórios de água subterrânea.',
    societalBenefit: 'Prevenção de desastres industriais, segurança em transportes de grande porte e gestão sustentável de recursos hídricos escassos em regiões áridas.',
    keyRadioisotopes: ['Irídio-192', 'Selênio-75', 'Carbono-14', 'Trítio']
  },
  {
    id: 'exploracao-espacial',
    title: 'Exploração Espacial Profunda (RTGs)',
    category: 'Espaço & Ciência',
    summary: 'Geradores Termoelétricos de Radioisótopos (RTGs) alimentam sondas espaciais e rovers em regiões do Sistema Solar onde a luz solar é insuficiente.',
    howItWorks: 'O calor gerado pelo decaimento alfa contínuo de dióxido de Plutônio-238 é convertido diretamente em eletricidade por termopares de estado sólido (Efeito Seebeck), sem peças móveis.',
    societalBenefit: 'Permitiu que missões históricas como Voyager 1 e 2 operassem no espaço interestelar por mais de 45 anos, e alimenta os rovers Curiosity e Perseverance em Marte e a sonda New Horizons em Plutão.',
    keyRadioisotopes: ['Plutônio-238', 'Amerício-241']
  }
];

export interface RiskBenefitItem {
  domain: string;
  benefits: string[];
  risksAndChallenges: string[];
}

export const risksAndBenefitsMatrix: RiskBenefitItem[] = [
  {
    domain: 'Emissões e Impacto Climático',
    benefits: [
      'Geração de eletricidade com emissões diretas de gases de efeito estufa (GEE) nulas durante a operação.',
      'Ciclo de vida completo (construção, mineração e operação) com intensidade de carbono comparável à energia eólica (~12 g CO₂/kWh, segundo o IPCC).',
      'Substituição efetiva e comprovada de termelétricas a carvão e gás fóssil para carga de base ininterrupta.'
    ],
    risksAndChallenges: [
      'A mineração e o processamento inicial do urânio demandam gerenciamento ambiental rigoroso para evitar drenagem ácida.',
      'A construção civil pesada de centrais nucleares requer altos volumes de concreto e aço com pegada inicial de carbono.'
    ]
  },
  {
    domain: 'Densidade Energética e Recursos',
    benefits: [
      'Densidade de energia incomparável: 1 pastilha de urânio de 10 gramas gera a mesma energia que 1 tonelada de carvão mineral ou 560 litros de óleo combustível.',
      'Área territorial ocupada extremamente reduzida (alta densidade espacial em MW por km²) em comparação com parques solares ou eólicos equivalentes.',
      'Disponibilidade de urânio e tório em depósitos estáveis espalhados por diversos continentes.'
    ],
    risksAndChallenges: [
      'O urânio é um recurso não renovável, embora a reutilização em reatores regeneradores (breeders) e extração oceânica possam estender as reservas por séculos.',
      'Necessidade de plantas de enriquecimento isotópico sofisticadas e altamente reguladas internacionalmente.'
    ]
  },
  {
    domain: 'Segurança Operacional e Saúde',
    benefits: [
      'Estatisticamente, é uma das fontes de energia mais seguras do mundo em termos de mortes por terawatt-hora (TWh) gerado, superando amplamente os combustíveis fósseis.',
      'Reatores modernos de Geração III+ incorporam sistemas passivos de segurança acionados exclusivamente pela gravidade e convecção natural.',
      'Cultura de segurança internacional rígida e auditorias contínuas pela AIEA e WANO.'
    ],
    risksAndChallenges: [
      'Eventos de baixíssima probabilidade, mas de consequências potencialmente severas (como Chernobyl e Fukushima) em caso de falhas catastróficas combinadas.',
      'Necessidade de resfriamento contínuo mesmo após o desligamento do reator devido ao calor de decaimento dos produtos de fissão.'
    ]
  },
  {
    domain: 'Gerenciamento de Rejeitos Radioativos',
    benefits: [
      'O volume total de resíduos é extremamente compacto e 100% contido e inventariado (ao contrário dos combustíveis fósseis cujos resíduos vão diretamente para a atmosfera).',
      'Reatores avançados de IV Geração e tecnologias de transmutação nuclear podem queimar actinídeos, reduzindo a vida útil do lixo radioativo de milênios para centenas de anos.',
      'Soluções de Repositório Geológico Profundo comprovadas e operacionais (como o projeto Onkalo na Finlândia).'
    ],
    risksAndChallenges: [
      'Rejeitos de alta atividade (combustível irradiado) requerem isolamento geológico seguro por dezenas de milhares de anos.',
      'Desafios políticos e sociais ("NIMBY - Not In My Backyard") na aprovação e construção de depósitos definitivos em vários países.'
    ]
  },
  {
    domain: 'Economia e Não Proliferação',
    benefits: [
      'Custos operacionais e de combustível muito previsíveis e estáveis a longo prazo após a conclusão da obra.',
      'Vida útil estendida das usinas (de 60 a até 80 anos de operação contínua).',
      'Independência energética nacional contra volatilidade no preço internacional de petróleo e gás natural.'
    ],
    risksAndChallenges: [
      'Altíssimo custo de capital inicial (CAPEX) e prazos longos de construção e licenciamento.',
      'Risco de proliferação latente: o domínio tecnológico do ciclo de combustível (enriquecimento e reprocessamento) exige salvaguardas internacionais estritas para evitar desvio militar.'
    ]
  }
];
