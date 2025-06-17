// Image optimization utilities
export interface ImageConfig {
  width: number;
  height: number;
  quality: number;
  format: 'webp' | 'avif' | 'jpeg';
}

// Optimal image configurations for different use cases
export const imageConfigs = {
  hero: {
    mobile: { width: 400, height: 400, quality: 85, format: 'webp' as const },
    tablet: { width: 600, height: 600, quality: 85, format: 'webp' as const },
    desktop: { width: 800, height: 800, quality: 90, format: 'webp' as const }
  },
  project: {
    thumbnail: { width: 400, height: 300, quality: 80, format: 'webp' as const },
    card: { width: 600, height: 400, quality: 85, format: 'webp' as const },
    detail: { width: 1200, height: 800, quality: 90, format: 'webp' as const }
  },
  background: {
    mobile: { width: 800, height: 600, quality: 75, format: 'webp' as const },
    desktop: { width: 1920, height: 1080, quality: 80, format: 'webp' as const }
  },
  icon: {
    small: { width: 32, height: 32, quality: 90, format: 'webp' as const },
    medium: { width: 64, height: 64, quality: 90, format: 'webp' as const },
    large: { width: 128, height: 128, quality: 90, format: 'webp' as const }
  }
} as const;

// Generate optimized image URL
export const getOptimizedImageUrl = (
  src: string, 
  config: ImageConfig,
  devicePixelRatio: number = 1
): string => {
  if (!src) return '';
  
  // Handle Pexels URLs
  if (src.includes('pexels.com')) {
    const actualWidth = Math.round(config.width * devicePixelRatio);
    const actualHeight = Math.round(config.height * devicePixelRatio);
    
    return `${src.split('?')[0]}?auto=compress&cs=tinysrgb&w=${actualWidth}&h=${actualHeight}&fit=crop&q=${config.quality}`;
  }
  
  // Handle local images - return as-is for now, but could be processed with Next.js Image
  return src;
};

// Get responsive image sources
export const getResponsiveImageSources = (src: string, type: keyof typeof imageConfigs) => {
  const configs = imageConfigs[type];
  
  return Object.entries(configs).map(([breakpoint, config]) => ({
    breakpoint,
    src: getOptimizedImageUrl(src, config),
    srcSet: [
      `${getOptimizedImageUrl(src, config, 1)} 1x`,
      `${getOptimizedImageUrl(src, config, 2)} 2x`
    ].join(', ')
  }));
};

// Preload critical images
export const preloadImage = (src: string, config: ImageConfig): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = getOptimizedImageUrl(src, config);
    link.onload = () => resolve();
    link.onerror = () => reject();
    
    document.head.appendChild(link);
  });
};

// Lazy loading intersection observer
export const createImageObserver = (callback: (entry: IntersectionObserverEntry) => void) => {
  if (typeof window === 'undefined') return null;
  
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1
    }
  );
};