import type { CategoryKey } from '@/constants/theme';
import type { Archetype, ArchetypeKey, QuizQuestion, Scope } from './types';

/**
 * Fünf erwachsene Haltungen, keine Maskottchen, keine Spitznamen.
 * Konzept-Substantive, die Statur ausstrahlen, plus ein Leitprinzip.
 */
export const ARCHETYPES: Record<ArchetypeKey, Archetype> = {
  gestaltend: {
    key: 'gestaltend',
    title: { de: 'Die gestaltende Kraft', en: 'The Shaping Force' },
    essence: {
      de: 'Du wirkst am stärksten, wenn du an der Wurzel ansetzt, dort, wo eine Veränderung viele trägt.',
      en: 'You have the most impact at the root, where one change carries many.',
    },
    description: {
      de: 'Du denkst in Strukturen, nicht in Einzelfällen. Wo andere ein Symptom lindern, fragst du, warum es überhaupt entsteht. Das macht deine Wirkung leise, aber weitreichend.',
      en: 'You think in structures, not in isolated cases. Where others ease a symptom, you ask why it arises at all. That makes your impact quiet, but far-reaching.',
    },
    strengths: {
      de: ['Denkt langfristig', 'Sieht das System', 'Geduldig mit großen Hebeln'],
      en: ['Thinks long-term', 'Sees the system', 'Patient with big levers'],
    },
    approach: {
      de: 'Dir liegen Projekte, die Chancen schaffen und Ursachen angehen und belegen können, dass ihr Ansatz wirklich trägt.',
      en: 'You favour projects that create opportunity and tackle root causes, and can prove their approach truly holds.',
    },
  },
  langerAtem: {
    key: 'langerAtem',
    title: { de: 'Der lange Atem', en: 'The Long Game' },
    essence: {
      de: 'Deine Wirkung entsteht nicht aus dem Moment, sondern aus der Beständigkeit.',
      en: 'Your impact comes not from the moment, but from constancy.',
    },
    description: {
      de: 'Du vertraust dem, was bleibt. Nicht die große Geste überzeugt dich, sondern die ruhige Verlässlichkeit, über Jahre dasselbe zu stützen. So wächst etwas, das hält.',
      en: 'You trust what endures. It is not the grand gesture that convinces you, but the quiet reliability of supporting the same thing for years. That is how something lasting grows.',
    },
    strengths: {
      de: ['Verlässlich', 'Wertet Nachhaltigkeit', 'Bleibt, wenn andere gehen'],
      en: ['Reliable', 'Values sustainability', 'Stays when others leave'],
    },
    approach: {
      de: 'Zu dir passen Vorhaben, die über Jahre gedacht sind: Wälder, die wachsen, Begleitungen, die nicht abreißen.',
      en: 'You suit causes built to last for years: forests that grow, support that never breaks off.',
    },
  },
  offeneHand: {
    key: 'offeneHand',
    title: { de: 'Die offene Hand', en: 'The Open Hand' },
    essence: {
      de: 'Aus deinem Beitrag soll etwas Größeres werden, getragen von mehr als nur dir.',
      en: 'Your contribution should become something larger, carried by more than just you.',
    },
    description: {
      de: 'Du gibst nicht für dich allein. Dich reizt der Gedanke, andere mitzunehmen und gemeinsam mehr zu bewegen, als einer es je könnte. Wirkung ist für dich auch Verbindung.',
      en: 'You do not give for yourself alone. You are drawn to bringing others along and moving more together than anyone could alone. For you, impact is also connection.',
    },
    strengths: {
      de: ['Verbindet Menschen', 'Denkt in Gemeinschaft', 'Multipliziert Wirkung'],
      en: ['Connects people', 'Thinks in community', 'Multiplies impact'],
    },
    approach: {
      de: 'Du blühst auf, wenn du deinen Kreis einlädst: Familie und Freunde, die mit dir an einer gemeinsamen Sache bauen.',
      en: 'You thrive when you invite your circle: family and friends building a shared cause with you.',
    },
  },
  wacherBlick: {
    key: 'wacherBlick',
    title: { de: 'Der wache Blick', en: 'The Clear Eye' },
    essence: {
      de: 'Du gibst mit offenen Augen und willst genau sehen, was dein Geld bewegt.',
      en: 'You give with open eyes and want to see exactly what your money moves.',
    },
    description: {
      de: 'Vertrauen ist gut, Nachvollziehbarkeit ist dir lieber. Du erkennst gute Arbeit am Wie, nicht nur am Was, und triffst deine Entscheidungen klar und unsentimental.',
      en: 'Trust is good, traceability is better. You recognise good work by the how, not just the what, and make your decisions clearly and without sentiment.',
    },
    strengths: {
      de: ['Prüft genau', 'Entscheidet klar', 'Schätzt Transparenz'],
      en: ['Scrutinises closely', 'Decides clearly', 'Values transparency'],
    },
    approach: {
      de: 'Für dich zählen geprüfte Projekte mit belegter Wirkung und das Versprechen, regelmäßig zu zeigen, was passiert ist.',
      en: 'What counts for you is vetted projects with proven impact, and the promise to show, regularly, what happened.',
    },
  },
  weitesHerz: {
    key: 'weitesHerz',
    title: { de: 'Das weite Herz', en: 'The Wide Heart' },
    essence: {
      de: 'Dich bewegt der einzelne Mensch: eine Geschichte sagt dir mehr als jede Statistik.',
      en: 'You are moved by the individual: one story tells you more than any statistic.',
    },
    description: {
      de: 'Du willst Nähe, kein Abstraktum. Lieber hilfst du einem Menschen ganz als vielen ein wenig. Diese Wärme ist keine Schwäche. Sie ist der Grund, warum deine Wirkung ankommt.',
      en: 'You want closeness, not abstraction. You would rather help one person fully than many a little. That warmth is no weakness. It is why your impact lands.',
    },
    strengths: {
      de: ['Empathisch', 'Sieht den Einzelnen', 'Bleibt menschlich'],
      en: ['Empathetic', 'Sees the individual', 'Stays human'],
    },
    approach: {
      de: 'Dich erreichen Projekte mit einem klaren Gesicht: ein Kind, eine Familie, ein konkretes Leben, das sich verändert.',
      en: 'You are reached by projects with a clear face: a child, a family, one concrete life that changes.',
    },
  },
};

