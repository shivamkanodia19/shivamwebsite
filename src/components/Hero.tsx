import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVideo from "@/assets/hero-video.mp4";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 64, behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={heroBg}
        className="absolute inset-0 w-full h-full object-cover scale-[1.12] origin-center"
        style={{ objectPosition: "left top" }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      
      {/* Corner overlay to hide watermark */}
      <div className="absolute bottom-0 right-0 w-32 h-24 bg-gradient-to-tl from-black via-black/80 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 animate-fade-in-up drop-shadow-lg">
          Shivam Kanodia
        </h1>
        
        <p className="text-lg md:text-xl text-white font-semibold mb-6 animate-fade-in-up [animation-delay:0.1s] drop-shadow-md">
          Engineering Honors Student at Texas A&M University
        </p>
        
        <p className="text-base md:text-lg text-white/90 font-medium mb-10 max-w-xl mx-auto animate-fade-in-up [animation-delay:0.2s] drop-shadow-sm">
          Engineering solutions through rigorous design, experimentation, and data-driven iteration.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up [animation-delay:0.3s]">
          <Button 
            size="lg" 
            asChild 
            className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/projects">
              View Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            asChild
            className="border-white/50 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm"
          >
            <Link to="/blog">
              Read Blog
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button 
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
