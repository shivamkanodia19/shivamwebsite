import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Sparkles } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  aiSummary?: string;
}

interface BlogPreviewCardProps {
  post: BlogPost;
  isLatest?: boolean;
}

const BlogPreviewCard = ({ post, isLatest = false }: BlogPreviewCardProps) => {
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

  const displayText = post.aiSummary || post.excerpt;

  return (
    <Card className="h-full flex flex-col shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-muted-foreground">
            {formatDate(post.pubDate)}
          </span>
          {isLatest && post.aiSummary && (
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI Summary
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {displayText}
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
