import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  aiSummary?: string;
}

const LatestBlog = () => {
  const [latestPost, setLatestPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-medium-blogs');
        
        if (!error && data?.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          setLatestPost(data.posts[0]);
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Latest Blogs
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/blog">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : latestPost ? (
            <Card className="max-w-2xl mx-auto shadow-card hover:shadow-card-hover transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {formatDate(latestPost.pubDate)}
                  </Badge>
                  {latestPost.aiSummary && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI Summary
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-2xl">{latestPost.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {latestPost.aiSummary || latestPost.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <a href={latestPost.link} target="_blank" rel="noopener noreferrer">
                    Read on Medium
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              Check out my articles on{" "}
              <a 
                href="https://medium.com/@shivamkanodia77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Medium
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
