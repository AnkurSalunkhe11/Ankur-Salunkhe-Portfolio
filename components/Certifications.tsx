'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePortfolioStore } from '@/lib/store';
import { getDomainData } from '@/lib/data-loader';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  Building, 
  CheckCircle,
  Star,
  Trophy,
  Shield,
  Code,
  Wrench
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Certifications() {
  const { domain } = usePortfolioStore();
  const domainData = getDomainData(domain);

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

  const handleCertificationClick = (name: string, link?: string) => {
    analytics.trackEvent('certification_click', 'engagement', name);
    if (link) {
      window.open(link, '_blank');
    }
  };

  const getCertificationIcon = (name: string) => {
    const nameLower = name.toLowerCase();
    const colorClass = domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450';
    if (nameLower.includes('aws') || nameLower.includes('cloud')) {
      return <Shield className={`w-6 h-6 ${colorClass}`} />;
    }
    if (nameLower.includes('machine learning') || nameLower.includes('ai')) {
      return <Star className={`w-6 h-6 ${colorClass}`} />;
    }
    if (nameLower.includes('python') || nameLower.includes('programming') || nameLower.includes('javascript')) {
      return <Code className={`w-6 h-6 ${colorClass}`} />;
    }
    if (nameLower.includes('ansys') || nameLower.includes('solidworks') || nameLower.includes('cfd') || nameLower.includes('matlab')) {
      return <Wrench className={`w-6 h-6 ${colorClass}`} />;
    }
    if (nameLower.includes('professional') || nameLower.includes('certified')) {
      return <Trophy className={`w-6 h-6 ${colorClass}`} />;
    }
    return <Award className={`w-6 h-6 ${colorClass}`} />;
  };

  return (
    <section id="certifications" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
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
            // CERTIFICATIONS & CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Professional Credentials
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Validated expertise and continuous learning in {domain === 'cs' ? 'software development, AI, and programming technologies.' : 'engineering tools, simulation software, and technical methodologies.'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(domainData.certifications || []).map((certification: any, index: number) => (
            <motion.div key={certification.name} variants={itemVariants}>
              <Card className="h-full group hover:shadow-professional-xl transition-all duration-300 hover:-translate-y-2 border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 overflow-hidden flex flex-col justify-between rounded-2xl">
                <div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        {getCertificationIcon(certification.name)}
                      </div>
                      <Badge className="text-[10px] font-mono font-medium bg-slate-50/50 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border border-slate-200/30 dark:border-slate-800 shadow-none">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                    <CardTitle className={`text-lg font-bold text-slate-900 dark:text-white transition-colors leading-tight line-clamp-2 ${
                      domain === 'cs' ? 'group-hover:text-indigo-650 dark:group-hover:text-indigo-400' : 'group-hover:text-emerald-650 dark:group-hover:text-emerald-400'
                    }`}>
                      {certification.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm text-slate-605 dark:text-slate-400">
                        <Building className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500" />
                        <span className="font-semibold">{certification.issuer}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-sm text-slate-605 dark:text-slate-400">
                        <Calendar className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500" />
                        <span>Issued: {certification.date}</span>
                      </div>
 
                      {certification.credentialId && (
                        <div className="bg-slate-50/30 dark:bg-slate-950/20 rounded-xl p-3 border border-slate-200/40 dark:border-slate-900">
                          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1 font-semibold">Credential ID</p>
                          <p className="text-xs font-mono text-slate-700 dark:text-slate-350 break-all font-semibold">{certification.credentialId}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </div>
                
                <CardContent className="pt-0">
                  {certification.link && (
                    <Button
                      size="sm"
                      className={`w-full flex items-center justify-center space-x-2 border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:bg-transparent text-slate-700 dark:text-slate-350 transition-all focus-ring text-xs font-semibold rounded-xl group/btn ${
                        domain === 'cs'
                          ? 'hover:text-indigo-650 dark:hover:text-indigo-400 hover:border-indigo-650/40 dark:hover:border-indigo-400/40'
                          : 'hover:text-emerald-650 dark:hover:text-emerald-400 hover:border-emerald-650/40 dark:hover:border-emerald-400/40'
                      }`}
                      onClick={() => handleCertificationClick(certification.name, certification.link)}
                    >
                      <ExternalLink className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      <span>View Certificate</span>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}