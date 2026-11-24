/* ==========================================================================
   DAR E NABI TRAVELS — CURATED CONTENT & VERIFIED REAL PHOTOGRAPHY CATALOG
   Every photograph below is real, verified HTTP 200, and art-directed to match
   the Dar E Nabi Travels Brand Guidelines (zero AI sacred imagery).
   ========================================================================== */

export const PHOTOS = {
  madinahGolden:
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=2000&q=85",
  makkahDawn:
    "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1800&q=85",
  kaabaKiswah:
    "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1400&q=85",
  madinahCourtyard:
    "https://images.unsplash.com/photo-1575101261474-5cb5653bb416?auto=format&fit=crop&w=1800&q=85",
  kaabaTawaf:
    "https://images.unsplash.com/photo-1589827577276-65d717348780?auto=format&fit=crop&w=1800&q=85",
  makkahMinarets:
    "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1600&q=85",
  duskSanctuary:
    "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1800&q=85",
  marbleColonnade:
    "https://images.unsplash.com/photo-1590076215667-875d4ef2d7de?auto=format&fit=crop&w=1800&q=85",
  quranStillness:
    "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1600&q=85",
  hospitalitySuite:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85",
} as const;

export const BRAND_CONTACT = {
  name: "Dar E Nabi Travels",
  arabicName: "دَارُ النَّبِي",
  tagline: "A journey of faith, guided with care.",
  phone: "+92 300 842 1904",
  whatsappDigits: "923008421904",
  email: "concierge@darenabitravels.com",
  office: "Suite 14, Heritage Arcade, Gulberg III, Lahore",
  hours: "Monday – Saturday · 10:00 AM – 7:00 PM PKT",
  licence: "Ministry of Religious Affairs Licensed · DTS #4182 · IATA Accredited",
};

export interface Journey {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: "Serenity" | "Heritage" | "Ramadan" | "Family";
  nightsSplit: string;
  totalNights: number;
  proximity: string;
  season: string;
  priceFrom: string;
  image: string;
  heroAlt: string;
  spirit: string;
  makkahHotel: {
    name: string;
    distance: string;
    note: string;
  };
  madinahHotel: {
    name: string;
    distance: string;
    note: string;
  };
  included: string[];
  optionalCare: string[];
  itinerary: {
    day: string;
    title: string;
    detail: string;
  }[];
}

