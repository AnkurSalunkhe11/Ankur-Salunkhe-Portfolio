'use client';

import { memo } from 'react';
import { techLogos, techColors } from '@/lib/images/icons';
import { Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TechLogoProps {
  technology: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const TechLogo = memo<TechLogoProps>(({ 
  technology, 
  size = 'md', 
  showLabel = false, 
  className 
}) => {
  const LogoComponent = techLogos[technology] || Code;
  const color = techColors[technology];
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const containerSizeClasses = {
    sm: showLabel ? 'flex items-center space-x-1' : '',
    md: showLabel ? 'flex items-center space-x-2' : '',
    lg: showLabel ? 'flex items-center space-x-3' : ''
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className={cn(containerSizeClasses[size], className)}>
      <LogoComponent 
        className={cn(
          sizeClasses[size],
          'transition-all duration-200 hover:scale-110'
        )}
        style={{ color: color || 'currentColor' }}
        aria-label={`${technology} logo`}
      />
      {showLabel && (
        <span className={cn(
          textSizeClasses[size],
          'font-medium text-gray-700 dark:text-gray-300'
        )}>
          {technology}
        </span>
      )}
    </div>
  );
});

TechLogo.displayName = 'TechLogo';

export default TechLogo;