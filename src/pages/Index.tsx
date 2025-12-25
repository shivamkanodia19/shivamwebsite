import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CoreSkills from "@/components/CoreSkills";
import FeaturedProjects from "@/components/FeaturedProjects";
import ResearchHighlights from "@/components/ResearchHighlights";
import LatestBlog from "@/components/LatestBlog";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <CoreSkills />
      <FeaturedProjects />
      <ResearchHighlights />
      <LatestBlog />
    </Layout>
  );
};

export default Index;
