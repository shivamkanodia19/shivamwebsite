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
}

export const projects: Project[] = [
  {
    id: "clinicalhours",
    title: "ClinicalHours",
    tagline: "Crowdsourced clinical volunteering platform for pre-med students",
    description: "A crowdsourced platform that helps pre-med students discover, track, and verify clinical volunteering opportunities in one centralized location.",
    problem: "Pre-med students often rely on scattered forums or word of mouth to find clinical volunteering opportunities, which makes it hard to compare options and verify legitimacy.",
    approach: "Building a centralized web platform where students can submit and verify opportunities, keep listings up to date, and surface trustworthy options with community input. Designing the technical architecture using TypeScript/React, integrating Mapbox, Resend, and Google APIs, with Cloudflare for DNS management, SSL security, and global content delivery.",
    results: "Managing the full product lifecycle with user interviews shaping onboarding and verification flows. Built databases to manage 6,000+ hospital data entries, user-generated reviews, and community Q&A.",
    technologies: ["TypeScript", "React", "Supabase", "Mapbox", "Resend", "Google APIs", "Cloudflare", "SQL"],
    role: "Co-Founder & CTO",
    duration: "Nov 2025 – Present",
    isCurrent: true,
    liveUrl: "https://clinicalhours.org",
    highlights: [
      "Managing the full product lifecycle from user interviews to feature prioritization",
      "Built databases to manage 6,000+ hospital data entries",
      "Integrated Cloudflare for DNS management, SSL security, and global CDN"
    ]
  },
  {
    id: "finseek",
    title: "FinSeek",
    tagline: "Ensemble ML fraud detection platform for TAMUHack",
    description: "A fraud detection platform using a 3-model ensemble machine learning approach, built for TAMUHack's Capital One challenge.",
    problem: "Financial fraud detection systems struggle with high false positive rates, causing unnecessary friction for legitimate transactions while missing sophisticated fraudulent patterns.",
    approach: "Engineered a 3-model ensemble ML system combining Logistic Regression and LightGBM, achieving 95%+ precision via 2-of-3 voting consensus. Developed a full-stack application with FastAPI backend serving REST APIs, Next.js/TypeScript frontend with real-time risk dashboards, and Docker containerization for production deployment.",
    results: "Optimized Logistic Regression coefficients with transaction-type weights using a 200k+ PaySim transactional dataset and tuned ensemble thresholds, reducing false positives by 99%.",
    technologies: ["Python", "FastAPI", "Next.js", "TypeScript", "LightGBM", "Docker", "Machine Learning"],
    role: "Developer",
    duration: "January 2026",
    highlights: [
      "Built for TAMUHack's Capital One challenge",
      "Achieved 95%+ precision via 2-of-3 voting consensus",
      "Reduced false positives by 99% through threshold tuning",
      "Trained on 200k+ PaySim transactional dataset"
    ]
  },
  {
    id: "celvio",
    title: "Celvio",
    tagline: "Wearable NMES medical device for muscle stimulation",
    description: "A wearable Neuromuscular Electrical Stimulation (NMES) device developed for the MedXplore competition, including PCB layout, pulse generator circuitry, and power management.",
    problem: "Existing NMES devices on the market are expensive and inaccessible to many patients who could benefit from neuromuscular electrical stimulation therapy for rehabilitation and muscle recovery.",
    approach: "Led development of the wearable NMES device including PCB layout design, pulse generator circuitry, and power management system for safe, medical-grade muscle stimulation. Developed a comprehensive business plan with market analysis and competitive positioning.",
    results: "Conducted market analysis of the $382M NMES segment, achieved competitive positioning, and developed a detailed cost breakdown achieving a $45 COGS target for the MedXplore competition entry.",
    technologies: ["PCB Design", "Arduino", "Circuit Design", "Business Analytics"],
    role: "Project Manager",
    duration: "February 2026",
    highlights: [
      "Developed for MedXplore medical device competition",
      "Designed PCB layout and pulse generator circuitry",
      "Achieved $45 COGS target through detailed cost optimization",
      "Analyzed $382M NMES market segment for competitive positioning"
    ]
  },
  {
    id: "ai-cybersecurity-research",
    title: "AI Cybersecurity Research",
    tagline: "Undergraduate research on LLMs in malware detection",
    description: "Ongoing undergraduate research under Dr. Jeff Huang exploring the intersection of AI and cybersecurity, with a focus on LLMs and machine learning in malware detection pipelines.",
    problem: "Traditional malware detection methods struggle to keep pace with rapidly evolving threats, and there is a growing need for autonomous vulnerability discovery and scalable security automation.",
    approach: "Analyzing real-world codebases and open-source cybersecurity tools on GitHub to produce in-depth case studies documenting malware detection pipelines and secure software architectures. Researching large language models and machine learning usage to enhance autonomous vulnerability discovery and threat response.",
    results: "Consistently publishing technical blogs with new findings to a broader audience. Producing in-depth case studies on malware detection pipelines and secure software architectures.",
    technologies: ["Python", "Machine Learning", "LLMs", "Cybersecurity", "GitHub"],
    role: "Undergraduate Researcher",
    duration: "Jun 2025 – Present",
    isCurrent: true,
    highlights: [
      "Conducting research under Dr. Jeff Huang at Texas A&M",
      "Publishing technical blogs on cybersecurity findings",
      "Analyzing open-source cybersecurity tools and real-world codebases",
      "Researching LLMs for autonomous vulnerability discovery"
    ],
    blogPost: "https://medium.com/@shivamkanodia77"
  },
  {
    id: "ignite-design-challenge",
    title: "Ignite Design Challenge",
    tagline: "Formula SAE chassis stability solution",
    description: "Competed in Texas A&M's premier first-year engineering design competition, developing a CAD solution for a chassis stability problem in a simulated Formula SAE racing scenario.",
    problem: "A simulated Formula SAE racing vehicle had chassis stability issues that needed to be solved through engineering design and CAD modeling under competitive constraints.",
    approach: "Developed a CAD solution to address the chassis stability problem. Led technical documentation and final presentation delivery, translating complex engineering designs and analysis into clear, professional deliverables for judges and industry sponsors.",
    results: "Delivered professional-grade technical documentation and presentations to judges and industry sponsors at Texas A&M's premier first-year engineering design competition.",
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
    id: "persona",
    title: "Persona",
    tagline: "Digital identity platform combating online harassment",
    description: "A digital identity platform with cross-platform reputation tracking, developed during Product@TAMU's 24-hour Ideathon.",
    problem: "Online harassment persists across platforms because bad actors can simply create new accounts. There's no unified system to track digital reputation.",
    approach: "Led the development and design of Persona, building an interactive prototype using Figma. Collaborated with a multidisciplinary team to ensure seamless alignment on project deliverables, including pitch deck and promotional video.",
    results: "Earned 2nd place at Product@TAMU Ideathon. Demonstrated a viable solution for cross-platform reputation management with a working prototype.",
    technologies: ["Figma", "Product Design", "UI/UX"],
    role: "Frontend Developer",
    duration: "November 2025",
    highlights: [
      "🏆 2nd Place — Product@TAMU 24-hour Ideathon",
      "Led development and design of the platform",
      "Created interactive Figma prototype, pitch deck, and promotional video"
    ],
    devpost: "https://devpost.com/software/ideathon-wgsdzp#updates"
  },
  {
    id: "chase-redesign",
    title: "JPMorgan Chase App Redesign",
    tagline: "UI/UX overhaul for better banking",
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
    tagline: "AI-powered personalized study assistant",
    description: "An AI-powered study app that generates personalized study guides and practice tests from uploaded course materials, built during the Google Labs Make-A-Thon.",
    problem: "Students spend excessive time creating study materials manually, often missing key concepts or creating ineffective practice questions.",
    approach: "Developed within a three-person team during the Google Labs Make-A-Thon using Google Opal AI. Applied prompt engineering techniques to fine-tune AI outputs from uploaded course materials, ensuring accurate and tailored study materials.",
    results: "Successfully created instant study guide generation with high accuracy. The app produces personalized practice tests that adapt to users' academic needs.",
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
    id: "dateify",
    title: "Dateify",
    tagline: "AI-powered event planning for groups",
    description: "An AI-powered mobile app designed to streamline event planning using user input for preferred activities and food to recommend local locations.",
    problem: "Planning group events is challenging—coordinating preferences, finding venues everyone agrees on, and making decisions efficiently often leads to endless back-and-forth messages.",
    approach: "Built a swipe-based interface that gamifies group decision-making. Integrated Supabase for secure authentication and real-time data synchronization. Leveraged AI to analyze user preferences and recommend personalized venue options.",
    results: "Created a novel approach to group coordination that reduces planning friction. The swipe-based voting system enables quick consensus-building while the AI recommendations ensure quality venue suggestions.",
    technologies: ["Lovable", "GitHub", "Supabase", "SQL"],
    role: "Lead Developer",
    duration: "Nov 2025 – Present",
    github: "https://github.com/shivamkanodia19"
  },
  {
    id: "blackjack-simulator",
    title: "Blackjack Simulator",
    tagline: "Learn optimal strategy through practice",
    description: "A single-page blackjack application with dedicated practice mode, training mode, and realistic casino-style gameplay.",
    problem: "Learning optimal blackjack strategy is difficult without hands-on practice in a risk-free environment with real-time feedback.",
    approach: "Designed the complete UI in Figma before implementation. Built the frontend with TypeScript and React, implementing basic-strategy guidance, a test-styled training mode, and accurate bankroll accounting.",
    results: "Deployed a fully functional simulator on Vercel. Players can practice with real-time strategy hints, test their knowledge, and track their performance with accurate profit/loss accounting.",
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
