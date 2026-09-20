# Market Pulse (demo_expo)

React Native Developer Intern screening submission — Arklab AI, Batch 04.

## 1. Project overview

Market Pulse is a three-screen Expo/TypeScript mobile app that turns fictional
insider-trading filings into a mobile discovery flow: a home dashboard, a
searchable/filterable screener, and a trade detail view with a mock activity
chart. All data, companies, people and figures are invented for this
screening task — nothing is fetched, scraped or sourced from a real filing
database.

## 2. Concept and data statement

Original mobile concept inspired by the broad insider-activity product
category; all displayed content is fictional mock/demo data. Ten fictional
`InsiderTrade` records live in `src/data/mockTrades.ts` as a plain TypeScript
array — there is no backend, no API, and no persistence layer. Every screen
carries a visible "fictional demo data" label so this is never ambiguous to
someone using the app.

## 3. Screens and features

**Home / Market Pulse**
- Header with the app title and a "Fictional demo data" badge.
- Search entry that opens the Screener.
- Three summary cards (filing count, total purchase value, total sale value)
  derived from `mockTrades` with a single `reduce`.
- "Top signals" — the highest-conviction trades, tappable into Details.
- "Latest activity" — the four most recently filed trades, using the same
  `TradeCard` as the Screener.
- "View all trades" action into the Screener.

**Screener**
- Live search across ticker and company name, case-insensitive.
- Three independent filter groups (transaction type, insider role, minimum
  value), all combined with search in a single `useMemo`.
- Live result count line.
- Empty state with a "Clear filters" action that resets every input.

**Trade Details**
- Back navigation, company header with sector and a "FICTIONAL DEMO DATA"
  badge.
- A prominent signal card summarizing the trade in one line.
- An eight-field detail grid (insider/role, transaction type and code,
  shares, price per share, total value, transaction date, filed date, signal
  strength and name), with money fields right-aligned and marked as demo
  values.
- A seven-day mock activity chart drawn with `react-native-svg`.
- A short "why this matters" paragraph on reading insider activity as one
  research signal, not a recommendation.
- The required legal disclaimer, verbatim.

## 4. Tech stack

- Expo SDK 57, React Native 0.86, React 19, TypeScript (strict mode)
- React Navigation (`@react-navigation/native-stack`) for the three-screen
  stack
- `react-native-svg` for the custom activity chart
- `@expo/vector-icons` for directional and navigation icons
- `react-native-safe-area-context` / `react-native-screens` for layout and
  native screen containers
- No global state library — screen-level `useState`/`useMemo` plus a static
  mock-data import

## 5. Setup

```
npm install
npx expo start
```

Scan the QR code with Expo Go (Android/iOS), or press `a` / `i` in the
terminal to open an Android/iOS simulator.

## 6. Mobile design decisions

- Dark shell with a custom palette (background/surface/border/text tokens,
  plus semantic `purchase` green and `sale` orange) — deliberately not the
  brief's example hex values, to keep the design original.
- Transaction direction is always conveyed three ways at once: the word
  "Purchase"/"Sale", a directional icon, and color — never color alone.
- Signal-strength badges use a separate palette (accent/surface-raised
  tones) so they're never confused with the purchase/sale semantic colors.
- 8-point spacing rhythm (8/12/16/20/24), 16px card radius, 1px borders
  instead of shadows.
- Two font weights only (400/600); sentence case throughout except the
  single deliberate exception, the uppercase "FICTIONAL DEMO DATA" badge.
- No fixed widths on anything holding a company name — cards truncate with
  `numberOfLines` or wrap, checked against the longest name in the mock data
  ("Tidewell Diagnostics") at 375px and 430px.
- All touch targets are at least 44px tall; icon-only controls (the Details
  back button) carry `accessibilityLabel`; filter chips expose
  `accessibilityState={{ selected }}`.

## 7. Known limitations

- Three screens only, by design — no auth, settings, portfolio or alerts.
- Data is static and local; editing `mockTrades.ts` is the only way to change
  what the app shows, and the app does not persist any user input between
  launches.
- The seven-day activity chart uses a single fixed numeric array — it is
  illustrative, not derived from the trade data.
- Filtering and search run over an in-memory array of 10 records; this has
  not been tested against a larger dataset or with pagination.
- No automated test suite; correctness (filter logic, arithmetic, disclaimer
  text) was checked with ad hoc scripts during development rather than a
  committed test file.

## 8. AI-use disclosure

I used Claude Code (Anthropic's CLI, running the Claude Sonnet 5 model) as a
pair-programming assistant for the full implementation of this project.
Claude Code generated and iterated on the actual TypeScript/React Native
code — types, theme tokens, formatters, mock data, shared components, and
all three screens — phase by phase, under my direction. Before each commit I
reviewed the generated code, ran the app myself on device/simulator to check
behavior, and had it verify things like the mock-data arithmetic, filter
logic against every combination, and the disclaimer text matching
instruction.md character-for-character. AI was not used only for planning;
it wrote the implementation code that is in this repository.

## 9. Deliverables

- GitHub repository: https://github.com/tamannayousuf26/demo_expo
- Drive folder (APK, screenshots, demo video): https://drive.google.com/drive/folders/1085x6n3EncT3gX_7JoPjIqnRo-Cxtcef?usp=sharing
