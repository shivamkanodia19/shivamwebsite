import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string | null;
}

const Blog = () => {
  const [latestBlog, setLatestBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback blog data
  const fallbackBlog: BlogPost = {
    title: "Human Error and Hacker Craft: Unraveling Twitter's 2020 Vishing Scandal",
    link: "https://medium.com/@shivamkanodia77/human-error-and-hacker-craft-unraveling-twitters-2020-vishing-scandal-42cd4dd29af7",
    pubDate: "",
    excerpt: "An in-depth analysis of the 2020 Twitter hack that compromised high-profile accounts through sophisticated social engineering techniques.",
    thumbnail: null,
  };

  useEffect(() => {
    const fetchLatestBlog = async () => {
      try {
        setIsLoading(true);
        
        const { data, error: funcError } = await supabase.functions.invoke('fetch-medium-blogs');
        
        if (funcError) {
          console.error('Error fetching blogs:', funcError);
          setLatestBlog(fallbackBlog);
          return;
        }
        
        if (data?.posts && data.posts.length > 0) {
          setLatestBlog(data.posts[0]);
        } else {
          setLatestBlog(fallbackBlog);
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load latest blog');
        setLatestBlog(fallbackBlog);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestBlog();
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return "";
    }
  };

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          Latest Blogs
        </h2>
        
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : latestBlog ? (
            <Card className="shadow-card hover:shadow-card-hover transition-shadow border-border/50">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl leading-tight">
                  {latestBlog.title}
                </CardTitle>
                {latestBlog.pubDate && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(latestBlog.pubDate)}
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {latestBlog.excerpt}
                </p>
                <Button asChild variant="outline" className="w-full sm:w-auto">
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
          ) : (
            <p className="text-center text-muted-foreground">
              Unable to load latest blog post.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
