import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Brain, Droplets, Zap } from 'lucide-react';

const researchAreas = [
  {
    icon: Shield,
    title: 'Malware Detection',
    description: 'Researching LLM and ML pipelines for autonomous malware detection and secure software architectures.',
    lab: 'AI Cybersecurity Lab · Dr. Jeff Huang',
  },
  {
    icon: Brain,
    title: 'LLM Security',
    description: 'Exploring large language models for autonomous vulnerability discovery and scalable threat response.',
    lab: 'AI Cybersecurity Lab · Dr. Jeff Huang',
  },
  {
    icon: Droplets,
    title: 'Water-Energy-Food Nexus',
    description: 'Building Vensim system dynamics models with stock-and-flow diagrams to simulate WEF nexus interactions.',
    lab: 'System Dynamics Lab · TAMU',
  },
  {
    icon: Zap,
    title: 'ML for Efficiency Prediction',
    description: 'XGBoost and Random Forest pipelines with SHAP explainability to model energy and water efficiency metrics.',
    lab: 'System Dynamics Lab · TAMU',
  },
];

const ResearchHighlights = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-section-bg">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Research
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Two concurrent undergraduate research roles at Texas A&M — AI cybersecurity and system dynamics
            </p>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mt-4" />
          </div>

          {/* Research Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {researchAreas.map((area, index) => (
              <Card
                key={area.title}
                className={`group hover:shadow-card-hover transition-all duration-500 border-border hover:border-primary/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-4 bg-primary/10 rounded-xl mb-4 group-hover:bg-primary/20 transition-colors">
                    <area.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{area.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{area.description}</p>
                  <p className="text-xs text-primary/70 font-mono">{area.lab}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchHighlights;
