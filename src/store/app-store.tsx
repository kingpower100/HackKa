import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react';
// import { getLocales } from 'expo-localization'; // re-enable for device-locale default

import type { CategoryKey } from '@/constants/theme';
import { deriveProfile } from '@/data/profiles';
import { QUIZ } from '@/data/quiz';
import { STAGES } from '@/data/levels';
import type { Archetype, Scope, Stage } from '@/data/types';
import type { Lang } from '@/i18n/types';

/* ------------------------------------------------------------------ types */

export type Contribution = { type: 'monthly' | 'oneoff'; amount: number };
export type Allocation = { projectId: string; share: number }; // share in percent
export type CircleMember = {
  id: string;
  name: string;
  relation: string;
  monthly: number;
  status: 'aktiv' | 'eingeladen';
  initials: string;
};

export type State = {
  onboarded: boolean;
  language: Lang;
  answers: Record<string, string[]>;
  topThemes: CategoryKey[];
  archetype: Archetype | null;
  contribution: Contribution | null;
  allocations: Allocation[];
  totalGiven: number;
  monthsActive: number;
  fundName: string | null;
  circle: CircleMember[];
  scope: Scope | null;
};

/**
 * Start language. Forced to English for the pitch; the in-app toggle (Profile)
 * still switches to German.
 *
 * To restore device-locale default afterwards: uncomment the `getLocales`
 * import above and use:
 *   return getLocales()[0]?.languageCode === 'en' ? 'en' : 'de';   // (in try/catch → 'de')
 */
function detectLanguage(): Lang {
  return 'en';
}

const INITIAL: State = {
  onboarded: false,
  language: detectLanguage(),
  answers: {},
  topThemes: [],
  archetype: null,
  contribution: null,
  allocations: [],
  totalGiven: 0,
  monthsActive: 0,
  fundName: null,
  circle: [],
  scope: null,
};

/* ---------------------------------------------------------------- actions */

type Action =
  | { type: 'answer'; qid: string; ids: string[] }
  | { type: 'finalizeProfile' }
  | { type: 'setContribution'; contribution: Contribution }
  | { type: 'setAllocations'; allocations: Allocation[] }
  | { type: 'confirmGive' }
  | { type: 'giveOneOff'; projectId: string; amount: number }
  | { type: 'advanceMonth' }
  | { type: 'nameFund'; name: string }
  | { type: 'inviteCircle'; members: CircleMember[] }
  | { type: 'setLanguage'; language: Lang }
  | { type: 'reset' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'answer':
      return { ...state, answers: { ...state.answers, [action.qid]: action.ids } };

    case 'finalizeProfile': {
      const { topThemes, archetype, scope } = deriveProfile(QUIZ, state.answers);
      return { ...state, topThemes, archetype, scope };
    }

    case 'setContribution':
      return { ...state, contribution: action.contribution };

    case 'setAllocations':
      return { ...state, allocations: action.allocations };

    case 'confirmGive': {
      const c = state.contribution;
      const firstAmount = c ? c.amount : 0;
      return {
        ...state,
        onboarded: true,
        totalGiven: state.totalGiven + firstAmount,
        monthsActive: Math.max(state.monthsActive, 1),
      };
    }

    case 'giveOneOff': {
      const exists = state.allocations.some((a) => a.projectId === action.projectId);
      const allocations = exists
        ? state.allocations
        : rebalance([...state.allocations, { projectId: action.projectId, share: 0 }]);
      return { ...state, allocations, totalGiven: state.totalGiven + action.amount };
    }

    case 'advanceMonth': {
      const monthly = state.contribution?.type === 'monthly' ? state.contribution.amount : 0;
      const circleSum = state.circle
        .filter((m) => m.status === 'aktiv')
        .reduce((s, m) => s + m.monthly, 0);
      return {
        ...state,
        monthsActive: state.monthsActive + 1,
        totalGiven: state.totalGiven + monthly + circleSum,
      };
    }

    case 'nameFund':
      return { ...state, fundName: action.name };

    case 'inviteCircle':
      return { ...state, circle: [...state.circle, ...action.members] };

    case 'setLanguage':
      return { ...state, language: action.language };

    case 'reset':
      // Keep the chosen language when replaying the journey.
      return { ...INITIAL, language: state.language };

    default:
      return state;
  }
}

/** Verteilt Anteile gleichmäßig auf alle Projekte (Summe ~100). */
export function rebalance(allocations: Allocation[]): Allocation[] {
  const n = allocations.length;
  if (n === 0) return [];
  const even = Math.floor(100 / n);
  const rest = 100 - even * n;
  return allocations.map((a, i) => ({ ...a, share: even + (i < rest ? 1 : 0) }));
}

/* ------------------------------------------------------------- selectors */

export function currentLevel(s: State): number {
  if (s.circle.some((m) => m.status === 'aktiv')) return 4;
  if (s.fundName) return 3;
  if (s.allocations.length >= 2 || s.monthsActive >= 3) return 2;
  if (s.contribution || s.totalGiven > 0) return 1;
  return 0;
}

export function currentStage(s: State): Stage {
  return STAGES[currentLevel(s)];
}

/** Euro-Betrag, der monatlich/aktuell auf ein Projekt entfällt. */
export function allocationAmount(s: State, projectId: string): number {
  const alloc = s.allocations.find((a) => a.projectId === projectId);
  if (!alloc || !s.contribution) return 0;
  return Math.round((s.contribution.amount * alloc.share) / 100);
}

/* ------------------------------------------------------------- provider */

type Store = {
  state: State;
  answer: (qid: string, ids: string[]) => void;
  finalizeProfile: () => void;
  setContribution: (c: Contribution) => void;
  setAllocations: (a: Allocation[]) => void;
  confirmGive: () => void;
  giveOneOff: (projectId: string, amount: number) => void;
  advanceMonth: () => void;
  nameFund: (name: string) => void;
  inviteCircle: (members: CircleMember[]) => void;
  setLanguage: (language: Lang) => void;
  reset: () => void;
  level: number;
  stage: Stage;
};

const Ctx = createContext<Store | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const value = useMemo<Store>(
    () => ({
      state,
      answer: (qid, ids) => dispatch({ type: 'answer', qid, ids }),
      finalizeProfile: () => dispatch({ type: 'finalizeProfile' }),
      setContribution: (contribution) => dispatch({ type: 'setContribution', contribution }),
      setAllocations: (allocations) => dispatch({ type: 'setAllocations', allocations }),
      confirmGive: () => dispatch({ type: 'confirmGive' }),
      giveOneOff: (projectId, amount) => dispatch({ type: 'giveOneOff', projectId, amount }),
      advanceMonth: () => dispatch({ type: 'advanceMonth' }),
      nameFund: (name) => dispatch({ type: 'nameFund', name }),
      inviteCircle: (members) => dispatch({ type: 'inviteCircle', members }),
      setLanguage: (language) => dispatch({ type: 'setLanguage', language }),
      reset: () => dispatch({ type: 'reset' }),
      level: currentLevel(state),
      stage: currentStage(state),
    }),
    [state]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useStore must be used within AppProvider');
  return ctx;
}
