import ProjectCard from "@/components/ProjectCard";
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
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Current Projects
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              What I am actively building right now with a focus on real-world
              impact.
            </p>
          </div>

          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              className={`max-w-2xl mx-auto transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
