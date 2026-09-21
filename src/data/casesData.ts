import { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'hiroshima-nagasaki',
    title: 'Hiroshima e Nagasaki (1945)',
    year: '1945',
    location: 'Hiroshima e Nagasaki, Japão',
    category: 'conflito',
    categoryLabel: 'Emprego Bélico',
    shortSummary: 'As duas únicas detonações de armas nucleares em combate na história humana, que demonstraram o poder destrutivo da fissão atômica.',
    context: 'Em agosto de 1945, no ápice final da Segunda Guerra Mundial no Teatro do Pacífico, as Forças Aliadas buscavam acelerar a rendição incondicional do Império do Japão sem recorrer a uma invasão anfíbia das ilhas principais (Operação Downfall).',
    whatHappened: 'Em 6 de agosto de 1945, o bombardeiro B-29 Enola Gay lançou a bomba "Little Boy" (arma de fissão por canhão com urânio-235 enriquecido, rendimento de ~15 kilotons) sobre o centro de Hiroshima. Três dias depois, em 9 de agosto, o B-29 Bockscar lançou "Fat Man" (arma de fissão por implosão com plutônio-239, ~21 kilotons) sobre Nagasaki.',
    consequences: [
      'Estimativa de 70.000 a 140.000 mortes imediatas e a curto prazo em Hiroshima.',
      'Estimativa de 40.000 a 80.000 mortes em Nagasaki até o fim de 1945.',
      'Destruição de mais de 70% das construções civis e tempestades de fogo generalizadas.',
      'Sobreviventes (Hibakusha) sofreram com queimaduras severas (flash burns), síndrome aguda de radiação, leucemia e cânceres a longo prazo.',
      'Rendição formal do Japão em 15 de agosto de 1945 e assinatura no USS Missouri em 2 de setembro.'
    ],
    historicalSignificance: 'Marcou o divisor de águas entre a guerra convencional e a Era Atômica, gerando o imperativo moral e diplomático universal para evitar novas guerras nucleares.',
    lessonsLearned: 'Demonstrou que armas nucleares são qualitativamente distintas de qualquer outro armamento militar, tendo efeitos indiscriminados sobre civis e meio ambiente.'
  },
  {
    id: 'demon-core-los-alamos',
    title: 'O "Demon Core": Acidentes de Criticalidade em Los Alamos (1945–1946)',
    year: '1945–1946',
    location: 'Laboratório Nacional de Los Alamos (Omega Site), Novo México, EUA',
    category: 'acidente',
    categoryLabel: 'Acidente de Criticalidade',
    shortSummary: 'Os dois acidentes fatais com o núcleo de plutônio de 6,2 kg apelidado de "Demon Core", que vitimaram os físicos Harry Daghlian e Louis Slotin.',
    context: 'Após a capitulação do Japão em agosto de 1945, o terceiro núcleo de plutônio produzido pelo Projeto Manhattan (destinado a uma terceira bomba atômica após Trinity e Nagasaki) permaneceu no Laboratório de Los Alamos para experimentos de determinação precisa de massa crítica com refletores de nêutrons.',
    whatHappened: 'Em 21 de agosto de 1945, o físico Harry Daghlian construía sozinho uma parede de blocos de carbeto de tungstênio ao redor da esfera de plutônio de 6,2 kg. Ao colocar o último bloco, sua mão escorregou e o tijolo de 4,4 kg caiu diretamente sobre o núcleo, refletindo nêutrons e induzindo prompt-criticality imediata. Daghlian rapidamente empurrou o bloco, mas recebeu 510 rem (5,1 Sv) de radiação, falecendo 25 dias depois. Nove meses depois, em 21 de maio de 1946, o físico Louis Slotin realizava o experimento apelidado por Richard Feynman de "fazer cócegas na cauda de um dragão adormecido" (tickling the dragon\'s tail), abaixando uma semiesfera de berílio refletor sobre o núcleo usando apenas a ponta de uma chave de fenda. A chave escorregou, a cúpula fechou-se e uma explosão de nêutrons e raios gama ionizou o ar em um intenso clarão azul; Slotin cobriu a montagem com o próprio corpo para salvar sete outros pesquisadores na sala, recebendo mais de 1.000 rem e vindo a óbito 9 dias depois.',
    consequences: [
      'Morte de dois físicos pioneiros do Projeto Manhattan por Síndrome Aguda de Radiação severa (Harry Daghlian aos 24 anos e Louis Slotin aos 35 anos).',
      'Exposição aguda de outros cientistas e assistentes na sala de testes, que desenvolveram sequelas crônicas.',
      'Proibição definitiva e imediata pelo governo dos EUA de qualquer manipulação humana manual direta de conjuntos de massa crítica ("hands-on criticality tests").',
      'Desenvolvimento de maquinários de controle remoto e blindagem espessa de chumbo e concreto (como a máquina "Topsy" e "Lady Godiva") para operar a centenas de metros de distância.',
      'O núcleo de plutônio foi posteriormente derretido e seu material reutilizado em outros dispositivos nucleares dos arsenais norte-americanos da Operação Crossroads.'
    ],
    historicalSignificance: 'Simbolizou tragicamente o perigo letal invisível da física nuclear e fundou as disciplinas modernas de radioproteção, controle remoto de materiais físseis e protocolos de dosimetria de emergência.',
    lessonsLearned: 'Nenhum protocolo científico de segurança pode depender da destreza física individual ou ferramentas improvisadas (como uma chave de fenda) ao manusear materiais supercríticos.'
  },
  {
    id: 'castle-bravo',
    title: 'Teste Termonuclear Castle Bravo (1954)',
    year: '1954',
    location: 'Atol de Bikini, Ilhas Marshall (Oceano Pacífico)',
    category: 'teste',
    categoryLabel: 'Teste Nuclear',
    shortSummary: 'A maior explosão nuclear conduzida pelos Estados Unidos, que produziu rendimento inesperado de 15 megatons e fallout radioativo generalizado.',
    context: 'Durante a Operação Castle, os EUA testaram o dispositivo "Shrimp", o primeiro teste prático de uma arma termonuclear utilizando combustível seco de deutereto de lítio.',
    whatHappened: 'Cálculos teóricos previam um rendimento de aproximadamente 5 a 6 megatons. No entanto, os cientistas subestimaram a contribuição do isótopo Lítio-7, que sofreu fissão ao interagir com nêutrons rápidos. A reação gerou 15 megatons (1.000 vezes a força de Hiroshima), vaporizando três ilhas do atol e abrindo uma cratera de 2 km de diâmetro e 75 m de profundidade.',
    consequences: [
      'A nuvem de poeira radioativa e cinzas de coral pulverizado contaminou mais de 18.000 km² de oceano.',
      'Habitantes de atóis vizinhos (como Rongelap e Utirik) e a tripulação do barco pesqueiro japonês Daigo Fukuryū Maru (Lucky Dragon No. 5) receberam doses severas de radiação.',
      'Causou comoção internacional e protestos mundiais contra os testes nucleares na atmosfera.',
      'Evacuação forçada e deslocamento permanente dos habitantes originários do Atol de Bikini.'
    ],
    historicalSignificance: 'Foi o principal catalisador que conduziu às negociações do Tratado de Proibição Parcial de Testes Nucleares (PTBT) de 1963.',
    lessonsLearned: 'Revelou os riscos extremos do fallout troposférico e estratosférico e as incertezas inerentes à física de reações termonucleares de grande escala.'
  },
  {
    id: 'crise-dos-misseis-1962',
    title: 'A Crise dos Mísseis de Cuba (1962)',
    year: '1962',
    location: 'Cuba e Mar do Caribe / Washington e Moscou',
    category: 'crise',
    categoryLabel: 'Crise Geopolítica',
    shortSummary: 'O confronto de treze dias que levou o mundo ao ponto mais próximo de um holocausto termonuclear global.',
    context: 'Após o fracasso da invasão da Baía dos Porcos e a instalação de mísseis americanos Jupiter na Turquia e Itália, a União Soviética secretamente transportou mísseis nucleares de médio alcance (R-12 e R-14) para Cuba na Operação Anadyr.',
    whatHappened: 'Em 14 de outubro de 1962, um avião espião U-2 fotografou plataformas de lançamento em construção. O presidente John F. Kennedy estabeleceu uma "quarentena naval" em torno da ilha e colocou as forças estratégicas em alerta DEFCON 2. Incidentes perigosos ocorreram, incluindo a quase detonação de um torpedo nuclear pelo submarino soviético B-59 (evitada pelo oficial Vasili Arkhipov). A crise foi solucionada diplomaticamente por cartas diretas entre Kennedy e Nikita Khrushchev.',
    consequences: [
      'Retirada de todos os mísseis e bombardeiros soviéticos de Cuba sob supervisão da ONU.',
      'Compromisso público dos EUA de não invadir Cuba e retirada confidencial dos mísseis Jupiter na Turquia.',
      'Criação da Linha Direta Moscou-Washington ("Telefone Vermelho") para comunicação instantânea entre líderes.',
      'Início do relaxamento de tensões (Détente) e primeiros tratados bilaterais de desarmamento.'
    ],
    historicalSignificance: 'Serviu como o lembrete definitivo de que a teoria dos jogos e a dissuasão nuclear carregam riscos catastróficos de erros de cálculo humano e tecnológico.',
    lessonsLearned: 'Comunicação diplomática transparente e canais de desescalada de crise são indispensáveis para a sobrevivência global.'
  },
  {
    id: 'three-mile-island',
    title: 'Acidente de Three Mile Island (1979)',
    year: '1979',
    location: 'Pensilvânia, Estados Unidos',
    category: 'acidente',
    categoryLabel: 'Acidente Industrial',
    shortSummary: 'O mais grave acidente em uma central nuclear comercial nos Estados Unidos, com derretimento parcial do núcleo sem mortes imediatas.',
    context: 'A Unidade 2 da Usina de Three Mile Island (TMI-2) era um reator de água pressurizada (PWR) que havia entrado em operação comercial poucos meses antes.',
    whatHappened: 'Uma falha mecânica no sistema secundário de alimentação de água provocou o desligamento automático da turbina e do reator. Uma válvula de alívio (PORV) emperrou aberta sem que os operadores percebessem devido a leituras ambíguas nos instrumentos do painel de controle. A perda de refrigerante levou ao superaquecimento e derretimento de cerca de metade do núcleo de urânio.',
    consequences: [
      'A estrutura de contenção maciça de concreto e aço manteve a integridade, impedindo vazamentos catastróficos.',
      'Liberação controlada de pequenas quantidades de gases nobres com impacto radiológico negligenciável na saúde pública da região.',
      'Paralisou a construção de novas usinas nucleares nos Estados Unidos por mais de três décadas.',
      'Custos de limpeza e descomissionamento ultrapassaram 1 bilhão de dólares.'
    ],
    historicalSignificance: 'Transformou radicalmente a engenharia de fatores humanos, interfaces de controle e protocolos de segurança na indústria nuclear ocidental.',
    lessonsLearned: 'Mostrou a necessidade de redundância em sensores, clareza na interface homem-máquina e criação do Instituto de Operações de Energia Nuclear (INPO).'
  },
  {
    id: 'chernobyl-1986',
    title: 'Desastre Nuclear de Chernobyl (1986)',
    year: '1986',
    location: 'Pripyat / Chernobyl, República Socialista Soviética da Ucrânia',
    category: 'acidente',
    categoryLabel: 'Desastre Radiológico',
    shortSummary: 'O pior acidente nuclear civil da história, caracterizado pela explosão a vapor e incêndio do núcleo de grafite do reator 4.',
    context: 'A equipe de operadores planejava realizar um teste de segurança elétrica para verificar se a inércia da turbina a vapor forneceria eletricidade suficiente para as bombas d’água durante uma queda de energia até que os geradores a diesel entrassem em ação.',
    whatHappened: 'Devido a atrasos na rede elétrica, o reator operou por horas em baixa potência, causando "envenenamento por Xenônio-135". Para recuperar a potência, operadores violaram regras e extraíram a quase totalidade das barras de controle. Ao acionar o botão de parada de emergência (AZ-5), as pontas de grafite das barras causaram um deslocamento inicial de água e um pico violento de reatividade (coeficiente de vazio positivo). A pressão rompeu o vaso, e o oxigênio causou explosões térmicas e incêndio do grafite a 2.000 °C por 10 dias.',
    consequences: [
      'Morte de 31 pessoas nas primeiras semanas (bombeiros e operadores por síndrome aguda da radiação).',
      'Mobilização de mais de 600.000 "liquidadores" soviéticos para conter o incêndio e construir o sarcófago de concreto.',
      'Evacuação permanente de Pripyat e 116.000 pessoas, com criação da Zona de Exclusão de 2.600 km².',
      'Dispersão de plumas radioativas sobre a Bielorrússia, Ucrânia, Rússia e países nórdicos e europeus.',
      'Aumento estatístico de casos de câncer de tireoide em crianças devido ao Iodo-131 nos anos subsequentes.'
    ],
    historicalSignificance: 'Acelerou o processo de transparência (Glasnost) de Mikhail Gorbachev e levou à reformulação global da segurança de reatores nucleares e à fundação da WANO (World Association of Nuclear Operators).',
    lessonsLearned: 'Reatores nucleares exigem cultura de segurança implacável, projetos com coeficientes de reatividade intrinsecamente negativos e estruturas de contenção completas.'
  },
  {
    id: 'goiania-cesio-137',
    title: 'O Acidente Radiológico de Goiânia (1987)',
    year: '1987',
    location: 'Goiânia, Goiás, Brasil',
    category: 'acidente',
    categoryLabel: 'Acidente com Fonte Selada',
    shortSummary: 'O maior acidente radiológico fora de usinas nucleares do mundo, provocado pelo manuseio inadequado de uma cápsula de radioterapia de Césio-137 abandonada.',
    context: 'O Instituto Goiano de Radioterapia (IGR) desativou suas instalações antigas no centro de Goiânia em 1985, deixando para trás um aparelho de teleterapia contendo uma fonte selada de Césio-137 (cloreto de césio) com atividade de ~50,9 Terabecquerels (1.375 Curies).',
    whatHappened: 'Em 13 de setembro de 1987, dois catadores de sucata encontraram a cápsula de chumbo e a romperam com marretas. A substância emitia um brilho azulado misterioso no escuro (devido à excitação da luz ambiente e radiação). A cápsula foi vendida a um ferro-velho, cujos proprietários e familiares manipularam o pó, distribuíram pequenos pedaços a parentes e amigos e o espalharam por diversos bairros da cidade.',
    consequences: [
      '4 mortes confirmadas nos primeiros meses por síndrome aguda de radiação (incluindo a menina Leide das Neves, de 6 anos).',
      'Mais de 112.000 pessoas foram triadas no Estádio Olímpico com contadores Geiger; 249 apresentaram contaminação e dezenas foram hospitalizadas.',
      'Geração de mais de 3.500 m³ (6.000 toneladas) de rejeitos radioativos acondicionados em depósitos permanentes de concreto em Abadia de Goiás.',
      'Estigmatização social e perdas econômicas para produtos e moradores de Goiás na época.'
    ],
    historicalSignificance: 'Levou a CNEN (Comissão Nacional de Energia Nuclear) e a AIEA a criarem regulamentações internacionais rigorosas para rastreamento, custódia e descarte de fontes radioativas seladas para uso médico e industrial.',
    lessonsLearned: 'Fontes órfãs e equipamentos médicos radioativos exigem inventários nacionais permanentes e responsabilidade civil e criminal estrita dos proprietários.'
  },
  {
    id: 'fukushima-daiichi-2011',
    title: 'Acidente de Fukushima Daiichi (2011)',
    year: '2011',
    location: 'Fukushima, Japão',
    category: 'acidente',
    categoryLabel: 'Desastre Natural & Tecnológico',
    shortSummary: 'Derretimento tríplice de reatores provocado pelo Grande Terremoto do Leste do Japão e um tsunami catastrófico que inundou sistemas elétricos.',
    context: 'A Usina de Fukushima Daiichi, operada pela TEPCO, possuía reatores de água fervente (BWR) protegidos por um dique marítimo projetado para ondas de até 5,7 metros.',
    whatHappened: 'Em 11 de março de 2011, um sismo de magnitude 9,0 desarmou automaticamente os reatores 1, 2 e 3 e cortou a rede elétrica externa. Os geradores a diesel de emergência foram acionados, mas 50 minutos depois, um tsunami de 14 a 15 metros ultrapassou o dique de contenção e inundou as salas subterrâneas dos geradores e baterias elétricas (Blackout total da estação - SBO). Sem refrigeração, o combustível de óxido de urânio superaqueceu, gerou gás hidrogênio por reação química a alta temperatura e causou explosões destrutivas nos edifícios dos reatores 1, 3 e 4.',
    consequences: [
      'Evacuação ordenada de mais de 160.000 residentes em um raio de 20 km ao redor da usina.',
      'Nenhuma morte direta por radiação aguda entre os trabalhadores e a população civil no local.',
      'Contaminação radioativa de áreas agrícolas circundantes e de águas marinhas costeiras.',
      'Paralisação temporária de toda a frota nuclear japonesa e revisão de segurança ("stress tests") em todos os reatores mundiais.',
      'Processo de descomissionamento complexo e de longo prazo estimado em 30 a 40 anos.'
    ],
    historicalSignificance: 'Demonstrou a necessidade crítica de defesas passivas que não dependam de eletricidade e de planos de contingência contra eventos naturais extremos combinados ("Common Cause Failures").',
    lessonsLearned: 'Incorporação de sistemas de resfriamento passivo por gravidade e convecção em reatores modernos de III+ e IV Geração.'
  }
];
