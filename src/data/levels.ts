import type { Stage } from './types';

/**
 * Identitäts-Entwicklung, kein Upsell. Jede Stufe ist ein neues Selbstbild,
 * nie ein Verkaufsargument. Wachstum wird belohnt, nie die Höhe der Beträge.
 */
export const STAGES: Stage[] = [
  {
    level: 0,
    title: { de: 'Beobachter:in', en: 'Observer' },
    identity: {
      de: 'Du hast hingeschaut. Das ist der Anfang von allem.',
      en: 'You looked closely. That is where everything begins.',
    },
    unlock: { de: 'Profil entdeckt', en: 'Profile discovered' },
  },
  {
    level: 1,
    title: { de: 'Unterstützer:in', en: 'Supporter' },
    identity: {
      de: 'Du gibst, und es wirkt. Ab jetzt bist du Teil von etwas.',
      en: 'You give, and it works. From now on you are part of something.',
    },
    unlock: { de: 'Erster Beitrag', en: 'First contribution' },
  },
  {
    level: 2,
    title: { de: 'Förder:in', en: 'Patron' },
    identity: {
      de: 'Du trägst mehrere Vorhaben. Aus Geben ist Haltung geworden.',
      en: 'You carry several causes. Giving has become a stance.',
    },
    unlock: {
      de: 'Mehrere Projekte oder 3 Monate dabei',
      en: 'Several projects or 3 months in',
    },
  },
  {
    level: 3,
    title: { de: 'Gestalter:in', en: 'Shaper' },
    identity: {
      de: 'Du hast deiner Wirkung einen Namen gegeben. Sie gehört jetzt dir.',
      en: 'You gave your impact a name. It belongs to you now.',
    },
    unlock: { de: 'Eigenen Impact-Fonds gegründet', en: 'Own impact fund started' },
  },
  {
    level: 4,
    title: { de: 'Wegbereiter:in', en: 'Trailblazer' },
    identity: {
      de: 'Du bewegst nicht mehr allein. Dein Kreis trägt mit.',
      en: 'You no longer move alone. Your circle carries it with you.',
    },
    unlock: { de: 'Kreis eingeladen', en: 'Circle invited' },
  },
];

export function stageForLevel(level: number): Stage {
  return STAGES[Math.min(level, STAGES.length - 1)];
}
