import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className={`h-full flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 ${project.featured ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          {project.featured && (
            <Star className="w-4 h-4 text-primary shrink-0 mt-1 fill-primary" />
          )}
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {project.tagline}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>
        <Button variant="default" size="sm" asChild className="w-full mt-auto">
          <Link to={`/projects/${project.id}`}>
            View Project
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
