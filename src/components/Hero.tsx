import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Hero background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-gradient opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4">
            Shivam Kanodia
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-2">
            Engineering Honors Student
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8">
            Texas A&M University
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
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
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground transition-all hover:scale-105"
            >
              Get in Touch
            </Button>
          </div>

          <div className="flex gap-4 justify-center">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
               className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:shivam@example.com"
               className="text-primary-foreground/70 hover:text-accent transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-accent transition-colors animate-bounce"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