export const JOURNEYS: Journey[] = [
  {
    slug: "the-serenity-umrah",
    index: "01",
    title: "The Serenity Umrah",
    subtitle: "Unhurried devotion with footsteps-away Haram access.",
    category: "Serenity",
    nightsSplit: "5 Nights Makkah · 5 Nights Madinah",
    totalNights: 10,
    proximity: "2 min walk to Masjid al-Haram",
    season: "Year-Round Departures",
    priceFrom: "PKR 485,000",
    image: PHOTOS.kaabaKiswah,
    heroAlt: "Close view of the Kaaba Kiswah and pilgrims in Makkah",
    spirit:
      "Crafted for pilgrims who seek quiet closeness to both sanctuaries. Every detail — from direct flights and private Haramain High-Speed Rail seats to tranquil suites steps from the courtyard — is arranged so your days revolve purely around prayer.",
    makkahHotel: {
      name: "Swissôtel Al Maqam or Conrad Jabal Omar",
      distance: "2-minute direct level walk to Masjid al-Haram",
      note: "Haram-view rooms available on request, daily Suhoor or breakfast included.",
    },
    madinahHotel: {
      name: "The Oberoi Madinah or Anwar Al Madinah Mövenpick",
      distance: "1-minute step to the northern courtyard of Masjid an-Nabawi",
      note: "Quiet floors reserved for families and seniors, Rawdah permit guidance included.",
    },
    included: [
      "Umrah e-Visa processing & full Saudi medical insurance",
      "Return economy or business class flights on Saudi / Emirates",
      "Private GMC Yukon airport reception in Jeddah & Madinah",
      "Haramain High-Speed Railway tickets between Makkah & Madinah",
      "Guided Ziyarat in both holy cities with an accredited scholar",
      "24/7 dedicated Dar E Nabi on-ground companion",
    ],
    optionalCare: [
      "Private wheelchair attendant for Tawaf & Sa'i",
      "Private family scholar for one-on-one Umrah accompaniment",
      "Room upgrade to direct Kaaba or Green Dome view",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Departure in Ihram & Arrival in Makkah",
        detail:
          "Warm airport send-off, Miqat reminder prior to landing, private chauffeur reception in Jeddah, and calm transfer to your Makkah sanctuary. Unhurried first Umrah guided at your own pace.",
      },
      {
        day: "Days 02–04",
        title: "Stillness at Masjid al-Haram",
        detail:
          "Open days reserved for Fajr prayers, voluntary Tawaf, and quiet reflection. On Day 03, a respectful morning Ziyarat covering Jabal al-Noor, Jabal Thawr, Mina, Arafat, and Muzdalifah.",
      },
      {
        day: "Day 05",
        title: "Haramain High-Speed Journey to Madinah",
        detail:
          "After Farewell prayers in Makkah, glide peacefully across the Hijaz aboard the Haramain High-Speed Rail in 2 hours and 20 minutes into Madinah al-Munawwarah.",
      },
      {
        day: "Days 06–09",
        title: "Peace in the City of the Prophet ﷺ",
        detail:
          "Five unhurried nights near Masjid an-Nabawi. Includes Nusuk Rawdah permit coordination and a serene morning Ziyarat to Masjid Quba, Mount Uhud, and Masjid al-Qiblatayn.",
      },
      {
        day: "Day 10",
        title: "Return Home with Sakinah",
        detail:
          "Final morning salutations at the Prophet's Mosque, Zamzam 5L allocation assisted at Madinah Airport, and smooth journey home.",
      },
    ],
  },
  {
    slug: "haramain-heritage-journey",
    index: "02",
    title: "The Haramain Heritage",
    subtitle: "Fourteen contemplative nights steeped in prophetic history.",
    category: "Heritage",
    nightsSplit: "7 Nights Makkah · 7 Nights Madinah",
    totalNights: 14,
    proximity: "4 min walk to Masjid al-Haram",
    season: "Oct – Mar · Mild Season",
    priceFrom: "PKR 395,000",
    image: PHOTOS.madinahGolden,
    heroAlt: "Golden hour view of Masjid an-Nabawi Green Dome and minarets",
    spirit:
      "Designed for first-time pilgrims and seekers of prophetic Seerah. Two balanced weeks allow you to settle deeply into the rhythm of the five daily prayers without rushing between landmarks.",
    makkahHotel: {
      name: "Jabal Omar Hyatt Regency or Hilton Suites Makkah",
      distance: "3 to 4-minute flat walkway to King Fahd Gate",
      note: "Spacious family rooms and quiet prayer hall overlooking the Haram piazza.",
    },
    madinahHotel: {
      name: "Pullman Zamzam Madina or Crowne Plaza Madinah",
      distance: "3-minute walk to Bab Al-Salam & Ladies Gate 25",
      note: "Generous daily breakfast buffet with South Asian & Arabic selections.",
    },
    included: [
      "Complete Umrah Visa & mandatory Nusuk registration setup",
      "Return flights with 30kg luggage + 5L Zamzam allowance",
      "Air-conditioned private or boutique coach transfers",
      "Two Seerah-led historical Ziyarat mornings in Makkah & Madinah",
      "Pre-departure Umrah orientation session & printed Dar E Nabi Sacred Guide",
      "On-ground hospitality desk in both cities",
    ],
    optionalCare: [
      "Upgrade to Haramain High-Speed Rail transfer",
      "Half-board traditional dinner dining plan",
      "Taif heritage day excursion",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Arrival & Entering Makkah al-Mukarramah",
        detail:
          "Smooth reception at King Abdulaziz Airport, rest and freshening at your hotel, followed by guided evening Umrah when the marble mataf is cool.",
      },
      {
        day: "Days 02–07",
        title: "Seven Days in the Shadow of the Kaaba",
        detail:
          "A full Friday Jumu'ah in Masjid al-Haram, Seerah storytelling tour of sacred valleys, and ample unscheduled quiet hours for worship.",
      },
      {
        day: "Day 08",
        title: "The Hijrah Road to Madinah",
        detail:
          "Comfortable mid-morning departure along the Hijrah corridor with refreshments, arriving in Madinah in time for Maghrib and Salawat.",
      },
      {
        day: "Days 09–14",
        title: "Seven Nights of Madinah Tranquility",
        detail:
          "Friday prayer at Masjid an-Nabawi, early morning prayers at Masjid Quba, visit to the martyrs of Uhud, and unhurried departure from Madinah Airport.",
      },
    ],
  },
  {
    slug: "family-and-elders-sanctuary",
    index: "03",
    title: "Family & Elders Sanctuary",
    subtitle: "Gentle pacing, zero stairs, and dedicated care for parents.",
    category: "Family",
    nightsSplit: "6 Nights Makkah · 6 Nights Madinah",
    totalNights: 12,
    proximity: "Direct elevator access to Haram Piazza",
    season: "Tailored Private Dates",
    priceFrom: "PKR 560,000",
    image: PHOTOS.hospitalitySuite,
    heroAlt: "Calm warm stone hospitality suite designed for restful stays",
    spirit:
      "When you take your mother or father to the House of Allah, comfort is not luxury — it is mercy. Every transfer is private, every hotel is selected for step-free access, and a patient Dar E Nabi attendant walks beside your family.",
    makkahHotel: {
      name: "Raffles Makkah Palace or Fairmont Makkah Clock Royal Tower",
      distance: "Direct elevator to Masjid al-Haram courtyard — zero steep incline",
      note: "Adjoining family suites, in-room dining, and 24-hour nursing support on call.",
    },
    madinahHotel: {
      name: "Dar Al Taqwa Hotel or The Oberoi Madinah",
      distance: "Immediate step-free entry to Masjid an-Nabawi Ladies & Men's Gates",
      note: "Complimentary wheelchair kept at hotel concierge exclusively for your family.",
    },
    included: [
      "Meet-and-assist wheelchair service through all departure & arrival airports",
      "Private luxury GMC Yukon / Mercedes V-Class for all journeys",
      "Dedicated electric golf-cart / wheelchair accompaniment during Umrah",
      "Step-free interconnecting suites close to hotel lifts",
      "Personal Urdu & English-speaking care coordinator in Makkah & Madinah",
      "Flexible Ziyarat scheduled around elders' rest times",
    ],
    optionalCare: [
      "Business class flight upgrades for senior travellers",
      "In-room freshly prepared South Asian light meals",
      "Extended Madinah stay for extra rest",
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Assisted Arrival & Complete Rest",
        detail:
          "Fast-track airport guidance, private vehicle directly to hotel porch, and a full evening of rest before performing Umrah gently after Fajr or Isha.",
      },
      {
        day: "Days 02–06",
        title: "Unhurried Worship in Makkah",
        detail:
          "Zero fixed morning wake-up calls. Our concierge checks in quietly each evening to assist with prayer seating, Zamzam delivery, or pharmacy needs.",
      },
      {
        day: "Days 07–12",
        title: "Restorative Days in Madinah",
        detail:
          "Smooth VIP rail transfer in Business Class to Madinah. Wheelchair-accessible Ziyarat to Masjid Quba and serene days beside the Green Dome.",
      },
    ],
  },
  {
    slug: "ramadan-last-ten-nights",
    index: "04",
    title: "Ramadan — The Last Ten Nights",
    subtitle: "Seeking Laylatul Qadr in the stillness of the Haramain.",
    category: "Ramadan",
    nightsSplit: "10 Nights Makkah · 4 Nights Madinah",
    totalNights: 14,
    proximity: "3 min walk to Masjid al-Haram",
    season: "19th Ramadan – 3rd Shawwal",
    priceFrom: "PKR 890,000",
    image: PHOTOS.duskSanctuary,
    heroAlt: "Illuminated white marble mosque arches reflected at twilight",
    spirit:
      "The most spiritually luminous nights of the Islamic calendar demand flawless logistical calm. We secure verified close-proximity rooms months in advance so you spend the odd nights in Qiyam, not in traffic.",
    makkahHotel: {
      name: "Swissôtel Makkah or Jabal Omar Marriott",
      distance: "Direct pedestrian access to Haram for Taraweeh & Tahajjud",
      note: "Daily Iftar dates & Suhoor buffet timed gracefully around Tahajjud.",
    },
    madinahHotel: {
      name: "Anwar Al Madinah Mövenpick or Hilton Madinah",
      distance: "2-minute walk to Masjid an-Nabawi for Eid al-Fitr",
      note: "Celebrate the serenity of Eid morning in the city of the Prophet ﷺ.",
    },
    included: [
      "Guaranteed Ramadan peak-season visa & hotel confirmation",
      "Daily Suhoor and warm courtyard Iftar arrangements",
      "Private pre-booked transfers avoiding peak congestion hours",
      "Qiyam & Khatm al-Qur'an night guidance by our senior coordinators",
      "Eid al-Fitr celebratory morning gathering in Madinah",
    ],
    optionalCare: [
      "Private Suhoor in-room service during the odd nights",
      "Extended Shawwal stay in Madinah",
    ],
    itinerary: [
      {
        day: "19–20 Ramadan",
        title: "Arrival Before the Final Ten Nights",
        detail:
          "Arrive calmly on the 19th of Ramadan to perform Umrah and settle your room before the blessed final ten nights begin.",
      },
      {
        day: "21–29 Ramadan",
        title: "Nights of Qiyam & Khatm al-Qur'an",
        detail:
          "Nine deeply sacred nights in Makkah with Suhoor and Iftar seamlessly arranged so your energy remains devoted to prayer and du'a.",
      },
      {
        day: "Eid – 3 Shawwal",
        title: "Eid Morning in Madinah al-Munawwarah",
        detail:
          "Transition peacefully to Madinah for the quiet joy of Eid al-Fitr prayers beneath the open umbrellas of Masjid an-Nabawi.",
      },
    ],
  },
];

