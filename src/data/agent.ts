import type { CategoryKey } from '@/constants/theme';
import { Categories } from '@/constants/theme';
import { PROJECTS } from './projects';
import type { AgentSuggestion } from './types';
import { tr, plural } from '@/i18n/translate';
import type { Lang } from '@/i18n/types';

/**
 * Der Impact-Agent: ein ruhiger, kompetenter Begleiter. Er schlägt vor,
 * bündelt und stupst, aber handelt NIE ohne Freigabe. Jede Karte ist ein
 * Vorschlag mit klarer Aktion.
 */

export type AgentContext = {
  topThemes: CategoryKey[];
  allocationIds: string[];
  monthsActive: number;
  hasContributed: boolean;
  fundName: string | null;
  circleCount: number;
  totalGiven: number;
};

export function agentGreeting(ctx: AgentContext, lang: Lang): string {
  if (!ctx.hasContributed) {
    return lang === 'en'
      ? 'Good to have you here. Let’s get your impact going.'
      : 'Schön, dass du da bist. Lass uns deine Wirkung in Gang bringen.';
  }
  if (!ctx.fundName) {
    return lang === 'en'
      ? 'You’re on a good path. I have a few thoughts for you.'
      : 'Du bist auf einem guten Weg. Ich habe ein paar Gedanken für dich.';
  }
  return lang === 'en'
    ? `“${ctx.fundName}” is growing. I’ll make sure nothing important slips through.`
    : `„${ctx.fundName}“ wächst. Ich passe auf, dass nichts Wichtiges untergeht.`;
}

export function buildAgentFeed(ctx: AgentContext, lang: Lang): AgentSuggestion[] {
  const out: AgentSuggestion[] = [];

  // 1) Stupser zur nächsten Stufe: Impact-Fonds gründen.
  if (ctx.hasContributed && !ctx.fundName && (ctx.monthsActive >= 2 || ctx.allocationIds.length >= 1)) {
    const themeLabel = ctx.topThemes[0]
      ? tr(Categories[ctx.topThemes[0]].label, lang)
      : lang === 'en'
        ? 'your causes'
        : 'deine Themen';
    out.push({
      id: 'nudge-name',
      kind: 'nudge',
      title: lang === 'en' ? 'Time to start your own impact fund?' : 'Zeit für deinen eigenen Impact-Fonds?',
      body:
        lang === 'en'
          ? `You’ve been giving for ${themeLabel} for a while now. It could become your own impact fund, something that belongs to you.`
          : `Du gibst seit einer Weile für ${themeLabel}. Daraus könnte dein eigener Impact-Fonds werden, etwas, das dir gehört.`,
      cta: lang === 'en' ? 'Start impact fund' : 'Impact-Fonds gründen',
      action: 'name-fund',
    });
  }

  // 2) Kreis einladen, sobald es einen Impact-Fonds gibt.
  if (ctx.fundName && ctx.circleCount === 0) {
    out.push({
      id: 'nudge-circle',
      kind: 'nudge',
      title: lang === 'en' ? 'Who would you like to bring along?' : 'Wen würdest du gern mitnehmen?',
      body:
        lang === 'en'
          ? `“${ctx.fundName}” doesn’t have to stay a solo. Invite your circle. Together you’ll move noticeably more.`
          : `„${ctx.fundName}“ muss kein Solo bleiben. Lade deinen Kreis ein. Gemeinsam bewegt ihr spürbar mehr.`,
      cta: lang === 'en' ? 'Invite circle' : 'Kreis einladen',
      action: 'invite-circle',
    });
  }

  // 3) Neues, passendes Projekt vorschlagen.
  const suggestable = PROJECTS.find(
    (p) => ctx.topThemes.includes(p.category) && !ctx.allocationIds.includes(p.id)
  );
  if (suggestable) {
    const themeLabel = tr(Categories[suggestable.category].label, lang);
    out.push({
      id: `project-${suggestable.id}`,
      kind: 'project',
      title:
        lang === 'en'
          ? `A match for you: ${tr(suggestable.name, lang)}`
          : `Passt zu dir: ${tr(suggestable.name, lang)}`,
      body:
        lang === 'en'
          ? `${tr(suggestable.tagline, lang)}, in ${tr(suggestable.location, lang)}. I picked it because it fits “${themeLabel}”.`
          : `${tr(suggestable.tagline, lang)}, in ${tr(suggestable.location, lang)}. Ich habe es ausgewählt, weil es zu „${themeLabel}“ passt.`,
      cta: lang === 'en' ? 'View project' : 'Projekt ansehen',
      action: 'open-project',
      projectId: suggestable.id,
    });
  }

  // 4) Updates gebündelt.
  if (ctx.hasContributed) {
    out.push({
      id: 'update-bundle',
      kind: 'update',
      title: lang === 'en' ? 'I’ve bundled new updates for you' : 'Ich habe neue Updates für dich gebündelt',
      body:
        lang === 'en'
          ? 'Three of your projects reported back this month. I turned them into an impact moment.'
          : 'Drei deiner Projekte haben diesen Monat berichtet. Ich habe daraus einen Impact-Moment gemacht.',
      cta: lang === 'en' ? 'Open impact moment' : 'Impact-Moment öffnen',
      action: 'open-impact',
    });
  }

  // 5) Reflexion / Wachstum (nie Druck auf Beträge).
  if (ctx.hasContributed && ctx.fundName) {
    const months = Math.max(1, ctx.monthsActive);
    out.push({
      id: 'milestone',
      kind: 'milestone',
      title: lang === 'en' ? 'A quiet milestone' : 'Ein leiser Meilenstein',
      body:
        lang === 'en'
          ? `You’ve stayed with it for ${months} ${plural(lang, months, { de: ['Monat', 'Monaten'], en: ['month', 'months'] })}. Constancy is the rarest form of generosity.`
          : `Seit ${months} ${plural(lang, months, { de: ['Monat', 'Monaten'], en: ['month', 'months'] })} bleibst du dran. Beständigkeit ist die seltenste Form von Großzügigkeit.`,
      cta: lang === 'en' ? 'View your journey' : 'Deine Entwicklung ansehen',
      action: 'open-impact',
    });
  }

  return out;
}
