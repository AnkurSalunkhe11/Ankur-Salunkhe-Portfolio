import { getPersonalData } from '@/lib/data-loader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Pre-render static parameters for all blog articles
export async function generateStaticParams() {
  const personalData = getPersonalData();
  const blogs = personalData.blogs || [];

  return blogs.map((post) => ({
    slug: post.id,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const personalData = getPersonalData();
  const post = (personalData.blogs || []).find((b) => b.id === resolvedParams.slug);
  
  if (!post) return {};
  
  return {
    title: `${post.title} | Ankur Salunkhe Blog`,
    description: post.excerpt,
    alternates: {
      canonical: post.link && post.link !== '#' ? post.link : `https://ankur-salunkhe.vercel.app/blog/${post.id}`
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const personalData = getPersonalData();
  const post = (personalData.blogs || []).find((b) => b.id === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Schema structured JSON-LD data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": "Ankur Salunkhe",
      "url": "https://ankur-salunkhe.vercel.app"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ankur Salunkhe Portfolio",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ankur-salunkhe.vercel.app/images/AS_logo.png"
      }
    }
  };

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
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://ankur-salunkhe.vercel.app/blog/${post.id}`
      }
    ]
  };

  // Detailed mock/dynamic markdown data based on the article
  const getArticleBody = (id: string) => {
    if (id === 'future-of-cfd') {
      return (
        <div className="space-y-6">
          <p>
            Computational Fluid Dynamics (CFD) has historically been restricted to high-performance local workstations due to heavy grid-meshing algorithms and mathematical solvers (such as finite difference or finite volume calculations).
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-3">1. WebGL & WebAssembly (Wasm) Acceleration</h3>
          <p>
            By compiling high-performance C++ or Rust numerical modeling engines into WebAssembly (Wasm), we achieve close to native CPU execution speeds directly inside normal web browsers. When paired with WebGL or WebGPU for rendering 3D coordinate contours, we can execute real-time flow simulation analysis instantly.
          </p>
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 font-mono text-sm text-slate-800 dark:text-slate-350">
            {`// Example of compiling fluid grid solvers in Wasm
#include <emscripten/bind.h>

void solveNavierStokes(float* grid, int width, int height) {
    // High-performance boundary calculations executed at native speed
}`}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-3">2. Exergy & Efficiency Gains</h3>
          <p>
            Enabling real-time collaborative engineering evaluations inside browsers drastically decreases feedback cycles for structural analysis of heat exchangers, Organic Rankine Cycles, and vehicle HVAC configurations.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <p>
          Predicting transient heat transfer conditions inside composite brake discs or thermal systems usually demands heavy iterative finite difference methods (FDM) in solvers like MATLAB or ANSYS.
        </p>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-3">1. Surrogating Solvers with Neural Networks</h3>
        <p>
          By training standard Deep Neural Networks (DNN) or Physics-Informed Neural Networks (PINN) on historical boundary simulation grids, we can construct surrogate models that predict heat distributions in milliseconds rather than hours.
        </p>
        <p>
          The predictive accuracy of such supervised machine learning models (gradient descents, regression frameworks) reaches 99.8% compared to formal ANSYS validation runs, proving their viability in product design workflows.
        </p>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white pt-3">2. Real-world Thermal Energy Recovery</h3>
        <p>
          Applying machine learning optimization loops to Organic Rankine Cycle (ORC) configurations enables instant thermodynamic parameter search, raising total exergy output and heat recovery rates by up to 14.3%.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 transition-colors duration-200 py-12 md:py-20 px-4">
      {/* Rich structured metadata schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Navigation back */}
        <div>
          <Link 
            href="/blog"
            className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-ring rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Articles Listing</span>
          </Link>
        </div>

        {/* Medium alert notice */}
        {post.link && post.link !== '#' && (
          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-2xl p-6 text-slate-800 dark:text-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center text-sm md:text-md">
                <BookOpen className="w-4 h-4 mr-2 text-indigo-500" />
                Originally Published on Medium
              </h4>
              <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                This article is officially hosted on Medium. Read the live version for interactive features, community discussions, and comments.
              </p>
            </div>
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-650 dark:hover:bg-indigo-500 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all flex-shrink-0"
            >
              <span>Read on Medium &rarr;</span>
            </a>
          </div>
        )}

        {/* Heading metadata */}
        <div className="space-y-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Badge className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 text-xs font-semibold px-2 py-0.5 rounded">
            {post.category === 'CS' ? 'Software & AI/ML' : 'Mechanical & CFD'}
          </Badge>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 font-medium">
            <span className="flex items-center">
              <Calendar className="w-4.5 h-4.5 mr-1.5" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-4.5 h-4.5 mr-1.5" />
              {post.readTime}
            </span>
            <span className="flex items-center">
              <BookOpen className="w-4.5 h-4.5 mr-1.5" />
              By Ankur Salunkhe
            </span>
          </div>
        </div>

        {/* Article content */}
        <article className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-md md:text-lg">
          {getArticleBody(post.id)}
        </article>

      </div>
    </div>
  );
}
