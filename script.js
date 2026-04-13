document.body.classList.add("is-loading");

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const langButtons = document.querySelectorAll("[data-lang-btn]");
const htmlEl = document.documentElement;
const pageLoader = document.getElementById("pageLoader");
const revealItems = document.querySelectorAll(".reveal");
const header = document.getElementById("siteHeader");
const cursorGlow = document.getElementById("cursorGlow");
const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const galleryButtons = document.querySelectorAll(".gallery-open");

const cardSlider = document.getElementById("cardSlider");
const infoCards = document.querySelectorAll(".info-card");
const sliderDots = document.querySelectorAll(".slider-dot");
const prevCardBtn = document.getElementById("prevCard");
const nextCardBtn = document.getElementById("nextCard");

let currentSlide = 0;
let autoSlideInterval = null;

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
    navProduct: "Tuote",
    navHow: "Miten toimii",
    navShowcase: "Dashboard",
    navPricing: "Hinnoittelu",
    navContact: "Varaa keskustelu",

    heroEyebrow: "AUTOCLIENT B2B-MYYNNIN ALKUVAIHEESEEN",
    heroTitle: "Myyntiä ilman manuaalista säätöä.",
    heroText: "AutoClient löytää oikeat yritykset, tunnistaa ostosignaalit ja hoitaa outreachin – jotta myynti voi keskittyä klousaamiseen.",
    heroBtnPrimary: "Varaa demo",
    heroBtnSecondary: "Katso miten toimii",
    miniStat1: "prospektia löydetty",
    miniStat2: "liidiä kontaktoitu",
    miniStat3: "aikaa säästetty",

    sliderLabel: "Miksi AutoClient",
    slide1Title: "Oikeat prospektit",
    slide1Text: "AutoClient etsii yritykset ja päättäjät, jotka sopivat juuri teidän kohderyhmään.",
    slide2Title: "Ostosignaalit",
    slide2Text: "Tunnistaa yritykset, joilla on juuri nyt tarve tai ostovalmius.",
    slide3Title: "Automaattinen outreach",
    slide3Text: "Personoidut viestit ja follow-upit lähtevät automaattisesti.",
    slide4Title: "Selkeä näkyvyys",
    slide4Text: "Näet yhdestä paikasta mitä tapahtuu, mikä toimii ja mitä seuraavaksi tehdään.",
    floatNoteLabel: "Nopeampi ensivaikutelma",
    floatNoteTitle: "Selkeä arvolupaus heti",

    strip1: "Prospektitietokanta",
    strip2: "Ostosignaalit",
    strip3: "Personoitu outbound",
    strip4: "Follow-up automaatio",
    strip5: "Läpinäkyvä dashboard",
    strip6: "CRM-valmis",

    productEyebrow: "YDINHYÖDYT",
    productTitle: "Miksi AutoClient toimii käytännössä",
    productText: "Tiivistetysti: vähemmän manuaalista työtä, ajankohtaisemmat liidit ja selkeämpi prosessi.",
    productCard1Title: "Vähemmän käsityötä",
    productCard1Text: "Prospektointi, rikastus ja outreach eivät jää enää myyjien manuaaliseksi työksi.",
    productCard2Title: "Ajankohtaisemmat liidit",
    productCard2Text: "Ostosignaalit nostavat esiin yritykset, joihin kannattaa olla yhteydessä juuri nyt.",
    productCard3Title: "Parempi näkyvyys",
    productCard3Text: "Kaikki data, kampanjat ja tulokset näkyvät yhdestä ympäristöstä.",

    howEyebrow: "MITEN TOIMII",
    howTitle: "Yksinkertainen virta alusta tapaamisiin",
    howText: "AutoClient rakentuu muutamasta selkeästä vaiheesta, jotka yhdessä tekevät outboundista systemaattisempaa.",
    flow1Title: "Prospektit",
    flow1Text: "Rakennetaan teidän asiakasprofiiliin sopiva yritys- ja kontaktikanta.",
    flow2Title: "Ostosignaalit",
    flow2Text: "Tunnistetaan yritykset, joilla on juuri nyt relevantti tilanne tai tarve.",
    flow3Title: "Outreach",
    flow3Text: "Viestit, follow-upit ja kontaktit etenevät suunnitelmallisesti.",
    flow4Title: "Tapaamiset",
    flow4Text: "Myynti pääsee keskittymään keskusteluihin ja klousaamiseen.",

    showcaseEyebrow: "DASHBOARD",
    showcaseTitle: "Kun haluat nähdä syvemmälle, dashboard näyttää kaiken",
    showcaseText: "Heti alussa emme kuormita käyttäjää dashboardilla, mutta alempana se toimii vahvana todisteena tuotteen vakavuudesta ja läpinäkyvyydestä.",
    showcaseBox1Label: "Selkeä käyttöliittymä",
    showcaseBox1Title: "Näet heti mitä tapahtuu",
    showcaseBox1Text: "Kampanjat, löydetyt yritykset, kontaktit ja tilannekuva pysyvät yhdessä paikassa.",
    showcaseBox2Label: "Parempi päätöksenteko",
    showcaseBox2Title: "Data auttaa kehittämään prosessia",
    showcaseBox2Text: "Vastaukset, reply-rate, analyysit ja visualisoinnit kertovat nopeasti mikä toimii.",
    gallery1Title: "Kirjautuminen ja käyttöliittymä",
    gallery1Text: "Selkeä ja moderni portaali, josta kokonaisuus avautuu heti hallittavana.",
    gallery2Title: "Yritykset ja kontaktit",
    gallery2Text: "Kampanjat, yritykset ja kontaktit näkyvät samassa näkymässä.",
    gallery3Title: "Analytiikka",
    gallery3Text: "Visualisoinnit ja jakaumat auttavat optimoimaan toimintaa.",

    pricingEyebrow: "HINNOITTELU",
    pricingTitle: "Aloita pilotilla tai rakenna jatkuva toimintamalli",
    pricingText: "Kevyt aloitus, selkeä seuraava askel ja mahdollisuus skaalata myöhemmin.",
    planPilot: "Pilotti",
    planVat: " + alv",
    pilotSub: "Matala kynnys testata konsepti käytännössä",
    pilot1: "Prospekti-databasen rakentaminen",
    pilot2: "Vähintään 500 prospektin kontaktointi",
    pilot3: "Follow-upit ja vastausten hallinta",
    pilot4: "Datan rikastus ja ostosignaalit",
    featuredBadge: "Suositeltu",
    planQuarter: " / 3 kk",
    basicSub: "Jatkuva järjestelmä ja suurempi volyymi",
    basic1: "Koko asiakasprofiilin kartoitus",
    basic2: "Jopa 1000 päättäjään kontaktointi / kk",
    basic3: "Ostosignaalihaku 2 viikon välein",
    basic4: "Prospektidatan jatkuva päivitys",
    basic5: "CRM-integraatio",
    basic6: "Tapaamisten buukkaus",
    planScale: "Laajennukset",
    customPlan: "Custom",
    customSub: "Skaalataan tarpeen mukaan",
    custom1: "Suurempi outbound-volyymi",
    custom2: "Useampi asiakassegmentti",
    custom3: "Useammin tapahtuva ostosignaalihaku",
    custom4: "Infra ja ylläpito",
    custom5: "Lisäautomaatioita",

    ctaEyebrow: "SEURAAVA ASKEL",
    ctaTitle: "Jos haluat ulos enemmän oikeita myyntikeskusteluja, tästä kannattaa aloittaa",
    ctaText: "Katsotaan nopeasti sopiiko AutoClient teidän myyntimalliin, asiakasprofiiliin ja kasvutavoitteisiin.",
    ctaPrimary: "Ota yhteyttä",
    ctaSecondary: "Varaa keskustelu",

    footerText: "Scalera Solutions rakentaa AI-avusteisia järjestelmiä, jotka tekevät B2B-prospektoinnista, outboundista ja myynnin alkuvaiheesta systemaattisempaa ja läpinäkyvämpää.",
    footerNav: "Navigaatio",
    footerContact: "Yhteys"
  },

  en: {
    navProduct: "Product",
    navHow: "How it works",
    navShowcase: "Dashboard",
    navPricing: "Pricing",
    navContact: "Book a call",

    heroEyebrow: "AUTOCLIENT FOR EARLY-STAGE B2B SALES",
    heroTitle: "Sales without manual chaos.",
    heroText: "AutoClient finds the right companies, detects buying signals and handles outreach so your sales team can focus on closing.",
    heroBtnPrimary: "Book a demo",
    heroBtnSecondary: "See how it works",
    miniStat1: "prospects found",
    miniStat2: "leads contacted",
    miniStat3: "time saved",

    sliderLabel: "Why AutoClient",
    slide1Title: "Right prospects",
    slide1Text: "AutoClient finds the companies and decision-makers that match your target profile.",
    slide2Title: "Buying signals",
    slide2Text: "Detects companies that have a relevant need or buying readiness right now.",
    slide3Title: "Automated outreach",
    slide3Text: "Personalized messages and follow-ups move automatically.",
    slide4Title: "Clear visibility",
    slide4Text: "You see what is happening, what works and what happens next in one place.",
    floatNoteLabel: "Stronger first impression",
    floatNoteTitle: "Clear value proposition first",

    strip1: "Prospect database",
    strip2: "Buying signals",
    strip3: "Personalized outbound",
    strip4: "Follow-up automation",
    strip5: "Transparent dashboard",
    strip6: "CRM-ready",

    productEyebrow: "CORE BENEFITS",
    productTitle: "Why AutoClient works in practice",
    productText: "In short: less manual work, more timely leads and a clearer process.",
    productCard1Title: "Less manual work",
    productCard1Text: "Prospecting, enrichment and outreach no longer rely on heavy manual effort.",
    productCard2Title: "More timely leads",
    productCard2Text: "Buying signals bring forward the companies worth contacting right now.",
    productCard3Title: "Better visibility",
    productCard3Text: "All data, campaigns and results are visible in one environment.",

    howEyebrow: "HOW IT WORKS",
    howTitle: "A simple flow from search to meetings",
    howText: "AutoClient is built around a few clear steps that make outbound more systematic.",
    flow1Title: "Prospects",
    flow1Text: "Build the right company and contact database for your ICP.",
    flow2Title: "Signals",
    flow2Text: "Identify companies with a relevant situation or need right now.",
    flow3Title: "Outreach",
    flow3Text: "Messages, follow-ups and contacts progress in a structured way.",
    flow4Title: "Meetings",
    flow4Text: "Sales can focus on conversations and closing.",

    showcaseEyebrow: "DASHBOARD",
    showcaseTitle: "When you want depth, the dashboard shows everything",
    showcaseText: "We do not overload the first screen with dashboard visuals, but further down it works as strong proof of product depth and transparency.",
    showcaseBox1Label: "Clear interface",
    showcaseBox1Title: "See immediately what is happening",
    showcaseBox1Text: "Campaigns, discovered companies, contacts and operational status stay in one place.",
    showcaseBox2Label: "Better decisions",
    showcaseBox2Title: "Data helps improve the process",
    showcaseBox2Text: "Replies, reply rate, analysis and visuals quickly show what is working.",
    gallery1Title: "Login and interface",
    gallery1Text: "A clear and modern portal where the whole system feels manageable instantly.",
    gallery2Title: "Companies and contacts",
    gallery2Text: "Campaigns, companies and contacts appear in one view.",
    gallery3Title: "Analytics",
    gallery3Text: "Visual insights and distributions help optimize execution.",

    pricingEyebrow: "PRICING",
    pricingTitle: "Start with a pilot or build a continuous operating model",
    pricingText: "Light start, clear next step and room to scale later.",
    planPilot: "Pilot",
    planVat: " + VAT",
    pilotSub: "A low-risk way to test the concept",
    pilot1: "Build the prospect database",
    pilot2: "Contact at least 500 prospects",
    pilot3: "Follow-ups and reply handling",
    pilot4: "Data enrichment and buying signals",
    featuredBadge: "Recommended",
    planQuarter: " / 3 months",
    basicSub: "Continuous system and higher volume",
    basic1: "Full ICP mapping",
    basic2: "Up to 1000 decision-makers contacted / month",
    basic3: "Buying signal search every 2 weeks",
    basic4: "Continuous prospect data updates",
    basic5: "CRM integration",
    basic6: "Meeting booking",
    planScale: "Extensions",
    customPlan: "Custom",
    customSub: "Scaled to your needs",
    custom1: "Higher outbound volume",
    custom2: "More customer segments",
    custom3: "More frequent buying signal search",
    custom4: "Infrastructure and maintenance",
    custom5: "Additional automations",

    ctaEyebrow: "NEXT STEP",
    ctaTitle: "If you want more real sales conversations out of outbound, start here",
    ctaText: "Let’s quickly see whether AutoClient fits your sales model, ICP and growth goals.",
    ctaPrimary: "Contact us",
    ctaSecondary: "Book a call",

    footerText: "Scalera Solutions builds AI-assisted systems that make B2B prospecting, outbound and early-stage sales more systematic and transparent.",
    footerNav: "Navigation",
    footerContact: "Contact"
  }
};

