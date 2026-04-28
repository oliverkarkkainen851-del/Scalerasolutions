document.body.classList.add("is-loading");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const langButtons = document.querySelectorAll("[data-lang-btn]");
const htmlEl = document.documentElement;
const pageLoader = document.getElementById("pageLoader");
const revealItems = document.querySelectorAll(".reveal");
const header = document.getElementById("siteHeader");
const cursorGlow = document.getElementById("cursorGlow");
const heroDashboard = document.getElementById("heroDashboard");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const galleryButtons = document.querySelectorAll(".gallery-open");

const pricingSwitchButtons = document.querySelectorAll(".pricing-switch-btn");
const basicPlanPrice = document.getElementById("basicPlanPrice");
const basicPlanPeriod = document.getElementById("basicPlanPeriod");
const basicPlanSub = document.getElementById("basicPlanSub");

/* TÄMÄ PITÄÄ OLLA YLHÄÄLLÄ ennen setLanguage-kutsuja */
let currentPricingMode = "yearly";

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

const translations = {
  fi: {
    navSolution: "Ratkaisu",
    navShowcase: "Dashboard",
    navPricing: "Hinnoittelu",
    navProcess: "Käyttöönotto",
    navContact: "Yhteys",
    navCta: "Varaa keskustelu",

    heroEyebrow: "AUTOCLIENT B2B-MYYNNIN ALKUVAIHEESEEN",
    heroTitle: "Rakenna outbound-järjestelmä, joka löytää oikeat yritykset, oikeaan aikaan.",
    heroText: "AutoClient tekee myynnin alkuvaiheesta järjestelmällisen: koko asiakassegmentin tietokanta, ostosignaalihaku, oikea-aikaiset yhteydenotot ja outboundin jatkuva operointi yhdessä kokonaisuudessa.",
    heroBtnPrimary: "Varaa demo",
    heroBtnSecondary: "Katso hinnoittelu",

    proof1Label: "Prospektit",
    proof1Text: "Ajantasainen tietokanta",
    proof2Label: "Kontaktoidut liidit",
    proof2Text: "Validoitu ennen lähetystä",
    proof3Label: "Aikaa säästetty",
    proof3Text: "Manuaalinen työ vähenee",

    dashboardLive: "Live",
    metric1Label: "Yrityksiä segmentissä",
    metric1Text: "Koko markkina näkyvissä",
    metric2Label: "Ostosignaalit",
    metric2Text: "Ajankohtaiset yritykset esiin",
    metric3Label: "Kontaktoidut päättäjät",
    metric3Text: "Systemaattinen operointi",
    metric4Label: "Buukatut tapaamiset",
    metric4Text: "Korkean intentin liidejä",

    list1Title: "Koko asiakassegmentti kartoitettu",
    list1Text: "Selkeä tietokanta yrityksistä ja päättäjistä",
    list2Title: "Ostosignaalit tunnistettu",
    list2Text: "Yhteydenotot ajoitetaan oikeaan hetkeen",
    list3Title: "Outbound operoi jatkuvasti",
    list3Text: "Follow-upit, priorisointi ja näkyvyys samassa",

    float1Title: "Pipeline näkyvissä",
    float1Value: "Selkeä dashboard",
    float2Title: "Prosessi rullaa",
    float2Value: "Systemaattisesti",

    strip1: "Koko asiakassegmentti näkyviin",
    strip2: "Ostosignaalit oikeaan aikaan",
    strip3: "Outboundin jatkuva operointi",
    strip4: "Personoitu kontaktointi",
    strip5: "CRM-valmis toimintamalli",

    solutionEyebrow: "MITÄ ME TEEMME",
    solutionTitle: "Kolme ydinasiaa, joilla outboundista tehdään oikeasti systemaattista",
    solutionText: "AutoClient ei ole vain yksittäinen työkalu. Se on toimintamalli, joka rakentaa pohjan koko segmentin ymmärtämisestä jatkuvaan operointiin asti.",
    solution1Title: "Koko asiakassegmentistä selkeä tietokanta",
    solution1Text: "Rakennamme koko kohdesegmentistä selkeän näkymän: yritykset, päättäjät, kontaktit, prioriteetit ja segmentit samaan tietokantaan.",
    solution1Point1: "Yritykset ja päättäjät näkyviin",
    solution1Point2: "Selkeä segmentointi ja priorisointi",
    solution1Point3: "Tietokanta elää jatkuvasti mukana",
    solution2Title: "Ostosignaalihaku ja oikea-aikaiset yhteydenotot",
    solution2Text: "Tunnistamme ajankohtaiset yritykset ostosignaalien avulla, jotta yhteydenotot eivät perustu arvailuun vaan oikeaan ajoitukseen.",
    solution2Point1: "Rekrytoinnit, muutokset, laajentumiset",
    solution2Point2: "Ajankohtaiset yritykset priorisoidaan",
    solution2Point3: "Yhteydenotot menevät oikeaan hetkeen",
    solution3Title: "Outboundin jatkuva operointi",
    solution3Text: "AutoClient ei pysähdy yhteen kampanjaan. Se ylläpitää jatkuvaa toimintaa: kontaktointi, follow-upit, vastausten käsittely ja näkyvyys.",
    solution3Point1: "Jatkuva kontaktointi ja seuranta",
    solution3Point2: "Useita kampanjoita rinnakkain",
    solution3Point3: "Dashboard näyttää koko tilanteen",

    showcaseEyebrow: "DASHBOARD",
    showcaseTitle: "AutoClient käytännössä",
    showcaseText: "Asiakasportaali näyttää kampanjat, yritykset, kontaktit, syväanalyysin ja visualisoinnit yhdestä ympäristöstä.",
    showcaseBox1Label: "Selkeä käyttöliittymä",
    showcaseBox1Title: "Dashboard tekee prosessista läpinäkyvän",
    showcaseBox1Text: "Näet mitä tapahtuu, mitä on tehty, mikä toimii ja mitkä yritykset ovat seuraavaksi tärkeimpiä.",
    showcaseBox2Label: "Parempi päätöksenteko",
    showcaseBox2Title: "Data auttaa kehittämään strategiaa",
    showcaseBox2Text: "Kun segmentti, signaalit, kontaktit ja kampanjat näkyvät yhdessä, myynnin kehittäminen on paljon selkeämpää.",
    gallery1Title: "Kirjautuminen ja käyttöliittymä",
    gallery1Text: "Selkeä ja moderni portaali, josta kokonaisuus avautuu heti hallittavana.",
    gallery2Title: "Yritykset, kontaktit ja syväanalyysi",
    gallery2Text: "Kampanjat, löydetyt yritykset, kontaktit ja yrityskohtainen analyysi samassa näkymässä.",
    gallery3Title: "Analytiikka ja visualisoinnit",
    gallery3Text: "Toimialajakaumat, aluekartta ja muu data auttavat optimoinnissa.",

    pricingEyebrow: "HINNOITTELU",
    pricingTitle: "Kevyt aloitus tai jatkuva toimintamalli",
    pricingText: "Yhteistyö voidaan aloittaa pilotilla ja laajentaa sen jälkeen jatkuvaksi järjestelmälliseksi outbound-toiminnaksi.",
    pricingToggleLabel: "Basic-paketin laskutus",
    pricingYearly: "Yearly",
    pricingQuarterly: "3 months",
    planPilot: "Pilotti",
    planVat: " + alv",
    pilotSub: "Matala kynnys testata konsepti käytännössä",
    pilot1: "Prospekti-databasen rakentaminen",
    pilot2: "Vähintään 500 prospektin kontaktointi",
    pilot3: "Follow-upit, vastausten hallinta ja buukkaus",
    pilot4: "Datan rikastus ja ostosignaalit",
    featuredBadge: "Suositeltu",
    planYear: " / year",
    basicSubYearly: "Jatkuva järjestelmällinen outbound + provisio",
    basicSubQuarterly: "Kevyt testijakso Basic-mallilla",
    basic1: "Koko asiakassegmentin kartoitus",
    basic2: "Jatkuva prospektitietokannan päivitys",
    basic3: "Ostosignaalihaku säännöllisesti",
    basic4: "Jatkuva kontaktointi ja follow-upit",
    basic5: "CRM-integraatio",
    basic6: "Dashboard ja näkyvyys koko prosessiin",
    planScale: "Laajennukset",
    customPlan: "Custom",
    customSub: "Skaalataan tarpeen mukaan",
    custom1: "Suurempi outbound-volyymi",
    custom2: "Useampi asiakassegmentti",
    custom3: "Useammin tapahtuva ostosignaalihaku",
    custom4: "Inbound / outbound-infran ulkoistaminen",
    custom5: "Domainit, inboxit ja Workspace-ylläpito",

    processEyebrow: "KÄYTTÖÖNOTTO",
    processTitle: "Nopea käynnistys, selkeä rakenne",
    processText: "Käyttöönotto rakennetaan niin, että järjestelmä saadaan liikkeelle nopeasti ilman että prosessista tulee sekava.",
    day1: "Päivä 2",
    proc1Title: "Asiakassegmentin ja tavoitteen määrittely",
    proc1Text: "Rakennetaan pohja koko kohdesegmentin tietokannalle ja priorisoinnille.",
    day2: "Päivä 4",
    proc2Title: "Kampanjalogiikka ja kontaktimallit",
    proc2Text: "Suunnitellaan yhteydenottostrategia, viestit ja toimintalogiikka.",
    day3: "Päivä 6",
    proc3Title: "Dashboard ja integraatiot",
    proc3Text: "Portaali, CRM-yhteys ja näkyvyys rakennetaan valmiiksi.",
    day4: "Päivä 9",
    proc4Title: "Operointi käyntiin",
    proc4Text: "Tietokanta, signaalit ja kontaktointi alkavat pyöriä jatkuvana prosessina.",

    ctaEyebrow: "SEURAAVA ASKEL",
    ctaTitle: "Jos haluat outboundista järjestelmän, tästä se alkaa",
    ctaText: "Katsotaan yhdessä, miten AutoClient sopii teidän asiakassegmenttiin, myyntiprosessiin ja kasvutavoitteisiin.",
    ctaPrimary: "Ota yhteyttä",
    ctaSecondary: "Varaa keskustelu",

    footerText: "Scalera Solutions rakentaa AI-avusteisia järjestelmiä, jotka tekevät B2B-prospektoinnista, outboundista ja myynnin alkuvaiheesta systemaattisempaa ja läpinäkyvämpää.",
    footerNav: "Navigaatio",
    footerContact: "Yhteys"
  },
  en: {
    navSolution: "Solution",
    navShowcase: "Dashboard",
    navPricing: "Pricing",
    navProcess: "Implementation",
    navContact: "Contact",
    navCta: "Book a call",

    heroEyebrow: "AUTOCLIENT FOR EARLY-STAGE B2B SALES",
    heroTitle: "Build an outbound system that finds the right companies at the right time.",
    heroText: "AutoClient makes early-stage sales systematic: a full segment database, buying signal search, well-timed outreach and continuous outbound execution in one system.",
    heroBtnPrimary: "Book a demo",
    heroBtnSecondary: "View pricing",

    proof1Label: "Prospects",
    proof1Text: "Up-to-date database",
    proof2Label: "Contacted leads",
    proof2Text: "Validated before sending",
    proof3Label: "Time saved",
    proof3Text: "Manual work reduced",

    dashboardLive: "Live",
    metric1Label: "Companies in segment",
    metric1Text: "Whole market visible",
    metric2Label: "Buying signals",
    metric2Text: "Timely accounts surfaced",
    metric3Label: "Contacted decision-makers",
    metric3Text: "Systematic execution",
    metric4Label: "Meetings booked",
    metric4Text: "High-intent leads",

    list1Title: "Full segment mapped",
    list1Text: "Clear database of companies and decision-makers",
    list2Title: "Signals identified",
    list2Text: "Outreach is timed to the right moment",
    list3Title: "Outbound keeps running",
    list3Text: "Follow-ups, prioritization and visibility in one place",

    float1Title: "Pipeline visible",
    float1Value: "Clear dashboard",
    float2Title: "Process running",
    float2Value: "Systematically",

    strip1: "Full segment visibility",
    strip2: "Signals at the right time",
    strip3: "Continuous outbound execution",
    strip4: "Personalized outreach",
    strip5: "CRM-ready operating model",

    solutionEyebrow: "WHAT WE DO",
    solutionTitle: "Three core layers that make outbound truly systematic",
    solutionText: "AutoClient is not just a single tool. It is an operating model that starts from understanding the full segment and continues into always-on execution.",
    solution1Title: "A clear database of the entire customer segment",
    solution1Text: "We build a clear view of the whole target segment: companies, decision-makers, contacts, priorities and segments in one database.",
    solution1Point1: "Companies and decision-makers visible",
    solution1Point2: "Clear segmentation and prioritization",
    solution1Point3: "Database stays alive over time",
    solution2Title: "Buying signal search and well-timed outreach",
    solution2Text: "We identify timely accounts through buying signals so outreach is based on timing rather than guesswork.",
    solution2Point1: "Hiring, changes and expansion signals",
    solution2Point2: "Timely accounts are prioritized",
    solution2Point3: "Outreach lands at the right moment",
    solution3Title: "Continuous outbound execution",
    solution3Text: "AutoClient does not stop at one campaign. It supports continuous execution: outreach, follow-ups, reply handling and visibility.",
    solution3Point1: "Continuous outreach and follow-up",
    solution3Point2: "Multiple campaigns in parallel",
    solution3Point3: "Dashboard shows the whole picture",

    showcaseEyebrow: "DASHBOARD",
    showcaseTitle: "AutoClient in practice",
    showcaseText: "The client portal brings campaigns, companies, contacts, deep analysis and visual insights into one environment.",
    showcaseBox1Label: "Clear interface",
    showcaseBox1Title: "The dashboard makes the process transparent",
    showcaseBox1Text: "You see what is happening, what has been done, what works and which companies matter next.",
    showcaseBox2Label: "Better decision-making",
    showcaseBox2Title: "Data helps improve strategy",
    showcaseBox2Text: "When segment data, signals, contacts and campaigns are visible together, sales improvement becomes much clearer.",
    gallery1Title: "Login and interface",
    gallery1Text: "A clear and modern portal that makes the whole system feel manageable immediately.",
    gallery2Title: "Companies, contacts and deep analysis",
    gallery2Text: "Campaigns, discovered companies, contacts and company-specific analysis in one view.",
    gallery3Title: "Analytics and visualizations",
    gallery3Text: "Industry splits, regional map and other insights help optimize the process.",

    pricingEyebrow: "PRICING",
    pricingTitle: "Start light or build a continuous operating model",
    pricingText: "The collaboration can begin as a pilot and then expand into an always-on outbound system.",
    pricingToggleLabel: "Basic package billing",
    pricingYearly: "Yearly",
    pricingQuarterly: "3 months",
    planPilot: "Pilot",
    planVat: " + VAT",
    pilotSub: "A low-risk way to test the concept in practice",
    pilot1: "Build the prospect database",
    pilot2: "Contact at least 500 prospects",
    pilot3: "Follow-ups, reply handling and meeting booking",
    pilot4: "Data enrichment and buying signals",
    featuredBadge: "Recommended",
    planYear: " / year",
    basicSubYearly: "Continuous systematic outbound + performance fee",
    basicSubQuarterly: "Light trial period using the Basic model",
    basic1: "Full customer segment mapping",
    basic2: "Continuous database updates",
    basic3: "Regular buying signal search",
    basic4: "Continuous outreach and follow-up",
    basic5: "CRM integration",
    basic6: "Dashboard visibility across the whole process",
    planScale: "Extensions",
    customPlan: "Custom",
    customSub: "Scaled to your needs",
    custom1: "Higher outbound volume",
    custom2: "Multiple customer segments",
    custom3: "More frequent signal search",
    custom4: "Outbound infrastructure outsourcing",
    custom5: "Domains, inboxes and Workspace maintenance",

    processEyebrow: "IMPLEMENTATION",
    processTitle: "Fast launch, clear structure",
    processText: "Implementation is designed to get the system moving quickly without turning the process into chaos.",
    day1: "Day 2",
    proc1Title: "Define segment and goals",
    proc1Text: "We build the foundation for the full target segment database and prioritization.",
    day2: "Day 4",
    proc2Title: "Campaign logic and messaging",
    proc2Text: "We define outreach strategy, message logic and operating rules.",
    day3: "Day 6",
    proc3Title: "Dashboard and integrations",
    proc3Text: "The portal, CRM connection and visibility are prepared.",
    day4: "Day 9",
    proc4Title: "Execution starts",
    proc4Text: "Database, signals and outreach begin operating as a continuous process.",

    ctaEyebrow: "NEXT STEP",
    ctaTitle: "If you want outbound to become a system, this is where it starts",
    ctaText: "Let’s look at how AutoClient fits your segment, sales process and growth goals.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Book a call",

    footerText: "Scalera Solutions builds AI-assisted systems that make B2B prospecting, outbound and early-stage sales more systematic and transparent.",
    footerNav: "Navigation",
    footerContact: "Contact"
  }
};

