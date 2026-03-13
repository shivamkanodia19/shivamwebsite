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
                    B.S. Computer Engineering (Honors) · GPA: 3.7
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expected Graduation: May 2029
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">Minors: AI in Business (Mays Business School) · Statistics (College of Arts and Sciences)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">Coursework: C++ Design, Engineering Calculus III, Python Programming</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Clubs & Organizations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                {["EDGE", "FREE", "Aggies Create", "Product@TAMU", "IEEE", "Aggie Data Science Club", "Aggie Innovators"].map((org) => (
                  <div key={org} className="flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                    <span className="text-muted-foreground">{org}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">Awards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">Ideathon Runner Up</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">National Merit Commendation</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3" />
                  <span className="text-muted-foreground">AP Scholar with Distinction</span>
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
