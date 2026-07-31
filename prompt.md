# Master Build Prompt — Camino de Santiago 14-Day Planner



> A single, self-contained prompt that specifies the entire website and every feature

> requested and implemented. Hand this to an AI/developer to reproduce the site from scratch.



---



## 1. Goal



Build a **static, single-page web app** (plain **HTML + CSS + vanilla JavaScript**, no build

step, no framework) that plans a **14-day Camino de Santiago hike in April 2027**. It must be

**fully data-driven**: all trip content lives in a `data.js` object and the UI is generated from it.

Opening `index.html` in a browser must just work (internet used only for Google Fonts, Leaflet, and

web images).



## 2. Two selectable routes



Support **two routes**, both finishing at the cathedral in **Santiago de Compostela**, chosen with a

**route selector** in the hero. Switching rebuilds the whole page (hero, calendar, map, airports,

services, day cards, packing) for the selected route. Persist the choice in `localStorage`.



1. **🇪🇸 Camino Francés — León → Santiago (~307 km / 191 mi), 13 walking days + 1 celebration day.**

   The classic final segment of the Camino Francés: crosses the Cruz de Ferro, climbs into Galicia

   at O Cebreiro, passes the Sarria 100 km marker, ends in Santiago; Day 14 = rest / Finisterre trip.

2. **🇵🇹 Camino Portugués (Central) — Porto → Santiago (~240 km / 149 mi), 12 walking days + 2 rest/excursion days.**

   Leaves Porto's old town, passes Barcelos and Ponte de Lima, climbs the Alto da Portela Grande,

   crosses the Rio Minho into Spain at Tui, then the Galician rías to Santiago; Days 13–14 = rest +

   Finisterre/Muxía excursion.



Default route on first load: **Camino Francés**.



## 3. Data model (`data.js`)



```js

const DEFAULT_ROUTE = "frances";

const ROUTES = {

  frances:   { /* full route object */ },

  portugues: { /* full route object */ },

};

const TEAM = [ /* member objects */ ];

const TRIP = ROUTES[DEFAULT_ROUTE]; // back-compat alias

```



Each **route object** contains:

- `id`, `label` (e.g. "Camino Francés"), `flag` (emoji), `tagline`, `title`, `subtitle`.

- `startDate` (ISO, `"2027-04-10"` — a Saturday; all day dates derive from this), `totalKm`, `routeName`.

- `heroImg` — hero background image URL.

- `coords` — object mapping **every `from`/`to` town name** used below to `[lat, lng]` (used by the map).

- `airports.start` and `airports.end` — each `{ city, primary, primaryNote, international, internationalNote, img }`.

- `services.luggage[]` and `services.bus[]` — each `{ name, note }`.

- `basePacking` — object of `"Group name": [items...]` (Footwear & feet; Clothing; Pack & sleep;

  Health & toiletries; Tech & documents).

- `days[]` — **exactly 14 entries**, each:

  `{ day, from, to, km, startPt, endPt, terrain, highlights, lodging[3], packing, services, img }`.

  Rest/excursion days use `km: 0`.



Each **TEAM member**: `{ name, role, photo? }`. For now names are **masked with `✳️` characters**

(placeholder), `role` is "Organizer"/"Pilgrim", `photo` optional.



## 4. Required content per day (both routes, all 14 days)



- **Day number** and **auto-computed date** (startDate + index; format like "Sat, 10 Apr 2027").

- **From → To** and explicit **Start point → End point** (landmarks, e.g. "León Cathedral (Plaza de Regla)").

- **Distance** in km, with a global **km ⇄ miles toggle** (also persisted).

- **Terrain / route notes** and **highlights** (what you see/do that day).

- **3 lodging options** ranging albergue → hostal/pensión → hotel.

- **Day-specific packing note** (e.g. warm hat/gloves for Cruz de Ferro; waterproofs for Galicia; cobblestone-friendly socks for Porto).

