'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getPersonalData, getDomainData } from '@/lib/data-loader';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Target, 
  Award, 
  Calendar, 
  MapPin, 
  TrendingUp,
  Code,
  Wrench,
  Brain,
  Zap,
  Users,
  CheckCircle
} from 'lucide-react';

export default function About() {
  const { domain } = usePortfolioStore();
  const personalData = getPersonalData();
  const domainData = getDomainData(domain);

  // Get domain-specific certifications (top 3 most recent)
  const domainCertifications = domain === 'cs' 
    ? (domainData.certifications?.slice(0, 3) || [])
    : (domainData.certifications?.slice(0, 3) || []);

  // Key achievements based on domain
  const achievements = domain === 'cs' 
    ? [
        { icon: Brain, label: 'AI & ML Certified', value: 'Stanford/DeepLearning.AI' },
        { icon: Code, label: 'Programming Languages', value: '5+ Languages' },
        { icon: TrendingUp, label: 'Projects Completed', value: '10+ Projects' }
      ]
    : [
        { icon: Award, label: 'Research Publications', value: '2 Published' },
        { icon: Wrench, label: 'Patents Granted', value: '3 Patents' },
        { icon: Zap, label: 'Thermal Systems', value: 'Expert Level' }
      ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-955 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6 font-display tracking-tight">About Me</h2>
          <div className="w-32 h-1.5 gradient-primary mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-slate-655 dark:text-slate-350 max-w-3xl mx-auto leading-relaxed">
            {domain === 'cs' 
              ? 'Bridging mechanical engineering principles with cutting-edge software development to create innovative solutions'
              : 'Passionate about sustainable energy solutions and thermal system optimization through advanced engineering'
            }
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main About Content */}
          <motion.div
            key={domain}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                {domainData.about}
              </p>

              {domain === 'cs' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/10 dark:to-purple-950/10 border-l-4 border-indigo-500 p-6 rounded-r-xl shadow-sm"
                >
                  <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-400 mb-3 flex items-center">
                    <Brain className="w-6 h-6 mr-2" />
                    My Unique Journey
                  </h3>
                  <p className="text-indigo-800 dark:text-indigo-350 leading-relaxed text-sm md:text-md">
                    As a Mechanical Engineering student with a passion for AI and software development, 
                    I bring a unique perspective to problem-solving. My engineering background provides 
                    analytical rigor, while my programming skills enable me to build scalable, efficient solutions. 
                    This interdisciplinary approach has led to innovative projects in numerical modeling, 
                    automation, and AI-powered applications.
                  </p>
                </motion.div>
              )}

              {domain === 'mechanical' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/10 dark:to-teal-950/10 border-l-4 border-emerald-500 p-6 rounded-r-xl shadow-sm"
                >
                  <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-450 mb-3 flex items-center">
                    <Zap className="w-6 h-6 mr-2" />
                    Research Impact
                  </h3>
                  <p className="text-emerald-800 dark:text-emerald-350 leading-relaxed text-sm md:text-md">
                    My research in thermal systems and waste heat recovery has resulted in published papers 
                    in Q1 journals and granted patents. I focus on sustainable energy solutions that can make 
                    a real-world impact, combining theoretical knowledge with practical implementation through 
                    advanced simulation and experimental validation.
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Key Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-professional border border-slate-100 dark:border-slate-800 hover:shadow-professional-lg transition-all duration-300"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    domain === 'cs' ? 'bg-indigo-100 dark:bg-indigo-950/40' : 'bg-emerald-100 dark:bg-emerald-950/40'
                  }`}>
                    <achievement.icon className={`w-8 h-8 ${
                      domain === 'cs' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-450'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{achievement.label}</h4>
                  <p className={`text-sm font-semibold ${
                    domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'
                  }`}>
                    {achievement.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Sidebar Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Education Card */}
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-405" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Education</h3>
                  </div>
                </div>
                {personalData.education.slice(0, 1).map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{edu.degree}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.school}</p>
                    <p className="text-slate-500 dark:text-slate-450 text-xs">{edu.location} • {edu.endDate}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="secondary" className="text-xs bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-350 border border-indigo-100/50 dark:border-indigo-900/20">
                        GPA: {edu.gpa}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Certifications Card */}
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950/40 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Certifications</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {domainCertifications.map((cert: any, index: number) => (
                    <div key={index} className="border-l-2 border-purple-200 dark:border-purple-900 pl-4 py-2">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">{cert.name}</h4>
                          <p className="text-slate-600 dark:text-slate-400 text-xs">{cert.issuer}</p>
                          <p className="text-slate-500 dark:text-slate-450 text-xs">{cert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Summary Card */}
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-emerald-600 dark:text-emerald-450" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Experience</h3>
                  </div>
                </div>
                {domainData.experience.slice(0, 1).map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white">{exp.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{exp.company}</p>
                    <p className="text-slate-500 dark:text-slate-450 text-xs flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" />
                      {exp.location}
                    </p>
                    <p className="text-slate-500 dark:text-slate-450 text-xs flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400 dark:text-slate-500" />
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="hover:shadow-professional-lg transition-all duration-300 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950/40 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Let's Connect</h3>
                  </div>
                </div>
                <p className="text-slate-605 dark:text-slate-400 text-sm mb-4">
                  Open to new opportunities, collaborations, and innovative projects
                </p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-850/60 text-slate-700 dark:text-slate-350 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  >
                    GitHub
                  </a>
                  <a 
                    href={`mailto:${personalData.email}`}
                    className="inline-flex items-center px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-350 text-xs font-semibold rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-950 transition-colors"
                  >
                    Email
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}