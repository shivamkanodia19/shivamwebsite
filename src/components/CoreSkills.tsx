import { Shield, Palette, PenTool } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skills = [
  {
    icon: Shield,
    title: "AI & Cybersecurity Research",
    description: "Exploring LLMs and ML pipelines for autonomous vulnerability discovery and threat response."
  },
  {
    icon: Palette,
    title: "Product Design & UI/UX",
    description: "Creating user-centered designs in Figma with a focus on accessibility and usability."
  },
  {
    icon: PenTool,
    title: "Technical Writing",
    description: "Publishing weekly technical blogs on cybersecurity and emerging technology trends."
  }
];

const CoreSkills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            At a Glance
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <Card 
                key={index} 
                className={`text-center shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 group-hover:scale-110 transition-transform">
                    <skill.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{skill.title}</h3>
                  <p className="text-sm text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreSkills;
