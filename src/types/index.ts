export type PageId =
  | 'home'
  | 'history'
  | 'physics'
  | 'fission-fusion'
  | 'weapons'
  | 'operation-castle'
  | 'tsar-bomba'
  | 'ivy-king'
  | 'ivy-mike'
  | 'manhattan-project'
  | 'b41'
  | 'chernobyl'
  | 'impacts'
  | 'nuclear-ranking'
  | 'map'
  | 'energy'
  | 'cases'
  | 'gallery'
  | 'glossary'
  | 'about'
  | 'sources'
  | 'contact';

export interface TimelineEvent {
  id: string;
  year: string;
  exactDate?: string;
  title: string;
  decade: '1890-1940' | '1940-1950' | '1950-1960' | '1960-1970' | '1970-1990' | '1990-2000' | '2000-atualidade';
  category: 'ciencia' | 'militar' | 'acidente' | 'tratado' | 'energia';
  categoryLabel: string;
  summary: string;
  fullDescription: string;
  historicalImpact: string;
  keyFigures?: string[];
  imageUrl?: string;
  imageCaption?: string;
  secondaryImageUrl?: string;
  secondaryImageCaption?: string;
  location?: string;
  source?: string;
}

export interface CastleTest {
  id: string;
  name: string;
  date: string;
  location: string;
  deviceType: string;
  yieldReported: string;
  predictedYield: string;
  historicalObjective: string;
  resultAndImpact: string;
  historicalImportance: string;
  imageUrl: string;
  imageCaption: string;
  source: string;
  license: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  year: string;
  location: string;
  category: 'testes' | 'cientistas' | 'laboratorios' | 'instalacoes' | 'acontecimentos' | 'usinas' | 'documentos';
  categoryLabel: string;
  description: string;
  historicalContext: string;
  source: string;
  license: string;
  imageUrl: string;
  tag: string;
}

export interface PhysicsTopic {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  keyPoints: string[];
  details: string;
  formula?: string;
  formulaExplanation?: string;
}

export interface RadiationType {
  name: string;
  symbol: string;
  nature: string;
  charge: string;
  mass: string;
  penetration: string;
  shieldingMaterial: string;
  biologicalRisk: string;
  medicalApplications?: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  year: string;
  location: string;
  category: string;
  categoryLabel: string;
  shortSummary: string;
  context: string;
  whatHappened: string;
  consequences: string[];
  historicalSignificance: string;
  lessonsLearned: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  category: string;
  categoryLabel: string;
  shortDefinition: string;
  extendedDefinition: string;
  relatedTerms: string[];
}

export interface SourceReference {
  organization: string;
  acronym: string;
  description: string;
  url: string;
  category: 'internacional' | 'academico' | 'museu' | 'tratados';
  keyPublications: string[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}
