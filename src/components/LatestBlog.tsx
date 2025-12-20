import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import BlogPreviewCard from "./BlogPreviewCard";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
}

const LatestBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-medium-blogs');
        
        if (!error && data && Array.isArray(data)) {
          setPosts(data.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="py-20 bg-section-bg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            Latest from the Blog
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
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <BlogPreviewCard key={index} post={post} />
            ))}
          </div>
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
    </section>
  );
};

export default LatestBlog;