- **Luggage transfer & bus/train option** for that stage.

- **A real place photo** for that day (see §7).



## 5. Additional sections



- **Airports** — closest international gateways for start & end:

  - Francés: start **León** (via **Madrid–Barajas MAD** + Renfe AVE train; alternates Valladolid/Oviedo); finish **Santiago SCQ**.

  - Portugués: start **Porto (OPO)** — already international, Metro Line E into town; finish **Santiago SCQ**.

- **Luggage transfer & buses** — Correos «Paq Mochila», Jacotrans, Tuitrans (luggage); ALSA, Monbus,

  Renfe / CP / Rede Expressos (bus/train), tailored per route.

- **Base packing list** — grouped checklist shown once per route.

- **Footer** — dynamic route summary + a disclaimer that distances/lodging are typical figures to confirm.



## 6. Fellow Pilgrims (team) strip — near top of `<main>`



- Section "👥 Fellow Pilgrims" showing **signed-up members as circular avatar thumbnails**.

- Placeholder members render a **`✳️` glyph avatar** (colored circle, cycling palette) with a

  **masked `✳️` name** and role. End the strip with a dashed **"+ Invite"** tile.

- Route-independent (same team for both routes); rendered once at init.

- If a member has a `photo` URL, show that image as the thumbnail instead of the glyph.



## 7. Real place photos (accurate images)



**Do not use random/tagged image services.** Each day, city, and airport image must be an **accurate

photo of that actual place**, sourced from **Wikimedia Commons**:

- Resolve each place via the Wikipedia REST summary API across languages (en → es/pt/gl), and if the

  lead image is a **flag / coat-of-arms / map / SVG**, reject it and fall back to a **Commons file

  search** filtered to real photos (jpg/png).

- Normalize to a ~**1280px** thumbnail URL for fast loading.

- **Verify every URL returns HTTP 200 + `image/*`** and **bake the final URLs statically** into

  `data.js` (`img` per day, `img` per airport, `heroImg` per route).

- Add a JS fallback: probe each background image with `new Image()`; on error, swap that element's

  background to a themed green→terracotta gradient so a broken URL never shows.

