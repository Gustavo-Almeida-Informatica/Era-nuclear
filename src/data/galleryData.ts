import { GalleryItem } from '../types';
import tsarBombaImg from '../assets/images/tsar_bomba_documentary_real.jpg';
import castleBravoImg from '../assets/images/castle_bravo_005.jpg';
import castleRomeoImg from '../assets/images/castle_romeo.jpg';
import trinityImg from '../assets/images/trinity_test_blast_1787676677780.jpg';
import chernobylImg from '../assets/images/chernobyl_ruins_1787676689764.jpg';
import ivyKingImg from '../assets/images/ivy_king_001.jpg';
import ivyMikeImg from '../assets/images/ivy_mike_blast_1787763915443.jpg';
import hiroshimaDomeImg from '../assets/images/hiroshima_genbaku_dome_1787677431649.jpg';
import hiroshimaExplosionImg from '../assets/images/hiroshima_explosion.jpg';
import nagasakiMemorialImg from '../assets/images/nagasaki_peace_memorial_1787677448589.jpg';
import nagasakiExplosionImg from '../assets/images/nagasaki_explosion.jpg';
import rds1Img from '../assets/images/rds_1_soviet_test.jpg';
import rds6sImg from '../assets/images/rds_6s_soviet_test.jpg';
import rds37Img from '../assets/images/rds_37_thermonuclear.jpg';
import b41Img from '../assets/images/b41_real_usaf_museum.jpg';
import b41MuseumDocImg from '../assets/images/b41_real_usaf_museum.jpg';
import chicagoPile1Img from '../assets/images/chicago_pile_one_1787677642726.jpg';
import iterTokamakImg from '../assets/images/iter_tokamak_fusion_1787677659756.jpg';
import fissionDiagramImg from '../assets/images/fission_diagram_sci_1787677675023.jpg';
import fusionDiagramImg from '../assets/images/fusion_diagram_sci_1787677708566.jpg';
import gunTypeDiagramImg from '../assets/images/gun_type_fission_diagram_new.gif';
import implosionTypeDiagramImg from '../assets/images/implosion_type_fission_diagram_1787680148801.jpg';
import tellerUlamDiagramImg from '../assets/images/BombH_explosion.svg';

