import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Blackjack Strategy App",
    description: "An interactive web application that helps players learn optimal blackjack strategy through visual guides and practice scenarios.",
    tags: ["React", "Game Development", "Strategy", "Web App"],
    link: "https://v0-blackjack-strategy-app.vercel.app"
  },
  {
    title: "Technical Blog & Research",
    description: "Collection of in-depth technical articles covering AI cybersecurity research, innovative tech solutions, and emerging technology trends.",
    tags: ["AI", "Cybersecurity", "Research", "Technical Writing"],
    link: "https://medium.com/@shivamkanodia77"
  },
  {
    title: "Ideathon Innovation Project",
    description: "Award-winning project developed during an ideathon hackathon, showcasing innovative problem-solving and rapid prototyping capabilities.",
    tags: ["Hackathon", "Innovation", "Development", "Collaboration"],
    link: "https://devpost.com/software/ideathon-wgsdzp#updates"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button variant="default" size="sm" asChild className="w-full">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Project Link
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
