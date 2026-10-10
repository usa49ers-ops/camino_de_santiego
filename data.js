/* ==========================================================================
   Camino de Santiago — 14-Day Planner — trip data
   All images are real Wikimedia Commons photographs of the actual place,
   resolved via the Wikipedia summary API / Commons search, filtered to
   reject flags/coats-of-arms/maps/SVGs, and verified to return HTTP 200
   with an image/* content type before being baked in here.
   ========================================================================== */

const DEFAULT_ROUTE = "portugues_costa";

function lodgingFor(town) {
  return [
    { name: "Albergue Municipal de " + town, type: "Albergue" },
    { name: "Hostal/Pensión " + town, type: "Hostal/Pensión" },
    { name: "Hotel " + town, type: "Hotel" }
  ];
}

const ROUTES = {

  // ------------------------------------------------------------------------
  // CAMINO FRANCÉS — León → Santiago (~307 km)
  // ------------------------------------------------------------------------
  frances: {
    id: "frances",
    label: "Camino Francés",
    flag: "🇪🇸",
    tagline: "The classic final 300 km — from the meseta, over the Cruz de Ferro, and into the green hills of Galicia.",
    title: "Camino Francés",
    subtitle: "León → Santiago de Compostela",
    startDate: "2027-04-10",
    totalKm: 309,
    routeName: "Camino Francés (León to Santiago)",
    heroImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pedrafita-do-Cebreiro-2010.JPG/1280px-Pedrafita-do-Cebreiro-2010.JPG",

    coords: {
      "León": [42.5987, -5.5671],
      "Villar de Mazarife": [42.4744, -5.6853],
      "Astorga": [42.4577, -6.0526],
      "Rabanal del Camino": [42.4980, -6.3125],
      "Ponferrada": [42.5468, -6.5967],
      "Villafranca del Bierzo": [42.6083, -6.8103],
      "O Cebreiro": [42.7075, -7.0462],
      "Triacastela": [42.7563, -7.2372],
      "Sarria": [42.7805, -7.4147],
      "Portomarín": [42.8069, -7.6157],
      "Palas de Rei": [42.8737, -7.8688],
      "Arzúa": [42.9273, -8.1594],
      "O Pedrouzo": [42.9058, -8.3607],
      "Santiago de Compostela": [42.8805, -8.5456]
    },

    airports: {
      start: {
        city: "León",
        primary: "León Airport (LEN)",
        primaryNote: "A small regional airport about 15 minutes from the city centre, with limited seasonal and charter routes — check current service before relying on it.",
        international: "Madrid–Barajas Adolfo Suárez (MAD)",
        internationalNote: "The main international gateway. From Madrid–Chamartín, take the Renfe AVE high-speed train (about 2h direct) to León. Valladolid (VLL) and Asturias (OVD) are useful backup airports with onward train/bus connections.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/AeropuertoLEN.JPG/1280px-AeropuertoLEN.JPG"
      },
      end: {
        city: "Santiago de Compostela",
        primary: "Santiago–Rosalía de Castro Airport (SCQ)",
        primaryNote: "About 12 km north of the city; buses and taxis reach the old town in roughly 20–30 minutes.",
        international: "Porto (OPO) or Madrid–Barajas (MAD)",
        internationalNote: "SCQ has a growing set of European routes, but for wider connections, Porto or Madrid are roughly 2.5–3h away by bus/train and worth checking as alternates.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Santiago_de_Compostela_-_LEST_Terminal.jpg/1280px-Santiago_de_Compostela_-_LEST_Terminal.jpg"
      }
    },

    services: {
      luggage: [
        { name: "Correos «Paq Mochila»", note: "Spain's postal service transfers backpacks stage-to-stage between participating Camino Francés lodgings; book each hop the evening before, online or at the post office." },
        { name: "Jacotrans", note: "Dedicated pilgrim luggage courier covering León to Santiago, with morning drop-off and delivery to that night's lodging." },
        { name: "Tuitrans", note: "Luggage transfer network covering the Galician sections from O Cebreiro onward, including bike and backpack transport." }
      ],
      bus: [
        { name: "ALSA", note: "The main long-distance/regional bus operator along the N-VI and Galician corridors — useful for skipping a stage or reaching a rest point." },
        { name: "Renfe", note: "Regional and AVE high-speed trains link León, Ponferrada, and Santiago for faster transfers or airport connections." }
      ]
    },

    basePacking: {
      "Footwear & feet": [
        "Broken-in trail shoes or boots",
        "2–3 pairs moisture-wicking socks + liner socks",
        "Sandals or lightweight shoes for evenings",
        "Blister kit (tape, needle, antiseptic)",
        "Anti-blister balm or lubricant"
      ],
      "Clothing": [
        "2 quick-dry T-shirts/base layers",
        "1 mid-layer fleece or light insulated jacket",
        "Waterproof rain jacket + pack cover",
        "Convertible or quick-dry trousers",
        "Sun hat + warm hat",
        "Quick-dry underwear & sports bras",
        "Lightweight gloves"
      ],
      "Pack & sleep": [
        "30–35L backpack with hip belt",
        "Sleeping bag liner (for albergues)",
        "Earplugs & eye mask",
        "Trekking poles",
        "Small padlock for lockers"
      ],
      "Health & toiletries": [
        "Sunscreen SPF 50",
        "Personal medications + basic first-aid",
        "Electrolyte tablets",
        "Travel-size toiletries",
        "Hand sanitizer"
      ],
      "Tech & documents": [
        "Passport/ID + pilgrim credential (credencial)",
        "Phone + charger + power bank",
        "Camino guide app or paper guide",
        "Travel insurance details",
        "Cash in small bills for rural stops"
      ]
    },

    days: [
      {
        day: 1, from: "León", to: "Villar de Mazarife", km: 21, elevGain: 80, avgTempC: 11,
        startPt: "León Cathedral (Plaza de Regla)", endPt: "Iglesia de Santiago, Villar de Mazarife",
        terrain: "Flat meseta farmland on the quieter Camino alternative via Villar de Mazarife, leaving León through Trobajo del Camino and skirting irrigation canals and open wheat fields.",
        highlights: "León's Gothic cathedral and stained glass, a last tapas crawl through the Barrio Húmedo, then big open meseta skies with storks nesting on village bell towers.",
        lodging: lodgingFor("Villar de Mazarife"),
        packing: "Broken-in boots and sun protection — long flat stretches with little shade across the meseta.",
        services: "Correos Paq Mochila to Villar de Mazarife; ALSA bus runs León–Villar de Mazarife on a limited schedule.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Catedral_G%C3%B3tica_de_Le%C3%B3n.jpg/1280px-Catedral_G%C3%B3tica_de_Le%C3%B3n.jpg"
      },
      {
        day: 2, from: "Villar de Mazarife", to: "Astorga", km: 30, elevGain: 180, avgTempC: 11,
        startPt: "Iglesia de Santiago, Villar de Mazarife", endPt: "Astorga Cathedral & Gaudí's Episcopal Palace",
        terrain: "Long flat-to-gently-rolling stage rejoining the main Camino at Hospital de Órbigo, then farmland tracks climbing gently toward Astorga.",
        highlights: "Hospital de Órbigo's 20-arch medieval bridge, traces of the old Roman road, and arrival at Astorga for its Gaudí palace and chocolate-making history.",
        lodging: lodgingFor("Astorga"),
        packing: "Blister care kit — this is one of the longest stages; check your feet at the Hospital de Órbigo bridge stop.",
        services: "Jacotrans/Tuitrans luggage transfer to Astorga; Renfe local train and ALSA bus both serve Astorga.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Astorga_Cathedral_Fa%C3%A7ade.jpg/1280px-Astorga_Cathedral_Fa%C3%A7ade.jpg"
      },
      {
        day: 3, from: "Astorga", to: "Rabanal del Camino", km: 20, elevGain: 420, avgTempC: 9,
        startPt: "Astorga Cathedral", endPt: "Iglesia de Santa María, Rabanal del Camino",
        terrain: "Gentle, steady climb from the meseta into the foothills of the Montes de León, through Santa Catalina de Somoza and El Ganso.",
        highlights: "Flat farmland gives way to gorse-covered hills; Rabanal's Templar-era church and Benedictine evening vespers for pilgrims.",
        lodging: lodgingFor("Rabanal del Camino"),
        packing: "A light warm layer for the morning climb into the foothills; the temperature drops noticeably above Rabanal.",
        services: "Correos Paq Mochila to Rabanal del Camino; ALSA bus stops here on the León–Ponferrada line.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Rabanal_del_camino_2018002.jpg/1280px-Rabanal_del_camino_2018002.jpg"
      },
      {
        day: 4, from: "Rabanal del Camino", to: "Ponferrada", km: 32, elevGain: 480, avgTempC: 10,
        startPt: "Iglesia de Santa María, Rabanal del Camino", endPt: "Templar Castle, Ponferrada",
        terrain: "The stage's high point — a steady climb past Foncebadón's ruins to the Cruz de Ferro (1,504 m), then a long descent through Manjarín and Molinaseca into the Bierzo valley.",
        highlights: "Leaving a stone at the Cruz de Ferro, sweeping views over the Maragatería, a river stop in Molinaseca, and the Templar Castle above Ponferrada.",
        lodging: lodgingFor("Ponferrada"),
        packing: "Warm hat and gloves for the pre-dawn walk to Cruz de Ferro (1,504 m) — bring a stone from home to leave at the cross.",
        services: "Jacotrans luggage transfer to Ponferrada (via Cruz de Ferro); no direct bus over the pass — ALSA connects from Ponferrada.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Cruz_de_Fierro.jpg/1280px-Cruz_de_Fierro.jpg"
      },
      {
        day: 5, from: "Ponferrada", to: "Villafranca del Bierzo", km: 24, elevGain: 150, avgTempC: 13,
        startPt: "Templar Castle, Ponferrada", endPt: "Iglesia de Santiago (Puerta del Perdón), Villafranca del Bierzo",
        terrain: "Easy, mostly flat walking through the vineyards of the Bierzo wine region via Cacabelos and Pieros.",
        highlights: "Bierzo vineyards and bodegas, Cacabelos' pilgrim quarter, and Villafranca's Puerta del Perdón, where medieval pilgrims too sick to continue could still receive a Compostela.",
        lodging: lodgingFor("Villafranca del Bierzo"),
        packing: "Trekking poles for the gentle descents; a sun hat for the open vineyard stretches.",
        services: "Tuitrans/Correos luggage to Villafranca del Bierzo; ALSA bus runs the N-VI corridor through town.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/PadresPa%C3%BAlesVillafranca.jpg/1280px-PadresPa%C3%BAlesVillafranca.jpg"
      },
      {
        day: 6, from: "Villafranca del Bierzo", to: "O Cebreiro", km: 28, elevGain: 800, avgTempC: 9,
        startPt: "Iglesia de Santiago, Villafranca del Bierzo", endPt: "Santa María la Real church, O Cebreiro",
        terrain: "The toughest climb on the route — up the Valcarce valley through Trabadelo and Vega de Valcarce, then a steep final ascent into Galicia at Pedrafita do Cebreiro.",
        highlights: "Crossing from Castilla y León into Galicia, first sight of the region's green hills, and O Cebreiro's thatched-roof stone pallozas at the top.",
        lodging: lodgingFor("O Cebreiro"),
        packing: "Full waterproofs and a windproof layer — the climb to O Cebreiro crosses exposed, weather-changeable mountains.",
        services: "Jacotrans luggage transfer up to O Cebreiro (a steep climb — most pilgrims send bags); ALSA bus serves Pedrafita–O Cebreiro.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Pedrafita-do-Cebreiro-2010.JPG/1280px-Pedrafita-do-Cebreiro-2010.JPG"
      },
      {
        day: 7, from: "O Cebreiro", to: "Triacastela", km: 21, elevGain: 250, avgTempC: 10,
        startPt: "Santa María la Real church, O Cebreiro", endPt: "Iglesia de Santiago, Triacastela",
        terrain: "Rolling high-Galician ridge walking past Alto de San Roque and Alto do Poio, then a long descent through Fonfría and Biduedo.",
        highlights: "The Alto de San Roque pilgrim statue battling the wind, and dairy-farm hamlets marking the start of true rural Galicia.",
        lodging: lodgingFor("Triacastela"),
        packing: "Waterproof boot treatment — Galicia's woodland paths get muddy even in dry weather.",
        services: "Correos Paq Mochila to Triacastela; ALSA local bus connects Pedrafita–Triacastela–Sarria.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Triacastela._Galicia_%28Spain%29.jpg/1280px-Triacastela._Galicia_%28Spain%29.jpg"
      },
      {
        day: 8, from: "Triacastela", to: "Sarria", km: 18, elevGain: 200, avgTempC: 11,
        startPt: "Iglesia de Santiago, Triacastela", endPt: "Iglesia de Santa Mariña, Sarria",
        terrain: "A short, gentle day; most pilgrims take the greener San Xil route rather than the Samos monastery detour.",
        highlights: "Chestnut woodland, the option to detour via the Monastery of Samos, and arrival in Sarria — the traditional starting point for the minimum 100 km Compostela.",
        lodging: lodgingFor("Sarria"),
        packing: "A lighter pack today — a short warm-up day before the busier 100 km stretch from Sarria.",
        services: "Tuitrans luggage transfer to Sarria; Sarria has an ALSA bus station and a Renfe train link toward Lugo/Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Sarria%2C_en_Lugo_%28Espa%C3%B1a%29.jpg/1280px-Sarria%2C_en_Lugo_%28Espa%C3%B1a%29.jpg"
      },
      {
        day: 9, from: "Sarria", to: "Portomarín", km: 22, elevGain: 380, avgTempC: 12,
        startPt: "Iglesia de Santa Mariña, Sarria", endPt: "Iglesia de San Nicolás/San Juan, Portomarín",
        terrain: "Rolling farm tracks and hamlets past the official 100 km marker, descending to cross the Miño reservoir into Portomarín.",
        highlights: "The 100 km-to-Santiago marker (expect noticeably busier trails from here), and Portomarín's Romanesque church, relocated stone by stone when the town was moved for a reservoir.",
        lodging: lodgingFor("Portomarín"),
        packing: "Credential stamped twice daily from here on — carry a spare pen.",
        services: "Jacotrans/Correos luggage to Portomarín; ALSA bus runs Sarria–Portomarín–Palas de Rei–Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/S._Xo%C3%A1n_de_Portomar%C3%ADn.JPG/1280px-S._Xo%C3%A1n_de_Portomar%C3%ADn.JPG"
      },
      {
        day: 10, from: "Portomarín", to: "Palas de Rei", km: 25, elevGain: 380, avgTempC: 12,
        startPt: "Iglesia de San Nicolás/San Juan, Portomarín", endPt: "Iglesia de San Tirso, Palas de Rei",
        terrain: "Rolling eucalyptus and oak woodland through Gonzar, Castromaior, and Ventas de Narón.",
        highlights: "Small Romanesque churches at nearly every hamlet, and quiet green farmland typical of interior Galicia.",
        lodging: lodgingFor("Palas de Rei"),
        packing: "Insect repellent for the wooded stretches around the hamlets past Gonzar.",
        services: "Correos Paq Mochila to Palas de Rei; the same ALSA Sarria–Santiago bus line stops here.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Iglesia_de_Santiago_de_Alb%C3%A1.jpg/1280px-Iglesia_de_Santiago_de_Alb%C3%A1.jpg"
      },
      {
        day: 11, from: "Palas de Rei", to: "Arzúa", km: 29, elevGain: 420, avgTempC: 12,
        startPt: "Iglesia de San Tirso, Palas de Rei", endPt: "Iglesia de Santiago, Arzúa",
        terrain: "The longest remaining stage, through eucalyptus forest and the market town of Melide before continuing to Arzúa.",
        highlights: "Melide's famous pulpo (octopus) restaurants — a near-mandatory lunch stop — and river crossings at the Catasol and Iso.",
        lodging: lodgingFor("Arzúa"),
        packing: "Cash for Melide's pulperías — card machines are unreliable in small village bars.",
        services: "Tuitrans luggage transfer to Arzúa; ALSA bus continues on the Sarria–Santiago route.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Casa_consistorial_de_Arz%C3%BAa.jpg/1280px-Casa_consistorial_de_Arz%C3%BAa.jpg"
      },
      {
        day: 12, from: "Arzúa", to: "O Pedrouzo", km: 19, elevGain: 280, avgTempC: 13,
        startPt: "Iglesia de Santiago, Arzúa", endPt: "Iglesia de Santa Eulalia, O Pedrouzo",
        terrain: "Shaded forest paths through Salceda and Santa Irene, the last quiet stretch before Santiago's outskirts.",
        highlights: "Cool eucalyptus and pine forest walking, and a growing sense of anticipation as route markers count down under 20 km.",
        lodging: lodgingFor("O Pedrouzo"),
        packing: "A comfortable daypack only — luggage transfer is strongly recommended for this shorter forest stage.",
        services: "Jacotrans/Correos luggage to O Pedrouzo; ALSA bus stops at O Pedrouzo/Arca.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Cami%C3%B1o_Franc%C3%A9s_2022_01c%2C_CIP_Cami%C3%B1o_de_Santiago%2C_Pedrouzo%2C_O_Pino.jpg/1280px-Cami%C3%B1o_Franc%C3%A9s_2022_01c%2C_CIP_Cami%C3%B1o_de_Santiago%2C_Pedrouzo%2C_O_Pino.jpg"
      },
      {
        day: 13, from: "O Pedrouzo", to: "Santiago de Compostela", km: 20, elevGain: 270, avgTempC: 13,
        startPt: "Iglesia de Santa Eulalia, O Pedrouzo", endPt: "Praza do Obradoiro, Santiago de Compostela",
        terrain: "A final climb to Monte do Gozo for the first distant view of the cathedral spires, then through Santiago's outskirts into the old town.",
        highlights: "Monte do Gozo's pilgrim monument, arrival at Praza do Obradoiro, the Botafumeiro (on scheduled days) and the Pilgrim's Mass at the cathedral.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Pack a clean layer for the Pilgrim's Mass and Praza do Obradoiro arrival photos.",
        services: "Final luggage drop in Santiago; ALSA and Monbus both terminate at the Santiago bus station near the old town.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg"
      },
      {
        day: 14, from: "Santiago de Compostela", to: "Santiago de Compostela", km: 0, elevGain: 0, avgTempC: 13,
        startPt: "Praza do Obradoiro", endPt: "Cabo Fisterra lighthouse (optional excursion)",
        terrain: "Rest day in Santiago, or an optional bus excursion to the Atlantic at Fisterra, historically considered 'the end of the world.'",
        highlights: "Visiting the cathedral crypt and Pilgrim Museum, the Mercado de Abastos food market, and — for those continuing — the cliffs and lighthouse at Cabo Fisterra.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "A light daypack for the Fisterra excursion; leave your main pack at your Santiago lodging.",
        services: "Optional Monbus excursion bus to Fisterra/Muxía (day return); no luggage transfer needed for a rest day.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Finisterre.JPG/1280px-Finisterre.JPG"
      }
    ]
  },

  // ------------------------------------------------------------------------
  // CAMINO PORTUGUÉS (CENTRAL) — Porto → Santiago (~240 km)
  // ------------------------------------------------------------------------
  portugues: {
    id: "portugues",
    label: "Camino Portugués",
    flag: "🇵🇹",
    tagline: "240 km along the Central Route — from Porto's Ribeira, over the Alto da Portela Grande, and across the Galician rías.",
    title: "Camino Portugués",
    subtitle: "Porto → Santiago de Compostela",
    startDate: "2027-04-10",
    totalKm: 238,
    routeName: "Camino Portugués Central (Porto to Santiago)",
    heroImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Porto_des_de_Vila_Nova_de_Gaia.JPG/1280px-Porto_des_de_Vila_Nova_de_Gaia.JPG",

    coords: {
      "Porto": [41.1579, -8.6291],
      "Vilarinho": [41.3350, -8.6050],
      "Barcelos": [41.5388, -8.6151],
      "Balugães": [41.6300, -8.6000],
      "Ponte de Lima": [41.7702, -8.5836],
      "Rubiães": [41.9500, -8.5200],
      "Tui": [42.0486, -8.6444],
      "O Porriño": [42.1364, -8.6389],
      "Redondela": [42.2839, -8.6111],
      "Pontevedra": [42.4310, -8.6444],
      "Caldas de Reis": [42.6008, -8.6412],
      "Padrón": [42.7423, -8.6595],
      "Santiago de Compostela": [42.8805, -8.5456]
    },

    airports: {
      start: {
        city: "Porto",
        primary: "Porto – Francisco Sá Carneiro Airport (OPO)",
        primaryNote: "Already a major international gateway. Take Metro Line E (violet) directly from the airport into central Porto in about 45 minutes.",
        international: "Porto – Francisco Sá Carneiro Airport (OPO)",
        internationalNote: "Extensive direct flights across Europe and beyond — no connecting flight or long train transfer needed to start this route.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Francisco_S%C3%A1_Carneiro_Airport_Terminal%2C_Porto%2C_Portugal_%2854837465581%29.jpg/1280px-Francisco_S%C3%A1_Carneiro_Airport_Terminal%2C_Porto%2C_Portugal_%2854837465581%29.jpg"
      },
      end: {
        city: "Santiago de Compostela",
        primary: "Santiago–Rosalía de Castro Airport (SCQ)",
        primaryNote: "About 12 km north of the city; buses and taxis reach the old town in roughly 20–30 minutes.",
        international: "Porto (OPO) or Madrid–Barajas (MAD)",
        internationalNote: "If you're flying home from elsewhere, Porto — where you started — is often the simplest option, roughly 2.5–3h away by bus/train; Madrid is a wider-reaching alternate.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Santiago_de_Compostela_-_LEST_Terminal.jpg/1280px-Santiago_de_Compostela_-_LEST_Terminal.jpg"
      }
    },

    services: {
      luggage: [
        { name: "Correos «Paq Mochila»", note: "Also covers the Spanish half of this route from Tui onward; book stage-to-stage transfers online or at participating lodgings." },
        { name: "Jacotrans", note: "Backpack courier operating across the Galician stages from Tui to Santiago." },
        { name: "Tuitrans", note: "Covers both sides of the Portugal–Spain border, including the steep Ponte de Lima–Rubiães stage where many pilgrims send bags ahead." }
      ],
      bus: [
        { name: "Rede Expressos", note: "Portugal's national coach network, useful around Porto, Barcelos, and Ponte de Lima." },
        { name: "CP (Comboios de Portugal)", note: "Regional trains shadow much of the route between Porto, Barcelos, and Valença near the Spanish border." },
        { name: "ALSA / Monbus", note: "Spanish regional bus operators covering Tui through to Santiago once you cross the border." }
      ]
    },

    basePacking: {
      "Footwear & feet": [
        "Broken-in trail shoes or boots",
        "Cobblestone-friendly cushioned insoles",
        "2–3 pairs moisture-wicking socks + liner socks",
        "Sandals or lightweight shoes for evenings",
        "Blister kit (tape, needle, antiseptic)"
      ],
      "Clothing": [
        "2 quick-dry T-shirts/base layers",
        "1 mid-layer fleece or light insulated jacket",
        "Waterproof rain jacket + pack cover",
        "Convertible or quick-dry trousers",
        "Sun hat + light buff/scarf",
        "Quick-dry underwear & sports bras",
        "Lightweight gloves for the Alto da Portela Grande climb"
      ],
      "Pack & sleep": [
        "30–35L backpack with hip belt",
        "Sleeping bag liner (for albergues)",
        "Earplugs & eye mask",
        "Trekking poles",
        "Small padlock for lockers"
      ],
      "Health & toiletries": [
        "Sunscreen SPF 50",
        "Personal medications + basic first-aid",
        "Electrolyte tablets",
        "Travel-size toiletries",
        "Hand sanitizer"
      ],
      "Tech & documents": [
        "Passport/ID + pilgrim credential (credencial)",
        "Phone + charger + power bank",
        "Camino guide app or paper guide",
        "Travel insurance details",
        "Euros in small bills for rural stops on both sides of the border"
      ]
    },

    days: [
      {
        day: 1, from: "Porto", to: "Vilarinho", km: 20, elevGain: 120, avgTempC: 14,
        startPt: "Sé do Porto (Porto Cathedral)", endPt: "Capela de Vilarinho",
        terrain: "Leaving Porto's old town along the Douro, through the northern suburbs before quieter roads and light industry give way to countryside near Vilarinho.",
        highlights: "Porto's cathedral and Ribeira waterfront at the start, azulejo-tiled streets, and the gradual shift from city to countryside.",
        lodging: lodgingFor("Vilarinho"),
        packing: "Cobblestone-friendly socks and cushioned insoles — Porto's granite streets are hard on feet from the very first steps.",
        services: "Correos Paq Mochila to Vilarinho; CP suburban trains parallel the route out of Porto if you want to skip ahead.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Porto%2C_S%C3%A9_do_Porto_%289%29.jpg/1280px-Porto%2C_S%C3%A9_do_Porto_%289%29.jpg"
      },
      {
        day: 2, from: "Vilarinho", to: "Barcelos", km: 24, elevGain: 200, avgTempC: 14,
        startPt: "Capela de Vilarinho", endPt: "Igreja Matriz de Barcelos",
        terrain: "Rolling farmland and eucalyptus lanes along the Rio Este valley into Barcelos.",
        highlights: "Quiet rural Minho scenery, small stone chapels, and Barcelos' famous rooster legend and medieval bridge over the Cávado.",
        lodging: lodgingFor("Barcelos"),
        packing: "Sun sleeves and a light rain shell — this stage alternates between open road walking and shaded lanes.",
        services: "Tuitrans luggage transfer to Barcelos; the CP regional train (Porto–Barcelos–Braga line) shadows this stage.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Spacerkiem_po_Barcelos_%2836613647401%29.jpg/1280px-Spacerkiem_po_Barcelos_%2836613647401%29.jpg"
      },
      {
        day: 3, from: "Barcelos", to: "Balugães", km: 20, elevGain: 180, avgTempC: 14,
        startPt: "Igreja Matriz de Barcelos", endPt: "Igreja de Balugães",
        terrain: "Quiet farm tracks and country lanes north through Tamel and small Minho parishes.",
        highlights: "Cornfields and vineyard-covered pergolas typical of the Minho, and small parish churches along a gentler, less-touristed stretch.",
        lodging: lodgingFor("Balugães"),
        packing: "Blister prevention tape — a long day; consider the luggage transfer option if it's your first long stage.",
        services: "Correos Paq Mochila to Balugães; Rede Expressos coaches connect Barcelos onward if needed.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Casa_da_Azenha_-_Barcelos_-_Portugal_%2852407547029%29.jpg/1280px-Casa_da_Azenha_-_Barcelos_-_Portugal_%2852407547029%29.jpg"
      },
      {
        day: 4, from: "Balugães", to: "Ponte de Lima", km: 18, elevGain: 160, avgTempC: 14,
        startPt: "Igreja de Balugães", endPt: "Ponte medieval sobre o Rio Lima, Ponte de Lima",
        terrain: "Rural lanes and eucalyptus woods descending toward the Lima valley.",
        highlights: "Arrival at Ponte de Lima — Portugal's oldest chartered town — and its Roman-medieval bridge and riverside gardens.",
        lodging: lodgingFor("Ponte de Lima"),
        packing: "A comfortable daypack; Ponte de Lima's bridge and riverside gardens are worth lingering over before pressing on.",
        services: "Tuitrans luggage transfer to Ponte de Lima; local municipal buses link back to Barcelos/Viana do Castelo.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Aerial_Ponte_de_Lima.jpg/1280px-Aerial_Ponte_de_Lima.jpg"
      },
      {
        day: 5, from: "Ponte de Lima", to: "Rubiães", km: 18, elevGain: 480, avgTempC: 12,
        startPt: "Ponte medieval sobre o Rio Lima", endPt: "Igreja de Rubiães",
        terrain: "The steepest climb of the whole route, up granite tracks and through eucalyptus forest over the Alto da Portela Grande.",
        highlights: "Sweeping views back over the Lima valley from the ridge, and granite hamlets typical of this hillier stretch.",
        lodging: lodgingFor("Rubiães"),
        packing: "Moisture-wicking base layer and trekking poles for the steepest climb of the whole route.",
        services: "Jacotrans/Correos luggage to Rubiães (a steep stage — most pilgrims send bags); no direct bus over the Alto da Portela Grande.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Atalaia_de_Lovelhe_-_Vila_Nova_de_Cerveira_-_25.jpg/1280px-Atalaia_de_Lovelhe_-_Vila_Nova_de_Cerveira_-_25.jpg"
      },
      {
        day: 6, from: "Rubiães", to: "Tui", km: 19, elevGain: 150, avgTempC: 13,
        startPt: "Igreja de Rubiães", endPt: "Catedral de Tui / Ponte Internacional",
        terrain: "A long descent from the hills to the Minho river valley, crossing into Spain over the international bridge at Valença–Tui.",
        highlights: "Valença's star-fort walls seen across the river, crossing the Rio Minho into Spain, and Tui's fortress-cathedral overlooking the border.",
        lodging: lodgingFor("Tui"),
        packing: "Passport/ID handy — you'll cross the international bridge into Spain today; pack a rain layer for the Miño valley.",
        services: "Tuitrans luggage transfer across the border to Tui; ALSA buses connect Valença–Tui–O Porriño.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Tui_Mi%C3%B1o_060415.jpg/1280px-Tui_Mi%C3%B1o_060415.jpg"
      },
      {
        day: 7, from: "Tui", to: "O Porriño", km: 18, elevGain: 110, avgTempC: 13,
        startPt: "Catedral de Tui", endPt: "Estación de tren, O Porriño",
        terrain: "Riverside and woodland paths following the Río Louro into O Porriño.",
        highlights: "Tui's old town and cathedral ramparts, then O Porriño's striking Art Deco granite train station.",
        lodging: lodgingFor("O Porriño"),
        packing: "Nothing special — a shorter, mostly flat stage; a good day to air out socks and boots.",
        services: "Correos Paq Mochila to O Porriño; Renfe/CP cross-border services and ALSA buses both stop here.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Estaci%C3%B3n_de_trens_do_Porri%C3%B1o.jpg/1280px-Estaci%C3%B3n_de_trens_do_Porri%C3%B1o.jpg"
      },
      {
        day: 8, from: "O Porriño", to: "Redondela", km: 15, elevGain: 300, avgTempC: 13,
        startPt: "Estación de tren, O Porriño", endPt: "Os Viadutos, Redondela",
        terrain: "A climb through pine and eucalyptus forest over the Alto do Cornado, then downhill into Redondela.",
        highlights: "Forest walking with views toward the Vigo estuary, and Redondela's twin 19th-century railway viaducts framing the old town.",
        lodging: lodgingFor("Redondela"),
        packing: "Waterproof jacket for the forest climb over the Alto do Cornado.",
        services: "Jacotrans luggage transfer to Redondela; the Renfe local train (O Porriño–Vigo–Redondela) parallels the route.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/San_Sim%C3%B3n_08_053.JPG/1280px-San_Sim%C3%B3n_08_053.JPG"
      },
      {
        day: 9, from: "Redondela", to: "Pontevedra", km: 20, elevGain: 250, avgTempC: 13,
        startPt: "Os Viadutos, Redondela", endPt: "Praza da Ferrería, Pontevedra",
        terrain: "Along the Vigo estuary through the oyster village of Arcade, crossing the Ponte Sampaio bridge before climbing gently into Pontevedra.",
        highlights: "Fresh oysters in Arcade, the Ponte Sampaio bridge (site of an 1809 battle against Napoleon's army), and Pontevedra's beautifully preserved granite old town.",
        lodging: lodgingFor("Pontevedra"),
        packing: "Fresh socks — cobbled old-town streets are pretty but unforgiving on tired feet.",
        services: "Tuitrans/Correos luggage to Pontevedra; Renfe and ALSA both serve Pontevedra's combined station.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pontevedra_13_Praza_da_le%C3%B1a_modified.jpg/1280px-Pontevedra_13_Praza_da_le%C3%B1a_modified.jpg"
      },
      {
        day: 10, from: "Pontevedra", to: "Caldas de Reis", km: 22, elevGain: 220, avgTempC: 13,
        startPt: "Praza da Ferrería, Pontevedra", endPt: "Ponte Romana / thermal springs, Caldas de Reis",
        terrain: "Woodland and riverside tracks along the Río Umia into the thermal-spring town of Caldas de Reis.",
        highlights: "Shaded river paths, and Caldas de Reis' natural hot springs — a well-earned soak at the end of the day.",
        lodging: lodgingFor("Caldas de Reis"),
        packing: "Swimsuit if you fancy the thermal pools after a warm afternoon arrival.",
        services: "Jacotrans luggage transfer to Caldas de Reis; Monbus connects Pontevedra–Caldas de Reis–Padrón.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ayuntamiento_001._Caldas_de_Reyes.jpg/1280px-Ayuntamiento_001._Caldas_de_Reyes.jpg"
      },
      {
        day: 11, from: "Caldas de Reis", to: "Padrón", km: 19, elevGain: 150, avgTempC: 13,
        startPt: "Ponte Romana, Caldas de Reis", endPt: "Igreja de Santiago, Padrón",
        terrain: "Gentle riverside walking down the Río Sar valley into Padrón.",
        highlights: "Padrón's legendary stone said to have anchored St. James's boat, and the town's famous pimientos de Padrón.",
        lodging: lodgingFor("Padrón"),
        packing: "Light layers — this valley stage can be warm and sheltered from wind.",
        services: "Correos Paq Mochila to Padrón; Renfe local train and Monbus both run Padrón–Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Graffiti._Padr%C3%B3n._Galiza.PA13.jpg/1280px-Graffiti._Padr%C3%B3n._Galiza.PA13.jpg"
      },
      {
        day: 12, from: "Padrón", to: "Santiago de Compostela", km: 25, elevGain: 280, avgTempC: 13,
        startPt: "Igreja de Santiago, Padrón", endPt: "Praza do Obradoiro, Santiago de Compostela",
        terrain: "The final stage through Rúa de Padrón and A Escravitude, climbing gently into Santiago's outskirts and the old town.",
        highlights: "Parque de Vista Alegre, first views of the cathedral towers, and arrival at Praza do Obradoiro for the Pilgrim's Mass.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Pack a clean layer for the Pilgrim's Mass and Praza do Obradoiro arrival photos.",
        services: "Final luggage drop in Santiago; Monbus and ALSA terminate at the Santiago bus station.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg"
      },
      {
        day: 13, from: "Santiago de Compostela", to: "Santiago de Compostela", km: 0, elevGain: 0, avgTempC: 13,
        startPt: "Praza do Obradoiro", endPt: "Mercado de Abastos, Santiago de Compostela",
        terrain: "Rest day exploring Santiago's old town on foot.",
        highlights: "The cathedral's crypt and rooftop/museum tours, the Mercado de Abastos food market, and wandering the granite lanes of the old town.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Comfortable everyday shoes for wandering the old town and cathedral museum.",
        services: "No transfer needed — rest day in Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg"
      },
      {
        day: 14, from: "Santiago de Compostela", to: "Santiago de Compostela", km: 0, elevGain: 0, avgTempC: 13,
        startPt: "Santiago de Compostela", endPt: "Santuario da Virxe da Barca, Muxía",
        terrain: "Optional bus day-trip to the Costa da Morte for Fisterra and/or Muxía.",
        highlights: "The Atlantic cliffs and lighthouse at Fisterra, and Muxía's wave-battered sanctuary church, both historically considered 'the end of the world.'",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Windproof layer for the Atlantic coast — it's noticeably cooler and breezier than inland Galicia.",
        services: "Optional Monbus excursion bus to Fisterra/Muxía (day return).",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Casa_consistorial_de_Mux%C3%ADa.jpg/1280px-Casa_consistorial_de_Mux%C3%ADa.jpg"
      }
    ]
  },

  // ------------------------------------------------------------------------
  // CAMINO PORTUGUÊS (COASTAL) — Porto → Santiago → Porto by train (~270 km)
  // ------------------------------------------------------------------------
  portugues_costa: {
    id: "portugues_costa",
    label: "Camino Português (Coastal)",
    flag: "🇵🇹",
    tagline: "270 km up the Atlantic edge — boardwalks over the dunes, a river-mouth crossing into Spain, and a scripted train ride home to Porto.",
    title: "Camino Português (Coastal)",
    subtitle: "Porto → Santiago de Compostela → Porto (by train)",
    startDate: "2027-04-10",
    totalKm: 270,
    routeName: "Camino Português Costal (Porto to Santiago, round trip by train)",
    heroImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Passadi%C3%A7os_%2835736701361%29.jpg/1280px-Passadi%C3%A7os_%2835736701361%29.jpg",

    coords: {
      "Porto": [41.1579, -8.6291],
      "Vila do Conde": [41.3515, -8.7436],
      "Esposende": [41.5368, -8.7827],
      "Viana do Castelo": [41.6947, -8.8314],
      "Vila Praia de Âncora": [41.8167, -8.8667],
      "Caminha": [41.8752, -8.8377],
      "A Guarda": [41.9024, -8.8698],
      "Baiona": [42.1169, -8.8459],
      "Vigo": [42.2406, -8.7207],
      "Redondela": [42.2839, -8.6111],
      "Pontevedra": [42.4310, -8.6444],
      "Caldas de Reis": [42.6008, -8.6412],
      "Padrón": [42.7423, -8.6595],
      "Santiago de Compostela": [42.8805, -8.5456]
    },

    airports: {
      start: {
        city: "Porto",
        primary: "Porto – Francisco Sá Carneiro Airport (OPO)",
        primaryNote: "Already a major international gateway. Take Metro Line E (violet) directly from the airport into central Porto in about 45 minutes.",
        international: "Porto – Francisco Sá Carneiro Airport (OPO)",
        internationalNote: "Extensive direct flights across Europe and beyond — handy here, since the route loops back to Porto by train (see Day 15), so most pilgrims fly in and out of the same airport.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Francisco_S%C3%A1_Carneiro_Airport_Terminal%2C_Porto%2C_Portugal_%2854837465581%29.jpg/1280px-Francisco_S%C3%A1_Carneiro_Airport_Terminal%2C_Porto%2C_Portugal_%2854837465581%29.jpg"
      },
      end: {
        city: "Santiago de Compostela",
        primary: "Santiago–Rosalía de Castro Airport (SCQ)",
        primaryNote: "About 12 km north of the city; relevant only if you break from the plan and fly out of Santiago instead of taking the scripted Day 15 train back to Porto.",
        international: "Porto (OPO)",
        internationalNote: "This route is designed as a loop: Day 15 is a train from Santiago back to Porto, so there's no need to fly out of Santiago at all — SCQ is here only as a fallback.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Santiago_de_Compostela_-_LEST_Terminal.jpg/1280px-Santiago_de_Compostela_-_LEST_Terminal.jpg"
      }
    },

    services: {
      luggage: [
        { name: "Correos «Paq Mochila»", note: "Covers the Spanish half of this route from A Guarda onward; book stage-to-stage transfers online or at participating lodgings." },
        { name: "Jacotrans", note: "Backpack courier operating across the longer coastal stages, including the Baiona leg." },
        { name: "Tuitrans", note: "Covers both sides of the Portugal–Spain border, including the Caminha–A Guarda river crossing." }
      ],
      bus: [
        { name: "CP (Comboios de Portugal)", note: "Regional trains shadow most of the Portuguese coastal stages between Porto, Vila do Conde, Esposende, Viana do Castelo, and Caminha." },
        { name: "Rede Expressos", note: "Portugal's national coach network, useful as a backup around Porto and Viana do Castelo." },
        { name: "ALSA / Monbus", note: "Spanish regional bus operators covering A Guarda through to Santiago once you cross the border." },
        { name: "CP / Renfe combined service", note: "The Santiago–Porto train used for the scripted Day 15 return; typically routes via Vigo with one change, roughly 3.5–4.5h total — book ahead via cp.pt or renfe.com." }
      ]
    },

    basePacking: {
      "Footwear & feet": [
        "Broken-in trail shoes or boots",
        "Sand-friendly socks for the dune boardwalks",
        "2–3 pairs moisture-wicking socks + liner socks",
        "Sandals or lightweight shoes for evenings",
        "Blister kit (tape, needle, antiseptic)"
      ],
      "Clothing": [
        "2 quick-dry T-shirts/base layers",
        "1 mid-layer fleece or light insulated jacket",
        "Waterproof rain jacket + pack cover (coastal weather turns quickly)",
        "Convertible or quick-dry trousers",
        "Sun hat + sunglasses",
        "Swimsuit for a beach or thermal-spring dip",
        "Quick-dry underwear & sports bras"
      ],
      "Pack & sleep": [
        "30–35L backpack with hip belt",
        "Sleeping bag liner (for albergues)",
        "Earplugs & eye mask",
        "Trekking poles",
        "Small padlock for lockers"
      ],
      "Health & toiletries": [
        "Reef-safe sunscreen SPF 50 (lots of open coastal walking)",
        "Personal medications + basic first-aid",
        "Electrolyte tablets",
        "Travel-size toiletries",
        "Hand sanitizer"
      ],
      "Tech & documents": [
        "Passport/ID + pilgrim credential (credencial) — needed for the Caminha–A Guarda ferry crossing",
        "Phone + charger + power bank",
        "Camino guide app or paper guide",
        "Train tickets/booking confirmation for the Day 15 Santiago–Porto return",
        "Euros in small bills for rural stops on both sides of the border"
      ]
    },

    days: [
      {
        day: 1, from: "Porto", to: "Vila do Conde", km: 27, elevGain: 140, avgTempC: 14,
        startPt: "Sé do Porto (Porto Cathedral)", endPt: "Mosteiro de Santa Clara, Vila do Conde",
        terrain: "Leaving Porto's Ribeira along the Douro and the Atlantic-facing Foz district, then a long coastal/riverside walk up through Matosinhos and into Vila do Conde's working harbour.",
        highlights: "Porto's cathedral and azulejo streets at the start, the Matosinhos fishing port, and Vila do Conde's towering aqueduct and Santa Clara convent.",
        lodging: lodgingFor("Vila do Conde"),
        packing: "Sunscreen and a hat from day one — this stage has little shade along the river and harbour roads.",
        services: "Correos Paq Mochila to Vila do Conde; CP suburban/coastal trains parallel this stage out of Porto.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Vila_do_Conde.JPG/1280px-Vila_do_Conde.JPG"
      },
      {
        day: 2, from: "Vila do Conde", to: "Esposende", km: 23, elevGain: 100, avgTempC: 14,
        startPt: "Mosteiro de Santa Clara, Vila do Conde", endPt: "Foz do Cávado, Esposende",
        terrain: "Beachfront boardwalks and dune paths north along the Atlantic, crossing the Rio Ave near the start.",
        highlights: "Long stretches of wooden passadiços over the dunes, pine-backed beaches, and the Cávado river mouth at Esposende.",
        lodging: lodgingFor("Esposende"),
        packing: "Comfortable socks for sandy boardwalk sections; a swimsuit if you fancy a dip at Ofir or Apúlia beach.",
        services: "Tuitrans luggage transfer to Esposende; Rede Expressos coaches connect back to Porto if needed.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/C%C3%A2mara_de_Esposende.jpg/1280px-C%C3%A2mara_de_Esposende.jpg"
      },
      {
        day: 3, from: "Esposende", to: "Viana do Castelo", km: 20, elevGain: 130, avgTempC: 14,
        startPt: "Foz do Cávado, Esposende", endPt: "Praça da República, Viana do Castelo",
        terrain: "More coastal boardwalk and quiet fishing villages, arriving into Viana do Castelo's riverside old town.",
        highlights: "Castelo do Neiva's ancient church, sweeping Atlantic views, and Viana do Castelo's Renaissance old town beneath Monte de Santa Luzia.",
        lodging: lodgingFor("Viana do Castelo"),
        packing: "Light layers — the sea breeze keeps the coast cooler than inland stages, even in April.",
        services: "Correos Paq Mochila to Viana do Castelo; CP regional trains serve the town directly.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Viana_do_Castelo_%2815727153460%29.jpg/1280px-Viana_do_Castelo_%2815727153460%29.jpg"
      },
      {
        day: 4, from: "Viana do Castelo", to: "Vila Praia de Âncora", km: 18, elevGain: 120, avgTempC: 14,
        startPt: "Praça da República, Viana do Castelo", endPt: "Igreja Matriz, Vila Praia de Âncora",
        terrain: "Riverside and pinewood paths hugging the coast, crossing the Rio Lima near the start.",
        highlights: "Shaded pine forest after days in the open sun, and the quiet beach town of Vila Praia de Âncora.",
        lodging: lodgingFor("Vila Praia de Âncora"),
        packing: "Insect repellent for the pine forest stretches near Âncora.",
        services: "Jacotrans luggage transfer to Vila Praia de Âncora; local buses link back to Viana do Castelo.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/IgrejaMatrizVPraiaAncora.jpg/1280px-IgrejaMatrizVPraiaAncora.jpg"
      },
      {
        day: 5, from: "Vila Praia de Âncora", to: "Caminha", km: 10, elevGain: 70, avgTempC: 14,
        startPt: "Igreja Matriz, Vila Praia de Âncora", endPt: "Torre do Relógio, Caminha",
        terrain: "A short, easy coastal stretch — a good day to rest legs before tomorrow's border crossing.",
        highlights: "Caminha's medieval clock tower and riverside square where the Rio Minho meets the Atlantic.",
        lodging: lodgingFor("Caminha"),
        packing: "Nothing new — a short, easy day to rest your legs before the border crossing.",
        services: "Tuitrans luggage transfer to Caminha; CP trains reach Caminha, the last stop before the border.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Caminha_e_Camposancos.JPG/1280px-Caminha_e_Camposancos.JPG"
      },
      {
        day: 6, from: "Caminha", to: "A Guarda", km: 17, elevGain: 320, avgTempC: 14,
        startPt: "Torre do Relógio, Caminha", endPt: "Monte de Santa Trega, A Guarda",
        terrain: "A small passenger ferry crosses the Rio Minho from Caminha to A Guarda, trading Portugal for Spain mid-stage; the afternoon climbs toward the Celtic hillfort above town.",
        highlights: "Crossing international waters by boat, A Guarda's fishing harbour, and sweeping Atlantic views from the Castro de Santa Trega.",
        lodging: lodgingFor("A Guarda"),
        packing: "Keep your passport/ID handy for the Caminha–A Guarda ferry crossing into Spain.",
        services: "Correos Paq Mochila (Spain side) picks up from A Guarda; the passenger ferry replaces any bus for this crossing.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/View_of_A_Guarda._Galiza_G46.jpg/1280px-View_of_A_Guarda._Galiza_G46.jpg"
      },
      {
        day: 7, from: "A Guarda", to: "Baiona", km: 29, elevGain: 480, avgTempC: 14,
        startPt: "Monte de Santa Trega, A Guarda", endPt: "Fortaleza de Monterreal, Baiona",
        terrain: "A long, scenic clifftop and beach-town stretch via Oia's clifftop monastery, continuing along the Rías Baixas coastline into Baiona.",
        highlights: "Oia's Cistercian monastery perched above the surf, and Baiona's Monterreal fortress — where the first news of Columbus's return to the Americas reached Europe in 1493.",
        lodging: lodgingFor("Baiona"),
        packing: "Broken-in boots and extra snacks — this is the longest stage on the coastal route.",
        services: "Jacotrans luggage transfer to Baiona (a long stage — many pilgrims send bags); ALSA buses connect Baiona to Vigo.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Vista_do_porto_de_Baiona_desde_Monterreal-cropped.jpg/1280px-Vista_do_porto_de_Baiona_desde_Monterreal-cropped.jpg"
      },
      {
        day: 8, from: "Baiona", to: "Vigo", km: 24, elevGain: 320, avgTempC: 14,
        startPt: "Fortaleza de Monterreal, Baiona", endPt: "Casco Vello, Vigo",
        terrain: "Coastal road and headland paths around the Ría de Vigo, with increasingly urban surroundings on the approach into the city.",
        highlights: "Views across the Ría de Vigo to the Cíes Islands, and Vigo's lively old town and harbourfront.",
        lodging: lodgingFor("Vigo"),
        packing: "Comfortable shoes for Vigo's hilly old town streets.",
        services: "Tuitrans/Correos luggage to Vigo; Vigo's Urzáiz station has frequent Renfe/CP connections in all directions.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Pazo_Qui%C3%B1ones_de_Le%C3%B3n%2C_Castrelos_edited.jpg/1280px-Pazo_Qui%C3%B1ones_de_Le%C3%B3n%2C_Castrelos_edited.jpg"
      },
      {
        day: 9, from: "Vigo", to: "Redondela", km: 16, elevGain: 280, avgTempC: 13,
        startPt: "Casco Vello, Vigo", endPt: "Os Viadutos, Redondela",
        terrain: "Leaving Vigo through its outskirts and woodland, rejoining the Camino Central route at Redondela.",
        highlights: "From here to Santiago this stretch is shared with the Central Portuguese Way, starting with Redondela's twin 19th-century railway viaducts.",
        lodging: lodgingFor("Redondela"),
        packing: "Waterproof jacket handy — this stretch of coast can turn showery with little warning.",
        services: "Jacotrans luggage transfer to Redondela; the Renfe local train (Vigo–Redondela) parallels the route.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/San_Sim%C3%B3n_08_053.JPG/1280px-San_Sim%C3%B3n_08_053.JPG"
      },
      {
        day: 10, from: "Redondela", to: "Pontevedra", km: 20, elevGain: 250, avgTempC: 13,
        startPt: "Os Viadutos, Redondela", endPt: "Praza da Ferrería, Pontevedra",
        terrain: "Along the Vigo estuary through the oyster village of Arcade, crossing the Ponte Sampaio bridge before climbing gently into Pontevedra.",
        highlights: "Fresh oysters in Arcade, the Ponte Sampaio bridge (site of an 1809 battle against Napoleon's army), and Pontevedra's beautifully preserved granite old town.",
        lodging: lodgingFor("Pontevedra"),
        packing: "Fresh socks — cobbled old-town streets are pretty but unforgiving on tired feet.",
        services: "Tuitrans/Correos luggage to Pontevedra; Renfe and ALSA both serve Pontevedra's combined station.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Pontevedra_13_Praza_da_le%C3%B1a_modified.jpg/1280px-Pontevedra_13_Praza_da_le%C3%B1a_modified.jpg"
      },
      {
        day: 11, from: "Pontevedra", to: "Caldas de Reis", km: 22, elevGain: 220, avgTempC: 13,
        startPt: "Praza da Ferrería, Pontevedra", endPt: "Ponte Romana / thermal springs, Caldas de Reis",
        terrain: "Woodland and riverside tracks along the Río Umia into the thermal-spring town of Caldas de Reis.",
        highlights: "Shaded river paths, and Caldas de Reis' natural hot springs — a well-earned soak at the end of the day.",
        lodging: lodgingFor("Caldas de Reis"),
        packing: "Swimsuit if you fancy the thermal pools after a warm afternoon arrival.",
        services: "Jacotrans luggage transfer to Caldas de Reis; Monbus connects Pontevedra–Caldas de Reis–Padrón.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ayuntamiento_001._Caldas_de_Reyes.jpg/1280px-Ayuntamiento_001._Caldas_de_Reyes.jpg"
      },
      {
        day: 12, from: "Caldas de Reis", to: "Padrón", km: 19, elevGain: 150, avgTempC: 13,
        startPt: "Ponte Romana, Caldas de Reis", endPt: "Igreja de Santiago, Padrón",
        terrain: "Gentle riverside walking down the Río Sar valley into Padrón.",
        highlights: "Padrón's legendary stone said to have anchored St. James's boat, and the town's famous pimientos de Padrón.",
        lodging: lodgingFor("Padrón"),
        packing: "Light layers — this valley stage can be warm and sheltered from wind.",
        services: "Correos Paq Mochila to Padrón; Renfe local train and Monbus both run Padrón–Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Graffiti._Padr%C3%B3n._Galiza.PA13.jpg/1280px-Graffiti._Padr%C3%B3n._Galiza.PA13.jpg"
      },
      {
        day: 13, from: "Padrón", to: "Santiago de Compostela", km: 25, elevGain: 280, avgTempC: 13,
        startPt: "Igreja de Santiago, Padrón", endPt: "Praza do Obradoiro, Santiago de Compostela",
        terrain: "The final stage through Rúa de Padrón and A Escravitude, climbing gently into Santiago's outskirts and the old town.",
        highlights: "Parque de Vista Alegre, first views of the cathedral towers, and arrival at Praza do Obradoiro for the Pilgrim's Mass.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Pack a clean layer for the Pilgrim's Mass and Praza do Obradoiro arrival photos.",
        services: "Final luggage drop in Santiago; Monbus and ALSA terminate at the Santiago bus station.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg"
      },
      {
        day: 14, from: "Santiago de Compostela", to: "Santiago de Compostela", km: 0, elevGain: 0, avgTempC: 13,
        startPt: "Praza do Obradoiro", endPt: "Mercado de Abastos, Santiago de Compostela",
        terrain: "Rest day exploring Santiago's old town on foot before tomorrow's train journey back to Porto.",
        highlights: "The cathedral's crypt and rooftop/museum tours, the Mercado de Abastos food market, and wandering the granite lanes of the old town.",
        lodging: lodgingFor("Santiago de Compostela"),
        packing: "Comfortable everyday shoes for wandering the old town and cathedral museum.",
        services: "No transfer needed — rest day in Santiago.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Santiago_cathedral_2021.jpg/1280px-Santiago_cathedral_2021.jpg"
      },
      {
        day: 15, from: "Santiago de Compostela", to: "Porto", km: 0, elevGain: 0, avgTempC: 14, type: "train",
        startPt: "Santiago de Compostela train station", endPt: "Porto São Bento / Porto Campanhã station",
        terrain: "A travel day, not a walking stage: a scripted train journey back along the coast from Santiago to Porto, closing the loop on this route.",
        highlights: "Scenic rail views back down the Galician and Minho coastlines, and a last stop at Porto's azulejo-tiled São Bento station before flying home.",
        lodging: lodgingFor("Porto"),
        packing: "Pack the night before — it's a travel day, not a walking day; keep your credential/Compostela handy as a souvenir.",
        services: "Combined CP/Renfe service from Santiago to Porto (commonly via a change at Vigo), roughly 3.5–4.5h total; book ahead via cp.pt or renfe.com. No luggage transfer needed.",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Esta%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Porto_-_S%C3%A3o_Bento.JPG/1280px-Esta%C3%A7%C3%A3o_Ferrovi%C3%A1ria_de_Porto_-_S%C3%A3o_Bento.JPG"
      }
    ]
  }
};

const TEAM = [
  { name: "Subhash", role: "Organizer", photo: "team/subhash.jpg" },
  { name: "Amar", role: "Pilgrim", photo: "team/amar.jpg" },
  { name: "Anitha", role: "Pilgrim", photo: "team/anitha.jpg" },
  { name: "Kumar", role: "Pilgrim", photo: "team/kumar.jpg" },
  { name: "Lata", role: "Pilgrim", photo: "team/lata.jpg" },
  { name: "Raji", role: "Pilgrim", photo: "team/raji.jpg" },
  { name: "Rekha", role: "Pilgrim", photo: "team/rekha.jpg" },
  { name: "Shivu", role: "Pilgrim", photo: "team/shivu.jpg" },
  { name: "Viji", role: "Pilgrim", photo: "team/viji.jpg" }
];

const TRIP = ROUTES[DEFAULT_ROUTE]; // back-compat alias
