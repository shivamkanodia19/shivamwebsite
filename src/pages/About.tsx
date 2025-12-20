import { Code, Wrench, Users, GraduationCap } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { allSkillCategories } from "@/data/skills";

const skillIcons: Record<string, React.ReactNode> = {
  Technical: <Code className="w-5 h-5" />,
  Tools: <Wrench className="w-5 h-5" />,
  "Soft Skills": <Users className="w-5 h-5" />,
};

const organizations = [
  "Freshmen Reaching Excellence in Engineering (FRIE)",
  "IEEE",
  "Aggie Data Science Club",
  "Cybersecurity Club",
  "Product Management Organization",
  "Aggie Innovators"
];

const About = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Engineering solutions through rigorous design, experimentation, and data-driven iteration.
            </p>
          </div>

          {/* Bio */}
          <Card className="mb-12">
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a <span className="text-foreground font-medium">Computer Engineering Honors</span> student 
                at <span className="text-foreground font-medium">Texas A&M University</span>, passionate 
                about solving complex problems at the intersection of software and security.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Currently conducting research in AI Cybersecurity under Dr. Jeff Huang, where I analyze 
                cutting-edge software architectures for malware detection and explore how large language 
                models can enhance autonomous vulnerability discovery and threat response.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I publish one technical blog per week to share research findings with a broader audience, 
                covering topics from program analysis to scalable security automation.
              </p>
            </CardContent>
          </Card>

          {/* Education */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">Texas A&M University</h3>
                <p className="text-muted-foreground">Computer Engineering — Honors College</p>
                <p className="text-sm text-muted-foreground">Aug 2025 – May 2029 | GPA: 4.0</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Organizations</h4>
                <div className="flex flex-wrap gap-2">
                  {organizations.map((org, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {org}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Skills</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {allSkillCategories.map((category, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {skillIcons[category.title]}
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Experience Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Research Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-l-2 border-primary pl-4">
                <h3 className="font-semibold text-foreground">AI Cybersecurity Research</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Undergraduate Researcher | June 2025 – Present
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Conducting research under Dr. Jeff Huang on diverse cybersecurity topics</li>
                  <li>• Publishing one technical blog per week to share findings</li>
                  <li>• Analyzing software architectures for malware detection and program analysis</li>
                  <li>• Researching LLMs and ML pipelines for autonomous vulnerability discovery</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default About;
