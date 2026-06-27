# ImpactFund — Logo Handoff (Direction 03 "Signal")

Drop-in logo package for the ImpactFund app frontend.

## Concept
An abstract lowercase **"i"**: the **dot** is the person and their impact, the **bar** is
the foundation. Calm, premium, grown-up — no clichés (no heart, no hands). Stays
legible down to a 16px favicon.

## What's in here
```
design_handoff_impactfund_logo/
├─ components/
│  ├─ ImpactFundLogo.tsx       ← React Native (react-native-svg) — use this in the app
│  └─ ImpactFundLogo.web.tsx   ← Plain React/DOM version (inline SVG, no deps)
├─ assets/
│  ├─ impactfund-symbol.svg          primary (navy bar + green dot)
│  ├─ impactfund-symbol-on-navy.svg  light bar + green dot (for navy surfaces)
│  ├─ impactfund-symbol-mono.svg     single-colour navy
│  ├─ impactfund-symbol-white.svg    knockout white (photo / colour bg)
│  └─ impactfund-appicon.svg         1024² rounded app icon (navy tile)
├─ ImpactFund Logo — Signal.dc.html  full visual spec (open in a browser)
└─ README.md
```
> The `.dc.html` file is a **design reference** showing the intended look — not code to
> ship. The production pieces are the `components/` and `assets/` above. Recreate/import
> them with your existing patterns; don't paste the HTML into the app.

## Geometry (single source of truth)
`viewBox="0 0 100 100"`
- **Bar:** `<rect x=42 y=40 width=16 height=46 rx=8>`
- **Dot:** `<circle cx=50 cy=22 r=10>`

That's the entire mark — two shapes. Everything else is just colour + size.

## Brand colours (FIXED — do not theme or dark-mode these)
| Role            | Hex       |
|-----------------|-----------|
| Navy (bar/ink)  | `#123250` |
| Green (dot)     | `#37C391` |
| Light (on navy) | `#EAF2F1` |
| Green pressed   | `#237B5C` |

Green is the single accent — used only for the dot. Don't tint the wordmark green.

## Variants
| variant     | bar       | dot       | use on            |
|-------------|-----------|-----------|-------------------|
| `primary`   | `#123250` | `#37C391` | light surfaces    |
| `onDark`    | `#EAF2F1` | `#37C391` | navy surfaces     |
| `mono`      | `#123250` | `#123250` | print / engraving |
| `negative`  | `#FFFFFF` | `#FFFFFF` | photo / colour bg |

## Typography (wordmark)
- Family: **Hanken Grotesk** (already loaded in the app via `FontMap`/`useFonts`).
- "**Impact**" = ExtraBold (800) · "Fund" = Medium (500), same navy colour.
- `letterSpacing: -0.7` at 30px (scale ~ -0.023em). `lineHeight: 1`.
- In RN, weights are addressed by family name: `FontFamily.extrabold`, `FontFamily.medium`.

## Layout rules
- **Clearspace:** keep padding ≥ the dot diameter (1× = 20 viewBox units) on all sides.
- **Lockup spacing:** gap between symbol and wordmark = `0.42 × wordmark height`.
- **Symbol height in lockup** = `1.34 × wordmark fontSize` (optically balanced).
- **Min sizes:** symbol 16px; lockup ~ 18px wordmark. At ≤24px the dot/bar may be set
  slightly heavier for favicon clarity (see the `16` cell in the spec file).

## Usage (React Native)
```tsx
import { ImpactFundLogo, ImpactFundMark } from '@/components/ImpactFundLogo';

<ImpactFundLogo height={28} />                  // header, light bg
<ImpactFundLogo height={28} variant="onDark" /> // header on navy
<ImpactFundMark size={40} />                    // tab bar / avatar / splash
```
> Adjust the `FontFamily` import path at the top of `ImpactFundLogo.tsx` to match your
> project (the design system file that exports `FontFamily`).

## App icon
Generate the iOS/Android icon set from `assets/impactfund-appicon.svg`. For iOS, export
the inner art on a solid `#123250` square with **no corner rounding** (`rx="0"`) — the OS
applies its own mask. The bundled SVG uses `rx="22"` for previews/Android adaptive.

## Fidelity
**High-fidelity** — final colours, geometry, type, and spacing. Implement pixel-exact.
