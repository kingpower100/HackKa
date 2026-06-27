import { getProject } from './projects';
import type { ImpactCard, ImpactMoment } from './types';
import { tr, plural } from '@/i18n/translate';
import type { Lang, Localized } from '@/i18n/types';

/**
 * Der monatliche Impact-Moment wird aus den tatsächlich gewählten Projekten
 * gebaut: ein konkretes Gesicht im Mittelpunkt, gebündelt über alle Projekte.
 * Belohnt wird Wachstum & Reflexion, nie die Höhe der Beträge.
 */

type HeroBeat = {
  name: string;
  age?: number;
  line: Localized;
  initials: string;
  headline: Localized;
};

const HERO_BEATS: Record<string, HeroBeat> = {
  aufwind: {
    name: 'Aylin',
    age: 8,
    initials: 'AY',
    headline: {
      de: 'Aylin hat zum ersten Mal eine Eins geschrieben.',
      en: 'Aylin got her first top grade.',
    },
    line: {
      de: 'Ihre Lernbegleiterin Mara sagt: „Sie hat das Heft drei Tage nicht aus der Hand gelegt.“ Dein Beitrag hat dieses Jahr mitgetragen.',
      en: 'Her learning mentor Mara says: “She didn’t put the workbook down for three days.” Your contribution helped carry this year.',
    },
  },
  codemorgen: {
    name: 'Leyla',
    age: 15,
    initials: 'LE',
    headline: {
      de: 'Leyla hat ihre erste App veröffentlicht.',
      en: 'Leyla published her first app.',
    },
    line: {
      de: 'Eine kleine App, die ihrer Oma die Medikamente sortiert. „Ich wusste nicht, dass ich sowas kann.“',
      en: 'A small app that sorts her grandmother’s medication. “I didn’t know I could do something like this.”',
    },
  },
  anpfiff: {
    name: 'Yusuf',
    age: 13,
    initials: 'YU',
    headline: {
      de: 'Yusuf ist diesen Monat zu jedem Training gekommen.',
      en: 'Yusuf came to every training session this month.',
    },
    line: {
      de: 'Sein Trainer Mehmet: „Er hat angefangen, den Kleinen zu helfen. Aus einem Mitläufer ist ein Vorbild geworden.“',
      en: 'His coach Mehmet: “He started helping the younger ones. A follower has become a role model.”',
    },
  },
  herzschlag: {
    name: 'Familie Brandt',
    initials: 'FB',
    headline: {
      de: 'Herr Brandt konnte zu Hause Abschied nehmen.',
      en: 'Mr Brandt was able to say goodbye at home.',
    },
    line: {
      de: 'Eine Begleiterin war in den letzten Wochen da, Tag und Nacht erreichbar. „Wir mussten nie allein entscheiden.“',
      en: 'A companion was there in the final weeks, reachable day and night. “We never had to decide alone.”',
    },
  },
  waldlokal: {
    name: 'Förster Jonas',
    initials: 'JO',
    headline: {
      de: 'Auf einer kahlen Fläche im Harz wächst wieder Wald.',
      en: 'A forest is growing again on a bare patch in the Harz.',
    },
    line: {
      de: '4.200 junge Bäume, zehn Arten, GPS-dokumentiert. „In fünf Jahren hört man hier wieder Vögel.“',
      en: '4,200 young trees, ten species, GPS-documented. “In five years you’ll hear birds here again.”',
    },
  },
  meeresweit: {
    name: 'Thore',
    initials: 'TH',
    headline: {
      de: 'Ein 80 Meter langes Geisternetz ist aus der Nordsee raus.',
      en: 'An 80-metre ghost net is out of the North Sea.',
    },
    line: {
      de: 'Es hätte Jahrhunderte dort gelegen. „Da hingen noch Krebse drin, die wir freigelassen haben.“',
      en: 'It would have lain there for centuries. “There were still crabs caught in it that we set free.”',
    },
  },
  buehnefrei: {
    name: 'Samuel',
    age: 17,
    initials: 'SA',
    headline: {
      de: 'Samuel stand zum ersten Mal allein auf der Bühne.',
      en: 'Samuel stood on stage alone for the first time.',
    },
    line: {
      de: 'Fünf Minuten Monolog, kein Stottern. „Danach haben fremde Leute geklatscht. Für mich.“',
      en: 'A five-minute monologue, no stutter. “Afterwards, strangers applauded. For me.”',
    },
  },
  tafelplus: {
    name: 'Rosa',
    age: 71,
    initials: 'RO',
    headline: {
      de: 'Rosa kocht jetzt selbst in der Nachbarschaftsküche mit.',
      en: 'Rosa now cooks in the neighbourhood kitchen herself.',
    },
    line: {
      de: 'Aus dem Stammgast ist eine Helferin geworden. „Ich werde wieder gebraucht. Das hatte ich lange nicht.“',
      en: 'A regular guest has become a helper. “I’m needed again. I hadn’t felt that in a long time.”',
    },
  },
  ankommen: {
    name: 'Amir',
    age: 24,
    initials: 'AM',
    headline: {
      de: 'Amir hat seinen Ausbildungsvertrag unterschrieben.',
      en: 'Amir signed his apprenticeship contract.',
    },
    line: {
      de: 'Pflege, dritter Versuch, diesmal mit Mentorin an der Seite. „Sie hat an mich geglaubt, bevor ich es selbst tat.“',
      en: 'Nursing, third attempt, this time with a mentor by his side. “She believed in me before I did.”',
    },
  },
  pfotenheim: {
    name: 'Greta',
    initials: 'GR',
    headline: {
      de: 'Greta hat den Winter gut überstanden.',
      en: 'Greta came through the winter well.',
    },
    line: {
      de: 'Die gerettete Kuh wird im Sommer 20. „Sie steht jeden Morgen am Tor und wartet auf ihre Streicheleinheit.“',
      en: 'The rescued cow turns 20 this summer. “Every morning she stands at the gate waiting for her cuddle.”',
    },
  },
  brueckenkopf: {
    name: 'Amir',
    age: 24,
    initials: 'AM',
    headline: {
      de: 'Amir hat seinen Ausbildungsvertrag unterschrieben.',
      en: 'Amir signed his apprenticeship contract.',
    },
    line: {
      de: 'Pflege, dritter Versuch, diesmal mit Mentorin an der Seite. „Sie hat an mich geglaubt, bevor ich es selbst tat.“',
      en: 'Nursing, third attempt, this time with a mentor by his side. “She believed in me before I did.”',
    },
  },
};

