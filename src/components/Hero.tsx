import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 animate-[slide-in-right_1s_ease-out]">
            Shivam Kanodia
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-2 animate-[slide-in-right_1s_ease-out_0.2s_both]">
            Engineering Honors Student
          </p>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 animate-[slide-in-right_1s_ease-out_0.4s_both]">
            Texas A&M University
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-[slide-in-right_1s_ease-out_0.6s_both]">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => scrollToSection("projects")}
              className="transition-all hover:scale-105"
            >
              View Projects
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => scrollToSection("contact")}
              className="transition-all hover:scale-105"
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex gap-4 justify-center animate-[slide-in-right_1s_ease-out_0.8s_both]">
            <a href="https://github.com/shivamkanodia19" target="_blank" rel="noopener noreferrer" 
               className="text-foreground/70 hover:text-accent transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/shivamkanodia19" target="_blank" rel="noopener noreferrer"
               className="text-foreground/70 hover:text-accent transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:shivamkanodia77@gmail.com"
               className="text-foreground/70 hover:text-accent transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/70 hover:text-accent transition-colors animate-bounce"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
