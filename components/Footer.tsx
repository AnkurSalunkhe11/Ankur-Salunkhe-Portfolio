'use client';

import { motion } from 'framer-motion';
import { getPersonalData } from '@/lib/data-loader';
import { Github, Linkedin, Mail, Heart, Globe, Phone, MapPin } from 'lucide-react';
import { SiLeetcode, SiGooglescholar, SiMedium } from 'react-icons/si';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';
import { usePortfolioStore } from '@/lib/store';

const Footer = memo(() => {
  const { domain } = usePortfolioStore();
  const portfolioData = getPersonalData();
  const currentYear = new Date().getFullYear();

  const handleSocialClick = useCallback((platform: string, url: string) => {
    analytics.trackSocialClick(platform);
    window.open(url, '_blank');
  }, []);

  const handleNavigation = useCallback((section: string) => {
    analytics.trackNavigation(section);
  }, []);

  const socialLinks = [
    {
      icon: Github,
      url: portfolioData.github,
      platform: 'github',
      color: 'hover:bg-slate-700'
    },
    {
      icon: Linkedin,
      url: portfolioData.linkedin,
      platform: 'linkedin',
      color: 'hover:bg-blue-600'
    },
    {
      icon: SiLeetcode,
      url: portfolioData.leetcode,
      platform: 'leetcode',
      color: 'hover:bg-orange-500'
    },
    ...(portfolioData.medium ? [{
      icon: SiMedium,
      url: portfolioData.medium,
      platform: 'medium',
      color: 'hover:bg-green-600'
    }] : []),
    {
      icon: SiGooglescholar,
      url: portfolioData.twitter, // Using the twitter field for Google Scholar URL
      platform: 'google-scholar',
      color: 'hover:bg-blue-500'
    },
    {
      icon: Globe,
      url: portfolioData.website,
      platform: 'website',
      color: 'hover:bg-emerald-600'
    },
    {
      icon: Mail,
      url: `mailto:${portfolioData.email}`,
      platform: 'email',
      color: 'hover:bg-red-600'
    }
  ];

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-background border-t border-slate-200/40 dark:border-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white dark:text-slate-900 font-bold text-lg">AS</span>
              </div>
              <span className="text-slate-905 dark:text-white font-semibold text-lg font-sans">
                {portfolioData.name}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md text-sm leading-relaxed font-medium">
              {portfolioData.bio}
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-medium">
                <MapPin className={`w-4 h-4 ${domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'}`} />
                <span>{portfolioData.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-medium">
                <Phone className={`w-4 h-4 ${domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'}`} />
                <span>{portfolioData.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-medium">
                <Mail className={`w-4 h-4 ${domain === 'cs' ? 'text-indigo-650 dark:text-indigo-400' : 'text-emerald-650 dark:text-emerald-450'}`} />
                <a 
                  href={`mailto:${portfolioData.email}`}
                  className={`hover:underline transition-colors ${
                    domain === 'cs' ? 'hover:text-indigo-650 dark:hover:text-indigo-400' : 'hover:text-emerald-650 dark:hover:text-emerald-400'
                  }`}
                  onClick={() => analytics.trackSocialClick('email')}
                >
                  {portfolioData.email}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-slate-900 dark:text-white font-semibold text-xs font-mono uppercase tracking-wider mb-4">Quick Links</h3>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className={`block text-sm font-medium text-slate-500 dark:text-slate-400 hover:underline transition-colors focus-ring rounded ${
                    domain === 'cs' ? 'hover:text-indigo-650 dark:hover:text-indigo-400' : 'hover:text-emerald-650 dark:hover:text-emerald-400'
                  }`}
                  onClick={() => handleNavigation(link.label.toLowerCase())}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-slate-900 dark:text-white font-semibold text-xs font-mono uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.platform}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick(social.platform, social.url)}
                  className={`w-10 h-10 bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-900 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 transition-colors focus-ring ${
                    domain === 'cs'
                      ? 'hover:text-indigo-650 dark:hover:text-indigo-400 hover:border-indigo-650/40 dark:hover:border-indigo-400/40'
                      : 'hover:text-emerald-650 dark:hover:text-emerald-400 hover:border-emerald-650/40 dark:hover:border-emerald-400/40'
                  }`}
                >
                  <social.icon className="w-4.5 h-4.5" />
                </motion.button>
              ))}
            </div>
            <div className="space-y-1.5 text-xs font-mono text-slate-400 dark:text-slate-500">
              <p>// Available for freelance projects</p>
              <p>// Remote or {portfolioData.location}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-200/40 dark:border-slate-900 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-450 dark:text-slate-500 text-xs flex items-center space-x-2 font-mono">
              <span>© {currentYear} {portfolioData.name}. Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;;