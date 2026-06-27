import type { QuizQuestion } from './types';

/**
 * 6 Fragen: ruhig, erwachsen, schnell. Jede Antwort gewichtet Themen
 * und/oder eine Haltung (Archetyp). Kein Formular, kein Quatsch.
 */
export const QUIZ: QuizQuestion[] = [
  {
    id: 'world',
    kicker: { de: 'Frage 1 von 6', en: 'Question 1 of 6' },
    question: { de: 'Welche Welt willst du hinterlassen?', en: 'What kind of world do you want to leave behind?' },
    helper: { de: 'Wähle, was dir am nächsten kommt.', en: 'Choose what comes closest to you.' },
    type: 'single',
    options: [
      {
        id: 'fair',
        label: {
          de: 'Eine, in der Herkunft nicht über Zukunft entscheidet',
          en: 'One where origin does not decide your future',
        },
        symbol: 'book.closed.fill',
        themes: { bildung: 3, soziales: 2 },
        arch: { gestaltend: 2, wacherBlick: 1 },
      },
      {
        id: 'intact',
        label: {
          de: 'Eine, die für die nach uns noch intakt ist',
          en: 'One still intact for those who come after us',
        },
        symbol: 'leaf.fill',
        themes: { umwelt: 3, tierschutz: 1 },
        arch: { langerAtem: 2, gestaltend: 1 },
      },
      {
        id: 'warm',
        label: { de: 'Eine, in der niemand übersehen wird', en: 'One where no one is overlooked' },
        symbol: 'hands.sparkles.fill',
        themes: { soziales: 3, gesundheit: 2 },
        arch: { weitesHerz: 2, offeneHand: 1 },
      },
      {
        id: 'alive',
        label: {
          de: 'Eine, die lebendig, mutig und kreativ bleibt',
          en: 'One that stays alive, bold and creative',
        },
        symbol: 'theatermasks.fill',
        themes: { kultur: 3, sport: 1 },
        arch: { offeneHand: 1, weitesHerz: 1 },
      },
    ],
  },
  {
    id: 'themes',
    kicker: { de: 'Frage 2 von 6', en: 'Question 2 of 6' },
    question: { de: 'Wofür schlägt dein Herz?', en: 'What does your heart beat for?' },
    helper: {
      de: 'Wähle bis zu drei. Hier zählt dein Bauchgefühl.',
      en: 'Pick up to three. Go with your gut.',
    },
    type: 'multi',
    min: 1,
    max: 3,
    options: [
      { id: 'bildung', label: { de: 'Bildung & Chancen', en: 'Education & Opportunity' }, symbol: 'book.closed.fill', themes: { bildung: 3 } },
      { id: 'umwelt', label: { de: 'Umwelt & Klima', en: 'Environment & Climate' }, symbol: 'leaf.fill', themes: { umwelt: 3 } },
      { id: 'soziales', label: { de: 'Soziales & Zusammenhalt', en: 'Society & Solidarity' }, symbol: 'hands.sparkles.fill', themes: { soziales: 3 } },
      { id: 'tierschutz', label: { de: 'Tierschutz', en: 'Animal Welfare' }, symbol: 'pawprint.fill', themes: { tierschutz: 3 } },
      { id: 'sport', label: { de: 'Sport & Jugend', en: 'Sport & Youth' }, symbol: 'figure.run', themes: { sport: 3 } },
      { id: 'kultur', label: { de: 'Kultur & Kreativität', en: 'Culture & Creativity' }, symbol: 'theatermasks.fill', themes: { kultur: 3 } },
      { id: 'gesundheit', label: { de: 'Gesundheit & Würde', en: 'Health & Dignity' }, symbol: 'heart.fill', themes: { gesundheit: 3 } },
    ],
  },
  {
    id: 'how',
    kicker: { de: 'Frage 3 von 6', en: 'Question 3 of 6' },
    question: { de: 'Wie willst du wirken?', en: 'How do you want to make a difference?' },
    type: 'single',
    options: [
      {
        id: 'structure',
        label: {
          de: 'An der Wurzel: Strukturen, die vielen helfen',
          en: 'At the root: structures that help many',
        },
        desc: {
          de: 'Lieber das System verändern als das Symptom lindern.',
          en: 'Rather change the system than ease the symptom.',
        },
        arch: { gestaltend: 3 },
      },
      {
        id: 'person',
        label: {
          de: 'Ganz nah am Menschen: eine Geschichte nach der anderen',
          en: 'Close to people: one story at a time',
        },
        desc: {
          de: 'Lieber einem Menschen ganz helfen als vielen ein bisschen.',
          en: 'Rather help one person fully than many a little.',
        },
        arch: { weitesHerz: 3 },
      },
      {
        id: 'steady',
        label: {
          de: 'Verlässlich: über Jahre dasselbe stützen',
          en: 'Reliably: supporting the same thing for years',
        },
        desc: {
          de: 'Wirkung entsteht durch Beständigkeit, nicht durch Aktionismus.',
          en: 'Impact comes from constancy, not from frenzy.',
        },
        arch: { langerAtem: 3 },
      },
      {
        id: 'together',
        label: { de: 'Gemeinsam: andere mit ins Boot holen', en: 'Together: bringing others on board' },
        desc: {
          de: 'Aus meinem Beitrag soll etwas Größeres werden.',
          en: 'My contribution should become something larger.',
        },
        arch: { offeneHand: 3 },
      },
    ],
  },
  {
    id: 'reach',
    kicker: { de: 'Frage 4 von 6', en: 'Question 4 of 6' },
    question: { de: 'Wo soll deine Wirkung ankommen?', en: 'Where should your impact land?' },
    type: 'single',
    options: [
      {
        id: 'local',
        label: { de: 'In meiner Nähe: wo ich es sehen kann', en: 'Near me: where I can see it' },
        themes: { soziales: 1, sport: 1, kultur: 1 },
        arch: { weitesHerz: 1, offeneHand: 1 },
      },
      {
        id: 'national',
        label: {
          de: 'In Deutschland: wo strukturell viel kippt',
          en: 'In Germany: where much is structurally at stake',
        },
        themes: { bildung: 1, soziales: 1 },
        arch: { gestaltend: 1, wacherBlick: 1 },
      },
      {
        id: 'global',
        label: { de: 'Global: bei den großen Linien wie Klima', en: 'Globally: on the big issues like climate' },
        themes: { umwelt: 2 },
        arch: { gestaltend: 1, langerAtem: 1 },
      },
      {
        id: 'open',
        label: { de: 'Da, wo es am dringendsten gebraucht wird', en: 'Wherever it is needed most urgently' },
        themes: { gesundheit: 1, soziales: 1 },
        arch: { wacherBlick: 2 },
      },
    ],
  },
  {
    id: 'proof',
    kicker: { de: 'Frage 5 von 6', en: 'Question 5 of 6' },
    question: { de: 'Was überzeugt dich, dass es wirkt?', en: 'What convinces you that it works?' },
    type: 'single',
    options: [
      {
        id: 'numbers',
        label: { de: 'Belege und geprüfte Zahlen', en: 'Evidence and verified numbers' },
        desc: {
          de: 'Ich will nachvollziehen können, wo jeder Euro landet.',
          en: 'I want to trace where every euro lands.',
        },
        arch: { wacherBlick: 3 },
      },
      {
        id: 'faces',
        label: { de: 'Echte Geschichten von echten Menschen', en: 'Real stories from real people' },
        desc: {
          de: 'Ein Gesicht sagt mir mehr als jede Statistik.',
          en: 'One face tells me more than any statistic.',
        },
        arch: { weitesHerz: 2, offeneHand: 1 },
      },
      {
        id: 'longterm',
        label: { de: 'Dass es in zehn Jahren noch da ist', en: 'That it is still there in ten years' },
        desc: {
          de: 'Nachhaltigkeit überzeugt mich mehr als schnelle Erfolge.',
          en: 'Durability convinces me more than quick wins.',
        },
        arch: { langerAtem: 3 },
      },
      {
        id: 'design',
        label: { de: 'Ein durchdachtes, sauber gebautes Vorgehen', en: 'A considered, cleanly built approach' },
        desc: {
          de: 'Ich erkenne gute Arbeit am Wie, nicht nur am Was.',
          en: 'I recognise good work by the how, not just the what.',
        },
        arch: { gestaltend: 2, wacherBlick: 1 },
      },
    ],
  },
  {
    id: 'legacy',
    kicker: { de: 'Frage 6 von 6', en: 'Question 6 of 6' },
    question: { de: 'Was soll von deinem Engagement bleiben?', en: 'What should remain of your commitment?' },
    type: 'single',
    options: [
      {
        id: 'opportunity',
        label: {
          de: 'Dass Menschen Chancen hatten, die sie sonst nie bekommen hätten',
          en: 'That people had chances they would never have had otherwise',
        },
        themes: { bildung: 2, soziales: 1 },
        arch: { gestaltend: 1, weitesHerz: 1 },
      },
      {
        id: 'nature',
        label: { de: 'Etwas Lebendiges, das weiterwächst', en: 'Something living that keeps growing' },
        themes: { umwelt: 2, tierschutz: 1 },
        arch: { langerAtem: 2 },
      },
      {
        id: 'community',
        label: { de: 'Ein Kreis von Menschen, der etwas trägt', en: 'A circle of people that carries something' },
        themes: { soziales: 1, kultur: 1 },
        arch: { offeneHand: 3 },
      },
      {
        id: 'dignity',
        label: { de: 'Dass Menschen in Würde begleitet wurden', en: 'That people were accompanied with dignity' },
        themes: { gesundheit: 2, soziales: 1 },
        arch: { weitesHerz: 2 },
      },
    ],
  },
];
