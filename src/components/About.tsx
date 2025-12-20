const About = () => {
  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
          About Me
        </h2>
        
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I explore the intersection of{" "}
            <span className="text-foreground font-medium">artificial intelligence</span> and{" "}
            <span className="text-foreground font-medium">cybersecurity</span> to build safer, 
            more resilient systems. I write about my research and share insights 
            with the tech community. When I'm not coding, you'll find me powerlifting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
