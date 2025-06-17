'use client';

import { motion } from 'framer-motion';
import { getPersonalData } from '@/lib/data-loader';
import { Github, Linkedin, Mail, Heart, Globe, Phone, MapPin } from 'lucide-react';
import { SiLeetcode, SiGooglescholar } from 'react-icons/si';
import { analytics } from '@/lib/analytics';
import { memo, useCallback } from 'react';

const Footer = memo(() => {
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
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                <span className="text-white font-bold text-lg">AS</span>
              </div>
              <span className="text-white font-semibold text-lg">
                {portfolioData.name}
              </span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              {portfolioData.bio}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{portfolioData.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{portfolioData.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${portfolioData.email}`}
                  className="hover:text-white transition-colors"
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
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="block text-slate-400 hover:text-white transition-colors focus-ring rounded"
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
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social) => (
                <motion.button
                  key={social.platform}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSocialClick(social.platform, social.url)}
                  className={`w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white ${social.color} transition-colors focus-ring`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <p>Available for freelance projects</p>
              <p>Remote or {portfolioData.location}</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-slate-800 mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm flex items-center space-x-2">
              <span>© {currentYear} {portfolioData.name}. Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>using Next.js & Tailwind CSS</span>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;