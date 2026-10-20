/* Interactive terminal + contact copy + footer year */
(function () {
  const $ = s => document.querySelector(s);
  const L = () => (document.documentElement.lang === "en" ? "en" : "fr");
  const T = k => window.I18N[L()][k];
  const esc = s => String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));

  const body = $("#termBody"), form = $("#termForm"), input = $("#termIn");
  if (body && form) {
    const print = (html, cls = "out") => {
      const d = document.createElement("div"); d.className = cls; d.innerHTML = html;
      body.appendChild(d); body.scrollTop = body.scrollHeight;
    };
    const SKILLS = {
      "AI & data": ["PyTorch", "TensorFlow Lite", "YOLOv8", "Deep RL", "LangChain", "RAG", "SQL", "MongoDB"],
      "Embedded & IoT": ["ESP32", "STM32F4", "Raspberry Pi", "Arduino", "C/C++", "LoRaWAN", "KiCad"],
      "Web & mobile": ["Angular", "TypeScript", "Spring Boot", "FastAPI", "Android"],
      "Security & networks": ["TLS 1.3", "MFA/TOTP", "JWT", "RHEL", "CCNA"],
      "Languages & tools": ["Python", "C", "C++", "Java", "Git", "Docker", "pytest"]
    };
    const history = []; let hi = 0;
    const run = raw => {
      const line = raw.trim(); if (!line) return;
      history.push(line); hi = history.length;
      print(`<span class="cmd">$ ${esc(line)}</span>`, "cmdline");
      const [cmd, ...args] = line.split(/\s+/); const arg = args.join(" ");
      switch (cmd.toLowerCase()) {
        case "help": print(T("term.help")); break;
        case "whoami": print(esc(T("term.whoami"))); break;
        case "skills":
          print(Object.entries(SKILLS).map(([k, v]) => `<span class="hl">${k.padEnd(20)}</span> ${v.join(", ")}`).join("\n")); break;
        case "projects":
          print(window.PROJECTS.map(p => `<span class="hl">›</span> ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">${esc(p.title[L()])}</a>` : esc(p.title[L()])}`).join("\n")); break;
        case "stack": {
          if (!arg) { print("usage: stack &lt;word&gt;  (ex: stack docker)"); break; }
          const q = arg.toLowerCase();
          const hits = window.PROJECTS.filter(p => p.tags.some(t => t.toLowerCase().includes(q)) || p.desc[L()].toLowerCase().includes(q));
          const inSkills = Object.values(SKILLS).flat().some(s => s.toLowerCase().includes(q));
          if (hits.length) print(T("term.stackyes") + hits.map(p => `<span class="hl">${esc(p.title[L()])}</span>`).join(", "));
          else if (inSkills) print("✓ " + esc(arg));
          else print(T("term.stackno"));
          break;
        }
        case "contact": print(`${T("term.contact")}\nlinkedin: <a href="https://www.linkedin.com/in/nihed-missar-8b1058251" target="_blank" rel="noopener">nihed-missar</a>\ngithub: <a href="https://github.com/Nihed27" target="_blank" rel="noopener">Nihed27</a>`); break;
        case "lang": if (arg === "en" || arg === "fr") window.setLang(arg); else print("usage: lang en|fr"); break;
        case "theme": document.getElementById("themeBtn").click(); print("ok"); break;
        case "clear": body.innerHTML = ""; break;
        case "sudo": print("nice try 🙂"); break;
        default: print(T("term.notfound") + esc(cmd));
      }
    };
    const welcome = () => { body.innerHTML = ""; print(T("term.welcome")); };
    welcome();
    document.addEventListener("langchange", () => { if (body.children.length <= 1) welcome(); });
    form.addEventListener("submit", e => { e.preventDefault(); run(input.value); input.value = ""; });
    input.addEventListener("keydown", e => {
      if (e.key === "ArrowUp" && hi > 0) { hi--; input.value = history[hi]; e.preventDefault(); }
      if (e.key === "ArrowDown") { hi = Math.min(history.length, hi + 1); input.value = history[hi] || ""; e.preventDefault(); }
    });
    $("#term").addEventListener("click", e => { if (e.target.tagName !== "A") input.focus({ preventScroll: true }); });
  }

  /* Copy email */
  const cp = $("#copyEmail");
  if (cp) cp.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText("missarnihed167@gmail.com"); } catch (e) {}
    const l = $("#copyLbl"); l.textContent = T("contact.copied");
    setTimeout(() => { l.textContent = T("contact.copy"); }, 1800);
  });

  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
})();
