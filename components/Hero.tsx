'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getPersonalData, getDomainData } from '@/lib/data-loader';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Globe, Twitter } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';
import { getHeroImage } from '@/lib/images';

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
    {
      icon: Twitter,
      url: personalData.twitter,
      platform: 'twitter',
      color: 'hover:text-blue-400'
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

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={domain}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="space-y-2"
            >
              <p className="text-lg text-slate-600 font-medium">
                Hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                <span className="gradient-text">
                  {personalData.name}
                </span>
              </h1>
              <p className="text-xl text-slate-600 font-medium">
                {personalData.title}
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl sm:text-2xl text-slate-600 leading-relaxed"
            >
              {domainData.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="gradient-primary text-white px-8 py-4 rounded-xl font-semibold btn-hover-lift focus-ring"
                onClick={() => handleNavigation('projects')}
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold btn-hover-lift focus-ring"
                onClick={() => handleNavigation('contact')}
              >
                Get In Touch
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex space-x-6 pt-4"
            >
              {socialLinks.map((social) => (
                <motion.button
                  key={social.platform}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={social.onClick || (() => handleSocialClick(social.platform, social.url))}
                  className={`text-slate-500 ${social.color} transition-all duration-200 focus-ring rounded-lg p-2`}
                >
                  <social.icon className="w-6 h-6" />
                </motion.button>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full gradient-primary opacity-20 blur-xl"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <img
                  src={getHeroImage(domain)}
                  alt={personalData.name}
                  className="w-64 h-64 sm:w-80 sm:h-80 rounded-full object-cover border-4 border-white shadow-professional-xl"
                  loading="eager"
                />
                {/* Status indicator */}
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-lg">
                  <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="cursor-pointer focus-ring rounded-lg p-2"
            onClick={() => handleNavigation('about')}
          >
            <ArrowDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;