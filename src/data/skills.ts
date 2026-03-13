export interface SkillCategory {
  title: string;
  skills: string[];
}

export const mlSkills: SkillCategory = {
  title: "ML & Modeling",
  skills: ["XGBoost", "LightGBM", "Random Forest", "LSTM", "SHAP", "Scikit-learn", "Vensim", "ARIMA/SARIMA"]
};

export const technicalSkills: SkillCategory = {
  title: "Languages & Stack",
  skills: ["Python", "C++", "SQL", "JavaScript/TypeScript", "Next.js", "React", "Supabase", "PostgreSQL"]
};

export const toolSkills: SkillCategory = {
  title: "Tools",
  skills: ["Git", "Docker", "Figma", "Arduino", "Fusion360"]
};

export const softSkills: SkillCategory = {
  title: "Soft Skills",
  skills: ["Technical Writing", "Leadership", "Teamwork", "Literature Review", "Problem Solving"]
};

export const allSkillCategories = [mlSkills, technicalSkills, toolSkills, softSkills];

export const coreSkills = [
  "ML Research & Modeling",
  "Full-Stack Development",
  "Product Strategy",
  "Technical Writing"
];
