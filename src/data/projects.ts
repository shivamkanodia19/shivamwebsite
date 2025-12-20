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
  github?: string;
  liveUrl?: string;
  blogPost?: string;
}

export const projects: Project[] = [
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
    id: "chase-redesign",
    title: "JPMorgan Chase App Redesign",
    tagline: "UI/UX overhaul for better banking",
    description: "A semester-long project redesigning the Chase mobile app's user interface and experience, including an AI-powered chatbot feature.",
    problem: "The existing Chase app interface had usability issues with color scheme, transaction navigation, and lacked intelligent assistance features.",
    approach: "Conducted user research and competitive analysis. Designed comprehensive UI improvements in Figma focusing on color accessibility, streamlined navigation, and integrated an AI chatbot using Groq API with Supabase backend.",
    results: "Placed third in the Product@TAMU competition. Delivered a comprehensive slide deck and presentation demonstrating measurable improvements in user flow and accessibility.",
    technologies: ["Figma", "Business Analytics", "Canva", "UI/UX", "Groq API", "Supabase"],
    role: "Product Designer",
    duration: "Aug 2025 – Nov 2025"
  },
  {
    id: "study-buddy",
    title: "Study Buddy",
    tagline: "AI-powered personalized study assistant",
    description: "An AI-powered study app that generates personalized study guides and practice tests from uploaded course materials.",
    problem: "Students spend excessive time creating study materials manually, often missing key concepts or creating ineffective practice questions.",
    approach: "Developed with Google Labs Opal AI during the Google Labs Make-A-Thon. Applied prompt engineering techniques to fine-tune AI outputs, ensuring accurate and tailored study materials from uploaded course content.",
    results: "Successfully created instant study guide generation with high accuracy. The app produces personalized practice tests that adapt to users' academic needs.",
    technologies: ["Python", "Google Labs Opal AI", "Prompt Engineering"],
    role: "Team Developer",
    duration: "November 2025"
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
    github: "https://github.com/shivamkanodia19"
  },
  {
    id: "persona",
    title: "Persona",
    tagline: "Digital identity platform combating online harassment",
    description: "A digital identity platform with cross-platform reputation tracking, developed during Product@TAMU's 24-hour ideathon.",
    problem: "Online harassment persists across platforms because bad actors can simply create new accounts. There's no unified system to track digital reputation.",
    approach: "Led development of a digital passport concept with user search functionality. Created interactive Figma prototypes and collaborated with a multidisciplinary team on pitch deck and promotional materials.",
    results: "Earned 2nd place at Product@TAMU Ideathon. Demonstrated viable solution for cross-platform reputation management with working prototype.",
    technologies: ["Figma", "Product Design", "UI/UX"],
    role: "Persona Developer",
    duration: "November 2025"
  }
];

export const getFeaturedProjects = () => projects.slice(0, 3);

export const getProjectById = (id: string) => projects.find(p => p.id === id);
