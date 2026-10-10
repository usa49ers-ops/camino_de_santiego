# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, single-page trip planner for a Camino de Santiago hike in April 2027: plain HTML, CSS, and
vanilla JavaScript — no build step, no framework, no package.json. Three selectable routes, all
ending in Santiago de Compostela, fully data-driven from `data.js`.

## Running it

No build/install step. Open `index.html` directly, or serve it to avoid `file://` quirks:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

There is no test suite, linter, or bundler in this repo — don't look for `npm run` scripts.

Internet access is only needed at runtime for Google Fonts, the Leaflet CDN (map), and Wikimedia
Commons (photos); everything else is local.

## File structure

- `index.html` — page skeleton (all content containers are empty `<div>`/`<section>` elements with
  `id`s; nothing is server- or build-rendered). Loads Google Fonts, Leaflet 1.9.4 (CSS+JS from CDN),
  `data.js`, then `script.js`.
- `data.js` — **all trip content**. `ROUTES` keyed by route id (`frances`, `portugues`,
  `portugues_costa`), `DEFAULT_ROUTE` (first-visit route, overridden by `localStorage`), `TEAM`
  array, `TRIP` (back-compat alias for `ROUTES[DEFAULT_ROUTE]`).
- `script.js` — single IIFE. Pure DOM rendering, no dependencies besides the global `L` (Leaflet) and
  the globals from `data.js`.
- `styles.css` — one file, CSS custom properties at `:root` for the whole theme.
- `team/` — pilgrim avatar photos referenced by `TEAM[].photo` (relative paths, filenames are
  case-sensitive on the deployed host even though macOS is not — see Gotchas).
- `prompt.md` — the original build spec this site was generated from. Treat it as the project's design
  doc / acceptance checklist, not boilerplate to delete.
- `README.md` — user-facing docs; currently describes only the first two routes and predates the
  summary table, so prefer `data.js`/`script.js` over it when the two disagree, and update it when
  making structural changes.

## Data model (`data.js`)

Each route object has: `id`, `label`, `flag`, `tagline`, `title`, `subtitle`, `startDate` (ISO —
every day's date is derived from this + index), `totalKm`, `routeName`, `heroImg`, `coords` (a
`{ "Town Name": [lat, lng] }` map — **every** `from`/`to` value used in that route's `days` must have
an entry here or the map segment/marker for that day silently won't draw), `airports: { start, end }`,
`services: { luggage[], bus[] }`, `basePacking` (grouped checklist), and `days[]`.

Each day object:
```js
{
  day, from, to, km, elevGain, avgTempC,   // elevGain in meters, avgTempC in °C (historical April
                                             // climate averages for planning — not a forecast)
  type,                                     // optional: "train" for a non-walking travel leg
                                             // (omit for normal walking/rest days)
  startPt, endPt, terrain, highlights,
  lodging,                                  // use the lodgingFor(town) helper — generates
                                             // Albergue/Hostal-Pensión/Hotel placeholder trio
  packing, services, img
}
```
`km: 0` marks a rest or excursion day. A day is only `type: "train"` when it's a scripted non-walking
leg (e.g. `portugues_costa`'s Day 15 return to Porto); everything else is inferred from `km` via
`dayKind()` in `script.js`.

## Images: verification discipline

Every `img`/`heroImg` URL must be a **real photo of the actual place**, not a flag/coat-of-arms/map/
SVG, sourced from Wikimedia Commons, normalized to a ~1280px `upload.wikimedia.org` thumbnail, and
verified to return HTTP 200 with an `image/*` content-type before being committed to `data.js` — URLs
are baked in statically, not fetched at build time. When adding or changing a place photo:

1. Try the Wikipedia REST summary API (`en` → `es`/`pt`/`gl`) for the place; reject the lead image if
   it's a flag/coat-of-arms/map or `.svg` (including rasterized SVG thumbnails — check for `.svg`
   anywhere in the URL, not just as a suffix).
2. Fall back to a Commons file search filtered to `.jpg`/`.png` with the same rejection rules.
3. Verify the final URL with a `HEAD` request (200 + `image/*`). Wikimedia rate-limits aggressively —
   pace requests (~1 req/sec) with backoff on 429, don't fire them in a tight loop.
4. Known pitfall: Commons files get renamed by bots/editors after the fact, silently 404ing a
   previously-good URL (this has happened once in this repo — a Pontevedra photo's filename changed
   underneath an already-deployed URL). If a reported "broken image" isn't explained by your own edit,
   re-resolve that specific file via the Commons API rather than assuming the original lookup was
   wrong.

At runtime, every element with a `data-bg-url` (set via `script.js`'s `setBg()`) is probed with
`new Image()`; on load failure it gets the `.img-fallback` class, which CSS replaces with a themed
green→terracotta gradient — so a dead URL degrades gracefully instead of showing broken-image chrome.

## Rendering architecture

`script.js` is one `renderAll()` cycle, re-run in full on route switch, called once at `init()`. The
unit toggle (km/mi, also persisted) is the one exception — it patches existing DOM text in place via
`updateAllDistances()` rather than re-rendering, to avoid flashing/resetting the map and calendar.

Cross-linking (calendar day ⇄ map segment/marker ⇄ day-detail panel ⇄ day card ⇄ summary table row) all
flows through one function, `selectDay(index, scrollToDetail)` — it's the single source of truth for
"which day is selected." When adding a new UI surface that represents a day, hook its click handler
into `selectDay()` rather than building parallel selection state.

The Leaflet map is destroyed and recreated (`state.map.remove()`) on every route switch rather than
updated in place, since each route has a disjoint set of coordinates/stops.

## Gotchas

- This directory is a git repo with no configured remote (`git remote -v` is empty) — pushes to the
  live GitHub Pages site (`usa49ers-ops.github.io/camino_de_santiego`) happen from elsewhere. Don't
  assume `git push` here will deploy anything.
- GitHub Pages is case-sensitive; local macOS is not. A mismatched-case filename (there is currently
  one: `team/Usha.jpg`) will work locally and break silently on deploy if ever renamed without
  updating the matching `photo:` path in `data.js`.
- GitHub Pages deploys asynchronously after a push — a "my image isn't showing" report right after a
  push is often just deploy lag (seconds to ~1 minute), not a code bug. Check the Pages deployment
  status/timestamp before debugging the code.
- `prompt.md`'s acceptance checklist (two routes, specific section order, etc.) reflects the site's
  *original* scope — the route count and some section additions (daily summary table) have since grown
  beyond it. Don't use it to argue a later, deliberately-added feature is out of scope.
