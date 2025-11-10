import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Blog = () => {
  const latestBlog = {
    title: "Human Error and Hacker Craft: Unraveling Twitter's 2020 Vishing Scandal",
    link: "https://medium.com/@shivamkanodia77/human-error-and-hacker-craft-unraveling-twitters-2020-vishing-scandal-42cd4dd29af7",
    excerpt: "An in-depth analysis of the 2020 Twitter hack that compromised high-profile accounts through sophisticated social engineering techniques."
  };

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Latest Blog
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">{latestBlog.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{latestBlog.excerpt}</p>
              <Button asChild className="w-full sm:w-auto">
                <a 
                  href={latestBlog.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  Read on Medium
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Blog;