/** Antworten -> Themen-Gewichte + Archetyp-Gewichte. */
export function scoreQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string[]>
): { themes: Record<CategoryKey, number>; arch: Record<ArchetypeKey, number> } {
  const themes = {
    bildung: 0,
    umwelt: 0,
    soziales: 0,
    tierschutz: 0,
    sport: 0,
    kultur: 0,
    gesundheit: 0,
  } as Record<CategoryKey, number>;
  const arch = {
    gestaltend: 0,
    langerAtem: 0,
    offeneHand: 0,
    wacherBlick: 0,
    weitesHerz: 0,
  } as Record<ArchetypeKey, number>;

  for (const q of questions) {
    const picked = answers[q.id] ?? [];
    for (const opt of q.options) {
      if (!picked.includes(opt.id)) continue;
      if (opt.themes) {
        for (const [k, v] of Object.entries(opt.themes)) themes[k as CategoryKey] += v ?? 0;
      }
      if (opt.arch) {
        for (const [k, v] of Object.entries(opt.arch)) arch[k as ArchetypeKey] += v ?? 0;
      }
    }
  }
  return { themes, arch };
}

/** Reichweite-Antwort → bevorzugter Wirkungsraum (oder keine Präferenz). */
export function deriveScope(answers: Record<string, string[]>): Scope | null {
  const reach = answers['reach']?.[0];
  if (reach === 'global') return 'international';
  if (reach === 'local' || reach === 'national') return 'deutschland';
  return null;
}

export function deriveProfile(
  questions: QuizQuestion[],
  answers: Record<string, string[]>
): { topThemes: CategoryKey[]; archetype: Archetype; scope: Scope | null } {
  const { themes, arch } = scoreQuiz(questions, answers);

  const topThemes = (Object.entries(themes) as [CategoryKey, number][])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k);

  const archKey = (Object.entries(arch) as [ArchetypeKey, number][]).sort(
    (a, b) => b[1] - a[1]
  )[0][0];

  return {
    topThemes: topThemes.length ? topThemes : ['bildung', 'umwelt'],
    archetype: ARCHETYPES[archKey],
    scope: deriveScope(answers),
  };
}
