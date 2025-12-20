import { Github, Linkedin, Mail } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Subtle Overlay for text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-3xl">
        <p 
          className="font-mono text-lg md:text-xl text-white/90 mb-8 leading-relaxed opacity-0 animate-fade-in-up"
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
          className="font-mono text-base md:text-lg text-white/70 mb-12 opacity-0 animate-fade-in-up"
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