function updatePricingTexts(mode, lang = htmlEl.lang || "fi") {
  currentPricingMode = mode;

  pricingSwitchButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.pricingMode === mode);
  });

  if (!basicPlanPrice || !basicPlanPeriod || !basicPlanSub) return;

  if (mode === "yearly") {
    basicPlanPrice.textContent = "6000€";
    basicPlanPeriod.textContent = translations[lang].planYear || " / year";
    basicPlanSub.textContent = translations[lang].basicSubYearly;
  } else {
    basicPlanPrice.textContent = "200€";
    basicPlanPeriod.textContent = lang === "fi" ? " / 3 kk" : " / 3 months";
    basicPlanSub.textContent = translations[lang].basicSubQuarterly;
  }
}

function setLanguage(lang) {
  const selected = translations[lang];
  if (!selected) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (selected[key]) {
      element.textContent = selected[key];
    }
  });

  htmlEl.lang = lang;
  localStorage.setItem("siteLanguage", lang);

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
  });

  updatePricingTexts(currentPricingMode, lang);
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang-btn");
    setLanguage(lang);
  });
});

const savedLang = localStorage.getItem("siteLanguage") || "fi";
setLanguage(savedLang);
updatePricingTexts(currentPricingMode, savedLang);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function formatCount(value) {
  return value.toLocaleString("fi-FI");
}

