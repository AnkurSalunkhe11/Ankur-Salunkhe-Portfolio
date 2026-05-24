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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 py-12 md:py-20 px-4">
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
            className="inline-flex items-center space-x-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline focus-ring rounded p-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio Home</span>
          </Link>
        </div>

        {/* Hero Section Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-professional-lg space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-350 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Parameters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
            {project.duration && (
              <div className="flex items-center space-x-2.5">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs text-slate-400">Project Timeline</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{project.duration}</p>
                </div>
              </div>
            )}
            {project.team && (
              <div className="flex items-center space-x-2.5">
                <Users className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-xs text-slate-400">Team Size</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">{project.team}</p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2.5">
              <Cpu className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs text-slate-400">Branding Segment</p>
                <p className="font-semibold text-slate-800 dark:text-slate-200 capitalize">
                  {project.github ? 'Software Engineering' : 'Mechanical & CFD'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Core Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Case-study Description */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              Technical Overview & Case-study
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
              <p>
                This advanced engineering project was designed and optimized utilizing rigorous simulations and standard validation guidelines. By implementing dynamic parameter feedback and optimization modules, the system establishes top-tier efficiency bounds.
              </p>
              <p>
                As a Mechanical Engineer and Software Developer, I focused on reducing computational time-steps and improving physical meshing structures to resolve multi-phase flow interactions and thermo-fluid transient boundary conditions.
              </p>
            </div>
          </div>

          {/* Sidebar: Technology Stack */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-fit space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Core Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge 
                    key={tech} 
                    variant="secondary"
                    className="bg-indigo-50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/30 text-xs font-semibold px-2.5 py-1 rounded"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links and Actions */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              {project.github && (
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center space-x-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800 focus-ring"
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
                  className="w-full flex items-center justify-center space-x-2 gradient-primary text-white btn-hover-lift focus-ring"
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
                  className="w-full flex items-center justify-center space-x-2 gradient-primary text-white btn-hover-lift focus-ring"
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