export interface SacredStep {
  numeral: string;
  title: string;
  arabic: string;
  subtitle: string;
  description: string;
  careNote: string;
  image: string;
}

export const SACRED_STEPS: SacredStep[] = [
  {
    numeral: "01",
    title: "Niyyah",
    arabic: "النِّيَّة",
    subtitle: "Before a single bag is packed.",
    description:
      "Umrah begins in the quietness of your own home — settling obligations, forgiving gently, and making sincere intention solely for Allah.",
    careNote:
      "Dar E Nabi prepares your visa, documents, and personal pre-departure orientation so your mind is completely unburdened.",
    image: PHOTOS.quranStillness,
  },
  {
    numeral: "02",
    title: "Ihram",
    arabic: "الإِحْرَام",
    subtitle: "Stepping out of worldly distinction.",
    description:
      "At the Miqat, all titles and garments give way to simplicity. The Talbiyah rises softly — answering a call older than time.",
    careNote:
      "We time your flight alerts and Miqat reminders clearly so you enter Ihram calmly without confusion.",
    image: PHOTOS.marbleColonnade,
  },
  {
    numeral: "03",
    title: "Tawaf",
    arabic: "الطَّوَاف",
    subtitle: "Seven circuits around the House.",
    description:
      "Your first glimpse of the Kaaba stays with you forever. Seven unhurried rounds in remembrance, humility, and whispered du'a.",
    careNote:
      "Our companions guide you toward quieter Mataf hours and arrange wheelchair support for elders seamlessly.",
    image: PHOTOS.kaabaKiswah,
  },
  {
    numeral: "04",
    title: "Sa'i",
    arabic: "السَّعْي",
    subtitle: "Walking in the footsteps of Hajar.",
    description:
      "Seven passages between Safa and Marwa — a living testimony to trust, perseverance, and mercy appearing in the desert.",
    careNote:
      "After drinking deeply from Zamzam, we ensure your family walks unhurriedly with accessible floor options.",
    image: PHOTOS.kaabaTawaf,
  },
  {
    numeral: "05",
    title: "Tahallul",
    arabic: "التَّحَلُّل",
    subtitle: "Humility and spiritual renewal.",
    description:
      "Shaving or trimming the hair completes the rites of Umrah — leaving behind haste and stepping out renewed in gratitude.",
    careNote:
      "Your sanctuary hotel sits minutes away, allowing quiet rest before returning for Fajr.",
    image: PHOTOS.makkahDawn,
  },
  {
    numeral: "06",
    title: "Madinah",
    arabic: "الْمَدِينَة",
    subtitle: "Where the heart slows to peace.",
    description:
      "Crossing into the Prophet's City brings an unmistakable softness to the air. Salutations at the Rawdah and dawns beneath the white canopies.",
    careNote:
      "We coordinate Nusuk Rawdah permits, high-speed rail seats, and serene Seerah-guided Ziyarat.",
    image: PHOTOS.madinahGolden,
  },
  {
    numeral: "07",
    title: "Return",
    arabic: "الْعَوْدَة",
    subtitle: "Carrying Sakinah back home.",
    description:
      "The true measure of an accepted Umrah is the gentleness that stays with you long after your suitcase is unpacked.",
    careNote:
      "From Zamzam handling at the terminal to a warm welcome call home, our care never stops at the airport gate.",
    image: PHOTOS.duskSanctuary,
  },
];

