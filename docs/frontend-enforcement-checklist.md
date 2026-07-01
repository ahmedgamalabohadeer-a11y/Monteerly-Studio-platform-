# Frontend Enforcement Checklist

## Purpose
This checklist converts the Monteerly constitutional frontend rules into a daily enforcement tool for implementation review.
It must be used before approving any shell, page, route, component family, or layout change.

## Canonical References
Review every frontend change against these sources first:
- `docs/monteerly_unified_executive_document.md`
- `docs/ULTIMATE_MCOS_CONSTITUTION.md`
- `src/app/[locale]/layout.tsx`
- all nested `layout.tsx` files

## 1. Global Shell Review
Approve only if all answers are yes.

- Is the global shell calm rather than loud?
- Is the shell visually quieter than the route content?
- Does the shell avoid announcement-banner behavior?
- Does the shell avoid bright indigo, promotional, or launch-ribbon styling?
- Does the shell feel like ambient runtime framing rather than page content?
- Does the shell preserve dark premium sovereign atmosphere by default?
- Does the shell support proper `dir` behavior for Arabic RTL and English LTR?
- Does the shell reinforce trust, verification, and executive seriousness?

Reject immediately if:
- the shell becomes the loudest element on the page
- the shell looks like a marketing strip
- the shell duplicates page hierarchy
- the shell feels like generic SaaS chrome

## 2. Route Layout Review
Apply this to every route-level `layout.tsx`.

- Is the layout behavior consistent with `src/app/[locale]/layout.tsx`?
- Does the layout inherit the same atmosphere instead of inventing a different product identity?
- Does the layout stay subordinate to the page header and route narrative?
- Does the layout avoid visual conflict with executive surfaces?
- Does the layout maintain spacing, contrast, and structural calm?
- Does the layout avoid noisy wrappers, oversized top bars, and decorative clutter?

Reject immediately if:
- the route layout competes with the page hero
- the route layout introduces startup-like chrome
- the route layout breaks shell-vs-page hierarchy
- the route layout visually belongs to a different product

## 3. Executive Surface Review
Use this for executive, governance, runtime, legal, finance, admin, and intelligence pages.

- Does the page feel verified and monitored?
- Does the surface feel serious, calm, and high-trust?
- Is motion restrained and hierarchical?
- Are accents used semantically rather than decoratively?
- Are cards, panels, and metrics treated as intelligence surfaces rather than marketing blocks?
- Is the page free from playful SaaS patterns?

Reject immediately if:
- the page feels cheerful, promotional, or campaign-like
- decorative effects overpower operational meaning
- hover tricks are louder than structural hierarchy
- executive surfaces resemble public landing pages

## 4. Public and Marketplace Review
Use this for public-facing and marketplace-facing pages.

- Is the page more expressive without breaking Monteerly identity?
- Does it still feel premium, authored, and distinctive?
- Does it avoid generic startup composition?
- Does it remain tonally coherent with the sovereign dark system or an approved equivalent extension?
- Does it preserve typography, spacing, and palette discipline?

Reject immediately if:
- the page looks like a template landing page
- the page relies on cliché purple gradients or generic hero formulas
- the page visually disconnects from the rest of the platform

## 5. Typography Review
- Is the typography authored rather than default?
- Does Arabic feel elegant, strong, and premium?
- Does Latin support typography feel precise and modern?
- Is display typography reserved for hierarchy rather than sprayed everywhere?
- Is body typography readable and calm?
- Are forbidden defaults avoided as primary identity fonts?

Reject immediately if:
- Inter, Roboto, Arial, or generic system stacks define the core identity
- typography feels like a common AI-startup template
- display type is overused with no hierarchy

## 6. Color and Atmosphere Review
- Are dark sovereign surfaces the default atmospheric world?
- Are cyan, emerald, steel, and ice accents used with restraint?
- Is amber reserved for warning or caution?
- Does color communicate state, hierarchy, or meaning?
- Is visual contrast premium and low-noise rather than loud?

Reject immediately if:
- bright indigo bars appear in the global shell
- purple-on-white cliché palettes dominate the UI
- decorative colors are spread evenly with no semantic reason
- gradients are used as filler instead of meaning

## 7. Composition Review
- Does the page avoid generic centered SaaS stacking?
- Is there at least one real compositional idea?
- Is negative space intentional?
- Does the page use layered depth and editorial rhythm where appropriate?
- Do card grids avoid mechanical sameness?

Reject immediately if:
- the page is just hero, paragraph, button, and repeated equal cards
- every section uses the same width and rhythm with no hierarchy
- composition feels obviously templated

## 8. Component Review
- Do cards, panels, modals, forms, badges, and tables feel like one sovereign operating environment?
- Do components communicate purpose, hierarchy, state, and confidence?
- Are empty states still premium and system-native?
- Are panel treatments consistent across related routes?

Reject immediately if:
- colored icon circles are used as lazy filler
- thick SaaS left borders appear on cards
- pastel callouts or inflated blob styling appear
- component treatments drift from page to page without reason

## 9. Motion Review
- Is motion sparse, intentional, and hierarchical?
- Do page entry and section reveal matter more than hover gimmicks?
- Do transitions feel premium and deliberate?
- Is motion calm on executive surfaces?

Reject immediately if:
- bouncing, pulsing, or playful spam appears
- motion exists without hierarchy
- the interface starts feeling toy-like

## 10. Accessibility and Professionalism Review
- Is text contrast readable?
- Is hierarchy clear?
- Is semantic structure preserved?
- Is density safe on mobile?
- Are keyboard and touch interactions safe?
- Are Arabic and English both handled cleanly?

Reject immediately if:
- distinctive design breaks clarity
- touch targets become unsafe
- visual ambition reduces readability

## 11. Final Constitutional Gate
Ask these questions before approval:

- Does this change strengthen Monteerly as a sovereign executive environment?
- Does this change preserve shell-vs-page hierarchy?
- Does this change align with the constitutional atmosphere?
- Could this still be mistaken for a random startup product?

If the last answer is yes, the work is not approved.
