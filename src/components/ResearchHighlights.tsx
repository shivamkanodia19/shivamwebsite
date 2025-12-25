import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Brain, Code, FileSearch } from 'lucide-react';

const researchAreas = [
  {
    icon: Shield,
    title: 'Malware Detection',
    description: 'Analyzing software architectures for automated malware detection and program analysis.',
  },
  {
    icon: Brain,
    title: 'LLM Security',
    description: 'Researching large language models and ML pipelines for autonomous vulnerability discovery.',
  },
  {
    icon: Code,
    title: 'Program Analysis',
    description: 'Building tools for static and dynamic analysis of software systems.',
  },
  {
    icon: FileSearch,
    title: 'Vulnerability Research',
    description: 'Discovering and documenting security flaws through rigorous testing methodologies.',
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
              Research Focus
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exploring the frontier of AI-powered cybersecurity solutions
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
                  <p className="text-sm text-muted-foreground">{area.description}</p>
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
