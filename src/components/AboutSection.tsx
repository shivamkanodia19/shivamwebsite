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
                I'm a <span className="text-foreground font-semibold">Computer Engineering (Honors)</span> student
                at Texas A&M (Class of 2029, GPA 3.7) with minors in{' '}
                <span className="text-primary font-medium">AI in Business</span> and{' '}
                <span className="text-primary font-medium">Statistics</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I co-founded <span className="text-foreground font-semibold">ClinicalHours</span>, a live marketplace connecting pre-med students with clinical volunteer opportunities — now at <span className="text-foreground font-medium">170+ users</span> and <span className="text-foreground font-medium">18,000+ hospital profiles</span> with zero paid acquisition.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I also do undergraduate research in system dynamics and AI cybersecurity. I build things that work.
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
                    <p className="text-sm text-muted-foreground">B.S. Computer Engineering (Honors)</p>
                    <p className="text-xs text-muted-foreground">Minors: AI in Business · Statistics</p>
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
                    <h3 className="font-semibold text-foreground">System Dynamics Research</h3>
                    <p className="text-sm text-muted-foreground">Building ML pipelines with XGBoost and Random Forest + SHAP explainability to predict energy/water efficiency metrics. Developing Vensim models simulating the Water-Energy-Food nexus.</p>
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
                    <h3 className="font-semibold text-foreground">AI Cybersecurity Research</h3>
                    <p className="text-sm text-muted-foreground">Researching LLM and ML applications in malware detection under Dr. Jeff Huang. Publishing technical findings on autonomous vulnerability discovery and secure software architectures.</p>
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