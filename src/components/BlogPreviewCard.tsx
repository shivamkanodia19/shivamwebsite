import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
}

interface BlogPreviewCardProps {
  post: BlogPost;
}

const BlogPreviewCard = ({ post }: BlogPreviewCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="text-sm text-muted-foreground mb-1">
          {formatDate(post.pubDate)}
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button variant="outline" size="sm" asChild className="w-full">
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            Read Article
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default BlogPreviewCard;
