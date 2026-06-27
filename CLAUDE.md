# CLAUDE.md

Guidance for Claude Code (and other agents) working in this repo. This is the single source of
truth — `AGENTS.md` just points here.

## ⚠️ Expo SDK 54 — do not change without asking

This project runs on **Expo SDK 54** (`expo 54.0.35`, `react-native 0.81.5`, `react 19.1.0`,
`expo-router 6.0.24`, `react-native-reanimated 4.1.7`, `expo-font 14.0.12`).

It was **deliberately downgraded from SDK 56 → 54** so it matches the **Expo Go** app on the
user's iPhone/iPad (App Store Expo Go is SDK 54; an SDK 56 project shows an "incompatible SDK"
error when scanned). **Do NOT upgrade the SDK** unless the user confirms their Expo Go supports
the newer version (or they move to a development build). Expo APIs differ between versions —
read the exact versioned docs at **https://docs.expo.dev/versions/v54.0.0/** before writing
Expo code; don't rely on memory of older/newer APIs.

## Commands

```bash
npm start             # expo start (dev server; press i/a/w for iOS/Android/web)
npm run ios           # expo start --ios
npm run android       # expo start --android
npm run web           # expo start --web
npm run lint          # expo lint (ESLint)
npm run reset-project # scripts/reset-project.js — archives src/ and scaffolds a blank app
```

**On a physical iPhone/iPad:** `npm start` prints a **QR code** → scan with the iPhone Camera →
opens in **Expo Go** (iPhone and Mac must be on the **same Wi-Fi**). If devices can't see each
other (guest/corporate Wi-Fi): `npx expo start --tunnel`. Manual fallback in Expo Go: "Enter URL
manually" → `exp://<mac-LAN-ip>:<port>`.

No test runner is configured. Cheapest full smoke test: `npx expo export --platform ios`
(or `--platform web`) render-bundles every route. Keep `npx tsc --noEmit` and `npx expo lint`
clean.

## Product

**Mosaik** — a premium, German-language **impact / giving app**, visually branded to **LBBW /
BW-Bank**. It must **never feel like a bank** and never use the word "Stiftung". It's an
*identity* product, not a donation app: users discover who they are as an impact person, see
tangible results, and grow their engagement over time. **All UI copy is German.** Payments and
backend are **simulated** (no real integration). Tone: modern, warm, premium, calm — never
childish, never gamified-by-amount, never moralising.

Core journey (most polish lives here, keep it lückenlos): Quiz → Impact-Profil → Einstieg/Betrag
→ Projekte wählen → Sofort-Impact → Impact-Moment → Impact-Fonds gründen → Kreis einladen, with
identity-based level-ups throughout.

**Terminology:** the user's named, personal giving vehicle is called **„Impact-Fonds"** (DE) /
**„Impact Fund"** (EN) in all user-facing copy (owner decision; it replaced the earlier identity
term „Mission"). The owner accepted the slight banking lean of „Fonds" despite the *never feel like
a bank* rule. Founding one always requires a **budget** (`name-mission.tsx` sets a contribution and,
when not yet onboarded, calls `confirmGive`). Internals keep the old names: the route is
`name-mission`, the tab/route key is `mission`, the state field is `fundName`. The bottom-tab label
is shortened to **„Fonds" / „Fund"** so it fits one line. „Stiftung" is still forbidden.

## Design language (the heart of the app)

Everything visual flows from **`src/constants/theme.ts`** + the shared UI kit. Change a token
there and it cascades across every screen. **Never hardcode colors/sizes — pull from the theme.**

