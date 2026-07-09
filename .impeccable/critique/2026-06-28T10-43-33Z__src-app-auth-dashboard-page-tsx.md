---
target: dashboard page
total_score: 19
p0_count: 0
p1_count: 2
p2_count: 4
timestamp: 2026-06-28T10-43-33Z
slug: src-app-auth-dashboard-page-tsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading/async feedback; refresh button remounts map but no status change shown |
| 2 | Match System / Real World | 3 | Domain-appropriate language; status labels match fleet operations |
| 3 | User Control and Freedom | 2 | No filter/sort/customize; only action is a hacky refresh that remounts the map |
| 4 | Consistency and Standards | 2 | AlertBanner uses hardcoded tailwind colors; KPI icons are inconsistent (same icon reused) |
| 5 | Error Prevention | 2 | No confirmation flows; export button is non-functional |
| 6 | Recognition Rather Than Recall | 3 | Visible nav, clear labels, status badges with color + text (not color-only) |
| 7 | Flexibility and Efficiency | 1 | No keyboard shortcuts, no bulk actions, no customization |
| 8 | Aesthetic and Minimalist Design | 2 | Clean but generic — 4 identical KPI cards feel templated; right column is 3 same-shaped card stacks |
| 9 | Error Recovery | 1 | No error states visible anywhere; no recovery paths |
| 10 | Help and Documentation | 1 | No contextual help, tooltips, or guidance |
| **Total** | | **19/40** | **Poor — significant improvements needed** |

#### Anti-Patterns Verdict

**LLM assessment**: The dashboard looks functional but dated. The 4 identical KPI cards (icon + big number + description + icon) hit the "hero-metric template" cliché. The right column stacks 3 near-identical card sections (same rounded-box, border, shadow-card, card-hover). The mock data and non-functional export button signal "prototype, not shipped." The refresh button that remounts the map via key change is a code smell. No loading/empty/error states anywhere.

**Deterministic scan**: 1 advisory found — dashboard-map.tsx uses a border-radius fallback value (1rem) outside the DESIGN.md rounded scale. Minor.

#### Overall Impression

The bones are solid — consistent DaisyUI theme, sensible color palette, good use of status colors. But the surface is generic. Every card has the same shape, every section the same treatment. It's a template, not a product.

#### What's Working
1. **Status color semantics** — green/yellow/red across badges, alerts, and dots is consistent and predictable
2. **Sidebar navigation** — clear hierarchy, proper active states, user info at bottom
3. **Map integration** — Google Maps with bus markers, filterable by bus, shows live positioning intent

#### Priority Issues

- **[P1] No async states**: All data is hardcoded mock. No loading skeletons, error boundaries, or empty states. The entire dashboard is non-functional without real API integration.
- **[P1] 4 identical KPI cards**: Same layout, same size, same pattern. The hero-metric template is an AI slop tell. Each metric should present differently based on what it communicates.
- **[P2] Right column homogeneity**: 3 stacked card sections with identical visual treatment (rounded-box, border, shadow-card, card-hover). The repetition makes it hard to scan.
- **[P2] AlertBanner uses hardcoded Tailwind colors**: `bg-orange-50`, `bg-blue-50`, etc. instead of design tokens like `bg-warning/10`. Causes drift when theme changes.
- **[P2] NotificationCard icon scaling**: Uses `scale-75` on the icon SVG which causes sub-pixel rendering. Should use a smaller icon variant.
- **[P2] KPI card icon inconsistency**: "Total Buses" and "Drivers" use the same person icon SVG. Students and Routes use different icons. No semantic connection between icon and metric.
- **[P3] Array index as key**: `key={i}` in Recent Activity map. Should use stable IDs.
- **[P3] Non-functional Export button**: Visible but does nothing. Ships confusion.

#### Persona Red Flags

**Alex (Power User)**: No keyboard shortcuts anywhere. Can't filter or sort any data. The refresh button suggests real-time data but the mechanism is hacky (key remount). Will abandon for a tool with actual data controls.

**Sam (Accessibility-Dependent)**: Status indicators combine color + text (good). But the Refresh/Export buttons are icon-only with aria-label (passable). The card-hover lift animation has reduced-motion support (recently added, good). No focus indicators visible on non-button interactive elements.

**Riley (Stress Tester)**: Export button does nothing — silent failure. No loading states means any async failure would show no feedback. Empty states are completely missing. A network failure would leave the user staring at blank cards.

#### Minor Observations
- DashboardMap loading state shows a spinner (good), but it uses a hardcoded h-[400px]
- The "Updated {now}" timestamp captures page load time, not actual data freshness
- Bus status badges use 18 different status values, some overlapping semantically (on-the-way, in-transit, on-board all active)
- No date range or time selector for historical data

#### Questions to Consider
- "What if the KPI cards showed trend direction (up/down arrows) and sparklines instead of just static numbers?"
- "What if the right column used a tab or accordion pattern to pack more sections without scrolling?"
- "Should the Export button actually export the current view, or be removed until implemented?"
