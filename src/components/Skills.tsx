import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Cpu, Database, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategories = [
  {
    title: "Technical",
    icon: Code2,
    skills: ["Python", "TypeScript/React", "Supabase", "SQL", "C++", "HTML/CSS"]
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: ["Github", "Figma", "Fusion360", "Canva", "Arduino"]
  },
  {
    title: "Soft Skills",
    icon: Database,
    skills: ["Professional Communication", "Phone Etiquette", "Technical Writing", "Leadership", "Teamwork", "Problem Solving"]
  }
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section id="skills" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li 
                        key={skillIndex} 
                        className="text-muted-foreground flex items-center"
                      >
                        <span className="w-2 h-2 bg-accent rounded-full mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
