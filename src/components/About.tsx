import { Card } from "@/components/ui/card";
import profileImg from "@/assets/profile-placeholder.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          About Me
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                I'm an Engineering Honors student at Texas A&M University, specializing in AI 
                Cybersecurity research. I'm deeply involved in business tech and devoted to 
                making innovative technological advancements in the realm of artificial intelligence. 
                My passion lies in exploring the intersection of AI and security to build safer, 
                more resilient systems.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I love writing technical blogs about my AI cybersecurity research, sharing insights 
                and discoveries with the tech community. When I'm not immersed in research or coding, 
                you'll find me powerlifting at the gym, where I channel my dedication and discipline 
                into building physical strength.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
