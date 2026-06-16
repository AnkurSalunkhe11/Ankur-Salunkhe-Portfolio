'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { getPersonalData } from '@/lib/data-loader';
import { Code, Wrench, Menu, X, Sun, Moon } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useState, useEffect, memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const Header = memo(() => {
  const { domain, setDomain } = usePortfolioStore();
  const { theme, setTheme } = useTheme();
  const personalData = getPersonalData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration safety to prevent theme mismatch mismatch warnings
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDomainSwitch = useCallback((checked: boolean) => {
    const newDomain = checked ? 'cs' : 'mechanical';
    analytics.trackDomainSwitch(domain, newDomain);
    setDomain(newDomain);
  }, [domain, setDomain]);

  const handleNavigation = useCallback((section: string) => {
    analytics.trackNavigation(section);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-900 bg-white/75 dark:bg-slate-950/75 transition-all duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-professional">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <span className="text-slate-800 dark:text-slate-200 font-semibold text-lg hidden sm:block">
              {personalData.name}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-slate-600 dark:text-slate-350 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium text-sm"
                onClick={() => handleNavigation(item.label.toLowerCase())}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls (Desktop Switch + Theme Switcher + Dashboard Link) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Segmented Control Switcher */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="relative flex items-center bg-slate-100 dark:bg-slate-900/60 rounded-full p-1 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <button
                onClick={() => handleDomainSwitch(false)}
                className={`relative flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                  domain === 'mechanical' 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {domain === 'mechanical' && (
                  <motion.div
                    layoutId="activeDomainPill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Wrench className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Mechanical Systems</span>
              </button>

              <button
                onClick={() => handleDomainSwitch(true)}
                className={`relative flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 ${
                  domain === 'cs' 
                    ? 'text-slate-900 dark:text-white' 
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {domain === 'cs' && (
                  <motion.div
                    layoutId="activeDomainPill"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Code className="w-3.5 h-3.5 relative z-10" />
                <span className="relative z-10">Software & AI</span>
              </button>
            </motion.div>

            {/* Theme Toggle Button */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-9 h-9 p-0 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus-ring"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4.5 h-4.5 text-amber-500" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-indigo-600" />
                )}
              </Button>
            )}

            {/* Recruiter Dashboard Shortcut */}
            <a 
              href="/admin"
              className="text-xs font-semibold px-3 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors shadow-sm focus-ring"
            >
              Dashboard
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Theme Toggle on mobile navbar directly */}
            {mounted && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full w-8 h-8 p-0 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-500" />
                ) : (
                  <Moon className="w-4 h-4 text-indigo-600" />
                )}
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-slate-700 dark:text-slate-300"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-200/60 dark:border-slate-800/60 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
                    onClick={() => handleNavigation(item.label.toLowerCase())}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Controls Row */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-350">Portfolio Focus</span>
                  <div className="relative flex items-center bg-slate-100 dark:bg-slate-900 rounded-full p-1 border border-slate-200 dark:border-slate-800 shadow-sm w-full">
                    <button
                      onClick={() => handleDomainSwitch(false)}
                      className={`relative flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none ${
                        domain === 'mechanical' 
                          ? 'text-slate-900 dark:text-white' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {domain === 'mechanical' && (
                        <motion.div
                          layoutId="activeDomainPillMobile"
                          className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Wrench className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Mechanical</span>
                    </button>

                    <button
                      onClick={() => handleDomainSwitch(true)}
                      className={`relative flex-1 flex items-center justify-center space-x-2 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 focus:outline-none ${
                        domain === 'cs' 
                          ? 'text-slate-900 dark:text-white' 
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {domain === 'cs' && (
                        <motion.div
                          layoutId="activeDomainPillMobile"
                          className="absolute inset-0 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200/50 dark:border-slate-700/50 z-0"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <Code className="w-3.5 h-3.5 relative z-10" />
                      <span className="relative z-10">Software/AI</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Admin Dashboard</span>
                  <a 
                    href="/admin"
                    className="text-xs font-semibold px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    Open Dashboard
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
});

Header.displayName = 'Header';

export default Header;