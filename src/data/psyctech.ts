export interface BrandConfig {
  name: string;
  tagline: string;
  institution: string;
  email: string;
  whatsapp: string;
  phone: string;
  location: string;
  estYear: string;
  subheading: string;
}

export const BRAND_CONFIG: BrandConfig = {
  name: "Orbite",
  tagline: "We build people who build things.",
  institution: "Lingaraj Appa Engineering College, Bidar",
  email: "hasanpsyctech@gmail.com",
  whatsapp: "https://wa.me/919448274542",
  phone: "+91 9448274542",
  location: "Bidar, Karnataka",
  estYear: "2025",
  subheading:
    "A student-led innovation and product development ecosystem bridging academic theory with real-world engineering.",
};

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Ecosystem", href: "#ecosystem" },
  { label: "Initiatives", href: "#initiatives" },
  { label: "Contact", href: "#contact" },
];

export interface Milestone {
  numericValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  context: string;
}

export const milestonesData: Milestone[] = [
  {
    numericValue: 65,
    suffix: "+",
    label: "Verified Teams",
    context: "HACKORA 2026 National Competition",
  },
  {
    numericValue: 45000,
    prefix: "₹",
    label: "Innovation Fest Prize Pool",
    context: "Merit-based student research grants",
  },
  {
    numericValue: 54,
    suffix: "",
    label: "YUVA Workshop Innovators",
    context: "Trained with Team KrishiKalpa",
  },
  {
    numericValue: 7,
    prefix: "0",
    label: "Active & Pipeline R&D Systems",
    context: "Across IoT, AI, and campus software",
  },
];

export type SystemCategory = "all" | "active" | "prototype" | "planned";

export interface SystemItem {
  id: string;
  title: string;
  shortTitle: string;
  category: "active" | "prototype" | "planned";
  categoryLabel: string;
  domain: string;
  statusText: "Active" | "Approved" | "Prototype" | "Concept" | "Planned";
  referenceCode?: string;
  problemStatement: string;
  solutionOverview: string;
  architectureStack: string[];
  lookingFor?: string[];
  currentStage: string;
  year: string;
}

