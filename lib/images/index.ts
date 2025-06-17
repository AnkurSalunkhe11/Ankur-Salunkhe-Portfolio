// Central image management and helper functions - Fixed
import { csImages, type CSImageKeys } from './cs-images';
import { mechanicalImages, type MechanicalImageKeys } from './mechanical-images';
import type { PortfolioDomain } from '@/lib/data-loader';

// Combined image types
export type ImageDomain = 'cs' | 'mechanical';
export type ImageCategory = 'projects' | 'hero' | 'backgrounds';

// Helper function to get domain-specific images
export const getDomainImages = (domain: PortfolioDomain) => {
  return domain === 'cs' ? csImages : mechanicalImages;
};

// Helper function to get project image by title with fallbacks
export const getProjectImage = (domain: PortfolioDomain, projectTitle: string): string => {
  const images = getDomainImages(domain);
  
  // Normalize project title for mapping
  const normalizeTitle = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Map project titles to image keys with exact matching
  const projectImageMap: Record<string, string> = {
    // CS Projects
    'financialstatementanalysischatbot': '/images/financial-chatbot.jpeg',
    'logcountwloganalysissystem': '/images/log-analysis.jpeg',
    'numericalsolverfortransientheattransfer': '/images/numerical-solver-transient-heat-transfer.jpeg',
    'aivirtualassistant': '/images/ai-assistant.jpeg',
    'liddrivencavitysimulation': '/images/lid-driven-cavity-simulation.jpeg',
    'spacewarsgame': '/images/space-wars.jpeg',
    
    // Mechanical Projects - Fixed mappings
    'implementationofanorganicrankinecycleasawasteheatrecoverysystem': '/images/orc-image.jpeg',
    'transientthermalanalysisofbrakingsystemsusingansys': '/images/transient-thermal-braking.jpeg',
    'heatexchangerperformanceoptimizationusingcfd': '/images/heat-exchanger-performance-cfd.jpeg',
    'hybridairconditioningsystemforpassengervehicles': '/images/hybrid-air-conditioning-system.jpeg',
  };

  const normalizedTitle = normalizeTitle(projectTitle);
  const imageUrl = projectImageMap[normalizedTitle];
  
  // Return the mapped image or fallback to a default
  if (imageUrl) {
    return imageUrl;
  }
  
  // Fallback to domain-specific default
  return domain === 'cs' 
    ? 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
    : '/images/orc-image.jpeg';
};

// Helper function to get hero image with fallback
export const getHeroImage = (domain: PortfolioDomain): string => {
  return '/images/thunder.png';
};

// Helper function to get background image
export const getBackgroundImage = (domain: PortfolioDomain, type: 'primary' | 'secondary' = 'primary'): string => {
  if (domain === 'cs') {
    return type === 'primary' 
      ? 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200'
      : 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200';
  } else {
    return type === 'primary' ? '/images/orc-image.jpeg' : '/images/heat-exchanger-performance-cfd.jpeg';
  }
};

// Image optimization helper
export const optimizeImageUrl = (url: string, width: number = 800, quality: number = 80): string => {
  if (url.includes('pexels.com')) {
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?auto=compress&cs=tinysrgb&w=${width}&q=${quality}`;
  }
  return url;
};

// Preload critical images
export const preloadCriticalImages = (domain: PortfolioDomain) => {
  const images = getDomainImages(domain);
  
  // Preload hero image
  const heroImg = new Image();
  heroImg.src = getHeroImage(domain);
  
  // Preload first few project images
  Object.values(images.projects).slice(0, 3).forEach(src => {
    if (src && typeof src === 'string') {
      const img = new Image();
      img.src = src;
    }
  });
};

// Validate image exists (client-side only)
export const validateImageExists = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

// Export all images for direct access
export { csImages, mechanicalImages };
export type { CSImageKeys, MechanicalImageKeys };