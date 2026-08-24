import { GlossaryTerm } from '../types';

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'atomo',
    term: 'Átomo',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'A unidade básica da matéria, formada por um núcleo central rodeado por uma nuvem de elétrons.',
    extendedDefinition: 'O átomo é composto por prótons e nêutrons concentrados em um núcleo central minúsculo e extremamente denso, e por elétrons orbitando em níveis de energia quânticos ao redor desse núcleo.',
    relatedTerms: ['Núcleo', 'Próton', 'Nêutron', 'Elétron']
  },
  {
    id: 'nucleo',
    term: 'Núcleo Atômico',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'A região central minúscula e hiperdensa do átomo onde residem os prótons e nêutrons.',
    extendedDefinition: 'Descoberto por Ernest Rutherford em 1911, o núcleo concentra mais de 99,9% da massa total do átomo, mantido coeso pela Força Nuclear Forte.',
    relatedTerms: ['Átomo', 'Força Nuclear Forte', 'Próton']
  },
  {
    id: 'proton',
    term: 'Próton',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Partícula subatômica com carga elétrica positiva (+1e) presente no núcleo de todos os átomos.',
    extendedDefinition: 'O número de prótons em um núcleo (Número Atômico Z) define a identidade química do elemento na Tabela Periódica (ex: 1 próton = Hidrogênio, 92 prótons = Urânio).',
    relatedTerms: ['Nêutron', 'Número Atômico']
  },
  {
    id: 'neutron',
    term: 'Nêutron',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Partícula subatômica sem carga elétrica (neutra) que atua estabilizando o núcleo atômico.',
    extendedDefinition: 'Descoberto por James Chadwick em 1932, o nêutron possui massa ligeiramente superior à do próton e é a partícula ideal para induzir fissão nuclear.',
    relatedTerms: ['Fissão', 'Isótopo', 'Moderação de Nêutrons']
  },
  {
    id: 'eletron',
    term: 'Elétron',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Partícula elementar com carga elétrica negativa (-1e) que orbita o núcleo em camadas eletrônicas.',
    extendedDefinition: 'Os elétrons governam as reações químicas e as ligações moleculares, enquanto as reações nucleares ocorrem estritamente no interior do núcleo.',
    relatedTerms: ['Átomo', 'Ionização']
  },
  {
    id: 'isotopo',
    term: 'Isótopo',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Átomos que possuem o mesmo número de prótons mas números diferentes de nêutrons.',
    extendedDefinition: 'Exemplo clássico: o Urânio-235 (92 prótons, 143 nêutrons) é físsil, enquanto o Urânio-238 (92 prótons, 146 nêutrons) é fértil mas não sofre fissão fácil com nêutrons térmicos.',
    relatedTerms: ['Urânio', 'Enriquecimento', 'Massa Atômica']
  },
  {
    id: 'radioatividade',
    term: 'Radioatividade',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Fenômeno espontâneo pelo qual núcleos atômicos instáveis emitem partículas ou radiação eletromagnética.',
    extendedDefinition: 'Processo natural de transformação nuclear descoberto por Becquerel e formalizado pelos Curie, dividindo-se em emissões Alfa, Beta e Gama.',
    relatedTerms: ['Decaimento', 'Meia-vida', 'Radiação']
  },
  {
    id: 'radiacao-ionizante',
    term: 'Radiação Ionizante',
    category: 'efeitos',
    categoryLabel: 'Efeitos & Biologia',
    shortDefinition: 'Radiação com energia suficiente para remover elétrons de átomos e moléculas, criando íons.',
    extendedDefinition: 'Capaz de romper ligações químicas em células vivas e alterar o código genético do DNA, exigindo blindagem e limites de dose de segurança.',
    relatedTerms: ['Alfa', 'Beta', 'Gama', 'Sievert']
  },
  {
    id: 'fissao',
    term: 'Fissão Nuclear',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'A quebra de um núcleo pesado em fragmentos menores com liberação massiva de energia.',
    extendedDefinition: 'Descoberta em 1938 por Hahn, Strassmann, Meitner e Frisch. É a reação física que alimenta reatores nucleares civis e armas de fissão atômicas.',
    relatedTerms: ['Reação em Cadeia', 'Massa Crítica', 'Urânio-235']
  },
  {
    id: 'fusao',
    term: 'Fusão Nuclear',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'A união de dois núcleos atômicos leves para criar um núcleo mais pesado e liberar energia.',
    extendedDefinition: 'Processo que gera a energia do Sol e de todas as estrelas (ciclo D-T ou próton-próton) e que está sendo pesquisado na Terra para reatores comerciais limpos.',
    relatedTerms: ['Deutério', 'Trítio', 'Plasma', 'Tokamak']
  },
  {
    id: 'reacao-em-cadeia',
    term: 'Reação em Cadeia',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'Sequência contínua de reações de fissão onde os nêutrons liberados provocam novas fissões.',
    extendedDefinition: 'Em uma usina civil, a reação em cadeia é mantida exatamente crítica (k=1) por barras de controle absorvedoras; em uma bomba atômica, ela é supercrítica descontrolada.',
    relatedTerms: ['Massa Crítica', 'Barras de Controle', 'Fator de Multiplicação']
  },
  {
    id: 'meia-vida',
    term: 'Meia-Vida (T½)',
    category: 'fundamentos',
    categoryLabel: 'Física Fundamental',
    shortDefinition: 'O tempo necessário para que a metade dos núcleos radioativos de uma amostra sofra decaimento.',
    extendedDefinition: 'Varia de frações de microssegundo para isótopos altamente instáveis até bilhões de anos (ex: U-238 tem meia-vida de 4,46 bilhões de anos).',
    relatedTerms: ['Decaimento', 'Becquerel', 'Isótopo']
  },
  {
    id: 'uranio',
    term: 'Urânio (U)',
    category: 'energia',
    categoryLabel: 'Combustível Nuclear',
    shortDefinition: 'Elemento químico metálico pesado (Z=92) que constitui o principal combustível da fissão nuclear.',
    extendedDefinition: 'Encontrado na crosta terrestre em minérios como a pechblenda. Composto predominantemente por U-238 (99,3%) e U-235 (0,7%).',
    relatedTerms: ['Enriquecimento', 'Plutônio', 'Fissão']
  },
  {
    id: 'plutonio',
    term: 'Plutônio (Pu)',
    category: 'energia',
    categoryLabel: 'Combustível Nuclear',
    shortDefinition: 'Elemento transurânico sintético (Z=94) produzido em reatores nucleares pela captura de nêutrons no U-238.',
    extendedDefinition: 'O isótopo Plutônio-239 é físsil e é empregado tanto em armas nucleares do tipo implosão quanto em combustíveis nucleares mistos (MOX) para geração elétrica.',
    relatedTerms: ['Reprocessamento', 'Urânio-238', 'Fissão']
  },
  {
    id: 'reator-nuclear',
    term: 'Reator Nuclear',
    category: 'energia',
    categoryLabel: 'Energia Nuclear',
    shortDefinition: 'Instalação de engenharia onde reações nucleares em cadeia de fissão são iniciadas, controladas e sustentadas.',
    extendedDefinition: 'Composto por núcleo (combustível nuclear), moderador de nêutrons, fluido refrigerante, barras de controle e espessa blindagem biológica e de contenção.',
    relatedTerms: ['PWR', 'BWR', 'Barras de Controle', 'Contenção']
  },
  {
    id: 'energia-nuclear',
    term: 'Energia Nuclear',
    category: 'energia',
    categoryLabel: 'Energia Nuclear',
    shortDefinition: 'Energia liberada pela modificação da estrutura do núcleo atômico (seja por fissão ou fusão).',
    extendedDefinition: 'Apresenta a maior densidade energética de qualquer fonte conhecida pelo ser humano, sendo aproveitada na geração elétrica civil e propulsão naval.',
    relatedTerms: ['Fissão', 'Fusão', 'Reator Nuclear']
  },
  {
    id: 'ogiva-nuclear',
    term: 'Ogiva Nuclear',
    category: 'armamentos',
    categoryLabel: 'Defesa & Estratégia',
    shortDefinition: 'Dispositivo militar montado na ponta de um vetor de lançamento contendo a carga explosiva nuclear.',
    extendedDefinition: 'Projetada para resistir às condições extremas de vibração, aceleração e reentrada atmosférica hipersônica até atingir o alvo pré-programado.',
    relatedTerms: ['ICBM', 'MIRV', 'Arma Termonuclear']
  },
  {
    id: 'arma-termonuclear',
    term: 'Arma Termonuclear',
    category: 'armamentos',
    categoryLabel: 'Defesa & Estratégia',
    shortDefinition: 'Arma que utiliza a fusão de isótopos de hidrogênio detonada por um primário de fissão.',
    extendedDefinition: 'Também chamada de Bomba H, opera pelo princípio Teller-Ulam e é capaz de atingir rendimentos na escala de centenas de kilotons a megatons.',
    relatedTerms: ['Fusão', 'Teller-Ulam', 'Ivy Mike']
  },
  {
    id: 'fallout',
    term: 'Fallout (Precipitação Radioativa)',
    category: 'efeitos',
    categoryLabel: 'Efeitos Ambientais',
    shortDefinition: 'Partículas de poeira e cinzas contaminadas com produtos de fissão que precipitam da atmosfera.',
    extendedDefinition: 'Gerado especialmente em explosões próximas ao solo, espalha radioisótopos como Césio-137, Estrôncio-90 e Iodo-131 em favor do vento ao longo de centenas de quilômetros.',
    relatedTerms: ['Contaminação', 'Castle Bravo', 'Césio-137']
  },
  {
    id: 'inverno-nuclear',
    term: 'Inverno Nuclear',
    category: 'efeitos',
    categoryLabel: 'Clima & Modelos',
    shortDefinition: 'Modelo climático que prevê resfriamento global catastrófico devido à fuligem de incêndios nucleares.',
    extendedDefinition: 'Teoria científica demonstrando que fumaça e fuligem injetadas na estratosfera bloqueariam a luz solar, provocando colapso na agricultura e queda generalizada de temperatura.',
    relatedTerms: ['Impactos Climáticos', 'Fuligem', 'Camada de Ozônio']
  },
  {
    id: 'nao-proliferacao',
    term: 'Não Proliferação',
    category: 'diplomacia',
    categoryLabel: 'Tratados & Diplomacia',
    shortDefinition: 'Princípio e regime internacional destinado a impedir a disseminação de armas nucleares.',
    extendedDefinition: 'Consagrado no TNP de 1968 e monitorado pela AIEA por meio de inspeções internacionais de salvaguardas em instalações atômicas de todo o planeta.',
    relatedTerms: ['TNP', 'AIEA', 'Salvaguardas']
  },
  {
    id: 'desarmamento-nuclear',
    term: 'Desarmamento Nuclear',
    category: 'diplomacia',
    categoryLabel: 'Tratados & Diplomacia',
    shortDefinition: 'O processo formal e negociado de redução e eliminação completa de arsenais nucleares.',
    extendedDefinition: 'Meta fundamental das Nações Unidas e do Tratado sobre a Proibição de Armas Nucleares (TPNW), visando um mundo permanentemente livre da ameaça atômica.',
    relatedTerms: ['TPNW', 'START', 'Desescalada']
  }
];