const countElements = document.querySelectorAll(".count-up");
const countObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = `${formatCount(value)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

countElements.forEach((el) => countObserver.observe(el));

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header?.classList.add("scrolled");
  } else {
    header?.classList.remove("scrolled");
  }
});

const sections = [...document.querySelectorAll("main section[id]")];
window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + 140;

  sections.forEach((section) => {
    const id = section.getAttribute("id");
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const relatedLink = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!relatedLink) return;
    relatedLink.classList.toggle("active", scrollPos >= top && scrollPos < bottom);
  });
});

if (cursorGlow) {
  window.addEventListener("mousemove", (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

if (heroDashboard) {
  window.addEventListener("mousemove", (e) => {
    const rect = heroDashboard.getBoundingClientRect();
    const within =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;

    if (!within) {
      heroDashboard.style.transform = "rotateX(0deg) rotateY(0deg)";
      return;
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    heroDashboard.style.transform = `rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 7).toFixed(2)}deg)`;
  });

  heroDashboard.addEventListener("mouseleave", () => {
    heroDashboard.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    card.style.transform = `rotateX(${(-py * 3).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const src = button.dataset.lightboxSrc;
    const alt = button.dataset.lightboxAlt || "";
    if (!src || !lightbox || !lightboxImage) return;

    lightboxImage.src = src;
    lightboxImage.alt = alt;
    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  });
});

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("open");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

pricingSwitchButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    updatePricingTexts(btn.dataset.pricingMode, htmlEl.lang || "fi");
  });
});

/* Varmistus että loader katoaa vaikka jokin muu menisi pieleen */
function hideLoader() {
  pageLoader?.classList.add("hidden");
  document.body.classList.remove("is-loading");
}

window.addEventListener("load", () => {
  setTimeout(hideLoader, 950);
});

setTimeout(hideLoader, 2500);

/* ═══════════════════════════════════════════════════════════
   ADDITIONS — appended below existing code, nothing changed above
   ═══════════════════════════════════════════════════════════ */

/* 1. Quarterly price correction: 200€ → 2000€
      Fires after the existing listener which sets 200€,
      immediately correcting it to 2000€.                     */
document.querySelectorAll('.pricing-switch-btn[data-pricing-mode="quarterly"]').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (basicPlanPrice) basicPlanPrice.textContent = "2000€";
  });
});

/* Also correct on initial load if quarterly is somehow the default */
(function correctQuarterlyPrice() {
  if (currentPricingMode === "quarterly" && basicPlanPrice) {
    basicPlanPrice.textContent = "2000€";
  }
})();


/* 2. Video section translations (extends existing translations object) */
Object.assign(translations.fi, {
  videoEyebrow:    "AUTOCLIENT KÄYTÄNNÖSSÄ",
  videoTitle:      "Katso miten AutoClient toimii",
  videoSubtitle:   "Kolme minuuttia, joka selittää miksi systemaattinen outbound voittaa satunnaisen prospektoinnin aina.",
  videoBadge:      "AutoClient · Demo",
  videoMuteLabel:  "Ääni pois",
  videoUnmuteLabel:"Ääni päälle",
  videoPoint1Step: "01 — MITÄ TARJOAMME",
  videoPoint1Title:"Täydellinen outbound-järjestelmä",
  videoPoint1Text: "AutoClient rakentaa koko asiakassegmentin tietokannan, tunnistaa ostosignaalit ja operoi jatkuvaa outboundia — alusta loppuun yhdessä kokonaisuudessa.",
  videoPoint2Step: "02 — MITEN TOIMITAMME",
  videoPoint2Title:"Nopea käyttöönotto, jatkuva operointi",
  videoPoint2Text: "Rakennamme prospektitietokannan, ajamme ostosignaalihaut, lähetämme personoidut viestit ja hoidamme follow-upit — kaikki näkyvissä omassa dashboardissasi.",
  videoPoint3Step: "03 — MITÄ SE TARKOITTAA SINULLE",
  videoPoint3Title:"Enemmän tapaamisia, vähemmän manuaalista työtä",
  videoPoint3Text: "Myyntiputki pysyy täynnä ilman jatkuvaa manuaalista prospektointia. Saat selkeän näkyvyyden koko prosessiin ja pystyt kehittämään strategiaa datan pohjalta.",
  vatNote:         "Kaikki hinnat ovat ilman arvonlisäveroa (alv 0%).",
});

