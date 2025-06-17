'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getOptimizedImageUrl, imageConfigs, type ImageConfig } from '@/lib/images/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  type: keyof typeof imageConfigs;
  variant?: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
}

export default function OptimizedImage({
  src,
  alt,
  type,
  variant = 'mobile',
  className,
  priority = false,
  onLoad,
  onError,
  fallbackSrc
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const imgRef = useRef<HTMLDivElement>(null);

  const config = imageConfigs[type][variant as keyof typeof imageConfigs[typeof type]] as ImageConfig;
  
  const optimizedSrc = getOptimizedImageUrl(currentSrc, config);

  useEffect(() => {
    if (hasError && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setHasError(false);
    }
  }, [hasError, fallbackSrc, currentSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
    
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <div 
      ref={imgRef}
      className={cn(
        'relative overflow-hidden bg-slate-100',
        !isLoaded && 'animate-pulse',
        className
      )}
    >
      <Image
        src={optimizedSrc}
        alt={alt}
        width={config.width}
        height={config.height}
        priority={priority}
        quality={config.quality}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
        sizes={`
          (max-width: 640px) ${config.width}px,
          (max-width: 1024px) ${Math.round(config.width * 1.5)}px,
          ${config.width * 2}px
        `}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
      )}
    </div>
  );
}