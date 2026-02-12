import { ExternalLink } from "lucide-react";
import { getCurrentProjects } from "@/data/projects";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CurrentProjects = () => {
  const currentProjects = getCurrentProjects();
  const { ref, isVisible } = useScrollAnimation();

  if (currentProjects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-background border-t border-border/50">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Currently Building
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              What I am actively building right now with a focus on real-world
              impact.
            </p>
          </div>

          <ul className="space-y-4 max-w-2xl">
            {currentProjects.map((project, index) => (
              <li
                key={project.id}
                className={`transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.tagline}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-border/50">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.tagline}
                      </p>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
