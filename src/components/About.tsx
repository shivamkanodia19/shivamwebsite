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
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex justify-center">
                <img 
                  src={profileImg} 
                  alt="Shivam Kanodia" 
                  className="rounded-lg w-48 h-48 object-cover shadow-card"
                />
              </div>
              
              <div className="md:col-span-2">
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  I'm an Engineering Honors student at Texas A&M University, passionate about 
                  leveraging technology to solve complex problems. My academic journey has 
                  equipped me with a strong foundation in engineering principles and a drive 
                  for innovation.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through my coursework and projects, I've developed expertise in various 
                  engineering disciplines and cutting-edge technologies. I'm dedicated to 
                  continuous learning and applying my knowledge to create impactful solutions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
