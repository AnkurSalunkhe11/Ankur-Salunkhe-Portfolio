'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getDomainData } from '@/lib/data-loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TechLogo from '@/components/TechLogo';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';

const Skills = memo(() => {
  const { domain } = usePortfolioStore();
  const domainData = getDomainData(domain);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  const handleSkillHover = useCallback((skill: string) => {
    analytics.trackSkillHover(skill, domain);
  }, [domain]);

  // Featured technologies for the showcase section
  const featuredTechnologies = domain === 'cs' 
    ? ['Python', 'JavaScript', 'React', 'MATLAB', 'Pandas', 'Git']
    : ['SolidWorks', 'ANSYS', 'CFD', 'Heat Transfer', 'AutoCAD', 'Python'];

  return (
    <section id="skills" className="py-24 bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
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
            // STACK & TOOLS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans">
            Technical Expertise
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            {domain === 'cs' 
              ? 'A curated stack of modern programming languages, libraries, and DevOps workflows utilized for software engineering.'
              : 'Rigorous analytical tools, computational suites, and physical standards leveraged for mechanical systems design.'
            }
          </p>
        </motion.div>

        <motion.div
          key={domain}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {domainData.skills.map((skillCategory, index) => (
            <motion.div 
              key={skillCategory.category} 
              variants={itemVariants}
              className="relative p-6 rounded-2xl border border-slate-200/40 dark:border-slate-900 bg-white/40 dark:bg-slate-950/20 hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {skillCategory.category}
                </h3>
                <span className="text-[10px] font-mono text-slate-350 dark:text-slate-700">
                  [{String(index + 1).padStart(2, '0')}]
                </span>
              </div>
              
              <div className="space-y-3">
                {skillCategory.items.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: (index * 0.04) + (skillIndex * 0.02),
                      duration: 0.25 
                    }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3 p-1.5 rounded-lg transition-colors group/skill cursor-default"
                    onMouseEnter={() => handleSkillHover(skill)}
                  >
                    <TechLogo 
                      technology={skill} 
                      size="md"
                      className="flex-shrink-0"
                    />
                    <span className={`text-sm font-medium text-slate-600 dark:text-slate-350 transition-colors duration-150 ${
                      domain === 'cs' 
                        ? 'group-hover/skill:text-indigo-650 dark:group-hover/skill:text-indigo-400' 
                        : 'group-hover/skill:text-emerald-650 dark:group-hover/skill:text-emerald-400'
                    }`}>
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-slate-50/30 dark:bg-slate-950/20 border border-slate-200/40 dark:border-slate-900 rounded-2xl p-8 transition-all duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 space-y-2">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                  {domain === 'cs' ? 'Always Learning' : 'Technical Rigor'}
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {domain === 'cs' 
                    ? 'Constantly expanding paradigms into low-latency algorithms, full-stack responsiveness, and intelligent neural structures.'
                    : 'Adhering strictly to standard engineering validation guidelines, thermal optimizations, and advanced grid meshing.'
                  }
                </p>
              </div>
              
              {/* Featured Technology Showcase */}
              <div className="md:col-span-2 flex flex-wrap gap-4 justify-start md:justify-end items-center">
                {featuredTechnologies.map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: index * 0.03,
                      duration: 0.3
                    }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 hover:border-slate-350 dark:hover:border-slate-700 shadow-sm transition-all duration-200 hover:scale-[1.02]"
                  >
                    <TechLogo technology={tech} size="sm" />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;