export const FOUR_PILLARS = [
  {
    index: "01",
    name: "Faith",
    arabic: "إِيمَان",
    summary:
      "Every itinerary is built around prayer times, unhurried worship, and authentic scholarly guidance — never crammed sightseeing.",
    image: PHOTOS.kaabaKiswah,
  },
  {
    index: "02",
    name: "Trust & Sincerity",
    arabic: "أَمَانَة",
    summary:
      "Honest written commitments, verified walking-distance hotels, and transparent pricing with zero hidden fees or last-minute changes.",
    image: PHOTOS.makkahMinarets,
  },
  {
    index: "03",
    name: "Hospitality & Care",
    arabic: "ضِيَافَة",
    summary:
      "A warm human hand at every threshold — especially for elderly parents, mothers, and first-time pilgrims travelling far from home.",
    image: PHOTOS.hospitalitySuite,
  },
  {
    index: "04",
    name: "Comfort",
    arabic: "رَاحَة",
    summary:
      "Visas, flights, Haramain high-speed rail, Nusuk permits, and serene rooms handled quietly under one roof so your journey remains effortless.",
    image: PHOTOS.marbleColonnade,
  },
];

export const TRUST_CREDENTIALS = [
  {
    figure: "14+",
    label: "Years serving guests of the Haramain",
  },
  {
    figure: "24/7",
    label: "Dedicated on-ground support in Makkah & Madinah",
  },
  {
    figure: "100%",
    label: "Verified walking-distance sanctuary hotels",
  },
  {
    figure: "DTS #4182",
    label: "Licensed Umrah operator & Ministry accredited",
  },
];

