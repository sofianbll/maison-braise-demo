---
name: Maison Braise
description: Charcoal-and-gold restaurant design with condensed display lettering and illustrated food photography.
colors:
  ink: "#0b0b0d"
  coal: "#17171a"
  cream: "#fff6e8"
  white: "#fff"
  gold: "#ffb000"
  orange: "#ff5a1f"
typography:
  display:
    fontFamily: "Arial Narrow, Impact, Haettenschweiler, sans-serif"
    fontSize: "clamp(4.2rem, 7vw, 6rem)"
    fontWeight: 950
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  wordmark:
    fontFamily: "Impact, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 400
    lineHeight: 1
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  control:
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
    fontSize: "16px"
    fontWeight: 950
    lineHeight: 1.5
    letterSpacing: "0.06em"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    padding: "0 22.4px"
    height: "52px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#fff"
    typography: "{typography.control}"
    padding: "0 22.4px"
    height: "52px"
---

# Design System: Maison Braise

## Overview

**Creative North Star: “Eness at the Table”**

The established Eness identity pairs a near-black charcoal frame with warm cream surfaces, vivid gold accents and tightly condensed uppercase headlines. Food photography supplies the warmth and appetite; the surrounding interface stays direct, graphic and high-contrast. The current home page retains the incumbent diagonal hero image treatment while giving the featured dish and category route clearer roles.

The menu extension carries the same palette and display lettering into compact dish cards, category imagery and a native detail dialog. On narrow screens, the menu becomes a single-column list with a 112px image rail, while the dialog stacks its copy beneath a centered 160px image. The page remains led by food imagery and clear prices rather than ornamental decoration.

**Key Characteristics:**
- Charcoal, cream and gold define the dominant contrast; orange marks small supporting accents.
- Arial Narrow leads headings, Impact forms the wordmark, and the declared Inter stack falls back to available system sans-serif fonts when Inter is not installed.
- Food photography, square surfaces and crisp offset shadows provide the visual weight.

## Colors

The palette balances warm food imagery against charcoal, with gold carrying the clearest action emphasis.

### Primary
- **Grill Gold**: Primary calls to action and active category filters use the warm gold token.

### Secondary
- **Ember Orange**: Secondary emphasis appears in small labels.

### Neutral
- **Near-Black Ink**: Main text, dark hero and footer surfaces, borders and hard shadows.
- **Coal**: Image fallback and secondary dark surfaces.
- **Warm Cream**: Main page canvas, controls and the dish dialog surface.
- **White**: Dish cards and contrast surfaces on dark sections.

### Named Rules
**The Gold CTA Rule.** Reserve gold for primary calls to action and active category filters.

## Typography

**Display Font:** Arial Narrow, with Impact, Haettenschweiler and sans-serif fallbacks.
**Wordmark Font:** Impact (sans-serif fallback), at 1.6rem on desktop and 1.25rem on small screens.
**Body Font:** Inter is declared first but no external font is loaded; the browser uses an installed Inter face when available, otherwise the next available system sans-serif.
**Display Ramp:** The home hero uses a responsive 4.2–6rem range, with 3.4rem on small screens; section headings use a smaller responsive scale. The h1–h3 family uses Arial Narrow first, heavy weight, uppercase styling and tight tracking.
**Body Ramp:** 16px base with 1.5 line height; supporting copy commonly uses 14–15px. Controls inherit the body stack and use weight 950 with 0.06em tracking where styled as buttons.

## Layout

The desktop content is centered within a 1240px maximum width, with wide side gutters and generous section spacing. The home hero uses a two-column composition with a diagonal image edge; category links form six columns on wide screens and three columns below 1000px. The menu grid moves from four columns to two below 1000px, then to a compact single-column row below 650px. At that narrow size, each dish row places a 112px image beside its title, category, price and detail action.

The header is 76px tall and remains sticky. Menu tools stick below it; filters may scroll horizontally. At 650px, content gutters tighten to 16px and the two-column channel choice stacks vertically. The dish dialog uses two columns on wide screens and stacks below 650px, with a centered 160px square image and a sticky close control.

## Elevation & Depth

Depth is graphic and structural: the primary button uses a hard 5px ink offset, while its hover state grows to 8px and shifts the button upward. Legacy category and contact panels use larger hard offsets. Menu dish cards use a strong bottom rule instead of a soft shadow. The dish dialog dims the page with a charcoal backdrop and animates upward briefly; this entrance animation is removed when reduced motion is requested.

## Shapes

Controls, cards and panels keep square corners. Borders are crisp and dark; the hero image’s clipped diagonal is the notable large-scale shape. No circular badge component is part of the current V2 surfaces.

## Components

- **Primary button:** Gold fill, ink text, uppercase heavy lettering, 52px minimum height and a hard ink offset shadow. On hover, the shadow deepens as the button shifts up and left.
- **Ghost button:** Transparent fill with a white outline and white text on dark surfaces; its offset shadow uses gold.
- **Navigation:** Ink header with white links and a short gold underline for hover and current-page states. At the mobile breakpoint, links move into a stacked menu.
- **Search and filters:** The search field uses a white fill, dark 2px border and 48px height. Filter chips keep a thin dark border; the selected chip is gold. Touch filter controls are at least 44px high.
- **Dish card:** White surface with a dark bottom rule. A square food image leads the desktop card; copy keeps the title, black tabular price, brown category metadata and detail action close together. At 650px the card becomes a compact image-and-copy row.
- **Dish dialog:** Native dialog with cream surface, dark backdrop and a sticky close button. The desktop layout places image and copy side by side; on mobile it stacks, centers the image and keeps the close control at the top while scrolling.

## Do's and Don'ts

- **Do** carry the charcoal, cream, gold and condensed headline identity across existing pages.
- **Do** keep prices easy to scan and align their numerals consistently.
- **Do** let food images lead category and dish surfaces, with text and actions remaining legible at mobile widths.
- **Don't** replace the condensed uppercase display face with a decorative serif.
- **Don't** soften the established square controls and hard graphic edges into rounded cards or diffuse shadows.
- **Don't** use orange as a competing primary action color or as the dish category metadata color.
