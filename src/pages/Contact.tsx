import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's Connect
            </h1>
            <p className="text-lg text-muted-foreground">
              Open to internships, research opportunities, and project collaborations.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email */}
              <a 
                href="mailto:shivamkanodia77@gmail.com?subject=Portfolio%20Inquiry"
                className="flex items-center gap-4 p-4 rounded-lg bg-section-bg hover:bg-muted transition-colors"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">shivamkanodia77@gmail.com</p>
                </div>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/shivamkanodia19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-section-bg hover:bg-muted transition-colors"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Linkedin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">linkedin.com/in/shivamkanodia19</p>
                </div>
              </a>

              {/* GitHub */}
              <a 
                href="https://github.com/shivamkanodia19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg bg-section-bg hover:bg-muted transition-colors"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">GitHub</p>
                  <p className="text-sm text-muted-foreground">github.com/shivamkanodia19</p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-section-bg">
                <div className="p-3 rounded-full bg-muted">
                  <MapPin className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">College Station, Texas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <Button size="lg" asChild>
              <a href="mailto:shivamkanodia77@gmail.com?subject=Portfolio%20Inquiry">
                <Mail className="w-5 h-5 mr-2" />
                Send Me an Email
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
