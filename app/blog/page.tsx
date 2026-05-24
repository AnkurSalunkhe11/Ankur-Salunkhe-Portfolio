import { getPersonalData } from '@/lib/data-loader';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Clock, Tag, ExternalLink, Rss } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  link: string;
}

export default async function BlogIndex() {
  const personalData = getPersonalData();
  const staticBlogs = personalData.blogs || [];
  const mediumProfileUrl = personalData.medium || 'https://medium.com/@ankursalunkhe11';
  
  let blogs: BlogPost[] = [...staticBlogs];
  let isDynamic = false;

  // Dynamically fetch live posts from Medium feed using an RSS-to-JSON parser
  try {
    const rssUrl = `https://medium.com/feed/@${mediumProfileUrl.split('@')[1] || 'ankursalunkhe11'}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, {
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
      signal: AbortSignal.timeout(4000) // Ensure build never hangs if API is slow
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        blogs = data.items.map((item: any) => {
          // Clean up HTML description for the excerpt
          const cleanExcerpt = item.description
            ? item.description
                .replace(/<[^>]*>/g, '') // Strip HTML tags
                .substring(0, 180)
                .trim() + '...'
            : item.content
            ? item.content
                .replace(/<[^>]*>/g, '')
                .substring(0, 180)
                .trim() + '...'
            : 'Read my latest publication on Medium.';

          return {
            id: item.guid.split('/').pop() || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            title: item.title,
            excerpt: cleanExcerpt,
            date: new Date(item.pubDate).toLocaleDateString('en-US', { 
              month: 'short', 
              year: 'numeric' 
            }),
            readTime: '5-10 min read',
            category: item.categories && item.categories.length > 0 
              ? item.categories[0] 
              : 'Software & Engineering',
            link: item.link
          };
        });
        isDynamic = true;
      }
    }
  } catch (e) {
    console.warn("Medium RSS dynamic fetch failed (expected in offline environments). Using high-fidelity local database backup.", e);
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://ankur-salunkhe.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `https://ankur-salunkhe.vercel.app/blog`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 py-12 md:py-20 px-4">
      {/* Dynamic structured markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Navigation back home */}
        <div>
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-ring rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio Home</span>
          </Link>
        </div>

        {/* Medium Publications Portal Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-indigo-100 dark:border-indigo-900/50 bg-gradient-to-br from-indigo-50/50 via-white to-sky-50/30 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-950 p-8 md:p-12 shadow-professional-lg text-center md:text-left space-y-6">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 px-3.5 py-1.5 rounded-full text-xs font-bold border border-indigo-200 dark:border-indigo-900/30">
                <Rss className="w-4 h-4 animate-pulse mr-1 text-indigo-600 dark:text-indigo-400" />
                <span>Medium Publications Portal</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Ankur Salunkhe on Medium
              </h1>
              <p className="text-md md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                I write detailed, research-driven engineering articles, transient thermodynamic models, machine learning solvers, and developer tutorials directly on Medium. Explore my publications below.
              </p>
            </div>
            
            <div className="flex-shrink-0 flex justify-center">
              <Button 
                asChild
                className="gradient-primary hover:opacity-95 text-white font-bold px-8 py-6 rounded-2xl shadow-professional transition-all duration-300 hover:-translate-y-0.5"
              >
                <a href={mediumProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <span>Follow on Medium</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>

          {isDynamic && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-center md:justify-start gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
              <span>Displaying live publications synced from Medium feed.</span>
            </div>
          )}
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-850 pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Recent Articles ({blogs.length})
            </h2>
            {!isDynamic && (
              <span className="text-xs font-medium text-slate-400">Database Fallback Archive</span>
            )}
          </div>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {blogs.map((post) => (
                <Card 
                  key={post.id}
                  className="hover:shadow-professional-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:-translate-y-1 relative group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge className={`${
                        post.category.toLowerCase().includes('cs') || post.category.toLowerCase().includes('software')
                          ? 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30'
                          : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/30'
                      } text-xs font-semibold px-2.5 py-1 rounded-lg`}>
                        <Tag className="w-3.5 h-3.5 mr-1" />
                        <span>{post.category}</span>
                      </Badge>
                      <span className="text-xs text-slate-400 font-medium flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {post.readTime}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {post.date}
                      </span>
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-sm md:text-md">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center justify-between pt-4 gap-4 border-t border-slate-100 dark:border-slate-855">
                      {/* Primary Action: Read on Medium */}
                      <a 
                        href={post.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group-hover:translate-x-0.5 transition-all"
                      >
                        <span>Read on Medium Publications Portal</span>
                        <ExternalLink className="w-4 h-4 ml-1.5" />
                      </a>

                      {/* Secondary Action: Read archived local copy (maintains indexability and search SEO) */}
                      {staticBlogs.some(sb => sb.id === post.id) && (
                        <Link 
                          href={`/blog/${post.id}`}
                          className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline decoration-dotted transition-colors"
                        >
                          View indexable archive copy
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500">
              No publications found. Add entries in your admin portal configurations to get started.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
