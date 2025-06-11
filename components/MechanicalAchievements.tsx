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
import { getProjectImage } from '@/lib/images';

export default function MechanicalAchievements() {
  const mechanicalData = getDomainData('mechanical');
  const { publications, detailedProjects, patents } = mechanicalData as any;

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
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'published':
        return <Eye className="w-4 h-4 text-indigo-600" />;
      case 'filed':
      case 'under review':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-slate-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'granted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'published':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'filed':
      case 'under review':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
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

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Mechanical Engineering Achievements</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A comprehensive showcase of research publications, engineering projects, and patent innovations
          </p>
        </motion.div>

        {/* Publications Section */}
        {publications && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Publications</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {publications.map((publication: any, index: number) => (
                <motion.div key={publication.title} variants={itemVariants}>
                  <Card className="hover:shadow-professional-lg transition-all duration-300 group border-slate-200 bg-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                            {publication.title}
                          </h4>
                          <p className="text-emerald-600 font-medium mb-2">{publication.journal}</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{publication.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2 text-slate-500 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>{publication.year}</span>
                            </div>
                          </div>
                          {publication.doi && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-2 border-slate-300 hover:bg-slate-50 focus-ring"
                              onClick={() => handlePublicationClick(publication.title, publication.doi)}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View</span>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Detailed Projects Section */}
        {detailedProjects && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Engineering Projects</h3>
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
                  <Card className="h-full group hover:shadow-professional-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border-slate-200 bg-white">
                    <div className="relative overflow-hidden">
                      <img
                        src={getProjectImage('mechanical', project.title)}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-slate-600 leading-relaxed text-sm">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech: string) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="text-xs bg-indigo-100 text-indigo-800 border border-indigo-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4" />
                          <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{project.team}</span>
                        </div>
                      </div>
                      
                      {project.link && (
                        <Button
                          size="sm"
                          className="w-full flex items-center justify-center space-x-2 gradient-primary text-white btn-hover-lift focus-ring"
                          onClick={() => handleProjectClick(project.title, project.link)}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>View Report</span>
                        </Button>
                      )}
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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Patents</h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {patents.map((patent: any, index: number) => (
                <motion.div key={patent.title} variants={itemVariants}>
                  <Card className="hover:shadow-professional-lg transition-all duration-300 group border-slate-200 bg-white">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-start space-x-3 mb-3">
                            <div className="flex-shrink-0 mt-1">
                              {getStatusIcon(patent.status)}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">
                                {patent.title}
                              </h4>
                              <div className="flex flex-wrap items-center gap-3 mb-2">
                                <Badge className={`text-xs border ${getStatusColor(patent.status)}`}>
                                  {patent.status}
                                </Badge>
                                {patent.patentNumber && (
                                  <span className="text-sm text-slate-600 font-mono">
                                    {patent.patentNumber}
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-600 text-sm leading-relaxed mb-2">
                                {patent.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span>Application: {patent.applicationNumber}</span>
                                <span>Filed: {patent.year}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {patent.link && (
                          <div className="flex-shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-2 border-slate-300 hover:bg-slate-50 focus-ring"
                              onClick={() => handlePatentClick(patent.title, patent.link)}
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>View Patent</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}