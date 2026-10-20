(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- Language ---------- */
  let lang = "fr";
  try { lang = localStorage.getItem("lang") || (navigator.language || "fr").slice(0, 2); } catch (e) {}
  if (!window.I18N[lang]) lang = "en";
  window.setLang(lang);
  $$(".lang-switch button").forEach(b => b.addEventListener("click", () => window.setLang(b.dataset.lang)));

  /* ---------- Theme ---------- */
  let theme = null;
  try { theme = localStorage.getItem("theme"); } catch (e) {}
  if (!theme) theme = matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.dataset.theme = theme;
  $("#themeBtn").addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("theme", theme); } catch (e) {}
    document.dispatchEvent(new Event("themechange"));
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menuBtn"), links = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  $$("#navLinks a").forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false");
  }));

  /* ---------- Nav state + progress ---------- */
  const nav = $("#nav"), bar = $("#progressBar");
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 20);
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- Active section in nav ---------- */
  const sections = $$("main section[id]");
  if (sections.length) {
    const so = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) $$("#navLinks a").forEach(a =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(s => so.observe(s));
  }

  /* ---------- Reveal ---------- */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => ro.observe(el));
})();
