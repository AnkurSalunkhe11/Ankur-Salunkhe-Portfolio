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
    <section id="resume" className="py-20 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4 font-display tracking-tight">Resume</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-8"></div>
          
          <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-950 rounded-2xl p-12 border border-slate-200 dark:border-slate-800 transition-colors">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-6"
            >
              <div className={`w-20 h-20 ${domain === 'cs' ? 'bg-indigo-100 dark:bg-indigo-950/40' : 'bg-emerald-100 dark:bg-emerald-950/40'} rounded-full flex items-center justify-center`}>
                <FileText className={`w-10 h-10 ${domain === 'cs' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-450'}`} />
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {domain === 'cs' ? 'Computer Science Resume' : 'Mechanical Engineering Resume'}
                </h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  {domain === 'cs' 
                    ? 'Download my software development focused resume showcasing programming projects, technical skills, and AI/ML expertise'
                    : 'Download my engineering resume highlighting thermal systems expertise, research publications, and technical achievements'
                  }
                </p>
              </div>

              <Button
                size="lg"
                className={`${domain === 'cs' ? 'gradient-primary' : 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-650'} text-white px-8 py-4 rounded-xl font-semibold btn-hover-lift focus-ring flex items-center space-x-3 text-lg`}
                onClick={handleDownload}
              >
                <Download className="w-6 h-6" />
                <span>Download Resume</span>
              </Button>

              <div className="text-sm text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-200/50 dark:border-slate-800/50">
                Currently viewing: <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {domain === 'cs' ? 'Computer Science' : 'Mechanical Engineering'}
                </span> portfolio
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}