- Where a place has few Commons photos, a representative shot is acceptable (e.g. O Porriño's station).



## 8. Trip Calendar + Route Map — **side by side**



Combine into one section with a two-column grid (calendar left, map right; stacks vertically under

~900px). Heading: "🗓️ Trip Calendar & 🗺️ Route Map".



**Calendar (wizard):**

- Render a real **April 2027 month grid** (Su–Sa), generated from `startDate` + number of days

  (generic enough to span multiple months if dates change).

- Trip days are **highlighted and clickable**, each showing the date number + "Day N" badge

  (green for walking days, terracotta for rest/excursion days).

- **Tapping a day** opens a **detail panel** below the calendar summarizing that day

  (Day #, date, distance chip, from → to, highlight, first lodging option + count) with a

  **"See full day details ↓"** button that smooth-scrolls to that day's card. It also selects the

  day on the map and in the itinerary.



**Route Map (Leaflet + OpenStreetMap):**

- Load Leaflet 1.9.4 from CDN (CSS + JS). Tiles from OpenStreetMap with attribution.

- Draw **one polyline segment per walking day** (schematic straight line between the day's start and

  end towns using `coords`) plus **numbered markers** at each stop (★ marker for the very start).

- **Selecting a day** (from calendar, a marker, or a segment) highlights that segment in **yellow**,

  zooms/pans to it (fitBounds), opens the stop's popup, and pulse-highlights the matching day card.

- `scrollWheelZoom` disabled (page still scrolls over the map). If Leaflet fails to load / offline,

  show a friendly "reconnect to view the map" message in the map container.

- Note under the map: segments are schematic straight lines, not the exact footpath; © OpenStreetMap.



**Cross-linking (single source of truth):** a `selectDay(index, scrollTarget)` function keeps the

calendar, day-detail panel, map segment/marker, and itinerary card in sync. Clicking an itinerary

**day card** also selects it (no scroll); calendar clicks scroll to reveal the detail panel; map

clicks don't yank the view. Give each day card `id="day-<index>"` and `scroll-margin-top`.



## 9. Itinerary & interactions



- Below the planner: **Airports → Services → Itinerary (14 day cards) → Packing**.

- Each **day card**: image with Day badge + date overlay on the left; on the right the route

  (From → To), a distance chip (km/mi, terracotta for rest days), highlights, and a details grid

  (Start→End, Terrain, Lodging list, Packing note, Luggage/bus). Cards are clickable/selectable.



## 10. Visual design



- **Camino theme:** yellow arrow `#f2b705`, terracotta `#c1502e`, pilgrim green `#3f6b4c` /

  deep green `#2c4a35`, warm stone backgrounds `#f4efe6` / `#ebe3d5`, ink `#2a2620`.

- Fonts: **Fraunces** (serif, headings) + **Inter** (body), via Google Fonts.

- Full-height **hero** with a route-specific background image + gradient overlay, scallop-shell 🐚

  motif, eyebrow, title, subtitle, **route selector**, tagline, stat tiles (14 days / walking days /

  total distance / April 2027), **km/mi toggle**, and a "view the days" scroll button.

- Rounded cards, soft shadows, subtle hover lifts; a pulse animation on the selected day card.

- **Responsive:** planner grid collapses to one column < 900px; day cards & hero adapt < 720px.



## 11. File structure



```

index.html   — structure; loads Google Fonts, Leaflet CDN (CSS+JS), data.js, script.js

styles.css   — all styling (theme vars, hero, route/unit toggles, team, planner grid,

               calendar, map, airport/service/day/packing cards, responsive)

data.js      — ROUTES { frances, portugues }, DEFAULT_ROUTE, TEAM, TRIP alias

script.js    — IIFE renderer: route select + persistence, hero, team, calendar,

               map (Leaflet), airports, services, day cards, packing, km/mi toggle,

               image fallback guard, selectDay() cross-linking

README.md    — how to open, route tables, customization

PROMPT.md    — this document

```



## 12. Acceptance checklist



- [ ] Opening `index.html` renders the full Francés plan with real photos and a working map.

- [ ] Route selector switches to the Portugués plan; everything (incl. map & calendar) rebuilds.

- [ ] km ⇄ miles toggle updates every distance; route + unit persist across reloads.

- [ ] Calendar and map sit **side by side** (stack on mobile); tapping a calendar day shows its

      detail, highlights the map segment, and can jump to the day card.

- [ ] All 14 day cards per route show start/end, distance, lodging (3), packing note, luggage/bus.

- [ ] Airports, luggage/bus services, and base packing render per route.

- [ ] Fellow Pilgrims strip shows ✳️ placeholder avatars + masked names + "Invite" tile.

- [ ] Every image is an accurate place photo (Wikimedia), verified 200/image, with gradient fallback.

- [ ] No console errors; graceful offline note if the map can't load.



---



### Change history captured in this prompt

1. **Initial build** — 14-day Camino Francés (León → Santiago) HTML/CSS/JS planner: itinerary, start

   points, daily distances (km/mi toggle), start/end points, lodging, packing, bus/luggage services,

   web images per day/city, closest international airports.

2. **Second route** — added Camino Portugués (Porto → Santiago) and a route selector to switch paths.

3. **Accurate images** — replaced random tagged photos with verified Wikimedia Commons place photos

   (flags/maps/coats-of-arms filtered out) + gradient fallback.

4. **Calendar + map** — added the April 2027 calendar "wizard" and a Leaflet map drawing each day's path.

5. **Layout + team** — placed the calendar and map side by side, and added a Fellow Pilgrims member

   thumbnail strip using ✳️ asterisk placeholders (real names/photos drop in via `TEAM`).