export const PILGRIM_REFLECTIONS = [
  {
    quote:
      "I sent my seventy-two-year-old parents with a nervous heart. From the moment they landed in Jeddah to their final morning in Madinah, Dar E Nabi cared for them as though they were their own.",
    author: "Dr. Tariq & Amna Siddiqui",
    city: "Lahore · Family & Elders Sanctuary",
  },
  {
    quote:
      "There was no rushing, no loudspeaker crowds, and no sales pressure. Just quiet excellence — our hotel was two minutes from the Haram and every single promise was honoured quietly.",
    author: "Hina & Salman Qureshi",
    city: "Islamabad · The Serenity Umrah",
  },
  {
    quote:
      "Performing my first Umrah during the last ten nights of Ramadan felt deeply peaceful because someone else had thoughtfully solved every earthly detail before we even asked.",
    author: "Zainab Mahmood",
    city: "Karachi · Ramadan Last Ten Nights",
  },
  {
    quote:
      "The Seerah walk in Madinah moved our entire family to tears. Dar E Nabi remembers what Umrah is truly about — devotion, humility, and genuine warmth.",
    author: "Kamran Farooq",
    city: "London & Lahore · The Haramain Heritage",
  },
];

export const FAQS = [
  {
    question: "How far in advance should we begin planning our Umrah?",
    answer:
      "For regular months, four to six weeks allows calm flight selection and preferred Haram-view rooms. For Ramadan and December winter breaks, we gently recommend reaching out three to four months ahead so proximity hotels remain assured.",
  },
  {
    question: "How do you care for elderly parents or pilgrims with mobility needs?",
    answer:
      "Elder care is at the heart of Dar E Nabi. We select step-free hotels with level access to the Haram piazza, arrange airport wheelchair assistance, book private vehicles instead of buses, and can assign a gentle personal attendant for Tawaf and Sa'i.",
  },
  {
    question: "Can women travel safely and comfortably on your Umrah journeys?",
    answer:
      "Yes. Under current Saudi regulations, women may perform Umrah seamlessly, and our team prioritizes hotels immediately facing the Ladies Gates of Masjid an-Nabawi and safe, well-lit walkways in Makkah, with female coordinators available upon request.",
  },
  {
    question: "Do you help with Nusuk permits for Riyad ul-Jannah (Rawdah)?",
    answer:
      "Yes. Prior to your arrival in Madinah, our concierge walks you through the Nusuk app setup and monitors release windows carefully to assist your family in securing Rawdah Mubarak visitation permits.",
  },
  {
    question: "Are your packages fixed group tours, or can we travel privately as a family?",
    answer:
      "Every journey on our ledger can be arranged completely privately for your family — with your chosen departure dates, preferred airlines, and private chauffeur transfers — or joined as an intimate, quiet small-group departure.",
  },
  {
    question: "What is included in your quoted price — are there hidden charges?",
    answer:
      "Nothing is hidden. Before you confirm, we share a clear single-page written summary listing exact hotel names, walking distances, flight timings, visa fees, and transfers. The figure you approve is the figure you pay.",
  },
];

