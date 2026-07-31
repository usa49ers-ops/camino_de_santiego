(function () {
  'use strict';

  var STORAGE_ROUTE_KEY = 'camino.route';
  var STORAGE_UNIT_KEY = 'camino.unit';
  var TEAM_PALETTE = ['#c1502e', '#3f6b4c', '#f2b705', '#2c4a35', '#7a4b2a', '#4a6fa5'];
  var WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  var state = {
    routeId: null,
    unit: 'km',
    selectedDay: 0,
    map: null,
    segments: [],
    markers: [],
    bounds: []
  };

  // ---------- date helpers ----------

  function parseISO(s) {
    var p = s.split('-').map(Number);
    return new Date(p[0], p[1] - 1, p[2]);
  }
  function addDays(date, n) {
    var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    d.setDate(d.getDate() + n);
    return d;
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function isoDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function fmtDateLong(d) { return WEEKDAYS_SHORT[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()] + ' ' + d.getFullYear(); }
  function fmtDateShort(d) { return d.getDate() + ' ' + MONTHS_SHORT[d.getMonth()] + ' ' + d.getFullYear(); }
  function monthsSpanned(start, end) {
    var months = [];
    var cur = new Date(start.getFullYear(), start.getMonth(), 1);
    var last = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cur <= last) {
      months.push({ year: cur.getFullYear(), month: cur.getMonth() });
      cur.setMonth(cur.getMonth() + 1);
    }
    return months;
  }

  // ---------- unit helpers ----------

  function fmtDistance(km) {
    if (!km) return 'Rest day';
    if (state.unit === 'mi') return (km * 0.621371).toFixed(1) + ' mi';
    return km.toFixed(0) + ' km';
  }

  // ---------- misc helpers ----------

  function currentRoute() { return ROUTES[state.routeId]; }

  function setBg(el, url) {
    if (!url) return;
    el.style.backgroundImage = "url('" + url + "')";
    el.dataset.bgUrl = url;
  }

  function guardImages() {
    document.querySelectorAll('[data-bg-url]').forEach(function (el) {
      var url = el.dataset.bgUrl;
      var probe = new Image();
      probe.onerror = function () {
        el.classList.add('img-fallback');
        el.style.backgroundImage = '';
      };
      probe.src = url;
    });
  }

  // ---------- init ----------

  function init() {
    state.routeId = localStorage.getItem(STORAGE_ROUTE_KEY) || DEFAULT_ROUTE;
    if (!ROUTES[state.routeId]) state.routeId = DEFAULT_ROUTE;
    state.unit = localStorage.getItem(STORAGE_UNIT_KEY) || 'km';

    renderRouteSelector();
    renderTeam();
    bindUnitToggle();
    renderAll();
  }

  function renderAll() {
    var route = currentRoute();
    state.selectedDay = 0;

    renderHero(route);
    renderCalendar(route);
    renderMap(route);
    renderAirports(route);
    renderServices(route);
    renderDayCards(route);
    renderPacking(route);
    renderFooter(route);

    updateRouteSelectorActive();
    updateUnitToggleActive();
    selectDay(0, false);
    guardImages();
  }

  // ---------- route selector ----------

  function renderRouteSelector() {
    var wrap = document.getElementById('route-selector');
    wrap.innerHTML = '';
    Object.keys(ROUTES).forEach(function (id) {
      var r = ROUTES[id];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'route-btn';
      btn.dataset.routeId = id;
      btn.innerHTML = r.flag + ' ' + r.label;
      btn.addEventListener('click', function () {
        if (state.routeId === id) return;
        state.routeId = id;
        localStorage.setItem(STORAGE_ROUTE_KEY, id);
        renderAll();
      });
      wrap.appendChild(btn);
    });
  }
  function updateRouteSelectorActive() {
    document.querySelectorAll('.route-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.routeId === state.routeId);
    });
  }

  // ---------- unit toggle ----------

  function bindUnitToggle() {
    document.getElementById('unit-toggle').addEventListener('click', function (e) {
      var btn = e.target.closest('.unit-btn');
      if (!btn || btn.dataset.unit === state.unit) return;
      state.unit = btn.dataset.unit;
      localStorage.setItem(STORAGE_UNIT_KEY, state.unit);
      updateUnitToggleActive();
      updateAllDistances();
    });
  }
  function updateUnitToggleActive() {
    document.querySelectorAll('.unit-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.unit === state.unit);
    });
  }
  function updateAllDistances() {
    var route = currentRoute();
    var totalTile = document.querySelector('#hero-stats .stat-tile:nth-child(3) .stat-value');
    if (totalTile) totalTile.textContent = fmtDistance(route.totalKm);

    document.querySelectorAll('.dist-chip').forEach(function (chip) {
      chip.textContent = fmtDistance(Number(chip.dataset.km));
    });

    renderDayDetail(state.selectedDay);
    renderFooter(route);
  }

  // ---------- hero ----------

  function statTile(value, label) {
    return '<div class="stat-tile"><span class="stat-value">' + value + '</span><span class="stat-label">' + label + '</span></div>';
  }

  function renderHero(route) {
    var hero = document.getElementById('hero');
    setBg(hero, route.heroImg);

    var journeyTitle = "Subhash's journey to Santiago via " + route.label;
    document.getElementById('hero-title').textContent = journeyTitle;
    document.getElementById('hero-subtitle').textContent = route.subtitle;
    document.getElementById('hero-tagline').textContent = route.tagline;
    document.title = journeyTitle;

    var walking = route.days.filter(function (d) { return d.km > 0; }).length;
    var stats = document.getElementById('hero-stats');
    stats.innerHTML =
      statTile(route.days.length, 'Days') +
      statTile(walking, 'Walking days') +
      statTile(fmtDistance(route.totalKm), 'Total distance') +
      statTile('Apr 2027', 'When');
  }

  // ---------- team (rendered once) ----------

  function renderTeam() {
    var wrap = document.getElementById('team-strip');
    wrap.innerHTML = '';
    TEAM.forEach(function (m, i) {
      var tile = document.createElement('div');
      tile.className = 'team-member';
      var avatarStyle = m.photo ? '' : ' style="background:' + TEAM_PALETTE[i % TEAM_PALETTE.length] + '"';
      var avatarInner = m.photo ? '<img src="' + m.photo + '" alt="" />' : '<span class="avatar-glyph">✳️</span>';
      tile.innerHTML =
        '<div class="avatar"' + avatarStyle + '>' + avatarInner + '</div>' +
        '<p class="member-name">' + m.name + '</p>' +
        '<p class="member-role">' + m.role + '</p>';
      wrap.appendChild(tile);
    });

    var invite = document.createElement('div');
    invite.className = 'team-member invite-tile';
    invite.innerHTML = '<div class="avatar invite-avatar">+</div><p class="member-name">Invite</p>';
    wrap.appendChild(invite);
  }

  // ---------- calendar ----------

  function renderCalendar(route) {
    var startDate = parseISO(route.startDate);
    var totalDays = route.days.length;
    var endDate = addDays(startDate, totalDays - 1);

    document.getElementById('calendar-header').textContent =
      totalDays + ' days · ' + fmtDateShort(startDate) + ' – ' + fmtDateShort(endDate);

    var grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    var dayByDate = {};
    route.days.forEach(function (d, i) {
      dayByDate[isoDate(addDays(startDate, i))] = i;
    });

    monthsSpanned(startDate, endDate).forEach(function (m) {
      grid.appendChild(buildMonthBlock(m.year, m.month, dayByDate, route));
    });

    var panel = document.getElementById('day-detail-panel');
    panel.hidden = true;
  }

  function buildMonthBlock(year, month, dayByDate, route) {
    var wrap = document.createElement('div');
    wrap.className = 'month-block';

    var title = document.createElement('div');
    title.className = 'month-title';
    title.textContent = MONTHS[month] + ' ' + year;
    wrap.appendChild(title);

    var weekHead = document.createElement('div');
    weekHead.className = 'weekday-row';
    WEEKDAYS_SHORT.forEach(function (w) {
      var el = document.createElement('span');
      el.textContent = w[0];
      el.title = w;
      weekHead.appendChild(el);
    });
    wrap.appendChild(weekHead);

    var daysGrid = document.createElement('div');
    daysGrid.className = 'days-row';

    var startOffset = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    for (var i = 0; i < startOffset; i++) {
      var blank = document.createElement('span');
      blank.className = 'day-cell empty';
      daysGrid.appendChild(blank);
    }

    for (var day = 1; day <= daysInMonth; day++) {
      var dateStr = year + '-' + pad(month + 1) + '-' + pad(day);
      var idx = dayByDate[dateStr];
      var cell;

      if (idx !== undefined) {
        var dayData = route.days[idx];
        cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'day-cell trip-day ' + (dayData.km > 0 ? 'walking' : 'rest');
        cell.dataset.dayIndex = idx;
        cell.innerHTML = '<span class="date-num">' + day + '</span><span class="day-badge">Day ' + dayData.day + '</span>';
        cell.addEventListener('click', function (e) {
          selectDay(Number(e.currentTarget.dataset.dayIndex), true);
        });
      } else {
        cell = document.createElement('span');
        cell.className = 'day-cell';
        cell.textContent = day;
      }
      daysGrid.appendChild(cell);
    }

    wrap.appendChild(daysGrid);
    return wrap;
  }

  function renderDayDetail(index) {
    var route = currentRoute();
    var d = route.days[index];
    var panel = document.getElementById('day-detail-panel');
    var date = addDays(parseISO(route.startDate), index);

    panel.hidden = false;
    panel.innerHTML =
      '<div class="detail-top">' +
        '<span class="detail-daynum">Day ' + d.day + '</span>' +
        '<span class="detail-date">' + fmtDateLong(date) + '</span>' +
        '<span class="chip ' + (d.km > 0 ? 'chip-green' : 'chip-terracotta') + ' dist-chip" data-km="' + d.km + '">' + fmtDistance(d.km) + '</span>' +
      '</div>' +
      '<p class="detail-route">' + d.from + ' → ' + d.to + '</p>' +
      '<p class="detail-highlight">' + d.highlights + '</p>' +
      '<p class="detail-lodging">' + d.lodging[0].name + ' <span class="muted">+ ' + (d.lodging.length - 1) + ' more options</span></p>' +
      '<button type="button" class="detail-scroll-btn" id="detail-scroll-btn">See full day details ↓</button>';

    document.getElementById('detail-scroll-btn').addEventListener('click', function () {
      var card = document.getElementById('day-' + index);
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // ---------- map ----------

  function renderMap(route) {
    var container = document.getElementById('route-map');

    if (typeof L === 'undefined') {
      container.innerHTML = '<div class="map-offline">🔌 Couldn’t load the map. Reconnect to the internet and reload the page to view the route map.</div>';
      state.map = null;
      return;
    }

    if (state.map) {
      state.map.remove();
      state.map = null;
    }
    container.innerHTML = '';

    var map = L.map(container, { scrollWheelZoom: false }).setView([42.6, -7.5], 7);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    state.map = map;
    state.segments = [];
    state.markers = [];
    state.bounds = [];

    route.days.forEach(function (d, i) {
      var fromCoord = route.coords[d.from];
      var toCoord = route.coords[d.to];

      if (i === 0 && fromCoord) {
        L.marker(fromCoord, {
          icon: L.divIcon({ className: 'map-marker start-marker', html: '★', iconSize: [28, 28] })
        }).addTo(map).bindPopup('<strong>Start</strong><br>' + d.from);
        state.bounds.push(fromCoord);
      }

      if (d.km > 0 && fromCoord && toCoord) {
        var line = L.polyline([fromCoord, toCoord], { color: '#3f6b4c', weight: 4, opacity: 0.85 }).addTo(map);
        line.on('click', function () { selectDay(i, false); });
        state.segments[i] = line;
        state.bounds.push(fromCoord, toCoord);
      }

      if (toCoord) {
        var marker = L.marker(toCoord, {
          icon: L.divIcon({
            className: 'map-marker ' + (d.km > 0 ? 'stop-marker' : 'rest-marker'),
            html: String(d.day),
            iconSize: [26, 26]
          })
        }).addTo(map).bindPopup('<strong>Day ' + d.day + '</strong><br>' + d.to);
        marker.on('click', function () { selectDay(i, false); });
        state.markers[i] = marker;
        state.bounds.push(toCoord);
      }
    });

    if (state.bounds.length) {
      map.fitBounds(state.bounds, { padding: [30, 30] });
    }
    setTimeout(function () { if (state.map) state.map.invalidateSize(); }, 250);
  }

  function highlightMapDay(index) {
    if (!state.map) return;
    var route = currentRoute();
    var d = route.days[index];

    state.segments.forEach(function (seg, i) {
      if (!seg) return;
      seg.setStyle({ color: i === index ? '#f2b705' : '#3f6b4c', weight: i === index ? 6 : 4 });
      if (i === index) seg.bringToFront();
    });

    var marker = state.markers[index];
    if (marker) marker.openPopup();

    var fromCoord = route.coords[d.from];
    var toCoord = route.coords[d.to];
    if (fromCoord && toCoord && d.km > 0) {
      state.map.fitBounds([fromCoord, toCoord], { padding: [60, 60], maxZoom: 12 });
    } else if (toCoord) {
      state.map.setView(toCoord, 12);
    }
  }

  // ---------- airports ----------

  function renderAirports(route) {
    var grid = document.getElementById('airports-grid');
    grid.innerHTML = '';
    grid.appendChild(buildAirportCard('Start · ' + route.airports.start.city, route.airports.start));
    grid.appendChild(buildAirportCard('Finish · ' + route.airports.end.city, route.airports.end));
  }
  function buildAirportCard(label, a) {
    var card = document.createElement('div');
    card.className = 'airport-card';
    var img = document.createElement('div');
    img.className = 'airport-img';
    setBg(img, a.img);
    card.appendChild(img);
    var body = document.createElement('div');
    body.className = 'airport-body';
    body.innerHTML =
      '<p class="airport-label">' + label + '</p>' +
      '<h3>' + a.primary + '</h3>' +
      '<p class="airport-note">' + a.primaryNote + '</p>' +
      '<h4>International: ' + a.international + '</h4>' +
      '<p class="airport-note">' + a.internationalNote + '</p>';
    card.appendChild(body);
    return card;
  }

  // ---------- services ----------

  function renderServices(route) {
    var grid = document.getElementById('services-grid');
    grid.innerHTML = '';
    grid.appendChild(buildServiceGroup('🧳 Luggage transfer', route.services.luggage));
    grid.appendChild(buildServiceGroup('🚌 Bus & train', route.services.bus));
  }
  function buildServiceGroup(title, items) {
    var box = document.createElement('div');
    box.className = 'service-group';
    var html = '<h3>' + title + '</h3><ul>';
    items.forEach(function (it) { html += '<li><strong>' + it.name + '</strong> — ' + it.note + '</li>'; });
    html += '</ul>';
    box.innerHTML = html;
    return box;
  }

  // ---------- day cards ----------

  function renderDayCards(route) {
    var wrap = document.getElementById('day-cards');
    wrap.innerHTML = '';
    route.days.forEach(function (d, i) {
      var date = addDays(parseISO(route.startDate), i);
      var card = document.createElement('article');
      card.className = 'day-card';
      card.id = 'day-' + i;
      card.dataset.dayIndex = i;
      card.tabIndex = 0;

      var img = document.createElement('div');
      img.className = 'day-card-img';
      setBg(img, d.img);
      img.innerHTML =
        '<span class="day-badge-overlay">Day ' + d.day + '</span>' +
        '<span class="day-date-overlay">' + fmtDateShort(date) + '</span>';

      var body = document.createElement('div');
      body.className = 'day-card-body';
      body.innerHTML =
        '<div class="day-card-top">' +
          '<h3>' + d.from + ' → ' + d.to + '</h3>' +
          '<span class="chip ' + (d.km > 0 ? 'chip-green' : 'chip-terracotta') + ' dist-chip" data-km="' + d.km + '">' + fmtDistance(d.km) + '</span>' +
        '</div>' +
        '<p class="day-highlights">' + d.highlights + '</p>' +
        '<div class="day-details-grid">' +
          '<div><span class="detail-label">Start → End</span><span>' + d.startPt + ' → ' + d.endPt + '</span></div>' +
          '<div><span class="detail-label">Terrain</span><span>' + d.terrain + '</span></div>' +
          '<div><span class="detail-label">Lodging</span><span>' + d.lodging.map(function (l) { return l.name + ' (' + l.type + ')'; }).join('; ') + '</span></div>' +
          '<div><span class="detail-label">Packing note</span><span>' + d.packing + '</span></div>' +
          '<div><span class="detail-label">Luggage / bus</span><span>' + d.services + '</span></div>' +
        '</div>';

      card.appendChild(img);
      card.appendChild(body);

      card.addEventListener('click', function () { selectDay(i, false); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectDay(i, false); }
      });

      wrap.appendChild(card);
    });
  }

  // ---------- packing ----------

  function renderPacking(route) {
    var grid = document.getElementById('packing-grid');
    grid.innerHTML = '';
    Object.keys(route.basePacking).forEach(function (group) {
      var box = document.createElement('div');
      box.className = 'packing-group';
      var html = '<h3>' + group + '</h3><ul>';
      route.basePacking[group].forEach(function (item) { html += '<li>' + item + '</li>'; });
      html += '</ul>';
      box.innerHTML = html;
      grid.appendChild(box);
    });
  }

  // ---------- footer ----------

  function renderFooter(route) {
    var walking = route.days.filter(function (d) { return d.km > 0; }).length;
    document.getElementById('footer-summary').innerHTML =
      '<strong>' + route.flag + ' ' + route.label + '</strong> — ' + fmtDistance(route.totalKm) +
      ' over ' + route.days.length + ' days (' + walking + ' walking). Starts ' +
      fmtDateLong(parseISO(route.startDate)) + '.';
  }

  // ---------- cross-linking ----------

  function selectDay(index, scrollToDetail) {
    state.selectedDay = index;

    document.querySelectorAll('.day-cell.trip-day').forEach(function (el) {
      el.classList.toggle('selected', Number(el.dataset.dayIndex) === index);
    });
    renderDayDetail(index);
    if (scrollToDetail) {
      var panel = document.getElementById('day-detail-panel');
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    document.querySelectorAll('.day-card').forEach(function (el) {
      var match = Number(el.dataset.dayIndex) === index;
      el.classList.toggle('selected', match);
      if (match) {
        el.classList.remove('pulse');
        void el.offsetWidth;
        el.classList.add('pulse');
      }
    });

    highlightMapDay(index);
  }

  // expose for debugging / potential external hooks
  window.selectDay = selectDay;

  init();
})();
