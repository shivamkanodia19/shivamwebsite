import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Get in Touch
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Let's Connect
              </CardTitle>
              <p className="text-center text-muted-foreground">
                I'm always open to discussing new opportunities, collaborations, 
                or just having a conversation about engineering and technology.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6"
                  asChild
                >
                  <a href="mailto:shivam@example.com">
                    <Mail className="w-5 h-5 mr-3 text-accent" />
                    <div className="text-left">
                      <div className="font-semibold">Email</div>
                      <div className="text-sm text-muted-foreground">shivam@example.com</div>
                    </div>
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6"
                  asChild
                >
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-3 text-accent" />
                    <div className="text-left">
                      <div className="font-semibold">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">Connect with me</div>
                    </div>
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="justify-start h-auto py-4 px-6"
                  asChild
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-3 text-accent" />
                    <div className="text-left">
                      <div className="font-semibold">GitHub</div>
                      <div className="text-sm text-muted-foreground">Check out my projects</div>
                    </div>
                  </a>
                </Button>
                
                <div className="flex items-center justify-center pt-4 text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-2 text-accent" />
                  <span>College Station, Texas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
