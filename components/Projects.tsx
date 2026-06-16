'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getDomainData, getPersonalData, slugify } from '@/lib/data-loader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import Link from 'next/link';
import TechLogo from '@/components/TechLogo';
import { analytics } from '@/lib/analytics';
import OptimizedImage from '@/components/ui/optimized-image';
import { getImageConfig } from '@/lib/images/image-config-optimized';

const Projects = memo(() => {
  const { domain } = usePortfolioStore();
  const domainData = getDomainData(domain);
  const personalData = getPersonalData();
  const [showMore, setShowMore] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const mainProjects = domainData.projects.slice(0, 3);
  const additionalProjects = domainData.projects.slice(3);
  const allProjects = showMore ? domainData.projects : mainProjects;

  const handleProjectView = useCallback((projectTitle: string) => {
    analytics.trackProjectView(projectTitle, domain);
  }, [domain]);

  const handleProjectDemo = useCallback((projectTitle: string, demoUrl: string) => {
    analytics.trackProjectDemo(projectTitle);
    window.open(demoUrl, '_blank');
  }, []);

  const handleProjectCode = useCallback((projectTitle: string, githubUrl: string) => {
    analytics.trackProjectCode(projectTitle);
    window.open(githubUrl, '_blank');
  }, []);

  const handleShowMore = useCallback(() => {
    setShowMore(!showMore);
  }, [showMore]);

  const handleGitHubClick = useCallback(() => {
    analytics.trackSocialClick('github');
    window.open(personalData.github, '_blank');
  }, [personalData.github]);

  return (
    <section id="projects" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 space-y-3"
        >
          <span className={`text-xs font-mono font-medium tracking-tight ${
            domain === 'cs' ? 'text-indigo-605 dark:text-indigo-400' : 'text-emerald-605 dark:text-emerald-400'
          }`}>
            // SELECTED PROJECTS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Engineering Showcases
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {domain === 'cs' 
              ? 'A showcase of my software development work, featuring modern technologies, systems architecture, and clean code practices.'
              : 'Rigorous engineering projects demonstrating computational fluid dynamics, thermal systems, and physical prototyping.'
            }
          </p>
        </motion.div>

        <motion.div
          key={`${domain}-${showMore}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {allProjects.map((project, index) => {
            const projectSlug = slugify(project.title);
            
            return (
              <motion.div 
                key={project.title} 
                variants={itemVariants}
                onViewportEnter={() => handleProjectView(project.title)}
                className="will-change-transform"
              >
                <div className="relative p-6 rounded-2xl border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between h-full group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-mono font-medium tracking-tight ${
                        domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-400'
                      }`}>
                        {domain === 'cs' ? '// Software & AI Showcase' : '// CFD & Simulation Study'}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug font-sans">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-3 pt-1 text-xs leading-relaxed text-slate-655 dark:text-slate-400">
                      <div>
                        <span className="font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block text-[9px] mb-1">
                          Overview & Challenge
                        </span>
                        <p className="line-clamp-3 font-medium">{project.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center space-x-1.5 bg-slate-50/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-350 px-2 py-1 rounded-md text-[10px] font-semibold border border-slate-200/40 dark:border-slate-900"
                        >
                          <TechLogo technology={tech} size="sm" />
                          <span>{tech}</span>
                        </div>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 self-center">
                          +{project.technologies.length - 4} items
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-900/60 flex flex-col space-y-3">
                    {/* Secondary Action: Read dynamic case study (high SEO discoverability) */}
                    <Link 
                      href={`/projects/${projectSlug}`}
                      className={`inline-flex items-center text-xs font-bold transition-colors group/link ${
                        domain === 'cs'
                          ? 'text-indigo-650 dark:text-indigo-400 hover:text-indigo-850'
                          : 'text-emerald-650 dark:text-emerald-400 hover:text-emerald-850'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 mr-1.5 opacity-80" />
                      <span>Read technical case study</span>
                      <span className="ml-1 group-hover/link:translate-x-0.5 transition-transform">&rarr;</span>
                    </Link>
 
                    {/* Primary Actions (Code & Demos) */}
                    {domain === 'cs' && (project.github || project.demo) && (
                      <div className="flex space-x-3 pt-1">
                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 flex items-center justify-center space-x-1.5 group/btn border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus-ring text-xs"
                            onClick={() => handleProjectCode(project.title, project.github || '')}
                          >
                            <Github className="w-3.5 h-3.5 group-hover/btn:scale-105 transition-transform" />
                            <span>Repository</span>
                          </Button>
                        )}
                        {project.demo && (
                          <Button
                            size="sm"
                            className="flex-1 flex items-center justify-center space-x-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 group/btn btn-hover-lift focus-ring text-xs font-semibold"
                            onClick={() => handleProjectDemo(project.title, project.demo || '')}
                          >
                            <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-105 transition-transform" />
                            <span>Live Demo</span>
                          </Button>
                        )}
                      </div>
                    )}
 
                    {domain === 'mechanical' && project.link && (
                      <div className="pt-1">
                        <Button
                          size="sm"
                          className="w-full flex items-center justify-center space-x-1.5 bg-slate-900 text-white dark:bg-white dark:text-slate-955 group/btn btn-hover-lift focus-ring text-xs font-semibold"
                          onClick={() => window.open(project.link, '_blank')}
                        >
                          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:scale-105 transition-transform" />
                          <span>View Details & Report</span>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {additionalProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="outline"
              className="mb-6 flex items-center space-x-2 mx-auto border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 btn-hover-lift focus-ring"
              onClick={handleShowMore}
            >
              {showMore ? (
                <>
                  <ChevronUp className="w-5 h-5" />
                  <span>Show Less Projects</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-5 h-5" />
                  <span>Show More Projects ({additionalProjects.length} more)</span>
                </>
              )}
            </Button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Interested in seeing more of my work?
          </p>
          <Button
            size="lg"
            className="gradient-primary text-white px-8 py-3 rounded-xl font-semibold btn-hover-lift focus-ring"
            onClick={handleGitHubClick}
          >
            View All Projects on GitHub
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

Projects.displayName = 'Projects';

export default Projects;