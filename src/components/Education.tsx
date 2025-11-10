import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Award } from "lucide-react";

const Education = () => {
  return (
    <section id="education" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Education
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-accent" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-2">Texas A&M University</CardTitle>
                  <p className="text-lg text-muted-foreground mb-1">
                    Bachelor of Science in Engineering
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expected Graduation: 2026
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">Engineering Honors Program</span>
                </div>
                <div className="pl-7">
                  <p className="text-muted-foreground">
                    Selected for the competitive Engineering Honors Program, focusing on 
                    advanced coursework, research opportunities, and leadership development 
                    in engineering disciplines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Relevant Coursework</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Engineering Mechanics</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Thermodynamics</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Circuit Analysis</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Data Structures</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Control Systems</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Engineering Design</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Education;
