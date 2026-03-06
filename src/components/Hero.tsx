import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

const Hero = () => {
  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 64, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Spotlight effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Red ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-900/15 rounded-full blur-[80px] pointer-events-none" />

      {/* Split layout */}
      <div className="flex min-h-screen">
        {/* Left — text content */}
        <div className="flex-1 relative z-10 flex flex-col justify-center px-8 md:px-16 py-32">
          <div className="max-w-lg">
            <p className="text-red-500 text-xs font-mono tracking-[0.2em] uppercase mb-6 animate-fade-in-up">
              Engineering Honors · Texas A&amp;M University
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 animate-fade-in-up [animation-delay:0.1s]">
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
                Shivam
                <br />
                Kanodia
              </span>
            </h1>

            <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-10 animate-fade-in-up [animation-delay:0.2s]">
              Engineering solutions through rigorous design, experimentation,
              and data-driven iteration.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-in-up [animation-delay:0.3s]">
              <Button
                size="lg"
                asChild
                className="bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-red-600/30 transition-all duration-300"
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
                className="border-white/15 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              >
                <Link to="/blog">Read Blogs</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right — Spline 3D scene */}
        <div className="flex-1 relative hidden md:block">
          {/* Subtle red border glow on the divider */}
          <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-red-600/30 to-transparent" />
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce z-10"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7" />
      </button>
    </section>
  );
};

export default Hero;
