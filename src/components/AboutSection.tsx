import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, FlaskConical, BookOpen } from 'lucide-react';
const AboutSection = () => {
  const {
    ref,
    isVisible
  } = useScrollAnimation();
  return <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={ref} className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {/* Bio Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Bio Text */}
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a <span className="text-foreground font-semibold">Computer Engineering Honors</span> student 
                at Texas A&M University exploring the intersection of{' '}
                <span className="text-primary font-medium">artificial intelligence</span> and{' '}
                <span className="text-primary font-medium">cybersecurity</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently conducting research under Dr. Jeff Huang, I focus on building safer, 
                more resilient systems through rigorous experimentation and data-driven iteration.
                I share my findings through weekly technical blog posts.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me powerlifting or exploring new research papers.
              </p>
            </div>

            {/* Right: Quick Stats */}
            <div className="space-y-6">
              {/* Education Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Texas A&M University</h3>
                    <p className="text-sm text-muted-foreground">Computer Engineering — Engineering Honors</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">Class of 2029</Badge>
                      <Badge className="bg-primary text-primary-foreground">3.7 GPA</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-accent/20 rounded-lg">
                    <FlaskConical className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">AI Cybersecurity Research</h3>
                    <p className="text-sm text-muted-foreground">Researching and testing AI‑based cybersecurity defenses to make systems safer and more resilient. I publish technical blogs that explain complex topics for practitioners.</p>
                    <p className="text-xs text-muted-foreground mt-1">
                  </p>
                  </div>
                </div>
              </div>

              {/* Blog Card */}
              <div className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Personal Builds</h3>
                    <p className="text-sm text-muted-foreground">Weekend projects, hackathons, and experimental tools where I explore new ideas in AI, security, and developer experience. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;