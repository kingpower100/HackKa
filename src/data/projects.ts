import type { Project, Scope } from './types';

/**
 * Geprüfte Projekte. Jedes hat ein konkretes Gesicht, einen Ort und ein
 * "Verifiziert"-Siegel samt Update-Versprechen. Bewusst keine Foto-Assets:
 * Helden werden als Monogramm in der Themenfarbe dargestellt.
 *
 * Pro Thema gibt es mehrere Projekte, in Deutschland UND international, damit
 * Vorschläge wirklich zur Quiz-Wahl passen (Thema + Reichweite).
 */
export const PROJECTS: Project[] = [
  /* ----------------------------------------------------------- Bildung */
  {
    id: 'aufwind',
    name: { de: 'Aufwind', en: 'Aufwind' },
    org: { de: 'Aufwind Lernhäuser e. V.', en: 'Aufwind Lernhäuser e. V.' },
    category: 'bildung',
    location: { de: 'Berlin-Neukölln', en: 'Berlin-Neukölln' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Aylin',
      role: { de: '8 Jahre, Lernhaus Sonnenallee', en: 'age 8, Sonnenallee learning house' },
      initials: 'AY',
      line: {
        de: 'Vor einem Jahr hat Aylin den Unterricht kaum verstanden. Heute meldet sie sich als Erste.',
        en: 'A year ago, Aylin barely understood her lessons. Today she is the first to raise her hand.',
      },
    },
    tagline: {
      de: 'Lernbegleitung für Kinder, deren Eltern keine Nachhilfe zahlen können.',
      en: 'Learning support for children whose parents can’t afford tutoring.',
    },
    about: {
      de: 'In acht Lernhäusern bekommen Grundschulkinder kostenlose, persönliche Begleitung von Menschen, die bleiben. Kein Frontalunterricht, sondern eine feste Bezugsperson über Jahre.',
      en: 'Across eight learning houses, primary-school children receive free, personal support from people who stay. No lecturing from the front, but one trusted person over years.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 50,
      unit: { de: 'Monat Lernbegleitung', en: 'month of learning support' },
      unitPlural: { de: 'Monate Lernbegleitung', en: 'months of learning support' },
      icon: 'book.fill',
    },
    proof: {
      de: [
        '92 % der begleiteten Kinder schaffen den Übergang aufs Gymnasium oder die Realschule',
        'Geprüft vom DZI Spenden-Siegel',
        'Jeder Euro ist bis zum Lernhaus nachverfolgbar',
      ],
      en: [
        '92% of the children supported go on to secondary school',
        'Vetted by the DZI donation seal',
        'Every euro is traceable down to the learning house',
      ],
    },
    recipients: { de: '640 Kinder in 8 Lernhäusern', en: '640 children across 8 learning houses' },
    founded: '2014',
  },
  {
    id: 'codemorgen',
    name: { de: 'Code für Morgen', en: 'Code für Morgen' },
    org: { de: 'Code für Morgen gUG', en: 'Code für Morgen gUG' },
    category: 'bildung',
    location: { de: 'Leipzig & online', en: 'Leipzig & online' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Leyla',
      role: { de: '15 Jahre, Coding-Club Leipzig', en: 'age 15, Leipzig coding club' },
      initials: 'LE',
      line: {
        de: '„Ich dachte, Programmieren ist nichts für mich. Jetzt baue ich eine App für meine Oma.“',
        en: '„I thought coding wasn’t for me. Now I’m building an app for my grandma.“',
      },
    },
    tagline: {
      de: 'Digitale Bildung für Mädchen, die sonst keinen Zugang dazu hätten.',
      en: 'Digital education for girls who would otherwise have no way in.',
    },
    about: {
      de: 'Kostenlose Coding-Clubs an Schulen in strukturschwachen Regionen, geleitet von Mentorinnen aus der Tech-Branche. Laptops inklusive, Vorkenntnisse nicht nötig.',
      en: 'Free coding clubs at schools in underserved regions, led by women mentors from the tech industry. Laptops included, no prior knowledge needed.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 80,
      unit: { de: 'Club-Halbjahr für eine Schülerin', en: 'club term for one girl' },
      unitPlural: { de: 'Club-Halbjahre für Schülerinnen', en: 'club terms for girls' },
      icon: 'laptopcomputer',
    },
    proof: {
      de: [
        '1.400 Mädchen in 60 Clubs erreicht',
        '70 ehrenamtliche Mentorinnen',
        'Wirkungsbericht jährlich extern geprüft',
      ],
      en: [
        '1,400 girls reached across 60 clubs',
        '70 volunteer women mentors',
        'Impact report independently audited each year',
      ],
    },
    recipients: { de: '1.400 Schülerinnen bundesweit', en: '1,400 girls nationwide' },
    founded: '2018',
  },
  {
    id: 'lesefuechse',
    name: { de: 'Lesefüchse', en: 'Lesefüchse' },
    org: { de: 'Lesefüchse Köln e. V.', en: 'Lesefüchse Köln e. V.' },
    category: 'bildung',
    location: { de: 'Köln', en: 'Cologne' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Deniz',
      role: { de: '7 Jahre, Leseclub Mülheim', en: 'age 7, Mülheim reading club' },
      initials: 'DZ',
      line: {
        de: '„Erst war Lesen nur anstrengend. Jetzt liest Deniz seiner kleinen Schwester vor.“',
        en: '„Reading used to be nothing but a struggle. Now Deniz reads aloud to his little sister.“',
      },
    },
    tagline: {
      de: 'Ehrenamtliche Lesepat:innen, die Kindern das Lesen schenken.',
      en: 'Volunteer reading mentors who give children the gift of reading.',
    },
    about: {
      de: 'Geschulte Freiwillige lesen wöchentlich mit Kindern, denen zu Hause niemand vorliest. Aus Buchstaben wird Freude, und aus Freude eine Bildungschance.',
      en: 'Trained volunteers read each week with children who have no one to read to them at home. Letters become joy, and joy becomes a chance at a good education.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 35,
      unit: { de: 'Monat Lesepatenschaft', en: 'month of reading mentorship' },
      unitPlural: { de: 'Monate Lesepatenschaft', en: 'months of reading mentorship' },
      icon: 'book.fill',
    },
    proof: {
      de: [
        '900 Kinder pro Woche begleitet',
        '320 geschulte Lesepat:innen',
        'Kooperation mit 40 Grundschulen & Bibliotheken',
      ],
      en: [
        '900 children supported every week',
        '320 trained reading mentors',
        'Partnered with 40 primary schools & libraries',
      ],
    },
    recipients: { de: '900 Kinder wöchentlich', en: '900 children every week' },
    founded: '2011',
  },
  {
    id: 'maedchenschule',
    name: { de: 'Awa lernt', en: 'Awa lernt' },
    org: { de: 'Daara Bildungswerk', en: 'Daara Bildungswerk' },
    category: 'bildung',
    location: { de: 'Kaolack, Senegal', en: 'Kaolack, Senegal' },
    scope: 'international',
    country: { de: 'Senegal', en: 'Senegal' },
    hero: {
      name: 'Awa',
      role: { de: '12 Jahre, Schülerin', en: 'age 12, pupil' },
      initials: 'AW',
      line: {
        de: '„Awa sollte verheiratet werden. Heute will sie Lehrerin werden, und ist Klassenbeste.“',
        en: '„Awa was meant to be married off. Today she wants to be a teacher, and tops her class.“',
      },
    },
    tagline: {
      de: 'Schulbildung für Mädchen, die sonst früh verheiratet würden.',
      en: 'Schooling for girls who would otherwise be married off young.',
    },
    about: {
      de: 'Schulgeld, Bücher und ein Wohnheim ermöglichen Mädchen vom Land den Schulbesuch. Sozialarbeiterinnen begleiten die Familien, damit die Mädchen bleiben dürfen.',
      en: 'School fees, books and a boarding house make school possible for girls from rural areas. Social workers stay close to the families so the girls are allowed to remain.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 60,
      unit: { de: 'Schulmonat für ein Mädchen', en: 'school month for one girl' },
      unitPlural: { de: 'Schulmonate für Mädchen', en: 'school months for girls' },
      icon: 'book.fill',
    },
    proof: {
      de: [
        '1.100 Mädchen aktuell in der Schule gehalten',
        '84 % schließen die Mittelstufe ab',
        'Lokale Trägerorganisation, jährlich extern auditiert',
      ],
      en: [
        '1,100 girls currently kept in school',
        '84% complete lower secondary school',
        'Locally run organisation, independently audited each year',
      ],
    },
    recipients: { de: '1.100 Mädchen in 9 Schulen', en: '1,100 girls across 9 schools' },
    founded: '2013',
  },

  /* ------------------------------------------------------------ Umwelt */
  {
    id: 'waldlokal',
    name: { de: 'Waldlokal', en: 'Waldlokal' },
    org: { de: 'Waldlokal gGmbH', en: 'Waldlokal gGmbH' },
    category: 'umwelt',
    location: { de: 'Harz, Niedersachsen', en: 'Harz, Lower Saxony' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Jonas',
      role: { de: 'Förster, Revier Oberharz', en: 'forester, Oberharz district' },
      initials: 'JO',
      line: {
        de: '„Wir pflanzen keinen Baum, der in 30 Jahren wieder kippt. Wir pflanzen einen Wald, der sich selbst trägt.“',
        en: '„We don’t plant a tree that topples again in 30 years. We plant a forest that sustains itself.“',
      },
    },
    tagline: {
      de: 'Klimastabile Mischwälder dort, wo der Borkenkäfer alles genommen hat.',
      en: 'Climate-resilient mixed forests where the bark beetle took everything.',
    },
    about: {
      de: 'Statt schneller Monokultur entstehen artenreiche Wälder mit zehn heimischen Baumarten. Jede Fläche wird zehn Jahre gepflegt und per GPS dokumentiert.',
      en: 'Instead of quick monoculture, diverse forests grow with ten native tree species. Every plot is tended for ten years and documented by GPS.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 12,
      unit: { de: 'gepflanzter Baum', en: 'tree planted' },
      unitPlural: { de: 'gepflanzte Bäume', en: 'trees planted' },
      icon: 'leaf.fill',
    },
    proof: {
      de: [
        '1,2 Mio. Bäume seit 2019 gepflanzt',
        'Jede Pflanzfläche per Geo-Pin öffentlich einsehbar',
        'Wird durch die Landesforst Niedersachsen begleitet',
      ],
      en: [
        '1.2 million trees planted since 2019',
        'Every planting site publicly viewable by geo-pin',
        'Supported by the Lower Saxony state forestry service',
      ],
    },
    recipients: { de: '340 Hektar wiederbewaldete Fläche', en: '340 hectares of reforested land' },
    founded: '2019',
  },
  {
    id: 'meeresweit',
    name: { de: 'Meeresweit', en: 'Meeresweit' },
    org: { de: 'Meeresweit Nordsee gGmbH', en: 'Meeresweit Nordsee gGmbH' },
    category: 'umwelt',
    location: { de: 'Sylt & Nordfriesland', en: 'Sylt & North Frisia' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Thore',
      role: { de: 'Meeresbiologe', en: 'marine biologist' },
      initials: 'TH',
      line: {
        de: '„Jedes Netz, das wir aus dem Wasser holen, hätte 600 Jahre dort gelegen.“',
        en: '„Every net we pull from the water would have lain there for 600 years.“',
      },
    },
    tagline: {
      de: 'Geisternetze und Plastik raus aus der Nordsee, von Menschen, die das Meer kennen.',
      en: 'Ghost nets and plastic out of the North Sea, by people who know the water.',
    },
    about: {
      de: 'Ein Team aus Fischer:innen und Biolog:innen birgt verlorene Netze und Müll, dokumentiert Fundorte und renaturiert Salzwiesen als natürlichen Küstenschutz.',
      en: 'A team of fishers and biologists recovers lost nets and waste, records where they’re found and restores salt marshes as natural coastal protection.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 20,
      unit: { de: 'geborgenes Kilo Meeresmüll', en: 'kilo of marine litter recovered' },
      unitPlural: { de: 'geborgene Kilo Meeresmüll', en: 'kilos of marine litter recovered' },
      icon: 'water.waves',
    },
    proof: {
      de: [
        '47 Tonnen Müll seit 2020 geborgen',
        'Fundorte als offene Karte dokumentiert',
        'Partner des WWF-Küstenprogramms',
      ],
      en: [
        '47 tonnes of waste recovered since 2020',
        'Find sites documented on an open map',
        'Partner of the WWF coastal programme',
      ],
    },
    recipients: { de: '120 km betreute Küstenlinie', en: '120 km of coastline cared for' },
    founded: '2020',
  },
  {
    id: 'moornass',
    name: { de: 'Moor wieder nass', en: 'Moor wieder nass' },
    org: { de: 'Moorallianz MV', en: 'Moorallianz MV' },
    category: 'umwelt',
    location: { de: 'Mecklenburgische Seenplatte', en: 'Mecklenburg Lake District' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Birgit',
      role: { de: 'Moorökologin', en: 'peatland ecologist' },
      initials: 'BI',
      line: {
        de: '„Ein nasses Moor speichert mehr CO₂ als jeder Wald. Wir machen einfach den Stöpsel wieder rein.“',
        en: '„A wet bog stores more CO₂ than any forest. We simply put the plug back in.“',
      },
    },
    tagline: {
      de: 'Trockengelegte Moore wiedervernässen: Deutschlands größte CO₂-Speicher.',
      en: 'Rewetting drained peatlands: Germany’s largest CO₂ stores.',
    },
    about: {
      de: 'Entwässerte Moore stoßen enorme Mengen CO₂ aus. Durch Wiedervernässung werden sie wieder zur Senke, und zum Lebensraum für Kraniche, Libellen und seltene Pflanzen.',
      en: 'Drained peatlands release huge amounts of CO₂. Rewetting turns them back into a carbon sink, and a habitat for cranes, dragonflies and rare plants.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 12 Wochen', en: 'Update every 12 weeks' },
    impact: {
      per: 15,
      unit: { de: 'wiedervernässter Quadratmeter Moor', en: 'square metre of peatland rewetted' },
      unitPlural: { de: 'wiedervernässte Quadratmeter Moor', en: 'square metres of peatland rewetted' },
      icon: 'leaf.fill',
    },
    proof: {
      de: [
        '1.800 Hektar Moor in Renaturierung',
        'CO₂-Wirkung wissenschaftlich vom Greifswald Moor Centrum begleitet',
        'Flächen langfristig vertraglich gesichert',
      ],
      en: [
        '1,800 hectares of peatland being restored',
        'CO₂ impact scientifically tracked by the Greifswald Mire Centre',
        'Land secured long-term by contract',
      ],
    },
    recipients: { de: '1.800 Hektar Moorfläche', en: '1,800 hectares of peatland' },
    founded: '2021',
  },
  {
    id: 'regenwald',
    name: { de: 'Selva Viva', en: 'Selva Viva' },
    org: { de: 'Selva Viva Foundation', en: 'Selva Viva Foundation' },
    category: 'umwelt',
    location: { de: 'Napo, Ecuador', en: 'Napo, Ecuador' },
    scope: 'international',
    country: { de: 'Ecuador', en: 'Ecuador' },
    hero: {
      name: 'Mateo',
      role: { de: 'Ranger & indigener Hüter', en: 'ranger & Indigenous guardian' },
      initials: 'MT',
      line: {
        de: '„Dieser Wald gehört meiner Familie seit Generationen. Jetzt können wir ihn auch verteidigen.“',
        en: '„This forest has belonged to my family for generations. Now we can defend it too.“',
      },
    },
    tagline: {
      de: 'Regenwald in den Händen derer, die ihn seit jeher schützen.',
      en: 'Rainforest in the hands of those who have always protected it.',
    },
    about: {
      de: 'Indigene Gemeinschaften erhalten Mittel, um ihren Wald vor Abholzung zu schützen: mit Ranger-Patrouillen, Landrechten und nachhaltigem Einkommen.',
      en: 'Indigenous communities receive the means to protect their forest from logging: through ranger patrols, land rights and sustainable income.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 24,
      unit: { de: 'geschützter Hektar Regenwald für ein Jahr', en: 'hectare of rainforest protected for a year' },
      unitPlural: { de: 'geschützte Hektar Regenwald für ein Jahr', en: 'hectares of rainforest protected for a year' },
      icon: 'leaf.fill',
    },
    proof: {
      de: [
        '52.000 Hektar Primärwald unter Schutz',
        'Satellitenüberwachung der Waldgrenzen',
        'Geführt von der lokalen Kichwa-Gemeinschaft',
      ],
      en: [
        '52,000 hectares of primary forest under protection',
        'Forest boundaries monitored by satellite',
        'Led by the local Kichwa community',
      ],
    },
    recipients: { de: '52.000 Hektar Regenwald', en: '52,000 hectares of rainforest' },
    founded: '2016',
  },

  /* ----------------------------------------------------- Sport & Jugend */
  {
    id: 'anpfiff',
    name: { de: 'Anpfiff', en: 'Anpfiff' },
    org: { de: 'Anpfiff ins Leben, Stadtteilsport', en: 'Anpfiff ins Leben, Stadtteilsport' },
    category: 'sport',
    location: { de: 'Duisburg-Marxloh', en: 'Duisburg-Marxloh' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Mehmet',
      role: { de: 'Trainer & Jugendcoach', en: 'coach & youth mentor' },
      initials: 'ME',
      line: {
        de: '„Für viele meiner Jungs ist das Training der einzige feste Termin in der Woche. Hier zählt, dass sie kommen.“',
        en: '„For many of my lads, training is the only fixed point in the week. Here, what counts is that they show up.“',
      },
    },
    tagline: {
      de: 'Sport als Halt für Jugendliche in einem Viertel, das oft abgeschrieben wird.',
      en: 'Sport as an anchor for young people in a neighbourhood often written off.',
    },
    about: {
      de: 'Fußball, Boxen und Hausaufgabenhilfe unter einem Dach. Wer dreimal die Woche trainiert, bekommt Lernbegleitung, ein warmes Essen und Trainer, die nicht aufgeben.',
      en: 'Football, boxing and homework help under one roof. Train three times a week and you get learning support, a warm meal and coaches who don’t give up.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 25,
      unit: { de: 'Trainingsmonat für ein Kind', en: 'month of training for one child' },
      unitPlural: { de: 'Trainingsmonate für Kinder', en: 'months of training for children' },
      icon: 'figure.run',
    },
    proof: {
      de: [
        '210 Jugendliche im wöchentlichen Programm',
        '0 € Mitgliedsbeitrag für die Familien',
        'Kooperation mit drei Schulen vor Ort',
      ],
      en: [
        '210 young people in the weekly programme',
        '€0 membership fee for families',
        'Partnered with three local schools',
      ],
    },
    recipients: { de: '210 Jugendliche zwischen 9 und 17', en: '210 young people aged 9 to 17' },
    founded: '2016',
  },
  {
    id: 'maedchenamball',
    name: { de: 'Mädchen am Ball', en: 'Mädchen am Ball' },
    org: { de: 'Mädchen am Ball gGmbH', en: 'Mädchen am Ball gGmbH' },
    category: 'sport',
    location: { de: 'Berlin-Wedding', en: 'Berlin-Wedding' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Nour',
      role: { de: '14 Jahre, Stürmerin', en: 'age 14, striker' },
      initials: 'NO',
      line: {
        de: '„Zu Hause hieß es: Fußball ist nichts für Mädchen. Jetzt bin ich Kapitänin.“',
        en: '„At home they said football wasn’t for girls. Now I’m the captain.“',
      },
    },
    tagline: {
      de: 'Fußball für Mädchen, die sonst nie einen Platz bekämen.',
      en: 'Football for girls who would otherwise never get a place on the pitch.',
    },
    about: {
      de: 'Reine Mädchen-Trainingsgruppen mit Trainerinnen als Vorbildern. Neben Sport gibt es Mentoring, Bewerbungshilfe und einen Ort, an dem Selbstbewusstsein wächst.',
      en: 'Girls-only training groups with women coaches as role models. Beyond sport there’s mentoring, help with applications and a place where confidence grows.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 25,
      unit: { de: 'Trainingsmonat für ein Mädchen', en: 'month of training for one girl' },
      unitPlural: { de: 'Trainingsmonate für Mädchen', en: 'months of training for girls' },
      icon: 'figure.run',
    },
    proof: {
      de: [
        '380 Mädchen in 14 Teams',
        'Über die Hälfte der Trainerinnen sind ehemalige Spielerinnen',
        'Gefördert vom Berliner Fußball-Verband',
      ],
      en: [
        '380 girls across 14 teams',
        'More than half the coaches are former players',
        'Supported by the Berlin Football Association',
      ],
    },
    recipients: { de: '380 Mädchen in Berlin', en: '380 girls in Berlin' },
    founded: '2019',
  },
  {
    id: 'platzda',
    name: { de: 'Platz da!', en: 'Platz da!' },
    org: { de: 'Landjugend bewegt e. V.', en: 'Landjugend bewegt e. V.' },
    category: 'sport',
    location: { de: 'Erzgebirge, Sachsen', en: 'Ore Mountains, Saxony' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Falk',
      role: { de: 'Übungsleiter', en: 'sports instructor' },
      initials: 'FA',
      line: {
        de: '„Der nächste Verein war 40 Kilometer weg. Jetzt ist die Turnhalle wieder voll.“',
        en: '„The nearest club was 40 kilometres away. Now the gym is full again.“',
      },
    },
    tagline: {
      de: 'Sportangebote für Kinder auf dem Land, wo Vereine wegbrechen.',
      en: 'Sport for rural children, where local clubs are disappearing.',
    },
    about: {
      de: 'Mobile Trainer:innen bringen Sport zurück in entlegene Dörfer: mit Ausrüstung, Hallenzeiten und einem festen wöchentlichen Angebot für Kinder ohne Alternative.',
      en: 'Mobile coaches bring sport back to remote villages: with equipment, gym time and a fixed weekly session for children who have no alternative.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 30,
      unit: { de: 'Vereinsmonat für ein Kind', en: 'month of club sport for one child' },
      unitPlural: { de: 'Vereinsmonate für Kinder', en: 'months of club sport for children' },
      icon: 'figure.run',
    },
    proof: {
      de: [
        '26 wiederbelebte Dorf-Sportgruppen',
        '640 Kinder in ländlichen Regionen erreicht',
        'Partnerschaft mit dem Landessportbund Sachsen',
      ],
      en: [
        '26 village sports groups revived',
        '640 children reached in rural regions',
        'Partnered with the Saxony state sports association',
      ],
    },
    recipients: { de: '640 Kinder im ländlichen Raum', en: '640 children in rural areas' },
    founded: '2020',
  },
  {
    id: 'goalforlife',
    name: { de: 'Goal for Life', en: 'Goal for Life' },
    org: { de: 'Goal for Life South Africa', en: 'Goal for Life South Africa' },
    category: 'sport',
    location: { de: 'Khayelitsha, Südafrika', en: 'Khayelitsha, South Africa' },
    scope: 'international',
    country: { de: 'Südafrika', en: 'South Africa' },
    hero: {
      name: 'Sipho',
      role: { de: '16 Jahre, Mittelfeld', en: 'age 16, midfielder' },
      initials: 'SI',
      line: {
        de: '„Fußball hat mich von der Straße geholt. Und der Trainer hat mich in der Schule gehalten.“',
        en: '„Football got me off the street. And the coach kept me in school.“',
      },
    },
    tagline: {
      de: 'Fußball, Aufklärung und Schule mitten im Township.',
      en: 'Football, education and schooling in the heart of the township.',
    },
    about: {
      de: 'Im Township verbindet das Programm Fußballtraining mit HIV-Aufklärung, Nachhilfe und einer warmen Mahlzeit, für Jugendliche, die sonst kaum Perspektiven haben.',
      en: 'In the township, the programme combines football training with HIV education, tutoring and a warm meal, for young people with few prospects otherwise.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 20,
      unit: { de: 'Programmwoche für eine:n Jugendliche:n', en: 'week in the programme for one young person' },
      unitPlural: { de: 'Programmwochen für Jugendliche', en: 'weeks in the programme for young people' },
      icon: 'figure.run',
    },
    proof: {
      de: [
        '1.900 Jugendliche im Programm',
        '79 % bleiben bis zum Schulabschluss',
        'Lokale Trägerorganisation, von Comic Relief evaluiert',
      ],
      en: [
        '1,900 young people in the programme',
        '79% stay through to graduation',
        'Locally run organisation, evaluated by Comic Relief',
      ],
    },
    recipients: { de: '1.900 Jugendliche im Township', en: '1,900 young people in the township' },
    founded: '2012',
  },

  /* --------------------------------------------------------- Tierschutz */
  {
    id: 'pfotenheim',
    name: { de: 'Stiller Hof', en: 'Stiller Hof' },
    org: { de: 'Stiller Hof, Lebenshof e. V.', en: 'Stiller Hof, Lebenshof e. V.' },
    category: 'tierschutz',
    location: { de: 'Uckermark, Brandenburg', en: 'Uckermark, Brandenburg' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Greta',
      role: { de: 'Kuh, gerettet 2023', en: 'cow, rescued 2023' },
      initials: 'GR',
      line: {
        de: 'Greta sollte mit vier Jahren geschlachtet werden. Heute wird sie 25, und ist das ruhigste Tier am Hof.',
        en: 'Greta was due to be slaughtered at four. Today she’ll live to 25, and is the calmest animal on the farm.',
      },
    },
    tagline: {
      de: 'Ein Zuhause für Tiere, die nirgendwo sonst alt werden dürfen.',
      en: 'A home for animals allowed to grow old nowhere else.',
    },
    about: {
      de: 'Auf dem Stillen Hof leben 180 gerettete Tiere ohne Nutzungszweck. Hier geht es nicht um Vermittlung, sondern um ein würdiges Leben bis zuletzt.',
      en: 'At Stiller Hof, 180 rescued animals live with no purpose but to live. This isn’t about rehoming, but about a dignified life to the very end.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 30,
      unit: { de: 'Versorgungswoche für ein Tier', en: 'week of care for one animal' },
      unitPlural: { de: 'Versorgungswochen für Tiere', en: 'weeks of care for animals' },
      icon: 'pawprint.fill',
    },
    proof: {
      de: [
        '180 Tiere in dauerhafter Obhut',
        'Tierärztliche Betreuung wöchentlich dokumentiert',
        'Gemeinnützigkeit vom Finanzamt anerkannt',
      ],
      en: [
        '180 animals in permanent care',
        'Veterinary care documented every week',
        'Charitable status recognised by the tax authority',
      ],
    },
    recipients: { de: '180 Tiere auf 12 Hektar', en: '180 animals across 12 hectares' },
    founded: '2017',
  },
  {
    id: 'wildtierhilfe',
    name: { de: 'Wildtierhilfe', en: 'Wildtierhilfe' },
    org: { de: 'Wildtierhilfe Schwarzwald e. V.', en: 'Wildtierhilfe Schwarzwald e. V.' },
    category: 'tierschutz',
    location: { de: 'Schwarzwald', en: 'Black Forest' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Pauli',
      role: { de: 'Igel, aufgepäppelt 2025', en: 'hedgehog, nursed back to health 2025' },
      initials: 'PA',
      line: {
        de: 'Pauli wog im Herbst nur 180 Gramm, zu leicht für den Winter. Im Frühjahr lief er gesund zurück in den Wald.',
        en: 'In autumn Pauli weighed just 180 grams, too light for winter. By spring he walked back into the forest, healthy.',
      },
    },
    tagline: {
      de: 'Verletzte Wildtiere pflegen und zurück in die Freiheit bringen.',
      en: 'Caring for injured wild animals and returning them to the wild.',
    },
    about: {
      de: 'Eine Auffangstation für verwaiste und verletzte Wildtiere, von Igeln über Greifvögel bis zu Rehkitzen. Ziel ist immer die Rückkehr in die Natur.',
      en: 'A rescue station for orphaned and injured wild animals, from hedgehogs to birds of prey to fawns. The goal is always a return to the wild.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 20,
      unit: { de: 'Pflegetag für ein Wildtier', en: 'day of care for one wild animal' },
      unitPlural: { de: 'Pflegetage für Wildtiere', en: 'days of care for wild animals' },
      icon: 'pawprint.fill',
    },
    proof: {
      de: [
        '2.400 Wildtiere pro Jahr versorgt',
        '71 % erfolgreich ausgewildert',
        'Behördlich anerkannte Wildtierstation',
      ],
      en: [
        '2,400 wild animals cared for each year',
        '71% successfully returned to the wild',
        'Officially recognised wildlife station',
      ],
    },
    recipients: { de: '2.400 Wildtiere jährlich', en: '2,400 wild animals each year' },
    founded: '2010',
  },
  {
    id: 'bienen',
    name: { de: 'Bienenretter', en: 'Bienenretter' },
    org: { de: 'Summt e. V.', en: 'Summt e. V.' },
    category: 'tierschutz',
    location: { de: 'Frankfurt & Umland', en: 'Frankfurt & surroundings' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Carla',
      role: { de: 'Stadtimkerin', en: 'urban beekeeper' },
      initials: 'CA',
      line: {
        de: '„Wildbienen brauchen keinen Honig-Ruhm. Sie brauchen Blüten. Genau die pflanzen wir.“',
        en: '„Wild bees don’t need the glory of honey. They need flowers. And that’s exactly what we plant.“',
      },
    },
    tagline: {
      de: 'Lebensräume für Wildbienen mitten in der Stadt.',
      en: 'Habitats for wild bees in the heart of the city.',
    },
    about: {
      de: 'Brachflächen, Dächer und Schulhöfe werden zu Blühwiesen und Nisthilfen. Wildbienen bestäuben, was wir essen, und verschwinden gerade in Stille.',
      en: 'Wastelands, rooftops and schoolyards become flowering meadows and nesting sites. Wild bees pollinate what we eat, and are quietly vanishing.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 16,
      unit: { de: 'Quadratmeter neue Blühwiese', en: 'square metre of new flowering meadow' },
      unitPlural: { de: 'Quadratmeter neue Blühwiese', en: 'square metres of new flowering meadow' },
      icon: 'leaf.fill',
    },
    proof: {
      de: [
        '34 Blühflächen in der Stadt angelegt',
        'Über 90 Wildbienenarten nachgewiesen',
        'Begleitet vom Institut für Bienenkunde',
      ],
      en: [
        '34 flowering sites created across the city',
        'Over 90 wild bee species recorded',
        'Supported by the Institute for Bee Research',
      ],
    },
    recipients: { de: '34 Flächen, 90+ Arten', en: '34 sites, 90+ species' },
    founded: '2018',
  },
  {
    id: 'schildkroete',
    name: { de: 'Caretta Schutz', en: 'Caretta Schutz' },
    org: { de: 'Archelon Hellas', en: 'Archelon Hellas' },
    category: 'tierschutz',
    location: { de: 'Zakynthos, Griechenland', en: 'Zakynthos, Greece' },
    scope: 'international',
    country: { de: 'Griechenland', en: 'Greece' },
    hero: {
      name: 'Eleni',
      role: { de: 'Meeresbiologin', en: 'marine biologist' },
      initials: 'EL',
      line: {
        de: '„Von hundert Schlüpflingen schafft es vielleicht einer. Wir sorgen dafür, dass es mehr werden.“',
        en: '„Of a hundred hatchlings, maybe one makes it. We make sure more do.“',
      },
    },
    tagline: {
      de: 'Die Niststrände der Meeresschildkröten bewachen.',
      en: 'Guarding the nesting beaches of sea turtles.',
    },
    about: {
      de: 'Freiwillige und Biolog:innen sichern Gelege der bedrohten Unechten Karettschildkröte, schützen sie vor Tourismus und begleiten die Schlüpflinge ins Meer.',
      en: 'Volunteers and biologists secure the nests of the endangered loggerhead turtle, protect them from tourism and guide the hatchlings to the sea.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 22,
      unit: { de: 'bewachtes Schildkröten-Gelege', en: 'turtle nest guarded' },
      unitPlural: { de: 'bewachte Schildkröten-Gelege', en: 'turtle nests guarded' },
      icon: 'pawprint.fill',
    },
    proof: {
      de: [
        '1.300 Nester pro Saison gesichert',
        'Älteste Meeresschildkröten-Schutzorganisation Griechenlands',
        'Daten fließen ins EU-Artenschutzmonitoring',
      ],
      en: [
        '1,300 nests secured each season',
        'Greece’s oldest sea turtle conservation organisation',
        'Data feeds into EU species protection monitoring',
      ],
    },
    recipients: { de: '1.300 Gelege pro Saison', en: '1,300 nests per season' },
    founded: '1983',
  },

  /* --------------------------------------------------------- Gesundheit */
  {
    id: 'herzschlag',
    name: { de: 'Herzschlag', en: 'Herzschlag' },
    org: { de: 'Herzschlag, Ambulante Hospizhilfe', en: 'Herzschlag, Ambulante Hospizhilfe' },
    category: 'gesundheit',
    location: { de: 'München & Umland', en: 'Munich & surroundings' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Familie Brandt',
      role: { de: 'begleitet 2025', en: 'supported in 2025' },
      initials: 'FB',
      line: {
        de: '„In den letzten Wochen meines Vaters war jemand da, der einfach nur dablieb. Das hat alles verändert.“',
        en: '„In my father’s final weeks, someone was there who simply stayed. That changed everything.“',
      },
    },
    tagline: {
      de: 'Damit niemand die letzte Zeit allein verbringen muss.',
      en: 'So that no one has to face their final days alone.',
    },
    about: {
      de: 'Ausgebildete Hospizbegleiter:innen sind für schwerkranke Menschen und ihre Familien da: zu Hause, kostenlos, so lange es gebraucht wird.',
      en: 'Trained hospice companions are there for the seriously ill and their families: at home, free of charge, for as long as they’re needed.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 60,
      unit: { de: 'Begleitungsstunde zu Hause', en: 'hour of companionship at home' },
      unitPlural: { de: 'Begleitungsstunden zu Hause', en: 'hours of companionship at home' },
      icon: 'heart.fill',
    },
    proof: {
      de: [
        '320 Familien pro Jahr begleitet',
        '90 ehrenamtliche Begleiter:innen, fortlaufend geschult',
        'Mitglied im Deutschen Hospiz- und PalliativVerband',
      ],
      en: [
        '320 families supported each year',
        '90 volunteer companions, trained on an ongoing basis',
        'Member of the German Hospice and Palliative Care Association',
      ],
    },
    recipients: { de: '320 Familien jährlich', en: '320 families each year' },
    founded: '2009',
  },
  {
    id: 'kindernotfall',
    name: { de: 'Kleine Helden', en: 'Kleine Helden' },
    org: { de: 'Bunter Kreis Nachsorge', en: 'Bunter Kreis Nachsorge' },
    category: 'gesundheit',
    location: { de: 'Stuttgart', en: 'Stuttgart' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Familie Okonkwo',
      role: { de: 'Frühchen-Nachsorge', en: 'aftercare for premature babies' },
      initials: 'FO',
      line: {
        de: '„Unser Sohn kam in der 26. Woche. Ohne die Nachsorge wären wir zu Hause untergegangen.“',
        en: '„Our son was born at 26 weeks. Without the aftercare, we’d have gone under at home.“',
      },
    },
    tagline: {
      de: 'Nachsorge für Frühchen und schwer kranke Kinder zu Hause.',
      en: 'Home aftercare for premature babies and seriously ill children.',
    },
    about: {
      de: 'Wenn die Klinik entlässt, fängt für Familien der Alltag erst an. Spezialisierte Pflegekräfte begleiten den Übergang nach Hause: medizinisch und menschlich.',
      en: 'When the hospital discharges them, everyday life is only just beginning for families. Specialist carers guide the transition home: medically and as people.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 55,
      unit: { de: 'Nachsorgestunde für eine Familie', en: 'hour of aftercare for one family' },
      unitPlural: { de: 'Nachsorgestunden für Familien', en: 'hours of aftercare for families' },
      icon: 'heart.fill',
    },
    proof: {
      de: [
        '1.100 Familien pro Jahr begleitet',
        'Senkt Wiederaufnahmen in die Klinik deutlich',
        'Modell wissenschaftlich evaluiert',
      ],
      en: [
        '1,100 families supported each year',
        'Markedly reduces hospital readmissions',
        'Model scientifically evaluated',
      ],
    },
    recipients: { de: '1.100 Familien jährlich', en: '1,100 families each year' },
    founded: '2002',
  },
  {
    id: 'seelenwetter',
    name: { de: 'Seelenwetter', en: 'Seelenwetter' },
    org: { de: 'Seelenwetter e. V.', en: 'Seelenwetter e. V.' },
    category: 'gesundheit',
    location: { de: 'Leipzig', en: 'Leipzig' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Jana',
      role: { de: '17 Jahre', en: 'age 17' },
      initials: 'JA',
      line: {
        de: '„Auf den Therapieplatz hätte ich neun Monate gewartet. Hier hat mir nach drei Tagen jemand zugehört.“',
        en: '„I’d have waited nine months for a therapy place. Here, someone listened to me after three days.“',
      },
    },
    tagline: {
      de: 'Kostenlose psychologische Erste Hilfe für Jugendliche.',
      en: 'Free psychological first aid for young people.',
    },
    about: {
      de: 'Niedrigschwellige Gespräche mit Psycholog:innen: anonym, schnell, kostenlos. Für junge Menschen, die nicht monatelang auf einen Therapieplatz warten können.',
      en: 'Low-threshold conversations with psychologists: anonymous, quick, free. For young people who can’t wait months for a therapy place.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 45,
      unit: { de: 'Beratungsgespräch für eine:n Jugendliche:n', en: 'counselling session for one young person' },
      unitPlural: { de: 'Beratungsgespräche für Jugendliche', en: 'counselling sessions for young people' },
      icon: 'heart.fill',
    },
    proof: {
      de: [
        '6.500 Gespräche im letzten Jahr',
        'Durchschnittliche Wartezeit unter 72 Stunden',
        'Fachliche Aufsicht durch approbierte Psychotherapeut:innen',
      ],
      en: [
        '6,500 conversations in the past year',
        'Average waiting time under 72 hours',
        'Professionally supervised by licensed psychotherapists',
      ],
    },
    recipients: { de: '6.500 Jugendliche jährlich', en: '6,500 young people each year' },
    founded: '2020',
  },
  {
    id: 'klinikgrenzenlos',
    name: { de: 'Klinik unter Bäumen', en: 'Klinik unter Bäumen' },
    org: { de: 'Médecins Solidaires', en: 'Médecins Solidaires' },
    category: 'gesundheit',
    location: { de: 'Region Sikasso, Mali', en: 'Sikasso region, Mali' },
    scope: 'international',
    country: { de: 'Mali', en: 'Mali' },
    hero: {
      name: 'Dr. Aïcha',
      role: { de: 'Ärztin', en: 'doctor' },
      initials: 'AI',
      line: {
        de: '„Eine Mutter ging vier Stunden zu Fuß zu uns. Wir sorgen dafür, dass die Klinik künftig zu ihr kommt.“',
        en: '„A mother walked four hours to reach us. We make sure the clinic comes to her from now on.“',
      },
    },
    tagline: {
      de: 'Mobile Basisgesundheit für Dörfer ohne Arzt.',
      en: 'Mobile basic healthcare for villages with no doctor.',
    },
    about: {
      de: 'Mobile Teams bringen Impfungen, Schwangerschaftsvorsorge und Grundversorgung in Dörfer, die kilometerweit von jeder Klinik entfernt sind.',
      en: 'Mobile teams bring vaccinations, prenatal care and basic treatment to villages miles from any clinic.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 12,
      unit: { de: 'medizinische Grundversorgung für einen Menschen', en: 'course of basic medical care for one person' },
      unitPlural: { de: 'medizinische Grundversorgungen', en: 'courses of basic medical care' },
      icon: 'heart.fill',
    },
    proof: {
      de: [
        '120.000 Behandlungen pro Jahr',
        'Lokale Ärzt:innen und Pflegekräfte vor Ort',
        'Finanzberichte öffentlich, extern testiert',
      ],
      en: [
        '120,000 treatments each year',
        'Local doctors and nurses on the ground',
        'Financial reports public and independently certified',
      ],
    },
    recipients: { de: '120.000 Menschen jährlich', en: '120,000 people each year' },
    founded: '2015',
  },

  /* ------------------------------------------------------------- Kultur */
  {
    id: 'buehnefrei',
    name: { de: 'Bühne frei', en: 'Bühne frei' },
    org: { de: 'Bühne frei, Jugendtheater e. V.', en: 'Bühne frei, Jugendtheater e. V.' },
    category: 'kultur',
    location: { de: 'Dortmund', en: 'Dortmund' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Samuel',
      role: { de: '17 Jahre, Ensemble-Mitglied', en: 'age 17, ensemble member' },
      initials: 'SA',
      line: {
        de: '„Auf der Bühne stottere ich nicht. Da bin ich einfach jemand, dem alle zuhören.“',
        en: '„On stage I don’t stutter. There I’m simply someone everyone listens to.“',
      },
    },
    tagline: {
      de: 'Theater als Stimme für Jugendliche, die sonst selten gehört werden.',
      en: 'Theatre as a voice for young people who are rarely heard.',
    },
    about: {
      de: 'Ein offenes Ensemble, in dem Jugendliche eigene Stücke schreiben und spielen. Über Sprache, Auftritt und Applaus wächst etwas, das bleibt: Selbstvertrauen.',
      en: 'An open ensemble where young people write and perform their own plays. Through language, performance and applause, something lasting grows: self-confidence.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 40,
      unit: { de: 'Probenwoche für eine:n Jugendliche:n', en: 'week of rehearsals for one young person' },
      unitPlural: { de: 'Probenwochen für Jugendliche', en: 'weeks of rehearsals for young people' },
      icon: 'theatermasks.fill',
    },
    proof: {
      de: [
        '85 Jugendliche im Ensemble',
        '4 abendfüllende Eigenproduktionen pro Jahr',
        'Gefördert vom Kulturamt Dortmund',
      ],
      en: [
        '85 young people in the ensemble',
        '4 full-length original productions each year',
        'Supported by the Dortmund cultural office',
      ],
    },
    recipients: { de: '85 Jugendliche im Ensemble', en: '85 young people in the ensemble' },
    founded: '2015',
  },
  {
    id: 'klangleben',
    name: { de: 'Klang & Leben', en: 'Klang & Leben' },
    org: { de: 'Musikschule für alle gGmbH', en: 'Musikschule für alle gGmbH' },
    category: 'kultur',
    location: { de: 'Essen', en: 'Essen' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Idris',
      role: { de: '10 Jahre, Trompete', en: 'age 10, trumpet' },
      initials: 'ID',
      line: {
        de: '„Ein eigenes Instrument? Dachte ich nie. Jetzt übe ich jeden Tag, sogar im Treppenhaus.“',
        en: '„An instrument of my own? I never thought so. Now I practise every day, even in the stairwell.“',
      },
    },
    tagline: {
      de: 'Instrument und Unterricht für Kinder ohne Budget.',
      en: 'An instrument and lessons for children with no budget for them.',
    },
    about: {
      de: 'Kinder aus Familien, die sich Musikunterricht nie leisten könnten, bekommen Leihinstrument und Unterricht. Musik öffnet Türen, die sonst verschlossen bleiben.',
      en: 'Children from families who could never afford music lessons receive a loaned instrument and tuition. Music opens doors that would otherwise stay shut.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 35,
      unit: { de: 'Musikmonat für ein Kind', en: 'month of music for one child' },
      unitPlural: { de: 'Musikmonate für Kinder', en: 'months of music for children' },
      icon: 'theatermasks.fill',
    },
    proof: {
      de: [
        '520 Kinder im kostenlosen Unterricht',
        '200 Leihinstrumente im Umlauf',
        'Kooperation mit der Folkwang Universität der Künste',
      ],
      en: [
        '520 children in free lessons',
        '200 loaned instruments in circulation',
        'Partnered with the Folkwang University of the Arts',
      ],
    },
    recipients: { de: '520 Kinder in Essen', en: '520 children in Essen' },
    founded: '2017',
  },
  {
    id: 'buecherboot',
    name: { de: 'Bücherboot', en: 'Bücherboot' },
    org: { de: 'Leselust Spreewald e. V.', en: 'Leselust Spreewald e. V.' },
    category: 'kultur',
    location: { de: 'Spreewald, Brandenburg', en: 'Spreewald, Brandenburg' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Ute',
      role: { de: 'Bibliothekarin an Bord', en: 'librarian on board' },
      initials: 'UT',
      line: {
        de: '„In manchen Dörfern bin ich die einzige Bibliothek, die je vorbeikommt.“',
        en: '„In some villages, I’m the only library that ever comes by.“',
      },
    },
    tagline: {
      de: 'Eine fahrende Bibliothek für abgelegene Dörfer.',
      en: 'A travelling library for remote villages.',
    },
    about: {
      de: 'Per Kahn und Bus bringt das Bücherboot Lesestoff, Vorlesestunden und Internetzugang in Orte, die längst keine eigene Bibliothek mehr haben.',
      en: 'By punt and bus, the Bücherboot brings reading material, storytelling hours and internet access to places that have long lost their own library.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 8 Wochen', en: 'Update every 8 weeks' },
    impact: {
      per: 20,
      unit: { de: 'Bücherkiste für ein Dorf', en: 'crate of books for one village' },
      unitPlural: { de: 'Bücherkisten für Dörfer', en: 'crates of books for villages' },
      icon: 'book.fill',
    },
    proof: {
      de: [
        '48 Dörfer auf der festen Route',
        '12.000 Ausleihen pro Jahr',
        'Unterstützt vom Landkreis Dahme-Spreewald',
      ],
      en: [
        '48 villages on the fixed route',
        '12,000 loans each year',
        'Supported by the Dahme-Spreewald district',
      ],
    },
    recipients: { de: '48 Dörfer im Spreewald', en: '48 villages in the Spreewald' },
    founded: '2014',
  },
  {
    id: 'erbebewahren',
    name: { de: 'Steine der Erinnerung', en: 'Steine der Erinnerung' },
    org: { de: 'Heritage for Peace', en: 'Heritage for Peace' },
    category: 'kultur',
    location: { de: 'Aleppo, Syrien', en: 'Aleppo, Syria' },
    scope: 'international',
    country: { de: 'Syrien', en: 'Syria' },
    hero: {
      name: 'Yusra',
      role: { de: 'Restauratorin', en: 'conservator' },
      initials: 'YU',
      line: {
        de: '„Wenn wir diese Steine verlieren, verlieren wir, wer wir waren. Also retten wir jeden einzelnen.“',
        en: '„If we lose these stones, we lose who we were. So we save every single one.“',
      },
    },
    tagline: {
      de: 'Zerstörtes Kulturerbe dokumentieren und sichern.',
      en: 'Documenting and safeguarding destroyed cultural heritage.',
    },
    about: {
      de: 'Lokale Restaurator:innen bergen, katalogisieren und sichern Fragmente zerstörter Bauten, damit der Wiederaufbau eines Tages auf Erinnerung bauen kann.',
      en: 'Local conservators recover, catalogue and secure fragments of destroyed buildings, so that reconstruction can one day be built on memory.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 12 Wochen', en: 'Update every 12 weeks' },
    impact: {
      per: 28,
      unit: { de: 'gesichertes Fundstück', en: 'artefact secured' },
      unitPlural: { de: 'gesicherte Fundstücke', en: 'artefacts secured' },
      icon: 'theatermasks.fill',
    },
    proof: {
      de: [
        '14.000 Objekte digital erfasst',
        'Zusammenarbeit mit lokalen Universitäten',
        'Methodik durch die UNESCO begleitet',
      ],
      en: [
        '14,000 objects digitally recorded',
        'Working alongside local universities',
        'Methodology guided by UNESCO',
      ],
    },
    recipients: { de: 'Kulturerbe einer ganzen Stadt', en: 'The cultural heritage of an entire city' },
    founded: '2017',
  },

  /* ----------------------------------------------------------- Soziales */
  {
    id: 'tafelplus',
    name: { de: 'Tafel Plus', en: 'Tafel Plus' },
    org: { de: 'Tafel Plus, Nachbarschaftsküche', en: 'Tafel Plus, Nachbarschaftsküche' },
    category: 'soziales',
    location: { de: 'Hamburg-Wilhelmsburg', en: 'Hamburg-Wilhelmsburg' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Rosa',
      role: { de: '71 Jahre, Stammgast & Helferin', en: 'age 71, regular & helper' },
      initials: 'RO',
      line: {
        de: '„Ich komme nicht wegen dem Essen. Ich komme, weil hier jemand meinen Namen kennt.“',
        en: '„I don’t come for the food. I come because here, someone knows my name.“',
      },
    },
    tagline: {
      de: 'Mehr als Lebensmittel: ein Tisch, an dem niemand allein sitzt.',
      en: 'More than food: a table where no one sits alone.',
    },
    about: {
      de: 'Gerettete Lebensmittel werden zu warmen Mahlzeiten, gekocht und gegessen in Gemeinschaft. Gegen Armut und gegen Einsamkeit zugleich.',
      en: 'Rescued food becomes warm meals, cooked and eaten together. Against poverty and loneliness alike.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 8,
      unit: { de: 'warme Mahlzeit in Gemeinschaft', en: 'warm meal shared in company' },
      unitPlural: { de: 'warme Mahlzeiten in Gemeinschaft', en: 'warm meals shared in company' },
      icon: 'fork.knife',
    },
    proof: {
      de: [
        '1.100 Mahlzeiten pro Woche',
        '18 Tonnen gerettete Lebensmittel jährlich',
        'Finanzen offen einsehbar, jährlich geprüft',
      ],
      en: [
        '1,100 meals per week',
        '18 tonnes of food rescued each year',
        'Finances openly viewable, audited annually',
      ],
    },
    recipients: { de: '450 Menschen pro Woche', en: '450 people per week' },
    founded: '2012',
  },
  {
    id: 'brueckenkopf',
    name: { de: 'Ankommen', en: 'Ankommen' },
    org: { de: 'Ankommen, Mentoring e. V.', en: 'Ankommen, Mentoring e. V.' },
    category: 'soziales',
    location: { de: 'Frankfurt am Main', en: 'Frankfurt am Main' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Amir',
      role: { de: '24 Jahre, heute Ausbildung als Pfleger', en: 'age 24, now training as a nurse' },
      initials: 'AM',
      line: {
        de: '„Meine Mentorin hat mir nicht das Leben abgenommen. Sie hat mir gezeigt, wie es hier geht.“',
        en: '„My mentor didn’t live my life for me. She showed me how things work here.“',
      },
    },
    tagline: {
      de: 'Ein Mensch an der Seite, der den Weg ins Ankommen schon kennt.',
      en: 'Someone by your side who already knows the way to belonging.',
    },
    about: {
      de: 'Geflüchtete und junge Menschen ohne Netzwerk werden ein Jahr lang von einer festen Mentorin oder einem Mentor begleitet: bei Behörden, Ausbildung und allem dazwischen.',
      en: 'Refugees and young people without a network are supported for a year by one dedicated mentor: with authorities, training and everything in between.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 6 Wochen', en: 'Update every 6 weeks' },
    impact: {
      per: 45,
      unit: { de: 'Mentoring-Monat für einen Menschen', en: 'month of mentoring for one person' },
      unitPlural: { de: 'Mentoring-Monate für Menschen', en: 'months of mentoring for people' },
      icon: 'figure.2',
    },
    proof: {
      de: [
        '780 begleitete Tandems seit 2017',
        '68 % finden binnen eines Jahres Ausbildung oder Arbeit',
        'Wirkung extern durch die Uni Frankfurt evaluiert',
      ],
      en: [
        '780 mentoring pairs supported since 2017',
        '68% find training or work within a year',
        'Impact independently evaluated by the University of Frankfurt',
      ],
    },
    recipients: { de: '300 aktive Tandems', en: '300 active mentoring pairs' },
    founded: '2017',
  },
  {
    id: 'kaeltebus',
    name: { de: 'Kältebus', en: 'Kältebus' },
    org: { de: 'Wärme e. V.', en: 'Wärme e. V.' },
    category: 'soziales',
    location: { de: 'Hamburg', en: 'Hamburg' },
    scope: 'deutschland',
    country: { de: 'Deutschland', en: 'Germany' },
    hero: {
      name: 'Detlef',
      role: { de: '58 Jahre, lebt auf der Straße', en: 'age 58, living on the street' },
      initials: 'DT',
      line: {
        de: '„Bei minus zehn Grad ist ein heißer Tee kein Luxus. Er ist der Unterschied zwischen Aufwachen und nicht.“',
        en: '„At minus ten degrees, a hot tea is no luxury. It’s the difference between waking up and not.“',
      },
    },
    tagline: {
      de: 'In kalten Nächten retten Schlafsack und heißer Tee Leben.',
      en: 'On cold nights, a sleeping bag and a hot tea save lives.',
    },
    about: {
      de: 'Ein Bus fährt jede Winternacht feste Routen ab, bringt Schlafsäcke, warme Getränke und ein offenes Ohr, und vermittelt auf Wunsch einen Schlafplatz.',
      en: 'A bus runs fixed routes every winter night, bringing sleeping bags, warm drinks and a listening ear, and a place to sleep for anyone who wants one.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 4 Wochen', en: 'Update every 4 weeks' },
    impact: {
      per: 10,
      unit: { de: 'Winternacht-Versorgung für einen Menschen', en: 'winter night of care for one person' },
      unitPlural: { de: 'Winternacht-Versorgungen', en: 'winter nights of care' },
      icon: 'fork.knife',
    },
    proof: {
      de: [
        '14.000 Versorgungen pro Winter',
        'Sieben Nächte die Woche im Einsatz',
        'Eng vernetzt mit der städtischen Wohnungslosenhilfe',
      ],
      en: [
        '14,000 people helped each winter',
        'Out seven nights a week',
        'Closely connected with the city’s homelessness services',
      ],
    },
    recipients: { de: 'Menschen ohne Obdach in Hamburg', en: 'People without shelter in Hamburg' },
    founded: '2008',
  },
  {
    id: 'wasserleben',
    name: { de: 'Wasser ist Leben', en: 'Wasser ist Leben' },
    org: { de: 'Brunnen für Morgen', en: 'Brunnen für Morgen' },
    category: 'soziales',
    location: { de: 'Region Tahoua, Niger', en: 'Tahoua region, Niger' },
    scope: 'international',
    country: { de: 'Niger', en: 'Niger' },
    hero: {
      name: 'Halima',
      role: { de: '9 Jahre', en: 'age 9' },
      initials: 'HA',
      line: {
        de: '„Früher holte Halima vier Stunden am Tag Wasser. Jetzt sitzt sie in dieser Zeit in der Schule.“',
        en: '„Halima used to spend four hours a day fetching water. Now she spends that time in school.“',
      },
    },
    tagline: {
      de: 'Sauberes Wasser, damit Mädchen zur Schule statt zur Quelle gehen.',
      en: 'Clean water, so girls go to school instead of to the well.',
    },
    about: {
      de: 'Brunnen und Wasserkomitees vor Ort bringen sauberes Trinkwasser ins Dorf. Das senkt Krankheiten und gibt vor allem Mädchen ihre Zeit und Zukunft zurück.',
      en: 'Wells and local water committees bring clean drinking water to the village, cutting illness and, above all, giving girls back their time and their future.',
    },
    verified: true,
    reportCadence: { de: 'Update alle 12 Wochen', en: 'Update every 12 weeks' },
    impact: {
      per: 15,
      unit: { de: 'Monat sauberes Wasser für eine Familie', en: 'month of clean water for one family' },
      unitPlural: { de: 'Monate sauberes Wasser für Familien', en: 'months of clean water for families' },
      icon: 'water.waves',
    },
    proof: {
      de: [
        '240 Brunnen, von Dorfkomitees selbst gewartet',
        'Krankheitsfälle in Projektdörfern deutlich gesunken',
        'Wirkung extern durch Viva con Agua-Standards geprüft',
      ],
      en: [
        '240 wells, maintained by village committees themselves',
        'Cases of illness markedly down in project villages',
        'Impact independently checked against Viva con Agua standards',
      ],
    },
    recipients: { de: '180.000 Menschen mit Zugang', en: '180,000 people with access' },
    founded: '2011',
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

/**
 * Sortiert Projekte nach den gewählten Themen (in genau der Reihenfolge des
 * Profils) und (falls gesetzt) nach der Reichweite (Deutschland/International).
 * So steht bei "Sport zuerst gewählt" auch ein Sport-Projekt ganz oben.
 */
export function projectsByCategories(keys: string[], scope?: Scope | null): Project[] {
  const rank = (p: Project) => {
    const ti = keys.indexOf(p.category);
    const themeRank = ti === -1 ? keys.length + 5 : ti;
    const scopeRank = scope ? (p.scope === scope ? 0 : 0.5) : 0;
    return themeRank + scopeRank;
  };
  return [...PROJECTS].sort((a, b) => rank(a) - rank(b));
}

/**
 * Kuratierte, bewusst KURZE Vorschlagsliste direkt nach dem Quiz. Anders als
 * projectsByCategories (zeigt für „Entdecken" den ganzen Katalog, nur sortiert)
 * liefert dies nur eine Handvoll Projekte:
 *  - ausschließlich aus den gewählten Themen,
 *  - pro Thema 2 bis 3 Projekte, abwechselnd eingereiht, sodass JEDES gewählte
 *    Thema sichtbar vertreten ist (wer Sport wählt, sieht Sport-Projekte, nicht
 *    nur Umwelt), und das jeweils erste Projekt jedes Themas oben steht,
 *  - Projekte der bevorzugten Reichweite je Thema zuerst,
 *  - insgesamt höchstens 6, damit die Aktionen darunter (eigenen Impact-Fonds
 *    starten / mit einer Beraterin sprechen) ohne langes Scrollen sichtbar sind.
 */
export function suggestedProjects(keys: string[], scope?: Scope | null): Project[] {
  const themes = keys.length ? keys : ['bildung', 'umwelt'];
  // Bei wenigen Themen je 3, bei dreien je 2 Projekte: Gesamtzahl bleibt bei ~6.
  const perTheme = themes.length <= 2 ? 3 : 2;

  const pickForTheme = (cat: string) =>
    PROJECTS.filter((p) => p.category === cat)
      .sort((a, b) => {
        const sa = scope ? (a.scope === scope ? 0 : 1) : 0;
        const sb = scope ? (b.scope === scope ? 0 : 1) : 0;
        return sa - sb;
      })
      .slice(0, perTheme);

  const byTheme = themes.map(pickForTheme);

  // Abwechselnd einreihen: Thema A #1, Thema B #1, ..., dann Thema A #2, ...
  const out: Project[] = [];
  for (let i = 0; i < perTheme; i++) {
    for (const list of byTheme) {
      if (list[i]) out.push(list[i]);
    }
  }
  return out;
}

export function filterProjects(category: string, scope: Scope | 'alle'): Project[] {
  return PROJECTS.filter(
    (p) => p.category === category && (scope === 'alle' || p.scope === scope)
  );
}
