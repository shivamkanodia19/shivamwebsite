import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import BlogPreviewCard from "@/components/BlogPreviewCard";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail?: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-medium-blogs');
        
        if (error) throw error;
        
        if (data && Array.isArray(data) && data.length > 0) {
          setPosts(data);
        } else {
          setError("No blog posts available");
        }
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Unable to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Layout>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Technical articles covering AI cybersecurity research, software development, 
              and emerging technology trends.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{error}</p>
              <a 
                href="https://medium.com/@shivamkanodia77" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline mt-2 inline-block"
              >
                Visit my Medium profile →
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {posts.map((post, index) => (
                <BlogPreviewCard key={index} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