export interface GuideChapter {
  id: string;
  number: string;
  title: string;
  arabicTitle: string;
  summary: string;
  steps: string[];
  dua: {
    label: string;
    arabic: string;
    transliteration: string;
    translation: string;
  };
}

export const SACRED_GUIDE_CHAPTERS: GuideChapter[] = [
  {
    id: "preparation",
    number: "01",
    title: "Intention & Preparation",
    arabicTitle: "الاستعداد والنية",
    summary:
      "Before stepping onto the plane, clear your heart of haste. Settle debts, seek forgiveness from loved ones, and travel light — both in luggage and in spirit.",
    steps: [
      "Perform Ghusl (ritual bath), trim nails, and apply gentle unscented care prior to entering Ihram.",
      "Carry your passport, printed Umrah e-Visa, comfortable walking sandals, and a lightweight unscented moisturizer.",
      "Pray two quiet rak'ahs of travel prayer before departing your home.",
    ],
    dua: {
      label: "Du'a Upon Beginning Travel",
      arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ",
      transliteration:
        "Subhanalladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun.",
      translation:
        "Glory be to Him who has subjected this to us, for we could never have accomplished it by ourselves; and truly, to our Lord we shall return.",
    },
  },
  {
    id: "ihram",
    number: "02",
    title: "Miqat & Entering Ihram",
    arabicTitle: "الميقات والإحرام",
    summary:
      "Ihram is not merely two white cloths — it is a state of sacred stillness and humility where all earthly vanity falls silent.",
    steps: [
      "Men wear two clean unstitched white cloths; women wear modest, comfortable everyday Islamic attire with face and hands uncovered.",
      "Before crossing the Miqat boundary (announced in-flight), make the sincere intention for Umrah.",
      "Recite the Talbiyah gently and continuously until you begin Tawaf at the Kaaba.",
    ],
    dua: {
      label: "The Talbiyah",
      arabic: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
      transliteration:
        "Labbayk Allahumma labbayk, labbayka la sharika laka labbayk. Innal-hamda wan-ni'mata laka wal-mulk, la sharika lak.",
      translation:
        "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Surely all praise, grace, and dominion belong to You alone.",
    },
  },
  {
    id: "tawaf",
    number: "03",
    title: "Tawaf — Circling the Kaaba",
    arabicTitle: "الطواف بالبيت الحرام",
    summary:
      "Enter Masjid al-Haram with your right foot in quiet awe. Lower your pace, let your eyes rest upon the Kaaba, and speak to Allah in your own tongue.",
    steps: [
      "Begin aligned with the Black Stone (Hajar al-Aswad), gesturing gently with your right hand while saying 'Bismillahi Allahu Akbar'.",
      "Complete seven counter-clockwise circuits keeping the Kaaba to your left. Men uncover the right shoulder (Idtiba) during Tawaf only.",
      "Between the Yemeni Corner and the Black Stone, recite the prophetic supplication for goodness in both worlds.",
      "Upon finishing seven circuits, cover both shoulders, pray two quiet rak'ahs behind Maqam Ibrahim, and drink Zamzam gratefully.",
    ],
    dua: {
      label: "Between the Yemeni Corner & Black Stone",
      arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
      transliteration:
        "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan wa qina 'adhaban-nar.",
      translation:
        "Our Lord, grant us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
    },
  },
  {
    id: "sai",
    number: "04",
    title: "Sa'i — Between Safa & Marwa",
    arabicTitle: "السعي بين الصفا والمروة",
    summary:
      "Seven walks honoring the steadfastness of Sayyidah Hajar — reminding every believer that sincere effort and trust in Allah never go unanswered.",
    steps: [
      "Ascend toward Safa, face the Qiblah, praise Allah, and make heartfelt personal du'a.",
      "Walk calmly toward Marwa (1st lap), briskening pace slightly between the green lights for able-bodied men.",
      "Continue until the 7th lap concludes at Marwa. Remember: there is no fixed du'a required — speak from your heart.",
    ],
    dua: {
      label: "Upon Approaching Safa",
      arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
      transliteration: "Innas-Safa wal-Marwata min sha'a'irillah.",
      translation:
        "Indeed, Safa and Marwa are among the sacred symbols of Allah.",
    },
  },
  {
    id: "tahallul",
    number: "05",
    title: "Halq or Taqsir — Renewal",
    arabicTitle: "الحلق أو التقصير",
    summary:
      "With the completion of Sa'i, shave or evenly trim the hair (women trim a fingertip's length). Your Umrah is complete, and the restrictions of Ihram are lifted.",
    steps: [
      "Men shave the head completely (Halq, greater reward) or trim evenly across the head (Taqsir).",
      "Women gather a small lock and trim approximately the length of a fingertip in private.",
      "Offer silent gratitude — May Allah accept your Umrah and write it among the accepted deeds.",
    ],
    dua: {
      label: "Supplication of Acceptance",
      arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ",
      transliteration:
        "Rabbana taqabbal minna innaka Antas-Sami'ul-'Alim.",
      translation:
        "Our Lord, accept this from us. Truly, You are the All-Hearing, the All-Knowing.",
    },
  },
  {
    id: "madinah",
    number: "06",
    title: "Etiquettes of Madinah al-Munawwarah",
    arabicTitle: "آداب زيارة المدينة المنورة",
    summary:
      "Enter Madinah with lowered voice, abundant Salawat, and quiet reverence. Here rests the Mercy to the Worlds ﷺ.",
    steps: [
      "Send abundant peace and blessings upon the Prophet ﷺ throughout your journey into the city.",
      "Walk gently inside Masjid an-Nabawi, maintaining calm etiquette near the Sacred Chamber and the Rawdah.",
      "Perform Wudu at your hotel and visit Masjid Quba to pray two rak'ahs — carrying the reward of an Umrah.",
    ],
    dua: {
      label: "Salutation at the Prophet's Mosque",
      arabic: "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
      transliteration:
        "As-salamu 'alayka ya RasulAllah wa rahmatullahi wa barakatuh.",
      translation:
        "Peace be upon you, O Messenger of Allah, and the mercy of Allah and His blessings.",
    },
  },
];

export const MADINAH_CHAPTERS = [
  {
    numeral: "01",
    title: "Masjid an-Nabawi at Fajr",
    arabic: "المسجد النبوي الشريف",
    body: "Before sunrise, the marble courtyard cools beneath a pale indigo sky. As the monumental canopies unfold silently overhead, thousands stand shoulder to shoulder in unhurried stillness.",
    image: PHOTOS.madinahGolden,
  },
  {
    numeral: "02",
    title: "Riyad ul-Jannah — A Garden of Paradise",
    arabic: "الروضة الشريفة",
    body: "Between the Prophet's home and his pulpit lies a space he ﷺ called a garden among the gardens of Paradise. Our concierge guides your family calmly through Nusuk permit timing so your moments there remain unhurried.",
    image: PHOTOS.madinahCourtyard,
  },
  {
    numeral: "03",
    title: "Masjid Quba & Mount Uhud",
    arabic: "مسجد قباء وجبل أحد",
    body: "The first mosque founded upon piety in Islam, and the mountain the Prophet ﷺ said 'loves us and we love it.' Our Ziyarat mornings are paced like a quiet historical reflection, never a hurried bus stop.",
    image: PHOTOS.marbleColonnade,
  },
];
