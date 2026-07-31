# Camino de Santiago — 14-Day Planner

A static, single-page trip planner for a 14-day Camino de Santiago hike in **April 2027**, built with
plain HTML, CSS, and vanilla JavaScript (no build step, no framework).

## Opening the site

Just open [index.html](index.html) directly in a browser — no server or install required. Internet
access is only used for Google Fonts, the Leaflet map library (CDN), and the trip photos (Wikimedia
Commons). Everything else runs locally.

If you'd rather serve it (e.g. to avoid any browser `file://` quirks), any static file server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Routes

Switch between the two routes with the selector in the hero. Your choice, plus your km/mi preference,
is saved in `localStorage` and restored on your next visit.

| | Camino Francés 🇪🇸 | Camino Portugués (Central) 🇵🇹 |
|---|---|---|
| Path | León → Santiago | Porto → Santiago |
| Distance | ~309 km / 192 mi | ~238 km / 148 mi |
| Days | 13 walking + 1 rest/excursion | 12 walking + 2 rest/excursion |
| Highlights | Cruz de Ferro, O Cebreiro, Sarria 100 km marker | Barcelos, Ponte de Lima, Alto da Portela Grande, Tui border crossing |
| Start date | Sat, 10 Apr 2027 | Sat, 10 Apr 2027 |

Both finish at the cathedral in Santiago de Compostela, with Day 14 (Francés) or Days 13–14
(Portugués) set aside for a rest day and/or an excursion to Fisterra/Muxía.

## File structure

```
index.html   — page structure; loads Google Fonts, Leaflet (CDN), data.js, script.js
styles.css   — theme variables, hero, toggles, team strip, planner grid, calendar,
               map, airport/service/day/packing cards, responsive breakpoints
data.js      — ROUTES { frances, portugues }, DEFAULT_ROUTE, TEAM, TRIP alias
script.js    — IIFE renderer: route selection + persistence, hero, team,
               calendar, Leaflet map, airports, services, day cards, packing,
               km/mi toggle, image-fallback guard, selectDay() cross-linking
README.md    — this file
prompt.md    — the original build spec this site was generated from
```

## Customizing

Everything content-related lives in [data.js](data.js) — the UI is fully generated from it, so you
can edit trip details without touching HTML/CSS/JS:

- **Dates**: change a route's `startDate` (ISO format) and the calendar, day dates, and footer all
  recompute automatically.
- **Distances**: edit `km` per day and `totalKm` per route; the km/mi toggle handles the rest.
- **Stops**: edit `from`/`to`/`startPt`/`endPt`/`terrain`/`highlights`/`lodging`/`packing`/`services`
  per day. If you add or rename a stop, add a matching `[lat, lng]` entry to that route's `coords`
  object or the map segment/marker for that day won't draw.
- **Team**: edit the `TEAM` array. Add a `photo: "https://…"` URL to any member to show a real photo
  instead of the `✳️` placeholder glyph.
- **Images**: every `img`/`heroImg` URL is a real Wikimedia Commons photo of the actual place,
  resolved via the Wikipedia summary API and Commons search, filtered to reject
  flags/coats-of-arms/maps/SVGs, normalized to a ~1280px thumbnail, and verified to return HTTP 200
  with an `image/*` content type. If you swap in your own URL and it ever fails to load, `script.js`
  automatically falls back to a themed green→terracotta gradient so a broken image never shows raw.

## Notes

- The route map draws **schematic straight-line segments** between each day's start/end towns, not
  the actual footpath — see the note under the map.
- If Leaflet can't load (e.g. you're offline), the map area shows a friendly reconnect message instead
  of failing silently.
- Lodging entries use a consistent Albergue / Hostal-Pensión / Hotel naming pattern as planning
  placeholders — like the footer disclaimer says, confirm current names, prices, and availability
  before you travel.
