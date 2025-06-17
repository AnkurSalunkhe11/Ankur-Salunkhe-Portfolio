// Central image management and helper functions
import { imageConfig, getImage, getHeroImage, getProjectImage, getBackgroundImage, getSectionImage } from './image-config';
import type { PortfolioDomain } from '@/lib/data-loader';

// Re-export everything from image-config for easy access
export { 
  imageConfig, 
  getImage, 
  getHeroImage, 
  getProjectImage, 
  getBackgroundImage, 
  getSectionImage 
};

// Legacy compatibility - update existing functions to use new centralized config
export const getDomainImages = (domain: PortfolioDomain) => {
  return {
    projects: imageConfig.projects[domain] || {},
    hero: { profileImage: getHeroImage(domain) },
    backgrounds: {
      codeBackground: getBackgroundImage(domain, 'primary'),
      techBackground: getBackgroundImage(domain, 'secondary'),
      engineeringBackground: getBackgroundImage(domain, 'primary'),
      thermalBackground: getBackgroundImage(domain, 'secondary')
    }
  };
};

// Image optimization helper
export const optimizeImageUrl = (url: string, width: number = 800, quality: number = 80): string => {
  if (url.includes('pexels.com')) {
    // For Pexels images, we can modify the URL parameters
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
  }
  return url;
};

// Preload critical images
export const preloadCriticalImages = (domain: PortfolioDomain) => {
  // Preload hero image
  const heroImg = new Image();
  heroImg.src = getHeroImage(domain);
  
  // Preload background images
  const primaryBg = new Image();
  primaryBg.src = getBackgroundImage(domain, 'primary');
  
  const secondaryBg = new Image();
  secondaryBg.src = getBackgroundImage(domain, 'secondary');
  
  // Preload first few project images
  const projectImages = imageConfig.projects[domain];
  if (projectImages) {
    Object.values(projectImages).slice(0, 3).forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }
};

// Export legacy image objects for backward compatibility
export const csImages = {
  projects: imageConfig.projects.cs,
  hero: { profileImage: getHeroImage('cs') },
  backgrounds: {
    codeBackground: getBackgroundImage('cs', 'primary'),
    techBackground: getBackgroundImage('cs', 'secondary')
  }
};

export const mechanicalImages = {
  projects: imageConfig.projects.mechanical,
  hero: { profileImage: getHeroImage('mechanical') },
  backgrounds: {
    engineeringBackground: getBackgroundImage('mechanical', 'primary'),
    thermalBackground: getBackgroundImage('mechanical', 'secondary')
  }
};

// Type exports for backward compatibility
export type CSImageKeys = keyof typeof csImages;
export type MechanicalImageKeys = keyof typeof mechanicalImages;
export type ImageDomain = 'cs' | 'mechanical';
export type ImageCategory = 'projects' | 'hero' | 'backgrounds' | 'sections';