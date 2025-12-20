import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))]">
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Orb 1 - Large, top right */}
        <div 
          className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-orb-primary/20 blur-[100px] animate-float-orb-1"
        />
        {/* Orb 2 - Medium, bottom left */}
        <div 
          className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-orb-secondary/25 blur-[80px] animate-float-orb-2"
        />
        {/* Orb 3 - Small, center */}
        <div 
          className="absolute top-[40%] left-[40%] w-[200px] h-[200px] rounded-full bg-orb-tertiary/15 blur-[60px] animate-float-orb-3"
        />
        {/* Orb 4 - Extra ambient */}
        <div 
          className="absolute bottom-[40%] right-[25%] w-[250px] h-[250px] rounded-full bg-orb-primary/10 blur-[90px] animate-float-orb-2"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-4xl">
        <p 
          className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Hello and welcome! I am a{" "}
          <span className="underline decoration-accent decoration-2 underline-offset-4">
            Computer Engineering Honors
          </span>{" "}
          student at Texas A&M University, passionate about{" "}
          <span className="underline decoration-accent decoration-2 underline-offset-4">
            AI Cybersecurity
          </span>{" "}
          research.
        </p>

        <p 
          className="text-base md:text-lg text-white/70 mb-12 opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          Take a look at my work below :)
        </p>

        {/* Social Links */}
        <div 
          className="flex gap-6 justify-center opacity-0 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a 
            href="https://github.com/shivamkanodia19" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white/60 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a 
            href="https://linkedin.com/in/shivamkanodia19" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a 
            href="mailto:shivamkanodia77@gmail.com"
            className="text-white/60 hover:text-white transition-colors duration-300"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
