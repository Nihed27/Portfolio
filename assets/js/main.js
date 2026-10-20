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

  /* ---------- Typed roles ---------- */
  const typed = $("#typed");
  if (typed) {
    let i = 0, ch = 0, del = false, timer;
    const roles = () => window.I18N[document.documentElement.lang]["hero.roles"];
    const tick = () => {
      const r = roles()[i % roles().length];
      ch += del ? -1 : 1;
      typed.textContent = r.slice(0, ch);
      let d = del ? 28 : 60;
      if (!del && ch === r.length) { del = true; d = 1700; }
      else if (del && ch === 0) { del = false; i++; d = 300; }
      timer = setTimeout(tick, d);
    };
    tick();
    document.addEventListener("langchange", () => { clearTimeout(timer); ch = 0; del = false; tick(); });
  }

  /* ---------- LoRa chirp oscilloscope ----------
     A LoRa symbol is a linear frequency sweep ("chirp") that wraps around.
     Higher spreading factor (SF) = longer, slower chirps. Top: time-domain
     waveform. Bottom: waterfall (frequency vs time) showing the sawtooth. */
  const cv = $("#scope");
  if (cv) {
    const ctx = cv.getContext("2d");
    let W, H, dpr, sf = 7, targetSf = 7, t = 0, visible = true;
    const sfEl = $("#sfVal");
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); addEventListener("resize", resize);
    const setFromX = x => {
      const r = cv.getBoundingClientRect();
      targetSf = 7 + Math.round(((x - r.left) / r.width) * 5);
      targetSf = Math.max(7, Math.min(12, targetSf));
    };
    cv.addEventListener("pointermove", e => setFromX(e.clientX));
    cv.addEventListener("pointerleave", () => { targetSf = 7; });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);

    const draw = () => {
      requestAnimationFrame(draw);
      if (!visible) return;
      t += 1 / 60;
      sf += (targetSf - sf) * 0.08;
      if (sfEl) sfEl.textContent = Math.round(sf);
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = "rgba(255,255,255,0.05)"; ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke(); }

      const split = H * 0.56;
      const symW = 40 * Math.pow(2, (sf - 7) * 0.45) + 60;   // pixels per symbol
      const speed = 70;                                        // px per second scroll
      const off = t * speed;

      // --- waveform (top)
      const mid = split / 2, amp = split * 0.32;
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      grad.addColorStop(0, "rgba(125,155,255,0.15)");
      grad.addColorStop(0.5, "#7d9bff");
      grad.addColorStop(1, "#ff8a5c");
      ctx.strokeStyle = grad; ctx.lineWidth = 1.6; ctx.beginPath();
      const fMax = 0.5 * (11 / sf);
      for (let x = 0; x <= W; x += 1) {
        const u = (x + off) % symW;                         // px inside the current symbol
        // phase = integral of linearly rising frequency -> scrolls smoothly
        const phase = 0.05 * u + (fMax * u * u) / (2 * symW);
        const env = 0.85 + 0.15 * Math.sin((x + off) * 0.01);
        const y = mid + Math.sin(phase) * amp * env;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // divider
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.beginPath(); ctx.moveTo(0, split + .5); ctx.lineTo(W, split + .5); ctx.stroke();

      // --- waterfall (bottom): sawtooth chirps
      const top = split + 14, bot = H - 14, hh = bot - top;
      ctx.lineWidth = 2.2; ctx.lineCap = "round";
      const start = -((off) % symW);
      for (let x0 = start; x0 < W; x0 += symW) {
        const g = ctx.createLinearGradient(x0, bot, x0 + symW, top);
        g.addColorStop(0, "rgba(125,155,255,0.25)");
        g.addColorStop(1, "rgba(255,138,92,0.95)");
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(x0, bot); ctx.lineTo(x0 + symW - 4, top); ctx.stroke();
        ctx.fillStyle = "rgba(255,138,92,0.9)";
        ctx.beginPath(); ctx.arc(x0 + symW - 4, top, 2.4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = "rgba(200,210,235,0.45)";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.fillText("freq ↑", 10, top + 10);
      ctx.fillText("signal", 10, 18);
    };
    draw();
  }

  /* ---------- Count-up stats ---------- */
  const co = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1400;
      const step = now => {
        const p = Math.min(1, (now - t0) / dur), k = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(end * k);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      co.unobserve(el);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => co.observe(el));

  /* ---------- Layers: a "packet" travels from hardware (L1) up to apps (L5) ---------- */
  const layers = $("#layers");
  if (layers) {
    const items = [...layers.querySelectorAll(".layer")].reverse(); // L1 first
    let k = 0, iv = null, hover = false;
    layers.addEventListener("pointerenter", () => { hover = true; items.forEach(l => l.classList.remove("pulse")); });
    layers.addEventListener("pointerleave", () => { hover = false; });
    const run = () => {
      if (hover) return;
      items.forEach((l, i) => l.classList.toggle("pulse", i === k % items.length));
      k++;
    };
    new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !iv) iv = setInterval(run, 700);
      if (!e.isIntersecting && iv) { clearInterval(iv); iv = null; }
    }).observe(layers);
  }

  /* ---------- Journey (sticky story scroll) ---------- */
  const jl = $("#journeyList");
  const L = () => document.documentElement.lang === "en" ? "en" : "fr";
  const place = p => L() === "en" ? p.replace("Tunisie", "Tunisia") : p;
  let activeStep = 0;
  const setStage = i => {
    const j = window.JOURNEY[i]; if (!j) return;
    activeStep = i;
    $$(".step", jl).forEach((s, k) => s.classList.toggle("active", k === i));
    $("#stageIdx").textContent = String(i + 1).padStart(2, "0");
    $("#stageYear").textContent = j.year;
    $("#stageCo").textContent = j.co + " · " + place(j.place);
    $("#stageBar").style.width = ((i + 1) / window.JOURNEY.length) * 100 + "%";
    const art = $("#stageArt");
    if (art.dataset.k !== j.art) { art.dataset.k = j.art; art.innerHTML = window.ART[j.art]; }
  };
  const renderJourney = () => {
    if (!jl) return;
    const lg = L();
    $("#stageTotal").textContent = String(window.JOURNEY.length).padStart(2, "0");
    jl.innerHTML = window.JOURNEY.map((j, i) => `
      <li class="step" data-i="${i}">
        <div class="step-meta">${j.year} · ${place(j.place)}</div>
        <h3>${j.co}</h3>
        <p class="step-role">${j.role[lg]}</p>
        <ul>${j.points[lg].map(p => `<li>${p}</li>`).join("")}</ul>
        <div class="tags">${j.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        ${j.link ? `<a class="step-link" href="${j.link}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
      </li>`).join("");
    const so2 = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setStage(+e.target.dataset.i); });
    }, { rootMargin: "-40% 0px -55% 0px" });
    $$(".step", jl).forEach(s => so2.observe(s));
    setStage(activeStep);
  };
  renderJourney();
  document.addEventListener("langchange", renderJourney);

  /* ---------- Reveal ---------- */
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => ro.observe(el));
})();
