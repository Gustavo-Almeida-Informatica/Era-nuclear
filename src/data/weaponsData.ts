export interface WeaponCategory {
  id: string;
  name: string;
  historicalPeriod: string;
  physicsConcept: string;
  deploymentContext: string;
  historicalImpact: string;
  yieldRange: string;
  keyExamples: string[];
}

export const weaponCategories: WeaponCategory[] = [
  {
    id: 'armas-fissao',
    name: 'Armas de Fissão Pura (Bombas Atômicas)',
    historicalPeriod: '1945 – Presente (Primeira geração)',
    physicsConcept: 'Utilizam uma reação em cadeia supercrítica e não moderada induzida por nêutrons rápidos em uma massa crítica de Urânio-235 ou Plutônio-239. Em uma fração de microssegundo, bilhões de núcleos sofrem fissão liberando energia térmica, mecânica e radiação.',
    deploymentContext: 'Desenvolvidas no Projeto Manhattan (1942-1945) para encerrar a Segunda Guerra Mundial. Conceitualmente montadas por método de canhão (aproximação subcrítica rápida) ou implosão esférica explosiva de alta precisão.',
    historicalImpact: 'Demonstraram pela primeira vez o potencial destrutivo da física nuclear, inaugurando a Era Atômica e os primeiros esforços de controle internacional.',
    yieldRange: '10 a 500 Kilotons (equivalente a 10.000 a 500.000 toneladas de TNT)',
    keyExamples: ['Little Boy (1945, ~15 kt)', 'Fat Man (1945, ~21 kt)', 'RDS-1 (1949, ~22 kt)']
  },
  {
    id: 'armas-termonucleares',
    name: 'Armas Termonucleares de Fusão (Bombas de Hidrogênio)',
    historicalPeriod: '1952 – Presente (Segunda geração / Padrão atual)',
    physicsConcept: 'Baseiam-se na configuração de dois estágios (Conceito Teller-Ulam). Um "primário" de fissão nuclear atua como detonador: seus raios X e calor extremo comprimem e aquecem um "secundário" contendo deutereto de lítio e urânio, induzindo a fusão termonuclear de hidrogênio e fissões adicionais de alta energia.',
    deploymentContext: 'Desenvolvidas durante o auge da Guerra Fria (décadas de 1950 e 1960) para multiplicar o rendimento destrutivo enquanto reduzem o peso e o volume físico das ogivas para caber em mísseis balísticos.',
    historicalImpact: 'Multiplicaram o potencial destrutivo em centenas a milhares de vezes, tornando viável a destruição em massa de metrópoles inteiras com uma única ogiva.',
    yieldRange: '100 Kilotons até dezenas de Megatons (1 Megaton = 1.000.000 toneladas de TNT)',
    keyExamples: ['Ivy Mike (1952, 10,4 Mt)', 'Castle Bravo (1954, 15 Mt)', 'Tsar Bomba RDS-220 (1961, 50 Mt)']
  },
  {
    id: 'bombas-gravidade',
    name: 'Bombas de Gravidade Lançadas por Aeronaves',
    historicalPeriod: '1945 – Presente',
    physicsConcept: 'Dispositivos não propelidos lançados do compartimento de bombas de aeronaves bombardeiros estratégicos de longo alcance (como B-29, B-52, Tu-95, B-2 Spirit), guiados por inércia ou queda livre com paraquedas de retardo para detonação em altitude ideal (Airburst) ou na superfície.',
    deploymentContext: 'Era o único meio de lançamento disponível nos primeiros 15 anos da Era Nuclear antes do desenvolvimento prático de mísseis balísticos confiáveis.',
    historicalImpact: 'Moldaram toda a doutrina de aviação estratégica e comando aéreo durante as décadas de 1940 a 1960.',
    yieldRange: 'Variável de frações de kiloton (selecionável / dial-a-yield) até vários megatons',
    keyExamples: ['Mark 17 (EUA)', 'B61 (EUA / OTAN)', 'RDS-37 (URSS)']
  },
  {
    id: 'misseis-balisticos-icbm-slbm',
    name: 'Mísseis Balísticos com Ogivas Nucleares (ICBM e SLBM)',
    historicalPeriod: 'Final dos anos 1950 – Presente',
    physicsConcept: 'Foguetes de estágios múltiplos que impulsionam ogivas nucleares em trajetórias suborbitais através do espaço exterior até reentrarem na atmosfera a velocidades hipersônicas (> Mach 20). Muitos utilizam a tecnologia MIRV (Múltiplos Veículos de Reentrada Independentemente Alvejáveis).',
    deploymentContext: 'Formam a espinha dorsal da "Tríade Nuclear" (Silos terrestres, Submarinos de propulsão nuclear lançadores de mísseis balísticos - SSBNs e Bombardeiros).',
    historicalImpact: 'Reduziram o tempo de voo de ataque de horas para menos de 30 minutos, criando o conceito de "Destruição Mútua Assegurada" e exigindo sistemas de alerta antecipado via satélite e radar.',
    yieldRange: '100 kt a 800 kt por veículo de reentrada (ogiva individual)',
    keyExamples: ['Minuteman III e Trident II (EUA)', 'R-36M Satan e Yars (Rússia)', 'DF-41 (China)', 'M51 (França)']
  },
  {
    id: 'armas-estrategicas-taticas',
    name: 'Armas Estratégicas vs. Armas Táticas (Não Estratégicas)',
    historicalPeriod: '1950 – Presente (Conceituação doutrinária)',
    physicsConcept: 'A distinção não reside exclusivamente no rendimento físico da ogiva, mas sim na sua missão militar, alcance e doutrina de emprego pretendida.',
    deploymentContext: 'Armas Estratégicas visam alvos de infraestrutura nacional profunda, centros de comando e bases de mísseis para incapacitar a capacidade de guerra do adversário. Armas Táticas foram projetadas para uso no campo de batalha imediato contra concentrações de tropas, portos ou bases aéreas.',
    historicalImpact: 'Especialistas em controle de armas enfatizam que o emprego de qualquer arma tática resultaria inevitavelmente na escalada descontrolada para um conflito nuclear estratégico global total.',
    yieldRange: 'Táticas: 0,1 kt a dezenas de kt; Estratégicas: 100 kt a dezenas de megatons',
    keyExamples: ['Projéteis de artilharia nuclear W48 (histórico)', 'Minas atômicas terrestres (histórico)', 'Mísseis de cruzeiro com ogiva tática']
  }
];

