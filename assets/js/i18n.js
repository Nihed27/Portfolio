/* Simple i18n: elements with data-i18n="key" get textContent,
   data-i18n-html="key" get innerHTML. Dictionaries below. */
window.I18N = {
  fr: {
    "nav.about": "À propos",
    "nav.journey": "Parcours",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.contact": "Contact",
    "hero.status": "Disponible pour un PFE — février 2027",
    "hero.title": "Du silicium <em>à l'intelligence.</em>",
    "hero.lead": "Je suis <strong>Nihed Missar</strong>, élève ingénieure Software &amp; AI à l'ENICarthage. Je conçois des systèmes de bout en bout : du firmware sur ESP32 jusqu'aux modèles d'IA et aux applications web qui les rendent utiles.",
    "hero.cta1": "Voir mes projets",
    "hero.cta2": "Me contacter",
    "hero.hint": "↔ survolez pour changer le SF",
    "hero.roles": ["ingénieure IA & deep learning", "firmware embarqué & IoT", "développeuse full-stack", "réseaux & sécurité"]
  },
  en: {
    "nav.about": "About",
    "nav.journey": "Journey",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.status": "Open to a final-year internship — Feb 2027",
    "hero.title": "From silicon <em>to intelligence.</em>",
    "hero.lead": "I'm <strong>Nihed Missar</strong>, a Software &amp; AI engineering student at ENICarthage. I build systems end to end: from firmware on an ESP32 to the AI models and web apps that make them useful.",
    "hero.cta1": "See my projects",
    "hero.cta2": "Get in touch",
    "hero.hint": "↔ hover to change the SF",
    "hero.roles": ["AI & deep learning engineer", "embedded firmware & IoT", "full-stack developer", "networks & security"]
  }
};

window.setLang = function (lang) {
  const dict = window.I18N[lang] || window.I18N.fr;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const v = dict[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const v = dict[el.dataset.i18nHtml];
    if (v !== undefined) el.innerHTML = v;
  });
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    // format: "attr:key;attr2:key2"
    el.dataset.i18nAttr.split(";").forEach(pair => {
      const [attr, key] = pair.split(":");
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });
  document.querySelectorAll(".lang-switch button").forEach(b =>
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  try { localStorage.setItem("lang", lang); } catch (e) {}
  document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
};