export const systemsIndexData: SystemItem[] = [
  {
    id: "autoattend",
    title: "AutoAttend",
    shortTitle: "Multilayer BLE & Geofencing Presence Verification",
    category: "active",
    categoryLabel: "Active & Approved",
    domain: "Campus Infrastructure",
    statusText: "Active",
    problemStatement:
      "Traditional attendance in large engineering auditoriums suffers from proxy sign-ins, Bluetooth spoofing, and excessive lecture downtime.",
    solutionOverview:
      "A multilayer presence verification platform combining dynamic rolling BLE advertising packets, dual-point RSSI signal trilateration, and strict geofencing to verify physical seat presence without cellular dependency.",
    architectureStack: ["Bluetooth Low Energy", "RSSI Trilateration", "Geofencing", "FastAPI", "React Native"],
    lookingFor: ["React Native", "FastAPI / Python", "BLE Firmware Testing"],
    currentStage: "Institutional testing across academic blocks",
    year: "2026",
  },
  {
    id: "smart-lpg",
    title: "Smart LPG Gas Leak Detection System",
    shortTitle: "KSCST-Approved IoT Safety & Valve Actuation",
    category: "active",
    categoryLabel: "Active & Approved",
    domain: "IoT & Critical Safety",
    statusText: "Approved",
    referenceCode: "KSCST Ref: 48S_BE_0549",
    problemStatement:
      "Unattended LPG leaks in domestic kitchens and student hostels pose catastrophic fire hazards before audible gas buildup is detected by occupants.",
    solutionOverview:
      "An automated real-time safety unit combining a calibrated MQ-6 semiconductor sensor with an ESP8266 controller that mechanically actuates an N20 geared shutoff valve within 400 milliseconds, coupled with cloud telemetry and emergency dispatch.",
    architectureStack: ["ESP8266 NodeMCU", "MQ-6 Sensor", "N20 Geared Actuator", "Firebase Realtime DB", "C++ / FreeRTOS"],
    lookingFor: ["Embedded C / FreeRTOS", "ESP8266 & Circuit Design", "Hardware Fabrication"],
    currentStage: "Approved under KSCST 48th Series; pilot testing",
    year: "2025–2026",
  },
  {
    id: "gridmap-ai",
    title: "GridMap AI / FindIt",
    shortTitle: "Indoor Spatial Mapping & Campus Navigation",
    category: "prototype",
    categoryLabel: "Prototypes",
    domain: "Spatial Infrastructure",
    statusText: "Prototype",
    problemStatement:
      "Sprawling multi-floor collegiate campuses lack room-level, turn-by-turn indoor mapping for new students, evaluators, and visitors.",
    solutionOverview:
      "A lightweight 2D canvas pathfinding engine powered by React and Konva utilizing graph traversal (A* algorithm) to calculate wheelchair-accessible, multi-level paths to specific laboratories and faculty cabins.",
    architectureStack: ["React", "HTML5 Konva", "Graph Traversal (A*)", "Firebase", "Tailwind CSS"],
    lookingFor: ["React & TypeScript", "HTML5 Canvas (Konva)", "Pathfinding Algorithms"],
    currentStage: "Alpha campus floor-plan digitisation",
    year: "2026",
  },
  {
    id: "digital-platform",
    title: "Orbite Digital Platform",
    shortTitle: "Web Infrastructure & Community Portal",
    category: "active",
    categoryLabel: "Active & Approved",
    domain: "Web Architecture",
    statusText: "Active",
    problemStatement:
      "Fragmented communication, unstructured event registration, and slow portfolio dissemination across independent student projects.",
    solutionOverview:
      "The official server-rendered digital home uniting Orbite Community initiatives with Orbite Labs R&D disclosures, built on modern edge infrastructure with zero unnecessary runtime overhead.",
    architectureStack: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS v4", "Edge Runtime"],
    lookingFor: ["Next.js & React 19", "Tailwind CSS v4", "UI/UX & Design Systems"],
    currentStage: "Production runtime",
    year: "2026",
  },
  {
    id: "ontop",
    title: "OnTop",
    shortTitle: "Student Mental Wellbeing Companion",
    category: "prototype",
    categoryLabel: "Prototypes",
    domain: "Student Health",
    statusText: "Concept",
    problemStatement:
      "Burnout, exam pressure, and placement anxiety frequently go unaddressed among engineering cohorts due to privacy stigma.",
    solutionOverview:
      "A private, local-first stress companion providing confidential sentiment evaluation, anonymous peer support circles, and context-aware workload scheduling without storing personal identifying records.",
    architectureStack: ["React Native", "Local-First Storage", "Privacy-Preserving NLP", "Client-Side Encryption"],
    lookingFor: ["React Native", "Local-First / SQLite", "Privacy Engineering"],
    currentStage: "Conceptual ethics review & schema modeling",
    year: "2026",
  },
  {
    id: "project-atlas",
    title: "Project Atlas",
    shortTitle: "Curriculum RAG & Engineering Assistant",
    category: "planned",
    categoryLabel: "Planned",
    domain: "Applied AI / EdTech",
    statusText: "Planned",
    problemStatement:
      "Students struggle to synthesize dense semester engineering syllabi, past university exams, and technical research papers into structured prerequisites.",
    solutionOverview:
      "A Retrieval-Augmented Generation (RAG) assistant fine-tuned on VTU computer science syllabi to generate prerequisite dependency graphs and technical query breakdowns.",
    architectureStack: ["Flutter", "Dart", "Vector Embeddings", "FastAPI", "Firebase"],
    lookingFor: ["Python / FastAPI", "Vector Embeddings & RAG", "Flutter Frontend"],
    currentStage: "Knowledge base indexing & pipeline design",
    year: "2026",
  },
  {
    id: "campusconnect",
    title: "CampusConnect",
    shortTitle: "Inter-College Hackathon Discovery PWA",
    category: "planned",
    categoryLabel: "Planned",
    domain: "Community Platform",
    statusText: "Planned",
    problemStatement:
      "Regional engineering students often lack visibility into technical symposia, hackathons, and team-building opportunities across neighboring institutes.",
    solutionOverview:
      "A centralized Progressive Web Application allowing student builders to discover regional technical competitions, verify past project credentials, and form interdisciplinary teams.",
    architectureStack: ["React", "Node.js", "PostgreSQL", "PWA Service Workers"],
    lookingFor: ["Full-Stack Web (React/Node)", "PWA Service Workers", "PostgreSQL"],
    currentStage: "Relational database modeling",
    year: "2026",
  },
];

export interface InitiativeItem {
  id: string;
  title: string;
  dates: string;
  role: string;
  summary: string;
  points: string[];
  metrics: string;
}

