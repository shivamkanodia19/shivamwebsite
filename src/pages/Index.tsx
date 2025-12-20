import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import CoreSkills from "@/components/CoreSkills";
import FeaturedProjects from "@/components/FeaturedProjects";
import LatestBlog from "@/components/LatestBlog";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CoreSkills />
      <FeaturedProjects />
      <LatestBlog />
    </Layout>
  );
};

export default Index;