function setLanguage(lang) {
  const selected = translations[lang];
  if (!selected) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (selected[key]) element.textContent = selected[key];
  });

  htmlEl.lang = lang;
  localStorage.setItem("siteLanguage", lang);

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
  });
}

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang-btn");
    setLanguage(lang);
  });
});

const savedLang = localStorage.getItem("siteLanguage") || "fi";
setLanguage(savedLang);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
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
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

countElements.forEach((el) => countObserver.observe(el));

window.addEventListener("scroll", () => {
  if (window.scrollY > 10) header?.classList.add("scrolled");
  else header?.classList.remove("scrolled");
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

function showSlide(index) {
  infoCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });

  sliderDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentSlide = index;
}

function nextSlide() {
  const next = (currentSlide + 1) % infoCards.length;
  showSlide(next);
}

function prevSlide() {
  const prev = (currentSlide - 1 + infoCards.length) % infoCards.length;
  showSlide(prev);
}

function startAutoSlide() {
  stopAutoSlide();
  autoSlideInterval = setInterval(nextSlide, 4200);
}

function stopAutoSlide() {
  if (autoSlideInterval) clearInterval(autoSlideInterval);
}

nextCardBtn?.addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});

prevCardBtn?.addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});

sliderDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoSlide();
  });
});

cardSlider?.addEventListener("mouseenter", stopAutoSlide);
cardSlider?.addEventListener("mouseleave", startAutoSlide);

showSlide(0);
startAutoSlide();

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

window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader?.classList.add("hidden");
    document.body.classList.remove("is-loading");
  }, 950);
});
