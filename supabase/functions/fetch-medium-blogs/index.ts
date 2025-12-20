import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
  thumbnail: string | null;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const mediumUsername = "shivamkanodia77";
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    
    console.log(`Fetching RSS feed from: ${rssUrl}`);
    
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      console.error(`Failed to fetch RSS: ${response.status}`);
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }
    
    const xmlText = await response.text();
    console.log(`Received RSS feed, length: ${xmlText.length}`);
    
    // Parse the XML to extract blog posts
    const posts: BlogPost[] = [];
    
    // Simple XML parsing for RSS items
    const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g);
    
    if (itemMatches) {
      for (const item of itemMatches.slice(0, 5)) { // Get latest 5 posts
        const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/);
        const linkMatch = item.match(/<link>(.*?)<\/link>/);
        const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
        const descriptionMatch = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
        
        // Extract thumbnail from content:encoded or description
        let thumbnail: string | null = null;
        const imgMatch = item.match(/<img[^>]+src="([^"]+)"/);
        if (imgMatch) {
          thumbnail = imgMatch[1];
        }
        
        // Clean up description to get excerpt
        let excerpt = "";
        if (descriptionMatch) {
          // Remove HTML tags and get first 200 characters
          excerpt = descriptionMatch[1]
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .trim()
            .substring(0, 200);
          
          if (excerpt.length === 200) {
            excerpt += "...";
          }
        }
        
        if (titleMatch && linkMatch) {
          posts.push({
            title: titleMatch[1],
            link: linkMatch[1],
            pubDate: pubDateMatch ? pubDateMatch[1] : "",
            excerpt,
            thumbnail,
          });
        }
      }
    }
    
    console.log(`Parsed ${posts.length} blog posts`);
    
    return new Response(
      JSON.stringify({ posts }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
    
  } catch (error) {
    console.error('Error fetching Medium blogs:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch blog posts',
        posts: [] 
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