Object.assign(translations.en, {
  videoEyebrow:    "AUTOCLIENT IN ACTION",
  videoTitle:      "See how AutoClient works",
  videoSubtitle:   "Three minutes that explain why systematic outbound always beats random prospecting.",
  videoBadge:      "AutoClient · Demo",
  videoMuteLabel:  "Mute",
  videoUnmuteLabel:"Unmute",
  videoPoint1Step: "01 — WHAT WE OFFER",
  videoPoint1Title:"A complete outbound system",
  videoPoint1Text: "AutoClient builds your full segment database, identifies buying signals and runs continuous outbound — end to end in one place.",
  videoPoint2Step: "02 — HOW WE DELIVER IT",
  videoPoint2Title:"Fast setup, always-on execution",
  videoPoint2Text: "We build your prospect database, run signal searches, send personalized outreach and manage follow-ups — all visible in your own dashboard.",
  videoPoint3Step: "03 — WHAT THIS MEANS FOR YOU",
  videoPoint3Title:"More meetings, less manual work",
  videoPoint3Text: "Your pipeline stays full without constant manual prospecting. You get clear visibility into the whole process and can improve strategy based on real data.",
  vatNote:         "All prices are exclusive of VAT (0% VAT).",
});

/* Re-run setLanguage so new keys render immediately */
setLanguage(htmlEl.lang || "fi");


/* 3. Video mute/unmute toggle */
const introVideo    = document.getElementById("introVideo");
const videoUnmuteBtn = document.getElementById("videoUnmuteBtn");
const muteLabelEl   = videoUnmuteBtn ? videoUnmuteBtn.querySelector("span") : null;

if (videoUnmuteBtn && introVideo) {
  videoUnmuteBtn.addEventListener("click", () => {
    introVideo.muted = !introVideo.muted;
    const lang = htmlEl.lang || "fi";

    if (muteLabelEl) {
      muteLabelEl.textContent = introVideo.muted
        ? (translations[lang].videoMuteLabel   || "Mute")
        : (translations[lang].videoUnmuteLabel || "Unmute");
    }

    videoUnmuteBtn.classList.toggle("is-unmuted", !introVideo.muted);
  });
}
