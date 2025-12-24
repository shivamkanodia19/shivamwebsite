import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Image - Texas A&M inspired */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Gradient overlay for depth and text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-primary/80" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up">
          Shivam Kanodia
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in-up [animation-delay:0.1s]">
          Engineering Honors Student at Texas A&M University
        </p>
        
        <p className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto animate-fade-in-up [animation-delay:0.2s]">
          Engineering solutions through rigorous design, experimentation, and data-driven iteration.
        </p>

        <div className="animate-fade-in-up [animation-delay:0.3s]">
          <Button 
            size="lg" 
            asChild 
            className="bg-white text-primary hover:bg-white/90"
          >
            <Link to="/projects">
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
