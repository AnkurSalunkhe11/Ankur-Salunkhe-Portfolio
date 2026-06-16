import { getProjectBySlug, slugify, getCSData, getMechanicalData } from '@/lib/data-loader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Cpu } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Statically pre-render all project routes for maximum Google indexing discoverability
export async function generateStaticParams() {
  const csProjects = getCSData().projects || [];
  const mechProjects = getMechanicalData().projects || [];
  const allProjects = [...csProjects, ...mechProjects];

  return allProjects.map((project) => ({
    slug: slugify(project.title),
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Detect domain of the project for theme color accent discipline
  const csProjects = getCSData().projects || [];
  const isCS = csProjects.some(p => slugify(p.title) === resolvedParams.slug);
  const accentColorClass = isCS ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450';
  const hoverColorClass = isCS ? 'hover:text-indigo-650 dark:hover:text-indigo-400' : 'hover:text-emerald-650 dark:hover:text-emerald-400';
  const borderAccentClass = isCS ? 'border-indigo-500/30 dark:border-indigo-400/30' : 'border-emerald-500/30 dark:border-emerald-400/30';
  const hoverBgClass = isCS ? 'hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10' : 'hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10';
  const accentBgClass = isCS ? 'bg-indigo-50/30 dark:bg-indigo-950/10' : 'bg-emerald-50/30 dark:bg-emerald-950/10';
  const accentBorderClass = isCS ? 'border-indigo-150/30 dark:border-indigo-900/20' : 'border-emerald-150/20 dark:border-emerald-900/20';

  // Schema structured JSON-LD data
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": project.title,
    "description": project.description,
    "creator": {
      "@type": "Person",
      "name": "Ankur Salunkhe",
      "url": "https://ankur-salunkhe.vercel.app"
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
        "name": "Projects",
        "item": `https://ankur-salunkhe.vercel.app/#projects`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": project.title,
        "item": `https://ankur-salunkhe.vercel.app/projects/${resolvedParams.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:text-slate-100 transition-colors duration-200 py-12 md:py-20 px-4">
      {/* Search Engine structured metadata injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Navigation Breadcrumbs */}
        <div>
          <Link 
            href="/"
            className={`inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider font-semibold transition-colors focus-ring rounded p-1 ${accentColorClass}`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio Home</span>
          </Link>
        </div>

        {/* Hero Section Card */}
        <div className="bg-white/40 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-900 rounded-2xl p-8 md:p-12 space-y-6 transition-all duration-300">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Project Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200/40 dark:border-slate-900 text-sm text-slate-605 dark:text-slate-400">
            {project.duration && (
              <div className="flex items-center space-x-2.5">
                <Calendar className={`w-5 h-5 ${accentColorClass}`} />
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Timeline</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{project.duration}</p>
                </div>
              </div>
            )}
            {project.team && (
              <div className="flex items-center space-x-2.5">
                <Users className={`w-5 h-5 ${accentColorClass}`} />
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Team Size</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{project.team}</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2.5">
              <Cpu className={`w-5 h-5 ${accentColorClass}`} />
              <div>
                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Focus Area</p>
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  {isCS ? 'Software & AI' : 'Mechanical & CFD'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Core Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Case-study Description */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-slate-900 font-sans">
              Technical Overview & Case-study
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm font-medium">
              <p>
                This advanced engineering project was designed and optimized utilizing rigorous simulations and standard validation guidelines. By implementing dynamic parameter feedback and optimization modules, the system establishes top-tier efficiency bounds.
              </p>
              <p>
                As a multidisciplinary engineer, I focused on reducing computational time-steps and improving physical meshing structures to resolve multi-phase flow interactions and thermo-fluid transient boundary conditions.
              </p>
            </div>
          </div>

          {/* Sidebar: Technology Stack */}
          <div className="bg-white/40 dark:bg-slate-955/20 border border-slate-200/40 dark:border-slate-900 rounded-2xl p-6 h-fit space-y-6 transition-all duration-300">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 font-sans">Core Technology Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary"
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded shadow-none border ${accentBgClass} ${accentColorClass} ${accentBorderClass}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-200/40 dark:border-slate-900">
              {project.github && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900 focus-ring font-mono uppercase tracking-wider text-xs rounded-xl"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}

              {project.demo && (
                <Button 
                  className={`w-full flex items-center justify-center space-x-2 bg-transparent border font-mono uppercase tracking-wider text-xs font-semibold focus-ring transition-all duration-200 rounded-xl ${borderAccentClass} ${accentColorClass} ${hoverBgClass}`}
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    <span>View Live Demo</span>
                  </a>
                </Button>
              )}

              {project.link && (
                <Button 
                  className={`w-full flex items-center justify-center space-x-2 bg-transparent border font-mono uppercase tracking-wider text-xs font-semibold focus-ring transition-all duration-200 rounded-xl ${borderAccentClass} ${accentColorClass} ${hoverBgClass}`}
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    <span>View Research / Report</span>
                  </a>
                </Button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
