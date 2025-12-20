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
  aiSummary?: string;
}

async function generateAISummary(title: string, excerpt: string): Promise<string> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  
  if (!LOVABLE_API_KEY) {
    console.log("LOVABLE_API_KEY not configured, skipping AI summary");
    return excerpt;
  }

  try {
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a concise technical writer. Write a 1-2 sentence summary of the blog post based on its title and excerpt. Be engaging and highlight the key technical topic. Keep it under 150 characters."
          },
          {
            role: "user",
            content: `Blog Title: ${title}\n\nExcerpt: ${excerpt}\n\nWrite a brief, engaging summary:`
          }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.log("Rate limited, using excerpt as summary");
        return excerpt;
      }
      if (response.status === 402) {
        console.log("Payment required, using excerpt as summary");
        return excerpt;
      }
      console.error("AI gateway error:", response.status);
      return excerpt;
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim();
    
    return summary || excerpt;
  } catch (error) {
    console.error("Error generating AI summary:", error);
    return excerpt;
  }
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
    
    // Generate AI summary for the latest post only
    if (posts.length > 0) {
      console.log("Generating AI summary for latest post...");
      const latestPost = posts[0];
      latestPost.aiSummary = await generateAISummary(latestPost.title, latestPost.excerpt);
      console.log("AI summary generated successfully");
    }
    
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
