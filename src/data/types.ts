import type { CategoryKey } from '@/constants/theme';
import type { Localized } from '@/i18n/types';

export type ArchetypeKey =
  | 'gestaltend'
  | 'langerAtem'
  | 'offeneHand'
  | 'wacherBlick'
  | 'weitesHerz';

/* --------------------------------------------------------------- projects */

export type Scope = 'deutschland' | 'international';

export type Project = {
  id: string;
  name: Localized;
  org: Localized;
  category: CategoryKey;
  location: Localized;
  /** Where the impact lands; drives the Deutschland/International filter. */
  scope: Scope;
  country: Localized;
  /** The concrete human / story at the centre, never an abstract stat. */
  hero: { name: string; role: Localized; line: Localized; initials: string };
  tagline: Localized;
  about: Localized;
  verified: boolean;
  reportCadence: Localized;
  /** Instant-impact mapping: `per` euros buys one `unit`. */
  impact: { per: number; unit: Localized; unitPlural: Localized; icon: string };
  proof: Localized<string[]>;
  recipients: Localized;
  founded: string;
};

/* ------------------------------------------------------------------- quiz */

export type QuizOption = {
  id: string;
  label: Localized;
  desc?: Localized;
  symbol?: string;
  themes?: Partial<Record<CategoryKey, number>>;
  arch?: Partial<Record<ArchetypeKey, number>>;
};

export type QuizQuestion = {
  id: string;
  kicker: Localized;
  question: Localized;
  helper?: Localized;
  type: 'single' | 'multi';
  min?: number;
  max?: number;
  options: QuizOption[];
};

/* --------------------------------------------------------------- profile */

export type Archetype = {
  key: ArchetypeKey;
  title: Localized;
  /** The Leitprinzip: one calm, adult sentence. */
  essence: Localized;
  description: Localized;
  strengths: Localized<string[]>;
  approach: Localized;
};

/* -------------------------------------------------------- impact moments */

export type ImpactCard = {
  id: string;
  kind: 'intro' | 'story' | 'stat' | 'growth' | 'outro';
  category?: CategoryKey;
  kicker?: string;
  headline: string;
  body?: string;
  hero?: { name: string; age?: number; line: string; initials: string };
  metric?: { value: string; label: string };
  bars?: { label: string; value: number }[];
};

export type ImpactMoment = {
  id: string;
  month: string;
  title: string;
  cards: ImpactCard[];
};

/* ----------------------------------------------------------------- agent */

export type AgentAction =
  | 'open-project'
  | 'name-fund'
  | 'invite-circle'
  | 'open-impact'
  | 'increase'
  | 'level-up'
  | 'none';

export type AgentSuggestion = {
  id: string;
  kind: 'project' | 'nudge' | 'update' | 'milestone';
  title: string;
  body: string;
  cta: string;
  action: AgentAction;
  projectId?: string;
};

/* ----------------------------------------------------------------- stages */

export type Stage = {
  level: number;
  title: Localized;
  identity: Localized;
  unlock: Localized;
};
