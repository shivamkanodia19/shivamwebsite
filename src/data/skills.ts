export interface SkillCategory {
  title: string;
  skills: string[];
}

export const technicalSkills: SkillCategory = {
  title: "Technical",
  skills: ["Python", "TypeScript", "React", "Supabase", "SQL", "C++", "Arduino", "HTML/CSS"]
};

export const toolSkills: SkillCategory = {
  title: "Tools",
  skills: ["GitHub", "Figma", "Vercel", "Google Labs", "Lovable", "Fusion360", "Canva"]
};

export const softSkills: SkillCategory = {
  title: "Soft Skills",
  skills: ["Professional Communication", "Phone Etiquette", "Technical Writing", "Leadership", "Teamwork"]
};

export const allSkillCategories = [technicalSkills, toolSkills, softSkills];

export const coreSkills = [
  "AI & Cybersecurity Research",
  "Full-Stack Development",
  "Product Design & UI/UX",
  "Technical Writing"
];
