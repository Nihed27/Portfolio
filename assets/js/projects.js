/* Project visuals + rendering + filters */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const L = () => (document.documentElement.lang === "en" ? "en" : "fr");
  const T = k => window.I18N[L()][k];

  /* ----- Visuals (SVG strings; labels are translated at render time) ----- */
  const VIS = {
    drl: () => `
<svg viewBox="0 0 400 320" fill="none">
  <!-- sensor network -->
  <g stroke-width="1.2">
    <path class="v-line" d="M40 60 L110 40 L180 70 L250 35 L330 60 M110 40 L120 110 L180 70 L240 115 L250 35 M40 60 L120 110 L240 115 L330 60"/>
  </g>
  <g>
    <circle cx="40" cy="60" r="6" class="v-fill-accent"/><circle cx="110" cy="40" r="6" class="v-fill-accent"/>
    <circle cx="180" cy="70" r="6" class="v-fill-accent"/><circle cx="250" cy="35" r="6" class="v-fill-accent"/>
    <circle cx="330" cy="60" r="6" class="v-fill-accent"/><circle cx="240" cy="115" r="6" class="v-fill-accent"/>
    <circle cx="120" cy="110" r="7" class="v-fill-signal node-pulse"/>
    <text x="132" y="128" class="v-text">${T("v.drl.byz")}</text>
  </g>
  <!-- cost bars -->
  <path class="v-line" d="M40 290 H360"/>
  <text x="40" y="168" class="v-text">${T("v.drl.cost")}</text>
  <rect class="bar" x="70"  y="190" width="62" height="100" rx="6" fill="currentColor" opacity=".18"/>
  <rect class="bar b2" x="170" y="190" width="62" height="100" rx="6" fill="currentColor" opacity=".18"/>
  <rect class="bar b3 v-fill-accent" x="270" y="210" width="62" height="80" rx="6"/>
  <text x="101" y="308" class="v-text" text-anchor="middle">${T("v.drl.b1")}</text>
  <text x="201" y="308" class="v-text" text-anchor="middle">${T("v.drl.b2")}</text>
  <text x="301" y="308" class="v-strong" text-anchor="middle">Double DQN</text>
  <text x="301" y="200" class="v-strong" text-anchor="middle" fill="var(--accent)" style="fill:var(--accent)">≈ −20 %</text>
</svg>`,
    plant: () => `
<svg viewBox="0 0 400 320" fill="none">
  <defs><clipPath id="leafClip"><path d="M200 30 C300 60 330 170 250 260 C220 292 180 292 150 260 C70 170 100 60 200 30Z"/></clipPath></defs>
  <path d="M200 30 C300 60 330 170 250 260 C220 292 180 292 150 260 C70 170 100 60 200 30Z" fill="var(--ok)" opacity=".16" stroke="var(--ok)" stroke-width="1.5"/>
  <path d="M200 40 V280 M200 110 L150 80 M200 150 L260 110 M200 190 L145 160 M200 225 L255 195" stroke="var(--ok)" stroke-width="1.4" opacity=".7"/>
  <circle cx="160" cy="120" r="10" fill="#b5651d" opacity=".55"/><circle cx="170" cy="132" r="6" fill="#b5651d" opacity=".5"/>
  <circle cx="245" cy="175" r="12" fill="#c9a227" opacity=".55"/><circle cx="185" cy="215" r="8" fill="#b5651d" opacity=".5"/>
  <g clip-path="url(#leafClip)"><rect class="scanline" x="60" y="30" width="280" height="2" fill="var(--accent)" opacity=".8"/></g>
  <g class="det"><rect x="140" y="102" width="44" height="44" rx="3" stroke="var(--signal)" stroke-width="2" stroke-dasharray="5 3"/><rect x="140" y="88" width="62" height="14" fill="var(--signal)"/><text x="144" y="98" font-family="JetBrains Mono, monospace" font-size="9" fill="#fff">leaf_spot</text></g>
  <g class="det d2"><rect x="228" y="158" width="36" height="36" rx="3" stroke="var(--accent)" stroke-width="2" stroke-dasharray="5 3"/><rect x="228" y="144" width="42" height="14" fill="var(--accent)"/><text x="232" y="154" font-family="JetBrains Mono, monospace" font-size="9" fill="#fff">rust</text></g>
  <g class="det d3"><rect x="172" y="202" width="28" height="28" rx="3" stroke="var(--signal)" stroke-width="2" stroke-dasharray="5 3"/><rect x="172" y="188" width="56" height="14" fill="var(--signal)"/><text x="176" y="198" font-family="JetBrains Mono, monospace" font-size="9" fill="#fff">blight</text></g>
  <g font-family="JetBrains Mono, monospace" font-size="11">
    <rect x="28" y="290" width="80" height="22" rx="11" class="v-fill-soft"/><text x="68" y="305" text-anchor="middle" class="v-text">YOLOv8</text>
    <text x="122" y="305" class="v-text">→</text>
    <rect x="140" y="290" width="70" height="22" rx="11" class="v-fill-soft"/><text x="175" y="305" text-anchor="middle" class="v-text">ONNX</text>
    <text x="224" y="305" class="v-text">→</text>
    <rect x="242" y="290" width="70" height="22" rx="11" class="v-fill-accent"/><text x="277" y="305" text-anchor="middle" fill="#fff">INT8</text>
  </g>
</svg>`,
    rag: () => {
      const n = (x, y, w, label, cls = "") => `<g><rect x="${x - w / 2}" y="${y - 17}" width="${w}" height="34" rx="17" class="v-fill-card ${cls}" stroke-width="1.5"/><text x="${x}" y="${y + 4}" text-anchor="middle" class="v-strong" style="font-size:12px">${label}</text></g>`;
      const paths = ["M200 52 V92", "M200 126 C200 150 110 146 110 172", "M200 126 V172", "M200 126 C200 150 290 146 290 172",
                     "M110 206 C110 236 200 228 200 250", "M200 206 V250", "M290 206 C290 236 200 228 200 250"];
      const dots = paths.map((d, i) => `<circle r="3.5" class="v-fill-signal"><animateMotion dur="2.4s" begin="${(i % 4) * 0.35}s" repeatCount="indefinite" path="${d}"/></circle>`).join("");
      return `
<svg viewBox="0 0 400 320" fill="none">
  <g class="v-line" stroke-width="1.5">${paths.map(d => `<path d="${d}"/>`).join("")}</g>
  ${dots}
  ${n(200, 35, 120, T("v.rag.q"), "v-ink")}
  ${n(200, 109, 130, "Router", "v-accent")}
  ${n(110, 189, 110, "Retriever", "v-ink")}
  ${n(200, 189, 70, "Web", "v-ink")}
  ${n(290, 189, 110, "Analyst", "v-ink")}
  ${n(200, 267, 140, T("v.rag.a"), "v-accent")}
  <g transform="translate(22 232)"><ellipse cx="22" cy="6" rx="22" ry="6" class="v-ink" stroke-width="1.4"/><path d="M0 6v26c0 3 10 6 22 6s22-3 22-6V6" class="v-ink" stroke-width="1.4"/><path d="M0 19c0 3 10 6 22 6s22-3 22-6" class="v-ink" stroke-width="1.4"/><text x="22" y="56" text-anchor="middle" class="v-text">ChromaDB</text></g>
  <text x="200" y="312" text-anchor="middle" class="v-text">LangGraph · FastAPI · Docker</text>
</svg>`;
    },
    totp: () => `
<div class="totp">
  <div class="totp-ring" id="totpRing"><span id="totpSec">30</span></div>
  <div class="totp-code" id="totpCode"></div>
  <div class="totp-meta"><span class="ok-pill">TLS 1.3 ✓</span><span class="ok-pill">TOTP ✓</span><span class="ok-pill">IMAPS ✓</span></div>
</div>`
  };

  const ARROW = `<svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 17L17 7M8 7h9v9"/></svg>`;
  const GH_IC = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z"/></svg>`;

  let filter = "all";
  function render() {
    const lg = L(), P = window.PROJECTS;
    const feat = P.filter(p => p.featured), oth = P.filter(p => !p.featured);
    $("#featured").innerHTML = feat.map((p, i) => `
      <article class="feat" data-cat="${p.cat.join(" ")}">
        <div class="feat-text">
          <div class="feat-num">${String(i + 1).padStart(2, "0")} / ${String(feat.length).padStart(2, "0")}</div>
          <div class="feat-kicker">${p.kicker[lg]}</div>
          <h3>${p.title[lg]}</h3>
          <p class="feat-desc">${p.desc[lg]}</p>
          <ul>${p.points[lg].map(x => `<li>${x}</li>`).join("")}</ul>
          <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
          ${p.repo ? `<div class="feat-links"><a class="btn btn-ghost btn-sm" href="${p.repo}" target="_blank" rel="noopener">${GH_IC}<span>${T("projects.code")}</span></a></div>` : ""}
        </div>
        <div class="feat-visual" data-label="${p.id}.preview">${VIS[p.visual]()}</div>
      </article>`).join("");
    $("#others").innerHTML = oth.map(p => {
      const tag = p.repo ? "a" : "div";
      const href = p.repo ? ` href="${p.repo}" target="_blank" rel="noopener"` : "";
      return `<${tag} class="card" data-cat="${p.cat.join(" ")}"${href}>
        <span class="card-ic">${window.ICONS[p.icon]}</span>
        ${p.repo ? ARROW : ""}
        <h4>${p.title[lg]}${p.wip ? `<span class="wip">${T("projects.wip")}</span>` : ""}</h4>
        <p>${p.desc[lg]}</p>
        <div class="tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
      </${tag}>`;
    }).join("");
    applyFilter();
    observeVisuals();
    startTotp();
  }

  function applyFilter() {
    $$(".feat, .card", $("#projects")).forEach(el => {
      el.classList.toggle("hide", filter !== "all" && !el.dataset.cat.split(" ").includes(filter));
    });
    const anyOther = $$("#others .card:not(.hide)").length;
    $(".others-title").style.display = anyOther ? "" : "none";
  }
  $$("#filters .chip").forEach(c => c.addEventListener("click", () => {
    filter = c.dataset.f;
    $$("#filters .chip").forEach(x => x.classList.toggle("on", x === c));
    applyFilter();
  }));

  function observeVisuals() {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); }
    }), { threshold: 0.35 });
    $$(".feat-visual").forEach(v => io.observe(v));
  }

  /* TOTP demo: random 6-digit code renewed every 30 s (illustration only) */
  let totpTimer;
  function startTotp() {
    clearInterval(totpTimer);
    const code = $("#totpCode"), ring = $("#totpRing"), sec = $("#totpSec");
    if (!code) return;
    const newCode = () => {
      const d = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10));
      code.innerHTML = d.map((x, i) => `<b style="transition-delay:${i * 40}ms">${x}</b>${i === 2 ? " " : ""}`).join("");
    };
    newCode();
    const tick = () => {
      const s = 30 - (Math.floor(Date.now() / 1000) % 30);
      sec.textContent = s;
      ring.style.setProperty("--p", (s / 30) * 100);
      if (s === 30) {
        $$("b", code).forEach(b => b.classList.add("flip"));
        setTimeout(newCode, 300);
      }
    };
    tick(); totpTimer = setInterval(tick, 1000);
  }

  render();
  document.addEventListener("langchange", render);
})();
