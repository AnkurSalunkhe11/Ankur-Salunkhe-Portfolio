'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { getPersonalData } from '@/lib/data-loader';
import { Code, Wrench, Menu, X } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useState, memo, useCallback } from 'react';
import { Button } from '@/components/ui/button';

const Header = memo(() => {
  const { domain, setDomain } = usePortfolioStore();
  const personalData = getPersonalData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-glass border-b border-slate-200/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-professional">
              <span className="text-white font-bold text-lg">AS</span>
            </div>
            <span className="text-slate-800 font-semibold text-lg hidden sm:block">
              {personalData.name}
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                onClick={() => handleNavigation(item.label.toLowerCase())}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Domain Switch */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="hidden lg:flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200 shadow-professional"
          >
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-slate-500" />
              <Label htmlFor="domain-switch" className="text-sm text-slate-600 cursor-pointer font-medium">
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
              <Label htmlFor="domain-switch" className="text-sm text-slate-600 cursor-pointer font-medium">
                CS
              </Label>
              <Code className="w-4 h-4 text-slate-500" />
            </div>
          </motion.div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t border-slate-200/60 bg-white/95 backdrop-blur-sm"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                    onClick={() => handleNavigation(item.label.toLowerCase())}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile Domain Switch */}
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">Portfolio Mode</span>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Wrench className="w-4 h-4 text-slate-500" />
                      <Label htmlFor="mobile-domain-switch" className="text-sm text-slate-600 cursor-pointer">
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
                      <Label htmlFor="mobile-domain-switch" className="text-sm text-slate-600 cursor-pointer">
                        CS
                      </Label>
                      <Code className="w-4 h-4 text-slate-500" />
                    </div>
                  </div>
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