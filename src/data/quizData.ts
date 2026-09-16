import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é a principal diferença conceitual entre fissão nuclear e fusão nuclear?',
    options: [
      'A fissão divide núcleos pesados em núcleos médios; a fusão une núcleos leves em um mais pesado.',
      'A fissão só ocorre naturalmente no Sol; a fusão só ocorre em usinas de energia comerciais terrestres.',
      'A fissão consome energia para manter a estabilidade; a fusão não envolve liberação de nêutrons.',
      'A fissão altera elétrons orbitais; a fusão converte prótons diretamente em partículas beta.'
    ],
    correctIndex: 0,
    explanation: 'A fissão é a fragmentação de um núcleo atômico pesado (como U-235 ou Pu-239) induzida por nêutrons, enquanto a fusão é a junção de núcleos leves (como Deutério e Trítio) sob altíssimas temperaturas e pressões.',
    category: 'Física Fundamental'
  },
  {
    id: 2,
    question: 'Que partícula subatômica foi descoberta por James Chadwick em 1932 e tornou viável a reação nuclear em cadeia por não possuir carga elétrica?',
    options: [
      'Nêutron',
      'Pósitron',
      'Elétron',
      'Múon'
    ],
    correctIndex: 0,
    explanation: 'Por ter carga elétrica nula (q = 0), o nêutron penetra no núcleo atômico sem sofrer repulsão da barreira eletrostática de Coulomb imposta pelos prótons positivos.',
    category: 'História & Descobertas'
  },
  {
    id: 3,
    question: 'Qual dos seguintes materiais é suficiente para bloquear completamente a radiação Alfa (α)?',
    options: [
      'Uma simples folha de papel ou a camada de células mortas da epiderme humana.',
      'Uma placa de chumbo maciço com 5 centímetros de espessura.',
      'Pelo menos 1 metro de concreto armado de alta densidade.',
      'Uma lâmina de aço inoxidável imersa em água pesada.'
    ],
    correctIndex: 0,
    explanation: 'As partículas alfa são núcleos de Hélio (2 prótons e 2 nêutrons, carga +2e) pesadas e duplamente ionizadas; perdem energia rapidamente em colisões e são detidas por alguns centímetros de ar ou uma folha de papel.',
    category: 'Proteção Radiológica'
  },
  {
    id: 4,
    question: 'O que o conceito físico Teller-Ulam introduziu no design das armas nucleares modernas?',
    options: [
      'A configuração de dois estágios, usando os raios X do primário de fissão para comprimir e detonar o secundário de fusão termonuclear.',
      'O método de centrifugação a gás para o enriquecimento isotópico do urânio natural.',
      'O primeiro protocolo de blindagem contra radiação para submarinos nucleares.',
      'A substituição do urânio por tório em bombas de fragmentação limpa.'
    ],
    correctIndex: 0,
    explanation: 'Stanislaw Ulam e Edward Teller idealizaram a implosão por radiação: o primário de fissão emite um banho de raios X térmicos que canaliza pressão para comprimir adiabaticamente o secundário de deutério-trítio antes que a cápsula se expanda.',
    category: 'Armamentos & História'
  },
  {
    id: 5,
    question: 'Qual é o mecanismo físico-climático da hipótese do "Inverno Nuclear"?',
    options: [
      'A fuligem de megaincêndios urbanos sobe até a estratosfera, bloqueando a radiação solar e provocando resfriamento global drástico.',
      'A detonação de armas nucleares altera a rotação da Terra e desvia as correntes térmicas dos oceanos.',
      'A ionização do oxigênio atmosférico converte todo o ar em gelo carbônico instantâneo.',
      'A radiação gama decompõe a camada de ozônio em vapor de água criogênico.'
    ],
    correctIndex: 0,
    explanation: 'Incêndios maciços em cidades detonadas ejetariam milhões de toneladas de fuligem carbonácea escura acima da troposfera, onde a chuva não a remove, bloqueando até 90% da luz solar e derrubando as temperaturas globais por anos.',
    category: 'Impactos Planetários'
  },
  {
    id: 6,
    question: 'Qual radioisótopo emissor de pósitrons (β+) é amplamente utilizado no exame médico de tomografia PET-Scan para detecção precoce de câncer?',
    options: [
      'Flúor-18 (¹⁸F incorporado na molécula FDG)',
      'Urânio-238 (²³⁸U)',
      'Cobalto-60 (⁶⁰Co)',
      'Polônio-210 (²¹⁰Po)'
    ],
    correctIndex: 0,
    explanation: 'O Flúor-18 é sintetizado em ciclotrons hospitalares e ligado à glicose (FDG). Células tumorais hipermetabólicas absorvem o marcador; ao decair por emissão de pósitrons que colidem com elétrons, geram pares de fótons gama em 180° detectados pelo PET.',
    category: 'Energia & Medicina'
  },
  {
    id: 7,
    question: 'Qual foi o teste nuclear mais potente já detonado pela humanidade na história, atingindo 50 Megatons de energia explosiva em outubro de 1961?',
    options: [
      'Tsar Bomba (RDS-220 / Produto 602, União Soviética)',
      'Castle Bravo (Estados Unidos)',
      'Ivy Mike (Estados Unidos)',
      'Canopus (França)'
    ],
    correctIndex: 0,
    explanation: 'A Tsar Bomba foi detonada sobre o arquipélago ártico de Nova Zembla pela URSS em 30 de outubro de 1961. Sua bola de fogo teve 8 km de largura e a nuvem em cogumelo atingiu 67 km de altitude.',
    category: 'Armamentos & História'
  },
  {
    id: 8,
    question: 'Por que o Urânio-235 é o isótopo preferido para fissão térmica em reatores comerciais em vez do Urânio-238?',
    options: [
      'O U-235 é físsil com nêutrons térmicos lentos de baixa energia, enquanto o U-238 requer nêutrons rápidos de alta energia para fisionar.',
      'O U-238 é estável e não possui decaimento radioativo.',
      'O U-235 é 99,3% abundante na natureza em comparação ao raro U-238.',
      'O U-238 não contém nêutrons no seu núcleo atômico.'
    ],
    correctIndex: 0,
    explanation: 'O U-235 possui número ímpar de nêutrons (143). Ao absorver um nêutron térmico, a energia de emparelhamento adicionada ao núcleo composto U-236 supera a barreira crítica de fissão imediatamente.',
    category: 'Física Fundamental'
  },
  {
    id: 9,
    question: 'No acidente nuclear de Chernobyl (1986), qual característica do reator RBMK-1000 causou a explosão inicial descontrolada de potência?',
    options: [
      'Coeficiente de reatividade positivo de vazio e barras de controle com pontas de grafite que aceleraram a reação ao serem inseridas.',
      'Vazamento imediato de água pesada no circuito secundário da turbina.',
      'Detonação de uma ogiva nuclear armazenada clandestinamente no subsolo.',
      'Colapso total da estrutura de contenção por impacto de míssil balístico.'
    ],
    correctIndex: 0,
    explanation: 'O RBMK operava com moderador de grafite e refrigerante de água leve. Ao ferver a água (que absorvia nêutrons), o reator ganhava reatividade (vazio positivo). O acionamento do botão AZ-5 empurrou grafite para o núcleo, causando um pico de 30.000 MW térmicos em segundos.',
    category: 'Acidentes & Lições'
  },
  {
    id: 10,
    question: 'Qual reação de fusão nuclear é considerada a mais favorável para a primeira geração de reatores comerciais devido à sua menor temperatura de ignição?',
    options: [
      'Deutério + Trítio (²H + ³H → ⁴He + n⁰ + 17,6 MeV)',
      'Próton + Próton (¹H + ¹H → ²H + e⁺ + ν)',
      'Carbono + Oxigênio (¹²C + ¹⁶O → ²⁸Si)',
      'Hélio-3 + Hélio-3 (³He + ³He → ⁴He + 2p⁺)'
    ],
    correctIndex: 0,
    explanation: 'A reação D-T possui a maior seção de choque nuclear em temperaturas de plasma de 100 a 150 milhões de °C, tornando viável a obtenção de balanço líquido de energia antes de ciclos mais complexos.',
    category: 'Fusão Nuclear'
  },
  {
    id: 11,
    question: 'O que é a "Meia-Vida" (t₁/₂) de um radioisótopo?',
    options: [
      'O tempo necessário para que metade dos átomos radioativos de uma amostra sofra desintegração.',
      'O tempo que uma substância leva para perder exatamente 100% de sua atividade radiológica.',
      'O tempo de validade comercial de um combustível nuclear na piscina de resfriamento.',
      'A metade do tempo que a luz leva para atravessar o núcleo do átomo.'
    ],
    correctIndex: 0,
    explanation: 'A meia-vida física é uma constante probabilística de decaimento espontâneo regida pela lei exponencial N(t) = N₀ · (1/2)^(t/t₁/₂).',
    category: 'Física Fundamental'
  },
  {
    id: 12,
    question: 'Qual é o papel do "Moderador" em um reator nuclear de fissão de água leve (como os tipos PWR e BWR)?',
    options: [
      'Reduzir a velocidade e a energia cinética dos nêutrons rápidos para transformá-los em nêutrons térmicos lentos eficientes para fissão.',
      'Absorver todos os nêutrons para desligar o reator instantaneamente.',
      'Aumentar a temperatura do combustível nuclear para evaporar o urânio.',
      'Impedir que a radiação gama atravesse a blindagem de aço.'
    ],
    correctIndex: 0,
    explanation: 'Nêutrons nascem na fissão com energias de ~2 MeV (rápidos). Ao colidirem elasticamente com núcleos leves de hidrogênio na água (moderador), desaceleram para ~0,025 eV (térmicos), aumentando a probabilidade de fissão do U-235 em centenas de vezes.',
    category: 'Reatores & Engenharia'
  },
  {
    id: 13,
    question: 'No grave acidente radiológico de Goiânia (1987), qual isótopo radioativo brilhava em azul no escuro e causou contaminação grave ao ser retirado de uma clínica desativada?',
    options: [
      'Césio-137 (Cloreto de Césio, ¹³⁷Cs)',
      'Cobalto-60 (⁶⁰Co)',
      'Rádio-226 (²²⁶Ra)',
      'Amerício-241 (²⁴¹Am)'
    ],
    correctIndex: 0,
    explanation: 'Uma fonte de teleterapia de Césio-137 contendo 50,9 TBq (1.375 Ci) em pó solúvel foi violada em um ferro-velho. O brilho azul decorria da ionização e luminescência do ar e umidade induzida pela radiação intensa.',
    category: 'Acidentes & Lições'
  },
  {
    id: 14,
    question: 'Qual é o princípio operacional do reator Tokamak para o confinamento magnético de plasma em fusão nuclear?',
    options: [
      'Uma câmara em formato de toro (donut) com campos magnéticos helicoidais que impedem que o plasma superaquecido encoste nas paredes.',
      'O bombardeio de pastilhas de combustível sólido por centenas de canhões a laser simultâneos.',
      'A centrifugação mecânica de plasma líquido em cilindros de alta rotação a frio.',
      'O confinamento eletrostático passivo através de painéis solares no vácuo.'
    ],
    correctIndex: 0,
    explanation: 'Desenvolvido inicialmente pelos físicos soviéticos Igor Tamm e Andrei Sakharov, o Tokamak combina um campo magnético toroidal externo e um campo poloidal induzido por corrente no plasma para aprisionar partículas carregadas em trajetórias helicoidais fechadas.',
    category: 'Fusão Nuclear'
  },
  {
    id: 15,
    question: 'Qual foi a principal causa do acidente nuclear múltiplo na usina de Fukushima Daiichi no Japão em março de 2011?',
    options: [
      'Um tsunami de 14 metros superou o quebra-mar e inundou os geradores a diesel de emergência, provocando perda total de energia e resfriamento (Station Blackout).',
      'Uma fissão nuclear descontrolada do tipo explosão atômica nos núcleos dos reatores.',
      'Um ataque cibernético que sabotou os sistemas digitais de desligamento sc隻ram.',
      'A quebra das barras de controle de boro devido a um terremoto que não gerou ondas marítimas.'
    ],
    correctIndex: 0,
    explanation: 'Embora os reatores tenham desligado automaticamente durante o terremoto de Tohoku, o tsunami inundou os geradores diesel no subsolo. Sem energia para bombear água de resfriamento, o calor de decaimento derreteu o combustível e gerou hidrogênio explosivo.',
    category: 'Acidentes & Lições'
  },
  {
    id: 16,
    question: 'Qual elemento químico e isótopo foi sintetizado pela primeira vez na história na Universidade da Califórnia em Berkeley por Glenn Seaborg em 1940 e serviu de combustível para a bomba Fat Man?',
    options: [
      'Plutônio-239 (²³⁹Pu)',
      'Netúnio-237 (²³⁷Np)',
      'Amerício-241 (²⁴¹Am)',
      'Califórnio-252 (²⁵²Cf)'
    ],
    correctIndex: 0,
    explanation: 'O Plutônio-239 foi produzido bombardeando U-238 com dêuterons em cíclotron, seguido de decaimento beta duplo. Tem massa crítica significativamente menor que a do U-235 (~10 kg para esfera nua).',
    category: 'História & Descobertas'
  },
  {
    id: 17,
    question: 'Em que consiste o princípio "ALARA" adotado internacionalmente pelas normas de radioproteção?',
    options: [
      'As Low As Reasonably Achievable: manter exposições à radiação tão baixas quanto razoavelmente exequível.',
      'Atomic Level Radiation Assessment: medição atômica exclusiva de radiações em aceleradores.',
      'All Leaks Automatically Reduced: sistema mecânico automático contra vazamentos de gases nobres.',
      'Action Limit Against Radioactive Accidents: protocolo de evacuação obrigatória em 15 minutos.'
    ],
    correctIndex: 0,
    explanation: 'ALARA é o pilar fundamental da segurança radiológica: toda dose de radiação deve ser justificada e mantida no menor nível possível, combinando controle de tempo, aumento de distância e uso de blindagens.',
    category: 'Proteção Radiológica'
  },
  {
    id: 18,
    question: 'O que mede a unidade Sievert (Sv) no Sistema Internacional de Unidades?',
    options: [
      'A dose equivalente e efetiva de radiação, considerando o efeito biológico relativo e o dano aos tecidos humanos.',
      'A quantidade de núcleos que desintegram por segundo em uma amostra pura.',
      'A temperatura da água no circuito primário de um reator nuclear.',
      'A voltagem elétrica gerada em detectores proporcionais a gás.'
    ],
    correctIndex: 0,
    explanation: 'Diferente do Gray (Gy, que mede apenas energia absorvida em Joules/kg), o Sievert (Sv) multiplica a dose absorvida por fatores de ponderação da radiação (wR) e do tecido biológico (wT) para quantificar o risco estocástico de câncer e efeitos estocásticos.',
    category: 'Proteção Radiológica'
  },
  {
    id: 19,
    question: 'Qual teste nuclear norte-americano realizado em 1954 no Atol de Bikini produziu rendimento de 15 Megatons (mais que o dobro do previsto) devido à fissão inesperada do Lítio-7 com nêutrons rápidos?',
    options: [
      'Castle Bravo',
      'Trinity',
      'Ivy King',
      'Crossroads Baker'
    ],
    correctIndex: 0,
    explanation: 'Os projetistas acreditavam que o isótopo abundante Lítio-7 seria inerte; porém, sob nêutrons de alta energia ele sofreu reação inelástica gerando Trítio adicional e dobrou a potência, contaminando o atol e o barco pesqueiro Lucky Dragon 5.',
    category: 'Armamentos & História'
  },
  {
    id: 20,
    question: 'Qual é o maior projeto científico internacional de reator experimental de fusão nuclear em construção no mundo, localizado no sul da França?',
    options: [
      'ITER (International Thermonuclear Experimental Reactor)',
      'JET (Joint European Torus)',
      'CERN (European Organization for Nuclear Research)',
      'NIF (National Ignition Facility)'
    ],
    correctIndex: 0,
    explanation: 'O ITER é construído por um consórcio de 35 nações em Cadarache, França. Seu objetivo é comprovar a viabilidade científica da fusão com fator de ganho Q = 10 (gerando 500 MW térmicos a partir de 50 MW de aquecimento).',
    category: 'Fusão Nuclear'
  },
  {
    id: 21,
    question: 'Qual das seguintes partículas radioativas consiste em um elétron de alta energia e velocidade ejetado do núcleo atômico quando um nêutron se converte em próton?',
    options: [
      'Partícula Beta-Menos (β⁻)',
      'Partícula Alfa (α)',
      'Fóton Gama (γ)',
      'Pósitron (β⁺)'
    ],
    correctIndex: 0,
    explanation: 'No decaimento beta-menos, pela força fraca, um quark down converte-se em um quark up dentro do nêutron (n → p⁺ + e⁻ + ν̅e), ejetando um elétron energético e um antineutrino do elétron.',
    category: 'Física Fundamental'
  },
  {
    id: 22,
    question: 'Qual é o papel das barras de controle (feitas de boro, cádmio ou háfnio) no núcleo de um reator nuclear de fissão?',
    options: [
      'Absorver nêutrons térmicos sem sofrer fissão, regulando ou extinguindo a reação em cadeia.',
      'Fornecer combustível isotópico fresco durante a operação a plena carga.',
      'Refletir os nêutrons de volta para acelerar a geração de calor.',
      'Condensar o vapor d\'água radioativo em água líquida purificada.'
    ],
    correctIndex: 0,
    explanation: 'Elementos como Boro-10 e Cádmio-113 possuem seção de choque de absorção de nêutrons imensa. Ao serem inseridos no núcleo, capturam nêutrons livres e mantêm o reator estritamente crítico (k = 1) ou o submetem a subcriticidade (k < 1).',
    category: 'Reatores & Engenharia'
  },
  {
    id: 23,
    question: 'Quem liderou os experimentos científicos no Laboratório de Los Alamos como diretor técnico do Projeto Manhattan durante o desenvolvimento das primeiras bombas atômicas?',
    options: [
      'J. Robert Oppenheimer',
      'Richard Feynman',
      'Enrico Fermi',
      'Ernest Lawrence'
    ],
    correctIndex: 0,
    explanation: 'J. Robert Oppenheimer foi nomeado pelo general Leslie Groves para coordenar os maiores físicos teóricos e experimentais do mundo em Los Alamos, culminando no teste Trinity em 16 de julho de 1945.',
    category: 'História & Descobertas'
  },
  {
    id: 24,
    question: 'Qual é o tipo de radiação ionizante de maior frequência e penetração no espectro eletromagnético, exigindo grossas camadas de chumbo ou concreto denso para atenuação?',
    options: [
      'Radiação Gama (γ)',
      'Radiação Ultravioleta C (UVC)',
      'Radiação Infravermelha Térmica',
      'Micro-ondas de ressonância'
    ],
    correctIndex: 0,
    explanation: 'Os raios gama são fótons eletromagnéticos puros emitidos por núcleos excitados após decaimentos nucleares. Por não terem massa de repouso nem carga elétrica, interagem com a matéria principalmente por efeito fotoelétrico, espalhamento Compton e produção de pares.',
    category: 'Proteção Radiológica'
  },
  {
    id: 25,
    question: 'O que significa o fator de ganho de energia "Q" em pesquisas avançadas de reatores de fusão termonuclear?',
    options: [
      'A razão entre a potência de fusão liberada pelo plasma e a potência externa injetada para aquecê-lo (Q = P_fusão / P_injetada).',
      'O número de prótons divididos pelo número de nêutrons no núcleo de trítio.',
      'A quantidade de lítio consumida por hora no manto regenerador.',
      'A temperatura mínima em graus Kelvin para transformar gás em plasma.'
    ],
    correctIndex: 0,
    explanation: 'Q = 1 é o ponto de "breakeven científico" (onde a energia de fusão iguala a energia gasta no aquecimento). O ITER mira Q = 10 e usinas comerciais almejam Q > 25 para viabilidade econômica.',
    category: 'Fusão Nuclear'
  },
  {
    id: 26,
    question: 'Por que os reatores de fusão nuclear são considerados fisicamente imunes a acidentes de derretimento do núcleo em larga escala (meltdowns como Chernobyl)?',
    options: [
      'Porque há menos de 4 gramas de combustível na câmara a qualquer momento, e qualquer perda de vácuo ou controle resfria e apaga o plasma em milissegundos.',
      'Porque a reação de fusão não produz nenhuma forma de calor.',
      'Porque os campos magnéticos continuam funcionando sem energia elétrica para sempre.',
      'Porque os núcleos de deutério repelem a gravidade terrestre.'
    ],
    correctIndex: 0,
    explanation: 'A fusão exige condições estritas de temperatura, densidade e confinamento (Critério de Lawson). Qualquer anomalia, quebra de vácuo ou vazamento térmico dissipa o calor do plasma imediatamente, cessando a reação sem risco de embalamento.',
    category: 'Fusão Nuclear'
  },
  {
    id: 27,
    question: 'Qual foi o primeiro reator nuclear artificial construído na história, operado em dezembro de 1942 sob as arquibancadas da Universidade de Chicago?',
    options: [
      'Chicago Pile-1 (CP-1, liderado por Enrico Fermi)',
      'X-10 Graphite Reactor em Oak Ridge',
      'Reator B em Hanford',
      'Obninsk AM-1 na União Soviética'
    ],
    correctIndex: 0,
    explanation: 'Enrico Fermi e sua equipe montaram uma pilha de blocos de grafite puro intercalados com pastilhas de óxido de urânio e barras de cádmio, alcançando a primeira reação em cadeia autosustentada controlada da história humana.',
    category: 'História & Descobertas'
  },
  {
    id: 28,
    question: 'No tratamento do câncer de tireoide em medicina nuclear, qual radioisótopo é administrado ao paciente devido à sua afinidade natural por essa glândula?',
    options: [
      'Iodo-131 (¹³¹I)',
      'Tório-232 (²³²Th)',
      'Estrôncio-90 (⁹⁰Sr)',
      'Carbono-14 (¹⁴C)'
    ],
    correctIndex: 0,
    explanation: 'A tireoide utiliza iodo para produzir hormônios. Ao ingerir Iodo-131, a glândula absorve o elemento; o decaimento beta destrói as células cancerígenas e metástases locais de dentro para fora com alcance milimétrico.',
    category: 'Energia & Medicina'
  },
  {
    id: 29,
    question: 'Qual é o isótopo de hidrogênio cujo núcleo atômico é formado por exatamente 1 próton e 1 nêutron, abundante nas águas oceânicas?',
    options: [
      'Deutério (²H ou D)',
      'Prótio (¹H)',
      'Trítio (³H)',
      'Hidrogênio-4 (⁴H)'
    ],
    correctIndex: 0,
    explanation: 'O Deutério possui massa de aproximadamente 2 u (1 próton + 1 nêutron) e constitui cerca de 1 a cada 6.400 átomos de hidrogênio na Terra, fornecendo combustível de fusão praticamente inesgotável.',
    category: 'Física Fundamental'
  },
  {
    id: 30,
    question: 'O que são os geradores termelétricos de radioisótopos (RTGs) e qual sua principal utilização prática?',
    options: [
      'Dispositivos que convertem o calor do decaimento radioativo (como do Plutônio-238) em eletricidade por termopares em sondas espaciais profundas.',
      'Sistemas a vapor que abastecem turbinas de usinas nucleares flutuantes no Mar Ártico.',
      'Sensores de fumaça instalados no teto de edifícios residenciais modernos.',
      'Aceleradores lineares para produção industrial de chips de silício.'
    ],
    correctIndex: 0,
    explanation: 'Sondas como Voyager 1 e 2, New Horizons e os rovers marcianos Curiosity e Perseverance utilizam RTGs com Pu-238 para operar continuamente por décadas onde a luz solar é insuficiente.',
    category: 'Energia & Medicina'
  },
  {
    id: 31,
    question: 'Em física nuclear, o que representa a famosa equação de Einstein E = mc² nas reações de fissão e fusão?',
    options: [
      'A equivalência massa-energia: a massa total dos produtos finais é ligeiramente menor que a dos reagentes, e esse "defeito de massa" (Δm) é convertido em energia cinética e radiação.',
      'Que a velocidade da luz duplica após cada fissão nuclear em cadeia.',
      'A taxa de evaporação de água pesada sob radiação gama concentrada.',
      'O tempo de duração em segundos da onda de choque em um bombardeio.'
    ],
    correctIndex: 0,
    explanation: 'O defeito de massa multiplicado por c² (9 × 10¹⁶ m²/s²) quantifica a energia de ligação liberada por núcleon, explicando como frações de grama de matéria geram gigajoules de energia.',
    category: 'Física Fundamental'
  },
  {
    id: 32,
    question: 'Qual o papel fundamental da Agência Internacional de Energia Atômica (AIEA / IAEA), sediada em Viena?',
    options: [
      'Inspecionar instalações nucleares civis, promover o uso pacífico da energia atômica e verificar salvaguardas para impedir o desvio de material para armas nucleares.',
      'Financiar a construção e fabricação de armas atômicas para nações em desenvolvimento.',
      'Controlar o preço do barril de petróleo nos mercados financeiros mundiais.',
      'Gerenciar o armazenamento global exclusivo de todo o lixo atômico do planeta na Antártida.'
    ],
    correctIndex: 0,
    explanation: 'Fundada em 1957 sob o lema "Átomos pela Paz" e vinculada à ONU, a AIEA estabelece normas internacionais de segurança radiológica e realiza inspeções periódicas de enriquecimento e estoques de plutônio/urânio.',
    category: 'Tratados & Geopolítica'
  },
  {
    id: 33,
    question: 'Qual é a principal vantagem dos reatores de fusão do tipo "Stellarator" (como o Wendelstein 7-X na Alemanha) em relação aos Tokamaks convencionais?',
    options: [
      'Operam em estado estacionário contínuo (steady-state) 24 horas por dia sem corrente induzida no plasma, eliminando o risco de disrupções violentas.',
      'Não necessitam de bobinas magnéticas nem de vácuo para confinar o gás.',
      'Funcionam com água comum fria sem necessidade de aquecimento térmico.',
      'Custam menos de 10 mil dólares para serem montados em laboratórios escolares.'
    ],
    correctIndex: 0,
    explanation: 'O stellarator usa 70 bobinas torcidas tridimensionais complexas projetadas por supercomputadores para gerar o campo helicoidal sem depender da corrente no plasma, garantindo operação contínua e estável.',
    category: 'Fusão Nuclear'
  },
  {
    id: 34,
    question: 'Qual elemento químico é o produto final estável para o qual o Urânio-238 decai após uma longa série de emissões alfa e beta sucessivas?',
    options: [
      'Chumbo-206 (²⁰⁶Pb)',
      'Ouro-197 (¹⁹⁷Au)',
      'Ferro-56 (⁵⁶Fe)',
      'Bismuto-209 (²⁰⁹Bi)'
    ],
    correctIndex: 0,
    explanation: 'A cadeia de decaimento do U-238 (série do urânio) passa por Tório, Rádio e Polônio até atingir o isótopo duplamente mágico e estável Chumbo-206.',
    category: 'Física Fundamental'
  },
  {
    id: 35,
    question: 'Qual é o objetivo primordial do Tratado de Não-Proliferação de Armas Nucleares (TNP / NPT), assinado em 1968?',
    options: [
      'Prevenir a disseminação de armas nucleares, promover o desarmamento progressivo e assegurar o direito soberano ao desenvolvimento de energia nuclear para fins pacíficos.',
      'Proibir o funcionamento de usinas elétricas civis em todo o hemisfério sul.',
      'Obrigar todos os países a construir ogivas termonucleares de defesa em 10 anos.',
      'Criar um imposto global sobre o comércio internacional de carvão e petróleo.'
    ],
    correctIndex: 0,
    explanation: 'O TNP apoia-se em três pilares: não proliferação horizontal, desarmamento das potências nucleares e cooperação internacional incondicional no uso pacífico da energia atômica civil.',
    category: 'Tratados & Geopolítica'
  },
  {
    id: 36,
    question: 'Qual fenômeno óptico e físico emite um característico brilho azul-cobalto na água das piscinas de resfriamento de reatores nucleares ativos?',
    options: [
      'Radiação Cherenkov',
      'Efeito Fotoelétrico Quântico',
      'Fosforescência do deutério',
      'Refração de Rayleigh'
    ],
    correctIndex: 0,
    explanation: 'A radiação Cherenkov ocorre quando partículas carregadas (como elétrons beta de alta energia) viajam através de um meio dielétrico (água) com velocidade superior à velocidade da luz naquele meio específico (c/n).',
    category: 'Física Fundamental'
  },
  {
    id: 37,
    question: 'Qual método de enriquecimento isotópico do urânio é o mais amplamente empregado na indústria nuclear moderna devido à sua alta eficiência energética?',
    options: [
      'Centrifugação a Gás (usando o gás hexafluoreto de urânio, UF₆)',
      'Difusão Térmica por Gravidade em poços de petróleo',
      'Precipitação Química com mercúrio líquido',
      'Eletrólise de água mineral pesada'
    ],
    correctIndex: 0,
    explanation: 'Centrífugas de altíssima rotação aceleram UF₆ a dezenas de milhares de RPM. As moléculas mais pesadas contendo U-238 concentram-se na periferia, enquanto o U-235 mais leve concentra-se no eixo central com consumo energético 50 vezes menor que a difusão gasosa.',
    category: 'Reatores & Engenharia'
  },
  {
    id: 38,
    question: 'Por que o nêutron livre fora do núcleo atômico é uma partícula instável e qual é o seu tempo médio de vida?',
    options: [
      'Ele decai espontaneamente por força fraca em um próton, elétron e antineutrino em cerca de 14 a 15 minutos (tempo de vida médio de ~880 segundos).',
      'Ele implode instantaneamente em menos de um picosegundo transformando-se em luz pura.',
      'Ele é perfeitamente estável e vive indefinidamente no vácuo cósmico sem decair.',
      'Ele se divide em dois quarks tops após exatamente 24 horas.'
    ],
    correctIndex: 0,
    explanation: 'Como a massa do nêutron (939,57 MeV) é ligeiramente superior à soma das massas do próton e do elétron, o decaimento beta livre é energeticamente favorável, com meia-vida de ~611 segundos.',
    category: 'Física Fundamental'
  },
  {
    id: 39,
    question: 'Qual radioisótopo emissor gama com meia-vida de 6 horas é o carro-chefe da medicina diagnóstica, respondendo por mais de 80% de todos os procedimentos de imagem cintilográfica no mundo?',
    options: [
      'Tecnécio-99m (⁹⁹ᵐTc, obtido a partir de geradores de Molibdênio-99)',
      'Plutônio-240 (²⁴⁰Pu)',
      'Estrôncio-89 (⁸⁹Sr)',
      'Radônio-222 (²²²Rn)'
    ],
    correctIndex: 0,
    explanation: 'O isômero metaestável Tc-99m emite fótons gama puros de 140 keV (ideais para câmeras gama) sem emissão de partículas corpusculares pesadas, minimizando a dose desnecessária de radiação no paciente.',
    category: 'Energia & Medicina'
  },
  {
    id: 40,
    question: 'Qual inovação tecnológica viabilizou os tokamaks compactos de alto campo magnético como o reator SPARC (CFS / MIT)?',
    options: [
      'Fitas supercondutoras de alta temperatura (HTS) feitas de óxidos cerâmicos (REBCO) capazes de atingir mais de 20 Tesla.',
      'A eliminação das bobinas e o uso de ímãs de neodímio caseiros.',
      'O resfriamento dos ímãs com nitrogênio gasoso quente a 500 °C.',
      'O uso de recipientes feitos de madeira comprimida com chumbo.'
    ],
    correctIndex: 0,
    explanation: 'Supercondutores REBCO operam em campos magnéticos de até 20 Tesla. Como a pressão de plasma e a densidade de potência de fusão escalam com B⁴, dobrar o campo permite construir reatores 40 vezes menores em volume para a mesma potência.',
    category: 'Fusão Nuclear'
  },
  {
    id: 41,
    question: 'Em uma explosão nuclear atmosférica, o que causa o efeito conhecido como Pulso Eletromagnético (EMP)?',
    options: [
      'Raios gama e X de alta energia arrancam elétrons dos átomos de ar da alta atmosfera por espalhamento Compton, acelerando-os em correntes elétricas gigantescas desviadas pelo campo magnético da Terra.',
      'A onda de calor queima as linhas de transmissão mecânicas de cobre.',
      'O som supersônico da explosão rompe as antenas de rádio.',
      'A fuligem do cogumelo atômico atrai raios de tempestades meteorológicas.'
    ],
    correctIndex: 0,
    explanation: 'A componente rápida E1 do EMP atinge dezenas de quilovolts por metro em nanosegundos, induzindo sobretensões devastadoras em microchips, transformadores elétricos e equipamentos de telecomunicações.',
    category: 'Armamentos & História'
  },
  {
    id: 42,
    question: 'O que diferencia fundamentalmente um reator nuclear de água pressurizada (PWR) de um reator de água fervente (BWR)?',
    options: [
      'No PWR, a água do reator é mantida sob altíssima pressão (~155 bar) e não ferve, transferindo calor a um circuito secundário; no BWR, a água ferve diretamente no vaso do reator para girar a turbina.',
      'O PWR utiliza gás hélio como refrigerante e o BWR utiliza sódio metálico líquido.',
      'O PWR só funciona com fusão e o BWR só opera com fissão de tório.',
      'O PWR gera eletricidade sem uso de turbinas ou geradores mecânicos.'
    ],
    correctIndex: 0,
    explanation: 'O PWR isola o circuito primário radioativo do circuito secundário através de geradores de vapor, enquanto o BWR gera vapor diretamente no núcleo, exigindo blindagem também na turbina.',
    category: 'Reatores & Engenharia'
  },
  {
    id: 43,
    question: 'Qual isótopo radioativo é o principal responsável pela maior parte da dose de radiação natural de fundo que os seres humanos inalam no ar em residências e ambientes fechados?',
    options: [
      'Radônio-222 (²²²Rn, gás nobre gerado pelo decaimento do Rádio no solo)',
      'Criptônio-85 (⁸⁵Kr)',
      'Argônio-40 (⁴⁰Ar)',
      'Xenônio-135 (¹³⁵Xe)'
    ],
    correctIndex: 0,
    explanation: 'O gás Radônio-222 infiltra-se a partir de rochas graníticas e solos ricos em urânio. Ao ser inalado, seus produtos de decaimento alfa de meia-vida curta depositam-se no tecido pulmonar.',
    category: 'Proteção Radiológica'
  },
  {
    id: 44,
    question: 'Em que data histórica os Estados Unidos detonaram o teste Trinity, a primeira explosão atômica artificial da história, no deserto de Alamogordo no Novo México?',
    options: [
      '16 de julho de 1945',
      '6 de agosto de 1945',
      '7 de dezembro de 1941',
      '1 de novembro de 1952'
    ],
    correctIndex: 0,
    explanation: 'O dispositivo de plutônio por implosão Gadget foi erguido em uma torre de aço e detonado às 05h29 de 16 de julho de 1945, liberando energia equivalente a 21 quilotons de TNT.',
    category: 'História & Descobertas'
  },
  {
    id: 45,
    question: 'Por que o Boro-10 é frequentemente injetado na água de resfriamento ou usado nas barras de emergência dos reatores nucleares de fissão?',
    options: [
      'Possui uma enorme capacidade (seção de choque) de capturar nêutrons térmicos sem emitir radiação gama excessiva, funcionando como veneno nuclear de controle.',
      'Aumenta o ponto de fusão do urânio em mais de 3.000 °C.',
      'Transforma água leve em combustível físsil enriquecido.',
      'Acelera a velocidade dos nêutrons para mantê-los supersônicos.'
    ],
    correctIndex: 0,
    explanation: 'A reação ¹⁰B + n → ⁷Li + α possui uma seção de choque térmica de 3.840 barns, tornando o boro solúvel (ácido bórico) excelente para controlar a reatividade química do circuito primário de reatores PWR.',
    category: 'Reatores & Engenharia'
  },
  {
    id: 46,
    question: 'Qual é o conceito de reator nuclear de quarta geração conhecido como "SMR" (Small Modular Reactor)?',
    options: [
      'Reatores compactos de até 300 MWe fabricados em série em fábricas industriais, transportáveis por módulos e com sistemas de segurança passiva intrínseca.',
      'Reatores portáteis do tamanho de baterias de smartphone para uso pessoal.',
      'Submarinos militares equipados com canhões de plasma espacial.',
      'Reatores que funcionam sem nenhum combustível mineral ou sintético.'
    ],
    correctIndex: 0,
    explanation: 'SMRs reduzem custos de capital e prazos de obra através de fabricação padronizada modular e utilizam circulação natural para resfriamento passivo sem necessidade de bombas elétricas externas de emergência.',
    category: 'Reatores & Engenharia'
  },
  {
    id: 47,
    question: 'No processo de fusão de Deutério e Trítio, como o Trítio (que possui meia-vida de apenas 12,3 anos e é escasso na natureza) é obtido de forma sustentável para abastecer as futuras usinas?',
    options: [
      'Pela reação de "breeding" (reprodução) dos nêutrons rápidos de fusão com um manto cerâmico ou líquido de Lítio que reveste o reator (⁶Li + n → ⁴He + ³H).',
      'Pela mineração de meteoritos e poeira espacial que caem na atmosfera.',
      'Pela separação mecânica direta do ar atmosférico das cidades.',
      'Pela queima de gás natural em usinas térmicas fósseis.'
    ],
    correctIndex: 0,
    explanation: 'Como a Terra não possui depósitos minerais naturais de trítio, os reatores de fusão foram projetados para serem autossustentáveis: cada nêutron de fusão bate no manto de lítio e gera um novo átomo de trítio para o ciclo.',
    category: 'Fusão Nuclear'
  },
  {
    id: 48,
    question: 'Qual é o princípio de datação arqueológica por Carbono-14 (desenvolvido por Willard Libby em 1949)?',
    options: [
      'Seres vivos absorvem ¹⁴C da atmosfera enquanto vivos; após a morte, a ingestão cessa e o ¹⁴C decai em ¹⁴N com meia-vida de 5.730 anos, permitindo calcular a idade de fósseis orgânicos.',
      'O Carbono-14 transforma ossos em diamante sintético com o passar dos séculos.',
      'Mede a quantidade de chumbo acumulada no sangue dos seres vivos.',
      'Avalia a cor da rocha após exposição contínua a raios solares ultravioleta.'
    ],
    correctIndex: 0,
    explanation: 'Raios cósmicos produzem ¹⁴C no ar a uma taxa constante. Medindo a razão remanescente entre ¹⁴C e ¹²C em madeiras, ossos ou tecidos antigos, é possível datar vestígios orgânicos de até ~50.000 anos.',
    category: 'História & Descobertas'
  },
  {
    id: 49,
    question: 'Qual teste nuclear conduzido pelos Estados Unidos em 1952 (Operação Ivy) utilizou pela primeira vez combustível de Deutério líquido criogênico e comprovou o conceito termonuclear Teller-Ulam com 10,4 Megatons?',
    options: [
      'Ivy Mike',
      'Ivy King',
      'Fat Man',
      'Able Bikini'
    ],
    correctIndex: 0,
    explanation: 'Ivy Mike utilizou um dispositivo criogênico de 82 toneladas chamado Sausage no Atol de Enewetak, vaporizando completamente a ilha de Elugelab e confirmando a viabilidade de armas termonucleares de fusão em escala de Megatons.',
    category: 'Armamentos & História'
  },
  {
    id: 50,
    question: 'Por que o ferro (especialmente o isótopo Ferro-56 e Níquel-62) possui a maior energia de ligação por núcleon da tabela periódica?',
    options: [
      'Porque é o ápice da estabilidade nuclear: elementos mais leves liberam energia ao se fundirem até o ferro, enquanto elementos mais pesados liberam energia ao sofrerem fissão.',
      'Porque o ferro não possui nenhum próton em sua eletrosfera atômica.',
      'Porque o ferro explode espontaneamente quando colocado na água quente.',
      'Porque os núcleos de ferro absorvem todo o campo gravitacional do espaço sideral.'
    ],
    correctIndex: 0,
    explanation: 'Na curva de energia de ligação por núcleon (~8,8 MeV/núcleon no Fe-56), o ferro atinge o ponto de equilíbrio ótimo entre a força nuclear forte atrativa de curto alcance e a repulsão eletrostática cumulativa de Coulomb de longo alcance. Por isso, a fusão além do ferro em estrelas consome energia em vez de liberá-la, levando ao colapso estelar em supernovas.',
    category: 'Física Fundamental'
  }
];
