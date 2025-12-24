import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#500000' }}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#500000]/90 via-[#500000]/70 to-[#500000]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Shivam Kanodia
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-6">
          Engineering Honors Student at Texas A&M University
        </p>
        
        <p className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto">
          Engineering solutions through rigorous design, experimentation, and data-driven iteration.
        </p>

        <div>
          <Button 
            size="lg" 
            asChild 
            className="bg-white text-[#500000] hover:bg-white/90"
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
