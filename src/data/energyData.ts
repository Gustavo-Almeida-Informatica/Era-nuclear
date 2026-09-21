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
    title: 'Geração de Eletricidade por Fissão (PWR / BWR / SMR)',
    category: 'Energia & Clima',
    summary: 'A fissão nuclear controlada em reatores comerciais aquece água para produzir vapor em alta pressão e girar turbogeradores elétricos.',
    howItWorks: 'Em um reator de água pressurizada (PWR), a fissão do U-235 aquece o circuito primário a ~320 °C sob 155 bar (evitando ebulição). Esse calor é transferido pelo gerador de vapor ao circuito secundário, cujo vapor aciona a turbina elétrica e depois é condensado e reciclado em circuito fechado.',
    societalBenefit: 'Fornece eletricidade contínua de base (fator de capacidade > 90%) com pegada de carbono quase nula durante a operação, crucial para descarbonizar redes elétricas globais.',
    keyRadioisotopes: ['Urânio-235', 'Urânio-238', 'Plutônio-239 (combustível MOX)']
  },
  {
    id: 'reatores-fusao',
    title: 'Reatores de Fusão Nuclear (A Energia das Estrelas)',
    category: 'Energia do Futuro',
    summary: 'A reprodução confinada das reações termonucleares solares em reatores Tokamak e Stellarator para fornecer eletricidade limpa, ilimitada e segura.',
    howItWorks: 'Campos magnéticos colossais gerados por ímãs supercondutores (até 20 Tesla) confinam plasma de Deutério e Trítio a 150 milhões de °C no formato de toro (donut). A fusão dos núcleos gera Hélio-4 e nêutrons de 14,1 MeV absorvidos por mantos térmicos de lítio que acionam turbinas a vapor e sintetizam novo trítio em ciclo fechado autossustentável.',
    societalBenefit: 'Combustível obtido da água do mar com reserva para milhões de anos, zero emissão de gases estufa, ausência total de lixo radioativo de longa vida e impossibilidade física de derretimento do núcleo (meltdown).',
    keyRadioisotopes: ['Deutério (²H)', 'Trítio (³H)', 'Lítio-6 (⁶Li)', 'Hélio-4 (⁴He)']
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

export interface FusionRiskBenefitDomain {
  id: string;
  domain: string;
  summary: string;
  benefits: string[];
  risksAndChallenges: string[];
  keyMetric: string;
  verdict: string;
}

export const FUSION_RISKS_AND_BENEFITS: FusionRiskBenefitDomain[] = [
  {
    id: 'seguranca-meltdown',
    domain: 'Segurança Operacional & Risco de Meltdown',
    summary: 'A física fundamental da fusão impede desastres do tipo Chernobyl ou Fukushima: a reação não é em cadeia e se autoextingue em caso de anomalia.',
    benefits: [
      'Impossibilidade física de derretimento do núcleo (Meltdown): a câmara a vácuo contém apenas 1 a 5 gramas de combustível plasmático a qualquer momento.',
      'Extinção passiva imediata: qualquer alteração de pressão, desequilíbrio térmico ou perda de confinamento magnético resfria o plasma e apaga a reação em frações de milissegundo.',
      'Sem reação em cadeia exponencial: o processo necessita de fornecimento ativo e contínuo de aquecimento externo (micro-ondas e feixes neutros) para persistir.',
      'Calor residual de decaimento insignificante: na ausência de produtos de fissão pesados, não existe risco de fusão dos materiais por falta de energia de resfriamento pós-parada.'
    ],
    risksAndChallenges: [
      'Disrupções de Plasma (Plasma Disruptions): instabilidades magnetohidrodinâmicas ultrarrápidas podem colapsar o campo e direcionar megajoules de calor contra o divertor da câmara.',
      'Energia Eletromagnética Armazenada Colossal: bobinas supercondutoras concentram dezenas de gigajoules de energia; eventos imprevistos de transição resistiva (quench) exigem rápida drenagem de corrente.',
      'Vácuo extremo e gradiente térmico severo: criogenia a -269 °C coexistindo a poucos centímetros de um gás a 150.000.000 °C gera dilatações e tensões mecânicas extremas.'
    ],
    keyMetric: 'Risco de Meltdown: 0% (Fisicamente impossível)',
    verdict: 'Vantagem revolucionária em segurança intrínseca passiva sobre a fissão.'
  },
  {
    id: 'residuos-lixo-nuclear',
    domain: 'Resíduos Radioativos & Materiais Estruturais',
    summary: 'Subproduto direto inerte (Hélio-4) e ausência de actinídeos pesados eliminam a necessidade de repositórios geológicos de dezenas de milhares de anos.',
    benefits: [
      'Subproduto de queima 100% inerte e atóxico: a reação D-T gera exclusivamente gás Hélio-4 (usado na indústria médica, criogenia e até balões de festa).',
      'Zero actinídeos de vida longa: ausência total de plutônio, netúnio, califórnio e amerício, além de não produzir césio-137 ou estrôncio-90 solúveis em água.',
      'Materiais de baixa ativação recicláveis em menos de 100 anos: ligas especiais (como aços ferríticos reduzidos tipo EUROFER e ligas de vanádio) decaem para níveis seguros em décadas, sem demandar depósitos de 100.000 anos.'
    ],
    risksAndChallenges: [
      'Dano por Nêutrons Rápidos de 14,1 MeV: nêutrons energéticos bombardeiam as paredes internas da câmara, provocando deslocamentos atômicos (dpa), fragilização e microbolhas de hélio no metal.',
      'Ativação neutrônica dos componentes estruturais: o manto (blanket) e o divertor tornam-se radioativos com o tempo, necessitando de substituição periódica (a cada 5 a 10 anos) e robôs de manutenção remota.',
      'Permeabilidade e contenção de Trítio (³H): como isótopo do hidrogênio com meia-vida de 12,3 anos, o trítio atravessa metais aquecidos, exigindo barreiras de filme fino e monitoramento estanque contínuo.'
    ],
    keyMetric: 'Decaimento dos Rejeitos: < 100 anos (vs. > 100.000 anos na fissão)',
    verdict: 'Resíduos de classe média e baixa vida curta, solucionando o dilema do lixo nuclear perpétuo.'
  },
  {
    id: 'combustivel-proliferacao',
    domain: 'Combustível, Recursos & Não Proliferação',
    summary: 'Combustível obtido da água do mar e de depósitos de lítio, sem necessidade de enriquecimento de urânio e sem materiais físseis para armas atômicas.',
    benefits: [
      'Recursos oceânicos e minerais praticamente inesgotáveis: o deutério está presente na água do mar (33 g/m³), durando centenas de milhões de anos; o lítio terrestre supre o trítio por milênios.',
      'Imunidade contra proliferação nuclear de armas de fissão: a fusão não utiliza urânio enriquecido (²³⁵U) nem sintetiza plutônio físsil (²³⁹Pu); reatores não podem ser convertidos em fábricas de bombas atômicas.',
      'Soberania e equidade geopolítica: a matéria-prima elementar está acessível globalmente, eliminando a dependência de cartéis de petróleo e minas monopolizadas de urânio.'
    ],
    risksAndChallenges: [
      'Escassez transitória de Trítio e desafio dos Manto de Reprodução (Breeding Blankets): a reserva civil global atual é de apenas ~25 kg; usinas comerciais precisarão produzir seu próprio trítio com razão TBR > 1,05 ininterrupta.',
      'Contabilidade e Salvaguardas Internacionais de Trítio: embora não gere bombas atômicas primárias, o trítio é utilizado militarmente para reforço termonuclear (boosting) de ogivas, demandando inspeções contínuas da AIEA.',
      'Dependência de Metais Críticos e Terras Raras: ímãs supercondutores HTS de alto campo (como YBCO/REBCO) demandam óxido de ítrio, bário, cobre, berílio e ligas de tungstênio sujeitas a cadeias de suprimento globais.'
    ],
    keyMetric: '1 m³ de água do mar = energia equivalente a 260 toneladas de carvão',
    verdict: 'Independência geopolítica de longo prazo sem riscos de proliferação físsil.'
  },
  {
    id: 'clima-pegada-espacial',
    domain: 'Impacto Climático & Densidade Espacial',
    summary: 'Geração contínua de carga de base livre de gases de efeito estufa e com área de instalação centenas de vezes menor que parques solares equivalentes.',
    benefits: [
      'Emissões diretas de CO₂ rigorosamente ZERO durante todo o funcionamento operacional contínuo da usina.',
      'Intensidade de carbono de ciclo de vida insignificante (< 10 g CO₂/kWh), superando ou igualando turbinas eólicas e painéis solares fotovoltaicos.',
      'Altíssima densidade territorial: uma central termonuclear de 1.000 MW ocupa menos de 0,5 km², gerando energia firme sem desmatar ou comprometer ecossistemas terrestres.',
      'Descarbonização industrial profunda além da rede elétrica: o calor de alta temperatura (>600 °C) viabiliza eletrólise de alta eficiência para hidrogênio verde, siderurgia limpa e dessalinização de água doce em larga escala.'
    ],
    risksAndChallenges: [
      'Pegada de carbono inicial de manufatura e obras civis: construção de criostatos de aço austenítico pesado, blindagens de concreto denso e componentes eletromagnéticos avançados.',
      'Demanda por sistemas de troca térmica: dependência de água de circulação ou torres de resfriamento para o circuito termodinâmico de geração de vapor.'
    ],
    keyMetric: 'Ciclo de vida: ~8 g CO₂/kWh • Área: 0,5 km² por Gigawatt',
    verdict: 'O ápice da densidade energética limpa para metas de emissão líquida zero (Net Zero).'
  },
  {
    id: 'economia-engenharia',
    domain: 'Viabilidade Econômica, Engenharia & Prazos',
    summary: 'Combustível virtualmente gratuito compensado por custos de capital e desafios de engenharia de vanguarda que ainda retardam a comercialização em massa.',
    benefits: [
      'Custo operacional de combustível irrelevante: frações de centavos por megawatt-hora, tornando a geração imune a choques de preço de petróleo, carvão ou gás natural.',
      'Carga de base ininterrupta (Baseload) 24/7: dispensa baterias químicas gigantescas de armazenamento ou redes de transmissão continentais para cobrir dias sem vento ou sol.',
      'Impulso à inovação científica global: gera patentes em robótica autônoma, ímãs de alta temperatura, ciência de materiais e controle por inteligência artificial em tempo real.'
    ],
    risksAndChallenges: [
      'Custo de Capital Inicial (CAPEX) Elevado: protótipos e primeiros reatores comerciais exigem investimentos de bilhões de dólares antes de alcançar economia de escala.',
      'Horizonte Temporal até a Rede Elétrica: a entrada comercial em escala de gigawatts está prevista para a década de 2035–2045, competindo com renováveis baratas já maduras.',
      'Complexidade da Razão de Ganho de Engenharia (Q_eng): alcançar Q_plasma > 10 é necessário para compensar o consumo de sistemas criogênicos, bombas de vácuo e fontes de radiofrequência.',
      'Manutenção remota robotizada complexa: paradas para manutenção no interior da câmara ativada exigem telemanipuladores robóticos avançados que afetam a disponibilidade da usina.'
    ],
    keyMetric: 'Investimento privado em fusão: > US$ 7,5 bilhões em 45+ empresas',
    verdict: 'Desafio temporal e de engenharia extrema que será superado na transição 2030-2040.'
  }
];

export interface FusionReactorProject {
  id: string;
  name: string;
  type: 'Tokamak Magnético' | 'Stellarator' | 'Confinamento Inercial a Laser' | 'Magneto-Inercial / FRC';
  country: string;
  location: string;
  operator: string;
  status: 'Em Construção' | 'Operacional / Experimental' | 'Protótipo Comercial';
  ignitionGoal: string;
  plasmaTemp: string;
  magneticField: string;
  powerOrYield: string;
  description: string;
  keyInnovations: string[];
  schematicDetails: {
    confinementMethod: string;
    fuelCycle: string;
    coolingBlanket: string;
    safetyMechanisms: string;
  };
}

export const FUSION_REACTORS: FusionReactorProject[] = [
  {
    id: 'iter',
    name: 'ITER (International Thermonuclear Experimental Reactor)',
    type: 'Tokamak Magnético',
    country: 'França (Consórcio Global de 35 Nações)',
    location: 'Saint-Paul-lès-Durance / Cadarache, França',
    operator: 'Consórcio Internacional (UE, EUA, China, Japão, Rússia, Coreia do Sul, Índia)',
    status: 'Em Construção',
    ignitionGoal: 'Fator de Ganho Q = 10 (Consome 50 MW térmicos e gera 500 MW de potência de fusão contínua)',
    plasmaTemp: '150.000.000 °C (10 vezes a temperatura do núcleo do Sol)',
    magneticField: '11,8 Tesla com ímãs gigantescos de Nióbio-Estanho resfriados a -269 °C (Hélio Líquido)',
    powerOrYield: '500 MW térmicos com pulsos de plasma de 400 a 3.000 segundos',
    description: 'O maior experimento científico cooperativo do planeta. Um tokamak gigantesco de 840 m³ de volume de plasma projetado para demonstrar de forma inequívoca a viabilidade técnica e energética da fusão nuclear em escala de usina civil.',
    keyInnovations: [
      'Câmara de vácuo toroidal de aço inoxidável com tolerâncias milimétricas de 29 metros de altura',
      'Solenóide central com campo magnético de 13 Tesla, força magnética suficiente para erguer um porta-aviões de 100.000 toneladas',
      'Módulos de teste de manto reproductor (Test Blanket Modules) para gerar novo trítio a partir de lítio durante a operação',
      'Desviador (Divertor) magnético com blindagem de tungstênio resistente a fluxos térmicos comparáveis à reentrada de naves espaciais (20 MW/m²)'
    ],
    schematicDetails: {
      confinementMethod: 'Gaiola magnética toroidal helicoidal combinando campo toroidal de bobinas externas e campo poloidal induzido por corrente no próprio plasma',
      fuelCycle: 'Mistura 50/50 de Deutério (extraído da água do mar) e Trítio (gerado e reciclado no reator)',
      coolingBlanket: 'Manto de aço de baixa ativação EUROFER refrigerado por água pressurizada ou hélio supercrítico',
      safetyMechanisms: 'Reação se extingue passivamente em menos de 1 segundo se houver perda de controle ou entrada de ar; apenas 3 a 4 gramas de combustível na câmara'
    }
  },
  {
    id: 'sparc',
    name: 'SPARC (Commonwealth Fusion Systems / MIT)',
    type: 'Tokamak Magnético',
    country: 'Estados Unidos',
    location: 'Devens, Massachusetts, EUA',
    operator: 'Commonwealth Fusion Systems (spin-off do MIT PSFC)',
    status: 'Em Construção',
    ignitionGoal: 'Fator de Ganho Q > 11 (Gera ~140 MW de potência de fusão com apenas ~11 MW de aquecimento auxiliar)',
    plasmaTemp: '> 100.000.000 °C',
    magneticField: '20,1 Tesla (Recorde mundial alcançado com supercondutores de alta temperatura REBCO)',
    powerOrYield: '140 MWth em reator compacto do tamanho de uma sala residencial (1/50 do volume do ITER)',
    description: 'A vanguarda da fusão nuclear privada e compacta. Utiliza ímãs revolucionários de supercondutores de alta temperatura (HTS) que geram campos magnéticos quase duas vezes mais intensos que o ITER, reduzindo drasticamente as dimensões e o custo do reator.',
    keyInnovations: [
      'Fita supercondutora de Óxido de Bário, Cobre e Terras Raras (REBCO) operando a 20 Kelvin',
      'Densidade de potência magnética proporcional a B⁴ (campo magnético elevado à quarta potência: 20T permite reatores 40 vezes mais compactos)',
      'Abertura direta do caminho para a usina comercial ARC (Affordable, Robust, Compact) conectada à rede na década de 2030',
      'Construção financiada por mais de 2 bilhões de dólares de capital de inovação e pesquisa acadêmica do MIT'
    ],
    schematicDetails: {
      confinementMethod: 'Tokamak de campo magnético ultradenso de 20 Tesla contendo plasma de alta pressão com estabilidade aprimorada',
      fuelCycle: 'Deutério-Trítio (D-T)',
      coolingBlanket: 'Manto líquido FLiBe (Fluoreto de Lítio e Berílio líquido) para resfriamento e reprodução de trítio sem trocadores complexos',
      safetyMechanisms: 'Desligamento térmico imediato por radiação impura intencional ou corte da corrente magnética'
    }
  },
  {
    id: 'w7x',
    name: 'Wendelstein 7-X (W7-X)',
    type: 'Stellarator',
    country: 'Alemanha',
    location: 'Greifswald, Mecklemburgo-Pomerânia Ocidental, Alemanha',
    operator: 'Instituto Max Planck de Física do Plasma (IPP)',
    status: 'Operacional / Experimental',
    ignitionGoal: 'Demonstrar operação contínua estável em estado estacionário (steady-state) por até 30 minutos ininterruptos',
    plasmaTemp: '60.000.000 °C a 100.000.000 °C',
    magneticField: '3,0 Tesla estático permanente gerado por 70 bobinas helicoidais não coplanares',
    powerOrYield: 'Até 1,3 gigajoules de energia acumulada por pulso experimental contínuo de 480 segundos',
    description: 'O maior e mais avançado stellarator do mundo. Diferente dos tokamaks, o stellarator não induz corrente elétrica no plasma, eliminando completamente o risco de disrupções magnéticas súbitas que podem danificar as paredes da câmara.',
    keyInnovations: [
      '70 bobinas magnéticas supercondutoras com formatos tridimensionais complexos calculados por supercomputadores em anos de otimização de campo',
      'Operação inerentemente contínua (24 horas por dia) sem necessidade de pulsos de transformador solenóide como nos tokamaks',
      'Sistema de desviador (divertor) refrigerado a água capaz de remover continuamente até 10 MW/m² de calor de escape',
      'Comprovou experimentalmente a redução drástica das perdas térmicas neoclássicas que historicamente prejudicavam os stellarators antigos'
    ],
    schematicDetails: {
      confinementMethod: 'Campos magnéticos tridimensionais torcidos exclusivamente por bobinas externas em geometria Möbius de simetria pentagonal',
      fuelCycle: 'Hidrogênio e Deutério puro para validação de confinamento contínuo sem ativação por nêutrons de trítio',
      coolingBlanket: 'Painéis térmicos refrigerados a água desmineralizada de alta pureza',
      safetyMechanisms: 'Total ausência de corrente plasmática, tornando impossível qualquer evento de disrupção destrutiva'
    }
  },
  {
    id: 'nif',
    name: 'NIF (National Ignition Facility)',
    type: 'Confinamento Inercial a Laser',
    country: 'Estados Unidos',
    location: 'Lawrence Livermore National Laboratory (LLNL), Califórnia, EUA',
    operator: 'Departamento de Energia dos EUA (DOE) / NNSA',
    status: 'Operacional / Experimental',
    ignitionGoal: 'Histórico: Primeiro reator da humanidade a atingir a Ignição Nuclear com ganho líquido de energia (Q > 1)',
    plasmaTemp: '> 100.000.000 °C e pressões estelares de centenas de bilhões de atmosferas',
    magneticField: 'Sem confinamento magnético (compressão inercial por pulso ultrarrápido de raios-X)',
    powerOrYield: 'Injetou 2,05 Megajoules de luz laser ultravioleta e liberou 3,15 Megajoules de energia de fusão (ganho de ~1,54x)',
    description: 'O maior e mais potente sistema de laser do planeta, do tamanho de três campos de futebol. Em 5 de dezembro de 2022, o NIF atingiu a meta perseguida por cientistas nucleares há mais de 70 anos: produzir mais energia a partir da fusão termonuclear do que a energia laser fornecida ao alvo.',
    keyInnovations: [
      '192 feixes de laser gigantescos amplificados e convertidos para o espectro ultravioleta (351 nm)',
      'Cavidade cilíndrica de ouro (hohlraum) que converte a luz laser em um banho simétrico e implosivo de raios-X térmicos',
      'Microesfera de diamante de apenas 2 mm de diâmetro preenchida com gelo criogênico de Deutério e Trítio a -255 °C',
      'Velocidade de implosão da cápsula superior a 400 km por segundo em menos de 10 bilionésimos de segundo'
    ],
    schematicDetails: {
      confinementMethod: 'Ablação da superfície externa da cápsula de diamante, cuja expansão explosiva empurra o combustível interno em compressão esférica perfeita até a densidade de chumbo',
      fuelCycle: 'Deutério-Trítio criogênico (D-T)',
      coolingBlanket: 'Câmara esférica de vácuo de alumínio de 10 metros de diâmetro equipada com dezenas de sensores nucleares ultravelozes',
      safetyMechanisms: 'Reação ocorre em nanosegundos com microgramas de combustível; sem risco de reação em cadeia'
    }
  },
  {
    id: 'east',
    name: 'EAST ("Sol Artificial" da China)',
    type: 'Tokamak Magnético',
    country: 'China',
    location: 'Hefei, Anhui, China',
    operator: 'Instituto de Física do Plasma da Academia Chinesa de Ciências (ASIPP)',
    status: 'Operacional / Experimental',
    ignitionGoal: 'Desenvolver a física de plasma de confinamento estendido (modo H) para o futuro reator CFETR',
    plasmaTemp: 'Recorde de 70.000.000 °C mantidos por 1.056 segundos e 120.000.000 °C por 101 segundos',
    magneticField: '3,5 Tesla',
    powerOrYield: 'Operação sustentada de alta temperatura sem disrupção por mais de 17 minutos contínuos',
    description: 'O Tokamak Supercondutor Avançado Experimental (EAST) detém os recordes mundiais de confinamento de plasma de longa duração em modo de alto confinamento (H-mode), testando componentes de primeira parede para a geração comercial chinesa.',
    keyInnovations: [
      'Primeiro tokamak totalmente supercondutor do mundo a utilizar tanto bobinas toroidais quanto poloidais de NbTi',
      'Paredes ativas revestidas com telhas de tungstênio e injeção contínua de vapor de lítio para aprisionamento de impurezas',
      'Sistemas integrados de aquecimento híbrido combinando micro-ondas de frequência ciclotrônica e injeção de feixes neutros (NBI)',
      'Base de dados experimental essencial para o projeto CFETR (China Fusion Engineering Test Reactor) de 1 GW'
    ],
    schematicDetails: {
      confinementMethod: 'Confinamento magnético D-shaped com controle ativo de instabilidades magnetohidrodinâmicas (ELMs)',
      fuelCycle: 'Hidrogênio e Deutério com reciclagem avançada de gás de escape',
      coolingBlanket: 'Circuitos de hélio supercrítico a 4,5 Kelvin para os ímãs e trocadores de água de alta vazão no divertor',
      safetyMechanisms: 'Injeção de pellets criogênicos de gás nobre para mitigação e extinção suave do plasma em caso de perda de controle'
    }
  },
  {
    id: 'helion',
    name: 'Helion Energy (Polaris / Trenta)',
    type: 'Magneto-Inercial / FRC',
    country: 'Estados Unidos',
    location: 'Everett, Washington, EUA',
    operator: 'Helion Energy (com investimentos de Sam Altman e contrato com a Microsoft)',
    status: 'Protótipo Comercial',
    ignitionGoal: 'Primeira usina comercial de fusão a fornecer 50 MW elétricos líquidos à rede até 2028',
    plasmaTemp: '100.000.000 °C com recuperação direta de energia',
    magneticField: 'Campos magnéticos pulsados de compressão acelerada',
    powerOrYield: 'Conversão direta em eletricidade com eficiência projetada superior a 80-90% sem turbina a vapor',
    description: 'Abordagem disruptiva sem caldeiras de vapor ou turbinas. Utiliza dois anéis de plasma com Configuração de Campo Invertido (FRC) disparados um contra o outro a 1 milhão de km/h e comprimidos por ímãs. A expansão do plasma fundido empurra o campo magnético, induzindo eletricidade diretamente nas bobinas externas como um dínamo.',
    keyInnovations: [
      'Ciclo de combustível aneutrônico de Deutério e Hélio-3 (D-³He), gerando prótons carregados em vez de nêutrons de alta energia',
      'Recuperação direta de eletricidade por indução eletromagnética reversa (Lei de Faraday), eliminando perdas térmicas do ciclo Rankine',
      'Sintetizador próprio de Hélio-3 a partir do decaimento controlado de trítio gerado por reações D-D secundárias',
      'Contrato histórico de compra de energia assinado em 2023 com a Microsoft para abastecer data centers de inteligência artificial'
    ],
    schematicDetails: {
      confinementMethod: 'Acelerador magnético linear duplo com compressão de plasmoide de campo invertido no ponto central de colisão',
      fuelCycle: 'Deutério + Hélio-3 (²H + ³He → ⁴He + p⁺ + 18,3 MeV)',
      coolingBlanket: 'Bobinas de captação eletromagnética resfriadas por líquido sem necessidade de turbinas pesadas',
      safetyMechanisms: 'Pulsos discretos (1 a 10 Hz) com frações de miligramas de combustível por disparo'
    }
  }
];

export interface FissionVsFusionPoint {
  parameter: string;
  fission: string;
  fusion: string;
  advantage: 'Fissão' | 'Fusão' | 'Neutro';
}

export const FISSION_VS_FUSION_COMPARISON: FissionVsFusionPoint[] = [
  {
    parameter: 'Princípio Físico',
    fission: 'Quebra de núcleos atômicos pesados (Urânio-235 ou Plutônio-239) bombardeados por nêutrons térmicos lentos.',
    fusion: 'Fusão de núcleos ultraleves de hidrogênio (Deutério e Trítio) sob temperaturas de 100 a 150 milhões de °C.',
    advantage: 'Neutro'
  },
  {
    parameter: 'Disponibilidade de Combustível',
    fission: 'Minério de urânio na crosta terrestre. Recursos finitos estimados em ~100 a 200 anos de consumo atual (ou milênios com reatores rápidos breeders).',
    fusion: 'Deutério extraído da água do mar (33 gramas por m³) e Trítio gerado no reator a partir de Lítio. Combustível inesgotável por milhões de anos.',
    advantage: 'Fusão'
  },
  {
    parameter: 'Densidade de Energia',
    fission: 'Extrema: 1 grama de U-235 equivale a cerca de 1 a 3 toneladas de carvão mineral.',
    fusion: 'Colossal: 1 grama de combustível D-T libera 4 vezes mais energia que 1 grama de urânio e equivale a 8 toneladas de petróleo.',
    advantage: 'Fusão'
  },
  {
    parameter: 'Resíduos Radioativos (Lixo Nuclear)',
    fission: 'Gera produtos de fissão de meia-vida longa (Césio-137, Estrôncio-90) e actinídeos menores que demandam isolamento geológico de centenas a milhares de anos.',
    fusion: 'Sem actinídeos ou produtos de fissão tóxicos. O subproduto da queima é gás Hélio-4 inerte. A parede metálica do reator ativada por nêutrons torna-se segura para reciclagem em menos de 100 anos.',
    advantage: 'Fusão'
  },
  {
    parameter: 'Risco de Acidente Catastrófico / Meltdown',
    fission: 'Risco baixo em centrais modernas, mas real em caso de perda total de resfriamento (calor residual de decaimento dos produtos de fissão pode fundir o núcleo).',
    fusion: 'Risco físico ZERO de derretimento do núcleo. Há menos de 4 gramas de combustível na câmara a qualquer instante. Qualquer perturbação no vácuo resfria o plasma e apaga a reação em milissegundos.',
    advantage: 'Fusão'
  },
  {
    parameter: 'Proliferação e Uso Bélico de Materiais',
    fission: 'Requer instalações de enriquecimento de urânio e gera plutônio no combustível queimado, exigindo rigorosas salvaguardas internacionais da AIEA.',
    fusion: 'Os materiais combustíveis (Deutério, Trítio, Lítio) não podem produzir bombas atômicas por si sós. Ausência total de materiais físseis para proliferação.',
    advantage: 'Fusão'
  },
  {
    parameter: 'Estágio Atual de Maturidade Tecnológica',
    fission: 'Tecnologia comercial madura há mais de 70 anos. Mais de 440 reatores operacionais fornecendo ~10% da eletricidade mundial de forma contínua.',
    fusion: 'Em fase de validação experimental e protótipos em escala piloto (ITER, SPARC, NIF, W7-X). Primeiras usinas piloto conectadas à rede esperadas entre 2030 e 2040.',
    advantage: 'Fissão'
  }
];