export interface TreatyInfo {
  name: string;
  year: string;
  scope: string;
  signatories: string;
  keyArticle: string;
  status: string;
}

export const nuclearTreaties: TreatyInfo[] = [
  {
    name: 'Tratado de Não Proliferação Nuclear (TNP)',
    year: '1968 (em vigor em 1970)',
    scope: 'Pilar fundamental: impede novos estados de obterem armas, prevê desarmamento progressivo e garante cooperação civil pacífica.',
    signatories: '191 Estados-Partes',
    keyArticle: 'Artigo VI: Obrigação de negociar de boa-fé a cessação da corrida armamentista e o desarmamento geral e completo.',
    status: 'Vigente e com conferências de revisão quinquenais da ONU.'
  },
  {
    name: 'Tratado de Proibição Parcial de Testes (PTBT)',
    year: '1963',
    scope: 'Proíbe detonações e testes nucleares na atmosfera, no espaço sideral e debaixo d’água para conter o envenenamento radioativo global.',
    signatories: '126 Estados',
    keyArticle: 'Artigo I: Proibição de qualquer teste nuclear em ambiente aberto que cause dispersão de resíduos fora das fronteiras territoriais.',
    status: 'Vigente (antecessor do CTBT).'
  },
  {
    name: 'Tratado de Proibição Completa de Testes (CTBT)',
    year: '1996',
    scope: 'Proíbe absolutamente qualquer teste nuclear explosivo em qualquer lugar (inclusive subterrâneo). Cria rede de monitoramento global (IMS).',
    signatories: '187 assinaturas / 178 ratificações',
    keyArticle: 'Artigo I: Cada Estado se compromete a não realizar qualquer explosão experimental de arma nuclear.',
    status: 'Norma global cumprida de facto pela maioria dos países; aguarda ratificações específicas do Anexo 2.'
  },
  {
    name: 'Tratado sobre a Proibição de Armas Nucleares (TPNW)',
    year: '2017 (em vigor em 2021)',
    scope: 'Primeiro instrumento jurídico multilateral que declara armas nucleares totalmente ilegais sob a ótica do Direito Internacional Humanitário.',
    signatories: '93 assinaturas / 70 ratificações',
    keyArticle: 'Artigo 1: Proíbe estritamente desenvolver, testar, produzir, estocar, transferir ou ameaçar usar armas nucleares.',
    status: 'Em pleno vigor para os Estados signatários sob a égide da Assembleia Geral da ONU.'
  }
];
