import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FeaturedProjects = () => {
  const featuredProjects = getFeaturedProjects();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Featured Projects
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/projects">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
