'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getDomainData } from '@/lib/data-loader';
import { 
  BookOpen, 
  ExternalLink, 
  Calendar, 
  Users, 
  Clock, 
  FileText, 
  Award,
  CheckCircle,
  AlertCircle,
  Eye
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function MechanicalAchievements() {
  const mechanicalData = getDomainData('mechanical') as any;
  const { publications, detailedProjects, patents } = mechanicalData;

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
        duration: 0.6,
      },
    },
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'granted':
        return <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-450" />;
      case 'published':
        return <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'filed':
      case 'under review':
        return <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-450" />;
      default:
        return <FileText className="w-4 h-4 text-slate-650 dark:text-slate-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'granted':
        return 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-350 border-emerald-200 dark:border-emerald-900/30';
      case 'published':
        return 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-350 border-indigo-200 dark:border-indigo-900/30';
      case 'filed':
      case 'under review':
        return 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-350 border-amber-200 dark:border-amber-900/30';
      default:
        return 'bg-slate-100 dark:bg-slate-900/40 text-slate-800 dark:text-slate-350 border-slate-200 dark:border-slate-800';
    }
  };

  const handlePublicationClick = (title: string, doi?: string) => {
    analytics.trackPublicationClick(title);
    if (doi) {
      window.open(doi, '_blank');
    }
  };

  const handlePatentClick = (title: string, link?: string) => {
    analytics.trackPatentClick(title);
    if (link) {
      window.open(link, '_blank');
    }
  };

  const handleProjectClick = (title: string, link?: string) => {
    analytics.trackProjectView(title, 'mechanical');
    if (link) {
      window.open(link, '_blank');
    }
  };

  // Get project image with fallback
  const getProjectImage = (projectTitle: string): string => {
    const imageMap: Record<string, string> = {
      'Implementation of an Organic Rankine Cycle as a Waste Heat Recovery System': '/images/orc-image.jpeg',
      'Transient Thermal Analysis of Braking Systems Using ANSYS': '/images/transient-thermal-braking.jpeg',
      'Heat Exchanger Performance Optimization using CFD': '/images/heat-exchanger-performance-cfd.jpeg',
      'Hybrid Air-conditioning System for Passenger Vehicles': '/images/hybrid-air-conditioning-system.jpeg',
    };
    
    return imageMap[projectTitle] || '/images/orc-image.jpeg';
  };

  return (
    <section className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 space-y-3"
        >
          <span className="text-xs font-mono font-medium tracking-tight text-emerald-650 dark:text-emerald-400">
            // MECHANICAL ENGINEERING
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Research & Patents
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            A comprehensive showcase of peer-reviewed publications, patented energy systems, and computational fluid simulations.
          </p>
        </motion.div>

        {/* Publications Section */}
        {publications && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-150/20 dark:border-emerald-900/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-650 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Research Publications</h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 shadow-sm">
              <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50/50 dark:bg-slate-955/40 text-slate-450 dark:text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200/40 dark:border-slate-900">
                  <tr>
                    <th scope="col" className="px-6 py-4">Title & Journal</th>
                    <th scope="col" className="px-6 py-4 hidden sm:table-cell">Key Parameters</th>
                    <th scope="col" className="px-6 py-4">DOI Identifier</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {publications.map((pub: any) => (
                    <tr key={pub.title} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">{pub.title}</div>
                        <div className="text-xs text-emerald-650 dark:text-emerald-400 mt-1.5 flex items-center space-x-2">
                          <span className="font-bold">{pub.journal}</span>
                          <span className="text-slate-350 dark:text-slate-700">&bull;</span>
                          <span className="font-medium text-slate-500">{pub.year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 hidden sm:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          <span className="text-[10px] font-mono font-medium bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-450 px-2 py-0.5 rounded border border-slate-200/30 dark:border-slate-800">
                            CFD Meshing
                          </span>
                          <span className="text-[10px] font-mono font-medium bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-450 px-2 py-0.5 rounded border border-slate-200/30 dark:border-slate-800">
                            Exergy Metrics
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-slate-505 dark:text-slate-450">
                        {pub.doi ? pub.doi.replace('https://doi.org/', '') : 'N/A'}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {pub.doi && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center space-x-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-305 focus-ring text-xs"
                            onClick={() => handlePublicationClick(pub.title, pub.doi)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View</span>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Detailed Engineering Projects Section */}
        {detailedProjects && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-150/20 dark:border-emerald-900/20 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-650 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Engineering Projects</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {detailedProjects.map((project: any, index: number) => (
                <motion.div key={project.title} variants={itemVariants}>
                  <Card className="h-full group hover:shadow-professional-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-955/20 flex flex-col">
                    <div className="relative overflow-hidden flex-shrink-0">
                      <img
                        src={getProjectImage(project.title)}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/orc-image.jpeg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardHeader className="pb-2 flex-shrink-0">
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-650 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-sm">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech: string) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="text-[10px] font-mono font-medium bg-emerald-50/20 dark:bg-emerald-955/10 text-emerald-705 dark:text-emerald-400 border border-emerald-150/20 dark:border-emerald-900/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                        <div className="grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          <div className="flex items-center space-x-1.5 font-mono">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{project.duration}</span>
                          </div>
                          {project.team && (
                            <div className="flex items-center space-x-1.5 font-mono">
                              <Users className="w-3.5 h-3.5 text-slate-400" />
                              <span>{project.team}</span>
                            </div>
                          )}
                        </div>
                        
                        {project.link && (
                          <Button
                            size="sm"
                            className="w-full flex items-center justify-center space-x-1.5 gradient-primary text-white btn-hover-lift focus-ring text-xs font-semibold"
                            onClick={() => handleProjectClick(project.title, project.link)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Report</span>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Patents Section */}
        {patents && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-150/20 dark:border-emerald-900/20 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-emerald-655 dark:text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Patents Showcase</h3>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-955/20 shadow-sm animate-fade-in">
              <table className="w-full border-collapse text-left text-sm text-slate-600 dark:text-slate-400">
                <thead className="bg-slate-50/50 dark:bg-slate-955/40 text-slate-450 dark:text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200/40 dark:border-slate-900">
                  <tr>
                    <th scope="col" className="px-6 py-4">Patent Details & Title</th>
                    <th scope="col" className="px-6 py-4">Status & Identifiers</th>
                    <th scope="col" className="px-6 py-4 hidden sm:table-cell">Application ID</th>
                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {patents.map((patent: any) => (
                    <tr key={patent.title} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-5">
                        <div className="font-semibold text-slate-900 dark:text-white line-clamp-1">{patent.title}</div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl line-clamp-1">{patent.description}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-2 font-mono">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border uppercase tracking-wider ${getStatusColor(patent.status)}`}>
                            {patent.status}
                          </span>
                          {patent.patentNumber && (
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {patent.patentNumber}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-slate-500 dark:text-slate-450 hidden sm:table-cell">
                        {patent.applicationNumber}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {patent.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center space-x-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus-ring text-xs"
                            onClick={() => handlePatentClick(patent.title, patent.link)}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>View Patent</span>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}