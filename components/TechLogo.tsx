'use client';

import { memo } from 'react';
import { techLogos, techColors } from '@/lib/images/icons';
import { Code } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getPersonalData } from '@/lib/data-loader';

interface TechLogoProps {
  technology: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showLabel?: boolean;
  className?: string;
}

const TechLogo = memo<TechLogoProps>(({ 
  technology, 
  size = 'md', 
  showLabel = false, 
  className 
}) => {
  const personalData = getPersonalData();
  const customLogos = (personalData as any).customLogos || {};
  
  // Determine if there is a dynamic logo override configured in personal-data.json,
  // or if the technology value itself is a raw image path/URL
  const customLogoUrl = customLogos[technology] || 
    (technology.startsWith('http://') || technology.startsWith('https://') || technology.startsWith('/')
      ? technology 
      : null);

  const LogoComponent = techLogos[technology] || Code;
  const color = techColors[technology];
  
  // Improved large screen scaling support for high-resolution displays
  const sizeClasses = {
    sm: 'w-4 h-4 md:w-5 h-5',
    md: 'w-6 h-6 md:w-7 h-7 lg:w-8 h-8',
    lg: 'w-8 h-8 md:w-10 h-10 lg:w-12 h-12',
    xl: 'w-12 h-12 md:w-16 h-16',
    '2xl': 'w-16 h-16 md:w-20 h-20'
  };

  const containerSizeClasses = {
    sm: showLabel ? 'flex items-center space-x-1.5' : 'inline-block',
    md: showLabel ? 'flex items-center space-x-2' : 'inline-block',
    lg: showLabel ? 'flex items-center space-x-3' : 'inline-block',
    xl: showLabel ? 'flex items-center space-x-4' : 'inline-block',
    '2xl': showLabel ? 'flex items-center space-x-4' : 'inline-block'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm font-medium',
    lg: 'text-base font-semibold',
    xl: 'text-lg font-bold',
    '2xl': 'text-xl font-bold'
  };

  return (
    <div className={cn(containerSizeClasses[size], 'align-middle', className)}>
      {customLogoUrl ? (
        // Dynamic HTML logo loading support
        <img
          src={customLogoUrl}
          alt={`${technology} logo`}
          className={cn(
            sizeClasses[size],
            'object-contain transition-all duration-300 hover:scale-110'
          )}
          loading="lazy"
        />
      ) : (
        // Fallback vector icon loading support
        <LogoComponent 
          className={cn(
            sizeClasses[size],
            'transition-all duration-300 hover:scale-110'
          )}
          style={{ color: color || 'currentColor' }}
          aria-label={`${technology} logo`}
        />
      )}
      
      {showLabel && (
        <span className={cn(
          textSizeClasses[size],
          'text-gray-700 dark:text-gray-300 transition-colors'
        )}>
          {technology}
        </span>
      )}
    </div>
  );
});

TechLogo.displayName = 'TechLogo';

export default TechLogo;