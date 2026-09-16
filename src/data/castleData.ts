import { CastleTest } from '../types';
import castleBravoImg from '../assets/images/castle_bravo_005.jpg';
import castleRomeoImg from '../assets/images/castle_romeo.jpg';
import castleKoonImg from '../assets/images/castle_koon_blast_1787677556674.jpg';
import castleUnionImg from '../assets/images/castle_union_user_1789412099166.jpg';
import castleYankeeImg from '../assets/images/castle_yankee_user_attached.jpg';
import castleNectarImg from '../assets/images/castle_nectar_blast_1787677582310.jpg';

export const castleTests: CastleTest[] = [
  {
    id: 'castle-bravo',
    name: 'Castle Bravo',
    date: '1 de março de 1954 (06:45 hora local)',
    location: 'Recife artificial na ilha de Namu, Atol de Bikini',
    deviceType: 'Dispositivo termonuclear de combustível sólido ("Shrimp" / TX-21)',
    yieldReported: '15,0 Megatons (15.000 kt)',
    predictedYield: '5,0 a 6,0 Megatons',
    historicalObjective: 'Validar o primeiro teste de arma termonuclear prática utilizando deutereto de lítio seco em vez de deutério líquido criogênico.',
    resultAndImpact: 'A reação não calculada do isótopo Lítio-7 com nêutrons rápidos produziu o dobro do trítio esperado, gerando uma explosão de 15 Mt (2,5 vezes acima da previsão). A cratera submarina aberta na lagoa de Bikini teve 2 km de diâmetro e 76 metros de profundidade. A nuvem de poeira e cinzas radioativas espalhou-se por mais de 18.000 km², contaminando gravemente os habitantes dos atóis de Rongelap, Ailinginae e Utirik, além dos 23 tripulantes do pesqueiro japonês Daigo Fukuryū Maru (Lucky Dragon No. 5).',
    historicalImportance: 'O maior teste nuclear da história dos Estados Unidos. Despertou o clamor mundial contra testes atmosféricos, catalisando o surgimento da comunidade científica pela paz e desarmamento (Manifesto Russell-Einstein e Conferências Pugwash).',
    imageUrl: castleBravoImg,
    imageCaption: 'Bola de fogo monumental de 7 km de diâmetro gerada pelo teste Castle Bravo.',
    source: 'U.S. Department of Energy / Defense Nuclear Agency Report DNA 6035F',
    license: 'Domínio Público (Governo Federal dos EUA)'
  },
  {
    id: 'castle-romeo',
    name: 'Castle Romeo',
    date: '27 de março de 1954',
    location: 'Barcaça ancorada na cratera de Bravo, Lagoa de Bikini',
    deviceType: 'Dispositivo termonuclear de combustível sólido ("Runt" / TX-17)',
    yieldReported: '11,0 Megatons (11.000 kt)',
    predictedYield: '4,0 Megatons',
    historicalObjective: 'Testar um projeto alternativo de deutereto de lítio natural econômico (sem enriquecimento de Li-6).',
    resultAndImpact: 'Assim como em Bravo, a participação do Lítio-7 aumentou drasticamente o rendimento, atingindo 11 Mt (quase o triplo do previsto). Foi o primeiro teste nuclear da história a ser disparado sobre uma barcaça marítima ancorada, técnica adotada para evitar a destruição de mais ilhas do atol.',
    historicalImportance: 'Provou que o lítio natural não enriquecido podia ser usado como combustível termonuclear em larga escala com custo muito menor.',
    imageUrl: castleRomeoImg,
    imageCaption: 'A icônica nuvem em cogumelo do teste termonuclear Romeo disparado em barcaça.',
    source: 'U.S. Department of Energy / Joint Task Force Seven',
    license: 'Domínio Público (Governo Federal dos EUA)'
  },
  {
    id: 'castle-koon',
    name: 'Castle Koon',
    date: '7 de abril de 1954',
    location: 'Ilha de Eninman, Atol de Bikini',
    deviceType: 'Dispositivo experimental ("Morgenstern" / UCRL)',
    yieldReported: '110 quilotons (0,11 Mt)',
    predictedYield: '1,5 Megatons',
    historicalObjective: 'Testar um conceito inovador de termonuclear desenvolvido pelo recém-criado Laboratório de Radiação da Universidade da Califórnia (atual Lawrence Livermore).',
    resultAndImpact: 'O teste sofreu um desmonte térmico prematuro da primária antes que a implosão por radiação pudesse comprimir e inflamar adequadamente o secundário termonuclear. O teste rendeu apenas 110 kt (um fracasso parcial relativo à previsão).',
    historicalImportance: 'Forneceu dados físicos cruciais sobre a simetria de implosão e a geometria de radiação para o laboratório Livermore aperfeiçoar seus futuros projetos de ogivas.',
    imageUrl: castleKoonImg,
    imageCaption: 'Detonação do dispositivo experimental Koon na ilha de Eninman em Bikini.',
    source: 'Lawrence Livermore National Laboratory / U.S. Department of Energy',
    license: 'Domínio Público (Governo Federal dos EUA)'
  },
  {
    id: 'castle-union',
    name: 'Castle Union',
    date: '26 de abril de 1954',
    location: 'Barcaça ancorada no canal de Enyu, Lagoa de Bikini',
    deviceType: 'Dispositivo termonuclear de lítio purificado ("Alarm Clock" / TX-14)',
    yieldReported: '6,9 Megatons (6.900 kt)',
    predictedYield: '3,0 a 4,0 Megatons',
    historicalObjective: 'Validar o comportamento de deutereto de lítio enriquecido com alto teor de Lítio-6 sob configuração compacta.',
    resultAndImpact: 'Rendimento excelente de 6,9 Mt disparado com sucesso a partir de barcaça.',
    historicalImportance: 'Validou a família de ogivas termonucleares Mark 14, uma das primeiras bombas termonucleares a entrar em prontidão estratégica no Comando Aéreo Estratégico (SAC).',
    imageUrl: castleUnionImg,
    imageCaption: 'Disparo termonuclear de Castle Union sobre barcaça no canal de Enyu.',
    source: 'U.S. Department of Energy / Los Alamos National Laboratory',
    license: 'Domínio Público (Governo Federal dos EUA)'
  },
  {
    id: 'castle-yankee',
    name: 'Castle Yankee',
    date: '5 de maio de 1954',
    location: 'Barcaça ancorada na cratera de Union, Atol de Bikini',
    deviceType: 'Dispositivo termonuclear avançado ("Jughead" / TX-16/TX-24)',
    yieldReported: '13,5 Megatons (13.500 kt)',
    predictedYield: '6,0 a 10,0 Megatons',
    historicalObjective: 'Testar um protótipo de alta potência usando deutereto de lítio enriquecido a 40% em Li-6.',
    resultAndImpact: 'Segunda maior detonação nuclear da história dos Estados Unidos (13,5 Megatons). O topo da nuvem alcançou mais de 40 km de altitude em menos de 10 minutos.',
    historicalImportance: 'Consolidou o design da bomba termonuclear pesada Mark 24, colocada em serviço ativo em 1954 como resposta rápida de dissuasão estratégica.',
    imageUrl: castleYankeeImg,
    imageCaption: 'Nuvem convectiva estratosférica de 13,5 Megatons do teste Yankee.',
    source: 'U.S. Department of Energy / National Nuclear Security Administration',
    license: 'Domínio Público (Governo Federal dos EUA)'
  },
  {
    id: 'castle-nectar',
    name: 'Castle Nectar',
    date: '14 de maio de 1954',
    location: 'Barcaça ancorada na cratera de Ivy Mike, Atol de Enewetak',
    deviceType: 'Dispositivo termonuclear leve ("Zombie" / TX-15)',
    yieldReported: '1,69 Megaton (1.690 kt)',
    predictedYield: '1,0 a 1,8 Megaton',
    historicalObjective: 'Testar uma ogiva termonuclear miniaturizada e leve para ser transportada por bombardeiros menores e mísseis balísticos intercontinentais iniciais.',
    resultAndImpact: 'Encerrou a Operação Castle com sucesso total de 1,69 Mt. Atingiu perfeitamente a faixa de rendimento projetada com peso e dimensões reduzidas.',
    historicalImportance: 'Deu origem à ogiva termonuclear leve W-15 e à bomba B-15, viabilizando a integração de armas termonucleares em mísseis balísticos.',
    imageUrl: castleNectarImg,
    imageCaption: 'Detonação final da Operação Castle na lagoa do Atol de Enewetak.',
    source: 'U.S. Department of Energy / Defense Threat Reduction Agency',
    license: 'Domínio Público (Governo Federal dos EUA)'
  }
];
