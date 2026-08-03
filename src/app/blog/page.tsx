import { ArrowRight, Calendar, Clock } from "lucide-react";
import Image from "next/image";

// Mock data for the blog since we don't have a backend yet
const BLOG_POSTS = [
  {
    id: "under-the-hood-axboost",
    title: "Under the hood: AxBoostFwk and the quest for zero jank",
    excerpt: "Vanilla AOSP struggles with UI transitions on MTK and Qualcomm devices due to generic power hints. Here's how we fixed it at the scheduler level.",
    date: "Aug 03, 2026",
    readTime: "8 min read",
    category: "Engineering",
    image: "/screenshots/axion_ss/8.jpg",
    featured: true,
  },
  {
    id: "vulkan-media-fixes",
    title: "Vulkan-first graphics without breaking media",
    excerpt: "How we built a dual-engine RenderEngine wrapper to support Skia glass blur on legacy devices without corrupting HDR or video playback.",
    date: "Jul 15, 2026",
    readTime: "5 min read",
    category: "Graphics",
    image: "/screenshots/axion_ss/6.jpg",
    featured: false,
  },
  {
    id: "axion-os-1-release",
    title: "Announcing Axion OS 1.0",
    excerpt: "The first stable release of Axion OS is here. Bringing a custom dynamic bar, theming engine, and uncompromised performance to over 30 official devices.",
    date: "Jun 01, 2026",
    readTime: "3 min read",
    category: "Release",
    image: "/screenshots/axion_ss/2.jpg",
    featured: false,
  }
];

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find(p => p.featured);
  const regularPosts = BLOG_POSTS.filter(p => !p.featured);

  return (
    <main className="min-h-screen bg-[var(--color-axion-bg)] pt-32 pb-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            The Axion Blog.
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Development updates, deep dives into our engineering research, and community news.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="group relative w-full rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 mb-16 flex flex-col lg:flex-row">
            <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto h-64 lg:h-[450px]">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:from-transparent lg:bg-gradient-to-r lg:to-black/80 to-transparent" />
            </div>
            
            <div className="relative w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-black/40 lg:bg-transparent">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-[var(--color-axion-accent)]/20 text-[var(--color-axion-accent)] text-xs font-bold uppercase tracking-widest">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Calendar className="w-4 h-4" /> {featuredPost.date}
                </span>
                <span className="flex items-center gap-1.5 text-white/40 text-sm">
                  <Clock className="w-4 h-4" /> {featuredPost.readTime}
                </span>
              </div>
              
              <h2 className="text-3xl lg:text-5xl font-bold text-white leading-tight mb-6 group-hover:text-[var(--color-axion-accent)] transition-colors">
                {featuredPost.title}
              </h2>
              
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              
              <button className="flex items-center gap-2 text-white font-medium group/btn w-fit">
                Read Article 
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {regularPosts.map(post => (
            <div key={post.id} className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col">
              <div className="relative h-60 w-full overflow-hidden">
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--color-axion-accent)] text-xs font-bold uppercase tracking-widest">
                    {post.category}
                  </span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-white/40 text-sm">{post.date}</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[var(--color-axion-accent)] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-white/60 leading-relaxed mb-8 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center gap-2 text-white font-medium group/btn">
                  Read Article 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
