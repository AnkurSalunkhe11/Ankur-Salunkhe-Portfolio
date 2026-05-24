'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass border-b border-slate-200/60 dark:border-slate-800/60 bg-white/80 dark:bg-slate-950/80 transition-colors duration-200"
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
            {/* Domain Switch */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex items-center space-x-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 dark:border-slate-800 shadow-professional transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Wrench className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <Label htmlFor="domain-switch" className="text-xs text-slate-600 dark:text-slate-350 cursor-pointer font-semibold">
                  Mechanical
                </Label>
              </div>
              <Switch
                id="domain-switch"
                checked={domain === 'cs'}
                onCheckedChange={handleDomainSwitch}
                className="data-[state=checked]:bg-indigo-600"
              />
              <div className="flex items-center space-x-2">
                <Label htmlFor="domain-switch" className="text-xs text-slate-600 dark:text-slate-350 cursor-pointer font-semibold">
                  CS
                </Label>
                <Code className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </div>
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
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Portfolio Mode</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <Label htmlFor="mobile-domain-switch" className="text-xs text-slate-600 dark:text-slate-350 cursor-pointer">
                        Mechanical
                      </Label>
                    </div>
                    <Switch
                      id="mobile-domain-switch"
                      checked={domain === 'cs'}
                      onCheckedChange={handleDomainSwitch}
                      className="data-[state=checked]:bg-indigo-600"
                    />
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="mobile-domain-switch" className="text-xs text-slate-600 dark:text-slate-350 cursor-pointer">
                        CS
                      </Label>
                      <Code className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
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