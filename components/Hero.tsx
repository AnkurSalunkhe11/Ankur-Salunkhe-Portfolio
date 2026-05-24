'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getPersonalData, getDomainData } from '@/lib/data-loader';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Globe, GraduationCap } from 'lucide-react';
import { SiLeetcode, SiGooglescholar, SiMedium } from 'react-icons/si';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';
import OptimizedImage from '@/components/ui/optimized-image';
import { getImageConfig } from '@/lib/images/image-config-optimized';

const Hero = memo(() => {
  const { domain } = usePortfolioStore();
  const personalData = getPersonalData();
  const domainData = getDomainData(domain);

  const handleSocialClick = useCallback((platform: string, url: string) => {
    analytics.trackSocialClick(platform);
    window.open(url, '_blank');
  }, []);

  const handleEmailClick = useCallback(() => {
    analytics.trackSocialClick('email');
    window.location.href = `mailto:${personalData.email}`;
  }, [personalData.email]);

  const handleNavigation = useCallback((section: string) => {
    analytics.trackNavigation(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const socialLinks = [
    {
      icon: Github,
      url: personalData.github,
      platform: 'github',
      color: 'hover:text-slate-700'
    },
    {
      icon: Linkedin,
      url: personalData.linkedin,
      platform: 'linkedin',
      color: 'hover:text-blue-600'
    },
    {
      icon: SiLeetcode,
      url: personalData.leetcode,
      platform: 'leetcode',
      color: 'hover:text-orange-500'
    },
    ...(personalData.medium ? [{
      icon: SiMedium,
      url: personalData.medium,
      platform: 'medium',
      color: 'hover:text-emerald-600 dark:hover:text-emerald-400'
    }] : []),
    {
      icon: SiGooglescholar,
      url: personalData.twitter, // Using the twitter field for Google Scholar URL
      platform: 'google-scholar',
      color: 'hover:text-blue-500'
    },
    {
      icon: Globe,
      url: personalData.website,
      platform: 'website',
      color: 'hover:text-emerald-600'
    },
    {
      icon: Mail,
      url: `mailto:${personalData.email}`,
      platform: 'email',
      color: 'hover:text-red-600',
      onClick: handleEmailClick
    }
  ];

  const heroImageConfig = getImageConfig(domain, 'hero');

  return (
    <section id="home" className="min-h-screen flex items-center bg-slate-50 dark:bg-slate-950 pt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={domain}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                domain === 'cs'
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-400 border-indigo-100 dark:border-indigo-900/30'
                  : 'bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
              }`}>
                {domain === 'cs' ? 'Software Engineering & AI' : 'Mechanical Systems & CFD'}
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight font-sans">
                I'm <span className={domain === 'cs' ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'}>
                  {personalData.name}
                </span>
              </h1>
              
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                {personalData.title}
              </p>
            </div>

            <p className="text-lg sm:text-xl text-slate-650 dark:text-slate-350 leading-relaxed max-w-xl">
              {domainData.tagline}
            </p>

            {/* Elegant, Horizontal Social Shortcuts Bar */}
            <div className="flex flex-wrap gap-4 pt-2">
              {socialLinks.map((social) => (
                <button
                  key={social.platform}
                  onClick={social.onClick || (() => handleSocialClick(social.platform, social.url))}
                  className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors duration-200 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-3 py-1.5 rounded-lg shadow-sm focus-ring"
                >
                  <social.icon className="w-3.5 h-3.5" />
                  <span className="capitalize font-medium">{social.platform.replace('-', ' ')}</span>
                </button>
              ))}
            </div>

            {/* Clean, Muted Call to Actions (CTAs) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 text-white dark:text-slate-900 shadow-sm border ${
                  domain === 'cs'
                    ? 'bg-indigo-600 hover:bg-indigo-700 border-indigo-600 dark:bg-white dark:hover:bg-slate-100 dark:border-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:bg-white dark:hover:bg-slate-100 dark:border-white'
                }`}
                onClick={() => handleNavigation('projects')}
              >
                View Engineering Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-900/50 px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-sm"
                onClick={() => handleNavigation('contact')}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>

          {/* Premium Image Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white dark:bg-slate-900 p-2.5 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
                <OptimizedImage
                  src={heroImageConfig.src}
                  alt={heroImageConfig.alt}
                  type="hero"
                  variant="desktop"
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl object-cover"
                  priority={true}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <button
            className="cursor-pointer focus-ring rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            onClick={() => handleNavigation('about')}
            aria-label="Scroll to About"
          >
            <ArrowDown className="w-5 h-5 text-slate-400 dark:text-slate-500 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;