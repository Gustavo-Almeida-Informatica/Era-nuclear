# ERA NUCLEAR — Plataforma Aberta de Divulgação Científica e Histórica

Uma plataforma web moderna, imersiva e interativa dedicada à divulgação científica, física atômica, história da era nuclear (1896 até os dias atuais), tratados de desarmamento e não proliferação, energia nuclear civil e acervo iconográfico oficial.

---

## ⚛️ Funcionalidades Principais

1. **Linha do Tempo Interativa da Era Nuclear (1896–Atualidade)**
   - Navegação por décadas (`1890–1940`, `1940–1950`, `1950–1960`, `1960–1970`, `1970–1990`, `1990–2000`, `2000–Atualidade`).
   - Filtros por categoria: *Ciência*, *Militar*, *Acidentes*, *Tratados* e *Energia*.
   - Fichas completas com datação precisa, imagem autêntica, impacto histórico e fonte primária.

2. **Simuladores Científicos & Interatividade**
   - **Simulador de Estrutura Atômica Interativo:** Visualização em tempo real do núcleo (prótons, nêutrons) e órbitas eletrônicas para Hidrogênio-1, Deutério, Trítio, Hélio-4, Carbono-12, Urânio-235, Urânio-238 e Plutônio-239.
   - **Simulador de Blindagem de Radiação:** Teste interativo do comportamento de partículas Alfa ($\alpha$), Beta ($\beta$), Raios Gama ($\gamma$) e Nêutrons ($n$) ao atravessar Papel, Alumínio, Chumbo e Concreto/Água com taxa de atenuação em percentual e explicação dos mecanismos de interação.
   - **Calculadora de Efeitos e Raios de Impacto:** Estimativa visual das zonas de bola de fogo, radiação térmica, sobrepressão de choque mecânico e radiação ionizante de acordo com o rendimento em quilótons ou megatons.
   - **Quiz Interativo:** Perguntas pedagógicas com explicação técnica imediata.

3. **Especiais Históricos & Monografias Profundas**
   - **Operação Castle (1954):** Análise detalhada dos 6 testes no Atol de Bikini e Enewetak (*Bravo, Romeo, Koon, Union, Yankee, Nectar*), rendimento previsto vs. medido e o desastre do *fallout* em Rongelap e no barco *Daigo Fukuryū Maru*.
   - **Tsar Bomba (RDS-220, 1961):** O teste de 50 Megatons em Nova Zembla, modificações da aeronave Tu-95V, o papel de Andrei Sakharov na redução do *fallout* e a reflexão geopolítica do ponto de inflexão da Guerra Fria.
   - **Ivy King (1952):** A maior arma de fissão pura da história (500 kt) baseada em urânio enriquecido.
   - **B41 (Mark 41):** A bomba termonuclear de 25 Mt em serviço no Comando Aéreo Estratégico (SAC) e os motivos doutrinários de sua aposentadoria.
   - **Chernobyl (1986):** Análise técnica das causas do acidente no Reator 4 RBMK, diferenciação estrita entre reator civil e explosão bélica, e o Novo Confinamento Seguro (NSC).

4. **Acervo Iconográfico Oficial ("Imagens da Era Nuclear")**
   - Galeria com fotos históricas reais de domínio público e arquivos governamentais (DOE, AIEA, Força Aérea dos EUA, Rosatom).
   - Visualizador lightbox com detalhes técnicos, datação, contexto geopolítico, fonte e termo de licença.

5. **Glossário Científico & Fontes Primárias**
   - Mais de 20 verbetes científicos categorizados com busca em tempo real.
   - Diretório de instituições oficiais: AIEA (IAEA), CTBTO, ABACC, DOE/NNSA, SIPRI e arquivos de desclassificação.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript
- **Estilização:** Tailwind CSS v4
- **Ícones:** Lucide React
- **Build Tool:** Vite
- **Qualidade de Código:** ESLint, TypeScript Strict Mode

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn / bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/<seu-usuario>/<nome-do-repositorio>.git

# Acesse o diretório
cd era-nuclear

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000` (ou na porta configurada pelo Vite).

### Build para Produção

```bash
npm run build
```

---

## 🔒 Compromisso Ético e Educacional

Este projeto tem finalidade estritamente **educativa, histórica e de conscientização científica**.
- Não contém plantas construtivas, dimensões de usinagem, dados de enriquecimento sensíveis ou quaisquer instruções para replicação bélica.
- Promove o conhecimento sobre os tratados de não proliferação nuclear (TNP, TPAN, CTBT) e a governança multilateral de salvaguardas da AIEA.

---

## 📄 Licença

Este projeto é disponibilizado sob a licença [Apache-2.0](LICENSE) para fins educacionais e de pesquisa.
