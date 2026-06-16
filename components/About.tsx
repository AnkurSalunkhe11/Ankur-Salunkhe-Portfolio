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
    <section id="about" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 space-y-3"
        >
          <span className={`text-xs font-mono font-medium tracking-tight ${
            domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-400'
          }`}>
            // PROFILE SUMMARY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {domain === 'cs' 
              ? 'Bridging mechanical engineering principles with cutting-edge software development to create innovative solutions.'
              : 'Passionate about sustainable energy solutions and thermal system optimization through advanced engineering.'
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
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-6 font-medium">
                {domainData.about}
              </p>

              {domain === 'cs' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="bg-slate-50/30 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-900 border-l-2 border-l-indigo-500/80 p-6 rounded-r-xl shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center font-sans">
                    <Brain className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                    My Unique Journey
                  </h3>
                  <p className="text-slate-600 dark:text-slate-350 leading-relaxed text-sm font-medium">
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
                  className="bg-slate-50/30 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-900 border-l-2 border-l-emerald-500/80 p-6 rounded-r-xl shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center font-sans">
                    <Zap className="w-5 h-5 mr-2 text-emerald-600 dark:text-emerald-450" />
                    Research Impact
                  </h3>
                  <p className="text-slate-600 dark:text-slate-355 leading-relaxed text-sm font-medium">
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
                  className="p-6 bg-white/40 dark:bg-slate-950/20 rounded-2xl border border-slate-200/40 dark:border-slate-900 hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 flex flex-col items-start"
                >
                  <div className={`w-10 h-10 mb-4 rounded-xl flex items-center justify-center border ${
                    domain === 'cs' 
                      ? 'bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-150/30 dark:border-indigo-900/20' 
                      : 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-150/20 dark:border-emerald-900/20'
                  }`}>
                    <achievement.icon className={`w-5 h-5 ${
                      domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'
                    }`} />
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2 text-sm font-sans">{achievement.label}</h4>
                  <p className={`text-sm font-bold font-mono ${
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
            <Card className="border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-150/30 dark:border-indigo-900/20 rounded-xl flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-indigo-650 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Education</h3>
                  </div>
                </div>
                {personalData.education.slice(0, 1).map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{edu.degree}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{edu.school}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] font-mono">{edu.location} • {edu.endDate}</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <Badge variant="secondary" className="text-[10px] font-mono font-medium bg-indigo-50/20 dark:bg-indigo-955/10 text-indigo-705 dark:text-indigo-400 border border-indigo-150/20 dark:border-indigo-900/20">
                        GPA: {edu.gpa}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Certifications Card */}
            <Card className="border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    domain === 'cs' 
                      ? 'bg-indigo-50/30 dark:bg-indigo-950/10 border-indigo-150/30 dark:border-indigo-900/20' 
                      : 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-150/20 dark:border-emerald-900/20'
                  }`}>
                    <Award className={`w-5 h-5 ${
                      domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Recent Certifications</h3>
                  </div>
                </div>
                <div className="space-y-4">
                  {domainCertifications.map((cert: any, index: number) => (
                    <div 
                      key={index} 
                      className={`border-l pl-4 py-1 ${
                        domain === 'cs' ? 'border-indigo-200/80 dark:border-indigo-900/60' : 'border-emerald-200/80 dark:border-emerald-900/60'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                          domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white text-xs leading-tight">{cert.name}</h4>
                          <p className="text-slate-500 dark:text-slate-400 text-[11px] font-medium">{cert.issuer}</p>
                          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-mono">{cert.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Experience Summary Card */}
            <Card className="border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-150/30 dark:border-emerald-900/20 rounded-xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-emerald-650 dark:text-emerald-450" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Experience</h3>
                  </div>
                </div>
                {domainData.experience.slice(0, 1).map((exp, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">{exp.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{exp.company}</p>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center font-mono">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {exp.location}
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-[11px] flex items-center font-mono">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-350 dark:hover:border-slate-800 transition-all duration-300 rounded-2xl overflow-hidden shadow-none">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-10 h-10 bg-blue-50/30 dark:bg-blue-950/10 border border-blue-150/30 dark:border-blue-900/20 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-650 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Let's Connect</h3>
                  </div>
                </div>
                <p className="text-slate-505 dark:text-slate-450 text-xs mb-4 font-medium">
                  Open to new opportunities, collaborations, and innovative projects.
                </p>
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={personalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a 
                    href={personalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
                  >
                    GitHub
                  </a>
                  <a 
                    href={`mailto:${personalData.email}`}
                    className="inline-flex items-center px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-900 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors"
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