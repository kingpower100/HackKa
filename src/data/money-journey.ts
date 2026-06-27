import { tr } from '@/i18n/translate';
import type { Lang } from '@/i18n/types';
import type { State } from '@/store/app-store';

/**
 * Der „Wo ist mein Geld"-Verlauf: eine ruhige Status-Timeline, die rein aus dem
 * vorhandenen State abgeleitet wird (kein Datum, keine Transaktion, kein Backend).
 * Belohnt wird Transparenz, nicht die Höhe der Beträge: bewusst ohne Euro-Zahlen.
 *
 * Wird nur aufgerufen, wenn das Projekt dem Nutzer gehört (Aufrufer prüft das),
 * also ist das Geld per Definition committet: Schritte 1 bis 3 sind immer erledigt.
 */

export type JourneyStatus = 'done' | 'current' | 'upcoming';

export type JourneyStep = {
  key: 'transferred' | 'held' | 'assigned' | 'arrived' | 'working';
  title: string;
  desc: string;
  status: JourneyStatus;
};

export function buildMoneyJourney(state: State, lang: Lang): JourneyStep[] {
  // Nach der ersten bestätigten Zahlung (confirmGive/advanceMonth) ist das Geld
  // einen Zyklus „angekommen". Davor steht Schritt 4 als aktueller Schritt.
  const arrivedDone = state.monthsActive >= 1;

  const steps: JourneyStep[] = [
    {
      key: 'transferred',
      title: tr({ de: 'Überwiesen', en: 'Transferred' }, lang),
      desc: tr(
        {
          de: 'Dein Beitrag hat dein Konto verlassen und ist bei Mosaik eingegangen.',
          en: 'Your contribution left your account and arrived at Mosaik.',
        },
        lang
      ),
      status: 'done',
    },
    {
      key: 'held',
      title: tr({ de: 'Treuhänderisch sicher verwahrt', en: 'Held safely in trust' }, lang),
      desc: tr(
        {
          de: 'Beim regulierten Partner verwahrt. Auszahlung und Änderung jederzeit.',
          en: 'Held with the regulated partner. Payout and changes any time.',
        },
        lang
      ),
      status: 'done',
    },
    {
      key: 'assigned',
      title: tr({ de: 'Diesem Projekt zugewiesen', en: 'Assigned to this project' }, lang),
      desc: tr(
        {
          de: 'Dein Beitrag ist fest diesem Projekt zugeordnet.',
          en: 'Your contribution is firmly assigned to this project.',
        },
        lang
      ),
      status: 'done',
    },
    {
      key: 'arrived',
      title: tr({ de: 'Beim Projekt angekommen', en: 'Arrived at the project' }, lang),
      desc: tr(
        {
          de: 'Das Geld ist beim Träger angekommen und wird eingesetzt.',
          en: 'The money has reached the project partner and is being put to work.',
        },
        lang
      ),
      status: arrivedDone ? 'done' : 'current',
    },
    {
      key: 'working',
      title: tr({ de: 'Wirkt jetzt', en: 'Working now' }, lang),
      desc: tr(
        {
          de: 'Dein Beitrag wirkt bereits konkret vor Ort.',
          en: 'Your contribution is already having concrete impact on the ground.',
        },
        lang
      ),
      status: arrivedDone ? 'current' : 'upcoming',
    },
  ];

  return steps;
}
