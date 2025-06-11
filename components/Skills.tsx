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
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Skills & Expertise</h2>
          <div className="w-24 h-1 gradient-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {domain === 'cs' 
              ? 'Modern technologies and frameworks I use to build exceptional software'
              : 'Engineering tools and methodologies I leverage for innovative mechanical solutions'
            }
          </p>
        </motion.div>

        <motion.div
          key={domain}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {domainData.skills.map((skillCategory, index) => (
            <motion.div key={skillCategory.category} variants={itemVariants}>
              <Card className="h-full hover:shadow-professional-lg transition-all duration-300 group hover:-translate-y-1 border-slate-200 bg-white">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {skillCategory.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: (index * 0.05) + (skillIndex * 0.02),
                        duration: 0.3 
                      }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group/skill will-change-transform"
                      onMouseEnter={() => handleSkillHover(skill)}
                    >
                      <TechLogo 
                        technology={skill} 
                        size="md"
                        className="flex-shrink-0"
                      />
                      <span className="text-sm font-medium text-slate-700 group-hover/skill:text-indigo-600 transition-colors">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="gradient-primary-light rounded-2xl p-8 border border-slate-200">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              {domain === 'cs' ? 'Always Learning' : 'Technical Excellence'}
            </h3>
            <p className="text-slate-600 max-w-2xl mx-auto mb-8">
              {domain === 'cs' 
                ? 'I stay current with the latest technologies and best practices, constantly expanding my skill set to deliver cutting-edge solutions.'
                : 'I embrace new technologies and methodologies to optimize designs and improve engineering efficiency.'
              }
            </p>
            
            {/* Featured Technology Showcase */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
              {featuredTechnologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.4,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-200 hover:scale-105 will-change-transform"
                >
                  <TechLogo technology={tech} size="lg" />
                  <span className="text-xs font-medium text-slate-600">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Skills.displayName = 'Skills';

export default Skills;