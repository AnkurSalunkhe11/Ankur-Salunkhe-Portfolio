'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { getPersonalData } from '@/lib/data-loader';
import { analytics } from '@/lib/analytics';

export default function Resume() {
  const { domain } = usePortfolioStore();
  const personalData = getPersonalData();

  const handleDownload = () => {
    analytics.trackResumeDownload(domain);
    window.open(personalData.resume[domain], '_blank');
  };

  return (
    <section id="resume" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 space-y-3 text-left"
        >
          <span className={`text-xs font-mono font-medium tracking-tight ${
            domain === 'cs' ? 'text-indigo-605 dark:text-indigo-400' : 'text-emerald-605 dark:text-emerald-400'
          }`}>
            // CREDENTIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Curriculum Vitae
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Access my professional history, academic publications, and key technical capabilities in standard document formats.
          </p>
        </motion.div>

        <div className="relative p-8 md:p-12 rounded-2xl border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-955/20 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText className={`w-8 h-8 ${domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'}`} />
              </div>
              
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                  {domain === 'cs' ? 'Computer Science Resume' : 'Mechanical Engineering Resume'}
                </h3>
                <p className="text-sm text-slate-505 dark:text-slate-400 max-w-xl leading-relaxed font-medium">
                  {domain === 'cs' 
                    ? 'Download my software development focused resume showcasing programming projects, technical skills, and AI/ML expertise.'
                    : 'Download my engineering resume highlighting thermal systems expertise, research publications, and technical achievements.'
                  }
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
              <Button
                size="lg"
                className={`px-8 py-4 rounded-xl font-mono uppercase tracking-wider text-xs font-semibold focus-ring flex items-center space-x-2 transition-all duration-200 border w-full sm:w-auto justify-center ${
                  domain === 'cs'
                    ? 'border-indigo-500/30 dark:border-indigo-400/30 text-indigo-650 dark:text-indigo-400 hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10'
                    : 'border-emerald-500/30 dark:border-emerald-400/30 text-emerald-650 dark:text-emerald-400 hover:bg-emerald-500/10 dark:hover:bg-emerald-400/10'
                }`}
                onClick={handleDownload}
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}