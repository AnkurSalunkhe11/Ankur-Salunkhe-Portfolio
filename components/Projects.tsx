'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getDomainData, getPersonalData } from '@/lib/data-loader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, memo, useCallback } from 'react';
import TechLogo from '@/components/TechLogo';
import { analytics } from '@/lib/analytics';
import { getProjectImage } from '@/lib/images';

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
    <section id="projects" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {domain === 'cs' 
              ? 'A showcase of my software development work, featuring modern technologies and clean code practices'
              : 'Engineering projects demonstrating innovation, precision, and technical excellence'
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
          {allProjects.map((project, index) => (
            <motion.div 
              key={project.title} 
              variants={itemVariants}
              onViewportEnter={() => handleProjectView(project.title)}
              className="will-change-transform"
            >
              <Card className="h-full group hover:shadow-professional-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border-slate-200 bg-white">
                <div className="relative overflow-hidden">
                  <img
                    src={getProjectImage(domain, project.title)}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <CardHeader className="pb-4">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <div
                          key={tech}
                          className="flex items-center space-x-1 bg-indigo-50 text-indigo-800 px-2 py-1 rounded-md text-xs font-medium border border-indigo-100"
                        >
                          <TechLogo technology={tech} size="sm" />
                          <span>{tech}</span>
                        </div>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {domain === 'cs' && project.github && project.demo && (
                    <div className="flex space-x-3 pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 group/btn border-slate-300 hover:bg-slate-50 focus-ring"
                        onClick={() => handleProjectCode(project.title, project.github)}
                      >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Code</span>
                      </Button>
                      <Button
                        size="sm"
                        className="flex items-center space-x-2 gradient-primary text-white group/btn btn-hover-lift focus-ring"
                        onClick={() => handleProjectDemo(project.title, project.demo)}
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>Demo</span>
                      </Button>
                    </div>
                  )}

                  {domain === 'mechanical' && project.link && (
                    <div className="pt-4">
                      <Button
                        size="sm"
                        className="w-full flex items-center space-x-2 gradient-primary text-white group/btn btn-hover-lift focus-ring"
                        onClick={() => window.open(project.link, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>View Details</span>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
              className="mb-6 flex items-center space-x-2 mx-auto border-slate-300 hover:bg-slate-50 btn-hover-lift focus-ring"
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
          <p className="text-slate-600 mb-6">
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