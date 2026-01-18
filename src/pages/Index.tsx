import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import CurrentProjects from "@/components/CurrentProjects";
import FeaturedProjects from "@/components/FeaturedProjects";
import ResearchHighlights from "@/components/ResearchHighlights";
import LatestBlog from "@/components/LatestBlog";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <AboutSection />
      <CurrentProjects />
      <FeaturedProjects />
      <ResearchHighlights />
      <LatestBlog />
    </Layout>
  );
};

export default Index;