export function buildImpactMoment(
  projectIds: string[],
  month: string,
  monthsActive: number,
  totalGiven: number,
  lang: Lang
): ImpactMoment {
  const ids = projectIds.length ? projectIds : ['aufwind'];
  const cards: ImpactCard[] = [];

  cards.push({
    id: 'intro',
    kind: 'intro',
    kicker: month,
    headline:
      lang === 'en' ? 'This is what your money\ndid this month.' : 'Das hat dein Geld\ndiesen Monat bewirkt.',
    body:
      lang === 'en'
        ? `Across ${ids.length} ${plural(lang, ids.length, { de: ['Projekt', 'Projekte'], en: ['project', 'projects'] })}: here are the moments behind it.`
        : `Über ${ids.length} ${plural(lang, ids.length, { de: ['Projekt', 'Projekte'], en: ['project', 'projects'] })} hinweg: hier sind die Momente dahinter.`,
  });

  // Ein Gesicht im Mittelpunkt + je eine Geschichte pro weiterem Projekt.
  // Für kuratierte Projekte gibt es einen HERO_BEAT; sonst wird aus dem
  // Projekt-Helden eine stimmige Geschichte synthetisiert.
  ids.forEach((id, i) => {
    const project = getProject(id);
    if (!project) return;
    const beat = HERO_BEATS[id];
    const fallbackHeadline =
      lang === 'en'
        ? `This is what ${tr(project.name, lang)} made possible.`
        : `Das hat ${tr(project.name, lang)} möglich gemacht.`;
    cards.push({
      id: `story-${id}`,
      kind: 'story',
      category: project.category,
      kicker: i === 0 ? (lang === 'en' ? 'In focus' : 'Im Mittelpunkt') : tr(project.name, lang),
      headline: beat ? tr(beat.headline, lang) : fallbackHeadline,
      body: beat ? tr(beat.line, lang) : tr(project.hero.line, lang),
      hero: {
        name: beat ? beat.name : project.hero.name,
        age: beat?.age,
        line: tr(project.location, lang),
        initials: beat ? beat.initials : project.hero.initials,
      },
    });
  });

  // Konkreter Gegenwert, gebündelt.
  const first = getProject(ids[0]);
  if (first) {
    cards.push({
      id: 'stat',
      kind: 'stat',
      category: first.category,
      kicker: lang === 'en' ? 'Concrete' : 'Konkret',
      headline: lang === 'en' ? 'Made tangible' : 'Greifbar gemacht',
      metric: {
        value: `${Math.max(1, Math.round(totalGiven / first.impact.per))}×`,
        label: tr(first.impact.unitPlural, lang),
      },
      body:
        lang === 'en'
          ? `Your contribution so far, translated into ${tr(first.org, lang)}.`
          : `Dein bisheriger Beitrag, übersetzt in ${tr(first.org, lang)}.`,
    });
  }

  // Wachstum, Reflexion, keine Beträge im Wettbewerb.
  cards.push({
    id: 'growth',
    kind: 'growth',
    kicker: lang === 'en' ? 'Your journey' : 'Deine Entwicklung',
    headline: lang === 'en' ? 'How your impact has grown.' : 'So ist deine Wirkung gewachsen.',
    body:
      lang === 'en'
        ? 'Not how much, but how steadily. That is what counts.'
        : 'Nicht wie viel, sondern wie beständig. Das ist, was zählt.',
    bars: buildGrowthBars(monthsActive),
  });

  cards.push({
    id: 'outro',
    kind: 'outro',
    kicker: lang === 'en' ? 'Until next month' : 'Bis nächsten Monat',
    headline: lang === 'en' ? 'It continues.' : 'Es geht weiter.',
    body:
      lang === 'en'
        ? 'New updates arrive as soon as the projects report back. You’ll be the first to know.'
        : 'Neue Updates kommen, sobald die Projekte berichten. Du wirst es als Erste:r erfahren.',
  });

  return {
    id: `moment-${month}`,
    month,
    title: lang === 'en' ? 'Your impact moment' : 'Dein Impact-Moment',
    cards,
  };
}

function buildGrowthBars(monthsActive: number): { label: string; value: number }[] {
  const labels = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
  const n = Math.max(2, Math.min(6, monthsActive || 3));
  return labels.slice(0, n).map((label, i) => ({
    label,
    value: 0.35 + (i / Math.max(1, n - 1)) * 0.6,
  }));
}