**Brand colors** (verified from LBBW's real production CSS):
- **Navy `#123250`** — primary brand, ink/text, dark "feature" surfaces, weight & seriousness.
- **Signal green `#37C391`** — the single accent (action, success, selection, progress), used
  *sparingly*; deep green `#237B5C` for pressed/links. LBBW's signature pairing is **navy text
  on green** (the primary button).

**Token roles** in `theme.ts` (stable — keep these meanings):
- `brand*` → **green** (action/accent); `onBrand` → navy text on green.
- `gold*` → **navy** accent (legacy key name, holds navy values for premium emphasis).
- `feature` / `onFeature` / `onFeatureDim` → **navy hero/identity surfaces** + near-white text,
  used on the 5 "moment" screens (Home impact hero, Impact-Fonds hero, both archetype reveals,
  Level-Up).
- `ink` = navy text; neutrals are cool greys; **dark mode is navy-derived, never pure black**.
- `Categories` = 7 muted, harmonised impact-theme colors (one calm tonal family, no bright purple).

**Typography:** one typeface, **Hanken Grotesk** (`@expo-google-fonts/hanken-grotesk`, weights
400–800), loaded in `src/app/_layout.tsx` via `useFonts(FontMap)`, splash held until ready. `Type`
variants set `fontFamily` per weight (custom fonts don't synthesise weight). **No serif anywhere.**

**Principles to MAINTAIN:** calm, premium, adult, restrained ("soft / minimalist"); navy-dominant
with green as the **one** accent used sparingly; generous whitespace; calm motion (gentle
fade/translate, no bounce/celebration/trophy). **Deliberately avoid:** purple/lila, glassmorphism,
mascots, trophy aesthetics, warm-beige "craft" palettes, generic AI gradients, overloaded banking
dashboards. Light + dark are both designed.

## Architecture

Universal Expo app (iOS, Android, web) using **expo-router** file-based routing; all source under
`src/`. Path aliases (`tsconfig.json`): `@/*` → `src/*`, `@/assets/*` → `assets/*`. App `scheme`
is `hackka`. `app.json` enables `typedRoutes` and `reactCompiler` (auto-memoises — avoid manual
`useMemo`/`useCallback`).

- **State** (`src/store/app-store.tsx`): a single in-memory `AppProvider` (Context + `useReducer`),
  consumed via `useStore()`. Holds the whole journey: quiz answers, derived profile, contribution,
  allocations, totals, `fundName`, `circle`, `monthsActive`. **Level is derived, not stored** —
  see `currentLevel()` / `currentStage()`; `allocationAmount()` converts a project's share to euros.
  State resets on reload (intentional demo behaviour); `reset()` + the Profile "Vorschau" controls
  (`advanceMonth`) replay / fast-forward.
- **Routing map:** `app/index.tsx` redirects by `state.onboarded`. `app/onboarding/*` is the guided
  stack (welcome → quiz → profile → contribute → projects → impact). `app/(tabs)/*` is the main app
  (`home`, `discover`, `mission`, `profile`) with a **custom tab bar** in `(tabs)/_layout.tsx` that
  also renders the floating `AgentFab`. Modals at app root: `agent`, `impact-moment`, `give`
  (one-off support *and* contribution editing via `?project=`), `name-mission`, `invite-circle`,
  `level-up`; plus `project/[id]`.
  - The tab bar uses the **classic `Tabs` from `expo-router`** + `BottomTabBarProps` from
    `@react-navigation/bottom-tabs`. `expo-router/js-tabs` is **SDK 56-only — do not reintroduce it.**
- **Content/data** (`src/data/`): pure, typed content + small pure functions. `projects.ts`
  (vetted projects, each with a concrete human/story + an instant-impact `{per, unit}` mapping),
  `quiz.ts`, `profiles.ts` (`deriveProfile()` → top themes + one of 5 adult archetypes),
  `impact-moments.ts` (`buildImpactMoment()`), `agent.ts` (`buildAgentFeed()` — consent-based
  Impact-Agent suggestions), `levels.ts`. Domain types in `data/types.ts`.
- **UI kit** (`src/components/ui/`): `AppText` (`variant`+`color`), `Screen`, `Card`, `Button`,
  `Pill`, `VerifiedBadge`, `TopBar`, `IconButton`, `SectionHeader`, `ProgressBar`/`Dots`,
  `Monogram`, `AmountSlider`, `Icon` (Ionicons via `@expo/vector-icons`). Plus `src/components/*`
  (`ProjectCard`, `AgentFab`, `MosaicMark`). Build screens from these.
- **Theme hooks** (`src/hooks/use-theme.ts`): `useTheme()` (active palette), `useScheme()`
  ('light'|'dark'); `use-color-scheme.web.ts` recomputes after hydration for static web rendering.

## Internationalisation (DE/EN)

The app is **bilingual (German + English)**, German-first. There is **no i18n library** — it's a
tiny custom system (`src/i18n/`):
- `i18n/types.ts` → `Lang = 'de' | 'en'` and `Localized<T> = { de: T; en: T }` (dependency-free so
  `theme.ts` and `data/*` can import it without cycles).
- `i18n/translate.ts` → pure `tr(value, lang)` and `plural(lang, n, forms)` (used by data-layer
  builders like `buildImpactMoment`/`buildAgentFeed`, which now take a `lang` argument).
- `hooks/use-language.ts` → `useLanguage()` (active `Lang`) and **`useTr()`** — the workhorse:
  `const tr = useTr();` then `tr(x)`. Mirrors the `useTheme()` pattern.
- **Editorial content** in `src/data/*` and `Categories[*].label/blurb` store every human-readable
  field as `Localized` (`{ de, en }`); display code resolves it with `tr(field)`. **Arrays** use
  `Localized<string[]>` (whole array per language).
- **UI chrome / microcopy** is written inline at the call site: `tr({ de: 'Weiter', en: 'Continue' })`
  — no central string catalog. Both languages are required by the type, so a missing translation is
  a **compile error** (`tsc` is the completeness net; it can't catch a German literal sitting in an
  English slot, so still eyeball new copy).
- **Language state** lives in the store (`state.language`, `setLanguage`); the default is the device
  locale via `expo-localization` `getLocales()` (English device → EN, else DE). `reset()` keeps the
  chosen language. The user toggle is the segmented control in `(tabs)/profile.tsx`.
- `lib/format.ts` `euro(n, lang)` / `groupThousands(n, lang)` format per language (de `1.250 €`,
  en `€1,250`); EUR stays the currency. Pass `lang` at call sites.
- **When adding any new copy:** wrap it (`tr({ de, en })` for chrome, `Localized` field for
  editorial) — never hardcode a single-language string.

## Gotchas (learned the hard way)

- **`AppText` auto-maps inline `fontWeight` → the right Hanken family**, so `style={{ fontWeight:
  '700' }}` works on `AppText`. Raw **`<Text>` / `<TextInput>` do NOT** — set `fontFamily:
  FontFamily.semibold` (etc.) explicitly, or they fall back to the system font.
- **Quiz footer:** single-choice questions auto-advance on tap and show **no** "Weiter" button
  (only the hint "Tippe auf deine Antwort"); the button appears **only** on multi-choice questions
  (currently just question 2, `themes`). Don't add a button back for single questions.
- **No em-dashes (`—`) or en-dashes (`–`) in any copy** — chrome *and* editorial. A humanizer pass
  (2026-06-27, owner-approved) stripped every dash from `src/data/*` and the screens, replacing each
  with the natural German/English punctuation (period, comma, colon, or parentheses). This overrode
  the earlier "keep the German *Gedankenstrich*" rule on the owner's explicit call. When adding copy,
  use a comma/colon/period instead of a dash so the app stays dash-free. The deliberate „nicht X,
  sondern Y" brand antithesis stays — only the dash character is banned, not the rhetorical move.
- The launcher icon art (`assets/images/`) is still the default Expo blue chevron — not yet
  rebranded to navy/green. A new icon is a separate asset task.

## Conventions

- Files are kebab-case. TypeScript `strict` is on; keep `tsc` + `expo lint` clean.
- React Compiler's strict ESLint rules are active. Reanimated's `sharedValue.value = …` trips
  `react-hooks/immutability` (disabled in `eslint.config.js` as a known false positive); avoid
  reading `ref.current` during render (`AmountSlider` rebuilds its PanResponder each render rather
  than holding a ref).
- Native `ios/` and `android/` folders are gitignored (managed / CNG workflow).
- Make focused, incremental changes; reuse tokens/components so the app stays "from one mold".
  Visual work hot-reloads into Expo Go (Fast Refresh).
