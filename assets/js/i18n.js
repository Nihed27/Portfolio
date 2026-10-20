/* Simple i18n: elements with data-i18n="key" get textContent,
   data-i18n-html="key" get innerHTML. Dictionaries below. */
window.I18N = {
  fr: {
    "nav.about": "À propos",
    "nav.journey": "Parcours",
    "nav.projects": "Projets",
    "nav.skills": "Compétences",
    "nav.contact": "Contact"
  },
  en: {
    "nav.about": "About",
    "nav.journey": "Journey",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact"
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
