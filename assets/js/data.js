/* Content data (bilingual). Edit here to update the site. */

/* Small inline illustrations (use currentColor + CSS vars) */
const ART = {
  wearable: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="70" y="10" width="60" height="18" rx="6" opacity=".35"/><rect x="70" y="112" width="60" height="18" rx="6" opacity=".35"/>
    <rect x="58" y="28" width="84" height="84" rx="22"/>
    <path class="art-accent" d="M70 72h14l6-16 10 30 8-22 6 8h16"/>
    <path class="art-signal" d="M150 46c8 6 8 22 0 28M160 38c14 10 14 34 0 44M170 30c20 14 20 46 0 60"/>
  </svg>`,
  detect: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <rect x="12" y="12" width="176" height="116" rx="10" opacity=".35"/>
    <rect class="art-accent" x="34" y="40" width="58" height="62" rx="3" stroke-dasharray="6 4"/>
    <rect class="art-signal" x="108" y="30" width="60" height="44" rx="3" stroke-dasharray="6 4"/>
    <rect x="34" y="30" width="44" height="10" rx="2" class="art-fill-accent" stroke="none"/>
    <rect x="108" y="20" width="40" height="10" rx="2" class="art-fill-signal" stroke="none"/>
    <circle cx="63" cy="72" r="14" opacity=".5"/><path d="M118 62l14-16 12 10 14-14" opacity=".5"/>
  </svg>`,
  kanban: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <rect x="12" y="14" width="52" height="112" rx="8" opacity=".35"/><rect x="74" y="14" width="52" height="112" rx="8" opacity=".35"/><rect x="136" y="14" width="52" height="112" rx="8" opacity=".35"/>
    <rect x="20" y="26" width="36" height="20" rx="4"/><rect x="20" y="52" width="36" height="20" rx="4"/>
    <rect class="art-accent" x="82" y="26" width="36" height="20" rx="4"/>
    <rect class="art-signal" x="144" y="26" width="36" height="20" rx="4"/><rect x="144" y="52" width="36" height="20" rx="4"/><rect x="144" y="78" width="36" height="20" rx="4"/>
  </svg>`,
  pcb: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="14" y="14" width="172" height="112" rx="12" opacity=".35"/>
    <rect x="76" y="46" width="48" height="48" rx="4"/>
    <path d="M84 46v-8M92 46v-8M100 46v-8M108 46v-8M116 46v-8M84 94v8M92 94v8M100 94v8M108 94v8M116 94v8"/>
    <path class="art-accent" d="M124 58h22l10-10h18M124 82h30v22M76 70H40l-8-8"/>
    <circle class="art-accent" cx="174" cy="48" r="4"/><circle cx="32" cy="62" r="4"/>
    <path class="art-signal" d="M154 104l10 10M164 104v10h-10"/>
    <path d="M30 100h20v12H30z" opacity=".6"/>
  </svg>`,
  fleet: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path opacity=".35" d="M14 108c30-30 50 10 80-20s50-30 92-8"/>
    <path class="art-accent" d="M40 30a14 14 0 0 1 14 14c0 12-14 26-14 26S26 56 26 44a14 14 0 0 1 14-14z"/><circle class="art-accent" cx="40" cy="44" r="4"/>
    <path d="M110 74h44l14 16v14h-58z"/><circle cx="124" cy="106" r="7"/><circle cx="156" cy="106" r="7"/>
    <path class="art-signal" d="M132 54c6-6 16-6 22 0M126 46c10-10 24-10 34 0"/>
  </svg>`,
  fiber: `<svg viewBox="0 0 200 140" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <path opacity=".35" d="M10 70h180"/>
    <path class="art-accent" d="M10 60c40 0 50-30 90-30s50 30 90 30"/>
    <path class="art-signal" d="M10 80c40 0 50 30 90 30s50-30 90-30"/>
    <rect x="80" y="54" width="40" height="32" rx="6"/><circle cx="92" cy="70" r="3"/><circle cx="108" cy="70" r="3"/>
  </svg>`
};

window.JOURNEY = [
  {
    art: "wearable", year: "2026",
    co: "Business Intelligence Center (BIC)", place: "Tunis",
    role: { fr: "Stage d'été R&D — dispositif IoT portable", en: "R&D summer internship — wearable IoT device" },
    points: {
      fr: ["Firmware des capteurs sur ESP32-S3 en C (ESP-IDF) et communication LoRa",
           "Déploiement d'un modèle de reconnaissance d'activité TensorFlow Lite sur Raspberry Pi 5",
           "Tableau de bord Streamlit pour visualiser les données des capteurs et les prédictions"],
      en: ["Sensor firmware on ESP32-S3 in C (ESP-IDF) with LoRa communication",
           "Deployed a TensorFlow Lite activity-recognition model on Raspberry Pi 5",
           "Streamlit dashboard to visualise sensor data and predictions"]
    },
    tags: ["ESP32-S3", "ESP-IDF", "LoRa", "TF Lite", "Raspberry Pi 5", "Streamlit"]
  },
  {
    art: "detect", year: "2025",
    co: "KW Manufacturing", place: "Tunisie",
    role: { fr: "Stage d'été — vision par ordinateur", en: "Summer internship — computer vision" },
    points: {
      fr: ["Développement d'un modèle de détection d'objets YOLOv8 pour la vision en temps réel"],
      en: ["Built a YOLOv8 object-detection model for real-time computer vision"]
    },
    tags: ["YOLOv8", "Python", "Computer Vision"]
  },
  {
    art: "kanban", year: "2025",
    co: "Sotetel", place: "Tunisie",
    role: { fr: "Stage d'été — développement web", en: "Summer internship — web development" },
    points: {
      fr: ["Conception d'une application web de gestion de projets : suivi des flux de travail et organisation des tâches"],
      en: ["Designed a project-management web app: workflow tracking and task organisation"]
    },
    tags: ["Web", "Full-stack"]
  },
  {
    art: "pcb", year: "2024",
    co: "Tech4IoT", place: "Tunisie",
    role: { fr: "PFE de licence — nanosatellite ESAT", en: "B.Sc. thesis — ESAT nanosatellite" },
    points: {
      fr: ["Conception d'une carte de communication LoRa pour un nanosatellite éducatif", "Schéma et PCB sous KiCad autour d'un STM32F4 — noté 19/20, mention Excellent"],
      en: ["Designed a LoRa communication board for an educational nanosatellite", "Schematic and PCB in KiCad around an STM32F4 — graded 19/20, highest honours"]
    },
    tags: ["STM32F4", "KiCad", "LoRaWAN", "PCB"],
    link: "https://github.com/Nihed27/Kicad"
  },
  {
    art: "fleet", year: "2023",
    co: "TST Bizerte", place: "Tunisie",
    role: { fr: "Stage d'été — IoT", en: "Summer internship — IoT" },
    points: {
      fr: ["Développement d'un système de gestion de flotte basé sur LoRa pour le suivi des véhicules"],
      en: ["Developed a LoRa-based fleet-management system for vehicle tracking"]
    },
    tags: ["LoRa", "GPS", "IoT"]
  },
  {
    art: "fiber", year: "2022",
    co: "Tunisie Telecom", place: "Tunisie",
    role: { fr: "Stage d'initiation — réseaux", en: "Introductory internship — networks" },
    points: {
      fr: ["Installation et configuration de connexions ADSL et fibre optique"],
      en: ["Installed and configured ADSL and fibre-optic connections"]
    },
    tags: ["ADSL", "FTTH", "Networking"]
  }
];

window.ART = ART;

/* ---------------- Projects ---------------- */
const GH = "https://github.com/Nihed27/";
window.PROJECTS = [
  {
    id: "drl", featured: true, cat: ["ai", "sec"], visual: "drl",
    title: { fr: "Renouvellement adaptatif des clés IoT", en: "Adaptive key refresh for IoT networks" },
    kicker: { fr: "Deep Reinforcement Learning · Sécurité", en: "Deep Reinforcement Learning · Security" },
    desc: {
      fr: "Quand faut-il renouveler les clés cryptographiques d'un réseau de capteurs attaqué ? Trop souvent, ça coûte de l'énergie. Pas assez, et un nœud capturé compromet le réseau. J'ai entraîné un agent pour trancher.",
      en: "When should a sensor network under attack refresh its cryptographic keys? Too often wastes energy; too rarely lets a captured node compromise the network. I trained an agent to decide."
    },
    points: {
      fr: ["Simulation d'un réseau de capteurs : pré-distribution de clés, captures de nœuds, nœuds malveillants (byzantins)",
           "Agent Double DQN qui décide quand renouveler les clés",
           "Coût réduit d'environ 20 % face aux stratégies de référence"],
      en: ["Simulated a sensor network: key pre-distribution, node capture, malicious (Byzantine) nodes",
           "Double DQN agent deciding when to refresh keys",
           "About 20% lower cost than baseline strategies"]
    },
    tags: ["Python", "PyTorch", "Double DQN", "IoT Security"],
    repo: GH + "Adaptive-key-refresh-drl"
  },
  {
    id: "plantdoc", featured: true, cat: ["ai"], visual: "plant",
    title: { fr: "PlantDoc — détection de maladies des plantes", en: "PlantDoc — plant disease detection" },
    kicker: { fr: "Vision par ordinateur · Edge AI", en: "Computer vision · Edge AI" },
    desc: {
      fr: "Un détecteur de maladies foliaires entraîné sur le dataset PlantDoc, pensé pour tourner sur du matériel modeste, là où sont les agriculteurs.",
      en: "A leaf-disease detector trained on the PlantDoc dataset, designed to run on modest hardware — where farmers actually are."
    },
    points: {
      fr: ["Fine-tuning de YOLOv8 sur PlantDoc", "Export ONNX pour un déploiement indépendant du framework", "Quantification INT8 pour réduire la taille et accélérer l'inférence"],
      en: ["Fine-tuned YOLOv8 on PlantDoc", "ONNX export for framework-independent deployment", "INT8 quantisation for a smaller, faster model"]
    },
    tags: ["YOLOv8", "ONNX", "INT8", "Python"],
    repo: GH + "plantdoc-yolov8-detection"
  },
  {
    id: "rag", featured: true, cat: ["ai"], visual: "rag",
    title: { fr: "Assistant RAG multi-agents de veille technologique", en: "Multi-agent RAG assistant for tech watch" },
    kicker: { fr: "LLM · Agents · RAG", en: "LLM · Agents · RAG" },
    desc: {
      fr: "Plusieurs agents spécialisés coopèrent pour collecter, retrouver et synthétiser l'information technique, avec des réponses ancrées dans des sources.",
      en: "Several specialised agents cooperate to collect, retrieve and summarise technical information, with answers grounded in sources."
    },
    points: {
      fr: ["Orchestration des agents avec LangChain / LangGraph", "Recherche sémantique dans une base vectorielle ChromaDB", "API FastAPI, conteneurisée avec Docker"],
      en: ["Agent orchestration with LangChain / LangGraph", "Semantic search over a ChromaDB vector store", "FastAPI service, containerised with Docker"]
    },
    tags: ["LangGraph", "LangChain", "ChromaDB", "FastAPI", "Docker"],
    repo: GH + "rag-veille-tech"
  },
  {
    id: "mail", featured: true, cat: ["sec"], visual: "totp",
    title: { fr: "Serveur de messagerie sécurisé avec MFA", en: "Secure mail server with MFA" },
    kicker: { fr: "Linux · Réseaux · Sécurité", en: "Linux · Networking · Security" },
    desc: {
      fr: "Un serveur mail complet déployé sous RHEL, avec chiffrement moderne et une authentification à deux facteurs, du serveur jusqu'au webmail.",
      en: "A complete mail server deployed on RHEL, with modern encryption and two-factor authentication, from the server to the webmail."
    },
    points: {
      fr: ["Postfix (SMTP), Dovecot (IMAP), Roundcube et MariaDB sous RHEL 9", "Transport chiffré en TLS 1.3", "Authentification multi-facteurs par codes TOTP"],
      en: ["Postfix (SMTP), Dovecot (IMAP), Roundcube and MariaDB on RHEL 9", "TLS 1.3 encrypted transport", "Multi-factor authentication with TOTP codes"]
    },
    tags: ["Postfix", "Dovecot", "Roundcube", "MariaDB", "RHEL 9", "TLS 1.3"],
    repo: GH + "mfa-postfix-dovecot-rhel9"
  },
  {
    id: "interview", cat: ["ai", "web"], icon: "avatar",
    title: { fr: "InterviewSim 3D", en: "InterviewSim 3D" },
    desc: { fr: "Simulateur d'entretien propulsé par l'IA, avec un avatar 3D qui parle. En cours.", en: "AI-powered mock interview simulator with a 3D talking avatar. In progress." },
    tags: ["LLM", "RAG", "Three.js", "Python"], repo: GH + "interview-sim", wip: true
  },
  {
    id: "edukini", cat: ["web"], icon: "browser",
    title: { fr: "EDUKINI", en: "EDUKINI" },
    desc: { fr: "Plateforme full-stack d'orientation qui aide les étudiants de l'ENICarthage à choisir leur parcours.", en: "Full-stack guidance platform helping ENICarthage students choose their track." },
    tags: ["Angular 19", "Spring Boot", "MySQL", "JWT", "Docker"], repo: GH + "EDUKINI"
  },
  {
    id: "taliv", cat: ["web"], icon: "phone",
    title: { fr: "TaLiv", en: "TaLiv" },
    desc: { fr: "Application Android offline-first de gestion de livraisons : suivi en temps réel, Google Maps, messagerie d'urgence.", en: "Offline-first Android delivery app: real-time tracking, Google Maps, emergency messaging." },
    tags: ["Android (Java)", "Spring Boot", "SQLite", "Google Maps"], repo: GH + "TaLiv"
  },
  {
    id: "pose", cat: ["ai", "web"], icon: "pose",
    title: { fr: "Pose Estimation App", en: "Pose Estimation App" },
    desc: { fr: "Détection de pose humaine en temps réel dans le navigateur : 17 points clés, squelette dessiné sur canvas, sans serveur.", en: "Real-time human pose detection in the browser: 17 keypoints, skeleton drawn on canvas, no backend." },
    tags: ["React", "TensorFlow.js", "PoseNet"], repo: GH + "pose-estimation-app"
  },
  {
    id: "kicad", cat: ["emb"], icon: "chip",
    title: { fr: "Carte LoRa pour nanosatellite", en: "LoRa board for a nanosatellite" },
    desc: { fr: "Carte de communication LoRa du nanosatellite éducatif ESAT, autour d'un STM32F4. PFE de licence, 19/20.", en: "LoRa communication board for the ESAT educational nanosatellite, built around an STM32F4. B.Sc. thesis, 19/20." },
    tags: ["KiCad", "STM32F4", "LoRaWAN"], repo: GH + "Kicad"
  }
];

window.ICONS = {
  avatar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/><path d="M17 4l2-2M19 7h2"/></svg>`,
  browser: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/><path d="M8 14l2 2 4-4"/></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/><path d="M12 7a2.5 2.5 0 0 1 2.5 2.5C14.5 12 12 14 12 14s-2.5-2-2.5-4.5A2.5 2.5 0 0 1 12 7z"/></svg>`,
  pose: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="4" r="2"/><path d="M12 6v7M7 9l5 1 5-3M12 13l-4 8M12 13l4 8"/></svg>`,
  chip: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>`
};