export const galleryItems: GalleryItem[] = [
  {
    id: 'trinity-1945',
    title: 'Teste Trinity — A Primeira Detonação Nuclear da História',
    date: '16 de julho de 1945',
    year: '1945',
    location: 'Campo de Provas de White Sands, Jornada del Muerto, Novo México (EUA)',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'A bola de fogo da primeira detonação nuclear da história humana, 0,016 segundo após a ignição do dispositivo de plutônio por implosão codinome "The Gadget", liberando aproximadamente 21 quilotons de TNT.',
    historicalContext: 'Conduzido sob o comando do físico J. Robert Oppenheimer e do general Leslie Groves no âmbito do Projeto Manhattan, Trinity provou experimentalmente a viabilidade da liberação em massa da energia nuclear.',
    source: 'U.S. Department of Energy / Los Alamos National Laboratory',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: trinityImg,
    tag: 'Marco Zero'
  },
  {
    id: 'hiroshima-explosion-1945',
    title: 'Bombardeio de Hiroshima — A Nuvem Atômica da "Little Boy"',
    date: '6 de agosto de 1945',
    year: '1945',
    location: 'Hiroshima, Japão',
    category: 'acontecimentos',
    categoryLabel: 'Ataque Nuclear Histórico',
    description: 'A histórica fotografia aérea documentando a ascensão da colossal nuvem de cogumelo atômico sobre Hiroshima imediatamente após a detonação da bomba "Little Boy" a 600 metros acima da cidade.',
    historicalContext: 'A bomba de fissão por canhão de Urânio-235 liberou aproximadamente 15 quilotons de TNT, resultando na destruição quase total da área urbana central e marcando o primeiro emprego bélico de uma arma atômica na história. A foto foi registrada pelas aeronaves de observação que acompanhavam o bombardeiro B-29 Enola Gay.',
    source: 'U.S. Army Air Forces / National Archives and Records Administration (NARA 542192)',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: hiroshimaExplosionImg,
    tag: 'Explosão Little Boy'
  },
  {
    id: 'hiroshima-1945',
    title: 'Memorial da Paz de Hiroshima — Cúpula da Bomba Atômica (Genbaku Dome)',
    date: '6 de agosto de 1945 / Preservação Memorial',
    year: '1945',
    location: 'Hiroshima Peace Memorial Park, Hiroshima, Japão',
    category: 'acontecimentos',
    categoryLabel: 'Memória Histórica',
    description: 'A histórica estrutura preservada do Antigo Pavilhão de Promoção Industrial (Genbaku Dome), localizada a apenas 160 metros do hipocentro da explosão atômica de 6 de agosto de 1945.',
    historicalContext: 'Preservado no estado exato em que permaneceu após o primeiro bombardeio nuclear da história, o monumento é tombado como Patrimônio Mundial da Humanidade pela UNESCO, servindo como memorial perpétuo pela paz mundial e pela eliminação definitiva das armas nucleares.',
    source: 'Hiroshima Peace Memorial Museum / UNESCO World Heritage Centre',
    license: 'Arquivo Histórico e Educativo Aberto',
    imageUrl: hiroshimaDomeImg,
    tag: 'Patrimônio UNESCO'
  },
  {
    id: 'nagasaki-explosion-1945',
    title: 'Bombardeio de Nagasaki — A Nuvem Atômica da "Fat Man"',
    date: '9 de agosto de 1945',
    year: '1945',
    location: 'Nagasaki, Japão',
    category: 'acontecimentos',
    categoryLabel: 'Ataque Nuclear Histórico',
    description: 'A colossal coluna de fumaça e a nuvem de cogumelo de 18 km de altitude erguendo-se sobre o vale de Urakami após a detonação da bomba de implosão de plutônio "Fat Man" (21 quilotons) lançada pelo bombardeiro B-29 Bockscar.',
    historicalContext: 'Fotografada pelo Tenente Charles Levy a bordo do B-29 The Great Artiste, esta é uma das imagens mais emblemáticas do século XX, registrando o segundo e último bombardeio nuclear em combate na história, que acelerou o término da Segunda Guerra Mundial.',
    source: 'U.S. National Archives (NARA) / Tenente Charles Levy (USAAF)',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: nagasakiExplosionImg,
    tag: 'Explosão Fat Man'
  },
  {
    id: 'nagasaki-1945',
    title: 'Memorial da Paz de Nagasaki — Parque e Monumento do Hipocentro',
    date: '9 de agosto de 1945 / Memorial Permanente',
    year: '1945',
    location: 'Parque da Paz de Nagasaki, Urakami, Nagasaki, Japão',
    category: 'acontecimentos',
    categoryLabel: 'Memória Histórica',
    description: 'A icônica Estátua da Paz de Seibo Kitamura e o monumento memorial do hipocentro erguidos no Parque da Paz de Nagasaki para homenagear as vítimas do ataque com a bomba "Fat Man".',
    historicalContext: 'A mão direita da estátua aponta para o céu, advertindo contra a ameaça das armas nucleares, enquanto o braço esquerdo estendido simboliza a paz eterna. O ataque de 9 de agosto de 1945 foi o segundo e último bombardeio nuclear bélico da história.',
    source: 'Nagasaki Atomic Bomb Museum / Cidade de Nagasaki',
    license: 'Acervo Cultural e Histórico Público',
    imageUrl: nagasakiMemorialImg,
    tag: 'Parque da Paz'
  },
  {
    id: 'rds-1-1949',
    title: 'RDS-1 — O Primeiro Teste Nuclear Soviético (Primeiro Relâmpago)',
    date: '29 de agosto de 1949',
    year: '1949',
    location: 'Polígono de Testes de Semipalatinsk, Cazaquistão (URSS)',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'Registro histórico da torre de testes e da primeira detonação nuclear soviética, designada internamente como RDS-1 ("Primeiro Relâmpago" / codinome ocidental Joe-1), liberando 22 quilotons de TNT.',
    historicalContext: 'Liderado pelo físico Igor Kurchatov e pelo complexo VNIIEF em Sarov, o teste quebrou o monopólio nuclear norte-americano e inaugurou o período de dissuasão nuclear estratégica da Guerra Fria.',
    source: 'Arquivo Central do Estado da Federação Russa / Rosatom',
    license: 'Domínio Público / Arquivo Histórico Governamental',
    imageUrl: rds1Img,
    tag: 'Guerra Fria'
  },
  {
    id: 'ivy-mike-1952',
    title: 'Ivy Mike — O Primeiro Dispositivo Termonuclear Experimental',
    date: '1 de novembro de 1952',
    year: '1952',
    location: 'Ilha de Elugelab, Atol de Enewetak, Ilhas Marshall',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'A colossal coluna de condensação e cogumelo termonuclear de 41 km de altitude gerada pelo dispositivo experimental criogênico "Sausage" de 82 toneladas, liberando 10,4 Megatons de energia e vaporizando a ilha de Elugelab.',
    historicalContext: 'Primeira validação experimental em escala real do princípio físico termonuclear Teller-Ulam de dois estágios, acionando a fusão de deutério líquido através da energia de uma primária de fissão.',
    source: 'U.S. Department of Energy / National Nuclear Security Administration',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: ivyMikeImg,
    tag: 'Era Termonuclear'
  },
  {
    id: 'ivy-king-1952',
    title: 'Ivy King — A Maior Arma de Fissão Pura Testada pelos EUA',
    date: '16 de novembro de 1952',
    year: '1952',
    location: 'Atol de Enewetak, Ilhas Marshall',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'Detonação aérea da bomba MK-18 "Super Oralloy Bomb", lançada por um bombardeiro B-36H a 450 metros de altitude sobre o Atol de Enewetak, liberando 500 quilotons de potência exclusivamente por fissão de urânio enriquecido.',
    historicalContext: 'Desenvolvida como salvaguarda de alta potência pelos Estados Unidos caso os complexos projetos termonucleares criogênicos sofressem contratempos, representando o limite prático da fissão pura.',
    source: 'U.S. Department of Defense / Defense Threat Reduction Agency',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: ivyKingImg,
    tag: 'Fissão Pura'
  },
  {
    id: 'castle-bravo-1954',
    title: 'Castle Bravo — A Maior Detonação Nuclear Realizada pelos EUA',
    date: '1 de março de 1954',
    year: '1954',
    location: 'Recife do Atol de Bikini, Ilhas Marshall',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'A monumental bola de fogo de mais de 7 km de diâmetro gerada pelo dispositivo termonuclear de combustível seco "Shrimp", que atingiu 15 Megatons de potência (2,5 vezes acima do previsto pelos cálculos da época).',
    historicalContext: 'O teste causou o maior evento de contaminação radiológica por precipitação (fallout) dos testes dos EUA, acelerando a conscientização internacional e os movimentos de cientistas pelo desarmamento nuclear.',
    source: 'U.S. Department of Energy / Nevada National Security Site',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: castleBravoImg,
    tag: 'Bikini 15 Mt'
  },
  {
    id: 'operation-castle-romeo-1954',
    title: 'Castle Romeo — Teste Termonuclear em Barcaça da Operação Castle',
    date: '27 de março de 1954',
    year: '1954',
    location: 'Cratera de Bravo, Lagoa do Atol de Bikini',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'A icônica nuvem em cogumelo de 11 Megatons do teste Romeo, disparado sobre uma barcaça ancorada no interior da cratera aberta pelo teste Bravo na lagoa de Bikini.',
    historicalContext: 'A Operação Castle comprovou a viabilidade do deutereto de lítio natural não enriquecido como combustível termonuclear em larga escala, permitindo a produção em massa de ogivas termonucleares.',
    source: 'U.S. Department of Energy / Joint Task Force Seven',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: castleRomeoImg,
    tag: 'Operação Castle'
  },
  {
    id: 'rds-6s-1953',
    title: 'RDS-6s — O Teste Termonuclear Soviético "Sloika"',
    date: '12 de agosto de 1953',
    year: '1953',
    location: 'Polígono de Semipalatinsk, Cazaquistão (URSS)',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'Primeiro teste soviético a incorporar reações de fusão nuclear através do conceito "Sloika" (bolo em camadas) concebido por Andrei Sakharov e Vitaly Ginzburg, atingindo 400 quilotons.',
    historicalContext: 'A utilização de deutereto de lítio-6 permitiu criar um dispositivo compacto e transportável por bombardeiros estratégicos Tu-16, acelerando a pesquisa termonuclear na União Soviética.',
    source: 'Rosatom / Museu de Armas Nucleares de Sarov (VNIIEF)',
    license: 'Domínio Público / Arquivo Histórico Soviético',
    imageUrl: rds6sImg,
    tag: 'Sloika de Sakharov'
  },
  {
    id: 'rds-37-1955',
    title: 'RDS-37 — O Primeiro Teste Termonuclear Soviético de Dois Estágios',
    date: '22 de novembro de 1955',
    year: '1955',
    location: 'Polígono de Semipalatinsk, Cazaquistão (URSS)',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'Detonação aérea a 1.550 metros de altitude do primeiro artefato soviético de dois estágios com implosão por radiação (equivalente ao conceito Teller-Ulam), liberando 1,6 Megaton.',
    historicalContext: 'Projetada por Andrei Sakharov e Yakov Zeldovich, a RDS-37 provou que a URSS dominava o princípio físico fundamental das armas termonucleares de potência virtualmente ilimitada.',
    source: 'Arquivo Estatal Científico da Federação Russa / Rosatom',
    license: 'Domínio Público / Arquivo Histórico Soviético',
    imageUrl: rds37Img,
    tag: 'Dois Estágios'
  },
  {
    id: 'b41-bomb-1960',
    title: 'B41 (Mark 41) — A Maior Bomba Termonuclear do Arsenal dos EUA',
    date: '1960 – 1976 (Serviço Operacional)',
    year: '1960',
    location: 'Museu Nacional de Ciência & História Nuclear, Albuquerque, Novo México (EUA)',
    category: 'documentos',
    categoryLabel: 'Acervo Museológico',
    description: 'Carcaça desativada em exibição pública da bomba termonuclear pesada B41 (Mark 41), a arma de maior rendimento explosivo (até 25 Megatons) já construída e estocada em série pelos Estados Unidos.',
    historicalContext: 'Desenvolvida para transporte pelos bombardeiros B-52 Stratofortress e B-47 Stratojet durante a Guerra Fria para garantir a capacidade de dissuasão estratégica contra complexos militares endurecidos.',
    source: 'National Museum of Nuclear Science & History / U.S. Air Force',
    license: 'Domínio Público / Acervo de Museus Federais dos EUA',
    imageUrl: b41MuseumDocImg,
    tag: 'Arsenal Histórico'
  },
  {
    id: 'tsar-bomba-1961',
    title: 'Tsar Bomba (RDS-220) — A Maior Explosão Causada pela Humanidade',
    date: '30 de outubro de 1961',
    year: '1961',
    location: 'Baía de Mityushikha, Ilha de Nova Zembla, Oceano Ártico (URSS)',
    category: 'testes',
    categoryLabel: 'Testes Históricos',
    description: 'A gigantesca bola de fogo e a colossal coluna de condensação de 67 km de altitude geradas pela detonação da Tsar Bomba a 4.000 metros de altitude, liberando 50 Megatons de energia (mais de 3.300 vezes Hiroshima).',
    historicalContext: 'Lançada por um bombardeiro soviético Tu-95V especialmente modificado com paraquedas de retardamento de 800 kg, a explosão demonstrou o ápice da megatonelagem militar e impulsionou as negociações do Tratado de Proibição Parcial de Testes (PTBT) de 1963.',
    source: 'Fonte não informada',
    license: 'Registro Histórico Governamental',
    imageUrl: tsarBombaImg,
    tag: '50 Megatons'
  },
  {
    id: 'chernobyl-destruido-1986',
    title: 'Reator 4 Destruído da Central Nuclear de Chernobyl (Acidente Civil)',
    date: '26 de abril de 1986',
    year: '1986',
    location: 'Pripyat / Chernobyl, República Socialista Soviética da Ucrânia',
    category: 'acontecimentos',
    categoryLabel: 'Acidente Civil',
    description: 'Fotografia aérea oficial documentando a destruição da estrutura do Reator 4 e da sala de turbinas da Usina de Chernobyl após a explosão termo-hidráulica de vapor e hidrogênio e o incêndio do núcleo de grafite.',
    historicalContext: 'O mais grave acidente da história da energia nuclear civil (Nível 7 INES). É fundamental destacar que foi um acidente térmico/mecânico de reator de usina de geração elétrica e NÃO uma explosão de arma atômica bélica. Resultou na criação da Associação Mundial de Operadores Nucleares (WANO) e na reformulação global dos padrões de segurança.',
    source: 'Agência Internacional de Energia Atômica (AIEA) / Igor Kostin / Novosti',
    license: 'Arquivo Histórico AIEA / Domínio Público Documental',
    imageUrl: chernobylImg,
    tag: 'Acidente Civil'
  },
  {
    id: 'chicago-pile-1',
    title: 'Chicago Pile-1 — O Primeiro Reator Nuclear Artificial do Mundo',
    date: '2 de dezembro de 1942',
    year: '1942',
    location: 'Universidade de Chicago, Illinois (EUA)',
    category: 'laboratorios',
    categoryLabel: 'Instalações Históricas',
    description: 'Reconstituição documental da estrutura de 40.000 blocos de grafite e esferas de urânio montada sob as arquibancadas do Stagg Field pela equipe de Enrico Fermi no Projeto Manhattan.',
    historicalContext: 'Às 15h25 de 2 de dezembro de 1942, o reator atingiu a primeira reação em cadeia nuclear autossustentada e controlada da história da humanidade, abrindo o caminho para os reatores nucleares civis e a física de reatores.',
    source: 'Argonne National Laboratory / U.S. Department of Energy',
    license: 'Domínio Público (Governo Federal dos EUA)',
    imageUrl: chicagoPile1Img,
    tag: 'Primeiro Reator'
  },
  {
    id: 'fissao-nuclear-diagrama',
    title: 'Física da Fissão Nuclear — Diagrama Científico',
    date: 'Física Fundamental',
    year: 'Física',
    location: 'Divisão de Núcleos Pesados (U-235 / Pu-239)',
    category: 'laboratorios',
    categoryLabel: 'Física Nuclear',
    description: 'Diagrama científico demonstrando o mecanismo de fissão: um nêutron térmico é absorvido por um núcleo pesado de Urânio-235, tornando-o instável e provocando sua cisão em dois núcleos menores, liberando nêutrons secundários e cerca de 200 MeV de energia.',
    historicalContext: 'Fenômeno descoberto em dezembro de 1938 pelos químicos Otto Hahn e Fritz Strassmann e interpretado teoricamente por Lise Meitner e Otto Frisch, fundamentando tanto a energia nuclear civil em reatores quanto as armas atômicas.',
    source: 'Divisão de Educação Científica / Laboratórios Nacionais de Física',
    license: 'Recurso Educacional Aberto',
    imageUrl: fissionDiagramImg,
    tag: 'Fissão Nuclear'
  },
  {
    id: 'fusao-nuclear-diagrama',
    title: 'Física da Fusão Nuclear — Diagrama Científico Deutério-Trítio (D-T)',
    date: 'Física Fundamental',
    year: 'Física',
    location: 'Fusão de Isótopos de Hidrogênio',
    category: 'laboratorios',
    categoryLabel: 'Física Avançada',
    description: 'Representação científica da reação termonuclear D-T: dois núcleos leves de hidrogênio (Deutério com 1 próton e 1 nêutron, e Trítio com 1 próton e 2 nêutrons) fundem-se sob temperaturas de milhões de graus, formando Hélio-4, um nêutron de alta energia e liberando 17,6 MeV.',
    historicalContext: 'A fusão é o processo primordial que alimenta o Sol e as estrelas no universo. Na Terra, é a base dos dispositivos termonucleares e a maior fronteira para a geração de energia limpa e inesgotável em reatores de confinamento magnético como o ITER.',
    source: 'Laboratório de Física de Plasmas / Agência Internacional de Energia Atômica (AIEA)',
    license: 'Recurso Educacional Aberto',
    imageUrl: fusionDiagramImg,
    tag: 'Fusão Termonuclear'
  },
  {
    id: 'tokamak-iter-pesquisa',
    title: 'Câmara de Vácuo do Reator de Fusão Tokamak (Projeto ITER)',
    date: '2024 / Contemporâneo',
    year: '2024',
    location: 'Cadarache, Saint-Paul-lès-Durance, França',
    category: 'laboratorios',
    categoryLabel: 'Física Avançada',
    description: 'Vaso de vácuo toroidal e ímãs supercondutores do complexo de pesquisa internacional ITER para demonstração de 500 MW de potência de fusão magnética sustentada.',
    historicalContext: 'Representa a cooperação científica internacional pacífica reunindo 35 países (União Europeia, EUA, Japão, China, Coreia do Sul, Índia e Rússia) para viabilizar a fusão nuclear como fonte limpa e segura de energia para a humanidade.',
    source: 'ITER Organization / EFDA-JET',
    license: 'ITER Press Archive / Uso Educativo Autorizado',
    imageUrl: iterTokamakImg,
    tag: 'Fronteira da Fusão'
  },
  {
    id: 'diagrama-gun-type-little-boy',
    title: 'Esquema Técnico Didático: Fissão Tipo Canhão (Gun-Type / Little Boy)',
    date: 'Física de Armas / Projeto Manhattan (1945)',
    year: '1945',
    location: 'Conceito Balístico — Urânio-235',
    category: 'laboratorios',
    categoryLabel: 'Arquiteturas de Armas',
    description: 'Diagrama esquemático didático do método de disparo balístico (Gun-type): uma carga propulsora convencional dispara um projétil subcrítico de Urânio-235 através de um tubo de canhão em direção a um anel/esfera alvo subcrítica de U-235. No instante do impacto, as duas massas unem-se formando uma massa supercrítica, desencadeando a reação em cadeia de fissão nuclear.',
    historicalContext: 'Método empregado na bomba Little Boy lançada sobre Hiroshima. Embora mecanicamente simples e com confiabilidade tão alta que dispensou testes prévios, o design de canhão era extremamente ineficiente (apenas ~1,4% do urânio sofreu fissão real) e pesado demais para ogivas modernas.',
    source: 'Divisão de Educação Científica / Diagrama Técnico Escolar',
    license: 'Recurso Educacional Didático',
    imageUrl: gunTypeDiagramImg,
    tag: 'Fissão Gun-Type'
  },
  {
    id: 'diagrama-implosao-plutonio',
    title: 'Esquema Técnico Didático: Fissão por Implosão de Plutônio (Fat Man / Trinity)',
    date: 'Física de Armas / Projeto Manhattan (1945)',
    year: '1945',
    location: 'Compressão Esférica Hidrodinâmica — Plutônio-239',
    category: 'laboratorios',
    categoryLabel: 'Arquiteturas de Armas',
    description: 'Diagrama didático em 3 cortes do mecanismo de implosão esférica: (1) Revestimento aerodinâmico externo; (2) Lentes explosivas convencionais disparadas simultaneamente para gerar uma onda de choque convergente que comprime o caroço de Plutônio-239 com iniciador de nêutrons; (3) Compressão do núcleo em densidade supercrítica extrema resultando na detonação nuclear em milionésimos de segundo.',
    historicalContext: 'Desenvolvido sob a liderança de Seth Neddermeyer e John von Neumann no Laboratório de Los Alamos, o método de implosão foi necessário porque o plutônio sofria pré-detonação espontânea em canhões balísticos devido ao isótopo Pu-240. Tornou-se o padrão para todos os gatilhos primários modernos.',
    source: 'Divisão de Educação Científica / Diagrama Técnico Escolar',
    license: 'Recurso Educacional Didático',
    imageUrl: implosionTypeDiagramImg,
    tag: 'Fissão por Implosão'
  },
  {
    id: 'diagrama-teller-ulam-termonuclear',
    title: 'Esquema Técnico Didático: Arma Termonuclear em Estágios (Configuração Teller-Ulam)',
    date: 'Física Termonuclear / 1951 em diante',
    year: '1951',
    location: 'Implosão por Radiação — Fusão Deutério-Trítio / Lítio-6',
    category: 'laboratorios',
    categoryLabel: 'Arquiteturas de Armas',
    description: 'Diagrama educacional ilustrando os 6 passos da detonação termonuclear em estágios: 1. Ogiva em repouso (primário de fissão no topo e cilindro secundário de combustível deutereto de lítio-6 com vela de plutônio e invólucro de U-238 suspensos em espuma de poliestireno); 2. Detonação do primário; 3. Emissão intensa de raios-X térmicos refletidos pelo invólucro; 4. A espuma converte-se em plasma hiperbárico comprimindo o secundário (implosão por radiação) e ativando a vela central; 5. Ignição da fusão termonuclear no combustível de deutério-lítio gerando nêutrons de 14,1 MeV; 6. Fissão terciária rápida do invólucro de Urânio-238 pelo fluxo de nêutrons de alta energia.',
    historicalContext: 'Concebido por Edward Teller e Stanislaw Ulam em 1951, este princípio permitiu ultrapassar a barreira dos megatons, viabilizando dispositivos de dezenas de megatons (como Ivy Mike, Castle Bravo e a Tsar Bomba) e todas as ogivas estratégicas modernas compactas.',
    source: 'Howard Morland / Fastfission (Wikimedia Commons)',
    license: 'Creative Commons CC-BY-SA 3.0',
    imageUrl: tellerUlamDiagramImg,
    tag: 'Teller-Ulam'
  }
];
