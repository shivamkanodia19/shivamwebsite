export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  approach: string;
  results: string;
  technologies: string[];
  role: string;
  duration: string;
  highlights?: string[];
  isCurrent?: boolean;
  github?: string;
  liveUrl?: string;
  blogPost?: string;
  devpost?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "clinicalhours",
    title: "ClinicalHours",
    tagline: "A live marketplace connecting pre-med students to clinical volunteering — 170+ users, 18K+ hospital profiles, zero marketing spend.",
    description: "A two-sided marketplace connecting pre-med students with clinical volunteer opportunities at hospitals nationwide.",
    problem: "Pre-med students rely on scattered forums or word of mouth to find clinical volunteering opportunities, making it hard to compare options and verify legitimacy.",
    approach: "Co-founded and led end-to-end product strategy from ideation to live platform. Built a centralized marketplace with AI-powered features, user onboarding, and a searchable database of hospital profiles across the country.",
    results: "Grown to 170+ organic users and 18,000+ hospital profiles with zero paid acquisition. Pitched at the McFerrin Center for Entrepreneurship Good Bull Pitch Competition — placed 3rd, winning cash prizes.",
    technologies: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "AI"],
    role: "Co-Founder & CTO",
    duration: "Dec 2025 – Present",
    isCurrent: true,
    featured: true,
    liveUrl: "https://clinicalhours.org",
    highlights: [
      "🏆 3rd Place — McFerrin Center Good Bull Pitch Competition",
      "170+ organic users and 18,000+ hospital profiles with zero paid acquisition",
      "Led end-to-end product strategy from ideation to live platform",
      "AI-powered features for hospital discovery and matching"
    ]
  },
  {
    id: "system-dynamics-research",
    title: "System Dynamics Research",
    tagline: "ML pipelines + Vensim models to simulate the Water-Energy-Food nexus — presenting at TAMU Student Research Week.",
    description: "Undergraduate research building ML pipelines and system dynamics models to predict energy and water efficiency metrics.",
    problem: "The interactions between water, energy, and food systems are complex and poorly understood at scale, making it hard to predict resource efficiency and sustainability outcomes.",
    approach: "Building ML pipelines with XGBoost and Random Forest + SHAP explainability to model large datasets and predict energy/water efficiency metrics. Developing system dynamics models in Vensim using stock-and-flow diagrams and feedback loops to simulate the Water-Energy-Food (WEF) nexus framework.",
    results: "Presenting findings at TAMU Student Research Week.",
    technologies: ["Python", "XGBoost", "Random Forest", "SHAP", "Vensim", "Scikit-learn"],
    role: "Undergraduate Researcher",
    duration: "Jan 2026 – Present",
    isCurrent: true,
    highlights: [
      "Presenting at TAMU Student Research Week",
      "XGBoost and Random Forest pipelines with SHAP explainability",
      "Vensim stock-and-flow models simulating the Water-Energy-Food nexus",
      "Predicting energy and water efficiency metrics from large datasets"
    ]
  },
  {
    id: "finseek",
    title: "FinSeek",
    tagline: "Ensemble ML fraud detector — 95%+ precision on 200K+ transactions, built in 24 hours at TAMUHack.",
    description: "A fraud detection platform using a 3-model ensemble machine learning approach, built for TAMUHack's Capital One challenge.",
    problem: "Financial fraud detection systems struggle with high false positive rates, causing unnecessary friction for legitimate transactions while missing sophisticated fraudulent patterns.",
    approach: "Built a 3-model ensemble ML system (Logistic Regression + Isolation Forest + LightGBM) achieving 95%+ precision via 2-of-3 voting consensus. Developed a full-stack application with FastAPI backend, Next.js/TypeScript frontend with real-time risk dashboards, and Docker containerization.",
    results: "Trained on 200K+ PaySim transactions and tuned ensemble thresholds to reduce false positives by 99%.",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "LightGBM", "Scikit-learn", "Docker"],
    role: "Developer",
    duration: "January 2026",
    highlights: [
      "Built for TAMUHack's Capital One challenge",
      "95%+ precision via 2-of-3 voting consensus across 3 models",
      "Reduced false positives by 99% through ensemble threshold tuning",
      "Trained on 200K+ PaySim transactional dataset"
    ]
  },
  {
    id: "celvio",
    title: "Celvio",
    tagline: "Medical device + business plan for a wearable NMES device — $45 COGS target, $382M market opportunity.",
    description: "A wearable Neuromuscular Electrical Stimulation (NMES) device developed for the MedXplore competition, combining hardware engineering with a full business plan.",
    problem: "Existing NMES devices are expensive and inaccessible to many patients who could benefit from neuromuscular electrical stimulation therapy for rehabilitation and muscle recovery.",
    approach: "Led product strategy and business plan for the device. Developed PCB layout, pulse generator circuitry, and power management system. Conducted market analysis of the $382M NMES segment and achieved a $45 COGS target through detailed cost modeling.",
    results: "Delivered a full business plan and working hardware prototype for the MedXplore Competition, demonstrating viable market positioning in the $382M NMES segment.",
    technologies: ["PCB Design", "Arduino", "Circuit Design", "Fusion360", "Business Analytics"],
    role: "Project Lead",
    duration: "February 2026",
    highlights: [
      "MedXplore Medical Device Competition entry",
      "Achieved $45 COGS target through detailed cost optimization",
      "Analyzed $382M NMES market segment for competitive positioning",
      "Designed PCB layout, pulse generator circuitry, and power management"
    ]
  },
  {
    id: "persona",
    title: "Persona",
    tagline: "2nd place at Product@TAMU's 24-hour Ideathon — designed and pitched a digital identity platform.",
    description: "A digital identity platform with cross-platform reputation tracking, developed during Product@TAMU's 24-hour Ideathon.",
    problem: "Online harassment persists across platforms because bad actors can simply create new accounts. There's no unified system to track digital reputation.",
    approach: "Led a 24-hour cross-functional team to design, prototype, and pitch the platform. Built an interactive Figma prototype and delivered a complete pitch deck and video pitch.",
    results: "Earned 2nd place at Product@TAMU Ideathon. Demonstrated a viable solution for cross-platform reputation management with a working prototype.",
    technologies: ["Figma", "Product Design", "UI/UX"],
    role: "Team Lead",
    duration: "November 2025",
    highlights: [
      "🏆 2nd Place — Product@TAMU 24-hour Ideathon",
      "Led cross-functional team through full design-to-pitch cycle in 24 hours",
      "Created interactive Figma prototype, pitch deck, and promotional video"
    ],
    devpost: "https://devpost.com/software/ideathon-wgsdzp#updates"
  },
  {
    id: "ai-cybersecurity-research",
    title: "AI Cybersecurity Research",
    tagline: "Undergraduate research on LLMs in malware detection under Dr. Jeff Huang at Texas A&M.",
    description: "Ongoing undergraduate research under Dr. Jeff Huang exploring the intersection of AI and cybersecurity, with a focus on LLMs and machine learning in malware detection pipelines.",
    problem: "Traditional malware detection methods struggle to keep pace with rapidly evolving threats, creating a need for autonomous vulnerability discovery and scalable security automation.",
    approach: "Conducting cybersecurity research and publishing technical findings and in-depth case studies on malware detection pipelines and secure software architectures. Researching LLM and ML applications for autonomous vulnerability discovery and threat response.",
    results: "Consistently publishing technical findings to a broader audience. Producing in-depth case studies on malware detection pipelines and secure software architectures.",
    technologies: ["Python", "Machine Learning", "LLMs", "Cybersecurity"],
    role: "Undergraduate Researcher",
    duration: "Jan 2026 – Present",
    highlights: [
      "Conducting research under Dr. Jeff Huang at Texas A&M",
      "Publishing technical findings on cybersecurity research",
      "Researching LLMs for autonomous vulnerability discovery",
      "Studying malware detection pipelines and secure software architectures"
    ],
    blogPost: "https://medium.com/@shivamkanodia77"
  },
  {
    id: "ignite-design-challenge",
    title: "Ignite Design Challenge",
    tagline: "Formula SAE chassis stability solution — Texas A&M's premier first-year engineering competition.",
    description: "Competed in Texas A&M's premier first-year engineering design competition, developing a CAD solution for a chassis stability problem in a simulated Formula SAE racing scenario.",
    problem: "A simulated Formula SAE racing vehicle had chassis stability issues that needed to be solved through engineering design and CAD modeling under competitive constraints.",
    approach: "Developed a CAD solution to address the chassis stability problem. Led technical documentation and final presentation delivery, translating complex engineering designs into clear, professional deliverables for judges and industry sponsors.",
    results: "Delivered professional-grade technical documentation and presentations to judges and industry sponsors.",
    technologies: ["Fusion360", "CAD", "Technical Writing", "Engineering Design"],
    role: "Technical Writer & Designer",
    duration: "November 2025",
    highlights: [
      "Competed in Texas A&M's premier first-year engineering design competition",
      "Led technical documentation and final presentation delivery",
      "Translated complex engineering designs into professional deliverables"
    ]
  },
  {
    id: "chase-redesign",
    title: "JPMorgan Chase App Redesign",
    tagline: "UI/UX overhaul for better banking — 3rd place at Product@TAMU.",
    description: "A semester-long project redesigning the Chase mobile app's user interface and experience, including an AI-powered chatbot feature.",
    problem: "The existing Chase app interface had usability issues with color scheme, transaction navigation, and lacked intelligent assistance features.",
    approach: "Conducted user research and competitive analysis. Designed comprehensive UI improvements in Figma focusing on color accessibility, streamlined navigation, and integrated an AI chatbot using Groq API with Supabase backend.",
    results: "Placed third in the Product@TAMU competition. Delivered a comprehensive slide deck and presentation demonstrating measurable improvements in user flow and accessibility.",
    technologies: ["Figma", "Business Analytics", "Canva", "UI/UX", "Groq API", "Supabase"],
    role: "Product Developer",
    duration: "Aug 2025 – Nov 2025",
    highlights: [
      "🏆 3rd Place — Product@TAMU Competition",
      "Redesigned UI/UX with a focus on color accessibility",
      "Integrated AI chatbot using Groq API"
    ]
  },
  {
    id: "study-buddy",
    title: "Study Buddy",
    tagline: "AI-powered personalized study assistant built at Google Labs Make-A-Thon.",
    description: "An AI-powered study app that generates personalized study guides and practice tests from uploaded course materials, built during the Google Labs Make-A-Thon.",
    problem: "Students spend excessive time creating study materials manually, often missing key concepts or creating ineffective practice questions.",
    approach: "Developed within a three-person team during the Google Labs Make-A-Thon using Google Opal AI. Applied prompt engineering techniques to fine-tune AI outputs from uploaded course materials.",
    results: "Successfully created instant study guide generation with high accuracy. Produces personalized practice tests that adapt to users' academic needs.",
    technologies: ["Python", "Google Labs Opal AI", "Prompt Engineering"],
    role: "Developer",
    duration: "November 2025",
    highlights: [
      "Built during Google Labs Make-A-Thon",
      "Applied prompt engineering for fine-tuned AI outputs",
      "Generates personalized study guides and practice tests"
    ]
  },
  {
    id: "blackjack-simulator",
    title: "Blackjack Simulator",
    tagline: "Learn optimal strategy through practice — deployed on Vercel.",
    description: "A single-page blackjack application with dedicated practice mode, training mode, and realistic casino-style gameplay.",
    problem: "Learning optimal blackjack strategy is difficult without hands-on practice in a risk-free environment with real-time feedback.",
    approach: "Designed the complete UI in Figma before implementation. Built the frontend with TypeScript and React, implementing basic-strategy guidance, a test-styled training mode, and accurate bankroll accounting.",
    results: "Deployed a fully functional simulator on Vercel. Players can practice with real-time strategy hints, test their knowledge, and track performance with accurate profit/loss accounting.",
    technologies: ["TypeScript", "React", "Figma", "Vercel"],
    role: "Solo Developer",
    duration: "Jul 2025 – Aug 2025",
    liveUrl: "https://v0-blackjack-strategy-app.vercel.app",
    github: "https://github.com/shivamkanodia19",
    highlights: [
      "Designed complete UI in Figma prior to development",
      "Integrated basic-strategy guidance for dedicated practice mode",
      "Deployed on Vercel for seamless public access"
    ]
  }
];

export const getFeaturedProjects = () => projects.slice(0, 3);

export const getCurrentProjects = () => projects.filter(project => project.isCurrent);

export const getProjectById = (id: string) => projects.find(p => p.id === id);