export const initiativesData: InitiativeItem[] = [
  {
    id: "hackora",
    title: "Innovation Fest 2026 & HACKORA",
    dates: "21–22 September 2026",
    role: "National 24-Hour Hackathon",
    summary:
      "A 24-hour national engineering competition convening 65 verified student teams to solve regional and industrial challenges across AI, IoT, and cybersecurity.",
    points: [
      "Rigorous technical checkpoint evaluations conducted by industry engineers.",
      "₹45,000 merit capital prize pool distributed across competitive technical tracks.",
      "Track specializations spanning AI/ML, Clean Energy, AgriTech, and Critical Systems.",
    ],
    metrics: "65 Teams • ₹45,000 Pool • 24 Hours",
  },
  {
    id: "yuva",
    title: "YUVA Entrepreneurship Workshop",
    dates: "25 August 2026",
    role: "Foundational Bootcamp with Team KrishiKalpa",
    summary:
      "An activity-driven problem validation and customer discovery bootcamp for 54 final-year engineering scholars transitioning from code to business logic.",
    points: [
      "Direct guidance on unit economics, problem-solution fit, and pitch deck construction.",
      "12 student cohorts prepared and evaluated through live seed-pitch roleplays.",
      "Co-curated in direct technical collaboration with Team KrishiKalpa.",
    ],
    metrics: "54 Engineers • 12 Cohorts • Team KrishiKalpa",
  },
  {
    id: "krishikalpa",
    title: "KrishiKalpa Startup & Networking Initiative",
    dates: "31 October 2026",
    role: "Industry Immersion & Recruitment",
    summary:
      "A bilateral bridge offering student developers direct interface with working founders, startup pitch evaluations, and verified talent pipelines.",
    points: [
      "Field analysis of production hardware constraints in rural and semi-urban deployments.",
      "Fast-track internship sourcing for high-performing Orbite Labs developers.",
      "Sustained incubation alignment between collegiate engineering and regional enterprise.",
    ],
    metrics: "Direct Hiring • Startup Clinics • Campus Node",
  },
];

export interface PartnershipTrack {
  tierNumber: string;
  name: string;
  description: string;
  deliverable: string;
}

export const partnershipTracks: PartnershipTrack[] = [
  {
    tierNumber: "01",
    name: "Title Partner",
    description: "Headline naming rights across flagship competitions including HACKORA 2026.",
    deliverable: "Opening keynote, permanent jury seat, and priority talent dossier access.",
  },
  {
    tierNumber: "02",
    name: "Event Partner",
    description: "Co-hosting individual competitive tracks (AI/ML, IoT, or Infrastructure).",
    deliverable: "Track problem statement curation, dedicated stage demo, and participant touchpoint.",
  },
  {
    tierNumber: "03",
    name: "Learning Partner",
    description: "Integrating industrial developer tools, SDKs, and methodologies into student curriculum.",
    deliverable: "Bespoke technical masterclass, co-badged student credentials, and telemetry feedback.",
  },
  {
    tierNumber: "04",
    name: "Talent Partner",
    description: "Direct recruitment pipeline for pre-screened student software and hardware engineers.",
    deliverable: "Pre-screened portfolio audits, campus interview days, and sponsored capstone projects.",
  },
  {
    tierNumber: "05",
    name: "Community Partner",
    description: "Cross-pollination across regional developer clubs, incubators, and student chapters.",
    deliverable: "Joint hackathon delegations, collaborative webinars, and reciprocal promotion.",
  },
];

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
}

export const leadershipData: TeamMember[] = [
  {
    name: "Syed Mohammed Hasan",
    role: "Founder & Lead Developer",
    focus: "Full-Stack Architecture & Ecosystem Strategy",
    bio: "Undergraduate systems engineer leading overall technical vision for AutoAttend, core web architecture, and institutional partnerships.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Syed Irfan Ahmed",
    role: "Lead • Backend Systems & Architecture",
    focus: "Distributed APIs, Relational Consistency & Cloud",
    bio: "Architects high-concurrency backend services, PostgreSQL schemas, and serverless infrastructure across student platforms.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Syed Shoeib Akther",
    role: "Lead • Frontend Engineering & Stage",
    focus: "Client Performance, Interaction & Event Logistics",
    bio: "Focuses on minimal, low-latency web interfaces and stage production direction for HACKORA and student workshops.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    name: "Tauz Ul Imam",
    role: "Lead • Embedded Systems & Hardware",
    focus: "Microcontrollers, Sensor Calibration & IoT Safety",
    bio: "Circuit designer and firmware engineer. Primary hardware architect behind the KSCST-approved smart LPG safety platform.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];
