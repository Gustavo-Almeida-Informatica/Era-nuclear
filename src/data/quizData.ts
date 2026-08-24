import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual é a principal diferença conceitual entre fissão nuclear e fusão nuclear?',
    options: [
      'A fissão divide núcleos pesados em menores; a fusão une núcleos leves em um mais pesado.',
      'A fissão só ocorre no Sol; a fusão só ocorre em usinas de energia terrestres.',
      'A fissão consome energia; a fusão não libera partículas.',
      'A fissão transforma elétrons em prótons; a fusão altera apenas nêutrons.'
    ],
    correctIndex: 0,
    explanation: 'A fissão é a divisão de um núcleo atômico pesado (como o Urânio-235) ao capturar um nêutron, enquanto a fusão é a união de dois núcleos leves (como Deutério e Trítio) sob temperaturas extremas, liberando energia pelo defeito de massa.',
    category: 'Física Fundamental'
  },
  {
    id: 2,
    question: 'Que partícula subatômica foi descoberta por James Chadwick em 1932 e é indispensável para iniciar e manter reações de fissão em cadeia?',
    options: [
      'Pósitron',
      'Nêutron',
      'Elétron',
      'Quark'
    ],
    correctIndex: 1,
    explanation: 'O nêutron não possui carga elétrica, o que permite que ele penetre no núcleo atômico sem ser repelido pela barreira eletrostática positiva dos prótons.',
    category: 'História & Descobertas'
  },
  {
    id: 3,
    question: 'Qual material é capaz de bloquear completamente partículas Alfa (α)?',
    options: [
      'Vários metros de concreto armado denso.',
      'Uma placa de chumbo de 10 centímetros.',
      'Uma simples folha de papel ou a camada externa morta da pele humana.',
      'Somente água pesada enriquecida.'
    ],
    correctIndex: 2,
    explanation: 'As partículas alfa são núcleos de hélio pesados e com carga +2e, possuindo altíssimo poder de ionização, mas baixíssimo alcance físico e poder de penetração.',
    category: 'Proteção Radiológica'
  },
  {
    id: 4,
    question: 'O que o conceito físico Teller-Ulam introduziu no desenvolvimento das armas nucleares?',
    options: [
      'A criação do primeiro detector Geiger de mão.',
      'O método de enriquecimento de urânio por difusão gasosa.',
      'O design termonuclear de dois estágios, usando a fissão primária para comprimir e detonar o secundário de fusão.',
      'O protocolo de inspeção da AIEA em reatores nucleares.'
    ],
    correctIndex: 2,
    explanation: 'Stanislaw Ulam e Edward Teller conceberam a utilização dos raios X e da radiação de um primário de fissão para comprimir o secundário de fusão antes de sua expansão, permitindo rendimentos na escala de Megatons.',
    category: 'Armamentos & História'
  },
  {
    id: 5,
    question: 'O que é a hipótese do "Inverno Nuclear" formulada por cientistas atmosféricos?',
    options: [
      'A formação de geleiras artificiais através do uso de reatores nucleares nos polos.',
      'O resfriamento global provocado pela fuligem de tempestades de fogo urbanas que ascende à estratosfera e bloqueia a luz solar.',
      'O congelamento instantâneo do núcleo de um reator nuclear durante a perda de refrigerante.',
      'A queda repentina de temperatura durante a detonação subterrânea de testes atômicos.'
    ],
    correctIndex: 1,
    explanation: 'Tempestades de fogo generalizadas ejetariam milhões de toneladas de carbono negro na alta atmosfera, reduzindo drasticamente a radiação solar na superfície da Terra e prejudicando as colheitas agrícolas mundiais.',
    category: 'Impactos Planetários'
  },
  {
    id: 6,
    question: 'Qual das seguintes é uma aplicação pacífica da tecnologia nuclear na medicina contemporânea?',
    options: [
      'Enriquecimento em massa de lítio para baterias.',
      'Uso de radiofármacos como o Flúor-18 no exame PET-Scan para diagnóstico oncológico.',
      'Substituição de vacinas tradicionais por irradiação de corpo inteiro.',
      'Geração de oxigênio líquido em hospitais através de moderadores de grafite.'
    ],
    correctIndex: 1,
    explanation: 'A medicina nuclear utiliza radioisótopos emissores de radiação para diagnosticar precocemente tumores, doenças cardíacas e tratar condições na tireoide de forma direcionada.',
    category: 'Energia & Medicina'
  }
];
